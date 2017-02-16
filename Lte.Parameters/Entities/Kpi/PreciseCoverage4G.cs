using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;
using System;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Kpi
{
    [AutoMapFrom(typeof(PreciseCoverage4GCsv), typeof(PreciseMongo))]
    public class PreciseCoverage4G : Entity
    {
        public DateTime StatTime { get; set; }

        public string DateString => StatTime.ToShortDateString();

        [AutoMapPropertyResolve("ENodebId", typeof(PreciseMongo))]
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public double FirstRate => 100 * (double)FirstNeighbors / TotalMrs;

        public double SecondRate => 100 * (double)SecondNeighbors / TotalMrs;

        public double ThirdRate => 100 * (double)ThirdNeighbors / TotalMrs;
    }

    public class PreciseMongo : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string CellId { get; set; }

        public int ENodebId => CellId.GetSplittedFields('-')[0].ConvertToInt(0);

        public byte SectorId => CellId.GetSplittedFields('-')[1].ConvertToByte(0);

        public DateTime StatDate { get; set; }

        public int Neighbors0 { get; set; }

        public int Neighbors1 { get; set; }

        public int Neighbors2 { get; set; }

        public int Neighbors3 { get; set; }

        public int NeighborsMore { get; set; }

        public int IntraNeighbors0 { get; set; }

        public int IntraNeighbors1 { get; set; }

        public int IntraNeighbors2 { get; set; }

        public int IntraNeighbors3 { get; set; }

        public int IntraNeighborsMore { get; set; }

        public int TotalMrs
            => IntraNeighbors0 + IntraNeighbors1 + IntraNeighbors2 + IntraNeighbors3 + IntraNeighborsMore;

        public int FirstNeighbors => IntraNeighbors1 + IntraNeighbors2 + IntraNeighbors3 + IntraNeighborsMore;

        public int SecondNeighbors => IntraNeighbors2 + IntraNeighbors3 + IntraNeighborsMore;

        public int ThirdNeighbors => IntraNeighbors3 + IntraNeighborsMore;
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
