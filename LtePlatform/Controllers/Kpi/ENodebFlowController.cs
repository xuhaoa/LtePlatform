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
        private readonly FlowService _service;

        public ENodebFlowController(FlowService service)
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
    }
}