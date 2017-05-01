using AutoMapper;
using Lte.Domain.Regular.Attributes;
using System.ComponentModel.DataAnnotations;
using Lte.Domain.Common.Geo;

namespace Lte.Domain.Common
{
    [TypeDoc("定义记录CDMA小区的信息的Excel导出数据项，需要定义与CdmaCell之间的映射关系")]
    public class CdmaCellExcel
    {
        [ExcelColumn("扇区标识")]
        [MemberDoc("扇区标识")]
        [Required]
        public byte SectorId { get; set; }

        [ExcelColumn("频点")]
        [MemberDoc("CDMA频点，如283、201、37等")]
        public int Frequency { get; set; }

        [ExcelColumn("覆盖类型(室内/室外/地铁)")]
        [MemberDoc("覆盖类型(室内/室外/地铁)")]
        public string IsIndoor { get; set; } = "否";

        [ExcelColumn("经度")]
        [MemberDoc("经度")]
        [Required]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        [MemberDoc("纬度")]
        [Required]
        public double Lattitute { get; set; }

        [ExcelColumn("挂高")]
        [MemberDoc("天线挂高（米）")]
        public double Height { get; set; }

        [ExcelColumn("下倾角（机械）")]
        [MemberDoc("下倾角（机械）")]
        public double MTilt { get; set; }

        [ExcelColumn("下倾角（电调）")]
        [MemberDoc("下倾角（电调）")]
        public double ETilt { get; set; }

        [ExcelColumn("方位角")]
        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [ExcelColumn("天线增益（dBi）", TransformEnum.DefaultZeroDouble)]
        [MemberDoc("天线增益（dBi）")]
        public double AntennaGain { get; set; }

        [ExcelColumn("基站编号")]
        [MemberDoc("基站编号")]
        public int BtsId { get; set; }

        [ExcelColumn("小区标识")]
        [MemberDoc("小区标识")]
        public int CellId { get; set; }

        [IgnoreMap]
        [ExcelColumn("载扇类型(1X/DO)")]
        [MemberDoc("载扇类型(1X/DO)")]
        public string CellType { get; set; }

        [IgnoreMap]
        [ExcelColumn("LAC")]
        [MemberDoc("LAC，位置区编码")]
        public string Lac { get; set; }

        [IgnoreMap]
        [ExcelColumn("PN码")]
        [MemberDoc("PN码")]
        public short Pn { get; set; }

        [ExcelColumn("是否是RRU(来自：RRU拉远表)")]
        public string IsRru { get; set; }

        [ExcelColumn("TRM单板号")]
        public byte TrmId { get; set; }

        [ExcelColumn("RRU覆盖名称(来自：RRU拉远表)")]
        public string RruName { get; set; }
    }

    [TypeDoc("定义记录LTE小区的信息的Excel导出数据项")]
    public class CellExcel
    {
        [ExcelColumn("CELL_ID", TransformEnum.ByteRemoveQuotions)]
        public byte SectorId { get; set; }

        [ExcelColumn("SectorID")]
        public byte LocalSectorId { get; set; }

        [ExcelColumn("频点")]
        public int Frequency { get; set; }

        [ExcelColumn("拉远名称")]
        public string RruName { get; set; }

        [ExcelColumn("是否接室分")]
        public string IsIndoor { get; set; } = "否";

        [ExcelColumn("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("天线挂高")]
        public double Height { get; set; }

        [ExcelColumn("机械下倾角")]
        public double MTilt { get; set; }

        [ExcelColumn("电下倾角")]
        public double ETilt { get; set; }

        [ExcelColumn("方位角")]
        public double Azimuth { get; set; }

        [ExcelColumn("天线增益")]
        public double AntennaGain { get; set; }

        [ExcelColumn("eNodeB ID", TransformEnum.IntegerRemoveQuotions)]
        public int ENodebId { get; set; }

        [ExcelColumn("频段号")]
        public byte BandClass { get; set; }

        [ExcelColumn("天线信息")]
        public string AntennaInfo { get; set; }

        [ExcelColumn("收发类型")]
        public string TransmitReceive { get; set; }

        [ExcelColumn("共天线信息")]
        public string ShareCdmaInfo { get; set; }

        [ExcelColumn("PCI")]
        public short Pci { get; set; }

        [ExcelColumn("根序列索引")]
        public short Prach { get; set; }

        [ExcelColumn("TAC")]
        public int Tac { get; set; }

        [ExcelColumn("参考信号功率")]
        public double RsPower { get; set; }

        [ExcelColumn("C网共站小区ID")]
        public string CdmaCellId { get; set; }

        [ExcelColumn("天线厂家")]
        public string AntennaFactoryString { get; set; }

        [ExcelColumn("天线型号")]
        public string AntennaModel { get; set; }

        [ExcelColumn("能否电调")]
        public string CanBeETiltDescription { get; set; }

        [ExcelColumn("是否美化")]
        public string IsBeautifyDescription { get; set; }

        [ExcelColumn("是否CA")]
        public string IsCaDescription { get; set; }
    }

    public class IndoorDistributionExcel : IGeoPoint<double>
    {
        [ExcelColumn("站址编号")]
        public string StationNum { get; set; }

        [ExcelColumn("站名")]
        public string Name { get; set; }

        [ExcelColumn("详细地址")]
        public string Address { get; set; }
        
        [ExcelColumn("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("所属网格")]
        public string District { get; set; }

        [ExcelColumn("服务商名称")]
        public string Server { get; set; }

        [ExcelColumn("服务区编号")]
        public string ServiceArea { get; set; }

        [ExcelColumn("系统分类")]
        public string ScaleDescription { get; set; }

        [ExcelColumn("站点归属")]
        public string Owner { get; set; }

        [ExcelColumn("有源设备数量")]
        public byte SourceAppliances { get; set; }

        [ExcelColumn("室外微基站数量")]
        public byte OutdoorPicos { get; set; }

        [ExcelColumn("室外直放站数量")]
        public byte OutdoorRepeaters { get; set; }

        [ExcelColumn("室外RRU拉远数量")]
        public byte OutdoorRrus { get; set; }

        [ExcelColumn("室分信源微基站数量")]
        public byte IndoorPicos { get; set; }

        [ExcelColumn("室分信源直放站数量")]
        public byte IndoorRepeaters { get; set; }

        [ExcelColumn("室分信源RRU拉远数量")]
        public byte IndoorRrus { get; set; }

        [ExcelColumn("室分干放数量")]
        public byte Amplifiers { get; set; }

        [ExcelColumn("L网基站编号")]
        public int ENodebId { get; set; }

        [ExcelColumn("L网扇区编号")]
        public byte LteSectorId { get; set; }

        [ExcelColumn("C网基站编号")]
        public int BtsId { get; set; }

        [ExcelColumn("C网扇区编号")]
        public byte CdmaSectorId { get; set; }
    }
}
