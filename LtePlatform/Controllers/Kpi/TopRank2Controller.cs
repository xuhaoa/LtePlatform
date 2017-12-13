using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP˫���Ȳ�ѯ������")]
    public class TopRank2Controller : ApiController
    {
        private readonly FlowQueryService _service;

        public TopRank2Controller(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ������ָ��ʱ�䷶Χ��TOP˫����С��ָ��ͳ��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiResponse("TOP˫����С��ָ��ͳ�ƣ���С������")]
        public IEnumerable<FlowView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            return _service.QueryTopRank2Views(city, district, begin, end, topCount);
        }
    }
}