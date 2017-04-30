USE [masterTest]
GO
/****** Object:  StoredProcedure [dbo].[sp_get2GFileContentsRasterConsidered]    Script Date: 07/04/2016 14:20:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_get2GFileContentsRasterConsidered] 
	-- Add the parameters for the stored procedure here
	@tableName varchar(max),
	@rasterNum int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	exec('SELECT rasterNum, testTime, lon, lat, refPN, EcIo, rxAGC, txAGC, txPower, txGain from ' +@tableName
	+ ' where rasterNum = ' + @rasterNum)
END
