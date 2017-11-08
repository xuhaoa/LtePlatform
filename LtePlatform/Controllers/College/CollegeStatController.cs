using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("ͳ��У԰����Ϣ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeStatController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeStatController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("����У԰��Ų�ѯУ԰��ͳ����Ϣ")]
        [ApiParameterDoc("id", "У԰���")]
        [ApiParameterDoc("year", "���")]
        [ApiResponse("У԰��ͳ����Ϣ�� ���鲻����᷵�ش�����Ϣ")]
        public IHttpActionResult Get(int id, int year)
        {
            var stat = _service.QueryStat(id, year);
            return stat == null ? (IHttpActionResult)BadRequest("ID Not Found!") : Ok(stat);
        }

        [HttpGet]
        [ApiDoc("��ѯ����У԰��ͳ����Ϣ")]
        [ApiParameterDoc("year", "���")]
        [ApiResponse("����У԰��ͳ����Ϣ")]
        public IEnumerable<CollegeStat> Get(int year)
        {
            return _service.QueryStats(year);
        }

        [Authorize]
        [HttpPost]
        public async Task<int> Post(CollegeInfo info)
        {
            return await _service.SaveCollegeInfo(info, User.Identity.Name.GetHashCode());
        } 
    }
}