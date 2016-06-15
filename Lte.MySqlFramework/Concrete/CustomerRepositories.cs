using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Concrete
{
    public class EmergencyCommunicationRepository : EfRepositoryBase<MySqlContext, EmergencyCommunication>,
        IEmergencyCommunicationRepository
    {
        public EmergencyCommunicationRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public IEnumerable<EmergencyCommunication> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end);
        }

        public IEnumerable<EmergencyCommunication> GetAllList(int townId, DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end && x.TownId == townId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }
}
