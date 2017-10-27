using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using System;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(FlowZteCsv))]
    public class FlowZte : Entity, ILteCellQuery, IStatTime
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int MaxRrcUsers { get; set; }

        public double UplinkAverageActiveUsers { get; set; }

        public double DownlinkAverageActiveUsers { get; set; }

        public double AverageRrcUsers { get; set; }

        public double AverageActiveUsers { get; set; }

        public int MaxActiveUsers { get; set; }

        public int PdcpUplinkDuration { get; set; }

        public int PdcpDownlinkDuration { get; set; }

        [AutoMapPropertyResolve("UplindPdcpFlowInMByte", typeof(FlowZteCsv), typeof(ByteTransform))]
        public double UplindPdcpFlow { get; set; }

        [AutoMapPropertyResolve("DownlinkPdcpFlowInMByte", typeof(FlowZteCsv), typeof(ByteTransform))]
        public double DownlinkPdcpFlow { get; set; }

        public double Qci8UplinkIpThroughput { get; set; }

        public double Qci8UplinkIpDuration { get; set; }

        public double Qci9UplinkIpThroughput { get; set; }

        public double Qci9UplinkIpDuration { get; set; }

        public double Qci8DownlinkIpThroughput { get; set; }

        public double Qci8DownlinkIpDuration { get; set; }

        public double Qci9DownlinkIpThroughput { get; set; }

        public double Qci9DownlinkIpDuration { get; set; }

        public int SchedulingTm3 { get; set; }

        public int SchedulingTm3Rank2 { get; set; }

        public int RedirectA2 { get; set; }
        
        public int RedirectB2 { get; set; }

        public int RedirectCdma2000 => RedirectA2 + RedirectB2;

        public double DownlinkFeelingThroughput => Qci8DownlinkIpThroughput + Qci9DownlinkIpThroughput;

        public double DownlinkFeelingDuration => Qci8DownlinkIpDuration + Qci9DownlinkIpDuration;

        public double UplinkFeelingThroughput => Qci8UplinkIpThroughput + Qci9UplinkIpThroughput;

        public double UplinkFeelingDuration => Qci8UplinkIpDuration + Qci9UplinkIpDuration;
    }

    [AutoMapFrom(typeof(FlowZteCsv))]
    public class RrcZte : Entity, ILteCellQuery, IStatTime
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int MtAccessRrcSuccess { get; set; }

        public int MtAccessRrcFailTimer { get; set; }

        public int MtAccessRrcFailAllow { get; set; }

        public int MtAccessRrcFailOther { get; set; }

        public int MoSignallingRrcSuccess { get; set; }

        public int MoSignallingRrcFailTimer { get; set; }

        public int MoSignallingRrcFailAllow { get; set; }

        public int MoSignallingRrcFailOther { get; set; }

        public int MoDataRrcSuccess { get; set; }

        public int MoDataRrcFailTimer { get; set; }

        public int MoDataRrcFailAllow { get; set; }

        public int MoDataRrcFailOther { get; set; }

        public int RrcReleaseUserInactive { get; set; }

        public int RrcReleaseMmeContext { get; set; }

        public int RrcReleaseResourceLack { get; set; }

        public int RrcReleaseCellReset { get; set; }

        public int RrcReleaseOther { get; set; }
        
        public int HighPriorityAccessRrcSuccess { get; set; }

        public int HighPriorityRrcSuccess => HighPriorityAccessRrcSuccess;


        public int HighPriorityAccessRrcFailTimer { get; set; }
        
        public int HighPriorityAccessRrcFailAllow { get; set; }
        
        public int HighPriorityAccessRrcFailOther { get; set; }
        
        public int EmergencyRrcSuccess { get; set; }
        
        public int EmergencyRrcFailTimer { get; set; }
        
        public int EmergencyRrcFailAllow { get; set; }
        
        public int EmergencyRrcFailOther { get; set; }

        [AutoMapPropertyResolve("RrcTotalDurationInMs", typeof(FlowZteCsv), typeof(ThousandTransform))]
        public int RrcTotalDuration { get; set; }

        [AutoMapPropertyResolve("RrcMaxDurationInMs", typeof(FlowZteCsv), typeof(ThousandTransform))]
        public int RrcMaxDuration { get; set; }
        
        public int RrcReleaseTimer { get; set; }
        
        public int RrcReleaseUeContextTimer { get; set; }
        
        public int RrcReleaseBadRsrp { get; set; }
        
        public int RrcReleaseRlcMaxRetransmit { get; set; }
        
        public int RrcReleasePdcpIntegrationFail { get; set; }

        public int RrcReleaseGptu { get; set; }

        public int RrcReleasePathMalfunction { get; set; }

        public int RrcReleaseFiber { get; set; }

        public int RrcReleaseUeExit { get; set; }

        public int RrcReleaseInterSiteReconstruction { get; set; }

        public int RrcReleaseRedirect { get; set; }

        public int RrcReleaseRadioLink { get; set; }

        public int RrcReleaseReconstructionFail { get; set; }

        public int RrcReleaseS1 { get; set; }

        public int RrcReleaseMmeOther { get; set; }

        public int RrcReleaseSwitchFail { get; set; }

        public int MtAccessRrcRequest { get; set; }

        public int MoSignallingRrcRequest { get; set; }

        public int MoDataRrcRequest { get; set; }

        public int HighPriorityAccessRrcRequest { get; set; }

        public int HighPriorityRrcRequest => HighPriorityAccessRrcRequest;

        public int EmergencyRrcRequest { get; set; }

        public int TotalRrcRequest
            =>
                MtAccessRrcRequest + MoSignallingRrcRequest + MoDataRrcRequest + HighPriorityAccessRrcRequest +
                EmergencyRrcRequest;

        public int TotalRrcSuccess
            =>
                MtAccessRrcSuccess + MoSignallingRrcSuccess + MoDataRrcSuccess + HighPriorityAccessRrcSuccess +
                EmergencyRrcSuccess;

        public int RrcFailTimer
            =>
                MtAccessRrcFailTimer + MoSignallingRrcFailTimer + MoDataRrcFailTimer + HighPriorityAccessRrcFailTimer +
                EmergencyRrcFailTimer;

        public int RrcFailAllow
            =>
                MtAccessRrcFailAllow + MoSignallingRrcFailAllow + MoDataRrcFailAllow + HighPriorityAccessRrcFailAllow +
                EmergencyRrcFailAllow;

        public int RrcFailOther
            =>
                MtAccessRrcFailOther + MoSignallingRrcFailOther + MoDataRrcFailOther + HighPriorityAccessRrcFailOther +
                EmergencyRrcFailOther;

        public int MtAccessRrcFail => MtAccessRrcFailAllow + MtAccessRrcFailOther + MtAccessRrcFailTimer;

        public int MoSignallingRrcFail => MoSignallingRrcFailAllow + MoSignallingRrcFailOther + MoSignallingRrcFailTimer;

        public int MoDataRrcFail => MoDataRrcFailAllow + MoDataRrcFailOther + MoDataRrcFailTimer;

        public int HighPriorityRrcFail
            => HighPriorityAccessRrcFailAllow + HighPriorityAccessRrcFailOther + HighPriorityAccessRrcFailTimer;

        public int EmergencyRrcFail => EmergencyRrcFailAllow + EmergencyRrcFailOther + EmergencyRrcFailTimer;

        public int TotalRrcFail => RrcFailTimer + RrcFailAllow + RrcFailOther;

    }

    [AutoMapFrom(typeof(FlowZteCsv))]
    public class QciZte : Entity, ILteCellQuery, IStatTime
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int Cqi0Times { get; set; }
        
        public int Cqi1Times { get; set; }
        
        public int Cqi2Times { get; set; }
        
        public int Cqi3Times { get; set; }
        
        public int Cqi4Times { get; set; }
        
        public int Cqi5Times { get; set; }
        
        public int Cqi6Times { get; set; }
        
        public int Cqi7Times { get; set; }
        
        public int Cqi8Times { get; set; }
        
        public int Cqi9Times { get; set; }
        
        public int Cqi10Times { get; set; }
        
        public int Cqi11Times { get; set; }
        
        public int Cqi12Times { get; set; }
        
        public int Cqi13Times { get; set; }
        
        public int Cqi14Times { get; set; }
        
        public int Cqi15Times { get; set; }
    }

    [AutoMapFrom(typeof(FlowZteCsv))]
    public class PrbZte : Entity, ILteCellQuery, IStatTime
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public DateTime StatTime { get; set; }

        public double PuschPrbs { get; set; }

        public int UplinkPrbSubframe { get; set; }

        public double PdschPrbs { get; set; }
        
        public int DownlinkPrbSubframe { get; set; }

        public double UplinkDtchPrbs { get; set; }

        public double DownlinkDtchPrbs { get; set; }

        public double PuschUsageInterval0Seconds { get; set; }

        public double PuschUsageInterval20Seconds { get; set; }

        public double PuschUsageInterval40Seconds { get; set; }

        public double PuschUsageInterval60Seconds { get; set; }

        public double PuschUsageInterval80Seconds { get; set; }
        
        public double PdschUsageInterval0Seconds { get; set; }
        
        public double PdschUsageInterval20Seconds { get; set; }

        public double PdschUsageInterval40Seconds { get; set; }

        public double PdschUsageInterval60Seconds { get; set; }

        public double PdschUsageInterval80Seconds { get; set; }
    }

    [AutoMapFrom(typeof(FlowHuaweiCsv))]
    public class FlowHuawei : Entity, ILocalCellQuery
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte LocalCellId { get; set; }

        [AutoMapPropertyResolve("PdcpDownlinkFlowInByte", typeof(FlowHuaweiCsv), typeof(MegaTransform))]
        public double PdcpDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("PdcpUplinkFlowInByte", typeof(FlowHuaweiCsv), typeof(MegaTransform))]
        public double PdcpUplinkFlow { get; set; }

        public double AverageUsers { get; set; }

        public int MaxUsers { get; set; }

        public double AverageActiveUsers { get; set; }

        public int MaxActiveUsers { get; set; }

        public double UplinkAverageUsers { get; set; }

        public int UplinkMaxUsers { get; set; }

        public double DownlinkAverageUsers { get; set; }

        public int DownlinkMaxUsers { get; set; }

        [AutoMapPropertyResolve("DownlinkDurationInMs", typeof(FlowHuaweiCsv), typeof(ThousandTransform))]
        public double DownlinkDuration { get; set; }

        [AutoMapPropertyResolve("UplinkDurationInMs", typeof(FlowHuaweiCsv), typeof(ThousandTransform))]
        public double UplinkDuration { get; set; }

        [AutoMapPropertyResolve("PagingUsersString", typeof(FlowHuaweiCsv), typeof(StringToIntTransform))]
        public int PagingUsers { get; set; }

        public int GroupAPreambles { get; set; }

        public int GroupBPreambles { get; set; }

        public int DedicatedPreambles { get; set; }

        public double UplinkDciCceRate { get; set; }

        public double DownlinkDciCceRate { get; set; }

        [AutoMapPropertyResolve("PucchPrbsString", typeof(FlowHuaweiCsv), typeof(StringToDoubleTransform))]
        public double PucchPrbs { get; set; }

        [AutoMapPropertyResolve("LastTtiUplinkFlowInByte", typeof(FlowHuaweiCsv), typeof(MegaTransform))]
        public double LastTtiUplinkFlow { get; set; }

        [AutoMapPropertyResolve("ButLastUplinkDurationInMs", typeof(FlowHuaweiCsv), typeof(ThousandTransform))]
        public double ButLastUplinkDuration { get; set; }

        [AutoMapPropertyResolve("LastTtiDownlinkFlowInByte", typeof(FlowHuaweiCsv), typeof(MegaTransform))]
        public double LastTtiDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("ButLastDownlinkDurationInMs", typeof(FlowHuaweiCsv), typeof(ThousandTransform))]
        public double ButLastDownlinkDuration { get; set; }

        [AutoMapPropertyResolve("SchedulingRank1String", typeof(FlowHuaweiCsv), typeof(StringToIntTransform))]
        public int SchedulingRank1 { get; set; }

        [AutoMapPropertyResolve("SchedulingRank2String", typeof(FlowHuaweiCsv), typeof(StringToIntTransform))]
        public int SchedulingRank2 { get; set; }

        public int SchedulingTimes => SchedulingRank1 + SchedulingRank2;

        public int RedirectCdma2000 { get; set; }

        public double DownlinkFeelingThroughput => PdcpDownlinkFlow - LastTtiDownlinkFlow;

        public double DownlinkFeelingDuration => ButLastDownlinkDuration;

        public double UplinkFeelingThroughput => PdcpUplinkFlow - LastTtiUplinkFlow;

        public double UplinkFeelingDuration => ButLastUplinkDuration;
    }

    [AutoMapFrom(typeof(FlowHuaweiCsv))]
    public class RrcHuawei : Entity, ILocalCellQuery
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte LocalCellId { get; set; }
        
        public int EmergencyRrcRequest { get; set; }
        
        public int EmergencyRrcRequestAll { get; set; }
        
        public int EmergencyRrcSuccess { get; set; }
        
        public int HighPriorityRrcRequest { get; set; }
        
        public int HighPriorityRrcRequestAll { get; set; }
        
        public int HighPriorityRrcSuccess { get; set; }
        
        public int MoDataRrcRequest { get; set; }
        
        public int MoDataRrcRequestAll { get; set; }
        
        public int MoDataRrcSuccess { get; set; }
        
        public int MoSignallingRrcRequest { get; set; }
        
        public int MoSignallingRrcRequestAll { get; set; }
        
        public int MoSignallingRrcSuccess { get; set; }
        
        public int MtAccessRrcRequest { get; set; }
        
        public int MtAccessRrcRequestAll { get; set; }
        
        public int MtAccessRrcSuccess { get; set; }
        
        public int RrcFailOtherResource { get; set; }
        
        public int RrcFailUserLimit { get; set; }
        
        public int RrcRejectFail { get; set; }
        
        public int RrcRejectOverload { get; set; }
        
        public int RrcReconstructionLostFlowControl { get; set; }
        
        public int RrcRequestLostFlowControl { get; set; }
        
        public int RrcFailResourceAssignment { get; set; }
        
        public int RrcFailUeNoAnswer { get; set; }
        
        public int RrcFailSrsAssignment { get; set; }
        
        public int RrcFailPucchAssignment { get; set; }
        
        public int RrcRejectFlowControl { get; set; }

        public int TotalRrcRequest
            =>
                MtAccessRrcRequest + MoSignallingRrcRequest + MoDataRrcRequest + HighPriorityRrcRequest +
                EmergencyRrcRequest;

        public int TotalRrcSuccess
            =>
                MtAccessRrcSuccess + MoSignallingRrcSuccess + MoDataRrcSuccess + HighPriorityRrcSuccess +
                EmergencyRrcSuccess;

        public int TotalRrcFail => TotalRrcRequest - TotalRrcSuccess;

        public int MtAccessRrcFail => MtAccessRrcRequest - MtAccessRrcSuccess;

        public int MoSignallingRrcFail => MoSignallingRrcRequest - MoSignallingRrcSuccess;

        public int MoDataRrcFail => MoDataRrcRequest - MoDataRrcSuccess;

        public int HighPriorityRrcFail => HighPriorityRrcRequest - HighPriorityRrcSuccess;

        public int EmergencyRrcFail => EmergencyRrcRequest - EmergencyRrcSuccess;
    }

    [AutoMapFrom(typeof(FlowHuaweiCsv))]
    public class QciHuawei : Entity, ILocalCellQuery, IStatTime
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte LocalCellId { get; set; }

        public int Cqi0Times { get; set; }

        public int Cqi1Times { get; set; }

        public int Cqi2Times { get; set; }

        public int Cqi3Times { get; set; }

        public int Cqi4Times { get; set; }

        public int Cqi5Times { get; set; }

        public int Cqi6Times { get; set; }

        public int Cqi7Times { get; set; }

        public int Cqi8Times { get; set; }

        public int Cqi9Times { get; set; }

        public int Cqi10Times { get; set; }

        public int Cqi11Times { get; set; }

        public int Cqi12Times { get; set; }

        public int Cqi13Times { get; set; }

        public int Cqi14Times { get; set; }

        public int Cqi15Times { get; set; }
    }

    [AutoMapFrom(typeof(FlowHuaweiCsv))]
    public class PrbHuawei : Entity, ILocalCellQuery, IStatTime, ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte LocalCellId { get; set; }

        public byte SectorId { get; set; }

        public DateTime StatTime { get; set; }

        public double PdschPrbs { get; set; }

        public double DownlinkDtchPrbNumber { get; set; }

        public double PuschPrbs { get; set; }

        public double UplinkDtchPrbNumber { get; set; }

        public int DownlinkPrbSubframe { get; set; }

        public int UplinkPrbSubframe { get; set; }

        public double PdschUsageInterval0Seconds { get; set; }
        
        public double PdschUsageInterval10Seconds { get; set; }

        public double PdschUsageInterval20Seconds { get; set; }
        
        public double PdschUsageInterval30Seconds { get; set; }

        public double PdschUsageInterval40Seconds { get; set; }

        public double PdschUsageInterval50Seconds { get; set; }
        
        public double PdschUsageInterval60Seconds { get; set; }
        
        public double PdschUsageInterval70Seconds { get; set; }

        public double PdschUsageInterval80Seconds { get; set; }
        
        public double PdschUsageInterval90Seconds { get; set; }

        public double PuschUsageInterval0Seconds { get; set; }
        
        public double PuschUsageInterval10Seconds { get; set; }
        
        public double PuschUsageInterval20Seconds { get; set; }
        
        public double PuschUsageInterval30Seconds { get; set; }
        
        public double PuschUsageInterval40Seconds { get; set; }
        
        public double PuschUsageInterval50Seconds { get; set; }
        
        public double PuschUsageInterval60Seconds { get; set; }
        
        public double PuschUsageInterval70Seconds { get; set; }
        
        public double PuschUsageInterval80Seconds { get; set; }
        
        public double PuschUsageInterval90Seconds { get; set; }
    }

    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    [TypeDoc("小区单日流量统计视图")]
    public class FlowView : IStatTime, ILteCellQuery, IENodebName
    {
        [MemberDoc("统计时间")]
        [ArraySumProtection]
        public DateTime StatTime { get; set; }

        [MemberDoc("基站编号")]
        [ArraySumProtection]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        [ArraySumProtection]
        public byte SectorId { get; set; }

        [ArraySumProtection]
        public string ENodebName { get; set; }

        [AutoMapPropertyResolve("DownlinkPdcpFlow", typeof(FlowZte))]
        [MemberDoc("PDCP层下行流量")]
        public double PdcpDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("UplindPdcpFlow", typeof(FlowZte))]
        [MemberDoc("PDCP层上行流量")]
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

        public double RedirectCdma2000 { get; set; }

        public double DownSwitchRate
            =>
                PdcpUplinkFlow + PdcpDownlinkFlow == 0
                    ? 100
                    : (8 * (double)RedirectCdma2000 / (PdcpUplinkFlow / 1024 + PdcpDownlinkFlow / 1024));

        [AutoMapPropertyResolve("SchedulingTm3", typeof(FlowZte))]
        public double SchedulingTimes { get; set; }

        [AutoMapPropertyResolve("SchedulingTm3Rank2", typeof(FlowZte))]
        public double SchedulingRank2 { get; set; }

        public double Rank2Rate => SchedulingTimes == 0 ? 100 : SchedulingRank2 / SchedulingTimes * 100;
    }

    [AutoMapFrom(typeof(RrcHuawei), typeof(RrcZte))]
    public class RrcView : IStatTime, ILteCellQuery, IENodebName
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int MtAccessRrcRequest { get; set; }

        public int MtAccessRrcSuccess { get; set; }

        public double MtAccessRrcRate => MtAccessRrcRequest == 0 ? 0 : (double) MtAccessRrcSuccess/MtAccessRrcRequest;

        public int MtAccessRrcFail { get; set; }

        public int MoSignallingRrcRequest { get; set; }

        public int MoSignallingRrcSuccess { get; set; }

        public double MoSiganllingRrcRate
            => MoSignallingRrcRequest == 0 ? 0 : (double) MoSignallingRrcSuccess/MoSignallingRrcRequest;

        public int MoSignallingRrcFail { get; set; }

        public int MoDataRrcRequest { get; set; }

        public int MoDataRrcSuccess { get; set; }

        public double MoDataRrcRate => MoDataRrcRequest == 0 ? 0 : (double) MoDataRrcSuccess/MoDataRrcRequest;

        public int MoDataRrcFail { get; set; }

        public int HighPriorityRrcRequest { get; set; }

        public int HighPriorityRrcSuccess { get; set; }

        public double HighPriorityRrcRate
            => HighPriorityRrcRequest == 0 ? 0 : (double) HighPriorityRrcSuccess/HighPriorityRrcRequest;

        public int HighPriorityRrcFail { get; set; }

        public int EmergencyRrcRequest { get; set; }

        public int EmergencyRrcSuccess { get; set; }

        public double EmergencyRrcRate
            => EmergencyRrcRequest == 0 ? 0 : (double) EmergencyRrcSuccess/EmergencyRrcRequest;

        public int EmergencyRrcFail { get; set; }

        public int TotalRrcRequest { get; set; }

        public int TotalRrcSuccess { get; set; }

        public double RrcSuccessRate => TotalRrcRequest == 0 ? 0 : (double) TotalRrcSuccess/TotalRrcRequest;

        public int TotalRrcFail { get; set; }

        public string ENodebName { get; set; }
    }

    [AutoMapFrom(typeof(QciHuawei), typeof(QciZte))]
    [IncreaseNumberKpi(KpiPrefix = "Cqi", KpiAffix = "Times", IndexRange = 16)]
    public class QciView : IStatTime, ILteCellQuery, IENodebName
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public string ENodebName { get; set; }

        public int Cqi0Times { get; set; }

        public int Cqi1Times { get; set; }

        public int Cqi2Times { get; set; }

        public int Cqi3Times { get; set; }

        public int Cqi4Times { get; set; }

        public int Cqi5Times { get; set; }

        public int Cqi6Times { get; set; }

        public int Cqi7Times { get; set; }

        public int Cqi8Times { get; set; }

        public int Cqi9Times { get; set; }

        public int Cqi10Times { get; set; }

        public int Cqi11Times { get; set; }

        public int Cqi12Times { get; set; }

        public int Cqi13Times { get; set; }

        public int Cqi14Times { get; set; }

        public int Cqi15Times { get; set; }

        public Tuple<int, int> CqiCounts => this.GetDivsionIntTuple(7);

        public double CqiRate => (double)CqiCounts.Item2 * 100 / CqiCounts.Item1;
    }

    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    public class ENodebFlowView : IENodebId, IGeoPoint<double>
    {
        [ArraySumProtection]
        public int ENodebId { get; set; }

        [ArraySumProtection]
        public double Longtitute { get; set; }

        [ArraySumProtection]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("DownlinkPdcpFlow", typeof(FlowZte))]
        [MemberDoc("PDCP层下行流量")]
        public double PdcpDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("UplindPdcpFlow", typeof(FlowZte))]
        [MemberDoc("PDCP层上行流量")]
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

    }

    [AutoMapFrom(typeof(FlowView), typeof(TownFlowStat))]
    [TypeDoc("聚合流量统计视图")]
    public class AggregateFlowView
    {
        [MemberDoc("小区个数")]
        public int CellCount { get; set; }

        [MemberDoc("PDCP层下行流量")]
        public double PdcpDownlinkFlow { get; set; }

        [MemberDoc("PDCP层上行流量")]
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
    }
}
