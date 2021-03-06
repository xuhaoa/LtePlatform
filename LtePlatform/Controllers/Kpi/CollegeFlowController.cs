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
    [ApiControl("校园网流量查询控制器")]
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
        [ApiDoc("查询指定学校指定日期范围内流量情况")]
        [ApiParameterDoc("collegeName", "学校名称")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("天平均流量统计")]
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
        [ApiDoc("查询指定学校指定日期范围内流量情况，按照日期排列")]
        [ApiParameterDoc("collegeName", "学校名称")]
        [ApiParameterDoc("beginDate", "开始日期")]
        [ApiParameterDoc("endDate", "结束日期")]
        [ApiResponse("流量情况，按照日期排列，每天一条记录")]
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
        [ApiDoc("抽取查询单日所有校园网的流量统计")]
        [ApiParameterDoc("statDate", "统计日期")]
        [ApiResponse("所有校园网的流量统计")]
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