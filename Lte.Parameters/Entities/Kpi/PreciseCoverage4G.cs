using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using System;
using System.Collections.Generic;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Neighbor;
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

    [AutoMapFrom(typeof(PreciseCoverage4G))]
    [TypeDoc("4G精确覆盖率视图")]
    public class Precise4GView
    {
        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("总测量报告数")]
        public int TotalMrs { get; set; }

        [MemberDoc("第二邻区数")]
        public int SecondNeighbors { get; set; }

        [MemberDoc("第一邻区精确覆盖率")]
        public double FirstRate { get; set; }

        [MemberDoc("第二邻区精确覆盖率")]
        public double SecondRate { get; set; }

        [MemberDoc("第三邻区精确覆盖率")]
        public double ThirdRate { get; set; }

        [MemberDoc("基站名称")]
        public string ENodebName { get; set; } = "未导入基站";

        [MemberDoc("TOP天数")]
        public int TopDates { get; set; }

        public static Precise4GView ConstructView(PreciseCoverage4G stat, IENodebRepository repository)
        {
            var view = Mapper.Map<PreciseCoverage4G, Precise4GView>(stat);
            var eNodeb = repository.GetByENodebId(stat.CellId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }
    }

    public class TopPreciseViewContainer
    {
        public IEnumerable<Precise4GView> Views { get; set; }
    }

    [AutoMapFrom(typeof(Precise4GView), typeof(NearestPciCell), typeof(LteNeighborCell))]
    public class CellSectorIdPair
    {
        public int CellId { get; set; }

        public byte SectorId { get; set; }
    }

    public class PreciseImportView
    {
        public Precise4GView View { get; set; }

        public DateTime Begin { get; set; }

        public DateTime End { get; set; }
    }

    [AutoMapFrom(typeof(Cell), typeof(Precise4GView))]
    [TypeDoc("4G精确覆盖率视图，用于扇区信息显示")]
    public class Precise4GSector : Precise4GView
    {
        [MemberDoc("天线挂高")]
        public double Height { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [MemberDoc("总下倾角")]
        public double DownTilt { get; set; }

        [MemberDoc("小区经度")]
        public double Longtitute { get; set; }

        [MemberDoc("小区纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("物理小区编号，范围0-503")]
        public short Pci { get; set; }

        [MemberDoc("参考信号(Reference Signal)功率，单位是dBm")]
        public double RsPower { get; set; }

        public static Precise4GSector ConstructSector(Precise4GView view, ICellRepository repository)
        {
            var sector = Mapper.Map<Precise4GView, Precise4GSector>(view);
            var cell = repository.GetBySectorId(view.CellId, view.SectorId);
            if (cell == null)
            {
                sector.Height = -1;
            }
            else
            {
                Mapper.Map(cell, sector);
                sector.DownTilt = cell.MTilt + cell.ETilt;
            }
            return sector;
        }
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
    public class TownPreciseView : ICityDistrictTown
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

    public class TownPreciseViewContainer
    {
        public IEnumerable<TownPreciseView> Views { get; set; }
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
