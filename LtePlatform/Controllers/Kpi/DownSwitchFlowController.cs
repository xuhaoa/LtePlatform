using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.RegionKpi;
using LtePlatform.Models;
using System;
using System.Web.Http;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("区域4G用户3G流量比查询控制器")]
    public class DownSwitchFlowController : ApiController
    {
        private readonly DownSwitchFlowService _service;

        public DownSwitchFlowController(DownSwitchFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定城市单个日期的区域4G用户3G流量比")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("statDate", "日期")]
        [ApiResponse("区域4G用户3G流量比")]
        public DownSwitchFlowDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }
    }
}
