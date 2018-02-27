using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.ViewModels.Precise;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("LTE RRU ��ѯ������")]
    public class LteRruCellController : ApiController
    {
        private readonly CellRruService _service;

        public LteRruCellController(CellRruService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("����RRU���Ʋ�ѯС���б�")]
        [ApiParameterDoc("rruName", "RRU����")]
        [ApiResponse("С����Ϣ�б�")]
        public IEnumerable<CellView> Get(string rruName)
        {
            return _service.QueryByRruName(rruName);
        } 
    }
}