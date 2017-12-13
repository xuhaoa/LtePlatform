using System;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.RegionKpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("����RRC���ӳɹ��ʲ�ѯ������")]
    public class FlowRegionController : ApiController
    {
        private readonly TownFlowService _service;

        public FlowRegionController(TownFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����е������ڵ�����������ͳ��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("statDate", "����")]
        [ApiResponse("����������ͳ��")]
        public FlowRegionDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }
    }
}