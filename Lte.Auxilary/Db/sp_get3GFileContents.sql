USE [masterTest]
GO
/****** Object:  StoredProcedure [dbo].[sp_get2GFileContentsRasterConsidered]    Script Date: 07/019/2017 6:20:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,OuyangHui>
-- Create date: <Create Date,,2017/7/19>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_get3GFileContents] 
	-- Add the parameters for the stored procedure here
	@tableName varchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Insert statements for procedure here
	exec('SELECT rasterNum, testTime, lon, lat, refPN, SINR, RxAGC0, RxAGC1, txAGC, totalC2I, DRCValue, RLPThrDL from ' +@tableName)
END
