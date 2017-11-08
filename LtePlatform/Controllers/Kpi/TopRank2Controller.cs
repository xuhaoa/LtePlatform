using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP双流比查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class TopRank2Controller : ApiController
    {
        private readonly FlowQueryService _service;

        public TopRank2Controller(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定区域指定时间范围内TOP双流比小区指标统计")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiResponse("TOP双流比小区指标统计，按小区排列")]
        public IEnumerable<FlowView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            return _service.QueryTopRank2Views(city, district, begin, end, topCount);
        }
    }
}