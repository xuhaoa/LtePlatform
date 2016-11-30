using Abp.EntityFramework.Repositories;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lte.Evaluations.DataService.Dump
{
    public class CellDumpService
    {
        private readonly IBtsRepository _btsRepository;
        private readonly ICellRepository _cellRepository;
        private readonly ILteRruRepository _rruRepository;

        public CellDumpService(IBtsRepository btsRepository, ICellRepository cellRepository, ILteRruRepository rruRepository)
        {
            _btsRepository = btsRepository;
            _cellRepository = cellRepository;
            _rruRepository = rruRepository;
        }

        public int DumpNewCellExcels(IEnumerable<CellExcel> infos)
        {
            var cellList = Mapper.Map<IEnumerable<CellExcel>, List<Cell>>(infos);
            if (!cellList.Any()) return 0;
            var count = 0;
            foreach (var cell in cellList)
            {
                var item = _cellRepository.GetBySectorId(cell.ENodebId, cell.SectorId);
                if (item == null)
                {
                    if (_cellRepository.Insert(cell) != null) count++;
                }
                else
                {
                    item.Pci = cell.Pci;
                    item.IsInUse = true;
                    _cellRepository.Update(item);
                    count++;
                }
            }
            _cellRepository.SaveChanges();
            return count;
        }

        public void UpdateENodebBtsIds(IEnumerable<CellExcel> infos)
        {
            var idPairs =
                Mapper.Map<IEnumerable<CellExcel>, IEnumerable<ENodebBtsIdPair>>(infos)
                    .Where(x => x.BtsId != -1)
                    .Distinct()
                    .ToList();
            if (!idPairs.Any()) return;
            idPairs.ForEach(x =>
            {
                var bts = _btsRepository.GetByBtsId(x.BtsId);
                if (bts == null) return;
                bts.ENodebId = x.ENodebId;
                _btsRepository.Update(bts);
            });
        }

        public bool DumpSingleCellExcel(CellExcel info)
        {
            var cell = _cellRepository.GetBySectorId(info.ENodebId, info.SectorId);
            if (cell == null)
            {
                cell = Mapper.Map<CellExcel, Cell>(info);
                var fields = info.ShareCdmaInfo.GetSplittedFields('_');
                var btsId = (fields.Length > 2) ? fields[1].ConvertToInt(-1) : -1;
                if (btsId > 0)
                {
                    var bts = _btsRepository.GetByBtsId(btsId);
                    if (bts != null)
                    {
                        bts.ENodebId = info.ENodebId;
                        _btsRepository.Update(bts);
                    }
                }
                var result = _cellRepository.Insert(cell);
                if (result == null) return false;
                var item =
                    BasicImportService.CellExcels.FirstOrDefault(
                        x => x.ENodebId == info.ENodebId && x.SectorId == info.SectorId);
                if (item != null)
                {
                    BasicImportService.CellExcels.Remove(item);
                }
                _cellRepository.SaveChanges();
                return true;
            }
            cell.Pci = info.Pci;
            cell.IsInUse = true;
            _cellRepository.Update(cell);
            _cellRepository.SaveChanges();
            return true;
        }

        public void VanishCells(CellIdsContainer container)
        {
            foreach (
                var cell in
                    container.CellIdPairs.Select(
                        cellIdPair => _cellRepository.GetBySectorId(cellIdPair.CellId, cellIdPair.SectorId))
                        .Where(cell => cell != null))
            {
                cell.IsInUse = false;
                _cellRepository.Update(cell);
            }
            _cellRepository.SaveChanges();
        }

        public async Task<int> ImportRru(IEnumerable<CellExcel> infos)
        {
            var sectorInfos = from info in infos
                group info by new
                {
                    info.ENodebId,
                    info.LocalSectorId
                }
                into g
                let firstInfo = g.First()
                select new CellExcel
                {
                    ENodebId = g.Key.ENodebId,
                    LocalSectorId = g.Key.LocalSectorId,
                    RruName = firstInfo.RruName,
                    AntennaInfo = firstInfo.AntennaInfo,
                    AntennaFactoryString = firstInfo.AntennaFactoryString,
                    AntennaModel = firstInfo.AntennaModel,
                    CanBeETiltDescription = firstInfo.CanBeETiltDescription,
                    IsBeautifyDescription = firstInfo.IsBeautifyDescription,
                    IsCaDescription = firstInfo.IsCaDescription
                };
            int count = 0;
            foreach (var info in sectorInfos)
            {
                count += await _rruRepository.UpdateOne<ILteRruRepository, LteRru, CellExcel>(info);
            }
            return count;
        }

        public async Task<int> UpdateCells(IEnumerable<CellExcel> infos)
        {
            int count = 0;
            foreach (var info in infos)
            {
                count += await _cellRepository.UpdateOnly<ICellRepository, Cell, CellExcel>(info);
            }
            return count;
        } 
    }
}
