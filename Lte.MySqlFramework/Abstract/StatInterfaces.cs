using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface IPreciseWorkItemCellRepository : IRepository<PreciseWorkItemCell>
    {
        List<PreciseWorkItemCell> GetAllList(string serialNumber);

        PreciseWorkItemCell Get(string serialNumber, int eNodebId, byte sectorId);

        int SaveChanges();
    }

    public interface IFlowHuaweiRepository : IRepository<FlowHuawei>
    {
        List<FlowHuawei> GetAllList(DateTime begin, DateTime end);

        Task<int> CountAsync(DateTime begin, DateTime end);

        List<FlowHuawei> GetAllList(DateTime begin, DateTime end, int eNodebId);

        List<FlowHuawei> GetAllList(DateTime begin, DateTime end, int eNodebId, byte localCellId);

        int SaveChanges();
    }

    public interface IFlowZteRepository : IRepository<FlowZte>
    {
        List<FlowZte> GetAllList(DateTime begin, DateTime end);

        Task<int> CountAsync(DateTime begin, DateTime end);

        List<FlowZte> GetAllList(DateTime begin, DateTime end, int eNodebId, byte sectorId);

        int SaveChanges();
    }

    public interface ITownFlowRepository : IRepository<TownFlowStat>, ISaveChanges
    {
        Task<int> CountAsync(DateTime begin, DateTime end);

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
