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
