using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;

namespace Lte.MySqlFramework.Abstract
{
    public interface IFlowHuaweiRepository : IRepository<FlowHuawei>, ISaveChanges, IMatchRepository<FlowHuawei>
    {
    }

    public interface IFlowZteRepository : IRepository<FlowZte>, ISaveChanges, IMatchRepository<FlowZte>
    {
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

    public interface ITownCoverageRepository : IRepository<TownCoverageStat>, ISaveChanges
    {
        
    }

    public interface ICoverageStatRepository : IRepository<CoverageStat>, IMatchRepository<CoverageStat>, ISaveChanges
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

    public interface ITownBoundaryRepository : IRepository<TownBoundary>, ISaveChanges
    {
        
    }

    public interface ITownMrsRsrpRepository : IRepository<TownMrsRsrp>, ISaveChanges
    {
        
    }

    public interface ITopMrsRsrpRepository : IRepository<TopMrsRsrp>, ISaveChanges
    {
        
    }
}
