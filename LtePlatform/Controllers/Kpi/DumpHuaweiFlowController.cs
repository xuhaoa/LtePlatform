using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("���뻪Ϊ����������")]
    public class DumpHuaweiFlowController : ApiController
    {
        private readonly FlowService _service;

        public DumpHuaweiFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpPut]
        [ApiDoc("����һ����Ϊ����")]
        [ApiResponse("�Ƿ��Ѿ��ɹ�����")]
        public Task<bool> Put()
        {
            return _service.DumpOneHuaweiStat();
        }

        [HttpGet]
        [ApiDoc("��õ�ǰ�������д�����Ļ�Ϊ����ͳ�Ƽ�¼��")]
        [ApiResponse("��ǰ�������д�����Ļ�Ϊ����ͳ�Ƽ�¼��")]
        public int Get()
        {
            return _service.FlowHuaweiCount;
        }

        [HttpDelete]
        [ApiDoc("��մ�����Ļ�Ϊ����ͳ�Ƽ�¼")]
        public void Delete()
        {
            _service.ClearHuaweiStats();
        }
    }
}