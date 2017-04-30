using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using MongoDB.Bson;
using System;

namespace Lte.Parameters.Entities.Kpi
{
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
                (NeighborRsrpBelow120*(-130) + NeighborRsrpBetween120110*(-114.5) + NeighborRsrpBetween110105*(-107.5) +
                 NeighborRsrpBetween105100*(-102.5) + NeighborRsrpBetween10090*(-94.5) + NeighborRsrpAbove90*(-82.5))/
                (NeighborRsrpBelow120 + NeighborRsrpBetween120110 + NeighborRsrpBetween110105 +
                 NeighborRsrpBetween105100 + NeighborRsrpBetween10090 + NeighborRsrpAbove90);
    }
}
