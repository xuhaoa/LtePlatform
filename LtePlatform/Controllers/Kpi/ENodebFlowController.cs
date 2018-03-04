using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("��վ��������ѯ������")]
    public class ENodebFlowController : ApiController
    {
        private readonly ENodebFlowService _service;

        public ENodebFlowController(ENodebFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����ڷ�Χ�ڵĻ�վ������ͳ��")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("frequency", "Ƶ������")]
        [ApiResponse("ָ�����ڷ�Χ�ڵĻ�վ������ͳ��")]
        public IEnumerable<ENodebFlowView> Get(DateTime begin, DateTime end, string frequency)
        {
            return _service.GetENodebFlowViews(begin, end, frequency.GetBandFromFcn());
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����ڷ�Χ�ڵĻ�վ������ͳ��")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("frequency", "Ƶ������")]
        [ApiResponse("ָ�����ڷ�Χ�ڵĻ�վ������ͳ��")]
        public IEnumerable<ENodebFlowView> Get(DateTime begin, DateTime end, string city, string district, string frequency)
        {
            return _service.GetENodebFlowViews(begin, end, city, district, frequency.GetBandFromFcn());
        }
    }
}