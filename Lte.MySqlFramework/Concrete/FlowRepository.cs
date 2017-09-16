using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Concrete
{
    public class FlowZteRepository : EfRepositorySave<MySqlContext, FlowZte>, IFlowZteRepository
    {
        public FlowZteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<FlowZte> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end);
        }

        public List<FlowZte> GetAllList(DateTime begin, DateTime end, int eNodebId, byte sectorId)
        {
            return
                GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end && x.ENodebId == eNodebId &&
                        x.SectorId == sectorId);
        }
    }

    public class RrcZteRepository : EfRepositorySave<MySqlContext, RrcZte>, IRrcZteRepository
    {
        public RrcZteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class QciZteRepository : EfRepositorySave<MySqlContext, QciZte>, IQciZteRepository
    {
        public QciZteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class FlowHuaweiRepository : EfRepositorySave<MySqlContext, FlowHuawei>, IFlowHuaweiRepository
    {
        public FlowHuaweiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<FlowHuawei> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatTime >= begin && x.StatTime < end);
        }

        public List<FlowHuawei> GetAllList(DateTime begin, DateTime end, int eNodebId, byte localCellId)
        {
            return
                GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end && x.ENodebId == eNodebId &&
                        x.LocalCellId == localCellId);
        }
    }

    public class RrcHuaweiRepository : EfRepositorySave<MySqlContext, RrcHuawei>, IRrcHuaweiRepository
    {
        public RrcHuaweiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class QciHuaweiRepository : EfRepositorySave<MySqlContext, QciHuawei>, IQciHuaweiRepository
    {
        public QciHuaweiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class TownFlowRepository : EfRepositorySave<MySqlContext, TownFlowStat>, ITownFlowRepository
    {
        public TownFlowRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class TownRrcRepository : EfRepositorySave<MySqlContext, TownRrcStat>, ITownRrcRepository
    {
        public TownRrcRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class TownQciRepository : EfRepositorySave<MySqlContext, TownQciStat>, ITownQciRepository
    {
        public TownQciRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class InfrastructureRepository : EfRepositorySave<MySqlContext, InfrastructureInfo>, IInfrastructureRepository
    {
        public IEnumerable<int> GetCollegeInfrastructureIds(string collegeName, InfrastructureType type)
        {
            return GetAll().Where(x =>
                x.HotspotName == collegeName && x.InfrastructureType == type && x.HotspotType == HotspotType.College
                ).Select(x => x.InfrastructureId).ToList();
        }

        public IEnumerable<int> GetHotSpotInfrastructureIds(string name, InfrastructureType type, HotspotType hotspotType)
        {
            return GetAll().Where(x =>
                x.HotspotName == name && x.InfrastructureType == type && x.HotspotType == hotspotType
                ).Select(x => x.InfrastructureId).ToList();
        }
        
        public async Task InsertHotSpotCell(string hotSpotName, HotspotType hotspotType, int id)
        {
            var infrastructure = FirstOrDefault(x =>
                x.HotspotName == hotSpotName && x.HotspotType == hotspotType &&
                x.InfrastructureType == InfrastructureType.Cell && x.InfrastructureId == id);
            if (infrastructure == null)
            {
                await InsertAsync(new InfrastructureInfo
                {
                    HotspotName = hotSpotName,
                    HotspotType = hotspotType,
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

        public InfrastructureRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFIndoorDistributionRepository
        : EfRepositorySave<MySqlContext, IndoorDistribution>, IIndoorDistributionRepository
    {
        public EFIndoorDistributionRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
