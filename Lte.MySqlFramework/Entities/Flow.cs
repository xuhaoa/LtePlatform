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
        public int MaxRrcUsers { get; set; }

        [CsvColumn(Name = "上行平均激活用户数_1")]
        public double UplinkAverageActiveUsers { get; set; }

        [CsvColumn(Name = "下行平均激活用户数_1")]
        public double DownlinkAverageActiveUsers { get; set; }

        [CsvColumn(Name = "平均RRC连接用户数_1")]
        public double AverageRrcUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数_1")]
        public double AverageActiveUsers { get; set; }

        [CsvColumn(Name = "最大激活用户数_1")]
        public int MaxActiveUsers { get; set; }

        [CsvColumn(Name = "小区PDCP接收上行数据的总时长(s)")]
        public int PdcpUplinkDuration { get; set; }

        [CsvColumn(Name = "小区PDCP发送下行数据的总时长(s)")]
        public int PdcpDownlinkDuration { get; set; }

        [CsvColumn(Name = "小区上行PDCP层流量（MB）")]
        public double UplindPdcpFlowInMByte { get; set; }

        [CsvColumn(Name = "小区下行PDCP层流量（MB）")]
        public double DownlinkPdcpFlowInMByte { get; set; }

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

        public static IEnumerable<FlowZteCsv> ReadFlowZteCsvs(StreamReader reader)
        {
            return
                CsvContext.Read<FlowZteCsv>(reader, CsvFileDescription.CommaDescription)
                    .ToList()
                    .Where(x => !string.IsNullOrEmpty(x.Qci8DownlinkIpThroughputDuration));
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

        public static List<FlowHuaweiCsv> ReadFlowHuaweiCsvs(StreamReader reader)
        {
            return CsvContext.Read<FlowHuaweiCsv>(reader, CsvFileDescription.CommaDescription).ToList();
        }
    }

    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    public class TownFlowStat : Entity, ITownId
    {
        public int TownId { get; set; }

        public DateTime StatTime { get; set; }

        [AutoMapPropertyResolve("DownlinkPdcpFlow", typeof(FlowZte))]
        public double PdcpDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("UplindPdcpFlow", typeof(FlowZte))]
        public double PdcpUplinkFlow { get; set; }
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
    }
}
