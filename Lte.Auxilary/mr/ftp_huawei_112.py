import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
_DFlist = list(db['DFlist'].find({}, {'dfName': 1, '_id': 0}))      
DFList = [item.get('dfName') for item in _DFlist]

HOST_HW = ['132.122.152.115', '132.122.152.112', '132.122.152.124']  
host_ip = '132.122.152.112'
FOLDER_HW = ['/MR_HW_SOURCE_D/', '/MR_HW_SOURCE_E/']
sub_ips=['132.122.151.115','132.122.155.213','132.122.151.232','132.122.151.96','132.122.155.214','132.122.151.183','132.122.155.216','132.122.155.138','132.122.151.181','132.122.155.215']

if not os.path.isdir('huawei_mro'):
    os.mkdir('huawei_mro')
os.chdir('huawei_mro')
date_dir=generate_date_twohours_ago()
if not os.path.isdir(date_dir):
    os.mkdir(date_dir)
os.chdir(date_dir)

print(host_ip)
try:
    print("######")
    host = ftputil.FTPHost(host_ip, 'ouyh18', 'O123#')
    for folder in FOLDER_HW:
        ftpdir=generate_time_dir(prefix = folder)
        print(ftpdir)
        for root, dirs, files in host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            if sub_ip not in sub_ips:
                continue
            host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.gz') and is_foshan_filename(name) and is_mro_filename(name): 
                    if name in DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                host.download(name, name)
                                times=3
                                DFList.append(name)
                                db['DFlist'].insert({'dfName': name})
                                print('Download finished: ', host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue
        ftpdir=generate_time_dir_shift(prefix = folder, shift=-3)
        print(ftpdir)
        for root, dirs, files in host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            if sub_ip not in sub_ips:
                continue
            host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.gz') and is_foshan_filename(name) and is_mro_filename(name): 
                    if name in DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                host.download(name, name)
                                times=3
                                DFList.append(name)
                                db['DFlist'].insert({'dfName': name})
                                print('Download finished: ', host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue
    host.close()
except:
    print('Cannot connect to', host_ip)