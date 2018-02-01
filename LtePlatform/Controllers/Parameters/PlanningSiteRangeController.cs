using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("����滮վ���ѯ������")]
    public class PlanningSiteRangeController : ApiController
    {
        private readonly PlanningQueryService _service;

        public PlanningSiteRangeController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ����Χ�ڵĹ滮վ��")]
        [ApiParameterDoc("west", "��������")]
        [ApiParameterDoc("east", "���궫��")]
        [ApiParameterDoc("south", "�����Ͻ�")]
        [ApiParameterDoc("north", "���걱��")]
        [ApiResponse("����Χ�ڵĹ滮վ��")]
        public IEnumerable<PlanningSiteView> Get(double west, double east, double south, double north)
        {
            return _service.QueryPlanningSiteViews(west, east, south, north);
        } 
    }
}