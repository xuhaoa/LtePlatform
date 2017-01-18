using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;

namespace Lte.Parameters.Abstract.Infrastructure
{
    public interface IInfrastructureRepository : IRepository<InfrastructureInfo>, ISaveChanges
    {
        IEnumerable<int> GetCollegeInfrastructureIds(string collegeName, InfrastructureType type);
        
        InfrastructureInfo GetTopPreciseMonitor(int id);

        List<InfrastructureInfo> GetAllPreciseMonitor();

        List<InfrastructureInfo> GetAllHotSpots();

        Task InsertHotSpotCell(string hotSpotName, HotspotType hotspotType, int id);

        Task InsertCollegeENodeb(string collegeName, int id);

        Task InsertCollegeBts(string collegeName, int id);

        Task InsertHotSpot(string name, HotspotType type, int infrastructureId);
    }

    public interface IIndoorDistributionRepository : IRepository<IndoorDistribution>, ISaveChanges
    {
    }
}
