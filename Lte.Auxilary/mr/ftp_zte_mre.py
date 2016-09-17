import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
  
host_ip = '132.122.152.106'
FOLDER_ZTE = ['/MR_ZTE_SOURCE_D/']
sub_ips=['132.122.151.115','132.122.155.213','132.122.151.232','132.122.151.96','132.122.155.214','132.122.151.183','132.122.155.216','132.122.155.138','132.122.151.181','132.122.155.215']

if not os.path.isdir('zte_mre'):
    os.mkdir('zte_mre')
os.chdir('zte_mre')
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
        downloader.download_mre_zte(ftpdir)
        ftpdir=generate_time_dir_shift(prefix = folder, shift=-3)
        print(ftpdir)
        downloader.download_mre_zte(ftpdir)
    host.close()
except:
    print('Cannot connect to', host_ip)