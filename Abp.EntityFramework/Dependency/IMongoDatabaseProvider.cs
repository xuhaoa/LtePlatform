using Abp.Domain.Entities;
using Abp.EntityFramework.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Abp.EntityFramework.Dependency
{
    /// <summary>
    /// Defines interface to obtain a <see cref="MongoDatabase"/> object.
    /// </summary>
    public interface IMongoDatabaseProvider
    {
        /// <summary>
        /// Gets the <see cref="MongoDatabase"/>.
        /// </summary>
        MongoDatabase Database { get; }
    }

    public interface IStatDateCell
    {
        string CellId { get; set; }

        DateTime StatDate { get; set; }
    }

    public interface IStatDateCellRepository<out TEntity>
            where TEntity : class, IStatDateCell, IEntity<ObjectId>
    {
        TEntity Get(string cellId, DateTime statDate);

        IEnumerable<TEntity> GetList(string cellId, DateTime begin, DateTime end);
    }

    public static class StatDateCellQueries
    {
        public static TEntity Query<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            string cellId, DateTime statDate)
            where TEntity : class, IStatDateCell, IEntity<ObjectId>
        {
            var nextDate = statDate.AddDays(1);
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.CellId == cellId && e.StatDate >= statDate && e.StatDate < nextDate);
            return repository.QueryOne(query);
        }

        public static IEnumerable<TEntity> Query<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            string cellId, DateTime begin, DateTime end)
            where TEntity : class, IStatDateCell, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.CellId == cellId && e.StatDate >= begin && e.StatDate < end);
            return repository.QueryCursor(query);
        }
    }

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

    public interface IHuaweiNeighborMongo : IHuaweiCellMongo
    {
        int eNodeBId { get; set; }

        int CellId { get; set; }
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

        public static TEntity QueryRecent<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId)
            where TEntity : class, IHuaweiMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(e => e.eNodeB_Id == eNodebId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.FirstOrDefault(x => x.iDate == recentDate);
        }

        public static List<TEntity> QueryRecentList<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId, int localCellId)
            where TEntity : class, IHuaweiCellMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.eNodeB_Id == eNodebId && e.LocalCellId == localCellId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.Where(x => x.iDate == recentDate).ToList();
        }

        public static List<TEntity> QueryReverseList<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int destENodebId, byte destSectorId)
            where TEntity : class, IHuaweiNeighborMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.eNodeBId == destENodebId && e.CellId == destSectorId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.Where(x => x.iDate == recentDate).ToList();
        }

        public static List<TEntity> QueryHuaweiRecentList<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId)
            where TEntity : class, IHuaweiMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.EQ(e => e.eNodeB_Id, eNodebId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.Where(x => x.iDate == recentDate).ToList();
        }
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

        public static TEntity QueryZteRecent<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId)
            where TEntity : class, IZteMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.EQ(e => e.eNodeB_Id, eNodebId);
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

        public static List<TEntity> QueryZteRecentList<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            int eNodebId, byte sectorId)
            where TEntity : class, IZteMongo, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.eNodeB_Id == eNodebId && e.description == "cellLocalId=" + sectorId);
            var list = repository.QueryCursor(query);
            var recentDate = list.Max(x => x.iDate);
            return list.Where(x => x.iDate == recentDate).ToList();
        }
    }
}