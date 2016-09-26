using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Abp.MongoDb;
using Lte.Parameters.Abstract.Switch;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Switch;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Switch
{
    public class InterFreqHoGroupRepository : MongoDbRepositoryBase<InterFreqHoGroup, ObjectId>, IInterFreqHoGroupRepository
    {
        public InterFreqHoGroupRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "InterFreqHoGroup";
        }

        public InterFreqHoGroupRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public InterFreqHoGroup GetRecent(int eNodebId, int localCellId)
        {
            return this.QueryRecent(eNodebId, localCellId);
        }
    }
}
