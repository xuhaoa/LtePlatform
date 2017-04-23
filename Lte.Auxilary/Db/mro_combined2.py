import pymongo
from pymongo import MongoClient
from pandas import DataFrame, Series
import json
import datetime

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.111')['ouyh']

time=datetime.datetime.today()
time+=datetime.timedelta(hours=-24)
time=time.replace(hour=0,minute=0,second=0)
datestr=time.strftime("%Y%m%d")

for pci in range(252,354):
    for nPci in range(504):
        Pci_List=list(db['mro_'+datestr].find({'Pci': pci, 'NeighborPci': nPci}))
        if len(Pci_List)>0:
            df = DataFrame(Pci_List)
            stat=df.groupby(['CellId','Pci','NeighborPci', 'Earfcn', 'NeighborEarfcn']).sum().reset_index()
            statList = json.loads(stat.T.to_json()).values()
            for item in statList:
                item.update({'StatDate': time})
            db['mro_combined'].insert_many(statList)
            print('Pci: ', pci, ' inserted items: ', len(statList))
