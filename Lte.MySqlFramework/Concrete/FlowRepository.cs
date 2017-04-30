using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Lte.MySqlFramework.Concrete
{
    public class FlowZteRepository : EfRepositoryBase<MySqlContext, FlowZte>, IFlowZteRepository
    {
        public FlowZteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<FlowZte> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end);
        }

        public List<FlowZte> GetAllList(DateTime begin, DateTime end, int eNodebId, byte sectorId)
        {
            return
                GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end && x.ENodebId == eNodebId &&
                        x.SectorId == sectorId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class RrcZteRepository : EfRepositoryBase<MySqlContext, RrcZte>, IRrcZteRepository
    {
        public RrcZteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class FlowHuaweiRepository : EfRepositoryBase<MySqlContext, FlowHuawei>, IFlowHuaweiRepository
    {
        public FlowHuaweiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<FlowHuawei> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end);
        }

        public List<FlowHuawei> GetAllList(DateTime begin, DateTime end, int eNodebId, byte localCellId)
        {
            return
                GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end && x.ENodebId == eNodebId &&
                        x.LocalCellId == localCellId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class RrcHuaweiRepository : EfRepositoryBase<MySqlContext, RrcHuawei>, IRrcHuaweiRepository
    {
        public RrcHuaweiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class TownFlowRepository : EfRepositoryBase<MySqlContext, TownFlowStat>, ITownFlowRepository
    {
        public TownFlowRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<TownFlowStat> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end).OrderBy(x => x.StatTime).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }
}
