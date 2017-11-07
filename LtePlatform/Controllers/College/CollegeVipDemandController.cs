using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("У԰VIP�����ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeVipDemandController : ApiController
    {
        private readonly VipDemandService _service;

        public CollegeVipDemandController(VipDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ��У԰����ָ����ݵ�VIP����")]
        [ApiParameterDoc("collegeName", "ָ��У԰����")]
        [ApiParameterDoc("year", "ָ�����")]
        [ApiResponse("VIP����")]
        public VipDemandDto Get(string collegeName, int year)
        {
            return _service.QueryYearDemand(collegeName, year);
        }

        [HttpGet]
        [ApiDoc("��ѯָ����ݵ�VIP�����б�")]
        [ApiParameterDoc("year", "ָ�����")]
        [ApiResponse("VIP�����б�")]
        public IEnumerable<VipDemandDto> Get(int year)
        {
            return _service.QueryYearDemands(year);
        }

        [HttpPost]
        [Authorize]
        [ApiDoc("���浥��У԰�������Ϣ")]
        [ApiParameterDoc("stat", "����У԰�������Ϣ")]
        public async Task<int> Post(CollegeYearView stat)
        {
            return await _service.ConstructCollegeDemand(stat, User.Identity.Name);
        }
    }
}