using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Lte.Parameters.Entities.Mr;
using MongoDB.Bson;

namespace Lte.Parameters.Abstract.Kpi
{
    public interface IInterferenceMongoRepository : IRepository<InterferenceMatrixMongo, ObjectId>
    {
        List<InterferenceMatrixMongo> GetList(string cellId);

        Task<List<InterferenceMatrixMongo>> GetListAsync(string cellId);

        Task<List<InterferenceMatrixMongo>> GetListAsync(string cellId, DateTime date);

        List<InterferenceMatrixMongo> GetList(string cellId, short neighborPci, DateTime date);

        InterferenceMatrixMongo GetOne(string cellId);
    }
}
