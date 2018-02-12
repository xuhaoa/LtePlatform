using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Parameters
{
    public class ConstructionController : ApiController
    {
        private readonly BtsConstructionService _service;

        public ConstructionController(BtsConstructionService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ConstructionView> Get(string searchTxt, double west,
            double east, double south, double north, string district, string town)
        {
            return _service.QueryConstructionInformations(searchTxt, west, east, south, north, district, town);
        }

        [HttpGet]
        public IEnumerable<ConstructionView> Get(string searchTxt, string district, string town)
        {
            return _service.QueryConstructionInformations(searchTxt, district, town);
        } 
    }
}