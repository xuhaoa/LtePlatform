using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Parameters.Entities.Kpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("导入镇区精确覆盖率的控制器")]
    public class TownPreciseImportController : ApiController
    {
        private readonly PreciseImportService _service;

        public TownPreciseImportController(PreciseImportService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定日期的精确覆盖率镇区统计指标")]
        [ApiParameterDoc("statTime", "查询指定日期")]
        [ApiResponse("镇区精确覆盖率统计指标")]
        public IEnumerable<TownPreciseView> Get(DateTime statTime)
        {
            return _service.GetMergeStats(statTime);
        }

        [HttpPost]
        [ApiDoc("导入镇区精确覆盖率")]
        [ApiParameterDoc("container", "等待导入数据库的记录")]
        public void Post(TownPreciseViewContainer container)
        {
            _service.DumpTownStats(container);
        }
    }
}