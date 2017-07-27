using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;

namespace Lte.MySqlFramework.Abstract
{
    public interface IPreciseWorkItemCellRepository : IRepository<PreciseWorkItemCell>, ISaveChanges
    {
        List<PreciseWorkItemCell> GetAllList(string serialNumber);

        PreciseWorkItemCell Get(string serialNumber, int eNodebId, byte sectorId);
    }

    public interface IFlowHuaweiRepository : IRepository<FlowHuawei>, ISaveChanges
    {
        List<FlowHuawei> GetAllList(DateTime begin, DateTime end);

        List<FlowHuawei> GetAllList(DateTime begin, DateTime end, int eNodebId, byte localCellId);
    }

    public interface IRrcHuaweiRepository : IRepository<RrcHuawei>, ISaveChanges
    {
        
    }

    public interface IFlowZteRepository : IRepository<FlowZte>, ISaveChanges
    {
        List<FlowZte> GetAllList(DateTime begin, DateTime end);

        List<FlowZte> GetAllList(DateTime begin, DateTime end, int eNodebId, byte sectorId);
    }

    public interface IRrcZteRepository : IRepository<RrcZte>, ISaveChanges
    {
        
    }

    public interface ITownFlowRepository : IRepository<TownFlowStat>, ISaveChanges
    {
        List<TownFlowStat> GetAllList(DateTime begin, DateTime end);
    }

    public interface ITownRrcRepository : IRepository<TownRrcStat>, ISaveChanges
    {
        
    }

    public interface IDownSwitchFlowRepository : IRepository<DownSwitchFlow>,
        IMatchRepository<DownSwitchFlow, DownSwitchFlowExcel>, ISaveChanges
    {
        List<DownSwitchFlow> GetAllList(DateTime begin, DateTime end);
    }

    public interface IPlanningSiteRepository : IRepository<PlanningSite>,
        IMatchRepository<PlanningSite, PlanningSiteExcel>, ISaveChanges
    {
        
    }

    public interface IAgisDtPointRepository : IRepository<AgisDtPoint>, ISaveChanges
    {
        
    }

    public interface IMrGridRepository : IRepository<MrGrid>, ISaveChanges
    {
        
    }

    public interface IMrGridKpiRepository : IRepository<MrGridKpi>, IMatchRepository<MrGridKpi, MrGridKpiDto>, ISaveChanges
    {
        
    }

    public interface IAgpsTownRepository : IRepository<AgpsCoverageTown>, ISaveChanges
    {
        
    }

    public interface IGridClusterRepository : IRepository<GridCluster>, ISaveChanges
    {
        
    }

    public interface IDpiGridKpiRepository : IRepository<DpiGridKpi>, ISaveChanges
    {
        
    }

    public interface IStationDictionaryRepository : IRepository<StationDictionary>,
        IMatchRepository<StationDictionary, StationDictionaryExcel>, ISaveChanges
    {
        
    }

    public interface IDistributionRepository : IRepository<DistributionSystem>,
        IMatchRepository<DistributionSystem, IndoorDistributionExcel>, ISaveChanges
    {
        
    }

    public interface ITownBoundaryRepository : IRepository<TownBoundary>, ISaveChanges
    {
        
    }

    public static class TownBoundaryQuery
    {
        public static bool IsInTownRange(this List<TownBoundary> coors, GeoPoint point)
        {
            foreach (var coor in coors)
            {
                var coorList = coor.Boundary.GetSplittedFields(' ');
                var boundaryPoints = new List<GeoPoint>();
                for (var i = 0; i < coorList.Length / 2; i++)
                {
                    boundaryPoints.Add(new GeoPoint(coorList[i * 2].ConvertToDouble(0), coorList[i * 2 + 1].ConvertToDouble(0)));
                }
                if (GeoMath.IsInPolygon(point, boundaryPoints)) return true;
            }
            return false;
        }
    }

    public interface IPagingRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity<int>
    {
        IQueryable<TEntity> Get<TKey>(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize,
            Expression<Func<TEntity, TKey>> sortKeySelector, bool isAsc = true);

        IQueryable<TEntity> GetAll<TKey>(int pageIndex, int pageSize, Expression<Func<TEntity, TKey>> sortKeySelector,
            bool isAsc = true);
    }

    public interface IWorkItemRepository : IPagingRepository<WorkItem>
    {
        Task<List<WorkItem>> GetAllListAsync(int eNodebId, byte sectorId);

        Task<List<WorkItem>> GetAllListAsync(int eNodebId);

        Task<List<WorkItem>> GetUnfinishedPreciseListAsync(DateTime begin, DateTime end);

        Task<WorkItem> GetPreciseExistedAsync(int eNodebId, byte sectorId);

        int SaveChanges();
    }
}
