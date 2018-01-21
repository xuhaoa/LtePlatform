using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Abp.Domain.Entities;
using Lte.Domain.Common;
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

    public interface IMonthKpiRepository : IRepository<MonthKpiStat>, ISaveChanges
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

    public interface IPagingRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity<int>
    {
        IQueryable<TEntity> Get<TKey>(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize,
            Expression<Func<TEntity, TKey>> sortKeySelector, bool isAsc = true);

        IQueryable<TEntity> GetAll<TKey>(int pageIndex, int pageSize, Expression<Func<TEntity, TKey>> sortKeySelector,
            bool isAsc = true);
    }

    public interface ITownMrsRsrpRepository : IRepository<TownMrsRsrp>, ISaveChanges
    {
        
    }
}
