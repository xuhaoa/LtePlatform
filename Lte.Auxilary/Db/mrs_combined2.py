import pymongo
from pymongo import MongoClient
from pandas import DataFrame, Series
import json
import datetime

db = MongoClient('mongodb://root:Abcdef9*@132.110.71.123')['ouyh']

time=datetime.datetime.today()
time+=datetime.timedelta(hours=-24)
time=time.replace(hour=0,minute=0,second=0)
datestr=time.strftime("%Y%m%d")
regexNames=['ReceivedIPower']
frequencyList=['100','1825','2446','75','1850','2452']

def process_combined_general(theme,sectorId):
    Pci_List=list(db['mrs_'+theme+'_'+datestr].find({'CellId': sectorId}))
    if len(Pci_List)>0:
        df = DataFrame(Pci_List)
        stat=df.groupby(['CellId']).sum().reset_index()
        statList = json.loads(stat.T.to_json()).values()
        for item in statList:
            item.update({'StatDate': time})
        db['mrs_'+theme+'_combined'].insert_many(statList)
        print('CellId: ', sectorId, 'from theme '+theme, ' inserted items: ', len(statList))

def process_combined_regex(theme,eNodebId,cellId):
    for frequency in frequencyList:
        for subframe in range(10):
            sectorId=str(eNodebId)+'-'+str(cellId)+':'+frequency+':'+str(subframe)
            process_combined_general(theme,sectorId)

for theme in regexNames:
    for eNodebId in range(550912, 552960):
        for cellId in range(16):
            process_combined_regex(theme,eNodebId,cellId)
            process_combined_regex(theme,eNodebId,cellId+48)
            process_combined_regex(theme,eNodebId,cellId+16)
    for eNodebId in range(499712, 503808):
        for cellId in range(16):
            process_combined_regex(theme,eNodebId,cellId)
            process_combined_regex(theme,eNodebId,cellId+48)
            process_combined_regex(theme,eNodebId,cellId+16)
    for eNodebId in range(868352,870400):
        for cellId in range(16):
            process_combined_regex(theme,eNodebId,cellId)
            process_combined_regex(theme,eNodebId,cellId+48)
            process_combined_regex(theme,eNodebId,cellId+16)

