from lxml import etree
import dateutil.parser
from pandas import DataFrame, Series
import pandas as pd
from functools import reduce
import json

class MroReader:
    def __init__(self, afilter, **kwargs):
        super().__init__(**kwargs)
        self.item_dicts=[]
        self.afilter=afilter

    def display(self):
        for item_dict in self.item_dicts:
            print(item_dict)

    def read(self, item_measurement, item_id):
        for item_element in item_measurement:
            if item_element.tag == 'smr':
                item_key = item_element.text.replace('MR.', '').split(' ')
            else:
                centerFilled=False
                item_dict = {}
                item_dict.update({'eNodebId': int(item_id)})
                item_dict.update(item_element.attrib)
                if item_dict.get('TimeStamp'):
                    item_dict.update({'TimeStamp': dateutil.parser.parse(item_dict.get('TimeStamp'))})
                neighbor_list=[]
                for item_v in item_element:
                    item_value = item_v.text.replace('NIL', '-1').split(' ')
                    _item_sub_dict = dict(zip(item_key, map(int, item_value)))
                    _item_sub_dict = {k: v for k, v in _item_sub_dict.items() if not any(ext in k for ext in self.afilter)}
                    if _item_sub_dict['LteNcPci']>0:
                        _neighbor={}
                        _neighbor.update({'Pci': _item_sub_dict['LteNcPci']})
                        _neighbor.update({'Earfcn': _item_sub_dict['LteNcEarfcn']})
                        _neighbor.update({'Rsrp': _item_sub_dict['LteNcRSRP']})
                        neighbor_list.append(_neighbor)
                    if not centerFilled:
                        item_dict.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                        item_dict.update({'SinrUl': _item_sub_dict['LteScSinrUL']})
                        item_dict.update({'Ta': _item_sub_dict['LteScTadv']})
                        item_dict.update({'Pci': _item_sub_dict['LteScPci']})
                        centerFilled=True
                item_dict.update({'NeighborList': neighbor_list})
                self.item_dicts.append(item_dict)

    def _filter_by_neighbor_len(self, length):
        return list(filter(lambda x: True if len(x['NeighborList'])==length else False, self.item_dicts))

    def _map_neighbor_rsrp_diff(self, index):
        measureList=self._filter_by_neighbor_len(index)
        if len(measureList)==0:
            return []
        return list(map(lambda item: {
            'CellId': item['id'],
            'NeighborPci': item['NeighborList'][index-1]['Pci'],
            'RsrpDiff': item['Rsrp']-item['NeighborList'][index-1]['Rsrp'],
            'Rsrp': item['Rsrp'],
            'Pci': item['Pci'],
            'Ta': item['Ta'],
            'SinrUl': item['SinrUl']
        }, measureList))

    def map_rsrp_diff(self):
        diff_list=list(map(lambda index: self._map_neighbor_rsrp_diff(index+1), list(range(6))))
        combined_list=reduce(lambda first,second: first+second,diff_list,[])
        if len(combined_list)==0:
            return []
        stat_list=list(map(lambda item: {
            'CellId': item['CellId'],
            'NeighborPci': item['NeighborPci'],
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
        stat=df.groupby(['CellId','Pci','NeighborPci']).sum().reset_index()
        return json.loads(stat.T.to_json()).values()