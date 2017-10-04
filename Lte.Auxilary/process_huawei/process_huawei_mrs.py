import os
import io
import gzip
from lxml import etree
import dateutil.parser
from mr_service import MrsReader
import json
from customize_utilities import *
import pymongo
from pymongo import MongoClient
import sys

os.chdir('/home/wireless/huawei_mrs')
date_dir=generate_date_hours_shift(shift=-5)
mrNames=['RSRP','Tadv','PowerHeadRoom','SinrUL','TadvRsrp', 'ReceivedIPower']
db = MongoClient('mongodb://root:Abcdef9*@132.110.71.123')['ouyh']
for mrName in mrNames:
    try:
        if db['mrs_'+mrName+'_'+date_dir].index_information().get('CellId_1')==None:
            db['mrs_'+mrName+'_'+date_dir].create_index([("CellId", pymongo.ASCENDING)],background=True)
    except:
        print('The colletion is initialized')

for root, dirs_no, files in os.walk('/home/wireless/huawei_mrs/'+date_dir):
    currrent_dir=os.path.join(root, '')
    for name in files:
        if not name.endswith(sys.argv[1] + '00.xml.gz'):
            continue
        print(name)
        try:
            gFile=gzip.GzipFile(currrent_dir + name, 'r')
            root = etree.fromstring(gFile.read())
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
        for item in root.iterchildren():
            if item.tag == 'fileHeader':
                startTime= item.attrib['startTime']
            elif item.tag == 'eNB':
                eNodebId=item.attrib['id']
                reader=MrsReader(mrNames,startTime,date_dir,db,eNodebId)
                for item_measurement in item.iterchildren():
                    reader.read(item_measurement)
        print('insert from ', currrent_dir + name)
        try:
            os.remove(currrent_dir + name)
        except:
            print('Unable to delete this file: ' + name)