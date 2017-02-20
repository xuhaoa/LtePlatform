import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *
import sys

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
  
host_ip = '132.122.152.125'
FOLDER_ZTE = ['/MR_ZTE_SOURCE_D/', '/MR_ZTE_SOURCE_E/']
sub_ips=[sys.argv[1]]

if not os.path.isdir('zte_mrs'):
    os.mkdir('zte_mrs')
os.chdir('zte_mrs')
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
    for folder in FOLDER_ZTE:
        ftpdir=generate_time_dir(prefix = folder)
        print(ftpdir)
        downloader.download_mrs_zte(ftpdir)
        ftpdir=generate_time_dir_shift(prefix = folder, shift=-3)
        print(ftpdir)
        downloader.download_mrs_zte(ftpdir)
    host.close()
except:
    print('Cannot connect to', host_ip)