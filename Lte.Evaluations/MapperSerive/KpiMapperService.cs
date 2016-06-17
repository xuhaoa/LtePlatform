using System;
using AutoMapper;
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
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.Entities.Work;

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
                    opt => opt.MapFrom(s => s.AlarmLevel.GetAlarmLevelDescription()))
                .ForMember(d => d.AlarmCategoryDescription,
                    opt => opt.MapFrom(s => s.AlarmCategory.GetAlarmCategoryDescription()))
                .ForMember(d => d.AlarmTypeDescription, opt => opt.MapFrom(s => s.AlarmType.GetAlarmTypeDescription()));
            Mapper.CreateMap<AlarmStatCsv, AlarmStat>()
                .ForMember(d => d.AlarmLevel, opt => opt.MapFrom(s => s.AlarmLevelDescription.GetAlarmLevel()))
                .ForMember(d => d.AlarmCategory, opt => opt.MapFrom(s => s.AlarmCategoryDescription.GetCategory()))
                .ForMember(d => d.AlarmType, opt => opt.MapFrom(s => s.AlarmCodeDescription.GetAlarmType()))
                .ForMember(d => d.SectorId, opt => opt.MapFrom(s => s.ObjectId > 255 ? (byte)255 : (byte)s.ObjectId))
                .ForMember(d => d.RecoverTime,
                    opt =>
                        opt.MapFrom(
                            s => s.RecoverTime < new DateTime(2000, 1, 1) ? new DateTime(2200, 1, 1) : s.RecoverTime))
                .ForMember(d => d.AlarmId, opt => opt.MapFrom(s => s.AlarmId.ConvertToInt(0)));

            Mapper.CreateMap<AlarmStatHuawei, AlarmStat>()
                .ForMember(d => d.AlarmLevel, opt => opt.MapFrom(s => s.AlarmLevelDescription.GetAlarmLevel()))
                .ForMember(d => d.AlarmCategory, opt => opt.MapFrom(s => AlarmCategory.Huawei))
                .ForMember(d => d.AlarmType, opt => opt.MapFrom(s => s.AlarmCodeDescription.GetAlarmHuawei()))
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
        }

        public static void MapWorkItem()
        {
            Mapper.CreateMap<WorkItem, WorkItemView>()
                .ForMember(d => d.WorkItemCause, opt => opt.MapFrom(s => s.Cause.GetWorkItemCauseDescription()))
                .ForMember(d => d.WorkItemState, opt => opt.MapFrom(s => s.State.GetWorkItemStateDescription()))
                .ForMember(d => d.WorkItemType, opt => opt.MapFrom(s => s.Type.GetWorkItemTypeDescription()))
                .ForMember(d => d.WorkItemSubType, opt => opt.MapFrom(s => s.Subtype.GetWorkItemSubtypeDescription()));
        }
    }
}
