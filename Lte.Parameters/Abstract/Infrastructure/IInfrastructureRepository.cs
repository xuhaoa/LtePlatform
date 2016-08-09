using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Entities;

namespace Lte.Parameters.Abstract.Infrastructure
{
    public interface IInfrastructureRepository : IRepository<InfrastructureInfo>, ISaveChanges
    {
        IEnumerable<int> GetCollegeInfrastructureIds(string collegeName, InfrastructureType type);
        
        InfrastructureInfo GetTopPreciseMonitor(int id);

        List<InfrastructureInfo> GetAllPreciseMonitor();

        Task InsertCollegeCell(string collegeName, int id);
    }

    public interface IIndoorDistributionRepository : IRepository<IndoorDistribution>, ISaveChanges
    {
    }
}
