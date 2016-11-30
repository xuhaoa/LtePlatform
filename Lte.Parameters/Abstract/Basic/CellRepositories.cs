using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;

namespace Lte.Parameters.Abstract.Basic
{
    public interface ICellRepository : IRepository<Cell>, IMatchRepository<Cell, CellExcel>, ISaveChanges
    {
        void AddCells(IEnumerable<Cell> cells);

        Cell GetBySectorId(int eNodebId, byte sectorId);

        Cell GetByFrequency(int eNodebId, int frequency);

        List<Cell> GetAllList(int eNodebId);

        List<Cell> GetAllList(double west, double east, double south, double north);

        List<Cell> GetAllInUseList();
    }

    public interface ICdmaCellRepository : IRepository<CdmaCell>, ISaveChanges
    {
        CdmaCell GetBySectorId(int btsId, byte sectorId);

        CdmaCell GetBySectorIdAndCellType(int btsId, byte sectorId, string cellType);

        List<CdmaCell> GetAllList(int btsId);

        List<CdmaCell> GetAllInUseList();
    }
}
