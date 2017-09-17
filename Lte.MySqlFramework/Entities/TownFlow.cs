using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    public class TownFlowStat : Entity, ITownId, IStatTime
    {
        [ArraySumProtection]
        public int TownId { get; set; }

        [ArraySumProtection]
        public DateTime StatTime { get; set; }

        [ArraySumProtection]
        public FrequencyBandType FrequencyBandType { get; set; } = FrequencyBandType.All;

        [AutoMapPropertyResolve("DownlinkPdcpFlow", typeof(FlowZte))]
        public double PdcpDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("UplindPdcpFlow", typeof(FlowZte))]
        public double PdcpUplinkFlow { get; set; }

        [AutoMapPropertyResolve("AverageRrcUsers", typeof(FlowZte))]
        [MemberDoc("平均用户数")]
        public double AverageUsers { get; set; }

        [AutoMapPropertyResolve("MaxRrcUsers", typeof(FlowZte))]
        [MemberDoc("最大用户数")]
        public int MaxUsers { get; set; }

        [MemberDoc("平均激活用户数")]
        public double AverageActiveUsers { get; set; }

        [MemberDoc("最大激活用户数")]
        public int MaxActiveUsers { get; set; }

        public double DownlinkFeelingThroughput { get; set; }

        public double DownlinkFeelingDuration { get; set; }
        
        public double UplinkFeelingThroughput { get; set; }

        public double UplinkFeelingDuration { get; set; }

        [AutoMapPropertyResolve("SchedulingTm3Rank2", typeof(FlowZte))]
        public double SchedulingRank2 { get; set; }

        [AutoMapPropertyResolve("SchedulingTm3", typeof(FlowZte))]
        public double SchedulingTimes { get; set; }
        
        public int RedirectCdma2000 { get; set; }
    }

    [AutoMapFrom(typeof(TownFlowStat))]
    public class TownFlowView : ICityDistrictTown, IStatTime
    {
        public string District { get; set; }

        public string Town { get; set; }

        public string City { get; set; }

        public DateTime StatTime { get; set; }

        public double PdcpDownlinkFlow { get; set; }

        public double PdcpUplinkFlow { get; set; }

        [AutoMapPropertyResolve("AverageRrcUsers", typeof(FlowZte))]
        [MemberDoc("平均用户数")]
        public double AverageUsers { get; set; }

        [AutoMapPropertyResolve("MaxRrcUsers", typeof(FlowZte))]
        [MemberDoc("最大用户数")]
        public int MaxUsers { get; set; }

        [MemberDoc("平均激活用户数")]
        public double AverageActiveUsers { get; set; }

        [MemberDoc("最大激活用户数")]
        public int MaxActiveUsers { get; set; }

        public double DownlinkFeelingThroughput { get; set; }

        public double DownlinkFeelingDuration { get; set; }

        public double DownlinkFeelingRate
            => DownlinkFeelingDuration == 0 ? 0 : DownlinkFeelingThroughput / DownlinkFeelingDuration;

        public double UplinkFeelingThroughput { get; set; }

        public double UplinkFeelingDuration { get; set; }

        public double UplinkFeelingRate
            => UplinkFeelingDuration == 0 ? 0 : UplinkFeelingThroughput / UplinkFeelingDuration;

        public double SchedulingRank2 { get; set; }

        public double SchedulingTimes { get; set; }

        public double Rank2Rate => SchedulingTimes == 0 ? 100 : SchedulingRank2 / SchedulingTimes * 100;

        public int RedirectCdma2000 { get; set; }

        public double DownSwitchRate
            => PdcpUplinkFlow + PdcpDownlinkFlow == 0 ? 100 : 1024 * RedirectCdma2000 / (PdcpUplinkFlow + PdcpDownlinkFlow);
    }

    [AutoMapFrom(typeof(TownFlowView))]
    public class DistrictFlowView : ICityDistrict, IStatTime
    {
        public string District { get; set; }

        public string City { get; set; }

        public DateTime StatTime { get; set; }

        public double PdcpDownlinkFlow { get; set; }

        public double PdcpUplinkFlow { get; set; }

        [MemberDoc("平均用户数")]
        public double AverageUsers { get; set; }

        [MemberDoc("最大用户数")]
        public int MaxUsers { get; set; }

        [MemberDoc("平均激活用户数")]
        public double AverageActiveUsers { get; set; }

        [MemberDoc("最大激活用户数")]
        public int MaxActiveUsers { get; set; }

        public double DownlinkFeelingThroughput { get; set; }

        public double DownlinkFeelingDuration { get; set; }

        public double DownlinkFeelingRate
            => DownlinkFeelingDuration == 0 ? 0 : DownlinkFeelingThroughput / DownlinkFeelingDuration;

        public double UplinkFeelingThroughput { get; set; }

        public double UplinkFeelingDuration { get; set; }

        public double UplinkFeelingRate
            => UplinkFeelingDuration == 0 ? 0 : UplinkFeelingThroughput / UplinkFeelingDuration;

        public double SchedulingRank2 { get; set; }

        public double SchedulingTimes { get; set; }

        public double Rank2Rate => SchedulingTimes == 0 ? 100 : SchedulingRank2 / SchedulingTimes * 100;

        public int RedirectCdma2000 { get; set; }

        public double DownSwitchRate
            => PdcpUplinkFlow + PdcpDownlinkFlow == 0 ? 100 : 1024 * RedirectCdma2000 / (PdcpUplinkFlow + PdcpDownlinkFlow);
    }

    [AutoMapFrom(typeof(RrcHuawei), typeof(RrcZte))]
    public class TownRrcStat : Entity, ITownId, IStatTime
    {
        public int TownId { get; set; }

        public DateTime StatTime { get; set; }

        public int MtAccessRrcRequest { get; set; }

        public int MtAccessRrcSuccess { get; set; }

        public int MtAccessRrcFail { get; set; }

        public int MoSignallingRrcRequest { get; set; }

        public int MoSignallingRrcSuccess { get; set; }

        public int MoSignallingRrcFail { get; set; }

        public int MoDataRrcRequest { get; set; }

        public int MoDataRrcSuccess { get; set; }

        public int MoDataRrcFail { get; set; }

        public int HighPriorityRrcRequest { get; set; }

        public int HighPriorityRrcSuccess { get; set; }

        public int HighPriorityRrcFail { get; set; }

        public int EmergencyRrcRequest { get; set; }

        public int EmergencyRrcSuccess { get; set; }

        public int EmergencyRrcFail { get; set; }

        public int TotalRrcRequest { get; set; }

        public int TotalRrcSuccess { get; set; }

        public int TotalRrcFail { get; set; }
    }

    [AutoMapFrom(typeof(TownRrcStat))]
    public class TownRrcView : ICityDistrictTown, IStatTime
    {
        public string District { get; set; }

        public string Town { get; set; }

        public string City { get; set; }

        public DateTime StatTime { get; set; }

        public int MtAccessRrcRequest { get; set; }

        public int MtAccessRrcSuccess { get; set; }

        public double MtAccessRrcRate => MtAccessRrcRequest == 0 ? 0 : 100 * (double)MtAccessRrcSuccess / MtAccessRrcRequest;

        public int MtAccessRrcFail { get; set; }

        public int MoSignallingRrcRequest { get; set; }

        public int MoSignallingRrcSuccess { get; set; }

        public double MoSiganllingRrcRate
            => MoSignallingRrcRequest == 0 ? 0 : 100 * (double)MoSignallingRrcSuccess / MoSignallingRrcRequest;

        public int MoSignallingRrcFail { get; set; }

        public int MoDataRrcRequest { get; set; }

        public int MoDataRrcSuccess { get; set; }

        public double MoDataRrcRate => MoDataRrcRequest == 0 ? 0 : 100 * (double)MoDataRrcSuccess / MoDataRrcRequest;

        public int MoDataRrcFail { get; set; }

        public int HighPriorityRrcRequest { get; set; }

        public int HighPriorityRrcSuccess { get; set; }

        public double HighPriorityRrcRate
            => HighPriorityRrcRequest == 0 ? 0 : 100 * (double)HighPriorityRrcSuccess / HighPriorityRrcRequest;

        public int HighPriorityRrcFail { get; set; }

        public int EmergencyRrcRequest { get; set; }

        public int EmergencyRrcSuccess { get; set; }

        public double EmergencyRrcRate
            => EmergencyRrcRequest == 0 ? 0 : 100 * (double)EmergencyRrcSuccess / EmergencyRrcRequest;

        public int EmergencyRrcFail { get; set; }

        public int TotalRrcRequest { get; set; }

        public int TotalRrcSuccess { get; set; }

        public double RrcSuccessRate => TotalRrcRequest == 0 ? 0 : 100 * (double)TotalRrcSuccess / TotalRrcRequest;

        public int TotalRrcFail { get; set; }
    }

    [AutoMapFrom(typeof(TownRrcView))]
    public class DistrictRrcView : ICityDistrict, IStatTime
    {
        public string City { get; set; }

        public string District { get; set; }

        public DateTime StatTime { get; set; }

        public int MtAccessRrcRequest { get; set; }

        public int MtAccessRrcSuccess { get; set; }

        public double MtAccessRrcRate => MtAccessRrcRequest == 0 ? 0 : 100 * (double)MtAccessRrcSuccess / MtAccessRrcRequest;

        public int MtAccessRrcFail { get; set; }

        public int MoSignallingRrcRequest { get; set; }

        public int MoSignallingRrcSuccess { get; set; }

        public double MoSiganllingRrcRate
            => MoSignallingRrcRequest == 0 ? 0 : 100 * (double)MoSignallingRrcSuccess / MoSignallingRrcRequest;

        public int MoSignallingRrcFail { get; set; }

        public int MoDataRrcRequest { get; set; }

        public int MoDataRrcSuccess { get; set; }

        public double MoDataRrcRate => MoDataRrcRequest == 0 ? 0 : 100 * (double)MoDataRrcSuccess / MoDataRrcRequest;

        public int MoDataRrcFail { get; set; }

        public int HighPriorityRrcRequest { get; set; }

        public int HighPriorityRrcSuccess { get; set; }

        public double HighPriorityRrcRate
            => HighPriorityRrcRequest == 0 ? 0 : 100 * (double)HighPriorityRrcSuccess / HighPriorityRrcRequest;

        public int HighPriorityRrcFail { get; set; }

        public int EmergencyRrcRequest { get; set; }

        public int EmergencyRrcSuccess { get; set; }

        public double EmergencyRrcRate
            => EmergencyRrcRequest == 0 ? 0 : 100 * (double)EmergencyRrcSuccess / EmergencyRrcRequest;

        public int EmergencyRrcFail { get; set; }

        public int TotalRrcRequest { get; set; }

        public int TotalRrcSuccess { get; set; }

        public double RrcSuccessRate => TotalRrcRequest == 0 ? 0 : 100 * (double)TotalRrcSuccess / TotalRrcRequest;

        public int TotalRrcFail { get; set; }

        public static DistrictRrcView ConstructView(TownRrcView townView)
        {
            return townView.MapTo<DistrictRrcView>();
        }
    }

    [AutoMapFrom(typeof(QciHuawei), typeof(QciZte))]
    public class TownQciStat : Entity, ITownId, IStatTime
    {
        public int TownId { get; set; }

        public DateTime StatTime { get; set; }

        public long Cqi0Times { get; set; }

        public long Cqi1Times { get; set; }

        public long Cqi2Times { get; set; }

        public long Cqi3Times { get; set; }

        public long Cqi4Times { get; set; }

        public long Cqi5Times { get; set; }

        public long Cqi6Times { get; set; }

        public long Cqi7Times { get; set; }

        public long Cqi8Times { get; set; }

        public long Cqi9Times { get; set; }

        public long Cqi10Times { get; set; }

        public long Cqi11Times { get; set; }

        public long Cqi12Times { get; set; }

        public long Cqi13Times { get; set; }

        public long Cqi14Times { get; set; }

        public long Cqi15Times { get; set; }
    }

    [AutoMapFrom(typeof(TownQciStat))]
    [IncreaseNumberKpi(KpiPrefix = "Cqi", KpiAffix = "Times", IndexRange = 16)]
    public class TownQciView : ICityDistrictTown, IStatTime
    {
        public string District { get; set; }

        public string Town { get; set; }

        public string City { get; set; }

        public DateTime StatTime { get; set; }

        public long Cqi0Times { get; set; }

        public long Cqi1Times { get; set; }

        public long Cqi2Times { get; set; }

        public long Cqi3Times { get; set; }

        public long Cqi4Times { get; set; }

        public long Cqi5Times { get; set; }

        public long Cqi6Times { get; set; }

        public long Cqi7Times { get; set; }

        public long Cqi8Times { get; set; }

        public long Cqi9Times { get; set; }

        public long Cqi10Times { get; set; }

        public long Cqi11Times { get; set; }

        public long Cqi12Times { get; set; }

        public long Cqi13Times { get; set; }

        public long Cqi14Times { get; set; }

        public long Cqi15Times { get; set; }

        public Tuple<long, long> CqiCounts => this.GetDivsionLongTuple(7);

        public double CqiRate => (double)CqiCounts.Item2 * 100 / CqiCounts.Item1;
    }

    [AutoMapFrom(typeof(TownQciView))]
    [IncreaseNumberKpi(KpiPrefix = "Cqi", KpiAffix = "Times", IndexRange = 16)]
    public class DistrictQciView : ICityDistrict, IStatTime
    {
        public string City { get; set; }

        public string District { get; set; }

        public DateTime StatTime { get; set; }

        public long Cqi0Times { get; set; }

        public long Cqi1Times { get; set; }

        public long Cqi2Times { get; set; }

        public long Cqi3Times { get; set; }

        public long Cqi4Times { get; set; }

        public long Cqi5Times { get; set; }

        public long Cqi6Times { get; set; }

        public long Cqi7Times { get; set; }

        public long Cqi8Times { get; set; }

        public long Cqi9Times { get; set; }

        public long Cqi10Times { get; set; }

        public long Cqi11Times { get; set; }

        public long Cqi12Times { get; set; }

        public long Cqi13Times { get; set; }

        public long Cqi14Times { get; set; }

        public long Cqi15Times { get; set; }

        public Tuple<long, long> CqiCounts => this.GetDivsionLongTuple(7);

        public double CqiRate => (double) CqiCounts.Item2 * 100 / CqiCounts.Item1;
    }
}