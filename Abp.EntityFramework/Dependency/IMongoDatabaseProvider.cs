using Abp.Domain.Entities;
using Abp.EntityFramework.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

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

    public interface IStatDate
    {
        DateTime StatDate { get; set; }
    }

    public interface IStatTime
    {
        DateTime StatTime { get; set; }
    }

    public interface IRasterNum
    {
        short RasterNum { get; set; }
    }

    public interface IStatDateCell : IStatDate
    {
        string CellId { get; set; }
    }

    public interface IRegionDateSpanView<TDistrictView, TTownView> : IStatDate
        where TDistrictView : ICityDistrict
        where TTownView : ICityDistrictTown
    {
        IEnumerable<TDistrictView> DistrictViews { get; set; }

        IEnumerable<TTownView> TownViews { get; set; }
    }

    public interface IStatDateCellRepository<out TEntity>
            where TEntity : class, IStatDateCell, IEntity<ObjectId>
    {
        TEntity Get(string cellId, DateTime statDate);

        IEnumerable<TEntity> GetList(string cellId, DateTime begin, DateTime end);
    }

    public static class StatDateCellQueries
    {
        public static IEnumerable<TRegionDateSpanView> QueryDateSpanViews<TRegionDateSpanView, TDistrictView, TTownView>
            (this IEnumerable<TTownView> townViews, Func<TTownView, TDistrictView> generateDistrictViewFunc)
            where TRegionDateSpanView : class, IRegionDateSpanView<TDistrictView, TTownView>, new()
            where TDistrictView : ICityDistrict
            where TTownView : class, ICityDistrictTown, IStatTime, new()
        {
            return from view in townViews
                group view by view.StatTime
                into g
                select new TRegionDateSpanView
                {
                    StatDate = g.Key,
                    TownViews = g.Select(x => x),
                    DistrictViews = g.Select(x => x).Merge(generateDistrictViewFunc)
                };
        }

        public static IEnumerable<TRegionDateSpanView> QueryDateDateViews<TRegionDateSpanView, TDistrictView, TTownView>
            (this IEnumerable<TTownView> townViews, Func<TTownView, TDistrictView> generateDistrictViewFunc)
            where TRegionDateSpanView : class, IRegionDateSpanView<TDistrictView, TTownView>, new()
            where TDistrictView : ICityDistrict
            where TTownView : class, ICityDistrictTown, IStatDate, new()
        {
            return from view in townViews
                   group view by view.StatDate
                into g
                   select new TRegionDateSpanView
                   {
                       StatDate = g.Key,
                       TownViews = g.Select(x => x),
                       DistrictViews = g.Select(x => x).Merge(generateDistrictViewFunc)
                   };
        }

        public static TRegionDateView QueryRegionDateView<TRegionDateView, TDistrictView, TTownView>(
            this List<TTownView> townViews, DateTime initialDate,
            Func<TTownView, TDistrictView> generateDistrictViewFunc)
            where TRegionDateView : class, IRegionDateSpanView<TDistrictView, TTownView>, new()
            where TDistrictView : ICityDistrict
            where TTownView : class, ICityDistrictTown, IStatTime, new()
        {
            return new TRegionDateView
            {
                StatDate = townViews.Any() ? townViews.First().StatTime : initialDate,
                TownViews = townViews,
                DistrictViews = townViews.Merge(generateDistrictViewFunc)
            };
        }

        public static TRegionDateView QueryRegionDateDateView<TRegionDateView, TDistrictView, TTownView>(
            this List<TTownView> townViews, DateTime initialDate,
            Func<TTownView, TDistrictView> generateDistrictViewFunc)
            where TRegionDateView : class, IRegionDateSpanView<TDistrictView, TTownView>, new()
            where TDistrictView : ICityDistrict
            where TTownView : class, ICityDistrictTown, IStatDate, new()
        {
            return new TRegionDateView
            {
                StatDate = townViews.Any() ? townViews.First().StatDate : initialDate,
                TownViews = townViews,
                DistrictViews = townViews.Merge(generateDistrictViewFunc)
            };
        }

        public static TEntity QueryLastDate<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            string cellId, DateTime statDate)
            where TEntity : class, IStatDateCell, IEntity<ObjectId>
        {
            var nextDate = statDate.AddDays(1);
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.CellId == cellId && e.StatDate >= statDate && e.StatDate < nextDate);
            return repository.QueryOne(query);
        }

        public static IEnumerable<TEntity> QueryLastDate<TEntity>(this MongoDbRepositoryBase<TEntity, ObjectId> repository,
            string cellId, DateTime begin, DateTime end)
            where TEntity : class, IStatDateCell, IEntity<ObjectId>
        {
            var query =
                MongoDB.Driver.Builders.Query<TEntity>.Where(
                    e => e.CellId == cellId && e.StatDate >= begin && e.StatDate < end);
            return repository.QueryCursor(query);
        }

        public static async Task<IEnumerable<TEntity>> QueryAsync<TRepository, TEntity>(this TRepository repository,
            DateTime initialDate, Func<TRepository, DateTime, DateTime, Task<List<TEntity>>> queryDateFunc)
            where TEntity : Entity, IStatDate
            where TRepository : IRepository<TEntity>
        {
            var beginDate = initialDate;
            while (beginDate > initialDate.AddDays(-200))
            {
                var endDate = initialDate.AddDays(1);
                var result = await queryDateFunc(repository, beginDate, endDate);
                if (result.Any()) return result;
                beginDate = beginDate.AddDays(-1);
            }

            return new List<TEntity>();
        }

        public static IEnumerable<TEntity> QueryLastDate<TRepository, TEntity>(this TRepository repository,
            DateTime initialDate, Func<TRepository, DateTime, DateTime, List<TEntity>> queryDateFunc)
            where TEntity : Entity, IStatTime
            where TRepository : IRepository<TEntity>
        {
            var beginDate = initialDate;
            while (beginDate > initialDate.AddDays(-200))
            {
                var endDate = initialDate.AddDays(1);
                var result = queryDateFunc(repository, beginDate, endDate);
                if (result.Any()) return result;
                beginDate = beginDate.AddDays(-1);
            }

            return new List<TEntity>();
        }

        public static IEnumerable<TEntity> QueryDate<TRepository, TEntity>(this TRepository repository,
            DateTime initialDate, Func<TRepository, DateTime, DateTime, List<TEntity>> queryDateFunc)
            where TEntity : Entity, IStatDate
            where TRepository : IRepository<TEntity>
        {
            var beginDate = initialDate;
            while (beginDate > initialDate.AddDays(-200))
            {
                var endDate = initialDate.AddDays(1);
                var result = queryDateFunc(repository, beginDate, endDate);
                if (result.Any()) return result;
                beginDate = beginDate.AddDays(-1);
            }

            return new List<TEntity>();
        }

        public static IEnumerable<TEntity> QueryBeginDate<TRepository, TEntity>(this TRepository repository,
            DateTime initialDate, Func<TRepository, DateTime, DateTime, List<TEntity>> queryDateFunc)
            where TEntity : Entity, IBeginDate
            where TRepository : IRepository<TEntity>
        {
            var beginDate = initialDate;
            while (beginDate > initialDate.AddDays(-200))
            {
                var endDate = initialDate.AddDays(1);
                var result = queryDateFunc(repository, beginDate, endDate);
                if (result.Any()) return result;
                beginDate = beginDate.AddDays(-1);
            }

            return new List<TEntity>();
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