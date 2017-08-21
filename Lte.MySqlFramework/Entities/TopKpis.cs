using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;
using System.Collections.Generic;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(TopDrop2GCellExcel))]
    public class TopDrop2GCell : Entity, IBtsIdQuery
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; }

        public int BtsId { get; set; }

        [AutoMapPropertyResolve("CellName", typeof(TopDrop2GCellExcel), typeof(FirstBracketCellIdTransform))]
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public short Frequency { get; set; }

        public int Drops { get; set; }

        public int MoAssignmentSuccess { get; set; }

        public int MtAssignmentSuccess { get; set; }

        public int TrafficAssignmentSuccess { get; set; }

        public int CallAttempts { get; set; }
    }

    [AutoMapFrom(typeof(TopCellContainer<TopDrop2GCell>))]
    public class TopDrop2GCellViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopDrop2GCell>))]
        public TopDrop2GCellView TopDrop2GCellView { get; set; }

        public string LteName { get; set; }

        public string CdmaName { get; set; }
    }

    [TypeDoc("TOP掉话小区视图")]
    [AutoMapFrom(typeof(TopDrop2GCell))]
    public class TopDrop2GCellView
    {
        [MemberDoc("统计日期")]
        public DateTime StatTime { get; set; }

        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("CDMA基站名称")]
        public string CdmaName { get; set; }

        [MemberDoc("LTE基站名称")]
        public string LteName { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("频点")]
        public short Frequency { get; set; }

        [MemberDoc("掉话次数")]
        public int Drops { get; set; }

        [MemberDoc("主叫分配成功数")]
        public int MoAssignmentSuccess { get; set; }

        [MemberDoc("被叫分配成功数")]
        public int MtAssignmentSuccess { get; set; }

        [MemberDoc("业务信道分配成功数")]
        public int TrafficAssignmentSuccess { get; set; }

        [MemberDoc("呼叫尝试次数")]
        public int CallAttempts { get; set; }

        [MemberDoc("掉话率")]
        public double DropRate => TrafficAssignmentSuccess == 0 ? 0 : (double)Drops / TrafficAssignmentSuccess;
    }

    [TypeDoc("单日TOP掉话小区视图")]
    public class TopDrop2GDateView
    {
        [MemberDoc("统计日期")]
        public DateTime StatDate { get; set; }

        [MemberDoc("TOP掉话小区视图列表")]
        public IEnumerable<TopDrop2GCellView> StatViews { get; set; }
    }

    public class TopDrop2GTrend : IBtsIdQuery
    {
        public int BtsId { get; set; }

        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int TotalDrops { get; set; }

        public int TotalCallAttempst { get; set; }

        public int TopDates { get; set; }

        public int MoAssignmentSuccess { get; set; }

        public int MtAssignmentSuccess { get; set; }

    }

    [AutoMapFrom(typeof(TopCellContainer<TopDrop2GTrend>))]
    public class TopDrop2GTrendViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopDrop2GTrend>))]
        public TopDrop2GTrendView TopDrop2GTrendView { get; set; }

        [AutoMapPropertyResolve("LteName", typeof(TopCellContainer<TopDrop2GTrend>))]
        public string ENodebName { get; set; }

        public string CdmaName { get; set; }

        public string CellName => CdmaName + "-" + TopDrop2GTrendView.SectorId;
    }

    [TypeDoc("TOP掉话小区指标趋势视图")]
    [AutoMapFrom(typeof(TopDrop2GTrend))]
    public class TopDrop2GTrendView
    {
        [MemberDoc("小区名称")]
        public string CellName { get; set; }

        [MemberDoc("LTE基站名称")]
        public string ENodebName { get; set; }

        public int BtsId { get; set; }

        public byte SectorId { get; set; }

        public int CellId { get; set; }

        public int MoAssignmentSuccess { get; set; }

        public int MtAssignmentSuccess { get; set; }

        [MemberDoc("掉话总数")]
        public int TotalDrops { get; set; }

        [MemberDoc("呼叫尝试总数")]
        public int TotalCallAttempst { get; set; }

        [MemberDoc("掉话率")]
        public double DropRate => TotalCallAttempst == 0 ? 0 : (double)TotalDrops / TotalCallAttempst;

        [MemberDoc("进入TOP的日期数")]
        public int TopDates { get; set; }
    }

    [AutoMapFrom(typeof(TopConnection2GExcel))]
    public class TopConnection2GCell : Entity
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; }

        public int BtsId { get; set; }

        [AutoMapPropertyResolve("CellName", typeof(TopConnection2GExcel), typeof(FirstBracketCellIdTransform))]
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public short Frequency { get; set; }

        public int Drops { get; set; }

        public int MoAssignmentSuccess { get; set; }

        public int MtAssignmentSuccess { get; set; }

        public int TrafficAssignmentSuccess { get; set; }

        public int CallAttempts { get; set; }

        public int TrafficAssignmentFail { get; set; }
    }

    [AutoMapFrom(typeof(TopConnection3GCellExcel))]
    public class TopConnection3GCell : Entity, IBtsIdQuery
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; }

        public int BtsId { get; set; }

        [AutoMapPropertyResolve("CellName", typeof(TopConnection3GCellExcel), typeof(FirstBracketCellIdTransform))]
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int WirelessDrop { get; set; }

        public int ConnectionAttempts { get; set; }

        public int ConnectionFails { get; set; }

        public double LinkBusyRate { get; set; }
    }

    [AutoMapFrom(typeof(TopCellContainer<TopConnection3GCell>))]
    public class TopConnection3GCellViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopConnection3GCell>))]
        public TopConnection3GCellView TopConnection3GCellView { get; set; }

        public string LteName { get; set; }

        public string CdmaName { get; set; }
    }

    [AutoMapFrom(typeof(TopConnection3GCell))]
    public class TopConnection3GCellView
    {
        [MemberDoc("统计日期")]
        public DateTime StatTime { get; set; }

        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("CDMA基站名称")]
        public string CdmaName { get; set; }

        [MemberDoc("LTE基站名称")]
        public string LteName { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("无线掉线次数")]
        public int WirelessDrop { get; set; }

        [MemberDoc("连接尝试次数")]
        public int ConnectionAttempts { get; set; }

        [MemberDoc("连接失败次数")]
        public int ConnectionFails { get; set; }

        [MemberDoc("链路繁忙率")]
        public double LinkBusyRate { get; set; }

        [MemberDoc("连接成功率")]
        public double ConnectionRate => (double)(ConnectionAttempts - ConnectionFails) / ConnectionAttempts;

        [MemberDoc("掉线率")]
        public double DropRate => (double)WirelessDrop / (ConnectionAttempts - ConnectionFails);

    }

    [TypeDoc("单日TOP连接成功率小区视图")]
    public class TopConnection3GDateView
    {
        [MemberDoc("统计日期")]
        public DateTime StatDate { get; set; }

        [MemberDoc("TOP连接成功率小区视图列表")]
        public IEnumerable<TopConnection3GCellView> StatViews { get; set; }
    }

    public class TopConnection3GTrend : IBtsIdQuery
    {
        public int BtsId { get; set; }

        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int TopDates { get; set; }

        public int WirelessDrop { get; set; }

        public int ConnectionAttempts { get; set; }

        public int ConnectionFails { get; set; }

        public double LinkBusyRate { get; set; }
    }

    [AutoMapFrom(typeof(TopCellContainer<TopConnection3GTrend>))]
    public class TopConnection3GTrendViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopConnection3GTrend>))]
        public TopConnection3GTrendView TopConnection3GTrendView { get; set; }

        [AutoMapPropertyResolve("LteName", typeof(TopCellContainer<TopConnection3GTrend>))]
        public string ENodebName { get; set; }

        public string CdmaName { get; set; }

        public string CellName => CdmaName + "-" + TopConnection3GTrendView.SectorId;
    }

    [AutoMapFrom(typeof(TopConnection3GTrend))]
    public class TopConnection3GTrendView
    {
        [MemberDoc("小区名称")]
        public string CellName { get; set; }

        [MemberDoc("LTE基站名称")]
        public string ENodebName { get; set; }

        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("CDMA基站名称")]
        public string CdmaName { get; set; }

        [MemberDoc("LTE基站名称")]
        public string LteName { get; set; }

        public int BtsId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("无线掉线次数")]
        public int WirelessDrop { get; set; }

        [MemberDoc("连接尝试次数")]
        public int ConnectionAttempts { get; set; }

        [MemberDoc("连接失败次数")]
        public int ConnectionFails { get; set; }

        [MemberDoc("链路繁忙率")]
        public double LinkBusyRate { get; set; }

        [MemberDoc("连接成功率")]
        public double ConnectionRate => (double)(ConnectionAttempts - ConnectionFails) / ConnectionAttempts;

        [MemberDoc("掉线率")]
        public double DropRate => (double)WirelessDrop / (ConnectionAttempts - ConnectionFails);

        [MemberDoc("进入TOP的日期数")]
        public int TopDates { get; set; }
    }
}
