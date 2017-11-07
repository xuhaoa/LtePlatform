using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("网格测试文件信息查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
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

        [HttpGet]
        [ApiDoc("查询包含指定数据类型和镇区的日期范围内的测试文件信息")]
        [ApiParameterDoc("dataType", "指定数据类型（2G、3G、4G）")]
        [ApiParameterDoc("townName", "镇区名称")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("包含指定数据类型的日期范围内的测试文件信息视图，包括测试文件编号和包含的网格编号列表")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, string townName, DateTime begin, DateTime end)
        {
            return _service.QueryFileNames(dataType, townName, begin, end);
        }

        [HttpGet]
        [ApiDoc("查询包含指定数据类型和镇区的所有网格的测试文件信息")]
        [ApiParameterDoc("dataType", "指定数据类型（2G、3G、4G）")]
        [ApiParameterDoc("townName", "镇区名称")]
        [ApiResponse("包含指定数据类型的所有网格的测试文件信息视图，包括测试文件编号和包含的网格编号列表")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, string townName)
        {
            return _service.QueryFileNames(dataType, townName);
        }

        [HttpGet]
        [ApiDoc("查询包含指定日期范围内的测试文件信息")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("包含指定日期范围内的测试文件信息")]
        public IEnumerable<CsvFilesInfo> Get(DateTime begin, DateTime end)
        {
            return _service.QureyFileNames(begin, end);
        }

        [HttpGet]
        public string Get(string csvFileName)
        {
            return _service.QueryNetworkType(csvFileName);
        }

        [HttpGet]
        [ApiDoc("测试用API")]
        public IEnumerable<RasterInfo> Get()
        {
            return _service.GetAllList();
        } 
    }
}