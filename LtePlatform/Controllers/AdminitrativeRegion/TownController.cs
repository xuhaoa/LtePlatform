using System;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.AdminitrativeRegion
{
    [ApiControl("������Ϣ��ѯ������")]
    public class TownController : ApiController
    {
        private readonly TownQueryService _service;

        public TownController(TownQueryService service)
        {
            _service = service;
        }

        [ApiDoc("����LTE��վ��Ų�ѯ��վ������Ϣ")]
        [ApiParameterDoc("eNodebId", "LTE��վ���")]
        [ApiResponse("��վ������Ϣ���������С�������")]
        public Tuple<string, string, string> Get(int eNodebId)
        {
            return _service.GetTownNamesByENodebId(eNodebId);
        }

        [HttpGet]
        [ApiDoc("��ѯָ��������Ϣ")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "��")]
        [ApiParameterDoc("town", "��")]
        [ApiResponse("ָ��������Ϣ")]
        public TownView Get(string city, string district, string town)
        {
            return _service.GetTown(city, district, town);
        }
    }
}