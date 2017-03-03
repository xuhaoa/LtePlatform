import os
import io
import zipfile
from lxml import etree
import dateutil.parser
from mr_service import MroReader
import json
from customize_utilities import *
import pymongo
from pymongo import MongoClient
import sys

os.chdir('/home/wireless/huawei_mro')
date_dir=generate_date_hours_shift(shift=-5)
afilter = ['CDMA']
db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']

try:
    if db['mro_'+date_dir].index_information().get('Pci_1_NeighborPci_1')==None:
        db['mro_'+date_dir].create_index([("Pci", pymongo.ASCENDING), ("NeighborPci", pymongo.ASCENDING)],background=True)
except:
    print('The colletion is initialized')

try:
    if db['position_'+date_dir].index_information().get('CellId_1')==None:
        db['position_'+date_dir].create_index([("CellId", pymongo.ASCENDING)],background=True)
except:
    print('The colletion is initialized')

try:
    if db['precise_'+date_dir].index_information().get('CellId_1_Pci_1')==None:
        db['precise_'+date_dir].create_index([("CellId", pymongo.ASCENDING), ("Pci", pymongo.ASCENDING)],background=True)
except:
    print('The colletion is initialized')

for root, dirs_no, files in os.walk('/home/wireless/zte_mro/'+date_dir):
    currrent_dir=os.path.join(root, '')
    for name in files:
        if not name.endswith(sys.argv[1] + '00.zip'):
            continue
        reader=MroReader(afilter)
        print(name)
        try:
            zFile=zipfile.ZipFile(currrent_dir + name, 'r')
            root = etree.fromstring(zFile.read(zFile.namelist()[0]))
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
        item_id=''
        for item in root.iterchildren():
            item_key = []
            if item.tag == 'fileHeader':
                startTime= item.attrib['startTime']
            elif item.tag == 'eNB':
                item_id = item.attrib.get('MR.eNBId')
                for item_measurement in item.iterchildren():
                    reader.read_zte(item_measurement, item_id)
        if (item_id!=''):
            mro_output=reader.map_rsrp_diff_zte()
            if len(mro_output)>0:
                for item in mro_output:
                    item.update({'StartTime': startTime})
                db['mro_'+date_dir].insert_many(mro_output)
            if len(reader.item_positions)>0:
                for item in reader.item_positions:
                    item.update({'StartTime': startTime})
                db['position_'+date_dir].insert_many(reader.item_positions)
            if len(reader.neighbor_stats)>0:
                neighbor_output=reader.map_neighbor_stats()
                if len(neighbor_output)>0:
                    for item in neighbor_output:
                        item.update({'StartTime': startTime})
                    db['precise_'+date_dir].insert_many(neighbor_output)
        print('insert from ', currrent_dir + name)
        os.remove(currrent_dir + name)