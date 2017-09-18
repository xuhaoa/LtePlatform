using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Parameters.Entities.Kpi;
using LtePlatform.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.ViewModels.RegionKpi;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("单小区精确覆盖率查询控制器")]
    public class PreciseStatController : ApiController
    {
        private readonly PreciseStatService _service;
        private readonly ENodebQueryService _eNodebQueryService;

        public PreciseStatController(PreciseStatService service, ENodebQueryService eNodebQueryService)
        {
            _service = service;
            _eNodebQueryService = eNodebQueryService;
        }
        
        [HttpGet]
        [ApiDoc("指定日期范围、TOP个数和排序标准，获得TOP精确覆盖率TOP列表")]
        [ApiParameterDoc("begin","开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiParameterDoc("orderSelection", "排序标准")]
        [ApiResponse("TOP精确覆盖率TOP列表")]
        public IEnumerable<Precise4GView> Get(DateTime begin, DateTime end, int topCount, string orderSelection)
        {
            return _service.GetTopCountViews(begin, end, topCount, orderSelection.GetEnumType<OrderPreciseStatPolicy>());
        }

        [HttpGet]
        [ApiDoc("指定日期范围、TOP个数和排序标准，获得TOP精确覆盖率TOP列表")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("topCount", "TOP个数")]
        [ApiParameterDoc("orderSelection", "排序标准")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("TOP精确覆盖率TOP列表")]
        public IEnumerable<Precise4GView> Get(DateTime begin, DateTime end, int topCount, string orderSelection, string city, string district)
        {
            var eNodebs = _eNodebQueryService.GetENodebsByDistrict(city, district);
            return _service.GetTopCountViews(begin, end, topCount, orderSelection.GetEnumType<OrderPreciseStatPolicy>(), eNodebs);
        }

        [HttpGet]
        [ApiDoc("指定小区（基站）编号、扇区编号和日期，获得一周以内的精确覆盖率统计记录")]
        [ApiParameterDoc("cellId", "小区（基站）编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiResponse("一周以内的精确覆盖率聚合统计记录")]
        public Precise4GView Get(int cellId, byte sectorId)
        {
            return _service.GetOneWeekStats(cellId, sectorId, DateTime.Today);
        }

        [HttpGet]
        [ApiDoc("指定小区（基站）编号、扇区编号和日期范围，获得一周以内的精确覆盖率统计记录")]
        [ApiParameterDoc("cellId", "小区（基站）编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("一周以内的精确覆盖率统计记录")]
        public IEnumerable<PreciseCoverage4G> Get(int cellId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.GetTimeSpanStats(cellId, sectorId, begin, end);
        }
    }

    [ApiControl("区域精确覆盖率查询控制器")]
    public class PreciseRegionController : ApiController
    {
        private readonly PreciseRegionStatService _service;

        public PreciseRegionController(PreciseRegionStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定城市单个日期的区域精确覆盖率")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("statDate", "日期")]
        [ApiResponse("区域精确覆盖率")]
        [Cors("http://localhost:8100")]
        public PreciseRegionDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }

        [HttpGet]
        [ApiDoc("查询指定城市和时间段的区域精确覆盖率列表")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("区域精确覆盖率列表")]
        public IEnumerable<PreciseRegionDateView> Get(DateTime begin, DateTime end, string city)
        {
            return _service.QueryDateViews(begin, end, city);
        }
    }

    [ApiControl("区域RRC连接成功率查询控制器")]
    public class RrcRegionController : ApiController
    {
        private readonly RrcRegionStatService _service;

        public RrcRegionController(RrcRegionStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定城市单个日期的区域RRC连接成功率")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("statDate", "日期")]
        [ApiResponse("区域RRC连接成功率")]
        [Cors("http://localhost:8100")]
        public RrcRegionDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }

        [HttpGet]
        [ApiDoc("查询指定城市和时间段的区域RRC连接成功率列表")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("区域RRC连接成功率列表")]
        public IEnumerable<RrcRegionDateView> Get(DateTime begin, DateTime end, string city)
        {
            return _service.QueryDateViews(begin, end, city);
        }
    }

    [ApiControl("区域RRC连接成功率查询控制器")]
    public class CqiRegionController : ApiController
    {
        private readonly RrcRegionStatService _service;

        public CqiRegionController(RrcRegionStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定城市单个日期的区域RRC连接成功率")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("statDate", "日期")]
        [ApiResponse("区域RRC连接成功率")]
        [Cors("http://localhost:8100")]
        public RrcRegionDateView Get(string city, DateTime statDate)
        {
            return _service.QueryLastDateStat(statDate, city);
        }

        [HttpGet]
        [ApiDoc("查询指定城市和时间段的区域RRC连接成功率列表")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("区域RRC连接成功率列表")]
        public IEnumerable<RrcRegionDateView> Get(DateTime begin, DateTime end, string city)
        {
            return _service.QueryDateViews(begin, end, city);
        }
    }
}
