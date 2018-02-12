using System.Collections.Generic;
using System.Linq;
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

        [HttpGet]
        [ApiDoc("������������������ѯ���û�վ�أ���춵؈D�@ʾ")]
        [ApiParameterDoc("cityName", "����")]
        [ApiParameterDoc("districtName", "����")]
        [ApiParameterDoc("townName", "����")]
        [ApiResponse("��ѯ�õ����õĻ�վ�ؽ��")]
        public IEnumerable<ENodebCluster> GetCluster(string cityName, string districtName, string townName)
        {
            return _service.GetByTownNamesInUse(cityName, districtName, townName)
                .GroupBy(x => new
                {
                    LongtituteGrid = (int) (x.Longtitute * 100000),
                    LattituteGrid = (int) (x.Lattitute * 100000)
                }).Select(g => new ENodebCluster
                {
                    LongtituteGrid = g.Key.LongtituteGrid,
                    LattituteGrid = g.Key.LattituteGrid,
                    ENodebViews = g
                });
        }

    }
}