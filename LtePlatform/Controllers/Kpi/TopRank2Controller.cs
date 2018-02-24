using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;
using System.Linq;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("TOP˫���Ȳ�ѯ������")]
    public class TopRank2Controller : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly ENodebQueryService _eNodebQueryServicee;

        public TopRank2Controller(FlowQueryService service, ENodebQueryService eNodebQueryServicee)
        {
            _service = service;
            _eNodebQueryServicee = eNodebQueryServicee;
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
            var views = _service.QueryTopRank2Views(city, district, begin, end, topCount).ToList();
            views.ForEach(view =>
            {
                var eNodeb = _eNodebQueryServicee.GetByENodebId(view.ENodebId);
                view.ENodebName = eNodeb?.Name;
                view.City = city;
                view.District = district;
                view.Town = eNodeb?.TownName;
            });
            return views;
        }

        [HttpGet]
        [ApiDoc("��ѯָ��ʱ�䷶Χ��TOP˫����С��ָ��ͳ��")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiParameterDoc("topCount", "TOP����")]
        [ApiResponse("TOP˫����С��ָ��ͳ�ƣ���С������")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount)
        {
            var views = _service.QueryAllTopRank2Views(begin, end, topCount).ToList();
            views.ForEach(view =>
            {
                var eNodeb = _eNodebQueryServicee.GetByENodebId(view.ENodebId);
                view.ENodebName = eNodeb?.Name;
                view.City = eNodeb?.CityName;
                view.District = eNodeb?.DistrictName;
                view.Town = eNodeb?.TownName;
            });
            return views;
        }
    }
}