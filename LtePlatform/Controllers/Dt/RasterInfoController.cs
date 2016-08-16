using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.Evaluations.ViewModels;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
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
}
