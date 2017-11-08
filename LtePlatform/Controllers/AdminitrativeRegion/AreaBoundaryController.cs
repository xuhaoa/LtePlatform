using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.AdminitrativeRegion
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class AreaBoundaryController : ApiController
    {
        private readonly TownBoundaryService _service;

        public AreaBoundaryController(TownBoundaryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<AreaBoundaryView> Get()
        {
            return _service.GetAreaBoundaryViews();
        }
    }
}