using System;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;

namespace LtePlatform.Controllers.Kpi
{
    public class PreciseMongoController : ApiController
    {
        private readonly PreciseImportService _service;

        public PreciseMongoController(PreciseImportService service)
        {
            _service = service;
        }

        [HttpGet]
        public int Get(DateTime statDate)
        {
            return _service.UpdateItems(statDate);
        }
    }
}