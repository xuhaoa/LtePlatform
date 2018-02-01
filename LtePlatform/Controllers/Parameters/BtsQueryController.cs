using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("CDMA基站查询控制器")]
    public class BtsQueryController : ApiController
    {
        private readonly BtsQueryService _service;

        public BtsQueryController(BtsQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询行政上归属于某镇区统一区域的其他镇区，但地理位置位于本镇区范围内的CDMA基站，用于后续调整镇区归属")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("满足以上条件的CDMA基站视图列表")]
        public IEnumerable<CdmaBtsView> Get(string city, string district, string town)
        {
            return _service.GetByTownArea(city, district, town);
        }

        [HttpGet]
        public CdmaBts Get(int btsId, int townId)
        {
            return _service.UpdateTownInfo(btsId, townId);
        }
    }
}