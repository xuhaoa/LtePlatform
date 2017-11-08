using System.Web.Http;
using Lte.Evaluations.DataService.College;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("У԰���Ʋ�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeNameController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeNameController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("�������Ʋ�ѯУ԰����Ϣ")]
        [ApiParameterDoc("name", "У԰����")]
        [ApiResponse("У԰����Ϣ")]
        public IHttpActionResult Get(string name)
        {
            var info = _service.QueryInfo(name);
            return info == null ? (IHttpActionResult)BadRequest("College Name Not Found!") : Ok(info);
        }

    }
}