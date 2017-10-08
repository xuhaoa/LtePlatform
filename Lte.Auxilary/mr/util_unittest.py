import unittest
from customize_utilities import *
from datetime import datetime

class UtilUnitTest(unittest.TestCase):
    def test_generate_time_dir(self):
        dir=generate_time_dir(datetime(2017,9,9),'/Test/')
        self.assertEqual(dir, '/Test/20170908/201709082200')
    def test_generate_time_dir_default_dir(self):
        dir=generate_time_dir(datetime(2017,9,9))
        self.assertEqual(dir, '/MR_HW_SOURCE_D/20170908/201709082200')

    def test_generate_time_dir_shift(self):
        dir=generate_time_dir_shift(datetime(2017,9,9),'/Test/',-3)
        self.assertEqual(dir, '/Test/20170908/201709082100')
    def test_generate_time_dir_shift_5(self):
        dir=generate_time_dir_shift(datetime(2017,9,9),'/Test/',-5)
        self.assertEqual(dir, '/Test/20170908/201709081900')

    def test_generate_date_twohours_ago(self):
        dir=generate_date_twohours_ago(datetime(2017,9,9))
        self.assertEqual(dir, '20170908')
    def test_generate_date_twohours_ago_3am(self):
        dir=generate_date_twohours_ago(datetime(2017,9,9,3))
        self.assertEqual(dir, '20170909')
    def test_generate_date_hours_shift_3am(self):
        dir=generate_date_hours_shift(datetime(2017,9,9,3), -5)
        self.assertEqual(dir, '20170908')

    def test_is_mro_filename(self):
        self.assertTrue(is_mro_filename('FDD-LTE_MRO_HUAWEI_501035_20161122113000.xml.gz'))
    def test_is_mro_filename_zte(self):
        self.assertTrue(is_mro_filename_zte('FDD-LTE_MRO_ZTE_OMC1_501251_20170705194500.zip'))
    def test_is_mrs_filename(self):
        self.assertTrue(is_mrs_filename('FDD-LTE_MRS_HUAWEI_501195_20161122113000.xml.gz'))
    def test_is_mrs_filename_zte(self):
        self.assertTrue(is_mrs_filename_zte('FDD-LTE_MRS_ZTE_OMC1_502599_20161128044500.zip'))

def test_func1(name):
    return name+'_1'

def test_func2(name):
    return name+'_2'

def call_func(name, func):
    return func(name)

class BaseUnitTest(unittest.TestCase):
    def test_call_func(self):
        result1=call_func('test', test_func1)
        result2=call_func('test', test_func2)
        self.assertEqual(result1, 'test_1')
        self.assertEqual(result2, 'test_2')

if __name__=="__main__":
    unittest.main()
