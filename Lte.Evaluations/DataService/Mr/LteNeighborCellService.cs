
using Lte.Parameters.Entities.Neighbor;
using System.Collections.Generic;
using Lte.Parameters.Abstract;

namespace Lte.Evaluations.DataService.Mr
{
    public class LteNeighborCellService
    {
        private readonly ILteNeighborCellRepository _repository;

        public LteNeighborCellService(ILteNeighborCellRepository repository)
        {
            _repository = repository;
        }

        public List<LteNeighborCell> QueryCells(int cellId, byte sectorId)
        {
            return _repository.GetAllList(x => x.CellId == cellId && x.SectorId == sectorId);
        }
    }
}
