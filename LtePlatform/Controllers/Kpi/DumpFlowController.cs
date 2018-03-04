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
    [ApiControl("����������ѯ������")]
    public class DumpFlowController : ApiController
    {
        private readonly FlowService _service;
        private readonly TownKpiService _kpiService;

        public DumpFlowController(FlowService service, TownKpiService kpiService)
        {
            _service = service;
            _kpiService = kpiService;
        }

        [HttpGet]
        [ApiDoc("��ȡ�������ڷ�Χ�ڵ���ʷ������¼��")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("��ʷ������¼��")]
        public async Task<IEnumerable<FlowHistory>> Get(DateTime begin, DateTime end)
        {
            return await _service.GetFlowHistories(begin.Date, end.Date);
        }

        [HttpGet]
        public async Task<Tuple<int, int, int, int, int, int, int>> Get(DateTime statDate)
        {
            return await _kpiService.GenerateTownStats(statDate);
        }

        [HttpGet]
        public IEnumerable<CellIdPair> Get(DateTime statDate, int townId)
        {
            return _service.QueryUnmatchedHuaweis(townId, statDate);
        }
    }
}