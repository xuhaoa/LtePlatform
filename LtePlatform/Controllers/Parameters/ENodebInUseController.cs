using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.ViewModels.RegionKpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("���û�վ��ѯ������")]
    public class ENodebInUseController : ApiController
    {
        private readonly ENodebQueryService _service;

        public ENodebInUseController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("������������������ѯ���û�վ�б�")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiParameterDoc("town", "����")]
        [ApiResponse("��ѯ�õ����õĻ�վ�б���")]
        public IEnumerable<ENodebView> Get(string city, string district, string town)
        {
            return _service.GetByTownNamesInUse(city, district, town);
        }

        [HttpGet]
        [ApiDoc("ʹ������ģ����ѯ�������Ⱥ�ƥ���վ���ơ���վ��š��滮��ź͵�ַ")]
        [ApiParameterDoc("name", "ģ����ѯ������")]
        [ApiResponse("��ѯ�õ��Ļ�վ�б��������û����ᱨ��")]
        public IEnumerable<ENodebView> Get(string name)
        {
            return _service.GetByGeneralNameInUse(name);
        }

    }
}