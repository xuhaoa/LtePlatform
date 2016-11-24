import os
import io
import gzip
from lxml import etree
import dateutil.parser
from mr_service import MrsReader
from customize_utilities import *

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

gFile=gzip.GzipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD-LTE_MRS_HUAWEI_501195_20161122113000.xml.gz', 'r')

mrNames=['RSRP','Tadv','PowerHeadRoom','SinrUL','TadvRsrp']
date_dir=generate_date_hours_shift(shift=-4)
db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']
print(gFile.name)
root = etree.fromstring(gFile.read())
for item in root.iterchildren():
    if item.tag == 'fileHeader':
        startTime= dateutil.parser.parse(item.attrib['startTime'])
        print(startTime)
    elif item.tag == 'eNB':
        eNodebId=item.attrib['id']
        print(eNodebId)
        reader=MrsReader(mrNames,startTime,date_dir,db,eNodebId)
        for item_measurement in item.iterchildren():
            reader.read(item_measurement)