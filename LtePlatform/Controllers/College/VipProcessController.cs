using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("VIP��������̲�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class VipProcessController : ApiController
    {
        private readonly VipDemandService _service;

        public VipProcessController(VipDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("���ݹ������кŲ�ѯVIP���������Ϣ")]
        [ApiParameterDoc("serialNumber", "�������к�")]
        [ApiResponse("VIP����������ݵ�Ԫ�б�")]
        public IEnumerable<VipProcessDto> Get(string serialNumber)
        {
            return _service.QueryProcess(serialNumber);
        }

        [Authorize]
        [HttpPost]
        [ApiDoc("������VIP������Ϣ������󷵻ش�����")]
        [ApiParameterDoc("dto", "����VIP������Ϣ")]
        [ApiResponse("������")]
        public async Task<VipProcessDto> Post(VipDemandDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        [ApiDoc("����VIP��������̣�¼����Ϣ")]
        [ApiParameterDoc("dto", "����VIP�����������Ϣ")]
        public async Task<int> Put(VipProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }
}