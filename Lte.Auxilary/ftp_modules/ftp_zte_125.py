import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *
import sys

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
  
host_ip = '132.122.152.125'
FOLDER_ZTE = ['/'+sys.argv[2]+'/']
sub_ips=[sys.argv[1]]

if not os.path.isdir('zte_mro'):
    os.mkdir('zte_mro')
os.chdir('zte_mro')
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
        delay=-int(sys.argv[3])-2
        ftpdir=generate_time_dir_shift(prefix = folder, shift=delay)
        print(ftpdir)
        downloader.download_zte(ftpdir)
    host.close()
except:
    print('Cannot connect to', host_ip)