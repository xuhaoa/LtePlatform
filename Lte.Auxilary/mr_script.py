
#coding=utf8
import pandas as pd
from pandas import DataFrame, Series
import pymongo
from pymongo import MongoClient
import json
from datetime import datetime
import os
from io import StringIO
import dateutil.parser

current_date = datetime.now().strftime('%Y%m%d')
#db = MongoClient('localhost', 27017)['yaoyq']
db = MongoClient('mongodb://root:Abcdef9*@localhost:27017')['yaoyq']
names_list = []
file_list = []
path = os.path.join('/home/wireless/MrData')
print(current_date)
for root_no, dirs_no, files in os.walk(path):
    for name in files:
        #df=pd.read_csv()
        try:
            print(name)
            name_modify = name
            #f = open(os.path.join(root_no, name)).read()
        except:
            name_modify = name.encode('utf8', 'surrogateescape').decode('gb18030')
            print(name_modify)
            #f = open(os.path.join(root_no, name), encoding='gb18030').read()
        if db['InsertedFiles'].find({'filename': name_modify}).count() > 0:
            print('已插入文件', name_modify)
        else:
            if '干扰' in name_modify:
                names_list = ['ENODEBID_PCI_NPCI_NFREQ', 'MOD3_COUNT', 'MOD6_COUNT', 'OVERCOVER_COFREQ_6DB', 'OVERCOVER_COFREQ_10DB', 'INTERF_ONLY_COFREQ']
                tbname = 'CellInterfMatrix'
            elif '统计' in name_modify:
                names_list = ['ENODEBID_PCI', 'MR_COUNT', 'PRECISE_COVER_MR_COUNT', 'RECOVER_MR_COUNT', 'WEAK_COVER_MR_COUNT', 'MOD3_MR_COUNT', 'MOD6_MR_COUNT']
                tbname = 'CellStastic'
            elif '距离' in name_modify:
                names_list = ['ENODEBID_PCI', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                tbname = 'CellDistanceDistribtute'
            else:
                print('注意：“'+name_modify+'”文件无法解析，不包含干扰、统计、距离的字样，请确认。')
                continue
            with open(os.path.join(root_no, name), encoding='gb18030') as f:
                data = f.read()
                df = pd.read_csv(StringIO(data), sep=',', names=names_list, lineterminator='\n', skiprows=1)
            if df.empty:
                continue
            ndf = DataFrame()
            #print(df.head())
            if '干扰' in name_modify:
                ndf['ENodebId'] = df['ENODEBID_PCI_NPCI_NFREQ'].apply(lambda x:int(x.split('_')[0]))
                ndf['Pci'] = df['ENODEBID_PCI_NPCI_NFREQ'].apply(lambda x:int(x.split('_')[1]))
                ndf['NeighborPci'] = df['ENODEBID_PCI_NPCI_NFREQ'].apply(lambda x:int(x.split('_')[2]))
                ndf['NeighborFreq'] = df['ENODEBID_PCI_NPCI_NFREQ'].apply(lambda x:int(x.split('_')[3]))
                ndf['Mod3Count'] = df['MOD3_COUNT']
                ndf['Mod6Count'] = df['MOD6_COUNT']
                ndf['Over6db'] = df['OVERCOVER_COFREQ_6DB']
                ndf['Over10db'] = df['OVERCOVER_COFREQ_10DB']
                ndf['InterfLevel'] = df['INTERF_ONLY_COFREQ']
            elif '统计' in name_modify:
                ndf['ENodebId'] = df['ENODEBID_PCI'].apply(lambda x:int(x.split('_')[0]))
                ndf['Pci'] = df['ENODEBID_PCI'].apply(lambda x:int(x.split('_')[1]))
                ndf['MrCount'] = df['MR_COUNT']
                ndf['PreciseCount'] = df['PRECISE_COVER_MR_COUNT']
                ndf['OverCoverCount'] = df['RECOVER_MR_COUNT']
                ndf['WeakCoverCount'] = df['WEAK_COVER_MR_COUNT']
                ndf['Mod3Count'] = df['MOD3_MR_COUNT']
                ndf['Mod6Count'] = df['MOD6_MR_COUNT']
            elif '距离' in name_modify:
                #print(df['ENODEBID_PCI'])
                ndf['ENodebId'] = df['ENODEBID_PCI'].apply(lambda x:int(x.split('_')[0]))
                ndf['PciInfo'] = df['ENODEBID_PCI'].apply(lambda x:x.split('_')[1])
                ndf['Distance0'] = df['1']
                ndf['Distance1'] = df['2']
                ndf['Distance2'] = df['3']
                ndf['Distance3'] = df['4']
                ndf['Distance4'] = df['5']
                ndf['Distance5'] = df['6']
                ndf['Distance6'] = df['7']
                ndf['Distance7'] = df['8']
                ndf['Distance8'] = df['9']
                ndf['Distance9'] = df['10']
                ndf['Distance10'] = df['11']
                ndf['Distance11'] = df['12']
                ndf['Distance12'] = df['13']
                ndf['Distance13'] = df['14']
                ndf['Distance14'] = df['15']
                ndf['Distance15'] = df['16']
                ndf['Distance16'] = df['17']
                ndf['Distance17'] = df['18']
                ndf['Distance18'] = df['19']
                ndf['Distance29'] = df['20']
                ndf['Distance20'] = df['21']
                ndf['Distance21'] = df['22']
                ndf['Distance22'] = df['23']
                ndf['Distance23'] = df['24']
                ndf['Distance24'] = df['25']
                ndf['Distance25'] = df['26']
                ndf['Distance26'] = df['27']
                ndf['Distance27'] = df['28']
                ndf['Distance28'] = df['29']
                ndf['Distance29'] = df['30']
                ndf['Distance30'] = df['31']
            else:
                continue
            rs = json.loads(ndf.T.to_json())
            #print(dateutil.parser.parse(name_modify[:12]))
            for value in rs.values():
                value.update({'CurrentDate': dateutil.parser.parse(name_modify[:12])})
            #print('error:', name_modify)
            db[tbname].insert_many(rs.values())
            # print(name + '成功插入数据库！')
            db['InsertedFiles'].insert({'filename': name_modify})



