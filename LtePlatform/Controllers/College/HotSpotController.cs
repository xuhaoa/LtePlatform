using Lte.Evaluations.DataService.College;
using LtePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.College
{
    [ApiControl("热点查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class HotSpotController : ApiController
    {
        private readonly HotSpotService _service;

        public HotSpotController(HotSpotService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("保存热点信息")]
        [ApiParameterDoc("dto", "热点信息")]
        public async Task<int> Post(HotSpotView dto)
        {
            return await _service.SaveBuildingHotSpot(dto);
        }

        [HttpGet]
        [ApiDoc("查询热点信息")]
        [ApiResponse("热点信息")]
        public IEnumerable<HotSpotView> Get()
        {
            return _service.QueryHotSpotViews();
        }

        [HttpGet]
        [ApiDoc("查询热点信息")]
        [ApiParameterDoc("type", "热点类型描述")]
        [ApiResponse("热点信息")]
        public IEnumerable<HotSpotView> Get(string type)
        {
            return _service.QueryHotSpotViews(type);
        }
    }
}
