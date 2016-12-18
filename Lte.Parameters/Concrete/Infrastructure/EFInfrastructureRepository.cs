using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;

namespace Lte.Parameters.Concrete.Infrastructure
{
    public class EFInfrastructureRepository : EfRepositoryBase<EFParametersContext, InfrastructureInfo>, IInfrastructureRepository
    {
        public IEnumerable<int> GetCollegeInfrastructureIds(string collegeName, InfrastructureType type)
        {
            return GetAll().Where(x =>
                x.HotspotName == collegeName && x.InfrastructureType == type && x.HotspotType == HotspotType.College
                ).Select(x => x.InfrastructureId).ToList();
        }
        
        public InfrastructureInfo GetTopPreciseMonitor(int id)
        {
            return FirstOrDefault(x => x.InfrastructureId == id && x.HotspotType == HotspotType.TopPrecise);
        }

        public List<InfrastructureInfo> GetAllPreciseMonitor()
        {
            return GetAll().Where(x => x.HotspotType == HotspotType.TopPrecise).ToList();
        }

        public List<InfrastructureInfo> GetAllHotSpots()
        {
            return GetAll().Where(x => x.InfrastructureType == InfrastructureType.HotSpot).ToList();
        }

        public async Task InsertCollegeCell(string collegeName, int id)
        {
            var infrastructure = FirstOrDefault(x =>
                x.HotspotName == collegeName && x.HotspotType == HotspotType.College &&
                x.InfrastructureType == InfrastructureType.Cell && x.InfrastructureId == id);
            if (infrastructure == null)
            {
                await InsertAsync(new InfrastructureInfo
                {
                    HotspotName = collegeName,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.Cell,
                    InfrastructureId = id
                });
            }
        }

        public async Task InsertCollegeENodeb(string collegeName, int id)
        {
            var infrastructure = FirstOrDefault(x =>
                x.HotspotType == HotspotType.College && x.HotspotName == collegeName &&
                x.InfrastructureId == id && x.InfrastructureType == InfrastructureType.ENodeb);
            if (infrastructure == null)
            {
                await InsertAsync(new InfrastructureInfo
                {
                    HotspotName = collegeName,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.ENodeb,
                    InfrastructureId = id
                });
            }
        }

        public async Task InsertCollegeBts(string collegeName, int id)
        {
            var infrastructure = FirstOrDefault(x =>
                x.HotspotType == HotspotType.College && x.HotspotName == collegeName &&
                x.InfrastructureId == id && x.InfrastructureType == InfrastructureType.CdmaBts);
            if (infrastructure == null)
            {
                await InsertAsync(new InfrastructureInfo
                {
                    HotspotName = collegeName,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.CdmaBts,
                    InfrastructureId = id
                });
            }
        }

        public async Task InsertHotSpot(string name, HotspotType type)
        {
            var infrastructure = FirstOrDefault(x =>
                x.HotspotType == type && x.HotspotName == name && x.InfrastructureType == InfrastructureType.HotSpot);
            if (infrastructure == null)
            {
                await InsertAsync(new InfrastructureInfo
                {
                    HotspotName = name,
                    HotspotType = type,
                    InfrastructureType = InfrastructureType.HotSpot
                });
            }
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFInfrastructureRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFIndoorDistributionRepository
        : EfRepositoryBase<EFParametersContext, IndoorDistribution>, IIndoorDistributionRepository
    {
        public EFIndoorDistributionRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }
}
