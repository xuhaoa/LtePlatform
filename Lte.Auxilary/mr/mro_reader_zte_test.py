import os
import io
import zipfile
from lxml import etree
import dateutil.parser
from mr_service import MroReader

os.chdir('D:\\LtePlatform\\Lte.Auxilary\\mr')
os.listdir('D:\\LtePlatform\\Lte.Auxilary\\mr')

zFile=zipfile.ZipFile('D:\\LtePlatform\\Lte.Auxilary\\mr\\FDD-LTE_MRO_ZTE_OMC1_480244_20161202103000.zip', 'r')

afilter = ['CDMA']
reader=MroReader(afilter)
print(zFile.filename)
root = etree.fromstring(zFile.read(zFile.namelist()[0]))
for item in root.iterchildren():
    item_key = []
    if item.tag == 'fileHeader':
        startTime= dateutil.parser.parse(item.attrib['startTime'])
        print(startTime)
    elif item.tag == 'eNB':
        item_id = item.attrib.get('MR.eNBId')
        for item_measurement in item.iterchildren():
            reader.read_zte(item_measurement, item_id)
if (item_id!=''):
    mro_output=reader.map_rsrp_diff_zte()
    print(startTime)
    for item in mro_output:
        item.update({'StartTime': startTime})

    print(mro_output)
