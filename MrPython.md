#MR数据采集模块
##FTP数据下载
    下载模块的主要目的是从已知FTP指定目录下下载MR数据文件（实际为**压缩文件**），暂存到数据处理服务器指定目录中，以备后续解压和处理。
###总体过程
####华为服务器代码
```python
    print("######")
    host = ftputil.FTPHost(host_ip, 'ouyh18', 'O123#')
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
##数据解压
###华为数据
###中兴数据
##MRO数据解析
##MRS数据解析
##MRE数据解析
###数据入库
