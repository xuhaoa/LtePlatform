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
FOLDER_HW = ['/MR_HW_SOURCE_D/', '/MR_HW_SOURCE_E/']

if not os.path.isdir('temp'):
    os.mkdir('temp')
os.chdir('temp')

for host_ip in HOST_HW:
    print(host_ip)
    status = False      
    while not status:
        try:
            print("######")
            host = ftputil.FTPHost(host_ip, 'ouyh18', 'O123#')
            for folder in FOLDER_HW:
                ftpdir=generate_time_dir(prefix = folder)
                print(ftpdir)
                for root, dirs, files in host.walk(ftpdir):
                    host.chdir(root)
                    for name in files:
                        print(name)
                        if name.endswith('.gz') and is_foshan_filename(name):        
                            if name in DFList:
                                pass
                            else:
                                times=0
                                while times<3:
                                    try:
                                        host.download(name, name)
                                        times=3
                                    except:
                                        times+=1
                                        print('Times: '+ times)
                                        continue
                                    DFList.append(name)
                                    db['DFlist'].insert({'dfName': name})
                                    print('Download finished: ' + os.path.join(root, name))
            status = True
            host.close()
        except:
            continue
        