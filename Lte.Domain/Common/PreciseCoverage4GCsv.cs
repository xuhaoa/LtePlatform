using System;
using Lte.Domain.LinqToCsv;

namespace Lte.Domain.Common
{
    public class PreciseCoverage4GCsv
    {
        [CsvColumn(Name = "ʱ��")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "BTS")]
        public int CellId { get; set; }

        [CsvColumn(Name = "SECTOR")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "MR����")]
        public int TotalMrs { get; set; }

        [CsvColumn(Name = "����ǿ����MR�ص�������")]
        public double ThirdNeighborRate { get; set; }

        public int ThirdNeighbors => (int)(TotalMrs * ThirdNeighborRate) / 100;

        [CsvColumn(Name = "�ڶ�ǿ����MR�ص�������")]
        public double SecondNeighborRate { get; set; }

        public int SecondNeighbors => (int)(TotalMrs * SecondNeighborRate) / 100;

        [CsvColumn(Name = "��һǿ����MR�ص�������")]
        public double FirstNeighborRate { get; set; }

        public int FirstNeighbors => (int)(TotalMrs * FirstNeighborRate) / 100;
    }
}