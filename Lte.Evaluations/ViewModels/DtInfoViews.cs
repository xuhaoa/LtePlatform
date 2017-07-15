using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Dt;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Lte.MySqlFramework.Entities;

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
    
    [TypeDoc("测试数据文件网格视图，一个测试数据文件包含的若干个网格")]
    public class FileRasterInfoView
    {
        [MemberDoc("测试数据文件名")]
        [Required]
        public string CsvFileName { get; set; }

        [MemberDoc("包含的网格编号列表")]
        public IEnumerable<int> RasterNums { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord2G))]
    public class FileRecordCoverage2G
    {
        [AutoMapPropertyResolve("Longtitute", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("Lattitute", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("Ecio", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double Ecio { get; set; }

        [AutoMapPropertyResolve("RxAgc", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double RxAgc { get; set; }

        [AutoMapPropertyResolve("TxPower", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double TxPower { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord3G))]
    public class FileRecordCoverage3G
    {
        [AutoMapPropertyResolve("Longtitute", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("Lattitute", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("Sinr", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double Sinr { get; set; }

        [AutoMapPropertyResolve("RxAgc0", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double RxAgc0 { get; set; }

        [AutoMapPropertyResolve("RxAgc1", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double RxAgc1 { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord4G))]
    public class FileRecordCoverage4G
    {
        [AutoMapPropertyResolve("Longtitute", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("Lattitute", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("Sinr", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Sinr { get; set; }

        [AutoMapPropertyResolve("Rsrp", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Rsrp { get; set; }
    }
}
