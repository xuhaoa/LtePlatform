using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface IDistributionRepository : IRepository<DistributionSystem>,
        IMatchRepository<DistributionSystem, IndoorDistributionExcel>, ISaveChanges
    {
        
    }
}