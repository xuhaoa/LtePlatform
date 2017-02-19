using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Kpi;
using System;

namespace Lte.Evaluations.ViewModels
{
    [TypeDoc("告警信息视图")]
    [AutoMapFrom(typeof(AlarmStat))]
    public class AlarmView
    {
        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号，255表示该条告警记录为基站级告警")]
        public byte SectorId { get; set; }

        [MemberDoc("告警分类")]
        public AlarmCategory AlarmCategory { get; set; }

        [MemberDoc("告警定位")]
        public string Position => SectorId == 255 || AlarmCategory == AlarmCategory.Huawei ? "基站级" : "Cell-" + SectorId;

        [MemberDoc("发生时间")]
        public DateTime HappenTime { get; set; }

        [MemberDoc("恢复时间")]
        public DateTime RecoverTime { get; set; }

        [MemberDoc("发生时间字符串")]
        public string HappenTimeString => HappenTime.ToShortDateString();

        [MemberDoc("持续时间（分钟）")]
        public double Duration => (RecoverTime - HappenTime).TotalMinutes;

        [MemberDoc("告警等级")]
        [AutoMapPropertyResolve("AlarmLevel", typeof(AlarmStat), typeof(AlarmLevelDescriptionTransform))]
        public string AlarmLevelDescription { get; set; }

        [MemberDoc("告警类型")]
        [AutoMapPropertyResolve("AlarmCategory", typeof(AlarmStat), typeof(AlarmCategoryDescriptionTransform))]
        public string AlarmCategoryDescription { get; set; }

        [MemberDoc("告警分类")]
        [AutoMapPropertyResolve("AlarmType", typeof(AlarmStat), typeof(AlarmTypeDescriptionTransform))]
        public string AlarmTypeDescription { get; set; }

        [MemberDoc("详细描述")]
        public string Details { get; set; }
    }

    public class AlarmHistory
    {
        public string DateString { get; set; }

        public int Alarms { get; set; }
    }

    public class FlowHistory
    {
        public string DateString { get; set; }

        public int HuaweiItems { get; set; }

        public int HuaweiRrcs { get; set; }

        public int ZteItems { get; set; }

        public int ZteRrcs { get; set; }

        public int TownStats { get; set; }
    }
}
