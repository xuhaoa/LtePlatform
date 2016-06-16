using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;

namespace Lte.Parameters.Concrete.Kpi
{
    public class EFRegionRepository : EfRepositoryBase<EFParametersContext, OptimizeRegion>, IRegionRepository
    {
        public List<OptimizeRegion> GetAllList(string city)
        {
            return GetAllList(x => x.City == city);
        }

        public async Task<List<OptimizeRegion>> GetAllListAsync(string city)
        {
            return await GetAllListAsync(x => x.City == city);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFRegionRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
