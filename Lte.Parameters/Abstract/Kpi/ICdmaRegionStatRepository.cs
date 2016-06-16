using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Parameters.Abstract.Kpi
{
    public interface ICdmaRegionStatRepository : IRepository<CdmaRegionStat>
    {
        List<CdmaRegionStat> GetAllList(DateTime begin, DateTime end);

        Task<List<CdmaRegionStat>> GetAllListAsync(DateTime begin, DateTime end);

        int SaveChanges();
    }

    public interface ITopDrop2GCellRepository : IRepository<TopDrop2GCell>
    {
        List<TopDrop2GCell> GetAllList(string city, DateTime begin, DateTime end);

        int SaveChanges();
    }

    public interface ITopConnection3GRepository : IRepository<TopConnection3GCell>
    {
        List<TopConnection3GCell> GetAllList(string city, DateTime begin, DateTime end);

        int SaveChanges();
    }
}
