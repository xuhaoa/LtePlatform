using Abp.EntityFramework;
using Lte.Evaluations.DataService;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.DataService.Dump;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.DataService.Mr;
using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Concrete;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Abstract.Switch;
using Lte.Parameters.Concrete;
using Lte.Parameters.Concrete.Basic;
using Lte.Parameters.Concrete.Channel;
using Lte.Parameters.Concrete.College;
using Lte.Parameters.Concrete.Infrastructure;
using Lte.Parameters.Concrete.Kpi;
using Lte.Parameters.Concrete.Neighbor;
using Lte.Parameters.Concrete.Switch;
using Ninject;

namespace LtePlatform
{
    public static class KernelBindingOpertions
    {
        public static void AddBindings(this IKernel ninjectKernel)
        {
            ninjectKernel.Bind<EFParametersContext>().ToSelf();

            ninjectKernel.Bind<IDbContextProvider<EFParametersContext>>()
                .To<SimpleDbContextProvider<EFParametersContext>>();

            ninjectKernel.Bind<MySqlContext>().ToSelf();

            ninjectKernel.Bind<IDbContextProvider<MySqlContext>>().To<SimpleDbContextProvider<MySqlContext>>();

            ninjectKernel.Bind<ITownRepository>().To<EFTownRepository>();

            ninjectKernel.Bind<ICdmaRegionStatRepository>().To<EFCdmaRegionStatRepository>();

            ninjectKernel.Bind<IRegionRepository>().To<EFRegionRepository>();

            ninjectKernel.Bind<ICollegeRepository>().To<EFCollegeRepository>();

            ninjectKernel.Bind<IInfrastructureRepository>().To<EFInfrastructureRepository>();

            ninjectKernel.Bind<IAlarmRepository>().To<EFAlarmRepository>();

            ninjectKernel.Bind<ICollege3GTestRepository>().To<EFCollege3GTestRepository>();

            ninjectKernel.Bind<ICollege4GTestRepository>().To<EFCollege4GTestRepository>();

            ninjectKernel.Bind<ICollegeKpiRepository>().To<EFCollegeKpiRepository>();

            ninjectKernel.Bind<IENodebRepository>().To<EFENodebRepository>();

            ninjectKernel.Bind<IBtsRepository>().To<EFBtsRepository>();

            ninjectKernel.Bind<ICellRepository>().To<EFCellRepository>();

            ninjectKernel.Bind<ICdmaCellRepository>().To<EFCdmaCellRepository>();

            ninjectKernel.Bind<IIndoorDistributionRepository>().To<EFIndoorDistributionRepository>();

            ninjectKernel.Bind<IPreciseCoverage4GRepository>().To<EFPreciseCoverage4GRepository>();

            ninjectKernel.Bind<IPreciseMongoRepository>().To<PreciseMongoRepository>();

            ninjectKernel.Bind<ITopDrop2GCellRepository>().To<EFTopDrop2GCellRepository>();

            ninjectKernel.Bind<ITopConnection3GRepository>().To<EFTopConnection3GRepository>();

            ninjectKernel.Bind<ITopConnection2GRepository>().To<EFTopConnection2GRepository>();

            ninjectKernel.Bind<ITownPreciseCoverage4GStatRepository>().To<EFTownPreciseCoverage4GStatRepository>();

            ninjectKernel.Bind<IAreaTestDateRepository>().To<MasterAreaTestDateDateRepository>();

            ninjectKernel.Bind<ICsvFileInfoRepository>().To<MasterCsvFileInfoRepository>();

            ninjectKernel.Bind<IRasterInfoRepository>().To<MasterRasterInfoRepository>();

            ninjectKernel.Bind<ILteNeighborCellRepository>().To<EFLteNeighborCellRepository>();

            ninjectKernel.Bind<INearestPciCellRepository>().To<EFNearestPciCellRepository>();

            ninjectKernel.Bind<IWorkItemRepository>().To<EFWorkItemRepository>();

            ninjectKernel.Bind<IInterferenceMatrixRepository>().To<EFInterferenceMatrixRepository>();

            ninjectKernel.Bind<IInterferenceMongoRepository>().To<InterferenceMongoRepository>();

            ninjectKernel.Bind<ICellHuaweiMongoRepository>().To<CellHuaweiMongoRepository>();

            ninjectKernel.Bind<ICellMeasGroupZteRepository>().To<CellMeasGroupZteRepository>();

            ninjectKernel.Bind<IUeEUtranMeasurementRepository>().To<UeEUtranMeasurementRepository>();

            ninjectKernel.Bind<IIntraFreqHoGroupRepository>().To<IntraFreqHoGroupRepository>();

            ninjectKernel.Bind<IIntraRatHoCommRepository>().To<IntraRatHoCommRepository>();

            ninjectKernel.Bind<IInterRatHoCommRepository>().To<InterRatHoCommRepository>();

            ninjectKernel.Bind<IEutranInterNFreqRepository>().To<EutranInterNFreqRepository>();

            ninjectKernel.Bind<IInterFreqHoGroupRepository>().To<InterFreqHoGroupRepository>();

            ninjectKernel.Bind<IEUtranRelationZteRepository>().To<EUtranRelationZteRepository>();

            ninjectKernel.Bind<IEutranIntraFreqNCellRepository>().To<EutranIntraFreqNCellRepository>();

            ninjectKernel.Bind<IEutranInterFreqNCellRepository>().To<EutranInterFreqNCellRepository>();

            ninjectKernel.Bind<IExternalEUtranCellFDDZteRepository>().To<ExternalEUtranCellFDDZteRepository>();

            ninjectKernel.Bind<IEUtranCellMeasurementZteRepository>().To<EUtranCellMeasurementZteRepository>();

            ninjectKernel.Bind<IEUtranCellFDDZteRepository>().To<EUtranCellFDDZteRepository>();

            ninjectKernel.Bind<IPrachFDDZteRepository>().To<PrachFDDZteRepository>();

            ninjectKernel.Bind<IPowerControlDLZteRepository>().To<PowerControlDLZteRepository>();
            
            ninjectKernel.Bind<IPDSCHCfgRepository>().To<PDSCHCfgRepository>();

            ninjectKernel.Bind<ICellDlpcPdschPaRepository>().To<CellDlpcPdschPaRepository>();

            ninjectKernel.Bind<IFlowHuaweiRepository>().To<FlowHuaweiRepository>();

            ninjectKernel.Bind<IFlowZteRepository>().To<FlowZteRepository>();
            
            ninjectKernel.Bind<IPreciseWorkItemCellRepository>().To<PreciseWorkItemCellRepositroy>();

            ninjectKernel.Bind<ICellPowerService>().To<CellPowerService>();

            ninjectKernel.Bind<IEmergencyCommunicationRepository>().To<EmergencyCommunicationRepository>();

            ninjectKernel.Bind<IDownSwitchFlowRepository>().To<DownSwitchFlowRepository>();

            ninjectKernel.Bind<IVipDemandRepository>().To<VipDemandRepository>();

            ninjectKernel.Bind<ICollegeYearRepository>().To<CollegeYearRepository>();

            ninjectKernel.Bind<ICellUlpcCommRepository>().To<CellUlpcCommRepository>();

            ninjectKernel.Bind<IPowerControlULZteRepository>().To<PowerControlULZteRepository>();

            ninjectKernel.Bind<ICdmaRruRepository>().To<CdmaRruRepository>();

            ninjectKernel.Bind<IBranchDemandRepository>().To<BranchDemandRepository>();

            ninjectKernel.Bind<IOnlineSustainRepository>().To<OnlineSustainRepository>();

            ninjectKernel.Bind<IVipProcessRepository>().To<VipProcessRepository>();

            ninjectKernel.Bind<IPlanningSiteRepository>().To<PlanningSiteRepository>();

            ninjectKernel.Bind<IMrsTadvRepository>().To<MrsTadvRepository>();

            ninjectKernel.Bind<IMrsPhrRepository>().To<MrsPhrRepository>();

            ninjectKernel.Bind<IMrsRsrpRepository>().To<MrsRsrpRepository>();

            ninjectKernel.Bind<IMrsSinrUlRepository>().To<MrsSinrUlRepository>();

            ninjectKernel.Bind<IMrsTadvRsrpRepository>().To<MrsTadvRsrpRepository>();

            ninjectKernel.Bind<ITownFlowRepository>().To<TownFlowRepository>();

            ninjectKernel.Bind<IRrcZteRepository>().To<RrcZteRepository>();

            ninjectKernel.Bind<CdmaRegionStatService>().ToSelf();

            ninjectKernel.Bind<CollegeStatService>().ToSelf();

            ninjectKernel.Bind<ENodebQueryService>().ToSelf();

            ninjectKernel.Bind<BtsQueryService>().ToSelf();

            ninjectKernel.Bind<CollegeENodebService>().ToSelf();

            ninjectKernel.Bind<CollegeBtssService>().ToSelf();

            ninjectKernel.Bind<IEmergencyProcessRepository>().To<EmergencyProcessRepository>();

            ninjectKernel.Bind<IEmergencyFiberWorkItemRepository>().To<EmergencyFiberWorkItemRepository>();

            ninjectKernel.Bind<IComplainItemRepository>().To<ComplainItemRepository>();

            ninjectKernel.Bind<IComplainProcessRepository>().To<ComplainProcessRepository>();

            ninjectKernel.Bind<ILteRruRepository>().To<LteRruRepository>();

            ninjectKernel.Bind<CellService>().ToSelf();

            ninjectKernel.Bind<CdmaCellService>().ToSelf();

            ninjectKernel.Bind<College3GTestService>().ToSelf();

            ninjectKernel.Bind<College4GTestService>().ToSelf();

            ninjectKernel.Bind<CollegeLteDistributionService>().ToSelf();

            ninjectKernel.Bind<CollegeKpiService>().ToSelf();

            ninjectKernel.Bind<CollegePreciseService>().ToSelf();

            ninjectKernel.Bind<CollegeCdmaCellsService>().ToSelf();

            ninjectKernel.Bind<CollegeCdmaCellViewService>().ToSelf();

            ninjectKernel.Bind<CollegeCellsService>().ToSelf();

            ninjectKernel.Bind<CollegeCellViewService>().ToSelf();

            ninjectKernel.Bind<CollegeAlarmService>().ToSelf();
            
            ninjectKernel.Bind<PreciseStatService>().ToSelf();

            ninjectKernel.Bind<TownQueryService>().ToSelf();

            ninjectKernel.Bind<KpiImportService>().ToSelf();

            ninjectKernel.Bind<PreciseRegionStatService>().ToSelf();

            ninjectKernel.Bind<PreciseImportService>().ToSelf();

            ninjectKernel.Bind<AlarmsService>().ToSelf();

            ninjectKernel.Bind<TopDrop2GService>().ToSelf();

            ninjectKernel.Bind<TopConnection3GService>().ToSelf();

            ninjectKernel.Bind<BasicImportService>().ToSelf();

            ninjectKernel.Bind<ENodebDumpService>().ToSelf();

            ninjectKernel.Bind<BtsDumpService>().ToSelf();

            ninjectKernel.Bind<CellDumpService>().ToSelf();

            ninjectKernel.Bind<CdmaCellDumpService>().ToSelf();

            ninjectKernel.Bind<AreaTestDateService>().ToSelf();

            ninjectKernel.Bind<CsvFileInfoService>().ToSelf();

            ninjectKernel.Bind<RasterInfoService>().ToSelf();

            ninjectKernel.Bind<LteNeighborCellService>().ToSelf();

            ninjectKernel.Bind<NearestPciCellService>().ToSelf();

            ninjectKernel.Bind<WorkItemService>().ToSelf();

            ninjectKernel.Bind<InterferenceMatrixService>().ToSelf();

            ninjectKernel.Bind<NeighborMonitorService>().ToSelf();

            ninjectKernel.Bind<InterferenceNeighborService>().ToSelf();

            ninjectKernel.Bind<InterferenceMongoService>().ToSelf();

            ninjectKernel.Bind<CellHuaweiMongoService>().ToSelf();

            ninjectKernel.Bind<IntraFreqHoService>().ToSelf();

            ninjectKernel.Bind<InterFreqHoService>().ToSelf();

            ninjectKernel.Bind<NeighborCellMongoService>().ToSelf();
            
            ninjectKernel.Bind<FlowService>().ToSelf();

            ninjectKernel.Bind<FlowQueryService>().ToSelf();

            ninjectKernel.Bind<PreciseWorkItemService>().ToSelf();

            ninjectKernel.Bind<DownSwitchFlowService>().ToSelf();

            ninjectKernel.Bind<EmergencyCommunicationService>().ToSelf();

            ninjectKernel.Bind<VipDemandService>().ToSelf();

            ninjectKernel.Bind<EmergencyFiberService>().ToSelf();

            ninjectKernel.Bind<UlOpenLoopPcService>().ToSelf();

            ninjectKernel.Bind<ComplainService>().ToSelf();

            ninjectKernel.Bind<PlanningQueryService>().ToSelf();

            ninjectKernel.Bind<MrsService>().ToSelf();

            ninjectKernel.Bind<TownFlowService>().ToSelf();

            ninjectKernel.Bind<HotSpotService>().ToSelf();
        }
    }
}
