using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP RRC����ʧ��С����ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class TopRrcFailController : ApiController
    {
        private readonly RrcQueryService _service;

        public TopRrcFailController(RrcQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ������ָ��ʱ�䷶Χ��TOP RRC����ʧ��С��ָ��ͳ��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiResponse("TOP RRC����ʧ��С��ָ��ͳ�ƣ���С������")]
        public IEnumerable<RrcView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            return _service.QueryTopRrcFailViews(city, district, begin, end, topCount);
        }
    }
}