using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.Kpi;

namespace LtePlatform.Controllers.Kpi
{
    public class FlowQueryController : ApiController
    {
        private readonly FlowQueryService _service;

        public FlowQueryController(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        public List<FlowView> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryFlow(eNodebId, sectorId, begin.Date, end.Date);
        }

        [HttpGet]
        public FlowView GetAverage(int eNodebId, byte sectorId, DateTime beginDate, DateTime endDate)
        {
            return _service.QueryAverageView(eNodebId, sectorId, beginDate, endDate);
        }
    }

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
