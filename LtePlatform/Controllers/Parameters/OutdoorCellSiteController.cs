using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Basic;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("����LTEС��վ���ѯ������")]
    public class OutdoorCellSiteController : ApiController
    {
        private readonly CellService _service;
        private readonly ENodebQueryService _eNodebQueryService;

        public OutdoorCellSiteController(CellService service, ENodebQueryService eNodebQueryService)
        {
            _service = service;
            _eNodebQueryService = eNodebQueryService;
        }

        [HttpGet]
        [ApiDoc("������ѯ����С��վ��")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("С����γ���б�")]
        public IEnumerable<GeoPoint> Get(string city, string district)
        {
            return _service.QueryOutdoorCellSites(_eNodebQueryService.GetENodebsByDistrict(city, district));
        } 
    }
}