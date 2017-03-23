using Lte.Evaluations.DataService;
using Lte.Evaluations.ViewModels;
using Lte.Parameters.Entities.Dt;
using LtePlatform.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("2G测试数据查询控制器")]
    public class Record2GController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record2GController(CsvFileInfoService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定数据文件的测试数据")]
        [ApiParameterDoc("fileName", "数据文件名")]
        [ApiResponse("指定数据文件的测试数据")]
        public IEnumerable<FileRecord2G> Get(string fileName)
        {
            return _service.GetFileRecord2Gs(fileName);
        }

        [ApiDoc("查询指定数据文件和网格编号的测试数据")]
        [ApiParameterDoc("fileName", "数据文件名")]
        [ApiParameterDoc("rasterNum", "网格编号")]
        [ApiResponse("指定数据文件的测试数据")]
        public IEnumerable<FileRecord2G> Get(string fileName, int rasterNum)
        {
            return _service.GetFileRecord2Gs(fileName, rasterNum);
        }

        [HttpPost]
        [ApiDoc("给定数据文件名称和网格编号列表，查询覆盖指标列表")]
        [ApiParameterDoc("infoView", "包含数据文件名称和网格编号列表的视图")]
        [ApiResponse("覆盖指标列表")]
        public IEnumerable<FileRecordCoverage2G> Post(FileRasterInfoView infoView)
        {
            return _service.GetCoverage2Gs(infoView);
        }
    }

    public class Record2GDetailsController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record2GDetailsController(CsvFileInfoService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("给定数据文件名称和网格编号列表，查询覆盖指标列表")]
        [ApiParameterDoc("infoView", "包含数据文件名称和网格编号列表的视图")]
        [ApiResponse("覆盖指标列表")]
        public IEnumerable<FileRecord2G> Post(FileRasterInfoView infoView)
        {
            return _service.GetFileRecord2Gs(infoView);
        }
    }

    [ApiControl("3G测试数据查询控制器")]
    public class Record3GController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record3GController(CsvFileInfoService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定数据文件的测试数据")]
        [ApiParameterDoc("fileName", "数据文件名")]
        [ApiResponse("指定数据文件的测试数据")]
        public IEnumerable<FileRecord3G> Get(string fileName)
        {
            return _service.GetFileRecord3Gs(fileName);
        }

        [ApiDoc("查询指定数据文件和网格编号的测试数据")]
        [ApiParameterDoc("fileName", "数据文件名")]
        [ApiParameterDoc("rasterNum", "网格编号")]
        [ApiResponse("指定数据文件的测试数据")]
        public IEnumerable<FileRecord3G> Get(string fileName, int rasterNum)
        {
            return _service.GetFileRecord3Gs(fileName, rasterNum);
        }

        [HttpPost]
        [ApiDoc("给定数据文件名称和网格编号列表，查询覆盖指标列表")]
        [ApiParameterDoc("infoView", "包含数据文件名称和网格编号列表的视图")]
        [ApiResponse("覆盖指标列表")]
        public IEnumerable<FileRecordCoverage3G> Post(FileRasterInfoView infoView)
        {
            return _service.GetCoverage3Gs(infoView);
        }
    }

    public class Record3GDetailsController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record3GDetailsController(CsvFileInfoService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("给定数据文件名称和网格编号列表，查询覆盖指标列表")]
        [ApiParameterDoc("infoView", "包含数据文件名称和网格编号列表的视图")]
        [ApiResponse("覆盖指标列表")]
        public IEnumerable<FileRecord3G> Post(FileRasterInfoView infoView)
        {
            return _service.GetFileRecord3Gs(infoView);
        }
    }

    [ApiControl("4G测试数据查询控制器")]
    public class Record4GController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record4GController(CsvFileInfoService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定数据文件的测试数据")]
        [ApiParameterDoc("fileName", "数据文件名")]
        [ApiResponse("指定数据文件的测试数据")]
        public IEnumerable<FileRecord4G> Get(string fileName)
        {
            return _service.GetFileRecord4Gs(fileName);
        }

        [ApiDoc("查询指定数据文件和网格编号的测试数据")]
        [ApiParameterDoc("fileName", "数据文件名")]
        [ApiParameterDoc("rasterNum", "网格编号")]
        [ApiResponse("指定数据文件的测试数据")]
        public IEnumerable<FileRecord4G> Get(string fileName, int rasterNum)
        {
            return _service.GetFileRecord4Gs(fileName, rasterNum);
        }

        [HttpPost]
        [ApiDoc("给定数据文件名称和网格编号列表，查询覆盖指标列表")]
        [ApiParameterDoc("infoView", "包含数据文件名称和网格编号列表的视图")]
        [ApiResponse("覆盖指标列表")]
        public IEnumerable<FileRecordCoverage4G> Post(FileRasterInfoView infoView)
        {
            return _service.GetCoverage4Gs(infoView);
        }
    }

    [ApiControl("4G测试详细数据查询控制器")]
    public class Record4GDetailsController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public Record4GDetailsController(CsvFileInfoService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("给定数据文件名称和网格编号列表，查询覆盖指标列表")]
        [ApiParameterDoc("infoView", "包含数据文件名称和网格编号列表的视图")]
        [ApiResponse("覆盖指标列表")]
        public IEnumerable<FileRecord4G> Post(FileRasterInfoView infoView)
        {
            return _service.GetFileRecord4Gs(infoView);
        }
    }

    [ApiControl("网格测试文件信息查询控制器")]
    public class RasterFileController : ApiController
    {
        private readonly RasterInfoService _service;

        public RasterFileController(RasterInfoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询包含指定数据类型和坐标范围的所有网格的测试文件信息")]
        [ApiParameterDoc("dataType", "指定数据类型（2G、3G、4G）")]
        [ApiParameterDoc("west", "坐标西界")]
        [ApiParameterDoc("east", "坐标东界")]
        [ApiParameterDoc("south", "坐标南界")]
        [ApiParameterDoc("north", "坐标北界")]
        [ApiResponse("包含指定数据类型的所有网格的测试文件信息视图，包括测试文件编号和包含的网格编号列表")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, double west, double east, double south,
            double north)
        {
            return _service.QueryFileNames(dataType, west, east, south, north);
        }

        [HttpGet]
        [ApiDoc("查询包含指定数据类型和坐标范围的所有网格的测试文件信息")]
        [ApiParameterDoc("dataType", "指定数据类型（2G、3G、4G）")]
        [ApiParameterDoc("west", "坐标西界")]
        [ApiParameterDoc("east", "坐标东界")]
        [ApiParameterDoc("south", "坐标南界")]
        [ApiParameterDoc("north", "坐标北界")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("包含指定数据类型的所有网格的测试文件信息视图，包括测试文件编号和包含的网格编号列表")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, double west, double east, double south,
            double north, DateTime begin, DateTime end)
        {
            return _service.QueryFileNames(dataType, west, east, south, north, begin, end);
        }
    }

    [ApiControl("DT测试数据文件查询控制器")]
    public class CsvFileInfoController : ApiController
    {
        private readonly CsvFileInfoService _service;

        public CsvFileInfoController(CsvFileInfoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("获得指定日期范围内的DT测试数据文件信息")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("DT测试数据文件信息，包括测试时间、数据名称、存放目录、测试网络（2G3G4G）和测试距离等")]
        public IEnumerable<CsvFilesInfo> Get(DateTime begin, DateTime end)
        {
            return _service.QueryFilesInfos(begin, end);
        }
    }

    [ApiControl("各区域测试日期信息的控制器")]
    public class AreaTestDateController : ApiController
    {
        private readonly AreaTestDateService _service;

        public AreaTestDateController(AreaTestDateService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("获得各区域测试日期信息，包括2G、3G、4G的最近一次测试日期")]
        [ApiResponse("各区域测试日期信息，包括2G、3G、4G的最近一次测试日期")]
        public IEnumerable<AreaTestDateView> Get()
        {
            return _service.QueryAllList();
        }
    }

    public class AgisDtPointsController : ApiController
    {
        private readonly NearestPciCellService _service;

        public AgisDtPointsController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<AgisDtPoint> Get(DateTime begin, DateTime end)
        {
            return _service.QueryAgisDtPoints(begin, end);
        } 
    }
}
