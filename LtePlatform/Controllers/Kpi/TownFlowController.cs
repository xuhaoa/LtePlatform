using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("��������ѯ������")]
    public class TownFlowController : ApiController
    {
        private readonly TownFlowService _service;

        public TownFlowController(TownFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ������ǰ���һ���м�¼����������")]
        [ApiParameterDoc("statDate", "ͳ������")]
        [ApiParameterDoc("frequency", "Ƶ������")]
        [ApiResponse("����������ÿ����һ����¼")]
        public IEnumerable<TownFlowView> Get(DateTime statDate, string frequency)
        {
            return _service.QueryLastDateView(statDate, frequency.GetBandFromFcn());
        }

        [HttpGet]
        [ApiDoc("��ѯָ�������м�¼����������")]
        [ApiParameterDoc("currentDate", "ͳ������")]
        [ApiParameterDoc("frequency", "Ƶ������")]
        [ApiResponse("����������ÿ����һ����¼")]
        public IEnumerable<TownFlowStat> GetCurrentDate(DateTime currentDate, string frequency)
        {
            return _service.QueryCurrentDateStats(currentDate, frequency.GetBandFromFcn());
        }

        [HttpGet]
        [ApiDoc("��ѯʱ���������������ͳ��")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("city", "��������")]
        [ApiParameterDoc("frequency", "Ƶ������")]
        [ApiResponse("������ͳ���б�")]
        public IEnumerable<FlowRegionDateView> Get(DateTime begin, DateTime end, string city, string frequency)
        {
            return _service.QueryDateSpanStats(begin, end, city, frequency.GetBandFromFcn());
        }

        [HttpPost]
        public TownFlowStat Post(TownFlowStat stat)
        {
            return _service.Update(stat);
        }
    }
}