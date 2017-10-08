# MR数据下载
在这一部分里，描述了从北向接口下载的总体流程和代码分析。
## 北向接口下载辅助函数
MR数据都存放在北向接口FTP服务器。
我们需要根据数据产生的机制定义下载辅助函数。
### 北向接口数据产生机制
* **产生周期**：15分钟
* **文件粒度**：
每种数据类型（MRO、MRS和MRE）以及每个基站ID的数据生成一个XML文件。
* **压缩规则**：采用二级压缩，
首先每个单独的XML文件压缩为一个文件；
然后服务器内15分钟的所有压缩文件再压缩为一个大的压缩文件。
* **存放规则**：由于基站个数较多，
一个厂家的数据文件分别存储于多个服务器
* **厂家区别**：华为和中兴，具体的压缩规则和文件命名规则略有不同
#### 压缩规则
##### 中兴
第二次压缩时，直接将第一次压缩生成的压缩文件压缩为一个文件。
压缩文件为.zip文件。
##### 华为
第二次压缩时，
先将第一次压缩生成的压缩文件按照所属基站分为多个文件夹存储，
这些文件夹以基站名命名；
然后将各个文件夹压缩为一个压缩文件。
压缩文件为.xml.gz文件。
#### 文件命名规则
##### 中兴
* **例子**：FDD-LTE_MRS_ZTE_OMC1_502599_20161128044500.zip
* **说明**：
（1）制式FDD-LTE
（2）MR文件类型MRS
（3）厂家ZTE
（4）网管服务器名称OMC1
（5）基站编号502599
（6）日期时间：20161128044500
##### 华为
* **例子**：FDD-LTE_MRO_HUAWEI_501035_20161122113000.xml.gz
* **说明**：大部分与中兴相同，但少了网管服务器名称这一字段
### 函数名称判断实现
#### 华为实现
##### 基础函数
```python
def is_filename_huawei(name: str, file_type: str):
    my_type = name.split('_')[-4]
    return my_type == file_type and name.endswith('.xml.gz')
```
##### MRO
```python
def is_mro_filename(name: str):
    '''判断是否为华为MRO文件名，例如FDD-LTE_MRO_HUAWEI_501035_20161122113000.xml.gz'''
    return is_filename_huawei(name, 'MRO')
```
##### MRE
```python
def is_mre_filename(name):
    '''判断是否为华为MRE文件名，例如FDD-LTE_MRE_HUAWEI_500328_20161122113000.xml.gz'''
    return is_filename_huawei(name, 'MRE')
```
##### MRS
```python
def is_mrs_filename(name):
    '''判断是否为华为MRS文件名，例如FDD-LTE_MRS_HUAWEI_501195_20161122113000.xml.gz'''
    return is_filename_huawei(name, 'MRS')
```
#### 中兴实现
##### 基础函数
```python
def is_filename_zte(name: str, file_type: str):
    my_type = name.split('_')[-5]
    return my_type == file_type and name.endswith('.zip')
```
##### MRO
```python
def is_mro_filename_zte(name: str):
    '''判断是否为中兴MRO文件名，例如FDD-LTE_MRO_ZTE_OMC1_501251_20170705194500.zip'''
    return is_filename_zte(name, 'MRO')
```
##### MRE
```python
def is_mre_filename_zte(name):
    '''判断是否为中兴MRE文件名，例如FDD-LTE_MRE_ZTE_OMC1_501819_20161218101500.zip'''
    return is_filename_zte(name, 'MRE')
```
##### MRS
```python
def is_mrs_filename_zte(name):
    '''判断是否为中兴MRS文件名，例如FDD-LTE_MRS_ZTE_OMC1_502599_20161128044500.zip'''
    return is_filename_zte(name, 'MRS')
```
## 北向接口数据下载和预处理过程
## 北向接口数据下载实现

