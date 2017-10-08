from lxml import etree
import unittest

class ReadXmlUnitTest(unittest.TestCase):
    def setUp(self):
        path='''
        <measurement>
          <smr>MR.LteScRSRP MR.LteNcRSRP MR.LteScRSRQ MR.LteNcRSRQ MR.LteScEarfcn MR.LteScPci MR.LteNcEarfcn MR.LteNcPci MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScRI MR.CQI MR.LteScPUSCHPRBNum MR.LteScPDSCHPRBNum MR.LteScBSR MR.CDMAtype MR.CDMANcBand MR.CDMANcArfcn MR.CDMAPNphase MR.LteCDMAorHRPDNcPilotStrength MR.CDMANcPci MR.Longitude MR.Latitude</smr>
          <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="545266069" TimeStamp="2017-05-22T10:00:03.840" id="48">
            <v>52 43 27 11 1825 246 1825 247 1 41 NIL 29 2 15 0 0 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>52 45 27 24 1825 246 37900 405 1 41 NIL 29 2 15 0 0 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>52 37 27 7 1825 246 37900 407 1 41 NIL 29 2 15 0 0 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>52 44 27 23 1825 246 38098 10 1 41 NIL 29 2 15 0 0 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
          </object>
          <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="545304634" TimeStamp="2017-05-22T10:00:03.840" id="48">
            <v>30 NIL 22 NIL 1825 246 NIL NIL 2 19 NIL 30 1 13 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
          </object>
          <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="545313383" TimeStamp="2017-05-22T10:00:03.840" id="48">
            <v>35 37 13 16 1825 246 1825 444 4 20 NIL 33 1 6 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>35 35 13 14 1825 246 1825 237 4 20 NIL 33 1 6 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>35 34 13 12 1825 246 1825 145 4 20 NIL 33 1 6 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>35 33 13 9 1825 246 1825 247 4 20 NIL 33 1 6 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>35 31 13 7 1825 246 1825 25 4 20 NIL 33 1 6 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
            <v>35 30 13 4 1825 246 1825 144 4 20 NIL 33 1 6 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
          </object>
        </measurement>
        '''
        self.xml=etree.XML(path)

    def test_read_xml(self):
        smr=self.xml.xpath(u"//smr")[0]
        self.assertEqual(smr.text, 'MR.LteScRSRP MR.LteNcRSRP MR.LteScRSRQ MR.LteNcRSRQ MR.LteScEarfcn MR.LteScPci MR.LteNcEarfcn MR.LteNcPci MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScRI MR.CQI MR.LteScPUSCHPRBNum MR.LteScPDSCHPRBNum MR.LteScBSR MR.CDMAtype MR.CDMANcBand MR.CDMANcArfcn MR.CDMAPNphase MR.LteCDMAorHRPDNcPilotStrength MR.CDMANcPci MR.Longitude MR.Latitude')

if __name__=="__main__":
    unittest.main()