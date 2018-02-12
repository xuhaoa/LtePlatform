using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("δ��ͨ�滮վ���ѯ������")]
    public class OpenningSiteController : ApiController
    {
        private readonly PlanningQueryService _service;

        public OpenningSiteController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ������δ��ͨ�Ĺ滮��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("δ��ͨ�滮����ͼ�б�")]
        public IEnumerable<PlanningSiteView> Get(string city, string district)
        {
            return _service.GetENodebsByDistrict(city, district, false);
        }
    }
}