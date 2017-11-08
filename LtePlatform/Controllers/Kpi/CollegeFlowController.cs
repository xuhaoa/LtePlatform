using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("У԰��������ѯ������")]
    public class CollegeFlowController : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly CollegeCellViewService _collegeCellViewService;
        private readonly CollegeStatService _collegeService;
        private readonly TownFlowService _townFlowService;

        public CollegeFlowController(FlowQueryService service, CollegeCellViewService collegeCellViewService,
            CollegeStatService collegeService, TownFlowService townFlowService)
        {
            _service = service;
            _collegeCellViewService = collegeCellViewService;
            _collegeService = collegeService;
            _townFlowService = townFlowService;
        }

        [HttpGet]
        [ApiDoc("��ѯָ��ѧУָ�����ڷ�Χ���������")]
        [ApiParameterDoc("collegeName", "ѧУ����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("��ƽ������ͳ��")]
        public AggregateFlowView Get(string collegeName, DateTime begin, DateTime end)
        {
            var college = _collegeService.QueryInfo(collegeName);
            var cells = _collegeCellViewService.QueryCollegeSectors(collegeName);
            if (college == null) return null;
            var stats = _townFlowService.QueryTownFlowViews(begin, end, college.Id, FrequencyBandType.College);
            var result = stats.Any()
                ? stats.ArraySum().MapTo<AggregateFlowView>()
                : new AggregateFlowView();
            result.CellCount = cells.Count();
            return result;
        }

        [HttpGet]
        [ApiDoc("��ѯָ��ѧУָ�����ڷ�Χ�����������������������")]
        [ApiParameterDoc("collegeName", "ѧУ����")]
        [ApiParameterDoc("beginDate", "��ʼ����")]
        [ApiParameterDoc("endDate", "��������")]
        [ApiResponse("��������������������У�ÿ��һ����¼")]
        public IEnumerable<FlowView> GetDateViews(string collegeName, DateTime beginDate, DateTime endDate)
        {
            var cells = _collegeCellViewService.GetCollegeViews(collegeName);
            var viewList = cells.Select(cell => _service.Query(cell.ENodebId, cell.SectorId, beginDate, endDate))
                .Where(views => views != null && views.Any())
                .Aggregate((x, y) => x.Concat(y).ToList());
            if (!viewList.Any()) return new List<FlowView>();
            return viewList.GroupBy(x => x.StatTime).Select(x =>
            {
                var stat = x.ArraySum();
                stat.StatTime = x.Key;
                return stat;
            }).OrderBy(x=>x.StatTime);
        }

        [HttpGet]
        [ApiDoc("��ȡ��ѯ��������У԰��������ͳ��")]
        [ApiParameterDoc("statDate", "ͳ������")]
        [ApiResponse("����У԰��������ͳ��")]
        public IEnumerable<TownFlowStat> GetDateFlowView(DateTime statDate)
        {
            var beginDate = statDate.Date;
            var endDate = beginDate.AddDays(1);
            var colleges = _collegeService.QueryInfos();
            return colleges.Select(college =>
            {
                var cells = _collegeCellViewService.GetCollegeViews(college.Name);
                var viewListList = cells.Select(cell => _service.Query(cell.ENodebId, cell.SectorId, beginDate, endDate))
                    .Where(views => views != null && views.Any()).ToList();
                if (!viewListList.Any()) return null;
                var viewList = viewListList.Aggregate((x, y) => x.Concat(y).ToList());
                if (!viewList.Any()) return null;
                var stat = viewList.ArraySum().MapTo<TownFlowStat>();
                stat.FrequencyBandType = FrequencyBandType.College;
                stat.TownId = college.Id;
                return stat;
            }).Where(x => x != null);

        }
    }
}