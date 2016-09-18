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
    public class IntraFreqHoGroupRepository : MongoDbRepositoryBase<IntraFreqHoGroup, ObjectId>, IIntraFreqHoGroupRepository
    {
        public IntraFreqHoGroupRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "IntraFreqHoGroup";
        }

        public IntraFreqHoGroupRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public IntraFreqHoGroup GetRecent(int eNodebId, int localCellId)
        {
            return this.QueryRecent(eNodebId, localCellId);
        }
    }
}
