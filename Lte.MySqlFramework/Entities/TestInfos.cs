using Abp.Domain.Entities;
using Lte.Domain.Regular.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Lte.Domain.Common.Geo;

namespace Lte.MySqlFramework.Entities
{
    public class RasterInfo : Entity, IGeoPoint<double>
    {
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string Area { get; set; }
    }

    public class RasterTestInfo : Entity
    {
        public int RasterNum { get; set; }
        
        public string CsvFilesName { get; set; }
        
        public string NetworkType { get; set; }
    }

    public class RasterFileDtInfo : Entity
    {
        public int FileId { get; set; }

        public int RasterNum { get; set; }

        public int Count { get; set; }

        public int CoverageCount { get; set; }

        public double CoverageRate => Count == 0 ? 0 : 100 * (double)CoverageCount / Count;
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

}
