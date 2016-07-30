using System;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Basic;

namespace Lte.Parameters.Entities.ExcelCsv
{
    /// <summary>
    /// 定义记录LTE基站的信息的Excel导出数据项
    /// </summary>
    /// <remarks>需要定义与ENodeb之间的映射关系</remarks>
    [TypeDoc("定义记录LTE基站的信息的Excel导出数据项")]
    public class ENodebExcel
    {
        [ExcelColumn("eNodeBName")]
        [MemberDoc("基站名称")]
        public string Name { get; set; }

        [ExcelColumn("区域")]
        [MemberDoc("区域")]
        public string DistrictName { get; set; }

        [ExcelColumn("镇区")]
        [MemberDoc("镇区")]
        public string TownName { get; set; }

        [ExcelColumn("经度")]
        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("地址")]
        [MemberDoc("地址")]
        public string Address { get; set; }

        [ExcelColumn("地市")]
        [MemberDoc("地市")]
        public string CityName { get; set; }

        [ExcelColumn("网格")]
        [MemberDoc("网格")]
        public string Grid { get; set; }

        [ExcelColumn("厂家")]
        [MemberDoc("厂家")]
        public string Factory { get; set; }

        [ExcelColumn("IP", TransformEnum.IpAddress)]
        [MemberDoc("IP")]
        public IpAddress Ip { get; set; } = new IpAddress("0.0.0.0");

        [ExcelColumn("eNodeB ID")]
        [MemberDoc("eNodeB ID")]
        public int ENodebId { get; set; }

        [MemberDoc("IP地址字符串")]
        public string IpString => Ip.AddressString;

        [ExcelColumn("网关", TransformEnum.IpAddress)]
        [MemberDoc("网关")]
        public IpAddress GatewayIp { get; set; } = new IpAddress("0.0.0.0");

        [MemberDoc("网关地址字符串")]
        public string GatewayString => GatewayIp.AddressString;

        [ExcelColumn("规划编号(设计院)")]
        [MemberDoc("规划编号(设计院)")]
        public string PlanNum { get; set; }

        [ExcelColumn("制式")]
        [MemberDoc("制式")]
        public string DivisionDuplex { get; set; } = "FDD";

        [ExcelColumn("入网日期", TransformEnum.DefaultOpenDate)]
        [MemberDoc("入网日期")]
        public DateTime OpenDate { get; set; }
    }

    [AutoMapTo(typeof(CdmaBts))]
    [TypeDoc("定义记录CDMA基站信息的Excel导出数据项，需要定义与CdmaBts之间的映射关系。")]
    public class BtsExcel
    {
        [ExcelColumn("基站名称")]
        public string Name { get; set; }

        [ExcelColumn("行政区域")]
        public string DistrictName { get; set; }

        [ExcelColumn("所属镇区")]
        public string TownName { get; set; }

        [ExcelColumn("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("地址", TransformEnum.AntiNullAddress)]
        public string Address { get; set; }

        [ExcelColumn("基站编号")]
        public int BtsId { get; set; }

        [ExcelColumn("BSC编号")]
        public short BscId { get; set; }
    }
}
