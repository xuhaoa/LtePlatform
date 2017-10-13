using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.DataService.Kpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.Parameters.Entities.Kpi;

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
            return _service.Query(eNodebId, sectorId, begin.Date, end.Date);
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

    [ApiControl("RRC连接查询控制器")]
    public class RrcQueryController : ApiController
    {
        private readonly RrcQueryService _service;

        public RrcQueryController(RrcQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内指定小区RRC连接情况，按照日期排列")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("RRC连接情况，按照日期排列")]
        public List<RrcView> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.Query(eNodebId, sectorId, begin.Date, end.Date);
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内指定小区平均RRC连接情况")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("beginDate", "开始日期")]
        [ApiParameterDoc("endDate", "结束日期")]
        [ApiResponse("平均RRC连接情况")]
        public RrcView GetAverage(int eNodebId, byte sectorId, DateTime beginDate, DateTime endDate)
        {
            return _service.QueryAverageView(eNodebId, sectorId, beginDate, endDate);
        }
    }

    [ApiControl("TOP下切小区查询控制器")]
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
        [ApiDoc("查询指定区域指定时间范围内TOP下切小区指标统计")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiResponse("TOP下切小区指标统计，按小区排列")]
        public IEnumerable<FlowView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = _service.QueryTopDownSwitchViews(city, district, begin, end, topCount);
            results.ForEach(x =>
            {
                x.ENodebName = _eNodebQueryService.GetByENodebId(x.ENodebId)?.Name;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("指定日期范围、TOP个数和排序标准，获得TOP下切小区列表")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiParameterDoc("orderSelection", "排序标准")]
        [ApiResponse("TOP下切小区列表")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount, string orderSelection)
        {
            var results = _service.QueryTopDownSwitchViews(begin, end, topCount, orderSelection.GetEnumType<OrderDownSwitchPolicy>());
            results.ForEach(x =>
            {
                x.ENodebName = _eNodebQueryService.GetByENodebId(x.ENodebId)?.Name;
            });
            return results;
        }

        [HttpGet]
        [ApiDoc("指定日期范围、TOP个数和排序标准，获得指定区域TOP下切小区列表")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiParameterDoc("orderSelection", "排序标准")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("指定区域TOP下切小区列表")]
        public IEnumerable<FlowView> Get(DateTime begin, DateTime end, int topCount, string orderSelection, string city, string district)
        {
            var results = _service.QueryTopDownSwitchViews(city, district, begin, end, topCount,
                orderSelection.GetEnumType<OrderDownSwitchPolicy>());
            results.ForEach(x =>
            {
                x.ENodebName = _eNodebQueryService.GetByENodebId(x.ENodebId)?.Name;
            });
            return results;
        }

    }

    [ApiControl("TOP双流比查询控制器")]
    public class TopRank2Controller : ApiController
    {
        private readonly FlowQueryService _service;

        public TopRank2Controller(FlowQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定区域指定时间范围内TOP双流比小区指标统计")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiResponse("TOP双流比小区指标统计，按小区排列")]
        public IEnumerable<FlowView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            return _service.QueryTopRank2Views(city, district, begin, end, topCount);
        }
    }

    [ApiControl("TOP RRC连接失败小区查询控制器")]
    public class TopRrcFailController : ApiController
    {
        private readonly RrcQueryService _service;

        public TopRrcFailController(RrcQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定区域指定时间范围内TOP RRC连接失败小区指标统计")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiResponse("TOP RRC连接失败小区指标统计，按小区排列")]
        public IEnumerable<RrcView> Get(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            return _service.QueryTopRrcFailViews(city, district, begin, end, topCount);
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
        [ApiDoc("查询指定日期前最近一天有记录的镇级天流量")]
        [ApiParameterDoc("statDate", "统计日期")]
        [ApiParameterDoc("frequency", "频段描述")]
        [ApiResponse("镇级天流量，每个镇一条记录")]
        public IEnumerable<TownFlowView> Get(DateTime statDate, string frequency)
        {
            return _service.QueryLastDateView(statDate, frequency.GetBandFromFcn());
        }

        [HttpGet]
        [ApiDoc("查询指定日期有记录的镇级天流量")]
        [ApiParameterDoc("currentDate", "统计日期")]
        [ApiParameterDoc("frequency", "频段描述")]
        [ApiResponse("镇级天流量，每个镇一条记录")]
        public IEnumerable<TownFlowStat> GetCurrentDate(DateTime currentDate, string frequency)
        {
            return _service.QueryCurrentDateStats(currentDate, frequency.GetBandFromFcn());
        }

        [HttpGet]
        [ApiDoc("查询时间段内区域天流量统计")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("city", "城市名称")]
        [ApiParameterDoc("frequency", "频段描述")]
        [ApiResponse("天流量统计列表")]
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
    
    [ApiControl("校园网流量查询控制器")]
    public class CollegeFlowController : ApiController
    {
        private readonly FlowQueryService _service;
        private readonly CollegeCellViewService _collegeCellViewService;
        private readonly CollegeStatService _collegeService;

        public CollegeFlowController(FlowQueryService service, CollegeCellViewService collegeCellViewService,
            CollegeStatService collegeService)
        {
            _service = service;
            _collegeCellViewService = collegeCellViewService;
            _collegeService = collegeService;
        }

        [HttpGet]
        [ApiDoc("查询指定学校指定日期范围内流量情况")]
        [ApiParameterDoc("collegeName", "学校名称")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("天平均流量统计")]
        public AggregateFlowView Get(string collegeName, DateTime begin, DateTime end)
        {
            var cells = _collegeCellViewService.GetCollegeViews(collegeName);
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

    [ApiControl("校园网流量查询控制器")]
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
        [ApiDoc("查询指定热点指定日期范围内流量情况")]
        [ApiParameterDoc("name", "热点名称")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("天平均流量统计")]
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
        [ApiDoc("查询指定热点指定日期范围内流量情况，按照日期排列")]
        [ApiParameterDoc("name", "热点名称")]
        [ApiParameterDoc("beginDate", "开始日期")]
        [ApiParameterDoc("endDate", "结束日期")]
        [ApiResponse("流量情况，按照日期排列，每天一条记录")]
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

    [ApiControl("基站级流量查询控制器")]
    public class ENodebFlowController : ApiController
    {
        private readonly FlowService _service;

        public ENodebFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的基站级流量统计")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("frequency", "频段描述")]
        [ApiResponse("指定日期范围内的基站级流量统计")]
        public IEnumerable<ENodebFlowView> Get(DateTime begin, DateTime end, string frequency)
        {
            return _service.GetENodebFlowViews(begin, end, frequency.GetBandFromFcn());
        } 
    }

    [ApiControl("导入流量查询控制器")]
    public class DumpFlowController : ApiController
    {
        private readonly FlowService _service;

        public DumpFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("获取给定日期范围内的历史流量记录数")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("历史流量记录数")]
        public async Task<IEnumerable<FlowHistory>> Get(DateTime begin, DateTime end)
        {
            return await _service.GetFlowHistories(begin.Date, end.Date);
        }

        [HttpGet]
        public async Task<Tuple<int, int, int, int, int, int>> Get(DateTime statDate)
        {
            return await _service.GenerateTownStats(statDate);
        }

        [HttpGet]
        public IEnumerable<CellIdPair> Get(DateTime statDate, int townId)
        {
            return _service.QueryUnmatchedHuaweis(townId, statDate);
        }
    }

    [ApiControl("导入华为流量控制器")]
    public class DumpHuaweiFlowController : ApiController
    {
        private readonly FlowService _service;

        public DumpHuaweiFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpPut]
        [ApiDoc("导入一条华为流量")]
        [ApiResponse("是否已经成功导入")]
        public Task<bool> Put()
        {
            return _service.DumpOneHuaweiStat();
        }

        [HttpGet]
        [ApiDoc("获得当前服务器中待导入的华为流量统计记录数")]
        [ApiResponse("当前服务器中待导入的华为流量统计记录数")]
        public int Get()
        {
            return _service.FlowHuaweiCount;
        }

        [HttpDelete]
        [ApiDoc("清空待导入的华为流量统计记录")]
        public void Delete()
        {
            _service.ClearHuaweiStats();
        }
    }

    [ApiControl("导入中兴流量控制器")]
    public class DumpZteFlowController : ApiController
    {
        private readonly FlowService _service;

        public DumpZteFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpPut]
        [ApiDoc("导入一条中兴流量")]
        [ApiResponse("是否已经成功导入")]
        public Task<bool> Put()
        {
            return _service.DumpOneZteStat();
        }

        [HttpGet]
        [ApiDoc("获得当前服务器中待导入的中兴流量统计记录数")]
        [ApiResponse("当前服务器中待导入的中兴流量统计记录数")]
        public int Get()
        {
            return _service.FlowZteCount;
        }

        [HttpDelete]
        [ApiDoc("清空待导入的中兴流量统计记录")]
        public void Delete()
        {
            _service.ClearZteStats();
        }
    }
    
    [ApiControl("区域4G用户3G流量比查询控制器")]
    public class DownSwitchFlowController : ApiController
    {
        private readonly DownSwitchFlowService _service;

        public DownSwitchFlowController(DownSwitchFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定城市单个日期的区域4G用户3G流量比")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("statDate", "日期")]
        [ApiResponse("区域4G用户3G流量比")]
        public DownSwitchFlowDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }
    }
}
