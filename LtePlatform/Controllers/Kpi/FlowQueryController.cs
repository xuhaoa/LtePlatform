using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.Kpi;

namespace LtePlatform.Controllers.Kpi
{
    public class FlowQueryController : ApiController
    {
        private readonly FlowQueryService _service;

        public FlowQueryController(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        public List<FlowView> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryFlow(eNodebId, sectorId, begin.Date, end.Date);
        }

        [HttpGet]
        public FlowView GetAverage(int eNodebId, byte sectorId, DateTime beginDate, DateTime endDate)
        {
            return _service.QueryAverageView(eNodebId, sectorId, beginDate, endDate);
        }
    }
}
