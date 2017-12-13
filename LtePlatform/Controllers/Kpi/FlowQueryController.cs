using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("������ѯ������")]
    public class FlowQueryController : ApiController
    {
        private readonly FlowQueryService _service;

        public FlowQueryController(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����ڷ�Χ��ָ��С�����������������������")]
        [ApiParameterDoc("eNodebId", "��վ���")]
        [ApiParameterDoc("sectorId", "�������")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("���������������������")]
        public List<FlowView> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.Query(eNodebId, sectorId, begin.Date, end.Date);
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����ڷ�Χ��ָ��С��ƽ���������")]
        [ApiParameterDoc("eNodebId", "��վ���")]
        [ApiParameterDoc("sectorId", "�������")]
        [ApiParameterDoc("beginDate", "��ʼ����")]
        [ApiParameterDoc("endDate", "��������")]
        [ApiResponse("ƽ���������")]
        public FlowView GetAverage(int eNodebId, byte sectorId, DateTime beginDate, DateTime endDate)
        {
            return _service.QueryAverageView(eNodebId, sectorId, beginDate, endDate);
        }
    }
}