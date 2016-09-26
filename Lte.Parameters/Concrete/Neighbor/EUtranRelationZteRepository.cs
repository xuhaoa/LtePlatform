﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Abp.MongoDb;
using Lte.Parameters.Abstract.Neighbor;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Neighbor;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Neighbor
{
    public class EUtranRelationZteRepository : MongoDbRepositoryBase<EUtranRelationZte, ObjectId>, IEUtranRelationZteRepository
    {
        public EUtranRelationZteRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "EUtranRelation";
        }

        public EUtranRelationZteRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public List<EUtranRelationZte> GetRecentList(int eNodebId, byte sectorId)
        {
            return this.QueryZteRecentList(eNodebId, sectorId);
        }

        public List<EUtranRelationZte> GetRecentList(int eNodebId)
        {
            return this.QueryRecentList(eNodebId);
        }

        public EUtranRelationZte GetRecent(int eNodebId, int externalId)
        {
            var query =
                MongoDB.Driver.Builders.Query<EUtranRelationZte>.Where(
                    e => e.eNodeB_Id == eNodebId
                    && e.refExternalEUtranCellFDD == "ManagedElement=1,ENBFunctionFDD=" + eNodebId + ",ExternalEUtranCellFDD=" + externalId);
            var list = Collection.Find(query).AsQueryable();
            var recentDate = list.Max(x => x.iDate);
            return list.FirstOrDefault(x => x.iDate == recentDate);
        }
    }
}
