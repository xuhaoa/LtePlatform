using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("У԰��CDMA��վ��ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeBtssController : ApiController
    {
        private readonly CollegeBtssService _service;

        public CollegeBtssController(CollegeBtssService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ����У԰��CDMA��վ��ͼ�б�")]
        [ApiParameterDoc("collegeName", "У԰����")]
        [ApiResponse("CDMA��վ��ͼ�б�")]
        public IEnumerable<CdmaBtsView> Get(string collegeName)
        {
            return _service.Query(collegeName);
        }

        [HttpPost]
        public async Task<int> Post(CollegeBtsIdsContainer container)
        {
            return await _service.UpdateBtss(container);
        }
    }
}