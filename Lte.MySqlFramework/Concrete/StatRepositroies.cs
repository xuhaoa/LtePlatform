using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

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
}
