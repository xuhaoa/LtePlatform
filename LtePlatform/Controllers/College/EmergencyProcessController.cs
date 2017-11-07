using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("应急流程查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class EmergencyProcessController : ApiController
    {
        private readonly EmergencyCommunicationService _service;

        public EmergencyProcessController(EmergencyCommunicationService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据应急需求编号查询对应的流程信息")]
        [ApiParameterDoc("id", "应急需求记录编号")]
        [ApiResponse("对应的流程信息，应该是一个列表，一个步骤对应一条记录")]
        public IEnumerable<EmergencyProcessDto> Get(int id)
        {
            return _service.QueryProcess(id);
        }

        [Authorize]
        [HttpPost]
        [ApiDoc("给定应急需求信息，新增建立一条应急需求流程处理信息")]
        [ApiParameterDoc("dto", "应急需求信息")]
        [ApiResponse("建立结果")]
        public async Task<EmergencyProcessDto> Post(EmergencyCommunicationDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        [ApiDoc("修改一条应急需求流程处理信息，一般是修改状态")]
        [ApiParameterDoc("dto", "应急需求流程处理信息")]
        [ApiResponse("修改结果")]
        public async Task<int> Put(EmergencyProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }
}