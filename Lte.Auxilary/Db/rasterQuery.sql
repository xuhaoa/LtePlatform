select a.csvFilesName2G, a.rasterNum, a.area from rasterInfo a join csvFilesInfo b on a.csvFilesName2G+'.csv' = b.csvFileName

select a.csvFilesName3G, a.rasterNum, a.area from rasterInfo a join csvFilesInfo b on a.csvFilesName3G+'.csv' = b.csvFileName

select a.csvFilesName4G, a.rasterNum, a.area from rasterInfo a join csvFilesInfo b on a.csvFilesName4G+'.csv' = b.csvFileName

select * from rasterInfo where csvFilesName4G='高明_201701_3'

select distinct rasterNum from 高明_201701_3