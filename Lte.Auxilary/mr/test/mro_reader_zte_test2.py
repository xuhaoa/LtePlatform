import os
import io
import zipfile
from lxml import etree
import dateutil.parser
from mr_service import MroReader
from pymongo import MongoClient
import sys

zFile=zipfile.ZipFile(sys.argv[1], 'r')
db = MongoClient('mongodb://root:Abcdef9*@132.110.71.122')['ouyh']

afilter = ['CDMA', 'LteSccgi']
reader=MroReader(afilter)
print(zFile.filename)
root = etree.fromstring(zFile.read(zFile.namelist()[0]))
for item in root.iterchildren():
    item_key = []
    if item.tag == 'fileHeader':
        startTime= dateutil.parser.parse(item.attrib['startTime'])
        print(startTime)
    elif item.tag == 'eNB':
        if 'MR.eNBId' in item.attrib.keys():
            item_id = item.attrib['MR.eNBId']
        else:
            item_id=item.attrib['id']
        print(item_id)
        for item_measurement in item.iterchildren():
            reader.read_zte(item_measurement, item_id)
#print(reader.item_dicts)
if (item_id!=''):
    mro_output=reader.map_rsrp_diff_zte()
    if len(mro_output)>0:
        for item in mro_output:
            item.update({'StartTime': startTime})
        print('write db 1:')
        print(mro_output)
        #print(mro_output)
        db['mro_20171001'].insert_many(mro_output)
    if len(reader.item_positions)>0:
        for item in reader.item_positions:
            item.update({'StartTime': startTime})
        print('write db 2:')
        #db['position_20171001'].insert_many(reader.item_positions)
    if len(reader.neighbor_stats)>0:
        neighbor_output=reader.map_neighbor_stats()
        if len(neighbor_output)>0:
            for item in neighbor_output:
                item.update({'StartTime': startTime})
        print('write db 3:')
        #db['precise_20171001'].insert_many(neighbor_output)
