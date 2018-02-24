using System;
using System.Collections.Generic;
using System.Web.Http;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP����С����ѯ������")]
    public class TopDownSwitchController : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly ENodebQueryService _eNodebQueryService;

        public TopDownSwitchController(FlowQueryService service, ENodebQueryService eNodebQueryService)
        {
            _service = service;
            _eNodebQueryService = eNodebQueryService;
        }

        [HttpGet]
        [ApiDoc("��ѯָ������ָ��ʱ�䷶Χ��TOP����С��ָ��ͳ��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiResponse("TOP����С��ָ��ͳ�ƣ���С������")]
        public IEnumerable<FlowView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = _service.QueryTopDownSwitchViews(city, district, begin, end, topCount);
            results.ForEach(x =>
            {
                var view = _eNodebQueryService.GetByENodebId(x.ENodebId);
                x.ENodebName = x?.ENodebName;
                x.City = city;
                x.District = district;
                x.Town = view?.TownName;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("ָ�����ڷ�Χ��TOP�����������׼�����TOP����С���б�")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiParameterDoc("orderSelection", "�����׼")]
        [ApiResponse("TOP����С���б�")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount, string orderSelection)
        {
            var results = _service.QueryTopDownSwitchViews(begin, end, topCount, orderSelection.GetEnumType<OrderDownSwitchPolicy>());
            results.ForEach(x =>
            {
                var view = _eNodebQueryService.GetByENodebId(x.ENodebId);
                x.ENodebName = x?.ENodebName;
                x.City = view?.CityName;
                x.District = view?.DistrictName;
                x.Town = view?.TownName;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("ָ�����ڷ�Χ��TOP�����������׼�����ָ������TOP����С���б�")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiParameterDoc("orderSelection", "�����׼")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("ָ������TOP����С���б�")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount, string orderSelection, string city, string district)
        {
            var results = _service.QueryTopDownSwitchViews(city, district, begin, end, topCount,
                orderSelection.GetEnumType<OrderDownSwitchPolicy>());
            results.ForEach(x =>
            {
                var view = _eNodebQueryService.GetByENodebId(x.ENodebId);
                view?.MapTo(x);
            });
            return results;
        }

    }
}