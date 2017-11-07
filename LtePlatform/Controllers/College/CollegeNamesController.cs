using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("ͳ��У԰�����ƿ�����")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeNamesController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeNamesController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ����У԰������")]
        [ApiResponse("����У԰������")]
        public IEnumerable<string> Get()
        {
            return _service.QueryNames();
        }

        [HttpGet]
        [ApiDoc("��ѯ����У԰������")]
        [ApiParameterDoc("year", "ָ�����")]
        [ApiResponse("����У԰������")]
        public IEnumerable<string> Get(int year)
        {
            return _service.QueryNames(year);
        }
    }
}