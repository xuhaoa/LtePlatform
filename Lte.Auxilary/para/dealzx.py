#coding=utf8
from lxml import etree
from pymongo import MongoClient
import yaml
import io
import zipfile
import rarfile
import gzip
import os
from datetime import datetime
import py7zlib
import csv

# 当前日期
current_date = datetime.now().strftime('%Y%m%d')
# 连接数据库
#db = MongoClient('localhost', 27017)['test']
db = MongoClient('mongodb://root:Abcdef9*@localhost:27017')['fangww']
# 压缩文件格式
extension = ['.rar', '.zip', '.gz']
file_list = []

# 函数将数字文本格式转为位数值格式， 字符串保持不变
def isnumeric(s):
    if all(c in "0123456789.+-" for c in s) and any(c in "0123456789" for c in s):
        if s.isdigit():
            return int(s)
        else:
            return yaml.load(s)
    else:
        return s


def extract_archiver(db, filename, parentzip, idate, **kwargs):
    if filename.endswith('.zip'):
        if kwargs.get('ftype') == '7z':
            zfiledata = io.BytesIO(parentzip.read())
        else:
            zfiledata = io.BytesIO(parentzip.read(filename))
        with zipfile.ZipFile(zfiledata) as zfile:
            for name in zfile.namelist():
                #print(name)
                if name.endswith(tuple(extension)):
                    extract_archiver(db, name, zfile, idate)
                else:
                    root = etree.fromstring(zfile.open(name).read())
                    zx_import(db, root, idate)
    elif filename.endswith('.rar'):
        if kwargs.get('ftype') == '7z':
            rfiledata = io.BytesIO(parentzip.read())
        else:
            rfiledata = io.BytesIO(parentzip.read(filename))
        with rarfile.RarFile(rfiledata) as rfile:
            for name in rfile.namelist():
                if name.endswith(tuple(extension)):
                    extract_archiver(db, name, rfile, idate)
                else:
                    root = etree.fromstring(rfile.open(name).read())
                    zx_import(db, root, idate)
    elif filename.endswith('.xml'):
        root = etree.fromstring(parentzip.open(filename).read())
        zx_import(db, root, idate)

def zx_import(db, root, idate):
    Root = dict(root.attrib)
    for key in Root:
        Root[key] = isnumeric((Root[key]))
    Root['iDate'] = idate
    db['Root'].insert(Root)
    Mo_list = []
    preMoName = ''
    for Mo in root:
        MoName = Mo.attrib['name']
        # print('start:', MoName)
        Property_dict = {}
        for Property in Mo.iterchildren():
            if Property.xpath('.//StructMember'):
                # print('step:', MoName)
                for StructMember in Property.xpath('.//StructMember'):
                    # print('start:', StructMember)
                    _name = '_'.join([Property.attrib['name'], StructMember.attrib['name']])
                    Property_dict[_name] = isnumeric(str(StructMember.attrib['value']).strip())
            elif Property.xpath('.//value'):
                value_list = []
                for value in Property:
                    value_list.append(str(value.text).strip())
                Property_dict[Property.attrib['name']] = ','.join(value_list)
            else:
                Property_dict[Property.attrib['name']] = isnumeric(str(Property.attrib['value']).strip())
        if Property_dict:
            Property_dict.update({'eNodeB_Id': Root['MEID'], 'eNodeB_Name': Root['USERLABEL'], 'iDate': idate})
            if preMoName == MoName:
                Mo_list.append(Property_dict)
            else:
                if Mo_list:
                    db[preMoName].insert_many(Mo_list)
                    preMoName = MoName
                    Mo_list = []
                    Mo_list.append(Property_dict)
                # 初始化时赋值
                else:
                    Mo_list.append(Property_dict)
                    preMoName = MoName


# 解压缩函数，支持rar和zip格式
#def unzip():
path = '/home/zhongxing/zhongxing'
for root_no, dirs_no, files in os.walk(path):
    for name in files:
        #print(name)
        if db['InsertedFiles'].find({'filename': 'zx_'+name}).count() > 0:
            print('zx_'+name+' has been inserted!')
        else:
            current_date = name.split('.')[0].strip()
            if name.endswith('.zip'): # and name.startswith(current_date):
                with zipfile.ZipFile(os.path.join(path, name), 'r') as zfile:
                    for _name in zfile.namelist():
                        extract_archiver(db, _name, zfile, current_date)
            elif name.endswith('.rar'): #and name.startswith(current_date):
                with rarfile.RarFile(os.path.join(path, name), 'r') as rfile:
                    for _name in rfile.namelist():
                        extract_archiver(db, _name, rfile, current_date)
            elif name.endswith('.7z'): #and name.startswith(current_date):
                with open(os.path.join(path, name), 'rb') as sevenzfile:
                    z = py7zlib.Archive7z(sevenzfile)
                    for _name in z.getnames():
                        subFile = z.getmember(_name)
                        extract_archiver(db, _name, subFile, current_date, ftype='7z')
                        # zfiledata = io.BytesIO(subFile.read())
            file_list.append({'filename': 'zx_'+name})

if file_list:
    db['InsertedFiles'].insert_many(file_list)
#if __name__ == '__main__':
#    unzip()


