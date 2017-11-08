using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP下切小区查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class TopDownSwitchController : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly ENodebQueryService _eNodebQueryService;

        public TopDownSwitchController(FlowQueryService service, ENodebQueryService eNodebQueryService)
        {
            _service = service;
            _eNodebQueryService = eNodebQueryService;
        }

        [HttpGet]
        [ApiDoc("查询指定区域指定时间范围内TOP下切小区指标统计")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiResponse("TOP下切小区指标统计，按小区排列")]
        public IEnumerable<FlowView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = _service.QueryTopDownSwitchViews(city, district, begin, end, topCount);
            results.ForEach(x =>
            {
                x.ENodebName = _eNodebQueryService.GetByENodebId(x.ENodebId)?.Name;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("指定日期范围、TOP个数和排序标准，获得TOP下切小区列表")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiParameterDoc("orderSelection", "排序标准")]
        [ApiResponse("TOP下切小区列表")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount, string orderSelection)
        {
            var results = _service.QueryTopDownSwitchViews(begin, end, topCount, orderSelection.GetEnumType<OrderDownSwitchPolicy>());
            results.ForEach(x =>
            {
                x.ENodebName = _eNodebQueryService.GetByENodebId(x.ENodebId)?.Name;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("指定日期范围、TOP个数和排序标准，获得指定区域TOP下切小区列表")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiParameterDoc("orderSelection", "排序标准")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("指定区域TOP下切小区列表")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount, string orderSelection, string city, string district)
        {
            var results = _service.QueryTopDownSwitchViews(city, district, begin, end, topCount,
                orderSelection.GetEnumType<OrderDownSwitchPolicy>());
            results.ForEach(x =>
            {
                x.ENodebName = _eNodebQueryService.GetByENodebId(x.ENodebId)?.Name;
            });
            return results;
        }

    }
}