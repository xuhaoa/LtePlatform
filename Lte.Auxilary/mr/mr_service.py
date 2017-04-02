from lxml import etree
import dateutil.parser
from pandas import DataFrame, Series
import pandas as pd
from functools import reduce
import json
import pymongo
from pymongo import MongoClient

def to_dec(value):
    if '.' in value:
        return float(value)
    else:
        return int(value)

class NeighborStat:
    def __init__(self, cellId, pci, **kwargs):
        super().__init__(**kwargs)
        self.stat={'CellId': cellId, 'Neighbors': 0, 'IntraNeighbors': 0, 'Pci': pci}

    def update(self, item_sub_dict):
        if item_sub_dict['LteNcRSRP']>item_sub_dict['LteScRSRP']-6:
            self.stat['Neighbors']+=1
            if item_sub_dict['LteScEarfcn']==item_sub_dict['LteNcEarfcn']:
                self.stat['IntraNeighbors']+=1

class MroReader:
    def __init__(self, afilter, **kwargs):
        super().__init__(**kwargs)
        self.item_dicts=[]
        self.item_positions=[]
        self.neighbor_stats=[]
        self.afilter=afilter

    def display(self):
        for item_dict in self.item_dicts:
            print(item_dict)

    def read(self, item_measurement, item_id):
        for item_element in item_measurement:
            if item_element.tag == 'smr':
                item_key = item_element.text.replace('MR.', '').split(' ')
                if 'LteScEarfcn' not in item_key:
                    return
            else:
                centerFilled=False
                item_dict = {}
                item_position={}
                neighbor_list=[]
                neighbor_stat=NeighborStat(item_id+'-'+item_element.attrib['id'], 0)
                for item_v in item_element:
                    item_value = item_v.text.replace('NIL', '-1').replace('N','').replace('E','').split(' ')
                    _item_sub_dict = dict(zip(item_key, map(to_dec, item_value)))
                    _item_sub_dict = {k: v for k, v in _item_sub_dict.items() if not any(ext in k for ext in self.afilter)}
                    if _item_sub_dict['LteNcPci']>=0:
                        _neighbor={}
                        _neighbor.update({'Pci': _item_sub_dict['LteNcPci']})
                        _neighbor.update({'Rsrp': _item_sub_dict['LteNcRSRP']})
                        _neighbor.update({'Earfcn': _item_sub_dict['LteNcEarfcn']})
                        neighbor_list.append(_neighbor)
                        neighbor_stat.update(_item_sub_dict)
                    else:
                        break
                    if not centerFilled:
                        item_dict.update(item_element.attrib)
                        item_dict.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                        item_dict.update({'SinrUl': _item_sub_dict['LteScSinrUL']})
                        item_dict.update({'Ta': _item_sub_dict['LteScTadv']})
                        item_dict.update({'Pci': _item_sub_dict['LteScPci']})
                        neighbor_stat.stat['Pci']=_item_sub_dict['LteScPci']
                        item_dict.update({'Earfcn': _item_sub_dict['LteScEarfcn']})
                        centerFilled=True
                        if _item_sub_dict['Longitude']!=-1 and _item_sub_dict['Latitude']!=-1:
                            item_position.update({'CellId': item_id+'-'+item_element.attrib['id']})
                            item_position.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                            item_position.update({'Ta': _item_sub_dict['LteScTadv']})
                            item_position.update({'Lontitute': _item_sub_dict['Longitude']})
                            item_position.update({'Lattitute': _item_sub_dict['Latitude']})
                            self.item_positions.append(item_position)
                if len(neighbor_list)>0:
                    item_dict.update({'NeighborList': neighbor_list})
                    self.item_dicts.append(item_dict)
                self.neighbor_stats.append(neighbor_stat.stat)

    def read_zte(self, item_measurement, item_id):
        for item_element in item_measurement:
            if item_element.tag == 'smr':
                item_key = item_element.text.replace('MR.', '').split(' ')
                if 'LteScEarfcn' not in item_key:
                    return
            else:
                centerFilled=False
                item_dict = {}
                item_position={}
                neighbor_list=[]
                neighbor_stat=NeighborStat(item_id+'-'+item_element.attrib['MR.objectId'], 0)
                for item_v in item_element:
                    item_value = item_v.text.replace('NIL', '-1').split(' ')
                    _item_sub_dict = dict(zip(item_key, map(to_dec, item_value)))
                    _item_sub_dict = {k: v for k, v in _item_sub_dict.items() if not any(ext in k for ext in self.afilter)}
                    if _item_sub_dict['LteNcPci']>=0:
                        _neighbor={}
                        _neighbor.update({'Pci': _item_sub_dict['LteNcPci']})
                        _neighbor.update({'Rsrp': _item_sub_dict['LteNcRSRP']})
                        _neighbor.update({'Earfcn': _item_sub_dict['LteNcEarfcn']})
                        neighbor_list.append(_neighbor)
                        neighbor_stat.update(_item_sub_dict)
                    else:
                        break
                    if not centerFilled:
                        item_dict.update({'id': item_id+'-'+item_element.attrib['MR.objectId']})                        
                        item_dict.update({'Rsrp': _item_sub_dict['LteScRSRP']})                        
                        item_dict.update({'SinrUl': _item_sub_dict['LteScSinrUL']})
                        item_dict.update({'Ta': _item_sub_dict['LteScTadv']})                        
                        item_dict.update({'Pci': _item_sub_dict['LteScPci']})
                        neighbor_stat.stat['Pci']=_item_sub_dict['LteScPci']
                        item_dict.update({'Earfcn': _item_sub_dict['LteScEarfcn']})                        
                        centerFilled=True
                        if _item_sub_dict['Longitude']!=-1 and _item_sub_dict['Latitude']!=-1:
                            item_position.update({'CellId': item_id+'-'+item_element.attrib['MR.objectId']})
                            item_position.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                            item_position.update({'Ta': _item_sub_dict['LteScTadv']})
                            if  _item_sub_dict['Longitude']>200:
                                item_position.update({'Lontitute': _item_sub_dict['Longitude'] * 360 *1.0/ 16777216})
                                item_position.update({'Lattitute': _item_sub_dict['Latitude'] * 90 / 8388608})
                            else:
                                item_position.update({'Lontitute': _item_sub_dict['Longitude']})
                                item_position.update({'Lattitute': _item_sub_dict['Latitude']})
                            self.item_positions.append(item_position)
                if len(neighbor_list)>0:
                    item_dict.update({'NeighborList': neighbor_list})
                    self.item_dicts.append(item_dict)
                self.neighbor_stats.append(neighbor_stat.stat)

    def _filter_by_neighbor_len(self, length):
        return list(filter(lambda x: True if len(x['NeighborList'])==length else False, self.item_dicts))

    def _map_neighbor_rsrp_diff(self, index):
        measureList=self._filter_by_neighbor_len(index)
        if len(measureList)==0:
            return []
        return list(map(lambda item: {
            'CellId': item['id'],
            'Earfcn': item['Earfcn'],
            'NeighborPci': item['NeighborList'][index-1]['Pci'],
            'NeighborEarfcn': item['NeighborList'][index-1]['Earfcn'],
            'NeighborRsrp': item['NeighborList'][index-1]['Rsrp'],
            'RsrpDiff': item['Rsrp']-item['NeighborList'][index-1]['Rsrp'],
            'Rsrp': item['Rsrp'],
            'Pci': item['Pci'],
            'Ta': item['Ta'],
            'SinrUl': item['SinrUl']
        }, measureList))

    def map_rsrp_diff(self, eNodebId):
        diff_list=list(map(lambda index: self._map_neighbor_rsrp_diff(index+1), list(range(6))))
        combined_list=reduce(lambda first,second: first+second,diff_list,[])
        if len(combined_list)==0:
            return []
        stat_list=list(map(lambda item: {
            'CellId': eNodebId + '-' + item['CellId'],
            'Earfcn': item['Earfcn'],
            'NeighborPci': item['NeighborPci'],
            'Pci': item['Pci'],
            'NeighborEarfcn': item['NeighborEarfcn'],
            'Diff0': 1 if item['RsrpDiff']<=0 else 0,
            'Diff3': 1 if item['RsrpDiff']<=3 and item['RsrpDiff']>0 else 0,
            'Diff6': 1 if item['RsrpDiff']<=6 and item['RsrpDiff']>3 else 0,
            'Diff9': 1 if item['RsrpDiff']<=9 and item['RsrpDiff']>6 else 0,
            'Diff12': 1 if item['RsrpDiff']<=12 and item['RsrpDiff']>9 else 0,
            'DiffLarge': 1 if item['RsrpDiff']>12 else 0,
            'RsrpBelow120': 1 if item['Rsrp']<20 else 0,
            'RsrpBetween120110': 1 if item['Rsrp']<30 and item['Rsrp']>=20 else 0,
            'RsrpBetween110105': 1 if item['Rsrp']<35 and item['Rsrp']>=30 else 0,
            'RsrpBetween105100': 1 if item['Rsrp']<40 and item['Rsrp']>=35 else 0,
            'RsrpBetween10090': 1 if item['Rsrp']<50 and item['Rsrp']>=40 else 0,
            'RsrpAbove90': 1 if item['Rsrp']>=50 else 0,
            'NeighborRsrpBelow120': 1 if item['NeighborRsrp']<20 else 0,
            'NeighborRsrpBetween120110': 1 if item['NeighborRsrp']<30 and item['NeighborRsrp']>=20 else 0,
            'NeighborRsrpBetween110105': 1 if item['NeighborRsrp']<35 and item['NeighborRsrp']>=30 else 0,
            'NeighborRsrpBetween105100': 1 if item['NeighborRsrp']<40 and item['NeighborRsrp']>=35 else 0,
            'NeighborRsrpBetween10090': 1 if item['NeighborRsrp']<50 and item['NeighborRsrp']>=40 else 0,
            'NeighborRsrpAbove90': 1 if item['NeighborRsrp']>=50 else 0,
            'Ta0or1': 1 if item['Ta']==0 or item['Ta']==1 else 0,
            'Ta2or3': 1 if item['Ta']==2 or item['Ta']==3 else 0,
            'Ta4or5': 1 if item['Ta']==4 or item['Ta']==5 else 0,
            'Ta6or7': 1 if item['Ta']==6 or item['Ta']==7 else 0,
            'Ta8or9': 1 if item['Ta']==8 or item['Ta']==9 else 0,
            'Ta10to12': 1 if item['Ta']>=10 and item['Ta']<=12 else 0,
            'Ta13to15': 1 if item['Ta']>=13 and item['Ta']<=15 else 0,
            'Ta16to19': 1 if item['Ta']>=16 and item['Ta']<=19 else 0,
            'Ta20to24': 1 if item['Ta']>=20 and item['Ta']<=24 else 0,
            'Ta25to29': 1 if item['Ta']>=25 and item['Ta']<=29 else 0,
            'Ta30to39': 1 if item['Ta']>=30 and item['Ta']<=39 else 0,
            'TaAbove40': 1 if item['Ta']>=40 else 0,
            'SinrUl0to9': 1 if item['SinrUl']>=0 and item['SinrUl']<=9 else 0,
            'SinrUl10to19': 1 if item['SinrUl']>=10 and item['SinrUl']<=19 else 0,
            'SinrUl20to24': 1 if item['SinrUl']>=20 and item['SinrUl']<=24 else 0,
            'SinrUl25to29': 1 if item['SinrUl']>=25 and item['SinrUl']<=29 else 0,
            'SinrUl30to34': 1 if item['SinrUl']>=30 and item['SinrUl']<=34 else 0,
            'SinrUlAbove35': 1 if item['SinrUl']>=35 else 0
        }, combined_list))
        df = DataFrame(stat_list)
        stat=df.groupby(['CellId','Pci','NeighborPci', 'Earfcn', 'NeighborEarfcn']).sum().reset_index()
        return json.loads(stat.T.to_json()).values()

    def map_neighbor_stats(self):
        stat_list=list(map(lambda item: {
            'CellId': item['CellId'],
            'Pci': item['Pci'],
            'Neighbors0': 1 if item['Neighbors']==0 else 0,
            'Neighbors1': 1 if item['Neighbors']==1 else 0,
            'Neighbors2': 1 if item['Neighbors']==2 else 0,
            'Neighbors3': 1 if item['Neighbors']==3 else 0,
            'NeighborsMore': 1 if item['Neighbors']>3 else 0,
            'IntraNeighbors0': 1 if item['IntraNeighbors']==0 else 0,
            'IntraNeighbors1': 1 if item['IntraNeighbors']==1 else 0,
            'IntraNeighbors2': 1 if item['IntraNeighbors']==2 else 0,
            'IntraNeighbors3': 1 if item['IntraNeighbors']==3 else 0,
            'IntraNeighborsMore': 1 if item['IntraNeighbors']>3 else 0
        }, self.neighbor_stats))
        df = DataFrame(stat_list)
        stat=df.groupby(['CellId','Pci']).sum().reset_index()
        return json.loads(stat.T.to_json()).values()

    def map_rsrp_diff_zte(self):
        diff_list=list(map(lambda index: self._map_neighbor_rsrp_diff(index+1), list(range(6))))
        combined_list=reduce(lambda first,second: first+second,diff_list,[])
        if len(combined_list)==0:
            return []
        stat_list=list(map(lambda item: {
            'CellId': item['CellId'],
            'Earfcn': item['Earfcn'],
            'NeighborPci': item['NeighborPci'],
            'NeighborEarfcn': item['NeighborEarfcn'],
            'Pci': item['Pci'],
            'Diff0': 1 if item['RsrpDiff']<=0 else 0,
            'Diff3': 1 if item['RsrpDiff']<=3 and item['RsrpDiff']>0 else 0,
            'Diff6': 1 if item['RsrpDiff']<=6 and item['RsrpDiff']>3 else 0,
            'Diff9': 1 if item['RsrpDiff']<=9 and item['RsrpDiff']>6 else 0,
            'Diff12': 1 if item['RsrpDiff']<=12 and item['RsrpDiff']>9 else 0,
            'DiffLarge': 1 if item['RsrpDiff']>12 else 0,
            'RsrpBelow120': 1 if item['Rsrp']<20 else 0,
            'RsrpBetween120110': 1 if item['Rsrp']<30 and item['Rsrp']>=20 else 0,
            'RsrpBetween110105': 1 if item['Rsrp']<35 and item['Rsrp']>=30 else 0,
            'RsrpBetween105100': 1 if item['Rsrp']<40 and item['Rsrp']>=35 else 0,
            'RsrpBetween10090': 1 if item['Rsrp']<50 and item['Rsrp']>=40 else 0,
            'RsrpAbove90': 1 if item['Rsrp']>=50 else 0,
            'NeighborRsrpBelow120': 1 if item['NeighborRsrp']<20 else 0,
            'NeighborRsrpBetween120110': 1 if item['NeighborRsrp']<30 and item['NeighborRsrp']>=20 else 0,
            'NeighborRsrpBetween110105': 1 if item['NeighborRsrp']<35 and item['NeighborRsrp']>=30 else 0,
            'NeighborRsrpBetween105100': 1 if item['NeighborRsrp']<40 and item['NeighborRsrp']>=35 else 0,
            'NeighborRsrpBetween10090': 1 if item['NeighborRsrp']<50 and item['NeighborRsrp']>=40 else 0,
            'NeighborRsrpAbove90': 1 if item['NeighborRsrp']>=50 else 0,
            'Ta0or1': 1 if item['Ta']==0 or item['Ta']==1 else 0,
            'Ta2or3': 1 if item['Ta']==2 or item['Ta']==3 else 0,
            'Ta4or5': 1 if item['Ta']==4 or item['Ta']==5 else 0,
            'Ta6or7': 1 if item['Ta']==6 or item['Ta']==7 else 0,
            'Ta8or9': 1 if item['Ta']==8 or item['Ta']==9 else 0,
            'Ta10to12': 1 if item['Ta']>=10 and item['Ta']<=12 else 0,
            'Ta13to15': 1 if item['Ta']>=13 and item['Ta']<=15 else 0,
            'Ta16to19': 1 if item['Ta']>=16 and item['Ta']<=19 else 0,
            'Ta20to24': 1 if item['Ta']>=20 and item['Ta']<=24 else 0,
            'Ta25to29': 1 if item['Ta']>=25 and item['Ta']<=29 else 0,
            'Ta30to39': 1 if item['Ta']>=30 and item['Ta']<=39 else 0,
            'TaAbove40': 1 if item['Ta']>=40 else 0,
            'SinrUl0to9': 1 if item['SinrUl']>=0 and item['SinrUl']<=9 else 0,
            'SinrUl10to19': 1 if item['SinrUl']>=10 and item['SinrUl']<=19 else 0,
            'SinrUl20to24': 1 if item['SinrUl']>=20 and item['SinrUl']<=24 else 0,
            'SinrUl25to29': 1 if item['SinrUl']>=25 and item['SinrUl']<=29 else 0,
            'SinrUl30to34': 1 if item['SinrUl']>=30 and item['SinrUl']<=34 else 0,
            'SinrUlAbove35': 1 if item['SinrUl']>=35 else 0
        }, combined_list))
        df = DataFrame(stat_list)
        stat=df.groupby(['CellId','Pci','NeighborPci', 'Earfcn', 'NeighborEarfcn']).sum().reset_index()
        return json.loads(stat.T.to_json()).values()
class MrsReader:
    def __init__(self, mrNames, startTime, date_dir, db, eNodebId, **kwargs):
        self.mrNames=mrNames
        self.startTime=startTime
        self.date_dir=date_dir
        self.db=db
        self.eNodebId=eNodebId
        return super().__init__(**kwargs)

    def read(self, item_measurement):
        mrName=item_measurement.attrib['mrName'].replace('MR.','')
        if mrName in self.mrNames:
            item_dicts=[]
            for item_element in item_measurement.iterchildren():
                if item_element.tag == 'smr':
                    item_key = item_element.text.replace('MR.', '').replace('.','_').split(' ')
                else:
                    item_dict={}
                    item_dict.update({'CellId': self.eNodebId + '-' + item_element.attrib['id']})
                    item_value = item_element[0].text.split(' ')
                    item_dict.update(dict(zip(item_key, map(int, item_value))))
                    item_dict.update({'StartTime': self.startTime})
                    item_dicts.append(item_dict)
            if len(item_dicts)>0:
                self.db['mrs_'+mrName+'_'+self.date_dir].insert_many(item_dicts)
            #print(item_dicts)

    def read_zte(self, item_measurement, eNodebId):
        mrName=item_measurement.attrib['mrName'].replace('MR.','')
        if mrName in self.mrNames:
            item_dicts=[]
            for item_element in item_measurement.iterchildren():
                if item_element.tag == 'smr':
                    item_key = item_element.text.replace('MR.', '').replace('.','_').split(' ')
                else:
                    item_dict={}
                    item_dict.update({'CellId': eNodebId+'-'+item_element.attrib['MR.objectId']})
                    item_value = item_element[0].text.split(' ')
                    item_dict.update(dict(zip(item_key, map(int, item_value))))
                    item_dict.update({'StartTime': self.startTime})
                    item_dicts.append(item_dict)
            if len(item_dicts)>0:
                self.db['mrs_'+mrName+'_'+self.date_dir].insert_many(item_dicts)