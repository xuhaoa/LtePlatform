import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *
import sys

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']

HOST_HW = ['132.122.152.115', '132.122.152.112', '132.122.152.124']  
host_ip = sys.argv[1]
FOLDER_HW = ['/'+sys.argv[3]+'/']
sub_ips=[sys.argv[2]]

if not os.path.isdir('huawei_mrs'):
    os.mkdir('huawei_mrs')
os.chdir('huawei_mrs')
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
        print('Searching the directory:', ftpdir)
        downloader.download_mrs(ftpdir)
        ftpdir=generate_time_dir_shift(prefix = folder, shift=-3)
        print(ftpdir)
        downloader.download_mrs(ftpdir)
    host.close()
except:
    print('Cannot connect to', host_ip)