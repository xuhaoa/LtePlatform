import pymongo
from pymongo import MongoClient
from pandas import DataFrame, Series
import json
import datetime

db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']

time=datetime.datetime.today()
time+=datetime.timedelta(hours=-24)
time=time.replace(hour=0,minute=0,second=0)
datestr=time.strftime("%Y%m%d")
Pci0_List=list(db['mro_'+datestr].find({'Pci': 2}))
df = DataFrame(Pci0_List)
stat=df.groupby(['CellId','Pci','NeighborPci']).sum().reset_index()
statList = json.loads(stat.T.to_json()).values()
for item in statList:
    item.update({'StatDate': time})
print(statList)