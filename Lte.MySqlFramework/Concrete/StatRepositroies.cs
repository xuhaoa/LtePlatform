using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Domain.Common;

namespace Lte.MySqlFramework.Concrete
{
    public class AgisDtPointRepository : EfRepositorySave<MySqlContext, AgisDtPoint>, IAgisDtPointRepository
    {
        public AgisDtPointRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class MrGridRepository : EfRepositorySave<MySqlContext, MrGrid>, IMrGridRepository
    {
        public MrGridRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class MrGridKpiRepository : EfRepositorySave<MySqlContext, MrGridKpi>, IMrGridKpiRepository
    {
        public MrGridKpiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public MrGridKpi Match(MrGridKpiDto stat)
        {
            return FirstOrDefault(x => x.X == stat.X && x.Y == stat.Y);
        }
    }

    public class MonthKpiRepository : EfRepositorySave<MySqlContext, MonthKpiStat>, IMonthKpiRepository
    {
        public MonthKpiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class GridClusterRepository : EfRepositorySave<MySqlContext, GridCluster>, IGridClusterRepository
    {
        public GridClusterRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class DpiGridKpiRepository : EfRepositorySave<MySqlContext, DpiGridKpi>, IDpiGridKpiRepository
    {
        public DpiGridKpiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class StationDictionaryRepository : EfRepositorySave<MySqlContext, StationDictionary>,
        IStationDictionaryRepository
    {
        public StationDictionaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public StationDictionary Match(StationDictionaryExcel stat)
        {
            return FirstOrDefault(x => x.StationNum == stat.StationNum);
        }
    }

    public class DistributionRepository : EfRepositorySave<MySqlContext, DistributionSystem>, IDistributionRepository
    {
        public DistributionRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public DistributionSystem Match(IndoorDistributionExcel stat)
        {
            return FirstOrDefault(x => x.Name == stat.Name);
        }
    }

    public class TownBoundaryRepository : EfRepositorySave<MySqlContext, TownBoundary>, ITownBoundaryRepository
    {
        public TownBoundaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class ConstructionInformationRepository : EfRepositorySave<MySqlContext, ConstructionInformation>,
        IConstructionInformationRepository
    {
        public ConstructionInformationRepository(IDbContextProvider<MySqlContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }

    public class EnodebBaseRepository : EfRepositorySave<MySqlContext, ENodebBase>, IEnodebBaseRepository
    {
        public EnodebBaseRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class BluePrintRepository : EfRepositorySave<MySqlContext, BluePrint>, IBluePrintRepository
    {
        public BluePrintRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class TownMrsRsrpRepository : EfRepositorySave<MySqlContext, TownMrsRsrp>, ITownMrsRsrpRepository
    {
        public TownMrsRsrpRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class TopMrsRsrpRepository : EfRepositorySave<MySqlContext, TopMrsRsrp>, ITopMrsRsrpRepository
    {
        public TopMrsRsrpRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
