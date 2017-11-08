using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.College
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class EmergencyFiberController : ApiController
    {
        private readonly EmergencyFiberService _service;

        [HttpGet]
        public IEnumerable<EmergencyFiberWorkItem> Get(int id)
        {
            return _service.Query(id);
        }

        public EmergencyFiberController(EmergencyFiberService service)
        {
            _service = service;
        }

        [HttpPost]
        public EmergencyFiberWorkItem Post(EmergencyFiberWorkItem item)
        {
            return _service.Create(item);
        }

        [HttpPut]
        public async Task<int> Put(EmergencyFiberWorkItem item)
        {
            return await _service.Finish(item);
        }
    }
}