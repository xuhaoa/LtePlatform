using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.RegionKpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("����RRC���ӳɹ��ʲ�ѯ������")]
    public class RrcRegionController : ApiController
    {
        private readonly RrcRegionStatService _service;

        public RrcRegionController(RrcRegionStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����е������ڵ�����RRC���ӳɹ���")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("statDate", "����")]
        [ApiResponse("����RRC���ӳɹ���")]
        public RrcRegionDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����к�ʱ��ε�����RRC���ӳɹ����б�")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("����RRC���ӳɹ����б�")]
        public IEnumerable<RrcRegionDateView> Get(DateTime begin, DateTime end, string city)
        {
            return _service.QueryDateViews(begin, end, city);
        }
    }
}