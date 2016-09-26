using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Abp.MongoDb;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Neighbor;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Neighbor
{
    public class EutranInterNFreqRepository : MongoDbRepositoryBase<EutranInterNFreq, ObjectId>, IEutranInterNFreqRepository
    {
        public EutranInterNFreqRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "EutranInterNFreq";
        }

        public EutranInterNFreqRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public List<EutranInterNFreq> GetRecentList(int eNodebId)
        {
            return this.QueryHuaweiRecentList(eNodebId);
        }

        public List<EutranInterNFreq> GetRecentList(int eNodebId, int localCellId)
        {
            return this.QueryRecentList(eNodebId, localCellId);
        }
    }
}
