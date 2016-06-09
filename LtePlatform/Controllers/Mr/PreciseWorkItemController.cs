using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Mr
{
    public class PreciseWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public PreciseWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpGet]
        public PreciseWorkItemCell Get(string number, int eNodebId, byte sectorId)
        {
            return _service.Query(number, eNodebId, sectorId);
        }

        [HttpGet]
        public List<PreciseWorkItemCell> Get(string number)
        {
            return _service.Query(number);
        }
    }

    public class InterferenceNeighborWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public InterferenceNeighborWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task Post(PreciseInterferenceNeighborsContainer container)
        {
            await _service.UpdateAsync(container);
        }
    }

    public class InterferenceVictimWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public InterferenceVictimWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task Post(PreciseInterferenceVictimsContainer container)
        {
            await _service.UpdateAsync(container);
        }
    }

    public class CoverageWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public CoverageWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task Post(PreciseCoveragesContainer container)
        {
            await _service.UpdateAsync(container);
        }
    }
}
