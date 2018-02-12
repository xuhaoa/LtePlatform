using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("�ѿ�ͨ�滮վ���ѯ������")]
    public class OpennedSiteController : ApiController
    {
        private readonly PlanningQueryService _service;

        public OpennedSiteController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ�������ѿ�ͨ�Ĺ滮��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("�ѿ�ͨ�滮����ͼ�б�")]
        public IEnumerable<PlanningSiteView> Get(string city, string district)
        {
            return _service.GetENodebsByDistrict(city, district, true);
        }
    }
}