using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.DataService.Mr;
using Lte.MySqlFramework.Entities;
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
}
