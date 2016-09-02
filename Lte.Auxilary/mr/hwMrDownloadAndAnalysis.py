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
from collections import defaultdict
import dateutil.parser

HOST_HW = ['132.122.152.115', '132.122.152.112', '132.122.152.124']
FOLDER_HW = ['/ZIP_MR_HW_SOURCE_D', '/ZIP_MR_HW_SOURCE_E']
# 中兴
db = MongoClient('mongodb://root:Abcdef9*@10.17.165.106')['test']
# 已下载文件夹列表
_downloadedDirsList = list(db.hwDownloadedDirsList.find({}, {'dirName': 1, '_id': 0}))
downloadedDirsList = [item.get('dirName') for item in _downloadedDirsList]    # 下载文件夹列表

# 已分析文件列表
_analysisFilesList = list(db.hwAnalysisFilesList.find({}, {'fileName': 1, '_id': 0}))
analysisFilesList = [item.get('fileName') for item in _analysisFilesList]     # 已插入的文件列表

extension = ['.rar', '.zip', '.gz']
fieldFilter = ['Qci', 'Utra', 'Gsm']

nowDay = date.today().strftime('%Y%m%d')


def analysis(db_name, analysis_list, _filter):
    # os.chdir('/home/fangww/dist/mr/zhongxing/download')
    os.chdir('download')
    for root, dirs, files in os.walk('.'):
        for name in files:
            if name.endswith('.zip'): # and (name not in analysis_list):
                rowsList = []
                counter = 0
                with zipfile.ZipFile(os.path.join(root, name), 'r') as zFile:
                    for _name in zFile.namelist():
                        print('step1:', _name)
                        if counter > 1000:
                            dictCols = defaultdict(list)
                            for d in rowsList:  # you can list as many input dicts as you want here
                                for key, value in d.items():
                                    dictCols[key].append(value)
                            for colName in dictCols:
                                print('colName:', colName)
                                # db[colName].insert_many(dictCols[colName])
                            rowsList = []
                            counter = 0
                        if zFile.getinfo(_name).file_size != 0:
                            if _name.endswith('.gz') and int(_name.split('_')[-2]) in (list(range(550912, 552959)) + list(range(499712, 503807))):
                                counter += 1
                                gFileData = io.BytesIO(zFile.read(_name))
                                with gzip.GzipFile(fileobj=gFileData, mode='rb') as gFile:
                                    root = etree.fromstring(gFile.read())
                                # for __name in _zFile.namelist():
                                #     root = etree.fromstring(_zFile.open(__name).read())
                                    # item_list = []
                                    rowDict = {}    # 一个ZIP文件一个dict记录
                                    for item in root.iterchildren():
                                        if item.tag == 'fileHeader':
                                            rowDict.update(item.attrib)
                                        elif item.tag == 'eNB':
                                            item_id = item.attrib.get('id')
                                            rowDict.update({'eNB_id': item_id})
                                            mrRecords = []  # rowDict.update({'mrRecords': mrRecords})

                                            # measurement 开始
                                            for item_measurement in item.iterchildren():
                                                mrName = item_measurement.attrib.get('mrName')
                                                mrMeasurement = []
                                                item_key = []   # key值
                                                mrElement = {}
                                                for item_element in item_measurement:
                                                    if item_element.tag == 'smr':
                                                        item_key = item_element.text.replace('.', '_').split(' ')
                                                    else:
                                                        mrElement.update(item_element.attrib)
                                                        mrValue = []

                                                        for item_v in item_element:
                                                            item_value = item_v.text.strip().replace('NIL', '-1').split(' ')
                                                            _item_dict = dict(zip(item_key, map(lambda x: int(x) if x.lstrip('-').isdigit() else x, item_value)))
                                                            _item_dict = {k: v for k, v in _item_dict.items() if not any(ext in k for ext in fieldFilter)}
                                                            mrValue.append(_item_dict)
                                                        mrElement.update({'mrValue': mrValue})
                                                        mrMeasurement.append(mrElement)

                                                if mrName and mrMeasurement and not any(ext in mrName for ext in fieldFilter):
                                                    mrName = '_'.join(['HW', mrName.replace('.', '_')])
                                                    mrRecords.append(mrMeasurement)
                                                    rowDict.update({'mrRecords': mrRecords})
                                                    rowsList.append({mrName: rowDict})
                                                    del rowDict['mrRecords']
                                                    mrRecords = []
                                                else:
                                                    mrRecords.append({'mrMeasurement': mrMeasurement})
                                            if mrRecords:
                                                rowDict.update({'mrRecords': mrRecords})
                                                print(_name)
                                                if _name.split('/')[-1].startswith('FDD_LTE_MRE'):
                                                    rowsList.append({'HW_FDD_LTE_MRE': rowDict})
                                                elif _name.split('/')[-1].startswith('FDD_LTE_MRO'):
                                                    rowsList.append({'HW_FDD_LTE_MRO': rowDict})
                dictCols = defaultdict(list)
                for d in rowsList:  # you can list as many input dicts as you want here
                    for key, value in d.items():
                        dictCols[key].append(value)
                for colName in dictCols:
                    # print('colName:', colName)
                    db[colName].insert_many(dictCols[colName])

for host_ip in HOST_HW:
    for folder in FOLDER_HW:
        os.chdir('/home/fangww/dist/mr/huawei/download/')
        # os.chdir('download/')
        updateFoldersList = []
        updateFilesList = []
        status = False      # 判断是否完成下载
        while status:
            try:
                dirCount = 0
                fileCount = 0
                _dirCount = 0
                _fileCount = 0  # 对比需要下载的文件数
                host = ftputil.FTPHost(host_ip, 'ouyh18', 'O123#')
                for root, dirs, files in host.walk(folder):
                    print(root,':',dirs,':',files)
                    if root.count('/') == 1:    # 获得需要下载的文件夹列表
                        dirCount += len(dirs)
                    elif root.count('/') == 2 and (not root.endswith(tuple(downloadedDirsList))) and (not root.endswith(nowDay)):
                        fileCount += len(files)  # 获得需要下载的文件数
                        for name in files:
                            print(os.path.join(root, name))
                            host.chdir(root)
                            targetName = '_'.join([root.replace('/', '_'), name])
                            print('targetName:', targetName)
                            if targetName in updateFilesList:
                                pass
                            else:
                                host.download(name, targetName)
                                updateFilesList.append(targetName)
                            _fileCount += 1     # 下载完成的文件数
                        _dirCount += 1
                        updateFoldersList.append(root.replace('/', '_'))
                    else:
                        pass
                if dirCount == _dirCount and fileCount == _fileCount:
                    status = True
            except :
                continue
            if updateFoldersList:
                db['hwDownloadedDirsList'].insert_many([{'dirName': item} for item in list(set(updateFoldersList))])
            if updateFilesList:
                db['hwDownloadedFilesList'].insert_many([{'fileName': item} for item in list(set(updateFilesList))])
        analysis(db, analysisFilesList, fieldFilter)
# analysis(db, analysisFilesList, fieldFilter)
