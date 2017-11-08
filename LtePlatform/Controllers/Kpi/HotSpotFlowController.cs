using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("У԰��������ѯ������")]
    public class HotSpotFlowController : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly CollegeCellViewService _viewService;

        public HotSpotFlowController(FlowQueryService service, CollegeCellViewService viewService)
        {
            _service = service;
            _viewService = viewService;
        }

        [HttpGet]
        [ApiDoc("��ѯָ���ȵ�ָ�����ڷ�Χ���������")]
        [ApiParameterDoc("name", "�ȵ�����")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("��ƽ������ͳ��")]
        public AggregateFlowView Get(string name, DateTime begin, DateTime end)
        {
            var cells = _viewService.GetHotSpotViews(name);
            var stats =
                cells.Select(cell => _service.QueryAverageView(cell.ENodebId, cell.SectorId, begin, end))
                    .Where(view => view != null)
                    .ToList();
            var result = stats.Any()
                ? stats.ArraySum().MapTo<AggregateFlowView>()
                : new AggregateFlowView();
            result.CellCount = stats.Count;
            return result;
        }

        [HttpGet]
        [ApiDoc("��ѯָ���ȵ�ָ�����ڷ�Χ�����������������������")]
        [ApiParameterDoc("name", "�ȵ�����")]
        [ApiParameterDoc("beginDate", "��ʼ����")]
        [ApiParameterDoc("endDate", "��������")]
        [ApiResponse("��������������������У�ÿ��һ����¼")]
        public IEnumerable<FlowView> GetDateViews(string name, DateTime beginDate, DateTime endDate)
        {
            var cells = _viewService.GetHotSpotViews(name);
            var viewList = cells.Select(cell => _service.Query(cell.ENodebId, cell.SectorId, beginDate, endDate))
                .Where(views => views != null && views.Any())
                .Aggregate((x, y) => x.Concat(y).ToList());
            if (!viewList.Any()) return new List<FlowView>();
            return viewList.GroupBy(x => x.StatTime).Select(x =>
            {
                var stat = x.ArraySum();
                stat.StatTime = x.Key;
                return stat;
            }).OrderBy(x => x.StatTime);
        }
    }
}