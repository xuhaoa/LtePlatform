using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP CQI������С�^��ѯ������")]
    public class TopCqiController : ApiController
    {
        private readonly CqiQueryService _service;
        private readonly ENodebQueryService _eNodebQueryService;

        public TopCqiController(CqiQueryService service, ENodebQueryService eNodebQueryService)
        {
            _service = service;
            _eNodebQueryService = eNodebQueryService;
        }

        [HttpGet]
        [ApiDoc("��ѯָ������ָ��ʱ�䷶Χ��TOP CQI������С��ָ��ͳ��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiResponse("TOP CQI������С��ָ��ͳ�ƣ���С������")]
        public IEnumerable<QciView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = _service.QueryTopCqiViews(city, district, begin, end, topCount);
            results.ForEach(x =>
            {
                var view = _eNodebQueryService.GetByENodebId(x.ENodebId);
                x.ENodebName = view?.Name;
                x.City = city;
                x.District = district;
                x.Town = view?.TownName;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("ָ�����ڷ�Χ��TOP�����������׼�����TOP CQI������С���б�")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiParameterDoc("orderSelection", "�����׼")]
        [ApiResponse("TOP CQI������С���б�")]
        public IEnumerable<QciView> Get(DateTime begin, DateTime end, int topCount, string orderSelection)
        {
            var results = _service.QueryTopCqiViews(begin, end, topCount, orderSelection.GetEnumType<OrderCqiPolicy>());
            results.ForEach(x =>
            {
                var view = _eNodebQueryService.GetByENodebId(x.ENodebId);
                x.ENodebName = view?.Name;
                x.City = view?.CityName;
                x.District = view?.DistrictName;
                x.Town = view?.TownName;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("ָ�����ڷ�Χ��TOP�����������׼�����ָ������TOP CQI������С���б�")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiParameterDoc("orderSelection", "�����׼")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("ָ������TOP CQI������С���б�")]
        public IEnumerable<QciView> Get(DateTime begin, DateTime end, int topCount, string orderSelection, string city, string district)
        {
            var results = _service.QueryTopCqiViews(city, district, begin, end, topCount,
                orderSelection.GetEnumType<OrderCqiPolicy>());
            results.ForEach(x =>
            {
                var view = _eNodebQueryService.GetByENodebId(x.ENodebId);
                x.ENodebName = view?.Name;
                x.City = city;
                x.District = district;
                x.Town = view?.TownName;
            });
            return results;
        }

    }
}