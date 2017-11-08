using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.College
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class VipProcessFinishController : ApiController
    {
        private readonly VipDemandService _service;

        public VipProcessFinishController(VipDemandService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        public async Task<int> Post(VipProcessDto dto)
        {
            return await _service.FinishAsync(dto, User.Identity.Name);
        } 
    }
}