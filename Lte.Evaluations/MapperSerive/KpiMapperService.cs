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
using Lte.Parameters.Entities.Dt;
using Lte.Parameters.Entities.ExcelCsv;
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.Entities.Mr;
using Lte.Parameters.Entities.Work;
using Lte.Parameters.MockOperations;

namespace Lte.Evaluations.MapperSerive
{
    public static class KpiMapperService
    {
        public static void MapPreciseStat()
        {
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
        
        public static void MapTopKpi()
        {
            Mapper.CreateMap<TopCellContainer<TopDrop2GCell>, TopDrop2GCellViewContainer>()
                .ForMember(d => d.TopDrop2GCellView,
                    opt => opt.MapFrom(s => Mapper.Map<TopDrop2GCell, TopDrop2GCellView>(s.TopCell)));
            Mapper.CreateMap<TopCellContainer<TopConnection3GCell>, TopConnection3GCellViewContainer>()
                .ForMember(d => d.TopConnection3GCellView,
                    opt => opt.MapFrom(s => Mapper.Map<TopConnection3GCell, TopConnection3GCellView>(s.TopCell)));
            Mapper.CreateMap<TopCellContainer<TopDrop2GTrend>, TopDrop2GTrendViewContainer>()
                .ForMember(d => d.TopDrop2GTrendView,
                    opt => opt.MapFrom(s => Mapper.Map<TopDrop2GTrend, TopDrop2GTrendView>(s.TopCell)))
                .ForMember(d => d.CellName, opt => opt.MapFrom(s => s.CdmaName + "-" + s.TopCell.SectorId))
                .ForMember(d => d.ENodebName, opt => opt.MapFrom(s => s.LteName));
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
            Mapper.CreateMap<TopConnection2GExcel, TopConnection2GCell>()
                .ForMember(d => d.StatTime, opt => opt.MapFrom(s => s.StatDate.AddHours(s.StatHour)))
                .ForMember(d => d.CellId,
                    opt => opt.MapFrom(s => s.CellName.GetSubStringInFirstPairOfChars('[', ']').ConvertToInt(1)));
        }

        public static void MapWorkItem()
        {
            Mapper.CreateMap<WorkItem, WorkItemView>()
                .ForMember(d => d.WorkItemCause, opt => opt.MapFrom(s => s.Cause.GetEnumDescription()))
                .ForMember(d => d.WorkItemState, opt => opt.MapFrom(s => s.State.GetEnumDescription()))
                .ForMember(d => d.WorkItemType, opt => opt.MapFrom(s => s.Type.GetEnumDescription()))
                .ForMember(d => d.WorkItemSubType, opt => opt.MapFrom(s => s.Subtype.GetEnumDescription()));
            Mapper.CreateMap<WorkItemExcel, WorkItem>()
                .ConvertUsing<WorkItemConverter>();
        }
    }
}
