using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Parameters
{
    public class ENodebBaseController : ApiController
    {
        private readonly BtsConstructionService _service;

        public ENodebBaseController(BtsConstructionService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ENodebBase> Get()
        {
            return _service.QueryEnodebBases();
        }

        [HttpGet]
        public IEnumerable<ENodebBase> Get(string searchText)
        {
            return _service.QueryEnodebBases(searchText);
        } 
    }
}