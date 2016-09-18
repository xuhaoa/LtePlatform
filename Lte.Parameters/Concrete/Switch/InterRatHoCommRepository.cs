using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.MongoDb;
using Abp.MongoDb.Repositories;
using Lte.Parameters.Abstract.Switch;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Switch;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Switch
{
    public class InterRatHoCommRepository : MongoDbRepositoryBase<InterRatHoComm, ObjectId>, IInterRatHoCommRepository
    {
        public InterRatHoCommRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "InterRatHoComm";
        }

        public InterRatHoCommRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public InterRatHoComm GetRecent(int eNodebId)
        {
            return this.QueryRecent(eNodebId);
        }
    }
}
