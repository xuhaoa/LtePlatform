using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.DataService.Mr;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Mr
{
    public class MrGridController : ApiController
    {
        private readonly NearestPciCellService _service;

        public MrGridController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<MrCoverageGridView> Get(DateTime statDate, string district)
        {
            return _service.QueryCoverageGridViews(statDate, district);
        }

        [HttpGet]
        public IEnumerable<MrCompeteGridView> Get(DateTime statDate, string district, string competeDescription)
        {
            return _service.QueryCompeteGridViews(statDate, district, competeDescription);
        } 
    }

    public class WebBrowsingController : ApiController
    {
        private readonly DownSwitchFlowService _service;

        public WebBrowsingController(DownSwitchFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<WebBrowsing> Get(DateTime statDate)
        {
            return _service.QueryBrowsings(statDate);
        } 
    }

    public class AppStreamController : ApiController
    {
        private readonly DownSwitchFlowService _service;

        public AppStreamController(DownSwitchFlowService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<AppSteam> Get(DateTime statDate)
        {
            return _service.QueryAppSteams(statDate);
        } 
    }
}
