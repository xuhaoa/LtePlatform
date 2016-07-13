using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Entities;
using Abp.MongoDb.Repositories;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Basic
{
    public interface IHuaweiMongo
    {
        string iDate { get; set; }

        int eNodeB_Id { get; set; }

        string eNodeBId_Name { get; set; }
    }

    public interface IHuaweiCellMongo : IHuaweiMongo
    {
        int LocalCellId { get; set; }
    }

    public static class HuaweiRepositoryQueries
    {
        public static TEntity QueryRecent<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId, int localCellId)
            where TEntity : class, IHuaweiCellMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.eNodeB_Id == eNodebId && e.LocalCellId == localCellId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.FirstOrDefault(x => x.iDate == recentDate);
        }
    }

    public interface IZteMongo
    {
        int eNodeB_Id { get; set; }

        string eNodeB_Name { get; set; }

        string lastModifedTime { get; set; }

        string iDate { get; set; }

        string parentLDN { get; set; }

        string description { get; set; }
    }

    public static class ZteRepositoryQueries
    {
        public static TEntity QueryRecent<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId, byte sectorId)
            where TEntity : class, IZteMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.eNodeB_Id == eNodebId && e.description == "cellLocalId=" + sectorId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.FirstOrDefault(x => x.iDate == recentDate);
        }

        public static List<TEntity> QueryRecentList<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId)
            where TEntity : class, IZteMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(e => e.eNodeB_Id == eNodebId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.Where(x => x.iDate == recentDate).ToList();
        }
    }
}