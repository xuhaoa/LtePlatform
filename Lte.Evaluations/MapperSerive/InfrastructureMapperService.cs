using System;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Evaluations.ViewModels.Channel;
using Lte.Evaluations.ViewModels.Mr;
using Lte.Evaluations.ViewModels.Switch;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Channel;
using Lte.Parameters.Entities.ExcelCsv;
using Lte.Parameters.Entities.Neighbor;
using Lte.Parameters.Entities.Switch;

namespace Lte.Evaluations.MapperSerive
{
    public static class InfrastructureMapperService
    {
        public static void MapCdmaCell()
        {
            Mapper.CreateMap<CdmaCell, CdmaCellView>()
                .ForMember(d => d.Indoor, opt => opt.MapFrom(s => s.IsOutdoor ? "室外" : "室内"))
                .ForMember(d => d.DownTilt, opt => opt.MapFrom(s => s.ETilt + s.MTilt));
            Mapper.CreateMap<CdmaCell, CdmaCompoundCellView>()
                .ForMember(d => d.Indoor, opt => opt.MapFrom(s => s.IsOutdoor ? "室外" : "室内"))
                .ForMember(d => d.DownTilt, opt => opt.MapFrom(s => s.ETilt + s.MTilt));
        }

        public static void MapCell()
        {
            Mapper.CreateMap<Cell, CellView>()
                .ForMember(d => d.Indoor, opt => opt.MapFrom(s => s.IsOutdoor ? "室外" : "室内"))
                .ForMember(d => d.DownTilt, opt => opt.MapFrom(s => s.ETilt + s.MTilt));
            Mapper.CreateMap<Cell, PciCell>();
            Mapper.CreateMap<NearestPciCell, NearestPciCellView>();
        }

        public static void MapDumpConatainers()
        {
            Mapper.CreateMap<ENodebExcelWithTownIdContainer, ENodebWithTownIdContainer>()
                .ForMember(d => d.ENodeb, opt => opt.MapFrom(s => Mapper.Map<ENodebExcel, ENodeb>(s.ENodebExcel)));
            Mapper.CreateMap<BtsExcelWithTownIdContainer, BtsWithTownIdContainer>()
                .ForMember(d => d.CdmaBts, opt => opt.MapFrom(s => Mapper.Map<BtsExcel, CdmaBts>(s.BtsExcel)));
            Mapper.CreateMap<CellExcel, ENodebBtsIdPair>()
                .ForMember(d => d.BtsId, opt => opt.MapFrom(s =>
                    s.ShareCdmaInfo.Split('_').Length > 2 ? s.ShareCdmaInfo.Split('_')[1].ConvertToInt(-1) : -1));
        }

        public static void MapCustomerEntities()
        {
            Mapper.CreateMap<EmergencyCommunicationDto, EmergencyCommunication>()
                .ForMember(d => d.DemandLevel,
                    opt => opt.MapFrom(s => s.DemandLevelDescription.GetEnumType<DemandLevel>()))
                .ForMember(d => d.VehicleType,
                    opt => opt.MapFrom(s => s.VehicularTypeDescription.GetEnumType<VehicleType>()))
                .ForMember(d => d.ContactPerson, opt => opt.MapFrom(s => s.Person + "(" + s.Phone + ")"))
                .ForMember(d => d.Description,
                    opt => opt.MapFrom(s => "[" + s.VehicleLocation + "]" + s.OtherDescription))
                .ForMember(d => d.EmergencyState,
                    opt => opt.MapFrom(s => s.CurrentStateDescription.GetEnumType<EmergencyState>()));
            Mapper.CreateMap<VipDemand, VipDemandDto>()
                .ForMember(d => d.DemandLevelDescription, opt => opt.MapFrom(s => s.DemandLevel.GetEnumDescription()))
                .ForMember(d => d.NetworkTypeDescription, opt => opt.MapFrom(s => s.NetworkType.GetEnumDescription()))
                .ForMember(d => d.IsFinished, opt => opt.MapFrom(s => s.FinishTime != null))
                .ForMember(d => d.IsInfoComplete,
                    opt =>
                        opt.MapFrom(
                            s =>
                                !string.IsNullOrEmpty(s.Area) && !string.IsNullOrEmpty(s.ContactPerson) &&
                                !string.IsNullOrEmpty(s.PhoneNumber) && s.TownId > 0))
                .ForMember(d => d.MarketThemeDescription, opt => opt.MapFrom(s => s.MarketTheme.GetEnumDescription()))
                .ForMember(d => d.CurrentStateDescription, opt => opt.MapFrom(s => s.VipState.GetEnumDescription()));
            Mapper.CreateMap<ComplainExcel, ComplainItem>()
                .ForMember(d => d.ComplainSource,
                    opt => opt.MapFrom(s => s.SourceDescription.GetEnumType<ComplainSource>()))
                .ForMember(d => d.District,
                    opt => opt.MapFrom(s => s.Grid.StartsWith("FS") ? s.Grid.Substring(2) : s.CandidateDistrict))
                .ForMember(d => d.ComplainReason, opt => opt.MapFrom(s => s.ReasonFirst.GetEnumType<ComplainReason>()))
                .ForMember(d => d.ComplainSubReason,
                    opt => opt.MapFrom(s => s.ReasonSecond.GetEnumType<ComplainSubReason>()))
                .ForMember(d => d.NetworkType, opt => opt.MapFrom(s => s.NetworkDescription.GetEnumType<NetworkType>()))
                .ForMember(d => d.ComplainScene, opt => opt.MapFrom(s => s.Scene.GetEnumType<ComplainScene>()))
                .ForMember(d => d.ComplainCategory,
                    opt => opt.MapFrom(s => s.CategoryDescription.GetEnumType<ComplainCategory>()))
                .ForMember(d => d.IsIndoor, opt => opt.MapFrom(s => s.IndoorDescription == "室内"))
                .ForMember(d => d.SitePosition,
                    opt => opt.MapFrom(s => string.IsNullOrEmpty(s.Site) ? s.Position : s.Site));
            Mapper.CreateMap<BranchDemandExcel, BranchDemand>()
                .ForMember(d => d.SolveFunction,
                    opt => opt.MapFrom(s => s.SolveFunctionDescription.GetEnumType<SolveFunction>()))
                .ForMember(d => d.IsSolved, opt => opt.MapFrom(s => s.IsSolvedDescription == "是"))
                .ForMember(d => d.ProcessContents, opt => opt.MapFrom(s => "[" + DateTime.Now + "]" + s.FirstContents));
            Mapper.CreateMap<BranchDemand, BranchDemandDto>()
                .ForMember(d => d.SolveFunctionDescription,
                    opt => opt.MapFrom(s => s.SolveFunction.GetEnumDescription()))
                .ForMember(d => d.IsSolvedDescription, opt => opt.MapFrom(s => s.IsSolved ? "是" : "否"));
            Mapper.CreateMap<BranchDemandDto, BranchDemand>()
                .ForMember(d => d.SolveFunction,
                    opt => opt.MapFrom(s => s.SolveFunctionDescription.GetEnumType<SolveFunction>()))
                .ForMember(d => d.IsSolved, opt => opt.MapFrom(s => s.IsSolvedDescription == "是"));
            Mapper.CreateMap<OnlineSustainExcel, OnlineSustain>()
                .ForMember(d => d.ComplainCategory,
                    opt => opt.MapFrom(s => s.ComplainCategoryDescription.GetEnumType<ComplainCategory>()))
                .ForMember(d => d.IsPreProcessed, opt => opt.MapFrom(s => s.PreProcessString == "是"));
            Mapper.CreateMap<OnlineSustain, OnlineSustainDto>()
                .ForMember(d => d.ComplainCategoryDescription,
                    opt => opt.MapFrom(s => s.ComplainCategory.GetEnumDescription()))
                .ForMember(d => d.IsPreProcessedDescription, opt => opt.MapFrom(s => s.IsPreProcessed ? "是" : "否"));
            Mapper.CreateMap<OnlineSustainDto, OnlineSustain>()
                .ForMember(d => d.ComplainCategory,
                    opt => opt.MapFrom(s => s.ComplainCategoryDescription.GetEnumType<ComplainCategory>()))
                .ForMember(d => d.IsPreProcessed, opt => opt.MapFrom(s => s.IsPreProcessedDescription == "是"));
        }
    }
}
