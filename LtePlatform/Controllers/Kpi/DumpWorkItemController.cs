using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("�������������")]
    public class DumpWorkItemController : ApiController
    {
        private readonly WorkItemService _service;

        public DumpWorkItemController(WorkItemService service)
        {
            _service = service;
        }

        [HttpPut]
        public async Task<bool> Put()
        {
            return await _service.DumpOne();
        }

        [HttpDelete]
        public void Delete()
        {
            _service.ClearDumpItems();
        }

        [HttpGet]
        public int Get()
        {
            return _service.QueryDumpItems();
        }
    }
}