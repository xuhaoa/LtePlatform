import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *
import sys

db = MongoClient('mongodb://root:Abcdef9*@132.110.71.123')['ouyh']
  
host_ip = sys.argv[1]
FOLDER_HW = ['/'+sys.argv[3]+'/']
sub_ips=[sys.argv[2]]

if not os.path.isdir('huawei_mro'):
    os.mkdir('huawei_mro')
os.chdir('huawei_mro')
delay=-int(sys.argv[4])-2
hour=datetime.datetime.now().hour
minute=datetime.datetime.now().minute
if hour>12 and int(sys.argv[4])>2:
    delay=-(hour-minute%hour)
date_dir=generate_date_hours_shift(shift=delay)
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
        ftpdir=generate_time_dir_shift(prefix = folder, shift=delay)
        print(ftpdir)
        downloader.download(ftpdir)
    host.close()
except:
    print('Cannot connect to', host_ip)