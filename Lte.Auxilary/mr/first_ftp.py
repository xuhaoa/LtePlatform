import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
from customize_utilities import *

# 从数据库获取已下载列表
db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
_DFlist = list(db['DFlist'].find({}, {'dfName': 1, '_id': 0}))      # downloadfiles已下载的文件列表
DFList = [item.get('dfName') for item in _DFlist]
#print(DFList)

host = ftputil.FTPHost('132.122.152.115', 'ouyh18', 'O123#')
if not os.path.isdir('temp'):
    os.mkdir('temp')
os.chdir('temp')

_tmpfolder = []
_tmpfile = []

ftpdir=generate_time_dir(prefix = "/MR_HW_SOURCE_D/")
print(ftpdir)
for root, dirs, files in host.walk(ftpdir):
    print('Files: ')
    print(files)
    host.chdir(root)
    for name in files:
        print('File: ' + os.path.join(root, name))
        if name.endswith('.gz') and int(name.split('_')[-2]) in (range(550912, 552959) or range(499712, 503807)):
        
            if name in DFList:
                pass
            else:
                status=False
                while not status:
                    try:
                        host.download(name, name)
                        status=True
                    except:
                        continue
                    DFList.append(name)
                    db['DFlist'].insert({'dfName': name})
                    print('Download finished: ' + os.path.join(root, name))

host.close()
        