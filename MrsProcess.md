#MRS数据解析
##数据文件细节-重要数据节
    MRS的测量数据节很多，下面就目前版本应用的情况介绍几个重要的数据节。
###RSRP节
####数据格式
华为和中兴数据格式一致，如下所示：
```xml
    <measurement mrName="MR.RSRP">
      <smr>MR.RSRP.00 MR.RSRP.01 MR.RSRP.02 MR.RSRP.03 MR.RSRP.04 MR.RSRP.05 MR.RSRP.06 MR.RSRP.07 MR.RSRP.08 MR.RSRP.09 MR.RSRP.10 MR.RSRP.11 MR.RSRP.12 MR.RSRP.13 MR.RSRP.14 MR.RSRP.15 MR.RSRP.16 MR.RSRP.17 MR.RSRP.18 MR.RSRP.19 MR.RSRP.20 MR.RSRP.21 MR.RSRP.22 MR.RSRP.23 MR.RSRP.24 MR.RSRP.25 MR.RSRP.26 MR.RSRP.27 MR.RSRP.28 MR.RSRP.29 MR.RSRP.30 MR.RSRP.31 MR.RSRP.32 MR.RSRP.33 MR.RSRP.34 MR.RSRP.35 MR.RSRP.36 MR.RSRP.37 MR.RSRP.38 MR.RSRP.39 MR.RSRP.40 MR.RSRP.41 MR.RSRP.42 MR.RSRP.43 MR.RSRP.44 MR.RSRP.45 MR.RSRP.46 MR.RSRP.47</smr>
      <object id="0">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 1 2 5 5 5 9 6 3 2 4 5 4 3 4 1 0</v>
      </object>
      <object id="1">
        <v>0 1 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 2 0 1 0 4 7 7 4 4 6 2 4 1 0 1 0 0 0 0</v>
      </object>
      <object id="2">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="3">
        <v>0 0 0 0 0 0 1 0 2 1 2 0 1 2 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
    </measurement>
```
###TADV节
####数据格式
华为和中兴数据格式一致，如下所示：
```xml
    <measurement mrName="MR.Tadv">
      <smr>MR.Tadv.00 MR.Tadv.01 MR.Tadv.02 MR.Tadv.03 MR.Tadv.04 MR.Tadv.05 MR.Tadv.06 MR.Tadv.07 MR.Tadv.08 MR.Tadv.09 MR.Tadv.10 MR.Tadv.11 MR.Tadv.12 MR.Tadv.13 MR.Tadv.14 MR.Tadv.15 MR.Tadv.16 MR.Tadv.17 MR.Tadv.18 MR.Tadv.19 MR.Tadv.20 MR.Tadv.21 MR.Tadv.22 MR.Tadv.23 MR.Tadv.24 MR.Tadv.25 MR.Tadv.26 MR.Tadv.27 MR.Tadv.28 MR.Tadv.29 MR.Tadv.30 MR.Tadv.31 MR.Tadv.32 MR.Tadv.33 MR.Tadv.34 MR.Tadv.35 MR.Tadv.36 MR.Tadv.37 MR.Tadv.38 MR.Tadv.39 MR.Tadv.40 MR.Tadv.41 MR.Tadv.42 MR.Tadv.43 MR.Tadv.44</smr>
      <object id="0">
        <v>53 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="1">
        <v>37 3 5 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="2">
        <v>3 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="3">
        <v>1 11 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
    </measurement>
```
###PHR节
####数据格式
华为和中兴数据格式一致，如下所示：
```xml
    <measurement mrName="MR.PowerHeadRoom">
      <smr>MR.PowerHeadRoom.00 MR.PowerHeadRoom.01 MR.PowerHeadRoom.02 MR.PowerHeadRoom.03 MR.PowerHeadRoom.04 MR.PowerHeadRoom.05 MR.PowerHeadRoom.06 MR.PowerHeadRoom.07 MR.PowerHeadRoom.08 MR.PowerHeadRoom.09 MR.PowerHeadRoom.10 MR.PowerHeadRoom.11 MR.PowerHeadRoom.12 MR.PowerHeadRoom.13 MR.PowerHeadRoom.14 MR.PowerHeadRoom.15 MR.PowerHeadRoom.16 MR.PowerHeadRoom.17 MR.PowerHeadRoom.18 MR.PowerHeadRoom.19 MR.PowerHeadRoom.20 MR.PowerHeadRoom.21 MR.PowerHeadRoom.22 MR.PowerHeadRoom.23 MR.PowerHeadRoom.24 MR.PowerHeadRoom.25 MR.PowerHeadRoom.26 MR.PowerHeadRoom.27 MR.PowerHeadRoom.28 MR.PowerHeadRoom.29 MR.PowerHeadRoom.30 MR.PowerHeadRoom.31 MR.PowerHeadRoom.32 MR.PowerHeadRoom.33 MR.PowerHeadRoom.34 MR.PowerHeadRoom.35 MR.PowerHeadRoom.36 MR.PowerHeadRoom.37 MR.PowerHeadRoom.38 MR.PowerHeadRoom.39 MR.PowerHeadRoom.40 MR.PowerHeadRoom.41 MR.PowerHeadRoom.42 MR.PowerHeadRoom.43 MR.PowerHeadRoom.44 MR.PowerHeadRoom.45 MR.PowerHeadRoom.46 MR.PowerHeadRoom.47 MR.PowerHeadRoom.48 MR.PowerHeadRoom.49 MR.PowerHeadRoom.50 MR.PowerHeadRoom.51 MR.PowerHeadRoom.52 MR.PowerHeadRoom.53 MR.PowerHeadRoom.54 MR.PowerHeadRoom.55 MR.PowerHeadRoom.56 MR.PowerHeadRoom.57 MR.PowerHeadRoom.58 MR.PowerHeadRoom.59 MR.PowerHeadRoom.60 MR.PowerHeadRoom.61 MR.PowerHeadRoom.62 MR.PowerHeadRoom.63</smr>
      <object id="0">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 3 1 0 4 4 5 2 2 4 1 1 1 2 3 2 3 1 1 0 3 4 1 2 2 0 0 0 0 0 0 1</v>
      </object>
      <object id="1">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 2 0 2 1 0 2 3 0 0 3 1 2 1 3 3 4 5 5 2 2 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="2">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="3">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 3 1 0 0 0 0 2 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
    </measurement>
```
###上行SINR节
####数据格式
华为和中兴数据格式一致，如下所示：
```xml
    <measurement mrName="MR.SinrUL">
      <smr>MR.SinrUL.00 MR.SinrUL.01 MR.SinrUL.02 MR.SinrUL.03 MR.SinrUL.04 MR.SinrUL.05 MR.SinrUL.06 MR.SinrUL.07 MR.SinrUL.08 MR.SinrUL.09 MR.SinrUL.10 MR.SinrUL.11 MR.SinrUL.12 MR.SinrUL.13 MR.SinrUL.14 MR.SinrUL.15 MR.SinrUL.16 MR.SinrUL.17 MR.SinrUL.18 MR.SinrUL.19 MR.SinrUL.20 MR.SinrUL.21 MR.SinrUL.22 MR.SinrUL.23 MR.SinrUL.24 MR.SinrUL.25 MR.SinrUL.26 MR.SinrUL.27 MR.SinrUL.28 MR.SinrUL.29 MR.SinrUL.30 MR.SinrUL.31 MR.SinrUL.32 MR.SinrUL.33 MR.SinrUL.34 MR.SinrUL.35 MR.SinrUL.36</smr>
      <object id="0">
        <v>1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 3 3 6 5 7 4 3 2 18</v>
      </object>
      <object id="1">
        <v>1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 1 0 0 1 0 0 2 1 2 3 4 4 1 3 1 18</v>
      </object>
      <object id="2">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0 2</v>
      </object>
      <object id="3">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 2 0 0 0 2 0 2 1 0 0 0 1 1 0 0 0 0 1 0</v>
      </object>
    </measurement>
```
##数据文件细节-二维数据节
###RSRP-RSRQ节
####数据格式
华为和中兴数据格式一致，如下所示：
```xml
    <measurement mrName="MR.RsrpRsrq">
      <smr>MR.Rsrp00Rsrq00 MR.Rsrp00Rsrq01 MR.Rsrp00Rsrq02 MR.Rsrp00Rsrq03 MR.Rsrp00Rsrq04 MR.Rsrp00Rsrq05 MR.Rsrp00Rsrq06 MR.Rsrp00Rsrq07 MR.Rsrp00Rsrq08 MR.Rsrp00Rsrq09 MR.Rsrp01Rsrq00 MR.Rsrp01Rsrq01 MR.Rsrp01Rsrq02 MR.Rsrp01Rsrq03 MR.Rsrp01Rsrq04 MR.Rsrp01Rsrq05 MR.Rsrp01Rsrq06 MR.Rsrp01Rsrq07 MR.Rsrp01Rsrq08 MR.Rsrp01Rsrq09 MR.Rsrp02Rsrq00 MR.Rsrp02Rsrq01 MR.Rsrp02Rsrq02 MR.Rsrp02Rsrq03 MR.Rsrp02Rsrq04 MR.Rsrp02Rsrq05 MR.Rsrp02Rsrq06 MR.Rsrp02Rsrq07 MR.Rsrp02Rsrq08 MR.Rsrp02Rsrq09 MR.Rsrp03Rsrq00 MR.Rsrp03Rsrq01 MR.Rsrp03Rsrq02 MR.Rsrp03Rsrq03 MR.Rsrp03Rsrq04 MR.Rsrp03Rsrq05 MR.Rsrp03Rsrq06 MR.Rsrp03Rsrq07 MR.Rsrp03Rsrq08 MR.Rsrp03Rsrq09 MR.Rsrp04Rsrq00 MR.Rsrp04Rsrq01 MR.Rsrp04Rsrq02 MR.Rsrp04Rsrq03 MR.Rsrp04Rsrq04 MR.Rsrp04Rsrq05 MR.Rsrp04Rsrq06 MR.Rsrp04Rsrq07 MR.Rsrp04Rsrq08 MR.Rsrp04Rsrq09 MR.Rsrp05Rsrq00 MR.Rsrp05Rsrq01 MR.Rsrp05Rsrq02 MR.Rsrp05Rsrq03 MR.Rsrp05Rsrq04 MR.Rsrp05Rsrq05 MR.Rsrp05Rsrq06 MR.Rsrp05Rsrq07 MR.Rsrp05Rsrq08 MR.Rsrp05Rsrq09 MR.Rsrp06Rsrq00 MR.Rsrp06Rsrq01 MR.Rsrp06Rsrq02 MR.Rsrp06Rsrq03 MR.Rsrp06Rsrq04 MR.Rsrp06Rsrq05 MR.Rsrp06Rsrq06 MR.Rsrp06Rsrq07 MR.Rsrp06Rsrq08 MR.Rsrp06Rsrq09 MR.Rsrp07Rsrq00 MR.Rsrp07Rsrq01 MR.Rsrp07Rsrq02 MR.Rsrp07Rsrq03 MR.Rsrp07Rsrq04 MR.Rsrp07Rsrq05 MR.Rsrp07Rsrq06 MR.Rsrp07Rsrq07 MR.Rsrp07Rsrq08 MR.Rsrp07Rsrq09 MR.Rsrp08Rsrq00 MR.Rsrp08Rsrq01 MR.Rsrp08Rsrq02 MR.Rsrp08Rsrq03 MR.Rsrp08Rsrq04 MR.Rsrp08Rsrq05 MR.Rsrp08Rsrq06 MR.Rsrp08Rsrq07 MR.Rsrp08Rsrq08 MR.Rsrp08Rsrq09 MR.Rsrp09Rsrq00 MR.Rsrp09Rsrq01 MR.Rsrp09Rsrq02 MR.Rsrp09Rsrq03 MR.Rsrp09Rsrq04 MR.Rsrp09Rsrq05 MR.Rsrp09Rsrq06 MR.Rsrp09Rsrq07 MR.Rsrp09Rsrq08 MR.Rsrp09Rsrq09 MR.Rsrp10Rsrq00 MR.Rsrp10Rsrq01 MR.Rsrp10Rsrq02 MR.Rsrp10Rsrq03 MR.Rsrp10Rsrq04 MR.Rsrp10Rsrq05 MR.Rsrp10Rsrq06 MR.Rsrp10Rsrq07 MR.Rsrp10Rsrq08 MR.Rsrp10Rsrq09 MR.Rsrp11Rsrq00 MR.Rsrp11Rsrq01 MR.Rsrp11Rsrq02 MR.Rsrp11Rsrq03 MR.Rsrp11Rsrq04 MR.Rsrp11Rsrq05 MR.Rsrp11Rsrq06 MR.Rsrp11Rsrq07 MR.Rsrp11Rsrq08 MR.Rsrp11Rsrq09</smr>
      <object id="0">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 0 0 18 0 0 0 0 0 0 0 0 1 16 0 0 0 0 0 0 0 0 0 7 0 0 0 0 0 0 0 0 0 11 0 0 0 0 0 0 0 0 0 6 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="1">
        <v>0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 3 0 0 0 0 0 0 0 0 8 14 0 0 0 0 0 0 0 0 0 11 0 0 0 0 0 0 0 0 0 6 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="2">
        <v>0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="3">
        <v>0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 5 0 0 0 0 0 0 0 0 0 4 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
    </measurement>
```
###RSRP-TADV节
####数据格式
华为和中兴数据格式一致，如下所示：
```xml
    <measurement mrName="MR.TadvRsrp">
      <smr>MR.Tadv00Rsrp00 MR.Tadv00Rsrp01 MR.Tadv00Rsrp02 MR.Tadv00Rsrp03 MR.Tadv00Rsrp04 MR.Tadv00Rsrp05 MR.Tadv00Rsrp06 MR.Tadv00Rsrp07 MR.Tadv00Rsrp08 MR.Tadv00Rsrp09 MR.Tadv00Rsrp10 MR.Tadv00Rsrp11 MR.Tadv01Rsrp00 MR.Tadv01Rsrp01 MR.Tadv01Rsrp02 MR.Tadv01Rsrp03 MR.Tadv01Rsrp04 MR.Tadv01Rsrp05 MR.Tadv01Rsrp06 MR.Tadv01Rsrp07 MR.Tadv01Rsrp08 MR.Tadv01Rsrp09 MR.Tadv01Rsrp10 MR.Tadv01Rsrp11 MR.Tadv02Rsrp00 MR.Tadv02Rsrp01 MR.Tadv02Rsrp02 MR.Tadv02Rsrp03 MR.Tadv02Rsrp04 MR.Tadv02Rsrp05 MR.Tadv02Rsrp06 MR.Tadv02Rsrp07 MR.Tadv02Rsrp08 MR.Tadv02Rsrp09 MR.Tadv02Rsrp10 MR.Tadv02Rsrp11 MR.Tadv03Rsrp00 MR.Tadv03Rsrp01 MR.Tadv03Rsrp02 MR.Tadv03Rsrp03 MR.Tadv03Rsrp04 MR.Tadv03Rsrp05 MR.Tadv03Rsrp06 MR.Tadv03Rsrp07 MR.Tadv03Rsrp08 MR.Tadv03Rsrp09 MR.Tadv03Rsrp10 MR.Tadv03Rsrp11 MR.Tadv04Rsrp00 MR.Tadv04Rsrp01 MR.Tadv04Rsrp02 MR.Tadv04Rsrp03 MR.Tadv04Rsrp04 MR.Tadv04Rsrp05 MR.Tadv04Rsrp06 MR.Tadv04Rsrp07 MR.Tadv04Rsrp08 MR.Tadv04Rsrp09 MR.Tadv04Rsrp10 MR.Tadv04Rsrp11 MR.Tadv05Rsrp00 MR.Tadv05Rsrp01 MR.Tadv05Rsrp02 MR.Tadv05Rsrp03 MR.Tadv05Rsrp04 MR.Tadv05Rsrp05 MR.Tadv05Rsrp06 MR.Tadv05Rsrp07 MR.Tadv05Rsrp08 MR.Tadv05Rsrp09 MR.Tadv05Rsrp10 MR.Tadv05Rsrp11 MR.Tadv06Rsrp00 MR.Tadv06Rsrp01 MR.Tadv06Rsrp02 MR.Tadv06Rsrp03 MR.Tadv06Rsrp04 MR.Tadv06Rsrp05 MR.Tadv06Rsrp06 MR.Tadv06Rsrp07 MR.Tadv06Rsrp08 MR.Tadv06Rsrp09 MR.Tadv06Rsrp10 MR.Tadv06Rsrp11 MR.Tadv07Rsrp00 MR.Tadv07Rsrp01 MR.Tadv07Rsrp02 MR.Tadv07Rsrp03 MR.Tadv07Rsrp04 MR.Tadv07Rsrp05 MR.Tadv07Rsrp06 MR.Tadv07Rsrp07 MR.Tadv07Rsrp08 MR.Tadv07Rsrp09 MR.Tadv07Rsrp10 MR.Tadv07Rsrp11 MR.Tadv08Rsrp00 MR.Tadv08Rsrp01 MR.Tadv08Rsrp02 MR.Tadv08Rsrp03 MR.Tadv08Rsrp04 MR.Tadv08Rsrp05 MR.Tadv08Rsrp06 MR.Tadv08Rsrp07 MR.Tadv08Rsrp08 MR.Tadv08Rsrp09 MR.Tadv08Rsrp10 MR.Tadv08Rsrp11 MR.Tadv09Rsrp00 MR.Tadv09Rsrp01 MR.Tadv09Rsrp02 MR.Tadv09Rsrp03 MR.Tadv09Rsrp04 MR.Tadv09Rsrp05 MR.Tadv09Rsrp06 MR.Tadv09Rsrp07 MR.Tadv09Rsrp08 MR.Tadv09Rsrp09 MR.Tadv09Rsrp10 MR.Tadv09Rsrp11 MR.Tadv10Rsrp00 MR.Tadv10Rsrp01 MR.Tadv10Rsrp02 MR.Tadv10Rsrp03 MR.Tadv10Rsrp04 MR.Tadv10Rsrp05 MR.Tadv10Rsrp06 MR.Tadv10Rsrp07 MR.Tadv10Rsrp08 MR.Tadv10Rsrp09 MR.Tadv10Rsrp10 MR.Tadv10Rsrp11</smr>
      <object id="0">
        <v>0 0 0 0 0 2 18 14 6 11 4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="1">
        <v>1 1 0 1 0 2 22 11 6 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="2">
        <v>0 0 0 1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
      <object id="3">
        <v>1 5 4 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</v>
      </object>
    </measurement>
```

##数据处理流程
###华为处理代码
```python
      def read(self, item_measurement):
        mrName=item_measurement.attrib['mrName'].replace('MR.','')
        if mrName in self.mrNames:
            item_dicts=[]
            for item_element in item_measurement.iterchildren():
                if item_element.tag == 'smr':
                    item_key = item_element.text.replace('MR.', '').replace('.','_').split(' ')
                else:
                    item_dict={}
                    item_dict.update({'CellId': self.eNodebId + '-' + item_element.attrib['id']})
                    item_value = item_element[0].text.split(' ')
                    item_dict.update(dict(zip(item_key, map(int, item_value))))
                    item_dict.update({'StartTime': self.startTime})
                    item_dicts.append(item_dict)
            if len(item_dicts)>0:
                self.db['mrs_'+mrName+'_'+self.date_dir].insert_many(item_dicts)
```
###中兴代码
```python
      def read_zte(self, item_measurement, eNodebId):
        mrName=item_measurement.attrib['mrName'].replace('MR.','')
        if mrName in self.mrNames:
            item_dicts=[]
            for item_element in item_measurement.iterchildren():
                if item_element.tag == 'smr':
                    item_key = item_element.text.replace('MR.', '').replace('.','_').split(' ')
                else:
                    item_dict={}
                    item_dict.update({'CellId': eNodebId+'-'+item_element.attrib['MR.objectId']})
                    item_value = item_element[0].text.split(' ')
                    item_dict.update(dict(zip(item_key, map(int, item_value))))
                    item_dict.update({'StartTime': self.startTime})
                    item_dicts.append(item_dict)
            if len(item_dicts)>0:
                self.db['mrs_'+mrName+'_'+self.date_dir].insert_many(item_dicts)
```
