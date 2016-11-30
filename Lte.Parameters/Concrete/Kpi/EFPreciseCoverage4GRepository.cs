using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;

namespace Lte.Parameters.Concrete.Kpi
{
    public class EFPreciseCoverage4GRepository : EfRepositoryBase<EFParametersContext, PreciseCoverage4G>,
        IPreciseCoverage4GRepository
    {
        public List<PreciseCoverage4G> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public List<PreciseCoverage4G> GetAllList(int cellId, byte sectorId, DateTime begin, DateTime end)
        {
            return GetAllList(x =>
                x.StatTime >= begin && x.StatTime < end && x.CellId == cellId && x.SectorId == sectorId);
        }

        public EFPreciseCoverage4GRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFTownPreciseCoverage4GStatRepository : EfRepositoryBase<EFParametersContext, TownPreciseCoverage4GStat>,
        ITownPreciseCoverage4GStatRepository
    {
        public List<TownPreciseCoverage4GStat> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end);
        }

        public TownPreciseCoverage4GStat GetByTown(int townId, DateTime statTime)
        {
            return FirstOrDefault(x => x.TownId == townId && x.StatTime == statTime);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFTownPreciseCoverage4GStatRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
