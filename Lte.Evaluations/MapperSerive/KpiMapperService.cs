using System;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Kpi;
using Lte.Evaluations.ViewModels;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.ExcelCsv;
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.Entities.Mr;
using Lte.Parameters.Entities.Work;
using Lte.Parameters.MockOperations;

namespace Lte.Evaluations.MapperSerive
{
    public static class KpiMapperService
    {
        public static void MapCdmaRegionStat()
        {
            Mapper.CreateMap<CdmaRegionStat, CdmaRegionStatView>();
        }

        public static void MapFlow()
        {
            Mapper.CreateMap<FlowHuawei, FlowView>();
            Mapper.CreateMap<FlowZte, FlowView>()
                .ForMember(d => d.PdcpDownlinkFlow, opt => opt.MapFrom(s => s.DownlinkPdcpFlow))
                .ForMember(d => d.PdcpUplinkFlow, opt => opt.MapFrom(s => s.UplindPdcpFlow))
                .ForMember(d => d.AverageUsers, opt => opt.MapFrom(s => s.AverageRrcUsers))
                .ForMember(d => d.MaxUsers, opt => opt.MapFrom(s => s.MaxRrcUsers));
            Mapper.CreateMap<FlowHuaweiCsv, FlowHuawei>()
                .ForMember(d => d.ENodebId,
                    opt =>
                        opt.MapFrom(s => s.CellInfo.GetSplittedFields(", ")[3].GetSplittedFields('=')[1].ConvertToInt(0)))
                .ForMember(d => d.LocalCellId,
                    opt =>
                        opt.MapFrom(
                            s => s.CellInfo.GetSplittedFields(", ")[1].GetSplittedFields('=')[1].ConvertToByte(0)))
                .ForMember(d => d.PdcpDownlinkFlow,
                    opt => opt.MapFrom(s => (double) s.PdcpDownlinkFlowInByte/(1024*1024)))
                .ForMember(d => d.PdcpUplinkFlow, opt => opt.MapFrom(s => (double) s.PdcpUplinkFlowInByte/(1024*1024)))
                .ForMember(d => d.DownlinkDuration, opt => opt.MapFrom(s => (double) s.DownlinkDurationInMs/1000))
                .ForMember(d => d.UplinkDuration, opt => opt.MapFrom(s => (double) s.UplinkDurationInMs/1000))
                .ForMember(d => d.PagingUsers, opt => opt.MapFrom(s => s.PagingUsersString.ConvertToInt(0)))
                .ForMember(d => d.UplinkDciCceRate,
                    opt => opt.MapFrom(s => s.TotalCces == 0 ? 0 : (double) s.UplinkDciCces/s.TotalCces))
                .ForMember(d => d.DownlinkDciCceRate,
                    opt => opt.MapFrom(s => s.TotalCces == 0 ? 0 : (double) s.DownlinkDciCces/s.TotalCces))
                .ForMember(d => d.PucchPrbs, opt => opt.MapFrom(s => s.PucchPrbsString.ConvertToDouble(0)))
                .ForMember(d => d.LastTtiUplinkFlow,
                    opt => opt.MapFrom(s => (double) s.LastTtiUplinkFlowInByte/(1024*1024)))
                .ForMember(d => d.ButLastUplinkDuration,
                    opt => opt.MapFrom(s => (double) s.ButLastUplinkDurationInMs/1000))
                .ForMember(d => d.LastTtiDownlinkFlow,
                    opt => opt.MapFrom(s => (double) s.LastTtiDownlinkFlowInByte/(1024*1024)))
                .ForMember(d => d.ButLastDownlinkDuration,
                    opt => opt.MapFrom(s => (double) s.ButLastDownlinkDurationInMs/1000));

            Mapper.CreateMap<FlowZteCsv, FlowZte>()
                .ForMember(d => d.UplindPdcpFlow, opt => opt.MapFrom(s => s.UplindPdcpFlowInMByte * 8))
                .ForMember(d => d.DownlinkPdcpFlow, opt => opt.MapFrom(s => s.DownlinkPdcpFlowInMByte * 8))
                .ForMember(d => d.Qci8UplinkIpThroughput,
                    opt =>
                        opt.MapFrom(
                            s =>
                                s.Qci8UplinkIpThroughputHigh.ConvertToInt(0) +
                                s.Qci8UplinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024))
                .ForMember(d => d.Qci8UplinkIpDuration,
                    opt => opt.MapFrom(s => s.Qci8UplinkIpThroughputDuration.ConvertToDouble(0) / 1000))
                .ForMember(d => d.Qci9UplinkIpThroughput,
                    opt =>
                        opt.MapFrom(
                            s =>
                                s.Qci9UplinkIpThroughputHigh.ConvertToInt(0) +
                                s.Qci9UplinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024))
                .ForMember(d => d.Qci9UplinkIpDuration,
                    opt => opt.MapFrom(s => s.Qci9UplinkIpThroughputDuration.ConvertToDouble(0) / 1000))
                .ForMember(d => d.Qci8DownlinkIpThroughput,
                    opt =>
                        opt.MapFrom(
                            s =>
                                s.Qci8DownlinkIpThroughputHigh.ConvertToInt(0) +
                                s.Qci8DownlinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024))
                .ForMember(d => d.Qci8DownlinkIpDuration,
                    opt => opt.MapFrom(s => s.Qci8DownlinkIpThroughputDuration.ConvertToDouble(0) / 1000))
                .ForMember(d => d.Qci9DownlinkIpThroughput,
                    opt =>
                        opt.MapFrom(
                            s =>
                                s.Qci9DownlinkIpThroughputHigh.ConvertToInt(0) +
                                s.Qci9DownlinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024))
                .ForMember(d => d.Qci9DownlinkIpDuration,
                    opt => opt.MapFrom(s => s.Qci9DownlinkIpThroughputDuration.ConvertToDouble(0) / 1000));
        }

        public static void MapPreciseStat()
        {
            Mapper.CreateMap<PreciseCoverage4G, Precise4GView>();
            Mapper.CreateMap<Precise4GView, Precise4GSector>();
            Mapper.CreateMap<TownPreciseCoverage4GStat, TownPreciseView>();
            Mapper.CreateMap<TownPreciseView, TownPreciseCoverage4GStat>();
            Mapper.CreateMap<Cell, CellPreciseKpiView>()
                .ForMember(d => d.Indoor, opt => opt.MapFrom(s => s.IsOutdoor ? "室外" : "室内"))
                .ForMember(d => d.DownTilt, opt => opt.MapFrom(s => s.ETilt + s.MTilt))
                .ForMember(d => d.PreciseRate, opt => opt.MapFrom(s => 100.0));
            Mapper.CreateMap<PreciseCoverage4GCsv, PreciseCoverage4G>()
                .ForMember(d => d.ThirdNeighbors, opt => opt.MapFrom(s => (int)(s.TotalMrs * s.ThirdNeighborRate) / 100))
                .ForMember(d => d.SecondNeighbors, opt => opt.MapFrom(s => (int)(s.TotalMrs * s.SecondNeighborRate) / 100))
                .ForMember(d => d.FirstNeighbors, opt => opt.MapFrom(s => (int)(s.TotalMrs * s.FirstNeighborRate) / 100));
            Mapper.CreateMap<PreciseCoverage4G, TownPreciseCoverage4GStat>();
            Mapper.CreateMap<InterferenceMatrixCsv, InterferenceMatrixPci>()
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.CellRelation.Split('_')[0].ConvertToInt(0)))
                .ForMember(d => d.SourcePci,
                    opt => opt.MapFrom(s => s.CellRelation.GetSplittedFields('_')[1].ConvertToShort(0)))
                .ForMember(d => d.DestPci,
                    opt => opt.MapFrom(s => s.CellRelation.GetSplittedFields('_')[2].ConvertToShort(0)))
                .ForMember(d => d.Frequency,
                    opt => opt.MapFrom(s => s.CellRelation.GetSplittedFields('_')[3].ConvertToInt(100)));
            Mapper.CreateMap<InterferenceMatrixMongo, InterferenceMatrixStat>()
                .ForMember(d => d.DestPci, opt => opt.MapFrom(s => s.NeighborPci))
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.ENodebId))
                .ForMember(d => d.InterferenceLevel, opt => opt.MapFrom(s => s.InterfLevel ?? 0))
                .ForMember(d => d.Mod3Interferences, opt => opt.MapFrom(s => s.Mod3Count ?? 0))
                .ForMember(d => d.Mod6Interferences, opt => opt.MapFrom(s => s.Mod6Count ?? 0))
                .ForMember(d => d.OverInterferences10Db, opt => opt.MapFrom(s => s.Over10db ?? 0))
                .ForMember(d => d.OverInterferences6Db, opt => opt.MapFrom(s => s.Over6db ?? 0))
                .ForMember(d => d.Id, opt => opt.Ignore());
        }

        public static void MapAlarmStat()
        {
            Mapper.CreateMap<AlarmStat, AlarmView>()
                .ForMember(d => d.Position,
                    opt =>
                        opt.MapFrom(
                            s =>
                                s.SectorId == 255 || s.AlarmCategory == AlarmCategory.Huawei
                                    ? "基站级"
                                    : "Cell-" + s.SectorId))
                .ForMember(d => d.Duration, opt => opt.MapFrom(s => (s.RecoverTime - s.HappenTime).TotalMinutes))
                .ForMember(d => d.AlarmLevelDescription,
                    opt => opt.MapFrom(s => s.AlarmLevel.GetEnumDescription()))
                .ForMember(d => d.AlarmCategoryDescription,
                    opt => opt.MapFrom(s => s.AlarmCategory.GetEnumDescription()))
                .ForMember(d => d.AlarmTypeDescription, opt => opt.MapFrom(s => s.AlarmType.GetEnumDescription(WirelessPublic.AlarmTypeHuaweiList)));
            Mapper.CreateMap<AlarmStatCsv, AlarmStat>()
                .ForMember(d => d.AlarmLevel, opt => opt.MapFrom(s => s.AlarmLevelDescription.GetEnumType<AlarmLevel>()))
                .ForMember(d => d.AlarmCategory, opt => opt.MapFrom(s => s.AlarmCategoryDescription.GetEnumType<AlarmCategory>()))
                .ForMember(d => d.AlarmType, opt => opt.MapFrom(s => s.AlarmCodeDescription.GetEnumType<AlarmType>()))
                .ForMember(d => d.SectorId, opt => opt.MapFrom(s => s.ObjectId > 255 ? (byte)255 : (byte)s.ObjectId))
                .ForMember(d => d.RecoverTime,
                    opt =>
                        opt.MapFrom(
                            s => s.RecoverTime < new DateTime(2000, 1, 1) ? new DateTime(2200, 1, 1) : s.RecoverTime))
                .ForMember(d => d.AlarmId, opt => opt.MapFrom(s => s.AlarmId.ConvertToInt(0)));

            Mapper.CreateMap<AlarmStatHuawei, AlarmStat>()
                .ForMember(d => d.AlarmLevel, opt => opt.MapFrom(s => s.AlarmLevelDescription.GetEnumType<AlarmLevel>()))
                .ForMember(d => d.AlarmCategory, opt => opt.MapFrom(s => AlarmCategory.Huawei))
                .ForMember(d => d.AlarmType, opt => opt.MapFrom(s => s.AlarmCodeDescription.GetEnumType(WirelessPublic.AlarmTypeHuaweiList)))
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.ENodebIdString.ConvertToInt(0)))
                .ForMember(d => d.RecoverTime,
                    opt => opt.MapFrom(s => s.RecoverTime.ConvertToDateTime(new DateTime(2200, 1, 1))));
        }

        public static void MapTopKpi()
        {
            Mapper.CreateMap<TopDrop2GCell, TopDrop2GCellView>();
            Mapper.CreateMap<TopCellContainer<TopDrop2GCell>, TopDrop2GCellViewContainer>()
                .ForMember(d => d.TopDrop2GCellView,
                    opt => opt.MapFrom(s => Mapper.Map<TopDrop2GCell, TopDrop2GCellView>(s.TopCell)));
            Mapper.CreateMap<TopConnection3GCell, TopConnection3GCellView>();
            Mapper.CreateMap<TopCellContainer<TopConnection3GCell>, TopConnection3GCellViewContainer>()
                .ForMember(d => d.TopConnection3GCellView,
                    opt => opt.MapFrom(s => Mapper.Map<TopConnection3GCell, TopConnection3GCellView>(s.TopCell)));
            Mapper.CreateMap<TopDrop2GTrend, TopDrop2GTrendView>();
            Mapper.CreateMap<TopCellContainer<TopDrop2GTrend>, TopDrop2GTrendViewContainer>()
                .ForMember(d => d.TopDrop2GTrendView,
                    opt => opt.MapFrom(s => Mapper.Map<TopDrop2GTrend, TopDrop2GTrendView>(s.TopCell)))
                .ForMember(d => d.CellName, opt => opt.MapFrom(s => s.CdmaName + "-" + s.TopCell.SectorId))
                .ForMember(d => d.ENodebName, opt => opt.MapFrom(s => s.LteName));
            Mapper.CreateMap<TopConnection3GTrend, TopConnection3GTrendView>();
            Mapper.CreateMap<TopCellContainer<TopConnection3GTrend>, TopConnection3GTrendViewContainer>()
                .ForMember(d => d.TopConnection3GTrendView,
                    opt => opt.MapFrom(s => Mapper.Map<TopConnection3GTrend, TopConnection3GTrendView>(s.TopCell)))
                .ForMember(d => d.CellName, opt => opt.MapFrom(s => s.CdmaName + "-" + s.TopCell.SectorId))
                .ForMember(d => d.ENodebName, opt => opt.MapFrom(s => s.LteName));
            Mapper.CreateMap<TopConnection3GCellExcel, TopConnection3GCell>()
                .ForMember(d => d.StatTime, opt => opt.MapFrom(s => s.StatDate.AddHours(s.StatHour)))
                .ForMember(d => d.CellId,
                    opt => opt.MapFrom(s => s.CellName.GetSubStringInFirstPairOfChars('[', ']').ConvertToInt(1)));
            Mapper.CreateMap<TopDrop2GCellExcel, TopDrop2GCell>()
                .ForMember(d => d.StatTime, opt => opt.MapFrom(s => s.StatDate.AddHours(s.StatHour)))
                .ForMember(d => d.CellId,
                    opt => opt.MapFrom(s => s.CellName.GetSubStringInFirstPairOfChars('[', ']').ConvertToInt(1)));
        }

        public static void MapWorkItem()
        {
            Mapper.CreateMap<WorkItem, WorkItemView>()
                .ForMember(d => d.WorkItemCause, opt => opt.MapFrom(s => s.Cause.GetWorkItemCauseDescription()))
                .ForMember(d => d.WorkItemState, opt => opt.MapFrom(s => s.State.GetWorkItemStateDescription()))
                .ForMember(d => d.WorkItemType, opt => opt.MapFrom(s => s.Type.GetWorkItemTypeDescription()))
                .ForMember(d => d.WorkItemSubType, opt => opt.MapFrom(s => s.Subtype.GetWorkItemSubtypeDescription()));
            Mapper.CreateMap<WorkItemExcel, WorkItem>()
                .ConvertUsing<WorkItemConverter>();
        }

        public static void MapDtItems()
        {
            Mapper.CreateMap<FileRecord2G, FileRecordCoverage2G>()
                .ForMember(d => d.Longtitute, opt => opt.MapFrom(s => s.Longtitute ?? -1))
                .ForMember(d => d.Lattitute, opt => opt.MapFrom(s => s.Lattitute ?? -1))
                .ForMember(d => d.Ecio, opt => opt.MapFrom(s => s.Ecio ?? 0))
                .ForMember(d => d.RxAgc, opt => opt.MapFrom(s => s.RxAgc ?? 0))
                .ForMember(d => d.TxPower, opt => opt.MapFrom(s => s.TxPower ?? 0));
            Mapper.CreateMap<FileRecord3G, FileRecordCoverage3G>()
                .ForMember(d => d.Longtitute, opt => opt.MapFrom(s => s.Longtitute ?? -1))
                .ForMember(d => d.Lattitute, opt => opt.MapFrom(s => s.Lattitute ?? -1))
                .ForMember(d => d.RxAgc0, opt => opt.MapFrom(s => s.RxAgc0 ?? 0))
                .ForMember(d => d.RxAgc1, opt => opt.MapFrom(s => s.RxAgc1 ?? 0))
                .ForMember(d => d.Sinr, opt => opt.MapFrom(s => s.Sinr ?? 0));
            Mapper.CreateMap<FileRecord4G, FileRecordCoverage4G>()
                .ForMember(d => d.Longtitute, opt => opt.MapFrom(s => s.Longtitute ?? -1))
                .ForMember(d => d.Lattitute, opt => opt.MapFrom(s => s.Lattitute ?? -1))
                .ForMember(d => d.Rsrp, opt => opt.MapFrom(s => s.Rsrp ?? 0))
                .ForMember(d => d.Sinr, opt => opt.MapFrom(s => s.Sinr ?? 0));
        }
    }
}
