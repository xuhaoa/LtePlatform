using System;
using Lte.Domain.LinqToCsv;

namespace Lte.Domain.Common
{
    public class PreciseCoverage4GCsv
    {
        [CsvColumn(Name = "时间")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "BTS")]
        public int CellId { get; set; }

        [CsvColumn(Name = "SECTOR")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "MR总数")]
        public int TotalMrs { get; set; }

        [CsvColumn(Name = "第三强邻区MR重叠覆盖率")]
        public double ThirdNeighborRate { get; set; }

        public int ThirdNeighbors => (int)(TotalMrs * ThirdNeighborRate) / 100;

        [CsvColumn(Name = "第二强邻区MR重叠覆盖率")]
        public double SecondNeighborRate { get; set; }

        public int SecondNeighbors => (int)(TotalMrs * SecondNeighborRate) / 100;

        [CsvColumn(Name = "第一强邻区MR重叠覆盖率")]
        public double FirstNeighborRate { get; set; }

        public int FirstNeighbors => (int)(TotalMrs * FirstNeighborRate) / 100;
    }
}