using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;

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

    public interface IDownSwitchFlowRepository : IRepository<DownSwitchFlow>,
        IMatchRepository<DownSwitchFlow, DownSwitchFlowExcel>, ISaveChanges
    {
        List<DownSwitchFlow> GetAllList(DateTime begin, DateTime end);
    }

    public interface IPlanningSiteRepository : IRepository<PlanningSite>,
        IMatchRepository<PlanningSite, PlanningSiteExcel>, ISaveChanges
    {
        
    }
}
