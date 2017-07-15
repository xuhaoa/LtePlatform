using Abp.EntityFramework;
using Lte.MySqlFramework.Entities;
using System.Data.Entity;
using MySql.Data.Entity;

namespace Lte.MySqlFramework.Concrete
{
    //实施数据库迁移前，请解除注释；迁移完成后，请再次注释编译后发布，否则在IIS上程序会报错
    //[DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class MySqlContext : AbpDbContext
    {
        public MySqlContext() : base("MySqlContext")
        {
            
        }

        public DbSet<FlowHuawei> FlowHuaweises { get; set; }

        public DbSet<FlowZte> FlowZtes { get; set; }
        
        public DbSet<PreciseWorkItemCell> PreciseWorkItemCells { get; set; }

        public DbSet<EmergencyCommunication> EmergencyCommunications { get; set; }

        public DbSet<DownSwitchFlow> DownSwitchFlows { get; set; }

        public DbSet<VipDemand> VipDemands { get; set; }

        public DbSet<EmergencyProcess> EmergencyProcesses { get; set; }

        public DbSet<EmergencyFiberWorkItem> EmergencyFiberWorkItems { get; set; }

        public DbSet<CollegeYearInfo> CollegeYearInfos { get; set; }

        public DbSet<ComplainItem> ComplainItems { get; set; }

        public DbSet<CdmaRegionStat> CdmaRegionStats { get; set; }

        public DbSet<TopDrop2GCell> TopDrop2GStats { get; set; }

        public DbSet<TopConnection2GCell> TopConnection2GStats { get; set; }

        public DbSet<TopConnection3GCell> TopConnection3GStats { get; set; }

        public DbSet<CdmaRru> CdmaRrus { get; set; }

        public DbSet<BranchDemand> BranchDemands { get; set; }

        public DbSet<OnlineSustain> OnlineSustains { get; set; }

        public DbSet<VipProcess> VipProcesses { get; set; }

        public DbSet<ComplainProcess> ComplainProcesses { get; set; }

        public DbSet<LteRru> LteRrus { get; set; }

        public DbSet<College3GTestResults> College3GTestResultses { get; set; }

        public DbSet<College4GTestResults> College4GTestResultses { get; set; }

        public DbSet<CollegeKpi> CollegeKpis { get; set; }

        public DbSet<PlanningSite> PlanningSites { get; set; }

        public DbSet<TownFlowStat> TownFlowStats { get; set; }

        public DbSet<TownRrcStat> TownRrcStats { get; set; }

        public DbSet<RrcZte> RrcZtes { get; set; }

        public DbSet<RrcHuawei> RrcHuaweis { get; set; }

        public DbSet<AgisDtPoint> AgisDtPoints { get; set; }

        public DbSet<MrGrid> MrGrids { get; set; }

        public DbSet<AppSteam> AppSteams { get; set; }

        public DbSet<WebBrowsing> WebBrowsings { get; set; }

        public DbSet<StationDictionary> StationDictionaries { get; set; }

        public DbSet<DistributionSystem> DistributionSystems { get; set; }

        public DbSet<HotSpotENodebId> HotSpotENodebIds { get; set; }

        public DbSet<HotSpotCellId> HotSpotCellIds { get; set; }

        public DbSet<HotSpotBtsId> HotSpotBtsIds { get; set; }

        public DbSet<HotSpotCdmaCellId> HotSpotCdmaCellIds { get; set; }

        public DbSet<TownBoundary> TownBoundaries { get; set; }

        public DbSet<ENodebBase> Enodeb_Bases { get; set; }

        public DbSet<ConstructionInformation> Construction_Informations { get; set; }

        public DbSet<BluePrint> BluePrints { get; set; }

        public DbSet<MicroItem> MicroItems { get; set; }

        public DbSet<MicroAddress> MicroAddresses { get; set; }

        public DbSet<WorkItem> WorkItems { get; set; }

        public DbSet<MrGridKpi> MrGridKpis { get; set; }

        public DbSet<GridCluster> GridClusters { get; set; }

        public DbSet<DpiGridKpi> DpiGridKpis { get; set; }

        public DbSet<AgpsCoverageTown> AgpsCoverageTowns { get; set; }

        public DbSet<RasterInfo> RasterInfos { get; set; }

        public DbSet<RasterTestInfo> RasterTestInfos { get; set; }

        public DbSet<CsvFilesInfo> CsvFilesInfos { get; set; }
    }
}
