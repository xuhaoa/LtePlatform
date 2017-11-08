using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园VIP需求查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeVipDemandController : ApiController
    {
        private readonly VipDemandService _service;

        public CollegeVipDemandController(VipDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定校园名称指定年份的VIP需求")]
        [ApiParameterDoc("collegeName", "指定校园名称")]
        [ApiParameterDoc("year", "指定年份")]
        [ApiResponse("VIP需求")]
        public VipDemandDto Get(string collegeName, int year)
        {
            return _service.QueryYearDemand(collegeName, year);
        }

        [HttpGet]
        [ApiDoc("查询指定年份的VIP需求列表")]
        [ApiParameterDoc("year", "指定年份")]
        [ApiResponse("VIP需求列表")]
        public IEnumerable<VipDemandDto> Get(int year)
        {
            return _service.QueryYearDemands(year);
        }

        [HttpPost]
        [Authorize]
        [ApiDoc("保存单个校园网年度信息")]
        [ApiParameterDoc("stat", "单个校园网年度信息")]
        public async Task<int> Post(CollegeYearView stat)
        {
            return await _service.ConstructCollegeDemand(stat, User.Identity.Name);
        }
    }
}