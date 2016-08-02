import ftputil
import os
import shutil

host = ftputil.FTPHost('132.122.152.115', 'ouyh18', 'O123#')
if os.path.isdir('temp'):
    shutil.rmtree('temp')

os.mkdir('temp')
os.chdir('temp')

_tmpfolder = []
_tmpfile = []

for root, dirs, files in host.walk('/ZIP_MR_HW_SOURCE_D'):
    print(root)
    print(dirs)
    print(files)

    host.chdir(root)
    for name in files:
        print(os.path.join(root, name))
        host.download(name, name)