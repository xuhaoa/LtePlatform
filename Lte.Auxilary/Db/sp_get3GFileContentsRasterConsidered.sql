USE [masterTest]
GO
/****** Object:  StoredProcedure [dbo].[sp_get3GFileContentsRasterConsidered]    Script Date: 07/04/2016 14:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_get3GFileContentsRasterConsidered] 
	-- Add the parameters for the stored procedure here
	@tableName varchar(max),
	@rasterNum int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	exec('SELECT rasterNum, testTime, lon, lat, refPN, SINR, RxAGC0, RxAGC1, txAGC, totalC2I, DRCValue, RLPThrDL from ' +@tableName
	+ ' where rasterNum = ' + @rasterNum)
END
