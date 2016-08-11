using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Dt;

namespace Lte.Evaluations.ViewModels
{
    [AutoMapFrom(typeof(RasterInfo))]
    public class RasterInfoView
    {
        [AutoMapPropertyResolve("RasterNum", typeof(RasterInfo), typeof(NullableIntTransform))]
        public int RasterNum { get; set; }

        [AutoMapPropertyResolve("CsvFilesName4G", typeof(RasterInfo), typeof(SemiCommaTransform))]
        public IEnumerable<string> CsvFilesName4Gs { get; set; }

        [AutoMapPropertyResolve("CsvFilesName3G", typeof(RasterInfo), typeof(SemiCommaTransform))]
        public IEnumerable<string> CsvFilesName3Gs { get; set; }

        [AutoMapPropertyResolve("CsvFilesName2G", typeof(RasterInfo), typeof(SemiCommaTransform))]
        public IEnumerable<string> CsvFilesName2Gs { get; set; }

        public string Area { get; set; }

        public double WestLongtitute { get; set; }

        public double EastLongtitute { get; set; }

        public double SouthLattitute { get; set; }

        public double NorthLattitute { get; set; }
    }

    public class RasterFileInfoView
    {
        public int RasterNum { get; set; }

        public IEnumerable<string> CsvFilesNames { get; set; } = new List<string>();

        public RasterFileInfoView(RasterInfo info, string dataType)
        {
            RasterNum = info.RasterNum ?? 0;
            if (dataType == "2G" && !string.IsNullOrEmpty(info.CsvFilesName2G))
                CsvFilesNames = info.CsvFilesName2G.Split(';');
            if (dataType == "3G" && !string.IsNullOrEmpty(info.CsvFilesName3G))
                CsvFilesNames = info.CsvFilesName3G.Split(';');
            if (dataType == "4G" && !string.IsNullOrEmpty(info.CsvFilesName4G))
                CsvFilesNames = info.CsvFilesName4G.Split(';');
        }
    }

    [TypeDoc("测试数据文件网格视图，一个测试数据文件包含的若干个网格")]
    public class FileRasterInfoView
    {
        [MemberDoc("测试数据文件名")]
        [Required]
        public string CsvFileName { get; set; }

        [MemberDoc("包含的网格编号列表")]
        public IEnumerable<int> RasterNums { get; set; }
    }

    public class FileRecordCoverage2G
    {
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Ecio { get; set; }

        public double RxAgc { get; set; }

        public double TxPower { get; set; }
    }

    public class FileRecordCoverage3G
    {
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Sinr { get; set; }

        public double RxAgc0 { get; set; }

        public double RxAgc1 { get; set; }
    }

    public class FileRecordCoverage4G
    {
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Sinr { get; set; }

        public double Rsrp { get; set; }
    }
}
