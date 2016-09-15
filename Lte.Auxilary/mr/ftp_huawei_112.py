import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']

HOST_HW = ['132.122.152.115', '132.122.152.112', '132.122.152.124']  
host_ip = '132.122.152.112'
FOLDER_HW = ['/MR_HW_SOURCE_D/', '/MR_HW_SOURCE_E/']
sub_ips=['132.122.151.115','132.122.155.213','132.122.151.232','132.122.151.96','132.122.155.214','132.122.151.183','132.122.155.216','132.122.155.138','132.122.151.181','132.122.155.215']

if not os.path.isdir('huawei_mro'):
    os.mkdir('huawei_mro')
os.chdir('huawei_mro')
date_dir=generate_date_twohours_ago()
_DFlist = list(db['DFlist_'+date_dir].find({}, {'dfName': 1, '_id': 0}))      
DFList = [item.get('dfName') for item in _DFlist]
if not os.path.isdir(date_dir):
    os.mkdir(date_dir)
os.chdir(date_dir)

print(host_ip)
try:
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
except:
    print('Cannot connect to', host_ip)