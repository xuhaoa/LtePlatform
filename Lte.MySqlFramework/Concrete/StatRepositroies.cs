using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Microsoft.Practices.Unity.Utility;

namespace Lte.MySqlFramework.Concrete
{
    public class PreciseWorkItemCellRepositroy : EfRepositoryBase<MySqlContext, PreciseWorkItemCell>, IPreciseWorkItemCellRepository
    {
        public PreciseWorkItemCellRepositroy(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<PreciseWorkItemCell> GetAllList(string serialNumber)
        {
            return GetAllList(x => x.WorkItemNumber == serialNumber);
        }

        public PreciseWorkItemCell Get(string serialNumber, int eNodebId, byte sectorId)
        {
            return
                FirstOrDefault(x => x.WorkItemNumber == serialNumber && x.ENodebId == eNodebId && x.SectorId == sectorId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class DownSwitchFlowRepository : EfRepositoryBase<MySqlContext, DownSwitchFlow>, IDownSwitchFlowRepository
    {
        public DownSwitchFlowRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public DownSwitchFlow Match(DownSwitchFlowExcel stat)
        {
            return FirstOrDefault(x => x.City == stat.City && x.Region == stat.Region && x.StatDate == stat.StatDate);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public List<DownSwitchFlow> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatDate >= begin && x.StatDate < end);
        }
    }

    public class PlanningSiteRepository : EfRepositoryBase<MySqlContext, PlanningSite>, IPlanningSiteRepository
    {
        public PlanningSiteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public PlanningSite Match(PlanningSiteExcel stat)
        {
            return FirstOrDefault(x => x.PlanNum == stat.PlanNum);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class AgisDtPointRepository : EfRepositoryBase<MySqlContext, AgisDtPoint>, IAgisDtPointRepository
    {
        public AgisDtPointRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class MrGridRepository : EfRepositoryBase<MySqlContext, MrGrid>, IMrGridRepository
    {
        public MrGridRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class StationDictionaryRepository : EfRepositoryBase<MySqlContext, StationDictionary>,
        IStationDictionaryRepository
    {
        public StationDictionaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public StationDictionary Match(StationDictionaryExcel stat)
        {
            return FirstOrDefault(x => x.StationNum == stat.StationNum);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class DistributionRepository : EfRepositoryBase<MySqlContext, DistributionSystem>, IDistributionRepository
    {
        public DistributionRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public DistributionSystem Match(IndoorDistributionExcel stat)
        {
            return FirstOrDefault(x => x.Name == stat.Name);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class TownBoundaryRepository : EfRepositoryBase<MySqlContext, TownBoundary>, ITownBoundaryRepository
    {
        public TownBoundaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class ConstructionInformationRepository : EfRepositoryBase<MySqlContext, ConstructionInformation>,
        IConstructionInformationRepository
    {
        public ConstructionInformationRepository(IDbContextProvider<MySqlContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
        
        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class EnodebBaseRepository : EfRepositoryBase<MySqlContext, ENodebBase>, IEnodebBaseRepository
    {
        public EnodebBaseRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
        
        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class BluePrintRepository : EfRepositoryBase<MySqlContext, BluePrint>, IBluePrintRepository
    {
        public BluePrintRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public abstract class PagingRepositoryBase<TEntity> : EfRepositoryBase<MySqlContext, TEntity>, IPagingRepository<TEntity>
        where TEntity : class, IEntity<int>, new()
    {
        public IQueryable<TEntity> Get<TKey>(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize,
            Expression<Func<TEntity, TKey>> sortKeySelector, bool isAsc = true)
        {
            Guard.ArgumentNotNull(predicate, "predicate");
            Guard.ArgumentNotNull(sortKeySelector, "sortKeySelector");
            return isAsc
                ? GetAll().Where(predicate)
                    .OrderBy(sortKeySelector)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize)
                    .AsQueryable()
                : GetAll().Where(predicate)
                    .OrderByDescending(sortKeySelector)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize)
                    .AsQueryable();
        }

        public IQueryable<TEntity> GetAll<TKey>(int pageIndex, int pageSize,
            Expression<Func<TEntity, TKey>> sortKeySelector, bool isAsc = true)
        {
            Guard.ArgumentNotNull(sortKeySelector, "sortKeySelector");
            return isAsc
                ? GetAll().OrderBy(sortKeySelector)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize)
                    .AsQueryable()
                : GetAll().OrderByDescending(sortKeySelector)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize)
                    .AsQueryable();
        }

        public PagingRepositoryBase(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class WorkItemRepository : PagingRepositoryBase<WorkItem>, IWorkItemRepository
    {
        public async Task<List<WorkItem>> GetAllListAsync(int eNodebId)
        {
            return await GetAllListAsync(x => x.ENodebId == eNodebId);
        }

        public async Task<List<WorkItem>> GetAllListAsync(DateTime begin, DateTime end)
        {
            return await GetAllListAsync(x => x.Deadline > begin && x.Deadline <= end);
        }

        public async Task<List<WorkItem>> GetAllKpiListAsync(DateTime begin, DateTime end)
        {
            return
                await
                    GetAllListAsync(
                        x =>
                            x.Deadline > begin && x.Deadline <= end && (x.Type == WorkItemType.Interference4G ||
                            x.Type == WorkItemType.Kpi2G || x.Type == WorkItemType.Kpi4G));
        }

        public async Task<List<WorkItem>> GetUnfinishedPreciseListAsync(DateTime begin, DateTime end)
        {
            return
                await
                    GetAllListAsync(
                        x => x.BeginTime >= begin && x.BeginTime < end && x.Subtype == WorkItemSubtype.PreciseRate
                        && x.State != WorkItemState.Finished);
        }

        public async Task<WorkItem> GetPreciseExistedAsync(int eNodebId, byte sectorId)
        {
            return
                await
                    FirstOrDefaultAsync(
                        x =>
                            x.ENodebId == eNodebId && x.SectorId == sectorId && x.Subtype == WorkItemSubtype.PreciseRate &&
                            x.State != WorkItemState.Finished);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public async Task<List<WorkItem>> GetAllListAsync(int eNodebId, byte sectorId)
        {
            return await GetAllListAsync(x => x.ENodebId == eNodebId && x.SectorId == sectorId);
        }

        public WorkItemRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
