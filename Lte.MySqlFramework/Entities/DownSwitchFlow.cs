using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;
using System;

namespace Lte.MySqlFramework.Entities
{
    public class DownSwitchFlow : Entity
    {
        public DateTime StatDate { get; set; }

        public string City { get; set; }

        public string Region { get; set; }

        public double Flow4G { get; set; }

        public double DownSwitchFlow3G { get; set; }
    }

    [AutoMapTo(typeof(DownSwitchFlow))]
    public class DownSwitchFlowExcel
    {
        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("片区")]
        public string Region { get; set; }

        [ExcelColumn("4G用户3G流量比分母")]
        public double Flow4G { get; set; }

        [ExcelColumn("4G用户3G流量比分子")]
        public double DownSwitchFlow3G { get; set; }
    }

    public class AgisDtPoint
    {
        public string Operator { get; set; }
        
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double UnicomRsrp { get; set; }

        public double MobileRsrp { get; set; }

        public double TelecomRsrp { get; set; }
    }
}
