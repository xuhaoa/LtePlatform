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
        List<InterferenceMatrixMongo> GetList(int eNodebId, short pci);

        Task<List<InterferenceMatrixMongo>> GetListAsync(int eNodebId, short pci);

        Task<List<InterferenceMatrixMongo>> GetListAsync(int eNodebId, short pci, DateTime date);

        List<InterferenceMatrixMongo> GetList(int eNodebId, short pci, short neighborPci, DateTime date);

        InterferenceMatrixMongo GetOne(int eNodebId, short pci);
    }

    public interface ICellStasticRepository : IRepository<CellStastic, ObjectId>
    {
        List<CellStastic> GetList(int eNodebId, short pci);

        List<CellStastic> GetList(int eNodebId, short pci, DateTime date);
    }

    public interface ICellDistanceRepository : IRepository<CellDistance, ObjectId>
    {
        List<CellDistance> GetTotalList(int eNodebId, short pci, DateTime begin);

        List<CellDistance> GetTotalList(int eNodebId, short pci, DateTime begin, DateTime end);

        List<CellDistance> GetRsrpList(int eNodebId, short pci, DateTime date);

        List<CellDistance> GetRsrpList(int eNodebId, short pci, DateTime begin, DateTime end);

        List<CellDistance> Get110List(int eNodebId, short pci, DateTime date);

        List<CellDistance> Get110List(int eNodebId, short pci, DateTime begin, DateTime end);

        List<CellDistance> Get105List(int eNodebId, short pci, DateTime date);

        List<CellDistance> Get105List(int eNodebId, short pci, DateTime begin, DateTime end);
    }
}
