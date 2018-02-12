using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("在用小区查询控制器")]
    public class CellInUseController : ApiController
    {
        private readonly CellService _service;

        public CellInUseController(CellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("给定基站编号对定的扇区视图对象列表")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiResponse("对定的扇区视图对象列表")]
        public IEnumerable<SectorView> Get(int eNodebId)
        {
            return _service.QuerySectorsInUse(eNodebId);
        }

    }
}