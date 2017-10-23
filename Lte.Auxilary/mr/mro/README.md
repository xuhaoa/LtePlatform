# MRO数据文件格式及处理
## 数据文件细节
### 邻区测量节
#### 华为格式
    该节由多个object对象组合而成，每个object对象对应一次测量信息
```xml
    <measurement>
      <smr>MR.LteScRSRP MR.LteNcRSRP MR.LteScRSRQ MR.LteNcRSRQ MR.LteScEarfcn MR.LteScPci MR.LteNcEarfcn MR.LteNcPci MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScRI MR.CQI MR.LteScPUSCHPRBNum MR.LteScPDSCHPRBNum MR.LteScBSR MR.CDMAtype MR.CDMANcBand MR.CDMANcArfcn MR.CDMAPNphase MR.LteCDMAorHRPDNcPilotStrength MR.CDMANcPci MR.Longitude MR.Latitude</smr>
      <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="419517741" TimeStamp="2016-11-22T11:30:05.440" id="3">
        <v>59 54 25 12 100 180 100 181 1 42 NIL 34 2 15 0 0 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>59 45 25 6 100 180 100 189 1 42 NIL 34 2 15 0 0 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
      </object>
      ...
      <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="419495228" TimeStamp="2016-11-22T11:30:05.440" id="48">
        <v>64 62 23 11 1825 285 1825 287 1 36 NIL 36 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>64 61 23 15 1825 285 1825 228 1 36 NIL 36 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>64 56 23 5 1825 285 1825 354 1 36 NIL 36 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>64 54 23 0 1825 285 1825 355 1 36 NIL 36 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>64 45 23 0 1825 285 1825 119 1 36 NIL 36 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>64 47 23 0 1825 285 1825 360 1 36 NIL 36 NIL 4 NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL</v>
      </object>
      ...
    </measurement>
```
#### 中兴格式
    与华为格式一样，该节由多个object对象组合而成，每个object对象对应一次测量信息，不同之处是字段更多，且字段的顺序有些不一样
```xml
    <measurement>
      <smr>MR.LteScEarfcn MR.LteScPci MR.LteScRSRP MR.LteScRSRQ MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScRI1 MR.LteScRI2 MR.LteScRI4 MR.LteScRI8 MR.LteScBSR MR.LteScPUSCHPRBNum MR.LteScPDSCHPRBNum MR.CQI0 MR.CQI1 MR.LatitudeSign MR.Longitude MR.Latitude MR.LteNcEarfcn MR.LteNcPci MR.LteNcRSRP MR.LteNcRSRQ MR.CDMAtype MR.CDMANcArfcn MR.CDMAPNphase MR.LteCDMAorHRPDNcPilotStrength MR.CDMANcBand MR.CDMANcPci</smr>
        <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176171960" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
          <v>1825 467 46 18 2 35 NIL 33 2 62 0 0 0 32 13 6 6 NIL NIL NIL 1825 68 41 15 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 46 18 2 35 NIL 33 2 62 0 0 0 32 13 6 6 NIL NIL NIL 1825 122 25 0 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 46 18 2 35 NIL 33 2 62 0 0 0 32 13 6 6 NIL NIL NIL 1825 194 36 10 NIL NIL NIL NIL NIL NIL</v>
        </object>
        ...
        <object MR.MmeCode="2" MR.MmeGroupId="17409" MR.MmeUeS1apId="482352950" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
          <v>1825 467 32 17 19 22 NIL 20 55 9 0 0 0 30 50 10 9 NIL NIL NIL 1825 66 31 17 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 32 17 19 22 NIL 20 55 9 0 0 0 30 50 10 9 NIL NIL NIL 1825 120 28 12 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 32 17 19 22 NIL 20 55 9 0 0 0 30 50 10 9 NIL NIL NIL 1825 122 29 14 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 32 17 19 22 NIL 20 55 9 0 0 0 30 50 10 9 NIL NIL NIL 1825 345 30 21 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 32 17 19 22 NIL 20 55 9 0 0 0 30 50 10 9 NIL NIL NIL 1825 466 30 12 NIL NIL NIL NIL NIL NIL</v>
        </object>
      ...
    </measurement>
```
### 服务小区上下行丢包率节
#### 华为格式
    该数据目前应用较少，且一般不打开测量，因此数值基本为0.
```xml
    <measurement>
      <smr>MR.LteScPlrULQci1 MR.LteScPlrULQci2 MR.LteScPlrULQci3 MR.LteScPlrULQci4 MR.LteScPlrULQci5 MR.LteScPlrULQci6 MR.LteScPlrULQci7 MR.LteScPlrULQci8 MR.LteScPlrULQci9 MR.LteScPlrDLQci1 MR.LteScPlrDLQci2 MR.LteScPlrDLQci3 MR.LteScPlrDLQci4 MR.LteScPlrDLQci5 MR.LteScPlrDLQci6 MR.LteScPlrDLQci7 MR.LteScPlrDLQci8 MR.LteScPlrDLQci9</smr>
      <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="419517741" TimeStamp="2016-11-22T11:30:05.440" id="3">
        <v>NIL NIL NIL NIL NIL NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL 0 NIL</v>
      </object>
      <object MmeCode="2" MmeGroupId="17409" MmeUeS1apId="763419859" TimeStamp="2016-11-22T11:30:05.440" id="3">
        <v>NIL NIL NIL NIL NIL NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL 0 NIL</v>
      </object>
      ...
    </measurement>
```
#### 中兴格式
    与华为格式一致，数据目前应用较少，且一般不打开测量，因此数值基本为0.
```xml
    <measurement>
      <smr>MR.LteScPlrULQci1 MR.LteScPlrULQci2 MR.LteScPlrULQci3 MR.LteScPlrULQci4 MR.LteScPlrULQci5 MR.LteScPlrULQci6 MR.LteScPlrULQci7 MR.LteScPlrULQci8 MR.LteScPlrULQci9 MR.LteScPlrDLQci1 MR.LteScPlrDLQci2 MR.LteScPlrDLQci3 MR.LteScPlrDLQci4 MR.LteScPlrDLQci5 MR.LteScPlrDLQci6 MR.LteScPlrDLQci7 MR.LteScPlrDLQci8 MR.LteScPlrDLQci9</smr>
      <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176171960" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
        <v>NIL NIL NIL NIL NIL NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
      </object>
      <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176215168" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
        <v>NIL NIL NIL NIL NIL NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL 0 NIL</v>
      </object>
      <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176227313" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
        <v>NIL NIL NIL NIL NIL NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL 0 NIL</v>
      </object>
      <object MR.MmeCode="2" MR.MmeGroupId="17409" MR.MmeUeS1apId="482352950" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
        <v>NIL NIL NIL NIL NIL NIL NIL 0 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
      </object>
      ...
    </measurement>
```
### 上行接收干扰功率节
#### 华为格式

```xml
<measurement>
      <smr>MR.LteScRIP</smr>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:0">
        <v>63</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:1">
        <v>61</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:2">
        <v>63</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:3">
        <v>61</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:4">
        <v>60</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:5">
        <v>61</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:6">
        <v>61</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:7">
        <v>62</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:8">
        <v>60</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="3:100:9">
        <v>62</v>
      </object>
      <object MmeCode="NIL" MmeGroupId="NIL" MmeUeS1apId="NIL" TimeStamp="2016-11-22T11:30:05.440" id="4:100:0">
        <v>61</v>
      </object>
      ...
    </measurement>
```
#### 中兴格式
    与华为格式一致
```xml
<measurement>
      <smr>MR.LteScRIP</smr>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:0">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:1">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:2">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:3">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:4">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:5">
        <v>61</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:6">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:7">
        <v>64</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:8">
        <v>66</v>
      </object>
      <object MR.MmeCode="NIL" MR.MmeGroupId="NIL" MR.MmeUeS1apId="NIL" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48:1825:9">
        <v>66</v>
      </object>
      ...
    </measurement>
```

## 数据文件处理过程
### 总体流程
1. 读取字段名称列表
1. 生成小区小区相邻关系数据结构
1. 数据结构映射到数据表，以便写入Mongo数据库
#### 华为总体代码
```python
      for name in files:
        if not name.endswith('0000.xml.gz'):
            continue
        reader=MroReader(afilter)
        print(name)
        try:
            gFile=gzip.GzipFile(currrent_dir + name, 'r')
            root = etree.fromstring(gFile.read())
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
        item_id=''
        for item in root.iterchildren():
            item_key = []
            if item.tag == 'fileHeader':
                startTime= item.attrib['startTime']
            elif item.tag == 'eNB':
                item_id = item.attrib.get('id')
                for item_measurement in item.iterchildren():
                    reader.read(item_measurement, item_id)
        if (item_id!=''):
            mro_output=reader.map_rsrp_diff(item_id)
            if len(mro_output)>0:
                for item in mro_output:
                    item.update({'StartTime': startTime})
                db['mro_'+date_dir].insert_many(mro_output)
        print('insert from ', currrent_dir + name)
        os.remove(currrent_dir + name)
```

#### 中兴总体代码
```python
      for name in files:
        if not name.endswith('0000.zip'):
            continue
        reader=MroReader(afilter)
        print(name)
        try:
            zFile=zipfile.ZipFile(currrent_dir + name, 'r')
            root = etree.fromstring(zFile.read(zFile.namelist()[0]))
        except:
            print('Unzip failed. Continue to unzip other files')
            continue
        item_id=''
        for item in root.iterchildren():
            item_key = []
            if item.tag == 'fileHeader':
                startTime= item.attrib['startTime']
            elif item.tag == 'eNB':
                item_id = item.attrib.get('MR.eNBId')
                for item_measurement in item.iterchildren():
                    reader.read_zte(item_measurement, item_id)
        if (item_id!=''):
            mro_output=reader.map_rsrp_diff_zte()
            if len(mro_output)>0:
                for item in mro_output:
                    item.update({'StartTime': startTime})
                db['mro_'+date_dir].insert_many(mro_output)
        print('insert from ', currrent_dir + name)
        os.remove(currrent_dir + name)
```
### 邻区数据结构生成
#### 华为处理代码
```python
      def read(self, item_measurement, item_id):
        for item_element in item_measurement:
            if item_element.tag == 'smr':
                item_key = item_element.text.replace('MR.', '').split(' ')
                if 'LteScEarfcn' not in item_key:
                    return
            else:
                centerFilled=False
                item_dict = {}
                neighbor_list=[]
                for item_v in item_element:
                    item_value = item_v.text.replace('NIL', '-1').split(' ')
                    _item_sub_dict = dict(zip(item_key, map(int, item_value)))
                    _item_sub_dict = {k: v for k, v in _item_sub_dict.items() if not any(ext in k for ext in self.afilter)}
                    if _item_sub_dict['LteNcPci']>=0:
                        _neighbor={}
                        _neighbor.update({'Pci': _item_sub_dict['LteNcPci']})
                        _neighbor.update({'Rsrp': _item_sub_dict['LteNcRSRP']})
                        _neighbor.update({'Earfcn': _item_sub_dict['LteNcEarfcn']})
                        neighbor_list.append(_neighbor)
                    else:
                        break
                    if not centerFilled:
                        ...//中心小区数据生成
                        centerFilled=True
                if len(neighbor_list)>0:
                    item_dict.update({'NeighborList': neighbor_list})
                    self.item_dicts.append(item_dict)
```
#### 中兴处理代码
```python
      def read_zte(self, item_measurement, item_id):
        for item_element in item_measurement:
            if item_element.tag == 'smr':
                item_key = item_element.text.replace('MR.', '').split(' ')
                if 'LteScEarfcn' not in item_key:
                    return
            else:
                centerFilled=False
                item_dict = {}
                neighbor_list=[]
                for item_v in item_element:
                    item_value = item_v.text.replace('NIL', '-1').split(' ')
                    _item_sub_dict = dict(zip(item_key, map(int, item_value)))
                    _item_sub_dict = {k: v for k, v in _item_sub_dict.items() if not any(ext in k for ext in self.afilter)}
                    if _item_sub_dict['LteNcPci']>=0:
                        _neighbor={}
                        _neighbor.update({'Pci': _item_sub_dict['LteNcPci']})
                        _neighbor.update({'Rsrp': _item_sub_dict['LteNcRSRP']})
                        _neighbor.update({'Earfcn': _item_sub_dict['LteNcEarfcn']})
                        neighbor_list.append(_neighbor)
                    else:
                        break
                    if not centerFilled:
                        ...//中心小区数据生成
                        centerFilled=True
                if len(neighbor_list)>0:
                    item_dict.update({'NeighborList': neighbor_list})
                    self.item_dicts.append(item_dict)
```
### 中心小区数据生成
    其实，这又分成基本字段生成和经纬度数据生成两部分，且两者最终写入的数据表是不一样的。
#### 华为代码
```python
                        item_dict.update(item_element.attrib)
                        item_dict.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                        item_dict.update({'SinrUl': _item_sub_dict['LteScSinrUL']})
                        item_dict.update({'Ta': _item_sub_dict['LteScTadv']})
                        item_dict.update({'Pci': _item_sub_dict['LteScPci']})
                        item_dict.update({'Earfcn': _item_sub_dict['LteScEarfcn']})
                        if _item_sub_dict['Longitude']!=-1 and _item_sub_dict['Latitude']!=-1:
                            item_position.update({'CellId': item_id+'-'+item_element.attrib['id']})
                            item_position.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                            item_position.update({'Ta': _item_sub_dict['LteScTadv']})
                            item_position.update({'Lontitute': _item_sub_dict['Longitude']})
                            item_position.update({'Lattitute': _item_sub_dict['Latitude']})
                            self.item_positions.append(item_position)
```
#### 中兴代码
```python
                        item_dict.update({'id': item_id+'-'+item_element.attrib['MR.objectId']})                        
                        item_dict.update({'Rsrp': _item_sub_dict['LteScRSRP']})                        
                        item_dict.update({'SinrUl': _item_sub_dict['LteScSinrUL']})
                        item_dict.update({'Ta': _item_sub_dict['LteScTadv']})                        
                        item_dict.update({'Pci': _item_sub_dict['LteScPci']})
                        item_dict.update({'Earfcn': _item_sub_dict['LteScEarfcn']})
                        if _item_sub_dict['Longitude']!=-1 and _item_sub_dict['Latitude']!=-1:
                            item_position.update({'CellId': item_id+'-'+item_element.attrib['MR.objectId']})
                            item_position.update({'Rsrp': _item_sub_dict['LteScRSRP']})
                            item_position.update({'Ta': _item_sub_dict['LteScTadv']})
                            if  _item_sub_dict['Longitude']>200:
                                item_position.update({'Lontitute': _item_sub_dict['Longitude'] * 360 *1.0/ 16777216})
                                item_position.update({'Lattitute': _item_sub_dict['Latitude'] * 90 / 8388608})
                            else:
                                item_position.update({'Lontitute': _item_sub_dict['Longitude']})
                                item_position.update({'Lattitute': _item_sub_dict['Latitude']})
                            self.item_positions.append(item_position)
```
### 数据结构映射
#### 华为处理代码
```python
      def map_rsrp_diff(self, eNodebId):
        diff_list=list(map(lambda index: self._map_neighbor_rsrp_diff(index+1), list(range(6))))
        combined_list=reduce(lambda first,second: first+second,diff_list,[])
        if len(combined_list)==0:
            return []
        stat_list=list(map(lambda item: {
            'CellId': eNodebId + '-' + item['CellId'],
            'Earfcn': item['Earfcn'],
            'NeighborPci': item['NeighborPci'],
            'Pci': item['Pci'],
            'NeighborEarfcn': item['NeighborEarfcn'],
            'Diff0': 1 if item['RsrpDiff']<=0 else 0,
            'Diff3': 1 if item['RsrpDiff']<=3 and item['RsrpDiff']>0 else 0,
            'Diff6': 1 if item['RsrpDiff']<=6 and item['RsrpDiff']>3 else 0,
            'Diff9': 1 if item['RsrpDiff']<=9 and item['RsrpDiff']>6 else 0,
            'Diff12': 1 if item['RsrpDiff']<=12 and item['RsrpDiff']>9 else 0,
            'DiffLarge': 1 if item['RsrpDiff']>12 else 0,
            'RsrpBelow120': 1 if item['Rsrp']<20 else 0,
            'RsrpBetween120110': 1 if item['Rsrp']<30 and item['Rsrp']>=20 else 0,
            'RsrpBetween110105': 1 if item['Rsrp']<35 and item['Rsrp']>=30 else 0,
            'RsrpBetween105100': 1 if item['Rsrp']<40 and item['Rsrp']>=35 else 0,
            'RsrpBetween10090': 1 if item['Rsrp']<50 and item['Rsrp']>=40 else 0,
            'RsrpAbove90': 1 if item['Rsrp']>=50 else 0,
            'Ta0or1': 1 if item['Ta']==0 or item['Ta']==1 else 0,
            'Ta2or3': 1 if item['Ta']==2 or item['Ta']==3 else 0,
            'Ta4or5': 1 if item['Ta']==4 or item['Ta']==5 else 0,
            'Ta6or7': 1 if item['Ta']==6 or item['Ta']==7 else 0,
            'Ta8or9': 1 if item['Ta']==8 or item['Ta']==9 else 0,
            'Ta10to12': 1 if item['Ta']>=10 and item['Ta']<=12 else 0,
            'Ta13to15': 1 if item['Ta']>=13 and item['Ta']<=15 else 0,
            'Ta16to19': 1 if item['Ta']>=16 and item['Ta']<=19 else 0,
            'Ta20to24': 1 if item['Ta']>=20 and item['Ta']<=24 else 0,
            'Ta25to29': 1 if item['Ta']>=25 and item['Ta']<=29 else 0,
            'Ta30to39': 1 if item['Ta']>=30 and item['Ta']<=39 else 0,
            'TaAbove40': 1 if item['Ta']>=40 else 0,
            'SinrUl0to9': 1 if item['SinrUl']>=0 and item['SinrUl']<=9 else 0,
            'SinrUl10to19': 1 if item['SinrUl']>=10 and item['SinrUl']<=19 else 0,
            'SinrUl20to24': 1 if item['SinrUl']>=20 and item['SinrUl']<=24 else 0,
            'SinrUl25to29': 1 if item['SinrUl']>=25 and item['SinrUl']<=29 else 0,
            'SinrUl30to34': 1 if item['SinrUl']>=30 and item['SinrUl']<=34 else 0,
            'SinrUlAbove35': 1 if item['SinrUl']>=35 else 0
        }, combined_list))
        df = DataFrame(stat_list)
        stat=df.groupby(['CellId','Pci','NeighborPci', 'Earfcn', 'NeighborEarfcn']).sum().reset_index()
        return json.loads(stat.T.to_json()).values()
```
#### 中兴处理代码
```python
      diff_list=list(map(lambda index: self._map_neighbor_rsrp_diff(index+1), list(range(6))))
        combined_list=reduce(lambda first,second: first+second,diff_list,[])
        if len(combined_list)==0:
            return []
        stat_list=list(map(lambda item: {
            'CellId': item['CellId'],
            'Earfcn': item['Earfcn'],
            'NeighborPci': item['NeighborPci'],
            'NeighborEarfcn': item['NeighborEarfcn'],
            'Pci': item['Pci'],
            'Diff0': 1 if item['RsrpDiff']<=0 else 0,
            'Diff3': 1 if item['RsrpDiff']<=3 and item['RsrpDiff']>0 else 0,
            'Diff6': 1 if item['RsrpDiff']<=6 and item['RsrpDiff']>3 else 0,
            'Diff9': 1 if item['RsrpDiff']<=9 and item['RsrpDiff']>6 else 0,
            'Diff12': 1 if item['RsrpDiff']<=12 and item['RsrpDiff']>9 else 0,
            'DiffLarge': 1 if item['RsrpDiff']>12 else 0,
            'RsrpBelow120': 1 if item['Rsrp']<20 else 0,
            'RsrpBetween120110': 1 if item['Rsrp']<30 and item['Rsrp']>=20 else 0,
            'RsrpBetween110105': 1 if item['Rsrp']<35 and item['Rsrp']>=30 else 0,
            'RsrpBetween105100': 1 if item['Rsrp']<40 and item['Rsrp']>=35 else 0,
            'RsrpBetween10090': 1 if item['Rsrp']<50 and item['Rsrp']>=40 else 0,
            'RsrpAbove90': 1 if item['Rsrp']>=50 else 0,
            'Ta0or1': 1 if item['Ta']==0 or item['Ta']==1 else 0,
            'Ta2or3': 1 if item['Ta']==2 or item['Ta']==3 else 0,
            'Ta4or5': 1 if item['Ta']==4 or item['Ta']==5 else 0,
            'Ta6or7': 1 if item['Ta']==6 or item['Ta']==7 else 0,
            'Ta8or9': 1 if item['Ta']==8 or item['Ta']==9 else 0,
            'Ta10to12': 1 if item['Ta']>=10 and item['Ta']<=12 else 0,
            'Ta13to15': 1 if item['Ta']>=13 and item['Ta']<=15 else 0,
            'Ta16to19': 1 if item['Ta']>=16 and item['Ta']<=19 else 0,
            'Ta20to24': 1 if item['Ta']>=20 and item['Ta']<=24 else 0,
            'Ta25to29': 1 if item['Ta']>=25 and item['Ta']<=29 else 0,
            'Ta30to39': 1 if item['Ta']>=30 and item['Ta']<=39 else 0,
            'TaAbove40': 1 if item['Ta']>=40 else 0,
            'SinrUl0to9': 1 if item['SinrUl']>=0 and item['SinrUl']<=9 else 0,
            'SinrUl10to19': 1 if item['SinrUl']>=10 and item['SinrUl']<=19 else 0,
            'SinrUl20to24': 1 if item['SinrUl']>=20 and item['SinrUl']<=24 else 0,
            'SinrUl25to29': 1 if item['SinrUl']>=25 and item['SinrUl']<=29 else 0,
            'SinrUl30to34': 1 if item['SinrUl']>=30 and item['SinrUl']<=34 else 0,
            'SinrUlAbove35': 1 if item['SinrUl']>=35 else 0
        }, combined_list))
        df = DataFrame(stat_list)
        stat=df.groupby(['CellId','Pci','NeighborPci', 'Earfcn', 'NeighborEarfcn']).sum().reset_index()
        return json.loads(stat.T.to_json()).values()
```
#### 通用子函数

```python
      def _map_neighbor_rsrp_diff(self, index):
        measureList=self._filter_by_neighbor_len(index)
        if len(measureList)==0:
            return []
        return list(map(lambda item: {
            'CellId': item['id'],
            'Earfcn': item['Earfcn'],
            'NeighborPci': item['NeighborList'][index-1]['Pci'],
            'NeighborEarfcn': item['NeighborList'][index-1]['Earfcn'],
            'RsrpDiff': item['Rsrp']-item['NeighborList'][index-1]['Rsrp'],
            'Rsrp': item['Rsrp'],
            'Pci': item['Pci'],
            'Ta': item['Ta'],
            'SinrUl': item['SinrUl']
        }, measureList))
```
