USE [masterTest]
GO
/****** Object:  StoredProcedure [dbo].[sp_get4GFileContentsRasterConsidered]    Script Date: 07/04/2016 14:23:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_get4GFileContentsRasterConsidered] 
	-- Add the parameters for the stored procedure here
	@tableName varchar(max),
	@rasterNum int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	exec('SELECT rasterNum, testTime, lon, lat, eNodeBID, cellID, freq, PCI, RSRP, SINR, DLBler, CQIave, ULMCS, DLMCS, PDCPThrUL, PDCPThrDL, PHYThrDL, MACThrDL, PUSCHRbNum, PDSCHRbNum, PUSCHTBSizeAve, PDSCHTBSizeAve, n1PCI, n1RSRP, n2PCI, n2RSRP, n3PCI, n3RSRP from ' +@tableName
	+ ' where rasterNum = ' + @rasterNum)
END
