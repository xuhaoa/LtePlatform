using Abp.Domain.Repositories;
using Lte.Parameters.Entities.Neighbor;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Lte.Parameters.Abstract.Neighbor
{
    public interface IEutranIntraFreqNCellRepository : IRepository<EutranIntraFreqNCell, ObjectId>
    {
        List<EutranIntraFreqNCell> GetRecentList(int eNodebId, byte localCellId);

        List<EutranIntraFreqNCell> GetReverseList(int destENodebId, byte destSectorId);

        List<EutranIntraFreqNCell> GetAllReverseList(int destENodebId, byte destSectorId);
    }
}
