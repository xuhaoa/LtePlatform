﻿using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToCsv;
using Lte.Domain.Regular.Attributes;
using System;

namespace Lte.Parameters.Entities.Kpi
{
    [TypeDoc("告警统计实体（在Sqlserver数据库中）")]
    [AutoMapFrom(typeof(AlarmStatCsv), typeof(AlarmStatHuawei))]
    public class AlarmStat : Entity
    {
        [MemberDoc("基站编号")]
        [AutoMapPropertyResolve("ENodebIdString", typeof(AlarmStatHuawei), typeof(StringToIntTransform))]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        [AutoMapPropertyResolve("ObjectId", typeof(AlarmStatCsv), typeof(SectorIdTransform))]
        public byte SectorId { get; set; }

        [MemberDoc("告警编号")]
        [AutoMapPropertyResolve("AlarmId", typeof(AlarmStatCsv), typeof(StringToIntTransform))]
        public int AlarmId { get; set; }

        [MemberDoc("发生时间")]
        public DateTime HappenTime { get; set; }

        [MemberDoc("恢复时间")]
        [AutoMapPropertyResolve("RecoverTime", typeof(AlarmStatCsv), typeof(DateTimeTransform))]
        [AutoMapPropertyResolve("RecoverTime", typeof(AlarmStatHuawei), typeof(StringToDateTimeTransform))]
        public DateTime RecoverTime { get; set; }

        [MemberDoc("告警等级")]
        [AutoMapPropertyResolve("AlarmLevelDescription", typeof(AlarmStatCsv), typeof(AlarmLevelTransform))]
        [AutoMapPropertyResolve("AlarmLevelDescription", typeof(AlarmStatHuawei), typeof(AlarmLevelTransform))]
        public AlarmLevel AlarmLevel { get; set; }

        [MemberDoc("告警分类")]
        [AutoMapPropertyResolve("AlarmCategoryDescription", typeof(AlarmStatCsv), typeof(AlarmCategoryTransform))]
        public AlarmCategory AlarmCategory { get; set; }

        [MemberDoc("告警类型")]
        [AutoMapPropertyResolve("AlarmCodeDescription", typeof(AlarmStatCsv), typeof(AlarmZteTypeTransform))]
        [AutoMapPropertyResolve("AlarmCodeDescription", typeof(AlarmStatHuawei), typeof(AlarmTypeTransform))]
        public AlarmType AlarmType { get; set; }

        [MemberDoc("详细信息")]
        public string Details { get; set; }
        
    }

    public class AlarmStatCsv
    {
        [CsvColumn(Name = "告警级别")]
        public string AlarmLevelDescription { get; set; }

        [CsvColumn(Name = "网元")]
        public string NetworkItem { get; set; }

        [CsvColumn(Name = "网元内定位")]
        public string Position { get; set; }

        [CsvColumn(Name = "告警码")]
        public string AlarmCodeDescription { get; set; }

        [CsvColumn(Name = "发生时间")]
        public DateTime HappenTime { get; set; }

        [CsvColumn(Name = "告警类型")]
        public string AlarmCategoryDescription { get; set; }

        [CsvColumn(Name = "告警原因")]
        public string Cause { get; set; }

        [CsvColumn(Name = "附加文本")]
        public string Details { get; set; }

        [CsvColumn(Name = "告警恢复时间")]
        public DateTime RecoverTime { get; set; }

        [CsvColumn(Name = "告警对象ID", CanBeNull = true)]
        public int ObjectId { get; set; }

        [CsvColumn(Name = "站点ID(局向)", CanBeNull = true)]
        public int ENodebId { get; set; }

        [CsvColumn(Name = "告警标识", CanBeNull = true)]
        public string AlarmId { get; set; }
    }

    public class AlarmStatHuawei
    {
        [CsvColumn(Name = "级别")]
        public string AlarmLevelDescription { get; set; }

        public AlarmCategory AlarmCategory => AlarmCategory.Huawei;

        [CsvColumn(Name = "告警源")]
        public string NetworkItem { get; set; }

        [CsvColumn(Name = "MO对象")]
        public string Position { get; set; }

        [CsvColumn(Name = "名称")]
        public string AlarmCodeDescription { get; set; }

        [CsvColumn(Name = "最近发生时间(NT)")]
        public DateTime HappenTime { get; set; }

        [CsvColumn(Name = "用户自定义标识")]
        public string Cause { get; set; }

        [CsvColumn(Name = "定位信息")]
        public string Details { get; set; }

        [CsvColumn(Name = "清除时间(NT)")]
        public string RecoverTime { get; set; }

        [CsvColumn(Name = "eNodeB ID", CanBeNull = true)]
        public string ENodebIdString { get; set; }

        [CsvColumn(Name = "告警ID", CanBeNull = true)]
        public int AlarmId { get; set; }
    }

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

    [TypeDoc("告警历史记录")]
    public class AlarmHistory
    {
        [MemberDoc("日期字符串")]
        public string DateString { get; set; }

        [MemberDoc("当日告警数")]
        public int Alarms { get; set; }
    }
}
