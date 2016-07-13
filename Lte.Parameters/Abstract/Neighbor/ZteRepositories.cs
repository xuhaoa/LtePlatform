using System.Collections.Generic;
using Abp.Domain.Repositories;
using Lte.Parameters.Concrete.Neighbor;
using Lte.Parameters.Entities.Channel;
using Lte.Parameters.Entities.Neighbor;
using MongoDB.Bson;

namespace Lte.Parameters.Abstract.Neighbor
{
    public interface IEUtranRelationZteRepository : IRepository<EUtranRelationZte, ObjectId>
    {
        List<EUtranRelationZte> GetRecentList(int eNodebId, byte sectorId);

        List<EUtranRelationZte> GetRecentList(int eNodebId);

        EUtranRelationZte GetRecent(int eNodebId, int externalId);
    }

    public interface IExternalEUtranCellFDDZteRepository : IRepository<ExternalEUtranCellFDDZte, ObjectId>
    {
        List<ExternalEUtranCellFDDZte> GetRecentList(int eNodebId);

        List<ExternalEUtranCellFDDZte> GetReverseList(int destENodebId, byte destSectorId);
    }

    public interface ILteNeighborCellRepository : IRepository<LteNeighborCell>
    {
        List<LteNeighborCell> GetAllList(int cellId, byte sectorId);
    }

    public interface INearestPciCellRepository : IRepository<NearestPciCell>
    {
        List<NearestPciCell> GetAllList(int cellId, byte sectorId);

        NearestPciCell GetNearestPciCell(int cellId, byte sectorId, short pci);

        int SaveChanges();
    }
}
