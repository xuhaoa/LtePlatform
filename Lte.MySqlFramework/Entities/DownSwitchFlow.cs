using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;

namespace Lte.MySqlFramework.Entities
{
    public class DownSwitchFlow : Entity, IStatDate
    {
        public DateTime StatDate { get; set; }

        public string City { get; set; }

        public string Region { get; set; }

        public double Flow4G { get; set; }

        public double DownSwitchFlow3G { get; set; }
    }

    [AutoMapFrom(typeof(DownSwitchFlow))]
    public class DownSwitchFlowView
    {
        public string Region { get; set; }

        public double Flow4G { get; set; }

        public double DownSwitchFlow3G { get; set; }

        public double DownSwitchRate => 100 * DownSwitchFlow3G / Flow4G;
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

    [TypeDoc("AGPS数据点数据结构")]
    public class AgisDtPoint : Entity, IStatDate
    {
        [MemberDoc("统计主题")]
        public string Operator { get; set; }

        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("联通RSRP")]
        public double UnicomRsrp { get; set; }

        [MemberDoc("移动RSRP")]
        public double MobileRsrp { get; set; }

        [MemberDoc("电信RSRP")]
        public double TelecomRsrp { get; set; }

        [MemberDoc("统计日期")]
        public DateTime StatDate { get; set; }

        [MemberDoc("主导运营商")]
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

        public string CompeteDescription { get; set; }

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
                            Description = description.Trim(),
                            Coordinates = coordinates.InnerText.Replace(",50 ", ";"),
                            CompeteDescription = "自身覆盖"
                        });
                    }
                }
            }
            return results;
        }

        public static List<MrGridXml> ReadGridXmlsWithCompete(XmlDocument xml, string district, string competeDescription)
        {
            var results = new List<MrGridXml>();
            var childs = xml.ChildNodes[1].ChildNodes[0].ChildNodes;
            for (var i = 0; i < childs.Count; i++)
            {
                var node = childs[i];
                if (node.Name != "Folder") continue;
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
                            Frequency = -1,
                            District = district,
                            Description = description.Trim(),
                            Coordinates = coordinates.InnerText.Replace(",50 ", ";"),
                            CompeteDescription = competeDescription
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

        [AutoMapPropertyResolve("Description", typeof(MrGridXml), typeof(AlarmLevelTransform))]
        public AlarmLevel RsrpLevel { get; set; }

        public string Coordinates { get; set; }
        
        [AutoMapPropertyResolve("CompeteDescription", typeof(MrGridXml), typeof(AlarmCategoryTransform))]
        public AlarmCategory Compete { get; set; }
    }

    [AutoMapFrom(typeof(MrGrid))]
    public class MrCoverageGridView : IStatDate
    {
        public DateTime StatDate { get; set; }

        public string District { get; set; }

        public int Frequency { get; set; }

        [AutoMapPropertyResolve("RsrpLevel", typeof(MrGrid), typeof(AlarmLevelDescriptionTransform))]
        public string RsrpLevelDescription { get; set; }

        public string Coordinates { get; set; }
    }

    [AutoMapFrom(typeof(MrGrid))]
    public class MrCompeteGridView : IStatDate
    {
        public DateTime StatDate { get; set; }

        public string District { get; set; }

        [AutoMapPropertyResolve("RsrpLevel", typeof(MrGrid), typeof(AlarmLevelDescriptionTransform))]
        public string RsrpLevelDescription { get; set; }

        public string Coordinates { get; set; }

        [AutoMapPropertyResolve("Compete", typeof(MrGrid), typeof(AlarmCategoryDescriptionTransform))]
        public string CompeteDescription { get; set; }
    }


    [TypeDoc("存储于数据库的工单信息")]
    [AutoMapFrom(typeof(WorkItemExcel))]
    public class WorkItem : Entity
    {
        [MemberDoc("工单编号")]
        public string SerialNumber { get; set; }
        
        [MemberDoc("工单类型")]
        [AutoMapPropertyResolve("TypeDescription", typeof(WorkItemExcel), typeof(WorkItemTypeTransform))]
        public WorkItemType Type { get; set; }

        [MemberDoc("工单子类型")]
        [AutoMapPropertyResolve("SubTypeDescription", typeof(WorkItemExcel), typeof(WorkItemSubtypeTransform))]
        public WorkItemSubtype Subtype { get; set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("派单时间")]
        public DateTime BeginTime { get; set; }

        [MemberDoc("回单期限")]
        public DateTime Deadline { get; set; }

        [MemberDoc("重复次数")]
        public short RepeatTimes { get; set; }

        [MemberDoc("驳回次数")]
        public short RejectTimes { get; set; }

        [MemberDoc("责任人")]
        public string StaffName { get; set; }

        [MemberDoc("最近反馈时间")]
        public DateTime? FeedbackTime { get; set; }

        [MemberDoc("完成时间")]
        public DateTime? FinishTime { get; set; }

        [MemberDoc("定位原因")]
        [AutoMapPropertyResolve("CauseDescription", typeof(WorkItemExcel), typeof(WorkItemCauseTransform))]
        public WorkItemCause Cause { get; set; }

        [MemberDoc("工单状态")]
        [AutoMapPropertyResolve("StateDescription", typeof(WorkItemExcel), typeof(WorkItemStateTransform))]
        public WorkItemState State { get; set; }

        [MemberDoc("省中心平台反馈信息")]
        public string Comments { get; set; }

        [MemberDoc("本平台反馈信息")]
        public string FeedbackContents { get; set; }
    }

    public class WorkItemFeedbackView
    {
        [MemberDoc("工单编号")]
        public string SerialNumber { get; set; }

        public string Message { get; set; }
    }

    public class WorkItemChartTypeView
    {
        public string Type { get; set; }

        public string SubType { get; set; }

        public int Total { get; set; }
    }

}
