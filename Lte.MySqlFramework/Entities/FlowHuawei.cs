using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(FlowHuaweiCsv))]
    public class FlowHuawei : Entity
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
}
