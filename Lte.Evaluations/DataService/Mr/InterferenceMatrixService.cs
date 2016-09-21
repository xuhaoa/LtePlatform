using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Mr;

namespace Lte.Evaluations.DataService.Mr
{
    public class InterferenceMatrixService
    {
        private readonly IInterferenceMatrixRepository _repository;
        private readonly IInterferenceMongoRepository _mongoRepository;

        private static Stack<InterferenceMatrixStat> InterferenceMatrixStats { get; set; }

        public static List<PciCell> PciCellList { get; private set; }
        
        public InterferenceMatrixService(IInterferenceMatrixRepository repository, ICellRepository cellRepository,
            IInfrastructureRepository infrastructureRepository, IInterferenceMongoRepository mongoRepository)
        {
            _repository = repository;
            _mongoRepository = mongoRepository;
            if (InterferenceMatrixStats == null)
                InterferenceMatrixStats = new Stack<InterferenceMatrixStat>();
            if (PciCellList == null)
            {
                var cells = from cell in cellRepository.GetAllList()
                    join moinitor in infrastructureRepository.GetAllPreciseMonitor() on cell.Id equals
                        moinitor.InfrastructureId
                    select cell;
                PciCellList = cells.MapTo<List<PciCell>>();
            }
        }

        public int QueryExistedStatsCount(int eNodebId, byte sectorId, DateTime date)
        {
            var beginDay = date.Date;
            var nextDay = date.AddDays(1).Date;
            return _repository.Count(x =>
                    x.ENodebId == eNodebId && x.SectorId == sectorId && x.StatTime >= beginDay &&
                    x.StatTime < nextDay);
        }
        
        public int DumpMongoStats(InterferenceMatrixStat stat)
        {
            stat.StatTime = stat.StatTime.Date;
            var existedStat =
                _repository.FirstOrDefault(
                    x =>
                        x.ENodebId == stat.ENodebId && x.SectorId == stat.SectorId
                        && x.NeighborPci == stat.NeighborPci && x.StatTime == stat.StatTime);
            if (existedStat == null)
                _repository.Insert(stat);

            return _repository.SaveChanges();
        }
        
        public void TestDumpOneStat(int eNodebId, byte sectorId, DateTime date, double interference)
        {
            _repository.Insert(new InterferenceMatrixStat
            {
                CellId = eNodebId+"-"+sectorId,
                StatTime = date,
                RsrpBetween10090 = (int)interference
            });
            _repository.SaveChanges();
        }

        public InterferenceMatrixMongo QueryMongo(int eNodebId, short pci)
        {
            return _mongoRepository.GetOne(eNodebId, pci);
        }
        
        public async Task<List<InterferenceMatrixMongo>> QueryMongoList(int eNodebId, short pci, DateTime date)
        {
            var cellList = await _mongoRepository.GetListAsync(eNodebId, pci, date);
            return cellList;
        }

        public async Task<List<InterferenceMatrixStat>> QueryStats(int eNodebId, short pci, DateTime time)
        {
            var statList = await _mongoRepository.GetListAsync(eNodebId, pci, time);
            return !statList.Any() ? new List<InterferenceMatrixStat>() : GenereateStatList(time, statList);
        }

        public InterferenceMatrixStat QueryStat(int eNodebId, short pci, short neighborPci, DateTime time)
        {
            var statList = _mongoRepository.GetList(eNodebId, pci, neighborPci, time);
            if (!statList.Any()) return null;
            return statList.ArraySum().MapTo<InterferenceMatrixStat>();
        }

        public async Task<List<InterferenceMatrixStat>> QueryStats(int eNodebId, short pci)
        {
            var stats = await _mongoRepository.GetListAsync(eNodebId, pci);
            return !stats.Any() ? new List<InterferenceMatrixStat>() : GenereateStatList(stats);
        }

        private static List<InterferenceMatrixStat> GenereateStatList(DateTime time, IEnumerable<InterferenceMatrixMongo> statList)
        {
            var results = Mapper.Map<IEnumerable<InterferenceMatrixMongo>, IEnumerable<InterferenceMatrixStat>>(statList);
            return (from s in results
                group s by new {s.NeighborPci, s.ENodebId}
                into g
                select g.Select(x=>x).ArraySum()).ToList();
        }

        private static List<InterferenceMatrixStat> GenereateStatList(List<InterferenceMatrixMongo> statList)
        {
            var results = Mapper.Map<List<InterferenceMatrixMongo>, IEnumerable<InterferenceMatrixStat>>(statList);
            return (from s in results
                    group s by new { s.NeighborPci, s.ENodebId, RecordDate = s.StatTime.Date }
                into g
                    select g.Select(x => x).ArraySum()).ToList();
        }

        public async Task<bool> DumpOneStat()
        {
            var stat = InterferenceMatrixStats.Pop();
            if (stat == null) return false;
            var item =
                _repository.FirstOrDefault(
                    x =>
                        x.ENodebId == stat.ENodebId && x.SectorId == stat.SectorId && x.NeighborPci == stat.NeighborPci &&
                        x.StatTime == stat.StatTime);
            if (item == null)
            {
                await _repository.InsertAsync(stat);
            }
            _repository.SaveChanges();
            return true;
        }
        
        public int GetStatsToBeDump()
        {
            return InterferenceMatrixStats.Count;
        }

        public void ClearStats()
        {
            InterferenceMatrixStats.Clear();
        }
    }
    
}
