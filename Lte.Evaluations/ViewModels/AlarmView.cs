using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.ViewModels
{
    [TypeDoc("告警信息视图")]
    [AutoMapFrom(typeof(AlarmStat))]
    public class AlarmView
    {
        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public AlarmCategory AlarmCategory { get; set; }

        [MemberDoc("告警定位")]
        public string Position => SectorId == 255 || AlarmCategory == AlarmCategory.Huawei ? "基站级" : "Cell-" + SectorId;

        [MemberDoc("发生时间")]
        public DateTime HappenTime { get; set; }

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

        public int ZteItems { get; set; }
    }
}
