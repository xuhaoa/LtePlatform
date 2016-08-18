using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.LinqToCsv;
using Lte.Domain.Regular;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Mr
{
    [AutoMapFrom(typeof(InterferenceMatrixPci))]
    public class InterferenceMatrixStat : Entity
    {
        public DateTime RecordTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public short DestPci { get; set; }

        public int DestENodebId { get; set; }

        public byte DestSectorId { get; set; }

        public int Mod3Interferences { get; set; }

        public int Mod6Interferences { get; set; }

        public int OverInterferences6Db { get; set; }

        public int OverInterferences10Db { get; set; }

        public double InterferenceLevel { get; set; }
    }

    public class InterferenceMatrixCsv
    {
        [CsvColumn(Name = "ENODEBID_源PCI_邻PCI_邻频点")]
        public string CellRelation { get; set; }

        public int ENodebId => CellRelation.Split('_')[0].ConvertToInt(0);

        public short SourcePci => CellRelation.GetSplittedFields('_')[1].ConvertToShort(0);

        public short DestPci => CellRelation.GetSplittedFields('_')[2].ConvertToShort(0);

        public int Frequency => CellRelation.GetSplittedFields('_')[3].ConvertToInt(100);

        [CsvColumn(Name = "MOD3干扰数")]
        public int Mod3Interferences { get; set; }

        [CsvColumn(Name = "MOD6干扰数")]
        public int Mod6Interferences { get; set; }

        [CsvColumn(Name = "过覆盖数同频6db")]
        public int OverInterferences6Db { get; set; }

        [CsvColumn(Name = "过覆盖数同频10db")]
        public int OverInterferences10Db { get; set; }

        [CsvColumn(Name = "干扰值只有同频")]
        public double InterferenceLevel { get; set; }
    }

    [AutoMapFrom(typeof(InterferenceMatrixCsv))]
    public class InterferenceMatrixPci
    {
        public int ENodebId { get; set; }

        public short SourcePci { get; set; }

        public short DestPci { get; set; }

        public int Frequency { get; set; }

        public int Mod3Interferences { get; set; }

        public int Mod6Interferences { get; set; }

        public int OverInterferences6Db { get; set; }

        public int OverInterferences10Db { get; set; }

        public double InterferenceLevel { get; set; }
    }

    [AutoMapTo(typeof(InterferenceMatrixStat))]
    public class InterferenceMatrixMongo : IEntity<ObjectId>
    {
        [AutoMapPropertyResolve("Id", typeof(InterferenceMatrixStat), typeof(IgnoreMapAttribute))]
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public int ENodebId { get; set; }

        public int Pci { get; set; }

        [AutoMapPropertyResolve("OverInterferences10Db", typeof(InterferenceMatrixStat), typeof(NullableZeroIntTransform))]
        public int? Over10db { get; set; }

        [AutoMapPropertyResolve("Mod3Interferences", typeof(InterferenceMatrixStat), typeof(NullableZeroIntTransform))]
        public int? Mod3Count { get; set; }

        [AutoMapPropertyResolve("OverInterferences6Db", typeof(InterferenceMatrixStat), typeof(NullableZeroIntTransform))]
        public int? Over6db { get; set; }

        [AutoMapPropertyResolve("Mod6Interferences", typeof(InterferenceMatrixStat), typeof(NullableZeroIntTransform))]
        public int? Mod6Count { get; set; }

        public DateTime CurrentDate { get; set; }

        [AutoMapPropertyResolve("InterferenceLevel", typeof(InterferenceMatrixStat), typeof(NullableZeroTransform))]
        public double? InterfLevel { get; set; }

        public int NeighborFreq { get; set; }

        [AutoMapPropertyResolve("DestPci", typeof(InterferenceMatrixStat))]
        public int NeighborPci { get; set; }
    }
}
