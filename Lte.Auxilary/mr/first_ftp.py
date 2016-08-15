import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient

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

for root, dirs, files in host.walk('/MR_HW_SOURCE_D/20160815/201608150215'):
    print('Root path: ' + root)
    print('Directories: ')
    print(dirs)
    print('Files: ')
    print(files)
    host.chdir(root)
    for name in files:
        print('File: ' + os.path.join(root, name))
        # 判断文件是否已经存在于数据库
        if name in DFList:
            pass
        else:
            try:
                host.download(name, name)
            except:
                pass
            DFList.append(name)
            db['DFlist'].insert({'dfName': name})
            print('Download finished: ' + os.path.join(root, name))
        