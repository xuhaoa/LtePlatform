# -*- coding: utf-8 -*-
import ftputil
import os
import shutil
import pymongo
from pymongo import MongoClient
import time
from datetime import date
import pandas as pd
from pandas import DataFrame
import gzip
import zipfile
import io
import re
from io import StringIO
from lxml import etree
import dateutil.parser

HOST_HW = ['132.122.152.115', '132.122.152.112', '132.122.152.124']     # 华为服务器
HOST_ZX = ['132.122.152.106', '132.122.152.125']    # 中兴服务器
FOLDER_HW = ['/ZIP_MR_HW_SOURCE_D', '/ZIP_MR_HW_SOURCE_E']
FOLDER_ZX = ['/ZIP_MR_ZTE_SOURCE_D', '/ZIP_MR_ZTE_SOURCE_E']
# 华为
db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['ouyh']

# 从数据库获取已下载列表
_DFlist = list(db.DFlist.find({}, {'dfName': 1, '_id': 0}))      # downloadfiles已下载的文件列表
DFList = [item.get('dName') for item in _DFlist]

_DDlist = list(db.DDlist.find({}, {'ddName': 1, '_id': 0}))
DDlist = [item.get('ddName') for item in _DDlist]    # downloaddirectories已下载的文件夹列表

# 解析部分用到的全局变量
extension = ['.rar', '.zip', '.gz']     # 判断压缩文件类型
afilter = ['Qci', 'Utra', 'Gsm']    # 过滤不需要的字段



for host_ip in HOST_HW:
    for folder in FOLDER_HW:
        # ----------------------------------------------------------------------
        # 清空和创建临时存储文件夹
        if os.path.isdir('temp'):
            shutil.rmtree('temp')
        os.mkdir('temp')
        os.chdir('temp')
        _tmpfolder = []     # 用来更新数据库DFlist的字典
        _tmpfile = []   # 用来更新数据库DDlist的字典

        status = False      # 判断是否完成文件的下载
        while not status:
            try:
                # *************错误重新开始的地方
                host = ftputil.FTPHost(host_ip, 'ouyh18', 'O123#')
                for root, dirs, files in host.walk(folder):
                    # 1，先判断是否文件夹是否存在于文件夹列表中
                    # 2, 判断是否超过三层，超过三层文件夹不处理
                    # 3， 不处理当天日期
                    if root.count('/') < 3 and not root.endswith(tuple(DDlist)) and not root.endswith(date.today().strftime('%Y%m%d')):     # 判断是否已在下载列表和是否超过三层，如果已存在或已超过，则不处理
                        # print(len(files))     # 获得文件数量
                        for name in files:
                            host.chdir(root)
                            # 判断文件是否已经存在于数据库
                            if name in DFList:
                                pass
                            else:
                                host.download(name, name)
                                DFList.append(os.path.join(root, name))
                                DFList.append(name)
                                _tmpfile.append(os.path.join(root, name))
                        if files:       # 这里需要判断是否为下载的文件夹
                            DDlist.append(root)
                            DDlist = list(set(DDlist))
                            _tmpfolder.append(root)
                status = True
            except:
                continue
        print(DDlist)
        if _tmpfolder:
            db['DDlist'].insert_many([{'ddName': item} for item in list(set(_tmpfolder))])
        if _tmpfile:
            db['DFlist'].insert_many([{'dfName': item} for item in list(set(_tmpfile))])


        # 下载完一个文件夹之后，开始解析写入数据库
        item_insert = []
        for root_no, dirs_no, files in os.walk('./temp'):
            for name in files:
                if name.endswith('.zip'):
                    with zipfile.ZipFile(os.path.join(root_no, name), 'r') as zfile:
                        for _name in zfile.namelist():
                            print(_name)
                            if _name.endswith('.gz') and int(_name.split('_')[-2]) in (range(550912, 552959) or range(499712, 503807)):
                                gfiledata = io.BytesIO(zfile.read(_name))
                                with gzip.GzipFile(fileobj=gfiledata, mode='rb') as gfile:
                                    root = etree.fromstring(gfile.read())
                                    item_list = []
                                    for item in root.iterchildren():
                                        if item.attrib.get('reportTime'):
                                            reportTime = item.attrib.get('reportTime')
                                            startTime = item.attrib.get('startTime')
                                            endTime = item.attrib.get('endTime')
                                        item_id = item.attrib.get('id')
                                        if item_id:
                                            print(item_id)
                                            for item_measurement in item.iterchildren():
                                                mrName = item_measurement.attrib.get('mrName')
                                                item_key = []
                                                item_mrName = []
                                                for item_element in item_measurement:
                                                    if item_element.tag == 'smr':
                                                        item_key = item_element.text.replace('.', '_').split(' ')
                                                    else:  # object
                                                        item_dict = {}
                                                        item_dict.update({'eNB_id': item_id})
                                                        item_dict.update(item_element.attrib)
                                                        if item_dict.get('TimeStamp'):
                                                            # print(item_dict.get('TimeStamp'))
                                                            item_dict.update({'TimeStamp': dateutil.parser.parse(item_dict.get('TimeStamp'))})
                                                        element_list = []
                                                        for item_v in item_element:
                                                            item_value = item_v.text.replace('NIL', '-1').split(' ')
                                                            _item_dict = dict(zip(item_key, map(int, item_value)))
                                                            _item_dict = {k: v for k, v in _item_dict.items() if not any(ext in k for ext in afilter)}
                                                            element_list.append(_item_dict)
                                                        item_dict.update({'MR': element_list})
                                                        if mrName:
                                                            # print('startTime:', startTime)
                                                            item_dict.update({'reportTime': dateutil.parser.parse(reportTime), 'startTime': dateutil.parser.parse(startTime), 'endTime': dateutil.parser.parse(endTime)})
                                                            item_mrName.append(item_dict)
                                                        else:
                                                            item_list.append(item_dict)
                                                if mrName and item_mrName:
                                                    # print(item_mrName)
                                                    mrName = '_'.join('HW', mrName.replace('.', '_'))
                                                    item_insert.append([mrName, item_mrName])  #
                                                    # db[mrName].insert_many(item_mrName)
                                                    # print(item_list)
                                    if item_list:
                                        if name.startswith('FDD_LTE_MRE'):
                                            # db['FDD_LTE_MRE'].insert_many(item_list)
                                            item_insert.append(['HW_FDD_LTE_MRE', item_list])
                                        elif name.startswith('FDD_LTE_MRO'):
                                            item_insert.append(['HW_FDD_LTE_MRO', item_list])
                    dict_collections = {}
                    for key, val in item_insert:
                        dict_collections.setdefault(key, []).extend(val)
                        # print(d)
                    for colName in dict_collections:
                        db[colName].insert_many(dict_collections[colName])
                        print(colName)
                        # print(len(dict_collections[colName]))




