import datetime
import os
import ftputil
import pymongo
from pymongo import MongoClient

def generate_time_dir(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/"):
    time_delta=datetime.timedelta(hours=-2)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_time_dir_shift(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/", shift=-2):
    time_delta=datetime.timedelta(hours=shift)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_date_twohours_ago(now=datetime.datetime.now()):
    date_delta=datetime.timedelta(hours=-2)
    past=now+date_delta
    return past.strftime("%Y%m%d")

def generate_date_hours_shift(now=datetime.datetime.now(),shift=-2):
    date_delta=datetime.timedelta(hours=shift)
    past=now+date_delta
    return past.strftime("%Y%m%d")

def is_foshan_filename(name):
    try:
        enodebid=int(name.split('_')[-2])
    except:
        return False
    return enodebid in range(550912, 552960) or enodebid in range(499712, 503808) or enodebid in range(868352,870400)

def is_mro_filename(name):
    type=name.split('_')[-4]
    return type=='MRO'

def is_mro_filename_zte(name):
    type=name.split('_')[-5]
    return type=='MRO'

def is_mre_filename(name):
    type=name.split('_')[-4]
    return type=='MRE'

def is_mre_filename_zte(name):
    type=name.split('_')[-5]
    return type=='MRE'

def is_mrs_filename(name):
    type=name.split('_')[-4]
    return type=='MRS'

def is_mrs_filename_zte(name):
    type=name.split('_')[-5]
    return type=='MRS'

class MrDownloader:
    def __init__(self, host, sub_ips, DFList, db, host_ip):
        self.host=host
        self.sub_ips=sub_ips
        self.DFList=DFList
        self.db=db
        self.host_ip=host_ip

    def download(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            print('The current IP:', sub_ip)
            if sub_ip not in self.sub_ips:
                continue
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.gz') and is_mro_filename(name) and is_foshan_filename(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue

    def download_zte(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            print('The current IP:', sub_ip)
            if sub_ip not in self.sub_ips:
                continue
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.zip') and is_foshan_filename(name) and is_mro_filename_zte(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue

    def download_mre(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            if sub_ip not in self.sub_ips:
                continue
            print('The current IP:', sub_ip)
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.gz') and is_foshan_filename(name) and is_mre_filename(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue

    def download_mre_zte(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            if sub_ip not in self.sub_ips:
                continue
            print('The current IP:', sub_ip)
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.zip') and is_foshan_filename(name) and is_mre_filename_zte(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue

    def download_mrs(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            print('The current IP:', sub_ip)
            if sub_ip not in self.sub_ips:
                continue
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.gz') and is_foshan_filename(name) and is_mrs_filename(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue

    def download_mrs_zte(self, ftpdir):
        datestr=ftpdir.split('/')[-2]
        for root, dirs, files in self.host.walk(ftpdir):
            sub_ip=root.split('/')[-1]
            if sub_ip not in self.sub_ips:
                continue
            print('The current IP:', sub_ip)
            print('The root directory:', root)
            self.host.chdir(root)                
            for name in files:
                print(name)
                if name.endswith('.zip') and is_foshan_filename(name) and is_mrs_filename_zte(name): 
                    if name in self.DFList:
                        pass
                    else:
                        times=0
                        while times<3:
                            try:
                                self.host.download(name, name)
                                times=3
                                self.DFList.append(name)
                                self.db['DFlist_'+datestr].insert({'dfName': name})
                                print('Download finished: ', self.host_ip, '/', os.path.join(root, name))
                            except:
                                times+=1
                                print('Times: '+ times)
                                continue