using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.MongoDb;
using Abp.MongoDb.Repositories;
using Lte.Parameters.Abstract.Neighbor;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Neighbor;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Neighbor
{
    public class EutranIntraFreqNCellRepository : MongoDbRepositoryBase<EutranIntraFreqNCell, ObjectId>, IEutranIntraFreqNCellRepository
    {
        public EutranIntraFreqNCellRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "EutranIntraFreqNCell";
        }

        public EutranIntraFreqNCellRepository() : this(new MyMongoProvider("fangww"))
        {

        }

        public List<EutranIntraFreqNCell> GetRecentList(int eNodebId, byte localCellId)
        {
            return this.QueryRecentList(eNodebId, localCellId);
        }

        public List<EutranIntraFreqNCell> GetReverseList(int destENodebId, byte destSectorId)
        {
            var query =
                MongoDB.Driver.Builders.Query<EutranIntraFreqNCell>.Where(
                    e => e.eNodeBId == destENodebId && e.CellId == destSectorId);
            var list = Collection.Find(query).AsQueryable();
            var recentDate = list.Max(x => x.iDate);
            return list.Where(x => x.iDate == recentDate).ToList();
        }

        public List<EutranIntraFreqNCell> GetAllReverseList(int destENodebId, byte destSectorId)
        {
            var query =
                MongoDB.Driver.Builders.Query<EutranIntraFreqNCell>.Where(
                    e => e.eNodeBId == destENodebId && e.CellId == destSectorId);
            var list = Collection.Find(query).AsQueryable().ToList();
            return (from item in list
                group item by new
                {
                    item.eNodeB_Id,
                    item.LocalCellId,
                    item.eNodeBId,
                    item.CellId
                }
                into g
                select new EutranIntraFreqNCell
                {
                    eNodeB_Id = g.Key.eNodeB_Id,
                    LocalCellId = g.Key.LocalCellId,
                    eNodeBId = g.Key.eNodeBId,
                    CellId = g.Key.CellId,
                    NoHoFlag = g.First().NoHoFlag,
                    NoRmvFlag = g.First().NoRmvFlag,
                    AnrFlag = g.First().AnrFlag,
                    NCellClassLabel = g.First().NCellClassLabel
                }).ToList();
        }
    }
}
