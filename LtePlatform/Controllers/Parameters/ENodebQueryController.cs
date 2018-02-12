using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("LTE��վ��ѯ������")]
    public class ENodebQueryController : ApiController
    {
        private readonly ENodebQueryService _service;

        public ENodebQueryController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("���ݹ滮��Ų�ѯ��վ")]
        [ApiParameterDoc("planNum", "�滮���(FSL)")]
        [ApiResponse("��վ��ͼ")]
        public ENodebView Get(string planNum)
        {
            return _service.GetByPlanNum(planNum);
        }

        [HttpGet]
        [ApiDoc("��ѯ�����Ϲ�����ĳ����ͳһ���������������������λ��λ�ڱ�������Χ�ڵ�LTE��վ�����ں���������������")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("town", "����")]
        [ApiResponse("��������������LTE��վ��ͼ�б�")]
        public IEnumerable<ENodebView> Get(string city, string district, string town)
        {
            return _service.GetByTownArea(city, district, town);
        }

        [HttpGet]
        public ENodeb Get(int eNodebId, int townId)
        {
            return _service.UpdateTownInfo(eNodebId, townId);
        }

    }
}