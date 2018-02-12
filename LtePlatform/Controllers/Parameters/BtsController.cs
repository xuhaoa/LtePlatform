using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("��ѯCDMA��վ�Ŀ�����")]
    public class BtsController : ApiController
    {
        private readonly BtsQueryService _service;

        public BtsController(BtsQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("������������������ѯ��վ�б�")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("town", "����")]
        [ApiResponse("��ѯ�õ��Ļ�վ�б��������û����ᱨ��")]
        public IEnumerable<CdmaBtsView> Get(string city, string district, string town)
        {
            return _service.GetByTownNames(city, district, town);
        }

        [HttpGet]
        [ApiDoc("ʹ������ģ����ѯ�������Ⱥ�ƥ���վ���ơ���վ��ź͵�ַ")]
        [ApiParameterDoc("name", "ģ����ѯ������")]
        [ApiResponse("��ѯ�õ��Ļ�վ�б��������û����ᱨ��")]
        public IEnumerable<CdmaBtsView> Get(string name)
        {
            return _service.GetByGeneralName(name);
        }

        [HttpGet]
        [ApiDoc("���ݻ�վ���������ѯ��վ")]
        [ApiParameterDoc("btsId", "��վ���")]
        [ApiResponse("��ѯ�õ��Ļ�վ�б��������û����ᱨ��")]
        public CdmaBtsView Get(int btsId)
        {
            return _service.GetByBtsId(btsId);
        }

        [HttpPost]
        [ApiDoc("��ȡ��γ�ȷ�Χ�ڵĳ�ĳЩ��վ��Ļ�վ��ͼ�б�")]
        [ApiParameterDoc("container", "ָ��������Χ")]
        [ApiResponse("ָ��������Χ�ڵĻ�վ��ͼ�б�")]
        public IEnumerable<CdmaBtsView> Post(ENodebRangeContainer container)
        {
            return _service.QueryBtsViews(container);
        }
    }
}