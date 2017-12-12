using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.RegionKpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("����ȷ�����ʲ�ѯ������")]
    public class PreciseRegionController : ApiController
    {
        private readonly PreciseRegionStatService _service;

        public PreciseRegionController(PreciseRegionStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����е������ڵ�����ȷ������")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("statDate", "����")]
        [ApiResponse("����ȷ������")]
        public PreciseRegionDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����к�ʱ��ε�����ȷ�������б�")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("����ȷ�������б�")]
        public IEnumerable<PreciseRegionDateView> Get(DateTime begin, DateTime end, string city)
        {
            return _service.QueryDateViews(begin, end, city);
        }
    }
}