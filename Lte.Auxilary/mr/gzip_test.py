import os
import io
import gzip
from lxml import etree

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

gFile=gzip.GzipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD_LTE_MRO_HUAWEI_499719_20160902134500.xml.gz', 'r')
print(gFile.name)
root = etree.fromstring(gFile.read())
for item in root.iterchildren():
    if item.tag == 'fileHeader':
        print('Header:', item.attrib)
    elif item.tag == 'eNB':
        item_id = item.attrib.get('id')
        print('ENodebId: ', item_id)
        for item_measurement in item.iterchildren():
            mrName = item_measurement.attrib.get('mrName')
            for item_element in item_measurement:
                print(item_element.tag, ':', item_element.attrib, ':', item_element.text)
                for item_v in item_element:
                    print(item_v.tag, ':', item_v.text.strip())

gFile.close()