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

Precise_List=list(db['precise_'+datestr].find())
df=DataFrame(Precise_List)
stat=df.groupby(['CellId']).sum().reset_index()
statList = json.loads(stat.T.to_json()).values()
for item in statList:
    item.update({'StatDate': time})
db['precise_combined'].insert_many(statList)
print('Precise inserted items: ', len(statList))