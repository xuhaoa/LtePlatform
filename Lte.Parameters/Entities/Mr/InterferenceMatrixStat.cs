using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.LinqToCsv;

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
}
