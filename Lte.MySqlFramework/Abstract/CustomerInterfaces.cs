using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface IEmergencyCommunicationRepository 
        : IRepository<EmergencyCommunication>, 
        IMatchRepository<EmergencyCommunication, EmergencyCommunicationDto>, 
        IDateSpanQuery<EmergencyCommunication>,
        ISaveChanges
    {
    }

    public interface IVipDemandRepository 
        : IRepository<VipDemand>, 
        IMatchRepository<VipDemand, VipDemandExcel>, 
        IMatchRepository<VipDemand, VipDemandDto>,
        IDateSpanQuery<VipDemand>,
        ISaveChanges
    {
    }

    public interface IEmergencyProcessRepository
        : IRepository<EmergencyProcess>,
            IMatchRepository<EmergencyProcess, EmergencyProcessDto>,
            ISaveChanges
    {
        
    }
}
