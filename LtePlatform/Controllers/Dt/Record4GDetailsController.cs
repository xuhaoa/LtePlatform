using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Dt;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("4G������ϸ���ݲ�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class Record4GDetailsController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record4GDetailsController(CsvFileInfoService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("���������ļ����ƺ��������б���ѯ����ָ���б�")]
        [ApiParameterDoc("infoView", "���������ļ����ƺ��������б����ͼ")]
        [ApiResponse("����ָ���б�")]
        public IEnumerable<FileRecord4G> Post(FileRasterInfoView infoView)
        {
            return _service.GetFileRecord4Gs(infoView);
        }
    }
}