using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;

namespace Lte.Parameters.Entities.Kpi
{
    [AutoMapFrom(typeof(PreciseCoverage4GCsv))]
    public class PreciseCoverage4G : Entity
    {
        public DateTime StatTime { get; set; }

        public string DateString => StatTime.ToShortDateString();

        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public double FirstRate => 100 * (double)FirstNeighbors / TotalMrs;

        public double SecondRate => 100 * (double)SecondNeighbors / TotalMrs;

        public double ThirdRate => 100 * (double)ThirdNeighbors / TotalMrs;

        public PreciseCoverage4G() { }

        public static PreciseCoverage4G ConstructStat(PreciseCoverage4GCsv info)
        {
            return Mapper.Map<PreciseCoverage4GCsv, PreciseCoverage4G>(info);
        }
    }

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

        public int ThirdNeighbors => (int) (TotalMrs*ThirdNeighborRate)/100;

        [CsvColumn(Name = "第二强邻区MR重叠覆盖率")]
        public double SecondNeighborRate { get; set; }

        public int SecondNeighbors => (int) (TotalMrs*SecondNeighborRate)/100;

         [CsvColumn(Name = "第一强邻区MR重叠覆盖率")]
        public double FirstNeighborRate { get; set; }

        public int FirstNeighbors => (int) (TotalMrs*FirstNeighborRate)/100;
    }

    [AutoMapFrom(typeof(PreciseCoverage4G))]
    public class TownPreciseCoverage4GStat : Entity, ITownId
    {
        public DateTime StatTime { get; set; }

        public int TownId { get; set; }

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }
    }
}
