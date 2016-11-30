using Abp.Domain.Repositories;
using Lte.Parameters.Entities.Neighbor;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Lte.Parameters.Abstract.Basic
{
    public interface IEutranInterNFreqRepository : IRepository<EutranInterNFreq, ObjectId>
    {
        List<EutranInterNFreq> GetRecentList(int eNodebId);

        List<EutranInterNFreq> GetRecentList(int eNodebId, int localCellId);
    }
}
