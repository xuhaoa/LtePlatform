from lxml import etree
import dateutil.parser

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
                        centerFilled=True
                item_dict.update({'NeighborList': neighbor_list})
                self.item_dicts.append(item_dict)