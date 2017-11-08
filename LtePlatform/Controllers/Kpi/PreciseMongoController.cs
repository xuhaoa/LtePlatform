using System;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;

namespace LtePlatform.Controllers.Kpi
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
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