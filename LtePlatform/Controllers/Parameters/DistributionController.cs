using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    public class DistributionController : ApiController
    {
        private readonly ENodebQueryService _service;

        public DistributionController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<DistributionSystem> Get(string district)
        {
            return _service.QueryDistributionSystems(district);
        }

        [HttpGet]
        [ApiDoc("��ȡ��γ�ȷ�Χ�ڵ����ڷֲ��б�")]
        [ApiParameterDoc("west", "���߾���")]
        [ApiParameterDoc("east", "���߾���")]
        [ApiParameterDoc("south", "�ϱ�γ��")]
        [ApiParameterDoc("north", "����γ��")]
        [ApiResponse("��γ�ȷ�Χ�ڵ����ڷֲ��б�")]
        public IEnumerable<DistributionSystem> Get(double west, double east, double south, double north)
        {
            return _service.QueryDistributionSystems(west, east, south, north);
        }
    }
}