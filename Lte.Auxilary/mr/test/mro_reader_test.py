import os
import io
import gzip
from lxml import etree
import dateutil.parser
from mr_service import MroReader

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

gFile=gzip.GzipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD-LTE_MRO_HUAWEI_501035_20161122113000.xml.gz', 'r')

afilter = ['Qci', 'Utra', 'Gsm', 'Tdd']
reader=MroReader(afilter)
print(gFile.name)
root = etree.fromstring(gFile.read())
for item in root.iterchildren():
    item_key = []
    if item.tag == 'fileHeader':
        startTime= dateutil.parser.parse(item.attrib['startTime'])
        print(startTime)
    elif item.tag == 'eNB':
        item_id = item.attrib.get('id')
        for item_measurement in item.iterchildren():
            reader.read(item_measurement, item_id)
mro_output=reader.map_rsrp_diff(item_id)
print(startTime)
for item in mro_output:
    item.update({'StartTime': startTime})

print(mro_output)