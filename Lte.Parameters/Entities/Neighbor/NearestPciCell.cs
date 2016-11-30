using Lte.Domain.Common;
using Lte.Domain.LinqToCsv;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using Lte.Domain.Regular;
using Lte.Parameters.Abstract.Basic;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;

namespace Lte.Parameters.Entities.Neighbor
{
    [Table("dbo.LteNeighborCells")]
    public class NearestPciCell : LteNeighborCell
    {
        public short Pci { get; set; }
        
        public int TotalTimes { get; set; }

        public static NearestPciCell ConstructCell(NeighborCellHwCsv info, ICellRepository cellRepository)
        {
            var fields = info.CellRelation.GetSplittedFields();
            var cellId = fields[13].ConvertToInt(0);
            var sectorId = fields[5].ConvertToByte(0);
            var neighborCellId = fields[11].ConvertToInt(0);
            var neighborSectorId = fields[3].ConvertToByte(0);
            var neiborCell = neighborCellId > 10000 ? cellRepository.GetBySectorId(neighborCellId, neighborSectorId) : null;
            return new NearestPciCell
            {
                CellId = cellId,
                SectorId = (neighborSectorId > 30 && sectorId < 30) ? (byte)(sectorId + 48) : sectorId,
                NearestCellId = neighborCellId,
                NearestSectorId = neighborSectorId,
                Pci = neiborCell?.Pci ?? -1,
                TotalTimes = info.TotalTimes
            };
        }

        public static NearestPciCell ConstructCell(NeighborCellZteCsv info, ICellRepository cellRepository)
        {
            var fields = info.NeighborRelation.GetSplittedFields(':');
            var neighborCellId = fields[3].ConvertToInt(0);
            var neighborSectorId = fields[4].ConvertToByte(0);
            var neiborCell = neighborCellId > 10000 ? cellRepository.GetBySectorId(neighborCellId, neighborSectorId) : null;
            return new NearestPciCell
            {
                CellId = info.ENodebId,
                SectorId = info.SectorId,
                NearestCellId = neighborCellId,
                NearestSectorId = neighborSectorId,
                Pci = neiborCell?.Pci ?? (short) -1,
                TotalTimes = info.IntraSystemTimes + info.InterSystemTimes
            };
        }
    }

    public class NeighborCellZteCsv
    {
        [CsvColumn(Name = "网元")]
        public int ENodebId { get; set; }

        [CsvColumn(Name = "小区")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "邻区关系")]
        public string NeighborRelation { get; set; }

        [CsvColumn(Name = "[FDD]系统内同频切换出请求次数（小区对）")]
        public int IntraSystemTimes { get; set; }

        [CsvColumn(Name = "[FDD]系统内异频切换出请求次数(小区对)")]
        public int InterSystemTimes { get; set; }

        public static List<NeighborCellZteCsv> ReadNeighborCellZteCsvs(StreamReader reader)
        {
            var infos = CsvContext.Read<NeighborCellZteCsv>(reader, CsvFileDescription.CommaDescription);
            var groupInfos = (from info in infos
                              group info by new { info.ENodebId, info.SectorId, info.NeighborRelation }
                into g
                              select new NeighborCellZteCsv
                              {
                                  ENodebId = g.Key.ENodebId,
                                  SectorId = g.Key.SectorId,
                                  NeighborRelation = g.Key.NeighborRelation,
                                  IntraSystemTimes = g.Sum(x => x.IntraSystemTimes),
                                  InterSystemTimes = g.Sum(x => x.InterSystemTimes)
                              }).ToList();
            return groupInfos;
        }

    }

    public class NeighborCellHwCsv
    {
        [CsvColumn(Name = "邻小区")]
        public string CellRelation { get; set; }

        [CsvColumn(Name = "特定两小区间切换出尝试次数 (无)")]
        public int TotalTimes { get; set; }

        public static List<NeighborCellHwCsv> ReadNeighborCellHwCsvs(StreamReader reader)
        {
            var infos = CsvContext.Read<NeighborCellHwCsv>(reader, CsvFileDescription.CommaDescription);
            var groupInfos = (from info in infos
                              group info by info.CellRelation
                into g
                              select new NeighborCellHwCsv
                              {
                                  CellRelation = g.Key,
                                  TotalTimes = g.Sum(x => x.TotalTimes)
                              }).ToList();
            return groupInfos;
        }

    }
}