using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using System;
using System.Collections.Generic;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Kpi
{
    [AutoMapFrom(typeof(PreciseCoverage4GCsv))]
    public class PreciseCoverage4G : Entity
    {
        public DateTime StatTime { get; set; }

        public string DateString => StatTime.ToShortDateString();

        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int Neighbors0 { get; set; }

        public int Neighbors1 { get; set; }

        public int Neighbors2 { get; set; }

        public int Neighbors3 { get; set; }

        public int NeighborsMore { get; set; }

        public int InterFirstNeighbors => Neighbors1 + Neighbors2 + Neighbors3 + NeighborsMore;

        public int InterSecondNeighbors => Neighbors2 + Neighbors3 + NeighborsMore;

        public int InterThirdNeighbors => Neighbors3 + NeighborsMore;

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public double FirstRate => 100 * (double)FirstNeighbors / TotalMrs;

        public double SecondRate => 100 * (double)SecondNeighbors / TotalMrs;

        public double ThirdRate => 100 * (double)ThirdNeighbors / TotalMrs;
    }

    public class TopPrecise4GContainer
    {
        public PreciseCoverage4G PreciseCoverage4G { get; set; }

        public int TopDates { get; set; }
    }

    [AutoMapTo(typeof(PreciseCoverage4G))]
    public class PreciseMongo : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        [IgnoreMap]
        public ObjectId Id { get; set; }
        
        [AutoMapPropertyResolve("Id", typeof(PreciseCoverage4G))]
        public int FakeId => 0;

        [IgnoreMap]
        public string CellId { get; set; }

        [AutoMapPropertyResolve("CellId", typeof(PreciseCoverage4G))]
        public int ENodebId => CellId.GetSplittedFields('-')[0].ConvertToInt(0);

        public byte SectorId => CellId.GetSplittedFields('-')[1].ConvertToByte(0);

        public int Pci { get; set; }

        [AutoMapPropertyResolve("StatTime", typeof(PreciseCoverage4G))]
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

    [AutoMapFrom(typeof(PreciseCoverage4G))]
    public class TownPreciseCoverage4GStat : Entity, ITownId, IStatTime
    {
        public DateTime StatTime { get; set; }

        public int TownId { get; set; }

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public int NeighborsMore { get; set; }

        public int InterFirstNeighbors { get; set; }

        public int InterSecondNeighbors { get; set; }

        public int InterThirdNeighbors { get; set; }
    }

    [AutoMapFrom(typeof(TownPreciseView))]
    public class DistrictPreciseView : ICityDistrict
    {
        public string City { get; set; } = "-";

        public string District { get; set; } = "-";

        public int TotalMrs { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public int ThirdNeighbors { get; set; }

        public double PreciseRate => 100 - (double)SecondNeighbors * 100 / TotalMrs;

        public double FirstRate => 100 - (double)FirstNeighbors * 100 / TotalMrs;

        public double ThirdRate => 100 - (double)ThirdNeighbors * 100 / TotalMrs;

        public int NeighborsMore { get; set; }

        public int InterFirstNeighbors { get; set; }

        public int InterSecondNeighbors { get; set; }

        public int InterThirdNeighbors { get; set; }

        public static DistrictPreciseView ConstructView(TownPreciseView townView)
        {
            return townView.MapTo<DistrictPreciseView>();
        }
    }

    [AutoMap(typeof(TownPreciseCoverage4GStat))]
    public class TownPreciseView : ICityDistrictTown, IStatTime
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; } = "-";

        public string District { get; set; } = "-";

        public string Town { get; set; } = "-";

        public int TownId { get; set; }

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public double PreciseRate => 100 - (double)SecondNeighbors * 100 / TotalMrs;

        public double FirstRate => 100 - (double)FirstNeighbors * 100 / TotalMrs;

        public double ThirdRate => 100 - (double)ThirdNeighbors * 100 / TotalMrs;

        public int NeighborsMore { get; set; }

        public int InterFirstNeighbors { get; set; }

        public int InterSecondNeighbors { get; set; }

        public int InterThirdNeighbors { get; set; }
    }

    public class InterferenceMatrixStat : Entity
    {
        public int ENodebId => CellId.GetSplittedFields('-')[0].ConvertToInt(0);

        public byte SectorId => CellId.GetSplittedFields('-')[1].ConvertToByte(0);

        public string CellId { get; set; }

        public short Pci { get; set; }

        public short NeighborPci { get; set; }

        public int DestENodebId { get; set; }

        public byte DestSectorId { get; set; }

        public DateTime StatDate { get; set; }

        public int Diff0 { get; set; }

        public int Diff3 { get; set; }

        public int Diff6 { get; set; }

        public int Diff9 { get; set; }

        public int Diff12 { get; set; }

        public int DiffLarge { get; set; }

        public int SinrUl0to9 { get; set; }

        public int SinrUl10to19 { get; set; }

        public int SinrUl20to24 { get; set; }

        public int SinrUl25to29 { get; set; }

        public int SinrUl30to34 { get; set; }

        public int SinrUlAbove35 { get; set; }

        public int RsrpBelow120 { get; set; }

        public int RsrpBetween120110 { get; set; }

        public int RsrpBetween110105 { get; set; }

        public int RsrpBetween105100 { get; set; }

        public int RsrpBetween10090 { get; set; }

        public int RsrpAbove90 { get; set; }

        public int? NeighborRsrpBelow120 { get; set; }

        public int? NeighborRsrpBetween120110 { get; set; }

        public int? NeighborRsrpBetween110105 { get; set; }

        public int? NeighborRsrpBetween105100 { get; set; }

        public int? NeighborRsrpBetween10090 { get; set; }

        public int? NeighborRsrpAbove90 { get; set; }

        public int Ta0or1 { get; set; }

        public int Ta2or3 { get; set; }

        public int Ta4or5 { get; set; }

        public int Ta6or7 { get; set; }

        public int Ta8or9 { get; set; }

        public int Ta10to12 { get; set; }

        public int Ta13to15 { get; set; }

        public int Ta16to19 { get; set; }

        public int Ta20to24 { get; set; }

        public int Ta25to29 { get; set; }

        public int Ta30to39 { get; set; }

        public int TaAbove40 { get; set; }

        public int? Earfcn { get; set; }

        public int? NeighborEarfcn { get; set; }
    }

    [AutoMapTo(typeof(InterferenceMatrixStat))]
    public class InterferenceMatrixMongo : IEntity<ObjectId>, IStatDateCell
    {
        [AutoMapPropertyResolve("Id", typeof(InterferenceMatrixStat), typeof(IgnoreMapAttribute))]
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public string CellId { get; set; }

        public int Pci { get; set; }

        public int NeighborPci { get; set; }

        public DateTime StatDate { get; set; }

        public int Diff0 { get; set; }

        public int Diff3 { get; set; }

        public int Diff6 { get; set; }

        public int Diff9 { get; set; }

        public int Diff12 { get; set; }

        public int DiffLarge { get; set; }

        public int SinrUl0to9 { get; set; }

        public int SinrUl10to19 { get; set; }

        public int SinrUl20to24 { get; set; }

        public int SinrUl25to29 { get; set; }

        public int SinrUl30to34 { get; set; }

        public int SinrUlAbove35 { get; set; }

        public int RsrpBelow120 { get; set; }

        public int RsrpBetween120110 { get; set; }

        public int RsrpBetween110105 { get; set; }

        public int RsrpBetween105100 { get; set; }

        public int RsrpBetween10090 { get; set; }

        public int? RsrpAbove90 { get; set; }

        public int? NeighborRsrpBelow120 { get; set; }

        public int? NeighborRsrpBetween120110 { get; set; }

        public int? NeighborRsrpBetween110105 { get; set; }

        public int? NeighborRsrpBetween105100 { get; set; }

        public int? NeighborRsrpBetween10090 { get; set; }

        public int? NeighborRsrpAbove90 { get; set; }

        public int Ta0or1 { get; set; }

        public int Ta2or3 { get; set; }

        public int Ta4or5 { get; set; }

        public int Ta6or7 { get; set; }

        public int Ta8or9 { get; set; }

        public int Ta10to12 { get; set; }

        public int Ta13to15 { get; set; }

        public int Ta16to19 { get; set; }

        public int Ta20to24 { get; set; }

        public int Ta25to29 { get; set; }

        public int Ta30to39 { get; set; }

        public int TaAbove40 { get; set; }

        public int? Earfcn { get; set; }

        public int? NeighborEarfcn { get; set; }
    }

    [AutoMapFrom(typeof(InterferenceMatrixMongo))]
    public class NeighborRsrpView
    {
        public DateTime StatDate { get; set; }

        public int? NeighborEarfcn { get; set; }

        [AutoMapPropertyResolve("NeighborRsrpBelow120", typeof(InterferenceMatrixMongo), typeof(NullableZeroIntTransform))]
        public int NeighborRsrpBelow120 { get; set; }

        [AutoMapPropertyResolve("NeighborRsrpBetween120110", typeof(InterferenceMatrixMongo), typeof(NullableZeroIntTransform))]
        public int NeighborRsrpBetween120110 { get; set; }

        [AutoMapPropertyResolve("NeighborRsrpBetween110105", typeof(InterferenceMatrixMongo), typeof(NullableZeroIntTransform))]
        public int NeighborRsrpBetween110105 { get; set; }

        [AutoMapPropertyResolve("NeighborRsrpBetween105100", typeof(InterferenceMatrixMongo), typeof(NullableZeroIntTransform))]
        public int NeighborRsrpBetween105100 { get; set; }

        [AutoMapPropertyResolve("NeighborRsrpBetween10090", typeof(InterferenceMatrixMongo), typeof(NullableZeroIntTransform))]
        public int NeighborRsrpBetween10090 { get; set; }

        [AutoMapPropertyResolve("NeighborRsrpAbove90", typeof(InterferenceMatrixMongo), typeof(NullableZeroIntTransform))]
        public int NeighborRsrpAbove90 { get; set; }

        public double AverageNeighborRsrp
            =>
                (NeighborRsrpBelow120 * (-130) + NeighborRsrpBetween120110 * (-114.5) + NeighborRsrpBetween110105 * (-107.5) +
                 NeighborRsrpBetween105100 * (-102.5) + NeighborRsrpBetween10090 * (-94.5) + NeighborRsrpAbove90 * (-82.5)) /
                (NeighborRsrpBelow120 + NeighborRsrpBetween120110 + NeighborRsrpBetween110105 +
                 NeighborRsrpBetween105100 + NeighborRsrpBetween10090 + NeighborRsrpAbove90);
    }
}
