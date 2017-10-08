from mr_service import *
from lxml import etree
import unittest

class BasicProcessUnitTest(unittest.TestCase):
    def test_get_mro_item_key(self):
        item_element=etree.XML('''<smr>MR.LteScRSRP MR.LteNcRSRP MR.LteScRSRQ MR.LteNcRSRQ MR.LteScEarfcn MR.LteScPci MR.LteNcEarfcn MR.LteNcPci MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScRI MR.CQI MR.LteScPUSCHPRBNum MR.LteScPDSCHPRBNum MR.LteScBSR MR.CDMAtype MR.CDMANcBand MR.CDMANcArfcn MR.CDMAPNphase MR.LteCDMAorHRPDNcPilotStrength MR.CDMANcPci MR.Longitude MR.Latitude</smr>''')
        item_key=get_mro_item_key(item_element)
        self.assertTrue('LteScRSRP' in item_key)
        self.assertTrue('LteScPci' in item_key)

    def test_get_mro_item_key_zte(self):
        item_element=etree.XML('''<smr>MR.LteScEarfcn MR.LteScPci MR.LteSccgi MR.LteScRSRP MR.LteScRSRQ MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScUeRxTxTD MR.LteSceEuRxTxTD MR.LteNcEarfcn MR.LteNcPci MR.LteNcRSRP MR.LteNcRSRQ MR.LteFddNcEarfcn MR.LteFddNcPci MR.LteFddNcRSRP MR.LteFddNcRSRQ MR.LteTddNcEarfcn MR.LteTddNcPci MR.LteTddNcRSRP MR.LteTddNcRSRQ </smr>''')
        item_key=get_mro_item_key(item_element)
        self.assertTrue('LteScRSRP' in item_key)
        self.assertTrue('LteScPci' in item_key)
        self.assertTrue('LteNcEarfcn' in item_key)
        self.assertTrue('LteFddNcPci' in item_key)

class ObjectElementUnitTest(unittest.TestCase):
    def test_read_old_zte_format(self):
        item_element=etree.XML('''<object MR.MmeCode="2" MR.MmeGroupId="17409" MR.MmeUeS1apId="247468164" MR.TimeStamp="2017-09-30T23:15:01.760" MR.objectId="0">
<v>100 213 40 28 2 33 NIL 23 0 8 0 0 5 2 4 15 15 NIL NIL 1650 52 44 24 NIL NIL NIL NIL NIL NIL</v>
<v>100 213 40 28 2 33 NIL 23 0 8 0 0 5 2 4 15 15 NIL NIL 2446 45 35 12 NIL NIL NIL NIL NIL NIL</v>
<v>100 213 40 28 2 33 NIL 23 0 8 0 0 5 2 4 15 15 NIL NIL 2446 46 35 9 NIL NIL NIL NIL NIL NIL</v>
<v>100 213 40 28 2 33 NIL 23 0 8 0 0 5 2 4 15 15 NIL NIL 2446 62 35 12 NIL NIL NIL NIL NIL NIL</v>
</object>''')
        object_element=ObjectElement(item_element)
        user_num=object_element.get_user_num()
        sector_id=object_element.get_sector_id('502453')
        self.assertEqual(user_num, '247468164')
        self.assertEqual(sector_id, '0')
        
    def test_read_new_zte_format(self):
        item_element=etree.XML('''<object id="128320257" MmeUeS1apId="58879377" MmeCode="3" MmeGroupId="17409" TimeStamp="2017-10-01T20:45:05.920">
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 100 332 31 3 NIL NIL NIL NIL</v>
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 450 266 11 2 NIL NIL NIL NIL</v>
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 450 434 12 7 NIL NIL NIL NIL</v>
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 1650 318 40 11 NIL NIL NIL NIL</v>
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 1650 319 42 13 NIL NIL NIL NIL</v>
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 1650 323 42 13 NIL NIL NIL NIL</v>
<v>100 448 46011_128320257 40 20 6 23 NIL 25 NIL 0 NIL NIL NIL NIL 1825 100 45 20 NIL NIL NIL NIL</v>
</object>''')
        object_element=ObjectElement(item_element)
        user_num=object_element.get_user_num()
        sector_id=object_element.get_sector_id('501251')
        self.assertEqual(user_num, '58879377')
        self.assertEqual(sector_id, '1')

    def test_read_huawei_format(self):
        item_element=etree.XML('''<object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="29364681" PLMNID="64F011" TimeStamp="2017-09-13T08:15:01.120" id="49">
        <v>35 15 22 11 1825 202 100 228 9 11 NIL 34 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>35 12 22 4 1825 202 100 175 9 11 NIL 34 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>35 11 22 2 1825 202 100 176 9 11 NIL 34 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
      </object>''')
        object_element=ObjectElement(item_element)
        user_num=object_element.get_user_num()
        sector_id=object_element.get_huawei_sector_id()
        self.assertEqual(user_num, '29364681')
        self.assertEqual(sector_id, '49')

if __name__=="__main__":
    unittest.main()
