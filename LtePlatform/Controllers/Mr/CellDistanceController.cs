using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;

namespace LtePlatform.Controllers.Mr
{
    public class AverageRsrpTaController : ApiController
    {
        public readonly CellDistanceService _service;

        public AverageRsrpTaController(CellDistanceService service)
        {
            _service = service;
        }

        public List<double> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryAverageRsrpTaStatList(eNodebId, sectorId, date);
        }
    }

    public class Above110TaRateController : ApiController
    {
        public readonly CellDistanceService _service;

        public Above110TaRateController(CellDistanceService service)
        {
            _service = service;
        }

        public List<double> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryAbove110TaRateList(eNodebId, sectorId, date);
        }
    }

    public class Above105TaRateController : ApiController
    {
        public readonly CellDistanceService _service;

        public Above105TaRateController(CellDistanceService service)
        {
            _service = service;
        }

        public List<double> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryAbove105TaRateList(eNodebId, sectorId, date);
        }
    }
}
