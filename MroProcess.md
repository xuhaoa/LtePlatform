#MRO数据文件格式及处理
##数据文件细节
###邻区测量节
####华为格式
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
      <object MmeCode="1" MmeGroupId="17409" MmeUeS1apId="419510378" TimeStamp="2016-11-22T11:30:05.440" id="48">
        <v>50 37 24 2 1825 285 1825 228 NIL NIL NIL NIL 2 13 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>50 37 24 0 1825 285 1825 119 NIL NIL NIL NIL 2 13 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>50 36 24 0 1825 285 1825 354 NIL NIL NIL NIL 2 13 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>50 35 24 0 1825 285 1825 356 NIL NIL NIL NIL 2 13 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>50 35 24 0 1825 285 1825 287 NIL NIL NIL NIL 2 13 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
        <v>50 35 24 0 1825 285 1825 355 NIL NIL NIL NIL 2 13 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
      </object>
      ...
    </measurement>
```
####中兴格式
    与华为格式一样，该节由多个object对象组合而成，每个object对象对应一次测量信息，不同之处是字段更多，且字段的顺序有些不一样
```xml
    <measurement>
      <smr>MR.LteScEarfcn MR.LteScPci MR.LteScRSRP MR.LteScRSRQ MR.LteScTadv MR.LteScPHR MR.LteScAOA MR.LteScSinrUL MR.LteScRI1 MR.LteScRI2 MR.LteScRI4 MR.LteScRI8 MR.LteScBSR MR.LteScPUSCHPRBNum MR.LteScPDSCHPRBNum MR.CQI0 MR.CQI1 MR.LatitudeSign MR.Longitude MR.Latitude MR.LteNcEarfcn MR.LteNcPci MR.LteNcRSRP MR.LteNcRSRQ MR.CDMAtype MR.CDMANcArfcn MR.CDMAPNphase MR.LteCDMAorHRPDNcPilotStrength MR.CDMANcBand MR.CDMANcPci</smr>
        <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176171960" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
          <v>1825 467 46 18 2 35 NIL 33 2 62 0 0 0 32 13 6 6 NIL NIL NIL 1825 68 41 15 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 46 18 2 35 NIL 33 2 62 0 0 0 32 13 6 6 NIL NIL NIL 1825 122 25 0 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 46 18 2 35 NIL 33 2 62 0 0 0 32 13 6 6 NIL NIL NIL 1825 194 36 10 NIL NIL NIL NIL NIL NIL</v>
        </object>
        <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176215168" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
          <v>1825 467 33 25 3 17 NIL 31 3 61 0 0 8 38 35 11 11 NIL NIL NIL 1825 66 18 11 NIL NIL NIL NIL NIL NIL</v>
          <v>1825 467 33 25 3 17 NIL 31 3 61 0 0 8 38 35 11 11 NIL NIL NIL 1825 466 12 0 NIL NIL NIL NIL NIL NIL</v>
        </object>
        <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="176227313" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
          <v>1825 467 44 25 6 31 NIL 32 17 47 0 0 16 32 31 11 11 NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL NIL</v>
        </object>
        <object MR.MmeCode="1" MR.MmeGroupId="17409" MR.MmeUeS1apId="180372121" MR.TimeStamp="2016-09-16T19:45:01.440" MR.objectId="48">
          <v>1825 467 42 24 7 29 NIL 24 1 63 0 0 0 24 13 9 9 NIL NIL NIL 1825 465 26 2 NIL NIL NIL NIL NIL NIL</v>
        </object>
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
###服务小区上下行丢包率节
####华为格式
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
####中兴格式
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
###上行接收干扰功率节
####华为格式

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
####中兴格式
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

