using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("VIP需求处理过程查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class VipProcessController : ApiController
    {
        private readonly VipDemandService _service;

        public VipProcessController(VipDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据工单序列号查询VIP处理过程信息")]
        [ApiParameterDoc("serialNumber", "工单序列号")]
        [ApiResponse("VIP处理过程数据单元列表")]
        public IEnumerable<VipProcessDto> Get(string serialNumber)
        {
            return _service.QueryProcess(serialNumber);
        }

        [Authorize]
        [HttpPost]
        [ApiDoc("处理单个VIP需求信息，处理后返回处理结果")]
        [ApiParameterDoc("dto", "单个VIP需求信息")]
        [ApiResponse("处理结果")]
        public async Task<VipProcessDto> Post(VipDemandDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        [ApiDoc("处理VIP需求处理过程，录入信息")]
        [ApiParameterDoc("dto", "单个VIP需求处理过程信息")]
        public async Task<int> Put(VipProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }
}