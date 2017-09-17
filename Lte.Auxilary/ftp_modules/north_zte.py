import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *
import datetime
import sys

db = MongoClient('mongodb://root:Abcdef9*@132.110.71.122')['ouyh']
host_ip=sys.argv[1]

delay=-2
date_dir=generate_date_hours_shift(shift=delay)
date_dir_line=generate_date_hours_shift_with_line(shift=delay)

os_dir='/home/wireless/zte_source/'+date_dir
mro_dir='/home/wireless/zte_mro/'+date_dir
mrs_dir='/home/wireless/zte_mrs/'+date_dir

os.chdir('/home/wireless/zte_mro')
if not os.path.isdir(date_dir):
    os.mkdir(date_dir)
os.chdir('/home/wireless/zte_mrs')
if not os.path.isdir(date_dir):
    os.mkdir(date_dir)
os.chdir('/home/wireless/zte_source')
if not os.path.isdir(date_dir):
    os.mkdir(date_dir)

os.chdir(os_dir)
_DFlist = list(db['DFlist_North'].find({}, {'dfName': 1, '_id': 0}))      
DFList = [item.get('dfName') for item in _DFlist]

print("Host IP: ", host_ip)
try:
    print("######")
    host = generate_zte_north_host(host_ip, 'ZTE_NORTH', 'NDS123zte')
    downloader=NorthDownloader(host,DFList,db)
    ftpdir='/MR/FDD-LTE/'+date_dir_line+'/'
    print(ftpdir)
    downloader.download(ftpdir, os_dir, mro_dir, mrs_dir)
    host.close()
except:
    print('Something wrong with', host_ip)
