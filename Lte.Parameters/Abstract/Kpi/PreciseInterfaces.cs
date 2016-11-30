using Abp.Domain.Repositories;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;

namespace Lte.Parameters.Abstract.Kpi
{
    public interface IPreciseCoverage4GRepository : IRepository<PreciseCoverage4G>
    {
        List<PreciseCoverage4G> GetAllList(int cellId, byte sectorId, DateTime begin, DateTime end);

        List<PreciseCoverage4G> GetAllList(DateTime begin, DateTime end);

        int SaveChanges();
    }

    public interface ITownPreciseCoverage4GStatRepository : IRepository<TownPreciseCoverage4GStat>
    {
        List<TownPreciseCoverage4GStat> GetAllList(DateTime begin, DateTime end);

        TownPreciseCoverage4GStat GetByTown(int townId, DateTime statTime);

        int SaveChanges();
    }
}
