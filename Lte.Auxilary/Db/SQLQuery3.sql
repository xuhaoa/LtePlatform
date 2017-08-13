--DROP TABLE [CDMA_0601-110248锦龙医药dt_2_All]

SELECT * FROM [CDMA_0601-143131-1222_2_All]

INSERT INTO [CDMA_0601-110248锦龙医药dt_2_All] 
( [rasterNum],[testTime],[lon],[lat],[refPN],[EcIo],[rxAGC],[txAGC],[txPower],[txGain]) 
VALUES(4649,'2014-1-14 14:39:39.999',113.108658666667,23.0380863333333,282,-7.04,-71.58,NULL,NULL,NULL)

EXEC dbo.sp_get2GFileContents @tableName = '[CDMA_0601-110248锦龙医药dt_2_All]' -- varchar(max)
