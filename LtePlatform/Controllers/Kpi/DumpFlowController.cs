using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Kpi;
using Lte.Parameters.Entities.Kpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("导入流量查询控制器")]
    public class DumpFlowController : ApiController
    {
        private readonly FlowService _service;
        private readonly ENodebFlowService _eNodebFlowService;

        public DumpFlowController(FlowService service, ENodebFlowService eNodebFlowService)
        {
            _service = service;
            _eNodebFlowService = eNodebFlowService;
        }

        [HttpGet]
        [ApiDoc("获取给定日期范围内的历史流量记录数")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("历史流量记录数")]
        public async Task<IEnumerable<FlowHistory>> Get(DateTime begin, DateTime end)
        {
            return await _service.GetFlowHistories(begin.Date, end.Date);
        }

        [HttpGet]
        public async Task<Tuple<int, int, int, int, int, int, int>> Get(DateTime statDate)
        {
            return await _eNodebFlowService.GenerateTownStats(statDate);
        }

        [HttpGet]
        public IEnumerable<CellIdPair> Get(DateTime statDate, int townId)
        {
            return _service.QueryUnmatchedHuaweis(townId, statDate);
        }
    }
}