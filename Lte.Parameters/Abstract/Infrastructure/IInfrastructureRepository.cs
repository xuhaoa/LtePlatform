using System.Collections.Generic;
using Abp.Domain.Repositories;
using Lte.Parameters.Entities;

namespace Lte.Parameters.Abstract.Infrastructure
{
    public interface IInfrastructureRepository : IRepository<InfrastructureInfo>
    {
        IEnumerable<int> GetENodebIds(string collegeName);

        IEnumerable<int> GetCellIds(string collegeName);

        IEnumerable<int> GetBtsIds(string collegeName);

        IEnumerable<int> GetCdmaCellIds(string collegeName);

        IEnumerable<int> GetLteDistributionIds(string collegeName);

        IEnumerable<int> GetCdmaDistributionIds(string collegeName);

        InfrastructureInfo GetTopPreciseMonitor(int id);

        List<InfrastructureInfo> GetAllPreciseMonitor(); 

        int SaveChanges();
    }

    public interface IIndoorDistributionRepository : IRepository<IndoorDistribution>
    {
    }
}
