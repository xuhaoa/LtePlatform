using System.Collections.Generic;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface ICdmaCellRepository : IRepository<CdmaCell>, ISaveChanges
    {
        CdmaCell GetBySectorId(int btsId, byte sectorId);

        CdmaCell GetBySectorIdAndCellType(int btsId, byte sectorId, string cellType);

        List<CdmaCell> GetAllList(int btsId);

        List<CdmaCell> GetAllInUseList();
    }
}