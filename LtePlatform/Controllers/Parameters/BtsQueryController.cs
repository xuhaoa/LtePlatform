using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("CDMA��վ��ѯ������")]
    public class BtsQueryController : ApiController
    {
        private readonly BtsQueryService _service;

        public BtsQueryController(BtsQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ�����Ϲ�����ĳ����ͳһ���������������������λ��λ�ڱ�������Χ�ڵ�CDMA��վ�����ں���������������")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("town", "����")]
        [ApiResponse("��������������CDMA��վ��ͼ�б�")]
        public IEnumerable<CdmaBtsView> Get(string city, string district, string town)
        {
            return _service.GetByTownArea(city, district, town);
        }

        [HttpGet]
        public CdmaBts Get(int btsId, int townId)
        {
            return _service.UpdateTownInfo(btsId, townId);
        }
    }
}