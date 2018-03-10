using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Concrete
{
    public class DistributionRepository : EfRepositorySave<MySqlContext, DistributionSystem>, IDistributionRepository
    {
        public DistributionRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public DistributionSystem Match(IndoorDistributionExcel stat)
        {
            return FirstOrDefault(x => x.Name == stat.Name);
        }
    }
}