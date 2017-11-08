using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("Ӧ�����̲�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class EmergencyProcessController : ApiController
    {
        private readonly EmergencyCommunicationService _service;

        public EmergencyProcessController(EmergencyCommunicationService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("����Ӧ�������Ų�ѯ��Ӧ��������Ϣ")]
        [ApiParameterDoc("id", "Ӧ�������¼���")]
        [ApiResponse("��Ӧ��������Ϣ��Ӧ����һ���б�һ�������Ӧһ����¼")]
        public IEnumerable<EmergencyProcessDto> Get(int id)
        {
            return _service.QueryProcess(id);
        }

        [Authorize]
        [HttpPost]
        [ApiDoc("����Ӧ��������Ϣ����������һ��Ӧ���������̴�����Ϣ")]
        [ApiParameterDoc("dto", "Ӧ��������Ϣ")]
        [ApiResponse("�������")]
        public async Task<EmergencyProcessDto> Post(EmergencyCommunicationDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        [ApiDoc("�޸�һ��Ӧ���������̴�����Ϣ��һ�����޸�״̬")]
        [ApiParameterDoc("dto", "Ӧ���������̴�����Ϣ")]
        [ApiResponse("�޸Ľ��")]
        public async Task<int> Put(EmergencyProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }
}