using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.MongoDb;
using Abp.MongoDb.Repositories;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Channel;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Channel
{
    public class PDSCHCfgRepository : MongoDbRepositoryBase<PDSCHCfg, ObjectId>, IPDSCHCfgRepository
    {
        public PDSCHCfgRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "PDSCHCfg";
        }

        public PDSCHCfgRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public PDSCHCfg GetRecent(int eNodebId, int localCellId)
        {
            return this.QueryRecent(eNodebId, localCellId);
        }
    }
}
