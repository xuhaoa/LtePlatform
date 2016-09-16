import os
import io
import gzip
from lxml import etree
import dateutil.parser
from mr_service import MrsReader

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

gFile=gzip.GzipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD_LTE_MRS_HUAWEI_500540_20160911100000.xml.gz', 'r')

reader=MrsReader()
print(gFile.name)
root = etree.fromstring(gFile.read())
for item in root.iterchildren():
    if item.tag == 'fileHeader':
        startTime= dateutil.parser.parse(item.attrib['startTime'])
        print(startTime)
    elif item.tag == 'eNB':
        for item_measurement in item.iterchildren():
            reader.read(item_measurement)