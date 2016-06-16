using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Parameters.Concrete.Kpi
{
    public class EFCdmaRegionStatRepository : EfRepositoryBase<EFParametersContext, CdmaRegionStat>, ICdmaRegionStatRepository
    {
        public List<CdmaRegionStat> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatDate >= begin && x.StatDate < end);
        }

        public async Task<List<CdmaRegionStat>> GetAllListAsync(DateTime begin, DateTime end)
        {
            return await GetAllListAsync(x => x.StatDate >= begin && x.StatDate < end);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCdmaRegionStatRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFTopDrop2GCellRepository : EfRepositoryBase<EFParametersContext, TopDrop2GCell>, ITopDrop2GCellRepository
    {
        public List<TopDrop2GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFTopDrop2GCellRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFTopConnection3GRepository : EfRepositoryBase<EFParametersContext, TopConnection3GCell>, ITopConnection3GRepository
    {
        public List<TopConnection3GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFTopConnection3GRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
