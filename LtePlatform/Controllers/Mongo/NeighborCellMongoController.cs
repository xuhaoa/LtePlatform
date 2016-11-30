using Lte.Evaluations.DataService.Mr;
using Lte.Evaluations.ViewModels.Mr;
using Lte.Parameters.Entities.Neighbor;
using System.Collections.Generic;
using System.Web.Http;

namespace LtePlatform.Controllers.Mongo
{
    public class NeighborCellMongoController : ApiController
    {
        private readonly NeighborCellMongoService _service;

        public NeighborCellMongoController(NeighborCellMongoService service)
        {
            _service = service;
        }

        [HttpGet]
        public List<NeighborCellMongo> Get(int eNodebId, byte sectorId)
        {
            return _service.QueryNeighbors(eNodebId, sectorId);
        }

        [HttpGet]
        public List<NeighborCellMongo> GetReverse(int destENodebId, byte destSectorId)
        {
            return _service.QueryReverseNeighbors(destENodebId, destSectorId);
        }

        [HttpGet]
        public List<ExternalEUtranCellFDDZte> Get(int eNodebId)
        {
            return _service.QueryExternalCells(eNodebId);
        }
    }
}
