import os
import io
import zipfile
from lxml import etree
import dateutil.parser
from mr_service import MrsReader
import json
from customize_utilities import *
import pymongo
from pymongo import MongoClient
import sys

os.chdir('/home/wireless/zte_mrs')
date_dir=generate_date_hours_shift(shift=-5)
mrNames=['RSRP','Tadv','PowerHeadRoom','SinrUL','TadvRsrp']
db = MongoClient('mongodb://root:Abcdef9*@132.110.71.123')['ouyh']
for mrName in mrNames:
    try:
        if db['mrs_'+mrName+'_'+date_dir].index_information().get('CellId_1')==None:
            db['mrs_'+mrName+'_'+date_dir].create_index([("CellId", pymongo.ASCENDING)],background=True)
    except:
        print('The colletion is initialized')

_DFlist = list(db['Mrs_DFlist_'+date_dir].find({}, {'dfName': 1, '_id': 0}))
DFList = [item.get('dfName') for item in _DFlist]

for root, dirs_no, files in os.walk('/home/wireless/zte_mrs/'+date_dir):
    currrent_dir=os.path.join(root, '')
    for name in files:
        if not name.endswith(sys.argv[1] + '00.zip'):
            continue
        print(name)
        if name in DFList:
            pass
        try:
            zFile=zipfile.ZipFile(currrent_dir + name, 'r')
            root = etree.fromstring(zFile.read(zFile.namelist()[0]))
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
        for item in root.iterchildren():
            if item.tag == 'fileHeader':
                startTime= item.attrib['startTime']
            elif item.tag == 'eNB':
                reader=MrsReader(mrNames,startTime,date_dir,db, 0)
                item_id = item.attrib.get('MR.eNBId')
                for item_measurement in item.iterchildren():
                    reader.read_zte(item_measurement, item_id)
        print('insert from ', currrent_dir + name)
        DFList.append(name)
        db['Mrs_DFlist_'+date_dir].insert({'dfName': name})
        try:
            os.remove(currrent_dir + name)
        except:
            print('Unable to delete this file: ' + name)
