SELECT a.Name, b.csvFileName FROM SysObjects a left join csvFilesInfo b on a.Name+'.csv' = b.csvFileName Where a.XType='U' and b.csvFileName IS NULL

select * from raster

select * from rasterInfo

select * from csvFilesInfo