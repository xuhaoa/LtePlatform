using Lte.Evaluations.DataService.College;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using LtePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园网LTE基站查询控制器")]
    public class CollegeENodebController : ApiController
    {
        private readonly CollegeENodebService _service;

        public CollegeENodebController(CollegeENodebService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询单个校园的LTE基站列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("LTE基站列表")]
        public IEnumerable<ENodebView> Get(string collegeName)
        {
            return _service.Query(collegeName);
        }

        [HttpPost]
        public async Task<int> Post(CollegeENodebIdsContainer container)
        {
            return await _service.UpdateENodebs(container);
        }
    }

    [ApiControl("校园网CDMA基站查询控制器")]
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
