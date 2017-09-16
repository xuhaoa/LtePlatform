import datetime
import os
import ftplib
import ftputil
import ftputil.session
import pymongo
from pymongo import MongoClient

def generate_time_dir(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/"):
    '''生成时间段字符串目录，当前时间的2个小时前'''
    time_delta=datetime.timedelta(hours=-2)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_time_dir_shift(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/", shift=-2):
    '''生成时间段字符串目录，提前的时间可以调节'''
    time_delta=datetime.timedelta(hours=shift)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_date_twohours_ago(now=datetime.datetime.now()):
    '''生成日期字符串目录，当前时间的2个小时前'''
    date_delta=datetime.timedelta(hours=-2)
    past=now+date_delta
    return past.strftime("%Y%m%d")

def generate_date_hours_shift(now=datetime.datetime.now(),shift=-2):
    '''生成日期字符串目录，提前的时间可以调节'''
    date_delta=datetime.timedelta(hours=shift)
    past=now+date_delta
    return past.strftime("%Y%m%d")

def is_foshan_filename(name):
    '''根据基站编号判断文件名是否属于佛山。目前佛山4G基站编号范围是16进制（7A000-7AFFF，86800-86FFF，D4000-D47FF）'''
    try:
        enodebid=int(name.split('_')[-2])
    except:
        return False
    return enodebid in range(550912, 552960) or enodebid in range(499712, 503808) or enodebid in range(868352,870400)

def is_mro_filename(name):
    '''判断是否为华为MRO文件名，例如FDD-LTE_MRO_HUAWEI_501035_20161122113000.xml.gz'''
    type=name.split('_')[-4]
    return type=='MRO'

def is_mro_filename_zte(name):
    '''判断是否为中兴MRO文件名，例如FDD-LTE_MRO_ZTE_OMC1_501251_20170705194500.zip'''
    type=name.split('_')[-5]
    return type=='MRO'

def is_mre_filename(name):
    '''判断是否为华为MRE文件名，例如FDD-LTE_MRE_HUAWEI_500328_20161122113000.xml.gz'''
    type=name.split('_')[-4]
    return type=='MRE'

def is_mre_filename_zte(name):
    '''判断是否为中兴MRE文件名，例如FDD-LTE_MRE_ZTE_OMC1_501819_20161218101500.zip'''
    type=name.split('_')[-5]
    return type=='MRE'

def is_mrs_filename(name):
    '''判断是否为华为MRS文件名，例如FDD-LTE_MRS_HUAWEI_501195_20161122113000.xml.gz'''
    type=name.split('_')[-4]
    return type=='MRS'

def is_mrs_filename_zte(name):
    '''判断是否为中兴MRS文件名，例如FDD-LTE_MRS_ZTE_OMC1_502599_20161128044500.zip'''
    type=name.split('_')[-5]
    return type=='MRS'

class FTP_IgnoreHost(ftplib.FTP):
    def makepasv(self):
        _, port = super().makepasv()
        return self.host, port

class MrDownloader:
    '''通用MR下载对象，调用此对象的方法，可完成各种数据的下载'''
    def __init__(self, host, sub_ips, DFList, db, host_ip):
        self.host=host
        self.sub_ips=sub_ips
        self.DFList=DFList
        self.db=db
        self.host_ip=host_ip

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
                print(name)
                if name.endswith(affix) and is_mro_filename(name) and is_foshan_filename(name): 
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

class ZteMrDownloader(MrDownloader):
    '''中兴MR下载对象'''
    def __init__(self, host, sub_ips, DFList, db, host_ip):
        super().__init__(host, sub_ips, DFList, db, host_ip)

    def download_mro(self, ftpdir):
        '''下载MRO文件'''
        super().download(ftpdir, '.zip', is_mro_filename_zte)

    def download_mre(self, ftpdir):
        '''下载MRE文件'''
        super().download(ftpdir, '.zip', is_mre_filename_zte)

    def download_mrs(self, ftpdir):
        '''下载MRS文件'''
        super().download(ftpdir, '.zip', is_mrs_filename_zte)

class HuaweiMrDownloader(MrDownloader):
    '''华为MR下载对象'''
    def __init__(self, host, sub_ips, DFList, db, host_ip):
        super().__init__(host, sub_ips, DFList, db, host_ip)

    def download_mro(self, ftpdir):
        '''下载MRO文件'''
        super().download(ftpdir, '.gz', is_mro_filename)

    def download_mre(self, ftpdir):
        '''下载MRE文件'''
        super().download(ftpdir, '.gz', is_mre_filename)

    def download_mrs(self, ftpdir):
        '''下载MRS文件'''
        super().download(ftpdir, '.gz', is_mrs_filename)