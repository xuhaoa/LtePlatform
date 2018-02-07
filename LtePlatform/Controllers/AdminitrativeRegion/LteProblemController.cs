using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Lte.Evaluations.DataService.Dump;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.AdminitrativeRegion
{
    public class LteProblemController : ApiController
    {
        private readonly LteProblemService _service;

        public LteProblemController(LteProblemService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<LteProblem> Get(string type)
        {
            return _service.QueryProblems(type);
        }
    }
}