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
