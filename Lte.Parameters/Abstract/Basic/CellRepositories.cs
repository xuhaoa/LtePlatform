using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;

namespace Lte.Parameters.Abstract.Basic
{
    public interface ICdmaCellRepository : IRepository<CdmaCell>, ISaveChanges
    {
        CdmaCell GetBySectorId(int btsId, byte sectorId);

        CdmaCell GetBySectorIdAndCellType(int btsId, byte sectorId, string cellType);

        List<CdmaCell> GetAllList(int btsId);

        List<CdmaCell> GetAllInUseList();
    }
}
