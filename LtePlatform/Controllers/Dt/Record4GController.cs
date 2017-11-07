using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Dt;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("4G�������ݲ�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class Record4GController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record4GController(CsvFileInfoService service)
        {
            _service = service;
        }

        [ApiDoc("��ѯָ�������ļ��Ĳ�������")]
        [ApiParameterDoc("fileName", "�����ļ���")]
        [ApiResponse("ָ�������ļ��Ĳ�������")]
        public IEnumerable<FileRecord4G> Get(string fileName)
        {
            return _service.GetFileRecord4Gs(fileName);
        }

        [ApiDoc("��ѯָ�������ļ��������ŵĲ�������")]
        [ApiParameterDoc("fileName", "�����ļ���")]
        [ApiParameterDoc("rasterNum", "������")]
        [ApiResponse("ָ�������ļ��Ĳ�������")]
        [HttpGet]
        public IEnumerable<FileRecord4G> Get(string fileName, int rasterNum)
        {
            return _service.GetFileRecord4Gs(fileName, rasterNum);
        }

        [HttpPost]
        [ApiDoc("���������ļ����ƺ��������б���ѯ����ָ���б�")]
        [ApiParameterDoc("infoView", "���������ļ����ƺ��������б����ͼ")]
        [ApiResponse("����ָ���б�")]
        public IEnumerable<FileRecordCoverage4G> Post(FileRasterInfoView infoView)
        {
            return _service.GetCoverage4Gs(infoView);
        }
    }
}