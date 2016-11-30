using Abp.Domain.Repositories;
using Abp.EntityFramework.Dependency;
using Lte.Parameters.Entities.Kpi;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lte.Parameters.Abstract.Kpi
{
    public interface IInterferenceMongoRepository : IRepository<InterferenceMatrixMongo, ObjectId>
    {
        List<InterferenceMatrixMongo> GetList(string cellId);

        Task<List<InterferenceMatrixMongo>> GetListAsync(string cellId);

        Task<List<InterferenceMatrixMongo>> GetListAsync(string cellId, DateTime date);

        InterferenceMatrixMongo Get(string cellId, short neighborPci, DateTime date);

        InterferenceMatrixMongo GetOne(string cellId);
    }

    public interface IMrsPhrRepository : IRepository<MrsPhrStat, ObjectId>, IStatDateCellRepository<MrsPhrStat>
    {
        
    }

    public interface IMrsRsrpRepository : IRepository<MrsRsrpStat, ObjectId>, IStatDateCellRepository<MrsRsrpStat>
    {
        
    }

    public interface IMrsSinrUlRepository : IRepository<MrsSinrUlStat, ObjectId>, IStatDateCellRepository<MrsSinrUlStat>
    {
        
    }

    public interface IMrsTadvRsrpRepository : IRepository<MrsTadvRsrpStat, ObjectId>,
        IStatDateCellRepository<MrsTadvRsrpStat>
    {
        
    }

    public interface IMrsTadvRepository : IRepository<MrsTadvStat, ObjectId>, IStatDateCellRepository<MrsTadvStat>
    {
        
    }
}
