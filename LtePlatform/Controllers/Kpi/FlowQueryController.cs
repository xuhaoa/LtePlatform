using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("流量查询控制器")]
    public class FlowQueryController : ApiController
    {
        private readonly FlowQueryService _service;

        public FlowQueryController(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内指定小区流量情况，按照日期排列")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("流量情况，按照日期排列")]
        public List<FlowView> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryFlow(eNodebId, sectorId, begin.Date, end.Date);
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内指定小区平均流量情况")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("beginDate", "开始日期")]
        [ApiParameterDoc("endDate", "结束日期")]
        [ApiResponse("平均流量情况")]
        public FlowView GetAverage(int eNodebId, byte sectorId, DateTime beginDate, DateTime endDate)
        {
            return _service.QueryAverageView(eNodebId, sectorId, beginDate, endDate);
        }
    }

    [ApiControl("镇级流量查询控制器")]
    public class TownFlowController : ApiController
    {
        private readonly TownFlowService _service;

        public TownFlowController(TownFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期前镇级天流量")]
        [ApiParameterDoc("statDate", "统计日期")]
        [ApiResponse("镇级天流量，每个镇一条记录")]
        public IEnumerable<TownFlowView> Get(DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate);
        } 
    }

    [ApiControl("校园网流量查询控制器")]
    public class CollegeFlowController : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly CollegeCellViewService _collegeCellViewService;

        public CollegeFlowController(FlowQueryService service, CollegeCellViewService collegeCellViewService)
        {
            _service = service;
            _collegeCellViewService = collegeCellViewService;
        }

        [HttpGet]
        [ApiDoc("查询指定学校指定日期范围内流量情况")]
        [ApiParameterDoc("collegeName", "学校名称")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("天平均流量统计")]
        public AggregateFlowView Get(string collegeName, DateTime begin, DateTime end)
        {
            var cells = _collegeCellViewService.GetViews(collegeName);
            var stats =
                cells.Select(cell => _service.QueryAverageView(cell.ENodebId, cell.SectorId, begin, end))
                    .Where(view => view != null)
                    .ToList();
            var result = stats.ArraySum().MapTo<AggregateFlowView>();
            result.CellCount = stats.Count;
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
            var cells = _collegeCellViewService.GetViews(collegeName);
            var viewList = cells.Select(cell => _service.QueryFlow(cell.ENodebId, cell.SectorId, beginDate, endDate))
                .Where(views => views != null)
                .Aggregate((x, y) => x.Concat(y).ToList());
            return viewList.GroupBy(x => x.StatTime).Select(x =>
            {
                var stat = x.ArraySum();
                stat.StatTime = x.Key;
                return stat;
            }).OrderBy(x=>x.StatTime);
        } 
    }
}
