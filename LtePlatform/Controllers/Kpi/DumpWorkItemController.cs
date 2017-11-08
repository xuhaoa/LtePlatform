using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService;

namespace LtePlatform.Controllers.Kpi
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
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