using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("基站级流量查询控制器")]
    public class ENodebFlowController : ApiController
    {
        private readonly FlowService _service;

        public ENodebFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的基站级流量统计")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("frequency", "频段描述")]
        [ApiResponse("指定日期范围内的基站级流量统计")]
        public IEnumerable<ENodebFlowView> Get(DateTime begin, DateTime end, string frequency)
        {
            return _service.GetENodebFlowViews(begin, end, frequency.GetBandFromFcn());
        } 
    }
}