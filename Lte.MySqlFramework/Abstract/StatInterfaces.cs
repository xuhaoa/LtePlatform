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

    public interface IFlowHuaweiRepository : IRepository<FlowHuawei>, ISaveChanges, IMatchRepository<FlowHuawei>
    {
        List<FlowHuawei> GetAllList(DateTime begin, DateTime end);

        List<FlowHuawei> GetAllList(DateTime begin, DateTime end, int eNodebId, byte localCellId);
    }

    public interface IFlowZteRepository : IRepository<FlowZte>, ISaveChanges, IMatchRepository<FlowZte>
    {
        List<FlowZte> GetAllList(DateTime begin, DateTime end);

        List<FlowZte> GetAllList(DateTime begin, DateTime end, int eNodebId, byte sectorId);
    }

    public interface IRrcHuaweiRepository : IRepository<RrcHuawei>, ISaveChanges, IMatchRepository<RrcHuawei>
    {
        
    }

    public interface IRrcZteRepository : IRepository<RrcZte>, ISaveChanges, IMatchRepository<RrcZte>
    {
        
    }

    public interface IQciHuaweiRepository : IRepository<QciHuawei>, ISaveChanges, IMatchRepository<QciHuawei>
    {
        
    }

    public interface IQciZteRepository : IRepository<QciZte>, ISaveChanges, IMatchRepository<QciZte>
    {
        
    }

    public interface IPrbHuaweiRepository : IRepository<PrbHuawei>, ISaveChanges, IMatchRepository<PrbHuawei>
    {
        
    }

    public interface IPrbZteRepository : IRepository<PrbZte>, ISaveChanges, IMatchRepository<PrbZte>
    {
        
    }

    public interface ITownFlowRepository : IRepository<TownFlowStat>, ISaveChanges, IMatchRepository<TownFlowStat>
    {
    }

    public interface ITownRrcRepository : IRepository<TownRrcStat>, ISaveChanges
    {
        
    }

    public interface ITownQciRepository : IRepository<TownQciStat>, ISaveChanges
    {
        
    }

    public interface ITownPrbRepository : IRepository<TownPrbStat>, ISaveChanges
    {
        
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
        public static bool IsInTownRange(this List<TownBoundary> coors, IGeoPoint<double> point)
        {
            return coors.Any(coor => point.IsInPolygon(coor.CoorList()));
        }

        public static bool IsInTownRange(this TownBoundary coor, IGeoPoint<double> point)
        {
            return point.IsInPolygon(coor.CoorList());
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

    public interface IWorkItemRepository : IPagingRepository<WorkItem>, ISaveChanges
    {
        Task<List<WorkItem>> GetAllListAsync(int eNodebId, byte sectorId);

        Task<List<WorkItem>> GetAllListAsync(int eNodebId);

        Task<List<WorkItem>> GetUnfinishedPreciseListAsync(DateTime begin, DateTime end);

        Task<WorkItem> GetPreciseExistedAsync(int eNodebId, byte sectorId);
    }

    public interface ICellRepository : IRepository<Cell>, IMatchRepository<Cell, CellExcel>, ISaveChanges
    {
        void AddCells(IEnumerable<Cell> cells);

        Cell GetBySectorId(int eNodebId, byte sectorId);

        Cell GetByFrequency(int eNodebId, int frequency);

        List<Cell> GetAllList(int eNodebId);

        List<Cell> GetAllList(double west, double east, double south, double north);

        List<Cell> GetAllInUseList();
    }

    public interface ICdmaCellRepository : IRepository<CdmaCell>, ISaveChanges
    {
        CdmaCell GetBySectorId(int btsId, byte sectorId);

        CdmaCell GetBySectorIdAndCellType(int btsId, byte sectorId, string cellType);

        List<CdmaCell> GetAllList(int btsId);

        List<CdmaCell> GetAllInUseList();
    }
}
