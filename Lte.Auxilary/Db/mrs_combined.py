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
mrNames=['RSRP','Tadv','PowerHeadRoom','SinrUL','TadvRsrp']

def process_combined(theme,eNodebId,cellId):
    sectorId=str(eNodebId)+'-'+str(cellId)
    Pci_List=list(db['mrs_'+theme+'_'+datestr].find({'CellId': sectorId}))
    if len(Pci_List)>0:
        df = DataFrame(Pci_List)
        stat=df.groupby(['CellId']).sum().reset_index()
        statList = json.loads(stat.T.to_json()).values()
        for item in statList:
            item.update({'StatDate': time})
        db['mrs_'+theme+'_combined'].insert_many(statList)
        print('CellId: ', sectorId, 'from theme '+theme, ' inserted items: ', len(statList))

for theme in mrNames:
    for eNodebId in range(550912, 552960):
        for cellId in range(16):
            process_combined(theme,eNodebId,cellId)
            process_combined(theme,eNodebId,cellId+48)
            process_combined(theme,eNodebId,cellId+16)
    for eNodebId in range(499712, 503808):
        for cellId in range(16):
            process_combined(theme,eNodebId,cellId)
            process_combined(theme,eNodebId,cellId+48)
            process_combined(theme,eNodebId,cellId+16)
    for eNodebId in range(868352,870400):
        for cellId in range(16):
            process_combined(theme,eNodebId,cellId)
            process_combined(theme,eNodebId,cellId+48)
            process_combined(theme,eNodebId,cellId+16)

