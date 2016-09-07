import os
import io
import gzip
from lxml import etree
import dateutil.parser

def update_ta_distribution(ta_distribution, item_dict):
    ta_dist={}
    for dist in ta_distribution:
        if dist['id']==item_dict['id']:
            ta_dist=dist
            pass
    if ta_dist.get('id')==None:
        ta_dist={'id': item_dict['id'], 'counts': [ 0 for x in range(64)]}
        ta_distribution.append(ta_dist)
    if item_dict['Ta']>=0:
        ta_dist['counts'][item_dict['Ta']]+=1

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

gFile=gzip.GzipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD_LTE_MRO_HUAWEI_499719_20160902134500.xml.gz', 'r')

afilter = ['Qci', 'Utra', 'Gsm', 'Tdd']
print(gFile.name)
root = etree.fromstring(gFile.read())
for item in root.iterchildren():
    item_key = []
    if item.tag == 'fileHeader':
        print('Header:', item.attrib)
    elif item.tag == 'eNB':
        item_id = item.attrib.get('id')
        for item_measurement in item.iterchildren():
            ta_distribution=[]
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
                        _item_sub_dict = {k: v for k, v in _item_sub_dict.items() if not any(ext in k for ext in afilter)}
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
                    update_ta_distribution(ta_distribution,item_dict)
            print(ta_distribution)
gFile.close()