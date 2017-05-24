import json
import datetime
from pandas import DataFrame, Series
import pandas as pd
from functools import reduce
import json
import pymongo
from pymongo import MongoClient
import sys

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
db_source = MongoClient('mongodb://root:Abcdef9*@'+sys.argv[1])['ouyh']

time=datetime.datetime.today()
time+=datetime.timedelta(hours=-24)
time=time.replace(hour=0,minute=0,second=0)
datestr=time.strftime("%Y%m%d")

def position_combine(eNodebId,cellId):
    sectorId=str(eNodebId)+'-'+str(cellId)
    Pci_List=list(db_source['position_'+datestr].find({'CellId': sectorId}))
    if len(Pci_List)>0:
        telecom_list=list(map(lambda item: {
            'CellId': item['CellId'],
            'X': int((item['Lontitute']-112)/0.00049),
            'Y': int((item['Lattitute']-22)/0.00045),
            'Rsrp': max(item['Rsrp'], item['MaxTelecomRsrp']),
            'Count': 1,
            'GoodCount': 1 if max(item['Rsrp'], item['MaxTelecomRsrp'])>=30 else 0,
            'GoodCount105': 1 if max(item['Rsrp'], item['MaxTelecomRsrp'])>=35 else 0,
            'GoodCount100': 1 if max(item['Rsrp'], item['MaxTelecomRsrp'])>=40 else 0
        }, Pci_List))
        telecom_df=DataFrame(telecom_list)
        telecom_stat=telecom_df.groupby(['CellId','X','Y']).sum().reset_index()
        telecom_item = json.loads(telecom_stat.T.to_json()).values()
        for item in telecom_item:
            item.update({'StatDate': time})
        db['position_telecom_combined'].insert_many(telecom_item)
        print('position_telecom_combined insert: (' + sectorId + ') ' + str(len(telecom_item)) + ' items.')

        mobile_filter=list(filter(lambda item: True if item['MoblieEarfcn']>0 else False, Pci_List))
        if len(mobile_filter) > 0:
            mobile_list=list(map(lambda item: {
                'CellId': item['CellId'],
                'X': int((item['Lontitute']-112)/0.00049),
                'Y': int((item['Lattitute']-22)/0.00045),
                'Rsrp': item['MaxMobileRsrp'],
                'Count': 1,
                'GoodCount': 1 if item['MaxMobileRsrp']>=30 else 0,
                'GoodCount105': 1 if item['MaxMobileRsrp']>=35 else 0,
                'GoodCount100': 1 if item['MaxMobileRsrp']>=40 else 0
            }, mobile_filter))
            mobile_df=DataFrame(mobile_list)
            mobile_stat=mobile_df.groupby(['CellId','X','Y']).sum().reset_index()
            mobile_item=json.loads(mobile_stat.T.to_json()).values()
            for item in mobile_item:
                item.update({'StatDate': time})
            db['position_mobile_combined'].insert_many(mobile_item)
            print('position_mobile_combined insert: (' + sectorId + ') ' + str(len(mobile_item)) + ' items.')

for eNodebId in range(550912, 552960):
    for cellId in range(16):
        position_combine(eNodebId,cellId)
        position_combine(eNodebId,cellId+48)
        position_combine(eNodebId,cellId+16)
for eNodebId in range(499712, 503808):
    for cellId in range(16):
        position_combine(eNodebId,cellId)
        position_combine(eNodebId,cellId+48)
        position_combine(eNodebId,cellId+16)
for eNodebId in range(868352,870400):
    for cellId in range(16):
        position_combine(eNodebId,cellId)
        position_combine(eNodebId,cellId+48)
        position_combine(eNodebId,cellId+16)