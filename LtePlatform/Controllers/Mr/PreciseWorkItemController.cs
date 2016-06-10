using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.Evaluations.DataService.Mr;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Mr
{
    [ApiControl("精确覆盖率类工单查询控制器")]
    [Authorize]
    public class PreciseWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;
        private readonly WorkItemService _workItemService;

        public PreciseWorkItemController(PreciseWorkItemService service, WorkItemService workItemService)
        {
            _service = service;
            _workItemService = workItemService;
        }

        [HttpGet]
        public PreciseWorkItemCell Get(string number, int eNodebId, byte sectorId)
        {
            return _service.Query(number, eNodebId, sectorId);
        }

        [HttpGet]
        public List<PreciseWorkItemCell> Get(string number)
        {
            return _service.Query(number);
        }

        [HttpPost]
        [ApiDoc("创建精确覆盖率工单")]
        [ApiParameterDoc("view", "精确覆盖率的工单信息，包括小区信息、精确覆盖率信息、统计起止日期等")]
        [ApiResponse("创建是否成功，如成功返回工单编号，否则返回空值")]
        public async Task<string> Post(PreciseImportView view)
        {
            return await _workItemService.ConstructPreciseWorkItem(view.View, view.Begin, view.End, User.Identity.Name);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<WorkItemView>> Get(DateTime begin, DateTime end)
        {
            return await _workItemService.QueryPreciseViews(begin, end);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<WorkItemView>> Get(DateTime begin, DateTime end, string district)
        {
            return await _workItemService.QueryPreciseViews(begin, end, district);
        }
    }

    [Authorize]
    public class InterferenceNeighborWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public InterferenceNeighborWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task Post(PreciseInterferenceNeighborsContainer container)
        {
            await _service.UpdateAsync(container);
        }
    }

    [Authorize]
    public class InterferenceVictimWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public InterferenceVictimWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task Post(PreciseInterferenceVictimsContainer container)
        {
            await _service.UpdateAsync(container);
        }
    }

    [Authorize]
    public class CoverageWorkItemController : ApiController
    {
        private readonly PreciseWorkItemService _service;

        public CoverageWorkItemController(PreciseWorkItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task Post(PreciseCoveragesContainer container)
        {
            await _service.UpdateAsync(container);
        }
    }
}
