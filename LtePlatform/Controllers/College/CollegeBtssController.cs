using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园网CDMA基站查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeBtssController : ApiController
    {
        private readonly CollegeBtssService _service;

        public CollegeBtssController(CollegeBtssService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询单个校园的CDMA基站视图列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("CDMA基站视图列表")]
        public IEnumerable<CdmaBtsView> Get(string collegeName)
        {
            return _service.Query(collegeName);
        }

        [HttpPost]
        public async Task<int> Post(CollegeBtsIdsContainer container)
        {
            return await _service.UpdateBtss(container);
        }
    }
}