using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;
using System;
using System.Collections.Generic;
using System.Xml;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Regular;

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

    public class AgisDtPoint : Entity, IStatDate
    {
        public string Operator { get; set; }
        
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double UnicomRsrp { get; set; }

        public double MobileRsrp { get; set; }

        public double TelecomRsrp { get; set; }

        public DateTime StatDate { get; set; }

        public string Domination
            =>
                (TelecomRsrp >= MobileRsrp)
                    ? (TelecomRsrp >= UnicomRsrp ? "电信主导" : "联通主导")
                    : (MobileRsrp >= UnicomRsrp ? "移动主导" : "联通主导");
    }

    public class MrGridXml : IStatDate
    {
        public DateTime StatDate { get; set; }

        public string District { get; set; }

        public int Frequency { get; set; }

        public string Description { get; set; }

        public string Coordinates { get; set; }

        public static List<MrGridXml> ReadGridXmls(XmlDocument xml, string district)
        {
            var results = new List<MrGridXml>();
            var childs = xml.ChildNodes[1].ChildNodes[0].ChildNodes;
            for (var i = 0; i < childs.Count; i++)
            {
                var node = childs[i];
                if (node.Name != "Folder") continue;
                var frequency = node.ChildNodes[0].InnerText.ConvertToInt(100);
                for (var j = 1; j < node.ChildNodes.Count; j++)
                {
                    var subNode = node.ChildNodes[j];
                    var description = subNode.ChildNodes[0].InnerText;
                    for (var k = 1; k < subNode.ChildNodes.Count; k++)
                    {
                        var placement = subNode.ChildNodes[k];
                        var polygon = placement.ChildNodes[2];
                        var bound = polygon.ChildNodes[2];
                        var coordinates = bound.FirstChild.FirstChild;
                        results.Add(new MrGridXml
                        {
                            StatDate = DateTime.Today.AddDays(-1),
                            Frequency = frequency,
                            District = district,
                            Description = description,
                            Coordinates = coordinates.InnerText.Replace(",50 ", ";")
                        });
                    }
                }
            }
            return results;
        } 
    }

    [AutoMapFrom(typeof(MrGridXml))]
    public class MrGrid : Entity, IStatDate
    {
        public DateTime StatDate { get; set; }

        public string District { get; set; }

        public int Frequency { get; set; }

        public string Description { get; set; }

        public string Coordinates { get; set; }

    }
}
