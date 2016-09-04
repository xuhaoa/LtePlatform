from ftplib import FTP
import os
import datetime
import pymongo
from pymongo import MongoClient

def generate_time_dir(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/"):
    time_delta=datetime.timedelta(hours=-2)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_date_twohours_ago(now=datetime.datetime.now()):
    date_delta=datetime.timedelta(hours=-2)
    past=now+date_delta
    return past.strftime("%Y%m%d")

def is_foshan_filename(name):
    enodebid=int(name.split('_')[-2])
    return enodebid in range(550912, 552959) or enodebid in range(499712, 503807)

def is_mro_filename(name):
    type=name.split('_')[-4]
    return type=='MRO'

def process_file_list(ftp, dirn, ips):
	list = ftp.nlst() 
	for name in list: 
		print('IP: ', name)
		if name in ips:
			try:
				ftp.cwd(dirn + '/' + name)
				for file in ftp.nlst():
					if file.endswith('.gz') and is_foshan_filename(file) and is_mro_filename(file):
						print('File: ', file)
						try:
							localpath = os.path.join(os.path.abspath('.'), file)
							fp = open(localpath,'wb')
							ftp.retrbinary('RETR ' + dirn + '/' + name + '/' + file, fp.write, bufsize)
							fp.close()
						except:
							print('ERROR download ' + dirn + '/' + name + '/' + file)
			except:
				print('ERROR reading dir ', dirn + '/' + name)
				return

ftp = FTP()  
timeout = 30  
port = 21 
HOST_HW = ['132.122.152.115', '132.122.152.112', '132.122.152.124'] 
FOLDER_HW = ['/MR_HW_SOURCE_D/', '/MR_HW_SOURCE_E/']
sub_ips=['132.122.151.115','132.122.155.213','132.122.151.232','132.122.151.96','132.122.155.214','132.122.151.183','132.122.155.216','132.122.155.138','132.122.151.181','132.122.155.215']
db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
_DFlist = list(db['DFlist'].find({}, {'dfName': 1, '_id': 0}))      
DFList = [item.get('dfName') for item in _DFlist]

if not os.path.isdir('huawei_mro'):
    os.mkdir('huawei_mro')
os.chdir('huawei_mro')
date_dir=generate_date_twohours_ago()
if not os.path.isdir(date_dir):
    os.mkdir(date_dir)
os.chdir(date_dir)

for host in HOST_HW:
	try: 
		ftp.connect(host,port,timeout) 
		ftp.login('ouyh18', 'O123#') 
		print(ftp.getwelcome())
		list = ftp.nlst() 
		for name in list:  
			print(name)
	except:
		print ('ERROR:cannot reach " %s"' % host)
		exit

	for folder in FOLDER_HW:
		DIRN=generate_time_dir(prefix = folder)
		try:
			ftp.cwd(DIRN)
		except:
			print('ERRORL cannot CD to ', DIRN)
			ftp.quit()
			exit

		process_file_list(ftp, DIRN, sub_ips)