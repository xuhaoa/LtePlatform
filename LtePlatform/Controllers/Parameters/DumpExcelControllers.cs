using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Dump;
using LtePlatform.Models;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("CDMA基站从Excel表导入控制器")]
    public class DumpBtsExcelController : ApiController
    {
        private readonly BtsDumpService _service;
        private readonly BasicImportService _importService;

        public DumpBtsExcelController(BtsDumpService service, BasicImportService importService)
        {
            _service = service;
            _importService = importService;
        }

        [HttpPost]
        [ApiDoc("从Excel表导入CDMA基站信息")]
        [ApiParameterDoc("info", "CDMA基站信息")]
        [ApiResponse("导入是否成功 ")]
        public bool Post(BtsExcel info)
        {
            return _service.DumpSingleBtsExcel(info);
        }

        [HttpGet]
        [ApiDoc("对比导入的CDMA基站信息和数据库现有信息，获取所有待消亡的CDMA基站编号信息")]
        [ApiResponse("所有待消亡的CDMA基站编号信息")]
        public IEnumerable<int> Get()
        {
            return _importService.GetVanishedBtsIds();
        }

        [HttpPut]
        [ApiDoc("批量修改数据库中CDMA基站的消亡状态")]
        [ApiParameterDoc("container", "待消亡的CDMA基站编号容器")]
        public void Put(ENodebIdsContainer container)
        {
            _service.VanishBtss(container);
        }
    }

    [ApiControl("LTE基站从Excel表导入控制器")]
    public class DumpENodebExcelController : ApiController
    {
        private readonly ENodebDumpService _service;
        private readonly BasicImportService _importService;

        public DumpENodebExcelController(ENodebDumpService service, BasicImportService importService)
        {
            _service = service;
            _importService = importService;
        }

        [HttpPost]
        [ApiDoc("从Excel表导入LTE基站信息")]
        [ApiParameterDoc("info", "LTE基站信息")]
        [ApiResponse("导入是否成功 ")]
        public bool Post(ENodebExcel info)
        {
            return _service.DumpSingleENodebExcel(info);
        }

        [HttpGet]
        [ApiDoc("对比导入的LTE基站信息和数据库现有信息，获取所有待消亡的LTE基站编号信息")]
        [ApiResponse("所有待消亡的LTE基站编号信息")]
        public IEnumerable<int> Get()
        {
            return _importService.GetVanishedENodebIds();
        }

        [HttpPut]
        [ApiDoc("批量修改数据库中LTE基站的消亡状态")]
        [ApiParameterDoc("container", "待消亡的LTE基站编号容器")]
        public void Put(ENodebIdsContainer container)
        {
            _service.VanishENodebs(container);
        }
    }

    [ApiControl("CDMA小区从Excel表导入控制器")]
    public class DumpCdmaCellExcelController : ApiController
    {
        private readonly CdmaCellDumpService _service;
        private readonly BasicImportService _importService;

        public DumpCdmaCellExcelController(CdmaCellDumpService service, BasicImportService importService)
        {
            _service = service;
            _importService = importService;
        }

        [HttpPost]
        [ApiDoc("从Excel表导入CDMA小区信息")]
        [ApiParameterDoc("info", "CDMA小区信息")]
        [ApiResponse("导入是否成功 ")]
        public bool Post(CdmaCellExcel info)
        {
            return _service.DumpSingleCellExcel(info);
        }

        [HttpGet]
        [ApiDoc("对比导入的CDMA小区信息和数据库现有信息，获取所有待消亡的CDMA小区编号信息")]
        [ApiResponse("所有待消亡的CDMA小区编号信息")]
        public IEnumerable<CdmaCellIdPair> Get()
        {
            return _importService.GetVanishedCdmaCellIds();
        }

        [HttpPut]
        [ApiDoc("批量修改数据库中CDMA小区的消亡状态")]
        [ApiParameterDoc("container", "待消亡的CDMA小区编号容器")]
        public void Put(CdmaCellIdsContainer container)
        {
            _service.VanishCells(container);
        }
    }
}
