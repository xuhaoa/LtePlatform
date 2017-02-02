#MR数据采集模块
##FTP数据下载
    下载模块的主要目的是从已知FTP指定目录下下载MR数据文件（实际为**压缩文件**），暂存到数据处理服务器指定目录中，以备后续解压和处理。
###总体过程
####华为服务器代码
```python
    print("######")
    host = ftputil.FTPHost(host_ip, '___', '___')
    downloader=MrDownloader(host,sub_ips,DFList,db,host_ip)
    for folder in FOLDER_HW:
        ftpdir=generate_time_dir(prefix = folder)
        print(ftpdir)
        downloader.download(ftpdir)
        ftpdir=generate_time_dir_shift(prefix = folder, shift=-3)
        print(ftpdir)
        downloader.download(ftpdir)
    host.close()
```
####中兴服务器代码
```python
    print("######")
    host = ftputil.FTPHost(host_ip, '___', '___')
    downloader=MrDownloader(host,sub_ips,DFList,db,host_ip)
    for folder in FOLDER_ZTE:
        ftpdir=generate_time_dir(prefix = folder)
        print(ftpdir)
        downloader.download_zte(ftpdir)
        ftpdir=generate_time_dir_shift(prefix = folder, shift=-3)
        print(ftpdir)
        downloader.download_zte(ftpdir)
    host.close()
```
####主要说明
    下载遵循以下原则：    
* 下载两次，第一次是当前小时，第二次是三个小时之前
* 华为和中兴的代码大部分相同，只是文件后缀名有所不同
###通用处理流程
    以下代码段为下载处理代码段，可见下载之前需要作一个过滤，包括以下几个条件才真正下载：
* 后缀名是对应厂家的压缩文件后缀
* 是对应类型（MRO、MRS或MRE）的文件名格式
* 是佛山基站编号段的数据（因为不同地市的基站MR数据可能混入同一文件夹）
* 隐含条件：利用IP地址文件夹初步过滤地市归属
```python
    def download(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            if sub_ip not in self.sub_ips:
                continue
            print('The current IP:', sub_ip)
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.gz') and is_mro_filename(name) and is_foshan_filename(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue
```
##数据解压
###华为数据
    后缀名为xml.gz
```python
    for name in files:
        if not name.endswith('0000.xml.gz'):
            continue
        reader=MroReader(afilter)
        print(name)
        try:
            gFile=gzip.GzipFile(currrent_dir + name, 'r')
            root = etree.fromstring(gFile.read())
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
```
###中兴数据
    后缀名为zip
```python
    for name in files:
        if not name.endswith('0000.zip'):
            continue
        reader=MroReader(afilter)
        print(name)
        try:
            zFile=zipfile.ZipFile(currrent_dir + name, 'r')
            root = etree.fromstring(zFile.read(zFile.namelist()[0]))
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
```
##MRO数据解析
###数据文件格式
####华为数据文件格式（2016年）
    华为的MRO文件是一个fileHeader节加上一个eNB节，eNB节下有3个measurement节。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<bulkPmMrDataFile>
  <fileHeader fileFormatVersion="V1.0.0" jobid="0" period="0" reportTime="2016-11-22T11:47:09.000" startTime="2016-11-22T11:30:00.000" endTime="2016-11-22T11:45:00.000"/>
  <eNB id="501035" userLabel="userLabel">
    <measurement>...</measurement>
    <measurement>...</measurement>
    <measurement>...</measurement>
  </eNB>
</bulkPmMrDataFile>
```
##MRS数据解析
##MRE数据解析
###数据入库
