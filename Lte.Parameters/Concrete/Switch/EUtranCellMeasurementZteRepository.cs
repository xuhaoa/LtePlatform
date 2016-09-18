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
    public class EUtranCellMeasurementZteRepository : MongoDbRepositoryBase<EUtranCellMeasurementZte, ObjectId>, IEUtranCellMeasurementZteRepository
    {
        public EUtranCellMeasurementZteRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "EUtranCellMeasurement";
        }

        public EUtranCellMeasurementZteRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public EUtranCellMeasurementZte GetRecent(int eNodebId, byte sectorId)
        {
            return this.QueryRecent(eNodebId, sectorId);
        }
    }
}
