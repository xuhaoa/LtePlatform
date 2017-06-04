using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using Lte.Domain.Regular;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(FlowZteCsv))]
    public class FlowZte : Entity, IENodebId
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
    public class RrcZte : Entity, IENodebId
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

    public class FlowZteCsv
    {
        [CsvColumn(Name = "开始时间")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "网元")]
        public int ENodebId { get; set; }

        [CsvColumn(Name = "小区")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "最大RRC连接用户数_1")]
        public int OldMaxRrcUsers { get; set; }

        [CsvColumn(Name = "最大RRC连接用户数-FDD")]
        public int NewMaxRrcUsers { get; set; }

        public int MaxRrcUsers => OldMaxRrcUsers + NewMaxRrcUsers;

        [CsvColumn(Name = "上行平均激活用户数_1")]
        public double OldUlAverageActiveUsers { get; set; }

        [CsvColumn(Name = "上行平均激活用户数-FDD_1484414261455-0-71")]
        public double NewUlAvgActUsers { get; set; }

        public double UplinkAverageActiveUsers => OldUlAverageActiveUsers + NewUlAvgActUsers;

        [CsvColumn(Name = "下行平均激活用户数_1")]
        public double OldDlAverageActiveUsers { get; set; }

        [CsvColumn(Name = "下行平均激活用户数-FDD_1484414261455-0-72")]
        public double NewDlAvgActUsers { get; set; }

        public double DownlinkAverageActiveUsers => OldDlAverageActiveUsers + NewDlAvgActUsers;

        [CsvColumn(Name = "平均RRC连接用户数_1")]
        public double AverageRrcUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数_1")]
        public double OldAverageActiveUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数")]
        public double NewAvgActUsers { get; set; }

        public double AverageActiveUsers => OldAverageActiveUsers + NewAvgActUsers;

        public int MaxActiveUsers
            =>
                OldMaxActiveUsers + UplinkQci8MaxActiveUsers + UplinkQci9MaxActiveUsers + DownlinkQci8MaxActiveUsers +
                DownlinkQci9MaxActiveUsers;

        [CsvColumn(Name = "最大激活用户数_1")]
        public int OldMaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]上行QCI8最大激活用户数")]
        public int UplinkQci8MaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]上行QCI9最大激活用户数")]
        public int UplinkQci9MaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]下行QCI8最大激活用户数")]
        public int DownlinkQci8MaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]下行QCI9最大激活用户数")]
        public int DownlinkQci9MaxActiveUsers { get; set; }

        [CsvColumn(Name = "小区PDCP接收上行数据的总时长(s)")]
        public int OldPdcpUplinkDuration { get; set; }

        [CsvColumn(Name = "小区PDCP接收上行数据的总时长(s)")]
        public int NewPdcpUlDuration { get; set; }

        public int PdcpUplinkDuration => OldPdcpUplinkDuration + NewPdcpUlDuration;

        [CsvColumn(Name = "小区PDCP发送下行数据的总时长(s)")]
        public int OldPdcpDownlinkDuration { get; set; }

        [CsvColumn(Name = "小区PDCP发送下行数据的总时长(s)")]
        public int NewPdcpDlDuration { get; set; }

        public int PdcpDownlinkDuration => OldPdcpDownlinkDuration + NewPdcpDlDuration;

        [CsvColumn(Name = "小区上行PDCP层流量（MB）_1440661576499")]
        public double OldUlPdcpFlowInMByte { get; set; }

        [CsvColumn(Name = "小区上行PDCP层流量（MB）")]
        public double NewUlPdcpFlowInMByte { get; set; }

        public double UplindPdcpFlowInMByte => OldUlPdcpFlowInMByte + NewUlPdcpFlowInMByte;

        [CsvColumn(Name = "小区下行PDCP层流量（MB）_1440661576499")]
        public double OldDlPdcpFlowInMByte { get; set; }

        [CsvColumn(Name = "小区下行PDCP层流量（MB）")]
        public double NewDlPdcpFlowInMByte { get; set; }

        public double DownlinkPdcpFlowInMByte => OldDlPdcpFlowInMByte + NewDlPdcpFlowInMByte;

        [CsvColumn(Name = "QCI8小区上行IP Throughput数据量高(兆比特)")]
        public string Qci8UplinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI8小区上行IP Throughput数据量低(千比特)")]
        public string Qci8UplinkIpThroughputLow { get; set; }

        public double Qci8UplinkIpThroughput
            => (string.IsNullOrEmpty(Qci8UplinkIpThroughputHigh) ? 0 : Qci8UplinkIpThroughputHigh.ConvertToInt(0))
               +
               (string.IsNullOrEmpty(Qci8UplinkIpThroughputLow)
                   ? 0
                   : Qci8UplinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI8小区上行IP Throughput数据传输时间(毫秒)")]
        public string Qci8UplinkIpThroughputDuration { get; set; }

        public double Qci8UplinkIpDuration => string.IsNullOrEmpty(Qci8UplinkIpThroughputDuration)
            ? 0
            : Qci8UplinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "QCI9小区上行IP Throughput数据量高(兆比特)")]
        public string Qci9UplinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI9小区上行IP Throughput数据量低(千比特)")]
        public string Qci9UplinkIpThroughputLow { get; set; }

        public double Qci9UplinkIpThroughput
            => (string.IsNullOrEmpty(Qci9UplinkIpThroughputHigh) ? 0 : Qci9UplinkIpThroughputHigh.ConvertToInt(0)) +
               (string.IsNullOrEmpty(Qci9UplinkIpThroughputLow)
                   ? 0
                   : Qci9UplinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI9小区上行IP Throughput数据传输时间(毫秒)")]
        public string Qci9UplinkIpThroughputDuration { get; set; }

        public double Qci9UplinkIpDuration
            =>
                string.IsNullOrEmpty(Qci9UplinkIpThroughputDuration)
                    ? 0
                    : Qci9UplinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "QCI8小区下行IP Throughput数据量高(兆比特)")]
        public string Qci8DownlinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI8小区下行IP Throughput数据量低(千比特)")]
        public string Qci8DownlinkIpThroughputLow { get; set; }

        public double Qci8DownlinkIpThroughput
            => (string.IsNullOrEmpty(Qci8DownlinkIpThroughputHigh) ? 0 : Qci8DownlinkIpThroughputHigh.ConvertToInt(0)) +
               (string.IsNullOrEmpty(Qci8DownlinkIpThroughputLow)
                   ? 0
                   : Qci8DownlinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI8小区下行IP Throughput数据传输时间(毫秒)")]
        public string Qci8DownlinkIpThroughputDuration { get; set; }

        public double Qci8DownlinkIpDuration
            =>
                string.IsNullOrEmpty(Qci8DownlinkIpThroughputDuration)
                    ? 0
                    : Qci8DownlinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "QCI9小区下行IP Throughput数据量高(兆比特)")]
        public string Qci9DownlinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI9小区下行IP Throughput数据量低(千比特)")]
        public string Qci9DownlinkIpThroughputLow { get; set; }

        public double Qci9DownlinkIpThroughput
            => (string.IsNullOrEmpty(Qci9DownlinkIpThroughputHigh) ? 0 : Qci9DownlinkIpThroughputHigh.ConvertToInt(0)) +
               (string.IsNullOrEmpty(Qci9DownlinkIpThroughputLow)
                   ? 0
                   : Qci9DownlinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI9小区下行IP Throughput数据传输时间(毫秒)")]
        public string Qci9DownlinkIpThroughputDuration { get; set; }

        public double Qci9DownlinkIpDuration
            =>
                string.IsNullOrEmpty(Qci9DownlinkIpThroughputDuration)
                    ? 0
                    : Qci9DownlinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "下行PDSCH信道上模式3调度次数")]
        public int SchedulingTm3 { get; set; }

        [CsvColumn(Name = "下行PDSCH信道上模式3 RI=2调度次数")]
        public int SchedulingTm3Rank2 { get; set; }

        [CsvColumn(Name = "LTE-CDMA2000系统间重定向请求次数(A2事件触发原因)")]
        public int RedirectA2 { get; set; }

        [CsvColumn(Name = "LTE-CDMA2000系统间重定向请求次数(B2事件触发原因)")]
        public int RedirectB2 { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接建立成功次数")]
        public int MtAccessRrcSuccess { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接失败次数，定时器超时")]
        public int MtAccessRrcFailTimer { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接失败次数，eNB接纳失败")]
        public int MtAccessRrcFailAllow { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接失败次数，其他原因")]
        public int MtAccessRrcFailOther { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接建立成功次数")]
        public int MoSignallingRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接失败次数，定时器超时")]
        public int MoSignallingRrcFailTimer { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接失败次数，eNB接纳失败")]
        public int MoSignallingRrcFailAllow { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接失败次数，其他原因")]
        public int MoSignallingRrcFailOther { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接建立成功次数")]
        public int MoDataRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接失败次数，定时器超时")]
        public int MoDataRrcFailTimer { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接失败次数，eNB接纳失败")]
        public int MoDataRrcFailAllow { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接失败次数，其他原因")]
        public int MoDataRrcFailOther { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，UserInactive触发释放")]
        public int RrcReleaseUserInactive { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，MME通过上下文释放消息触发释放")]
        public int RrcReleaseMmeContext { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB资源不足引发的释放")]
        public int RrcReleaseResourceLack { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，小区关断或复位引发释放")]
        public int RrcReleaseCellReset { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB触发的其他原因")]
        public int RrcReleaseOther { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接建立成功次数")]
        public int HighPriorityAccessRrcSuccess { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接失败次数，定时器超时")]
        public int HighPriorityAccessRrcFailTimer { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接失败次数，eNB接纳失败")]
        public int HighPriorityAccessRrcFailAllow { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接失败次数，其他原因")]
        public int HighPriorityAccessRrcFailOther { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接建立成功次数")]
        public int EmergencyRrcSuccess { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接失败次数，定时器超时")]
        public int EmergencyRrcFailTimer { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接失败次数，eNB接纳失败")]
        public int EmergencyRrcFailAllow { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接失败次数，其他原因")]
        public int EmergencyRrcFailOther { get; set; }

        [CsvColumn(Name = "RRC连接建立总时长(毫秒)")]
        public int RrcTotalDurationInMs { get; set; }

        [CsvColumn(Name = "RRC连接建立最大时间(毫秒)")]
        public int RrcMaxDurationInMs { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，空口定时器超时")]
        public int RrcReleaseTimer { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB等待UE上下文建立定时器超时导致释放")]
        public int RrcReleaseUeContextTimer { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，空口质量差触发RLF")]
        public int RrcReleaseBadRsrp { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，RLC达到最大重传次数")]
        public int RrcReleaseRlcMaxRetransmit { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，PDCP完整性保护失败")]
        public int RrcReleasePdcpIntegrationFail { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，Gtpu ErrInd触发释放")]
        public int RrcReleaseGptu { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，Path故障触发释放")]
        public int RrcReleasePathMalfunction { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，光口故障触发释放")]
        public int RrcReleaseFiber { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB检测到UE被异常拔掉")]
        public int RrcReleaseUeExit { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，跨站重建立失败导致的释放")]
        public int RrcReleaseInterSiteReconstruction { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB重定向导致释放")]
        public int RrcReleaseRedirect { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB无线链路失败导致释放")]
        public int RrcReleaseRadioLink { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，重建立失败引发的释放")]
        public int RrcReleaseReconstructionFail { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，S1链路故障引发释放")]
        public int RrcReleaseS1 { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，MME其它原因导致释放")]
        public int RrcReleaseMmeOther { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，切换失败原因导致释放")]
        public int RrcReleaseSwitchFail { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接建立请求次数")]
        public int MtAccessRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接建立请求次数")]
        public int MoSignallingRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接建立请求次数")]
        public int MoDataRrcRequest { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接建立请求次数")]
        public int HighPriorityAccessRrcRequest { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接建立请求次数")]
        public int EmergencyRrcRequest { get; set; }

        public static List<FlowZteCsv> ReadFlowZteCsvs(StreamReader reader)
        {
            return
                CsvContext.Read<FlowZteCsv>(reader, CsvFileDescription.CommaDescription)
                    .ToList()
                    .Where(x => !string.IsNullOrEmpty(x.Qci8DownlinkIpThroughputDuration)).ToList();
        }
    }

    [AutoMapFrom(typeof(FlowHuaweiCsv))]
    public class FlowHuawei : Entity, IENodebId
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

        public double DownlinkAveragePrbs { get; set; }

        public double DownlinkDrbPbs { get; set; }

        public double UplinkAveragePrbs { get; set; }

        public double UplinkDrbPbs { get; set; }

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
    public class RrcHuawei : Entity, IENodebId
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

    public class FlowHuaweiCsv
    {
        [CsvColumn(Name = "开始时间")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "小区")]
        public string CellInfo { get; set; }

        public int ENodebId
        {
            get
            {
                if (string.IsNullOrEmpty(CellInfo)) return 0;
                var fields = CellInfo.GetSplittedFields(", ");
                return fields.Length == 0 ? 0 : fields[3].GetSplittedFields('=')[1].ConvertToInt(0);
            }
        }

        public byte LocalCellId
        {
            get
            {
                if (string.IsNullOrEmpty(CellInfo)) return 0;
                var fields = CellInfo.GetSplittedFields(", ");
                return fields.Length == 0 ? (byte)0 : fields[1].GetSplittedFields('=')[1].ConvertToByte(0);
            }
        }

        [CsvColumn(Name = "小区PDCP层所发送的下行数据的总吞吐量 (比特)")]
        public long PdcpDownlinkFlowInByte { get; set; }

        [CsvColumn(Name = "小区PDCP层所接收到的上行数据的总吞吐量 (比特)")]
        public long PdcpUplinkFlowInByte { get; set; }

        [CsvColumn(Name = "小区内的平均用户数 (无)")]
        public double AverageUsers { get; set; }

        [CsvColumn(Name = "小区内的最大用户数 (无)")]
        public int MaxUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数 (无)")]
        public double AverageActiveUsers { get; set; }

        [CsvColumn(Name = "最大激活用户数 (无)")]
        public int MaxActiveUsers { get; set; }

        [CsvColumn(Name = "上行平均激活用户数 (无)")]
        public double UplinkAverageUsers { get; set; }

        [CsvColumn(Name = "上行最大激活用户数 (无)")]
        public int UplinkMaxUsers { get; set; }

        [CsvColumn(Name = "下行平均激活用户数 (无)")]
        public double DownlinkAverageUsers { get; set; }

        [CsvColumn(Name = "下行最大激活用户数 (无)")]
        public int DownlinkMaxUsers { get; set; }

        [CsvColumn(Name = "小区下行有数据传输总时长(1ms精度) (毫秒)")]
        public int DownlinkDurationInMs { get; set; }

        [CsvColumn(Name = "小区上行有数据传输总时长(1ms精度) (毫秒)")]
        public int UplinkDurationInMs { get; set; }

        [CsvColumn(Name = "小区Uu接口寻呼用户个数 (无)")]
        public string PagingUsersString { get; set; }

        [CsvColumn(Name = "下行Physical Resource Block被使用的平均个数 (无)")]
        public double DownlinkAveragePrbs { get; set; }

        [CsvColumn(Name = "下行PDSCH DRB的Physical Resource Block被使用的平均个数 (无)")]
        public double DownlinkDrbPbs { get; set; }

        [CsvColumn(Name = "上行Physical Resource Block被使用的平均个数 (无)")]
        public double UplinkAveragePrbs { get; set; }

        [CsvColumn(Name = "上行PUSCH DRB的Physical Resource Block被使用的平均个数 (无)")]
        public double UplinkDrbPbs { get; set; }

        [CsvColumn(Name = "小区接收到属于Group A的Preamble消息次数 (无)")]
        public int GroupAPreambles { get; set; }

        [CsvColumn(Name = "小区接收到属于Group B的Preamble消息的次数 (无)")]
        public int GroupBPreambles { get; set; }

        [CsvColumn(Name = "小区接收到专用前导消息的次数 (无)")]
        public int DedicatedPreambles { get; set; }

        [CsvColumn(Name = "统计周期内上行DCI所使用的PDCCH CCE个数 (无)")]
        public long UplinkDciCces { get; set; }

        public double UplinkDciCceRate => TotalCces == 0 ? 0 : (double)UplinkDciCces / TotalCces;

        [CsvColumn(Name = "统计周期内下行DCI所使用的PDCCH CCE个数 (无)")]
        public long DownlinkDciCces { get; set; }

        public double DownlinkDciCceRate => TotalCces == 0 ? 0 : (double)DownlinkDciCces / TotalCces;

        [CsvColumn(Name = "统计周期内可用的PDCCH CCE的个数 (无)")]
        public long TotalCces { get; set; }

        [CsvColumn(Name = "PUCCH的PRB资源分配的平均值 (无)")]
        public string PucchPrbsString { get; set; }

        [CsvColumn(Name = "使UE缓存为空的最后一个TTI所传的上行PDCP吞吐量 (比特)")]
        public long LastTtiUplinkFlowInByte { get; set; }

        [CsvColumn(Name = "扣除使UE缓存为空的最后一个TTI之后的上行数传时长 (毫秒)")]
        public int ButLastUplinkDurationInMs { get; set; }

        [CsvColumn(Name = "使缓存为空的最后一个TTI所传的下行PDCP吞吐量 (比特)")]
        public long LastTtiDownlinkFlowInByte { get; set; }

        [CsvColumn(Name = "扣除使下行缓存为空的最后一个TTI之后的数传时长 (毫秒)")]
        public int ButLastDownlinkDurationInMs { get; set; }

        [CsvColumn(Name = "RANK1的上报次数 (无)")]
        public string SchedulingRank1String { get; set; }

        [CsvColumn(Name = "RANK2的上报次数 (无)")]
        public string SchedulingRank2String { get; set; }

        [CsvColumn(Name = "重定向到CDMA2000 HRPD的总次数 (无)")]
        public int RedirectCdma2000 { get; set; }

        [CsvColumn(Name = "emergency原因的RRC连接建立尝试次数 (无)")]
        public int EmergencyRrcRequest { get; set; }

        [CsvColumn(Name = "emergency原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int EmergencyRrcRequestAll { get; set; }

        [CsvColumn(Name = "emergency原因的RRC连接建立成功次数 (无)")]
        public int EmergencyRrcSuccess { get; set; }

        [CsvColumn(Name = "highPriorityAccess原因的RRC连接建立尝试次数 (无)")]
        public int HighPriorityRrcRequest { get; set; }

        [CsvColumn(Name = "highPriorityAccess原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int HighPriorityRrcRequestAll { get; set; }

        [CsvColumn(Name = "highPriorityAccess原因的RRC连接建立成功次数 (无)")]
        public int HighPriorityRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Data原因的RRC连接建立尝试次数 (无)")]
        public int MoDataRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Data原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int MoDataRrcRequestAll { get; set; }

        [CsvColumn(Name = "mo-Data原因的RRC连接建立成功次数 (无)")]
        public int MoDataRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Signalling原因的RRC连接建立尝试次数 (无)")]
        public int MoSignallingRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Signalling原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int MoSignallingRrcRequestAll { get; set; }

        [CsvColumn(Name = "mo-Signalling原因的RRC连接建立成功次数 (无)")]
        public int MoSignallingRrcSuccess { get; set; }

        [CsvColumn(Name = "mt-Access原因的RRC连接建立尝试次数 (无)")]
        public int MtAccessRrcRequest { get; set; }

        [CsvColumn(Name = "mt-Access原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int MtAccessRrcRequestAll { get; set; }

        [CsvColumn(Name = "mt-Access原因的RRC连接建立成功次数 (无)")]
        public int MtAccessRrcSuccess { get; set; }

        [CsvColumn(Name = "其它资源分配失败而导致RRC连接建立失败的次数 (无)")]
        public int RrcFailOtherResource { get; set; }

        [CsvColumn(Name = "用户数规格受限导致的RRC连接建立失败次数 (无)")]
        public int RrcFailUserLimit { get; set; }

        [CsvColumn(Name = "其它原因导致的RRC连接建立被拒绝的次数 (无)")]
        public int RrcRejectFail { get; set; }

        [CsvColumn(Name = "MME过载导致的发送RRC Connection Reject消息次数 (无)")]
        public int RrcRejectOverload { get; set; }

        [CsvColumn(Name = "流控导致的RRC重建请求消息丢弃次数 (无)")]
        public int RrcReconstructionLostFlowControl { get; set; }

        [CsvColumn(Name = "流控导致的RRC Connection Request 消息丢弃次数 (无)")]
        public int RrcRequestLostFlowControl { get; set; }

        [CsvColumn(Name = "资源分配失败而导致RRC连接建立失败次数 (无)")]
        public int RrcFailResourceAssignment { get; set; }

        [CsvColumn(Name = "UE无应答而导致RRC连接建立失败次数 (无)")]
        public int RrcFailUeNoAnswer { get; set; }

        [CsvColumn(Name = "因为SRS资源分配失败而导致RRC连接建立失败的次数 (无)")]
        public int RrcFailSrsAssignment { get; set; }

        [CsvColumn(Name = "因为PUCCH资源分配失败而导致RRC连接建立失败的次数 (无)")]
        public int RrcFailPucchAssignment { get; set; }

        [CsvColumn(Name = "流控导致的发送RRC Connection Reject消息次数 (无)")]
        public int RrcRejectFlowControl { get; set; }

        public static List<FlowHuaweiCsv> ReadFlowHuaweiCsvs(StreamReader reader)
        {
            return CsvContext.Read<FlowHuaweiCsv>(reader, CsvFileDescription.CommaDescription).ToList();
        }
    }

    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    public class TownFlowStat : Entity, ITownId, IStatTime
    {
        public int TownId { get; set; }

        public DateTime StatTime { get; set; }

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
    public class TownFlowView : ICityDistrictTown
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
    }

    [AutoMapFrom(typeof(TownFlowView))]
    public class DistrictFlowView : ICityDistrict
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
    }

    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    [TypeDoc("小区单日流量统计视图")]
    public class FlowView : IStatTime, ILteCellQuery
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

        [AutoMapPropertyResolve("SchedulingTm3", typeof(FlowZte))]
        public double SchedulingTimes { get; set; }

        [AutoMapPropertyResolve("SchedulingTm3Rank2", typeof(FlowZte))]
        public double SchedulingRank2 { get; set; }

        public double Rank2Rate => SchedulingTimes == 0 ? 100 : SchedulingRank2 / SchedulingTimes * 100;
    }

    [AutoMapFrom(typeof(RrcHuawei), typeof(RrcZte))]
    public class RrcView : IStatTime, ILteCellQuery
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
    }

    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    public class ENodebFlowView : IENodebId, IGeoPoint<double>
    {
        public int ENodebId { get; set; }

        public double Longtitute { get; set; }

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

    [AutoMapFrom(typeof(FlowView))]
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
