SELECT a.Name, b.csvFileName FROM SysObjects a left join csvFilesInfo b on a.Name+'.csv' = b.csvFileName Where a.XType='U' and b.csvFileName IS NULL

select * from raster

select csvFilesName4G from rasterInfo where rasterNum=2578

select * from March31_15_25_07_feilongDT

select distinct rasterNum from March31_15_25_07_feilongDT
