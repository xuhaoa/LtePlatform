using System.Collections.Generic;
using Abp.Domain.Repositories;
using Lte.Parameters.Entities;

namespace Lte.Parameters.Abstract.Infrastructure
{
    public interface IInfrastructureRepository : IRepository<InfrastructureInfo>
    {
        IEnumerable<int> GetCollegeInfrastructureIds(string collegeName, InfrastructureType type);
        
        InfrastructureInfo GetTopPreciseMonitor(int id);

        List<InfrastructureInfo> GetAllPreciseMonitor(); 

        int SaveChanges();
    }

    public interface IIndoorDistributionRepository : IRepository<IndoorDistribution>
    {
        int SaveChanges();
    }
}
