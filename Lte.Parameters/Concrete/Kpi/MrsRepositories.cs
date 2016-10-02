using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using MongoDB.Bson;

namespace Lte.Parameters.Concrete.Kpi
{
    public class MrsPhrRepository : MongoDbRepositoryBase<MrsPhrStat, ObjectId>, IMrsPhrRepository
    {
        public MrsPhrRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "mrs_PowerHeadRoom_combined";
        }

        public MrsPhrRepository() : this(new MyMongoProvider("ouyh"))
        {

        }

        public MrsPhrStat Get(string cellId, DateTime statDate)
        {
            return this.Query(cellId, statDate);
        }

        public IEnumerable<MrsPhrStat> GetList(string cellId, DateTime begin, DateTime end)
        {
            return this.Query(cellId, begin, end);
        }
    }

    public class MrsRsrpRepository : MongoDbRepositoryBase<MrsRsrpStat, ObjectId>, IMrsRsrpRepository
    {
        public MrsRsrpRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "mrs_RSRP_combined";
        }

        public MrsRsrpRepository() : this(new MyMongoProvider("ouyh"))
        {

        }

        public MrsRsrpStat Get(string cellId, DateTime statDate)
        {
            return this.Query(cellId, statDate);
        }

        public IEnumerable<MrsRsrpStat> GetList(string cellId, DateTime begin, DateTime end)
        {
            return this.Query(cellId, begin, end);
        }
    }

    public class MrsSinrUlRepository : MongoDbRepositoryBase<MrsSinrUlStat, ObjectId>, IMrsSinrUlRepository
    {
        public MrsSinrUlRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "mrs_SinrUL_combined";
        }
        public MrsSinrUlRepository() : this(new MyMongoProvider("ouyh"))
        {

        }

        public MrsSinrUlStat Get(string cellId, DateTime statDate)
        {
            return this.Query(cellId, statDate);
        }

        public IEnumerable<MrsSinrUlStat> GetList(string cellId, DateTime begin, DateTime end)
        {
            return this.Query(cellId, begin, end);
        }
    }

    public class MrsTadvRsrpRepository : MongoDbRepositoryBase<MrsTadvRsrpStat, ObjectId>, IMrsTadvRsrpRepository
    {
        public MrsTadvRsrpRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "mrs_TadvRsrp_combined";
        }

        public MrsTadvRsrpRepository() : this(new MyMongoProvider("ouyh"))
        {

        }

        public MrsTadvRsrpStat Get(string cellId, DateTime statDate)
        {
            return this.Query(cellId, statDate);
        }

        public IEnumerable<MrsTadvRsrpStat> GetList(string cellId, DateTime begin, DateTime end)
        {
            return this.Query(cellId, begin, end);
        }
    }

    public class MrsTadvRepository : MongoDbRepositoryBase<MrsTadvStat, ObjectId>, IMrsTadvRepository
    {
        public MrsTadvRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
            CollectionName = "mrs_Tadv_combined";
        }

        public MrsTadvRepository() : this(new MyMongoProvider("ouyh"))
        {

        }

        public MrsTadvStat Get(string cellId, DateTime statDate)
        {
            return this.Query(cellId, statDate);
        }

        public IEnumerable<MrsTadvStat> GetList(string cellId, DateTime begin, DateTime end)
        {
            return this.Query(cellId, begin, end);
        }
    }
}
