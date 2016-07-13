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
    public class CellDlpcPdschPaRepository : MongoDbRepositoryBase<CellDlpcPdschPa, ObjectId>, ICellDlpcPdschPaRepository
    {
        public CellDlpcPdschPaRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "CellDlpcPdschPa";
        }

        public CellDlpcPdschPaRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public CellDlpcPdschPa GetRecent(int eNodebId, int localCellId)
        {
            return this.QueryRecent(eNodebId, localCellId);
        }
    }

    public class CellUlpcCommRepository : MongoDbRepositoryBase<CellUlpcComm, ObjectId>, ICellUlpcCommRepository
    {
        public CellUlpcCommRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "CellUlpcComm";
        }

        public CellUlpcCommRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public CellUlpcComm GetRecent(int eNodebId, int localCellId)
        {
            return this.QueryRecent(eNodebId, localCellId);
        }
    }

}
