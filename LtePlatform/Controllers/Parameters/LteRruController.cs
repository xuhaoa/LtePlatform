using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("LTE RRU��ѯ������")]
    public class LteRruController : ApiController
    {
        private readonly CellService _service;

        public LteRruController(CellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("����С�����Ʋ�ѯRRU��Ϣ")]
        [ApiParameterDoc("cellName", "С������")]
        [ApiResponse("RRU��Ϣ")]
        public LteRru Get(string cellName)
        {
            return _service.QueryRru(cellName);
        }
    }
}