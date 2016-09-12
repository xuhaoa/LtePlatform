from lxml import etree
import dateutil.parser
from pandas import DataFrame, Series
import pandas as pd
from functools import reduce

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
        return list(map(lambda item: {
            'CellId': item['id'],
            'NeighborPci': item['NeighborList'][index-1]['Pci'],
            'RsrpDiff': item['Rsrp']-item['NeighborList'][index-1]['Rsrp']
        }, measureList))

    def map_rsrp_diff(self):
        diff_list=list(map(lambda index: self._map_neighbor_rsrp_diff(index+1), list(range(6))))
        return DataFrame(reduce(lambda first,second: first+second,diff_list,[]))