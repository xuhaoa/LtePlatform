import os
import io
import gzip
from lxml import etree
import dateutil.parser
from mr_service import MroReader
import json

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

gFile=gzip.GzipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD_LTE_MRO_HUAWEI_499719_20160902134500.xml.gz', 'r')

afilter = ['Qci', 'Utra', 'Gsm', 'Tdd']
reader=MroReader(afilter)
print(gFile.name)
root = etree.fromstring(gFile.read())
for item in root.iterchildren():
    item_key = []
    if item.tag == 'fileHeader':
        startTime= item.attrib['startTime']
        print(dateutil.parser.parse(startTime))
    elif item.tag == 'eNB':
        item_id = item.attrib.get('id')
        for item_measurement in item.iterchildren():
            reader.read(item_measurement, item_id)
stat=reader.map_rsrp_diff()
mro_output=json.loads(stat.T.to_json())
print(mro_output.values())