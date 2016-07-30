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
            
            Mapper.CreateMap<PowerControlULZte, CellOpenLoopPcView>()
                .ForMember(d => d.P0NominalPUCCH, opt => opt.MapFrom(s => s.poNominalPUCCH))
                .ForMember(d => d.P0NominalPUSCH, opt => opt.MapFrom(s => s.p0NominalPUSCH))
                .ForMember(d => d.PassLossCoeff, opt => opt.MapFrom(s => s.alpha))
                .ForMember(d => d.DeltaFPUCCHFormat1, opt => opt.MapFrom(s => s.deltaFPucchFormat1))
                .ForMember(d => d.DeltaFPUCCHFormat1b, opt => opt.MapFrom(s => s.deltaFPucchFormat1b))
                .ForMember(d => d.DeltaFPUCCHFormat2, opt => opt.MapFrom(s => s.deltaFPucchFormat2))
                .ForMember(d => d.DeltaFPUCCHFormat2a, opt => opt.MapFrom(s => s.deltaFPucchFormat2a))
                .ForMember(d => d.DeltaFPUCCHFormat2b, opt => opt.MapFrom(s => s.deltaFPucchFormat2b))
                .ForMember(d => d.DeltaMsg2, opt => opt.MapFrom(s => s.deltaMsg3))
                .ForMember(d => d.DeltaPreambleMsg3, opt => opt.MapFrom(s => s.deltaPreambleMsg3));
        }

        public static void MapHoParametersService()
        {
            Mapper.CreateMap<IntraRatHoComm, ENodebIntraFreqHoView>()
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.eNodeB_Id))
                .ForMember(d => d.ReportInterval, opt => opt.MapFrom(s => s.IntraFreqHoRprtInterval))
                .ForMember(d => d.ReportAmount, opt => opt.MapFrom(s => s.IntraFreqHoRprtInterval))
                .ForMember(d => d.MaxReportCellNum, opt => opt.MapFrom(s => s.IntraRatHoMaxRprtCell))
                .ForMember(d => d.TriggerQuantity, opt => opt.MapFrom(s => s.IntraFreqHoA3TrigQuan))
                .ForMember(d => d.ReportQuantity, opt => opt.MapFrom(s => s.IntraFreqHoA3RprtQuan));

            Mapper.CreateMap<UeEUtranMeasurementZte, ENodebIntraFreqHoView>()
                .ForMember(d=>d.ENodebId, opt=>opt.MapFrom(s=>s.eNodeB_Id))
                .ForMember(d=>d.ReportInterval, opt=>opt.MapFrom(s=>s.reportInterval))
                .ForMember(d => d.ReportAmount, opt => opt.MapFrom(s => s.reportAmount))
                .ForMember(d => d.MaxReportCellNum, opt => opt.MapFrom(s => s.maxReportCellNum))
                .ForMember(d => d.TriggerQuantity, opt => opt.MapFrom(s => s.triggerQuantity))
                .ForMember(d => d.ReportQuantity, opt => opt.MapFrom(s => s.reportQuantity));

            Mapper.CreateMap<IntraFreqHoGroup, CellIntraFreqHoView>()
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.eNodeB_Id))
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.IntraFreqHoA3Hyst))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.IntraFreqHoA3TimeToTrig))
                .ForMember(d => d.A3Offset, opt => opt.MapFrom(s => s.IntraFreqHoA3Offset));
            
            Mapper.CreateMap<UeEUtranMeasurementZte, CellIntraFreqHoView>()
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.eNodeB_Id))
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.hysteresis * 2))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.timeToTrigger))
                .ForMember(d => d.A3Offset, opt => opt.MapFrom(s => s.a3Offset * 2));
            
            Mapper.CreateMap<IntraRatHoComm, ENodebInterFreqHoView>()
                .ForMember(d => d.ENodebId, opt => opt.MapFrom(s => s.eNodeB_Id))
                .ForMember(d => d.InterFreqHoA4RprtQuan, opt => opt.MapFrom(s => s.InterFreqHoA4RprtQuan))
                .ForMember(d => d.InterFreqHoA4TrigQuan, opt => opt.MapFrom(s => s.InterFreqHoA4TrigQuan))
                .ForMember(d => d.InterFreqHoA1TrigQuan, opt => opt.MapFrom(s => s.InterFreqHoA1A2TrigQuan))
                .ForMember(d => d.InterFreqHoA2TrigQuan, opt => opt.MapFrom(s => s.InterFreqHoA1A2TrigQuan))
                .ForMember(d => d.A3InterFreqHoA1TrigQuan, opt => opt.MapFrom(s => s.A3InterFreqHoA1A2TrigQuan))
                .ForMember(d => d.A3InterFreqHoA2TrigQuan, opt => opt.MapFrom(s => s.A3InterFreqHoA1A2TrigQuan))
                .ForMember(d => d.InterFreqHoRprtInterval, opt => opt.MapFrom(s => s.InterFreqHoRprtInterval));

            Mapper.CreateMap<UeEUtranMeasurementZte, InterFreqEventA1>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.hysteresis))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.timeToTrigger))
                .ForMember(d => d.ThresholdOfRsrp, opt => opt.MapFrom(s => s.thresholdOfRSRP))
                .ForMember(d => d.ThresholdOfRsrq, opt => opt.MapFrom(s => s.thresholdOfRSRQ));

            Mapper.CreateMap<UeEUtranMeasurementZte, InterFreqEventA2>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.hysteresis))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.timeToTrigger))
                .ForMember(d => d.ThresholdOfRsrp, opt => opt.MapFrom(s => s.thresholdOfRSRP))
                .ForMember(d => d.ThresholdOfRsrq, opt => opt.MapFrom(s => s.thresholdOfRSRQ));

            Mapper.CreateMap<UeEUtranMeasurementZte, InterFreqEventA3>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.hysteresis))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.timeToTrigger))
                .ForMember(d => d.A3Offset, opt => opt.MapFrom(s => s.a3Offset));

            Mapper.CreateMap<UeEUtranMeasurementZte, InterFreqEventA4>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.hysteresis))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.timeToTrigger))
                .ForMember(d => d.ThresholdOfRsrp, opt => opt.MapFrom(s => s.thresholdOfRSRP))
                .ForMember(d => d.ThresholdOfRsrq, opt => opt.MapFrom(s => s.thresholdOfRSRQ));

            Mapper.CreateMap<UeEUtranMeasurementZte, InterFreqEventA5>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.hysteresis))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.timeToTrigger))
                .ForMember(d => d.ThresholdOfRsrp, opt => opt.MapFrom(s => s.thresholdOfRSRP))
                .ForMember(d => d.ThresholdOfRsrq, opt => opt.MapFrom(s => s.thresholdOfRSRQ))
                .ForMember(d => d.Threshold2OfRsrp, opt => opt.MapFrom(s => s.a5Threshold2OfRSRP))
                .ForMember(d => d.Threshold2OfRsrq, opt => opt.MapFrom(s => s.a5Threshold2OfRSRQ));

            Mapper.CreateMap<InterFreqHoGroup, InterFreqEventA1>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.InterFreqHoA1A2Hyst))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.InterFreqHoA1A2TimeToTrig));

            Mapper.CreateMap<InterFreqHoGroup, InterFreqEventA2>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.InterFreqHoA1A2Hyst))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.InterFreqHoA1A2TimeToTrig));

            Mapper.CreateMap<InterFreqHoGroup, InterFreqEventA3>()
                .ForMember(d => d.A3Offset, opt => opt.MapFrom(s => s.InterFreqHoA3Offset));

            Mapper.CreateMap<InterFreqHoGroup, InterFreqEventA4>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.InterFreqHoA4Hyst))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.InterFreqHoA4TimeToTrig))
                .ForMember(d => d.ThresholdOfRsrp, opt => opt.MapFrom(s => s.InterFreqHoA4ThdRsrp))
                .ForMember(d => d.ThresholdOfRsrq, opt => opt.MapFrom(s => s.InterFreqHoA4ThdRsrq));

            Mapper.CreateMap<InterFreqHoGroup, InterFreqEventA5>()
                .ForMember(d => d.Hysteresis, opt => opt.MapFrom(s => s.InterFreqHoA4Hyst))
                .ForMember(d => d.TimeToTrigger, opt => opt.MapFrom(s => s.InterFreqHoA4TimeToTrig))
                .ForMember(d => d.ThresholdOfRsrp, opt => opt.MapFrom(s => s.InterFreqHoA4ThdRsrp))
                .ForMember(d => d.ThresholdOfRsrq, opt => opt.MapFrom(s => s.InterFreqHoA4ThdRsrq))
                .ForMember(d => d.Threshold2OfRsrp, opt => opt.MapFrom(s => s.InterFreqHoA5Thd1Rsrp))
                .ForMember(d => d.Threshold2OfRsrq, opt => opt.MapFrom(s => s.InterFreqHoA5Thd1Rsrq));
            
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
            Mapper.CreateMap<EmergencyCommunication, EmergencyCommunicationDto>()
                .ForMember(d => d.DemandLevelDescription, opt => opt.MapFrom(s => s.DemandLevel.GetEnumDescription()))
                .ForMember(d => d.VehicularTypeDescription, opt => opt.MapFrom(s => s.VehicleType.GetEnumDescription()))
                .ForMember(d => d.Person,
                    opt => opt.MapFrom(s => s.ContactPerson.GetSplittedFields(new[] {'(', ')'})[0]))
                .ForMember(d => d.Phone, opt => opt.MapFrom(s => s.ContactPerson.GetSplittedFields(new[] {'(', ')'})[1]))
                .ForMember(d => d.VehicleLocation,
                    opt => opt.MapFrom(s => s.Description.GetSplittedFields(new[] {'[', ']'})[0]))
                .ForMember(d => d.OtherDescription,
                    opt => opt.MapFrom(s => s.Description.GetSplittedFields(new[] {'[', ']'})[1]))
                .ForMember(d => d.CurrentStateDescription,
                    opt => opt.MapFrom(s => s.EmergencyState.GetEnumDescription()));
            Mapper.CreateMap<VipDemandExcel, VipDemand>()
                .ForMember(d => d.DemandLevel,
                    opt => opt.MapFrom(s => s.DemandLevelDescription.GetEnumType<DemandLevel>()))
                .ForMember(d => d.NetworkType,
                    opt => opt.MapFrom(s => s.NetworkTypeDescription.GetEnumType<NetworkType>()));
            Mapper.CreateMap<VipDemandDto, VipDemand>()
                .ForMember(d => d.DemandLevel,
                    opt => opt.MapFrom(s => s.DemandLevelDescription.GetEnumType<DemandLevel>()))
                .ForMember(d => d.NetworkType,
                    opt => opt.MapFrom(s => s.NetworkTypeDescription.GetEnumType<NetworkType>()))
                .ForMember(d => d.MarketTheme,
                    opt => opt.MapFrom(s => s.MarketThemeDescription.GetEnumType<MarketTheme>()))
                .ForMember(d => d.FinishTime, opt => opt.MapFrom(s => DateTime.Now))
                .ForMember(d => d.VipState, opt => opt.MapFrom(s => s.CurrentStateDescription.GetEnumType<VipState>()));
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
            Mapper.CreateMap<EmergencyProcess, EmergencyProcessDto>()
                .ForMember(d => d.ProcessStateDescription,
                    opt => opt.MapFrom(s => s.ProcessState.GetEnumDescription()));
            Mapper.CreateMap<EmergencyProcessDto, EmergencyProcess>()
                .ForMember(d => d.ProcessState,
                    opt => opt.MapFrom(s => s.ProcessStateDescription.GetEnumType<EmergencyState>()));
            Mapper.CreateMap<VipProcess, VipProcessDto>()
                .ForMember(d => d.VipStateDescription, opt => opt.MapFrom(s => s.VipState.GetEnumDescription()));
            Mapper.CreateMap<VipProcessDto, VipProcess>()
                .ForMember(d => d.VipState, opt => opt.MapFrom(s => s.VipStateDescription.GetEnumType<VipState>()));
            Mapper.CreateMap<ComplainProcess, ComplainProcessDto>()
                .ForMember(d => d.ComplainStateDescription,
                    opt => opt.MapFrom(s => s.ComplainState.GetEnumDescription()));
            Mapper.CreateMap<ComplainProcessDto, ComplainProcess>()
                .ForMember(d => d.ComplainState,
                    opt => opt.MapFrom(s => s.ComplainStateDescription.GetEnumType<ComplainState>()));
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
            Mapper.CreateMap<ComplainItem, ComplainDto>()
                .ForMember(d => d.ComplainSourceDescription,
                    opt => opt.MapFrom(s => s.ComplainSource.GetEnumDescription()))
                .ForMember(d => d.ComplainReasonDescription,
                    opt => opt.MapFrom(s => s.ComplainReason.GetEnumDescription()))
                .ForMember(d => d.ComplainSubReasonDescription,
                    opt => opt.MapFrom(s => s.ComplainSubReason.GetEnumDescription()))
                .ForMember(d => d.NetworkTypeDescription, opt => opt.MapFrom(s => s.NetworkType.GetEnumDescription()))
                .ForMember(d => d.ComplainSceneDescription,
                    opt => opt.MapFrom(s => s.ComplainScene.GetEnumDescription()))
                .ForMember(d => d.IsIndoorDescription, opt => opt.MapFrom(s => s.IsIndoor ? "室内" : "室外"))
                .ForMember(d => d.CurrentStateDescription,
                    opt => opt.MapFrom(s => s.ComplainState.GetEnumDescription()))
                .ForMember(d => d.ComplainCategoryDescription,
                    opt => opt.MapFrom(s => s.ComplainCategory.GetEnumDescription()));
            Mapper.CreateMap<ComplainDto, ComplainItem>()
                .ForMember(d => d.ComplainSource,
                    opt => opt.MapFrom(s => s.ComplainSourceDescription.GetEnumType<ComplainSource>()))
                .ForMember(d => d.ComplainReason,
                    opt => opt.MapFrom(s => s.ComplainReasonDescription.GetEnumType<ComplainReason>()))
                .ForMember(d => d.ComplainSubReason,
                    opt => opt.MapFrom(s => s.ComplainSubReasonDescription.GetEnumType<ComplainSubReason>()))
                .ForMember(d => d.NetworkType,
                    opt => opt.MapFrom(s => s.NetworkTypeDescription.GetEnumType<NetworkType>()))
                .ForMember(d => d.ComplainScene,
                    opt => opt.MapFrom(s => s.ComplainSceneDescription.GetEnumType<ComplainScene>()))
                .ForMember(d => d.ComplainCategory,
                    opt => opt.MapFrom(s => s.ComplainCategoryDescription.GetEnumType<ComplainCategory>()))
                .ForMember(d => d.IsIndoor, opt => opt.MapFrom(s => s.IsIndoorDescription == "室内"))
                .ForMember(d => d.ComplainState,
                    opt => opt.MapFrom(s => s.CurrentStateDescription.GetEnumType<ComplainState>()));
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
