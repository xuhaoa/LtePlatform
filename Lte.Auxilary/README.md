# MR数据采集模块

## FTP数据下载

下载模块的主要目的是从已知FTP指定目录下下载MR数据文件（实际为**压缩文件**），暂存到数据处理服务器指定目录中，以备后续解压和处理。

### 总体过程

总体过程是连接FTP服务器，遍历服务器上对应目录下的所有文件；
如果是佛山的文件，且对应为相应文件类型（MRO、MRS、MRE），则执行下载。

#### 华为MRO文件下载代码（忽略数据库连接参数设置等代码）

```python
    ...
    downloader=HuaweiMrDownloader(host,sub_ips,DFList,db,host_ip)
    for folder in FOLDER_HW:
        ftpdir=generate_time_dir_shift(prefix = folder, shift=delay)
        ...
        downloader.download_mro(ftpdir)
    ...
```

#### 中兴服务器代码（忽略数据库连接参数设置等代码）

```python
    ...
    downloader=ZteMrDownloader(host,sub_ips,DFList,db,host_ip)
    for folder in FOLDER_ZTE:
        ftpdir=generate_time_dir_shift(prefix = folder, shift=delay)
        ...
        downloader.download_mro(ftpdir)
    ...
```

#### 采用北向接口直接下载（中兴）

从2017年9月开始，中兴的MR文件（包括MRO和MRS文件）直接从北向接口FTP服务器下载。
详细过程参见
[MR数据文件下载流程](https://github.com/WirelessFoshan/LtePlatform/blob/master/Lte.Auxilary/ftp_modules/README.md)

#### 主要说明

下载遵循以下原则：
> 下载4次，使用对应的进程完成
>> 第一次是2小时前
>> 第二次是3个小时之前
>> 第三次是下载4个小时前
>> 第四次是更早，随机选择一个小时下载
> 华为和中兴的代码大部分相同，有两处不同：
>> 文件后缀名有所不同，华为是'.xml.gz'，中兴是'.zip'
>> 判断筛选MR数据类型的函数不同

### 通用处理流程

以下代码段为下载处理代码段。
可见下载之前需要作一个过滤，包括以下几个条件才真正下载：

* 后缀名是对应厂家的压缩文件后缀
* 是对应类型（MRO、MRS或MRE）的文件名格式
* 是佛山基站编号段的数据（因为不同地市的基站MR数据可能混入同一文件夹）
* 隐含条件：利用IP地址文件夹初步过滤地市归属

```python
    def download(self, ftpdir, affix, filename_func):
        '''下载MR文件（压缩文件）'''
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            print('The current IP:', sub_ip)
            if sub_ip not in self.sub_ips:
                continue
            print('The root directory:', root)
            self.host.chdir(root)
            for name in files:
                ...
```

## 数据解压

### 华为数据

华为的MR数据的后缀名为xml.gz

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

### 中兴数据

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

## MRO数据解析

### 数据文件格式

#### 华为数据文件格式（2016年）

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

#### 中兴数据文件格式（2016年）

中兴的MRO文件格式基本与华为相同，只是eNB节属性有所简化。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bulkPmMrDataFile>
  <fileHeader fileFormatVersion="V1.0" reportTime="2016-09-16T20:00:00.000" startTime="2016-09-16T19:45:00.000" endTime="2016-09-16T20:00:00.000" period="15"/>
  <eNB MR.eNBId="502922">
    <measurement>...</measurement>
    <measurement>...</measurement>
    <measurement>...</measurement>
  </eNB>
</bulkPmMrDataFile>
```

#### 详细说明

各节具体内容及解析过程详见
[MRO数据文件格式及处理](https://github.com/WirelessFoshan/LtePlatform/blob/master/Lte.Auxilary/mr/mro/README.md)

## MRS数据解析

### 华为数据文件格式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bulkPmMrDataFile>
  <fileHeader fileFormatVersion="V1.0.0" jobid="0" period="15" reportTime="2016-11-22T11:50:07.000" startTime="2016-11-22T11:30:00.000" endTime="2016-11-22T11:45:00.000"/>
  <eNB id="501195" userLabel="userLabel">
    <measurement mrName="MR.RSRP">...</measurement>
    <measurement mrName="MR.RSRQ">...</measurement>
    <measurement mrName="MR.Tadv">...</measurement>
    ...
  </eNB>
</bulkPmMrDataFile>
```

### 中兴数据文件格式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bulkPmMrDataFile>
  <fileHeader fileFormatVersion="V1.0" period="15" reportTime="2016-11-28T05:00:00.000" startTime="2016-11-28T04:45:00.000" endTime="2016-11-28T05:00:00.000"/>
  <eNB MR.eNBId="502599">
    <measurement mrName="MR.RSRP">...</measurement>
    <measurement mrName="MR.RSRQ">...</measurement>
    <measurement mrName="MR.Tadv">...</measurement>
    ...
  </eNB>
</bulkPmMrDataFile>
```

### 重要测量数据节解析

各节具体内容及解析过程详见
[MRS数据文件格式及处理](https://github.com/WirelessFoshan/LtePlatform/blob/master/Lte.Auxilary/mr/mrs/README.md)

## MRE数据解析

待开发