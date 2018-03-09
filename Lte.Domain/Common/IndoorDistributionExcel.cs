using Lte.Domain.Common.Geo;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
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