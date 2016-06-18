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
    public interface IEmergencyCommunicationRepository : IRepository<EmergencyCommunication>, IMatchRepository<EmergencyCommunication, EmergencyCommunicationDto>, ISaveChanges
    {
        IEnumerable<EmergencyCommunication> GetAllList(DateTime begin, DateTime end);

        IEnumerable<EmergencyCommunication> GetAllList(int townId, DateTime begin, DateTime end);
    }
}
