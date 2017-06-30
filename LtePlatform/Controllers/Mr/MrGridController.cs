using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.DataService.Mr;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Channel;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Mr
{
    [ApiControl("MR栅格数据查询控制器")]
    public class MrGridController : ApiController
    {
        private readonly NearestPciCellService _service;

        public MrGridController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定区域最近日期内的MR覆盖率栅格信息")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiParameterDoc("district", "指定区域")]
        [ApiResponse("指定区域最近日期内的MR覆盖率栅格信息列表")]
        public IEnumerable<MrCoverageGridView> Get(DateTime statDate, string district)
        {
            return _service.QueryCoverageGridViews(statDate, district);
        }

        [HttpGet]
        [ApiDoc("查询指定区域最近日期内的栅格竞争信息")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiParameterDoc("district", "指定区域")]
        [ApiParameterDoc("competeDescription", "竞争信息类型")]
        [ApiResponse("指定区域最近日期内的栅格竞争信息列表")]
        public IEnumerable<MrCompeteGridView> Get(DateTime statDate, string district, string competeDescription)
        {
            return _service.QueryCompeteGridViews(statDate, district, competeDescription);
        } 
    }

    [ApiControl("镇区MR覆盖情况查询控制器")]
    public class TownMrGridController : ApiController
    {
        private readonly NearestPciCellService _service;

        public TownMrGridController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定区域最近日期内的MR覆盖率栅格信息")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiParameterDoc("district", "指定区域")]
        [ApiParameterDoc("town", "指定镇区")]
        [ApiResponse("指定区域最近日期内的MR覆盖率栅格信息列表")]
        public IEnumerable<MrCoverageGridView> Get(DateTime statDate, string district, string town)
        {
            return _service.QueryCoverageGridViews(statDate, district, town);
        }

        [HttpGet]
        [ApiDoc("查询指定区域最近日期内的栅格竞争信息")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiParameterDoc("district", "指定区域")]
        [ApiParameterDoc("town", "指定镇区")]
        [ApiParameterDoc("competeDescription", "竞争信息类型")]
        [ApiResponse("指定区域最近日期内的栅格竞争信息列表")]
        public IEnumerable<MrCompeteGridView> Get(DateTime statDate, string district, string town, string competeDescription)
        {
            return _service.QueryCompeteGridViews(statDate, district, town, competeDescription);
        }
    }

    [ApiControl("AGPS电信覆盖情况查询控制器")]
    public class AgpsTelecomController : ApiController
    {
        private readonly NearestPciCellService _service;

        public AgpsTelecomController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内指定镇区AGPS覆盖情况")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("指定镇区AGPS覆盖情况")]
        public IEnumerable<AgpsCoverageView> Get(DateTime begin, DateTime end, string district,
            string town)
        {
            return _service.QueryTelecomCoverageViews(begin, end, district, town);
        }

        [HttpPost]
        public int Post(AgpsTownView view)
        {
            return _service.UpdateTelecomAgisDtPoint(view);
        }
    }

    [ApiControl("AGPS移动覆盖情况查询控制器")]
    public class AgpsMobileController : ApiController
    {
        private readonly NearestPciCellService _service;

        public AgpsMobileController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内指定镇区AGPS覆盖情况")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("指定镇区AGPS覆盖情况")]
        public IEnumerable<AgpsCoverageView> Get(DateTime begin, DateTime end, string district,
            string town)
        {
            return _service.QueryMobileCoverageViews(begin, end, district, town);
        }
    }

    [ApiControl("WEB浏览APP数据查询控制器")]
    public class WebBrowsingController : ApiController
    {
        private readonly DownSwitchFlowService _service;

        public WebBrowsingController(DownSwitchFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询最近日期WEB浏览APP数据")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiResponse("最近日期WEB浏览APP数据")]
        public IEnumerable<WebBrowsing> Get(DateTime statDate)
        {
            return _service.QueryBrowsings(statDate);
        } 
    }

    [ApiControl("视频APP数据查询控制器")]
    public class AppStreamController : ApiController
    {
        private readonly DownSwitchFlowService _service;

        public AppStreamController(DownSwitchFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询最近日期视频APP数据")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiResponse("最近日期视频APP数据")]
        public IEnumerable<AppSteam> Get(DateTime statDate)
        {
            return _service.QueryAppSteams(statDate);
        } 
    }

    [ApiControl("栅格分簇查询控制器")]
    public class GridClusterController : ApiController
    {
        private readonly GridClusterService _service;

        public GridClusterController(GridClusterService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询某专题下的栅格分簇")]
        [ApiParameterDoc("theme", "专题名称")]
        [ApiResponse("栅格分簇列表")]
        public IEnumerable<GridClusterView> Get(string theme)
        {
            return _service.QueryClusterViews(theme);
        }

        [HttpPost]
        public IEnumerable<MrGridKpiDto> Post(IEnumerable<GeoGridPoint> points)
        {
            return _service.QueryKpiDtos(points);
        }

        [HttpPut]
        public MrGridKpiDto Put(IEnumerable<GeoGridPoint> points)
        {
            return _service.QueryClusterKpi(points);
        }
    }
}
