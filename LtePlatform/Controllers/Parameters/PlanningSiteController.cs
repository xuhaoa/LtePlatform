using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("规划站点查询控制器")]
    public class PlanningSiteController : ApiController
    {
        private readonly PlanningQueryService _service;

        public PlanningSiteController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询区域内的规划点")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("规划点视图列表")]
        public IEnumerable<PlanningSiteView> Get(string city, string district)
        {
            return _service.GetENodebsByDistrict(city, district);
        } 
    }
}