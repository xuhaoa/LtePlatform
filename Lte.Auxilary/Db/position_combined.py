import json
import datetime
from pandas import DataFrame, Series
import pandas as pd
from functools import reduce
import json
import pymongo
from pymongo import MongoClient

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']

time=datetime.datetime.today()
time+=datetime.timedelta(hours=-24)
time=time.replace(hour=0,minute=0,second=0)
datestr=time.strftime("%Y%m%d")

def position_combine(eNodebId,cellId):
    sectorId=str(eNodebId)+'-'+str(cellId)
    print(sectorId)
    print(datestr)
    Pci_List=list(db['position_'+datestr].find({'CellId': sectorId}))
    if len(Pci_List)>0:
        telecom_list=list(map(lambda item: {
            'CellId': item['CellId'],
            'X': int((item['Lontitute']-112)/0.00049),
            'Y': int((item['Lattitute']-22)/0.00045),
            'Rsrp': max(item['Rsrp'], item['MaxTelecomRsrp'])
        }, Pci_List))
        print(telecom_list)

position_combine(502498,2)