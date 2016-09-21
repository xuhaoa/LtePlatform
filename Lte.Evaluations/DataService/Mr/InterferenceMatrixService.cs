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

        private static Stack<InterferenceMatrixStat> InterferenceMatrixStats { get; set; }

        public static List<PciCell> PciCellList { get; private set; }
        
        public InterferenceMatrixService(IInterferenceMatrixRepository repository, ICellRepository cellRepository,
            IInfrastructureRepository infrastructureRepository)
        {
            _repository = repository;
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
            var cellId = eNodebId + "-" + sectorId;
            return _repository.Count(x =>
                    x.CellId == cellId && x.StatTime >= beginDay && x.StatTime < nextDay);
        }
        
        public int DumpMongoStats(InterferenceMatrixStat stat)
        {
            stat.StatTime = stat.StatTime.Date;
            var cellId = stat.ENodebId + "-" + stat.SectorId;
            var existedStat =
                _repository.FirstOrDefault(
                    x => x.CellId == cellId && x.NeighborPci == stat.NeighborPci && x.StatTime == stat.StatTime);
            if (existedStat == null)
                _repository.Insert(stat);

            return _repository.SaveChanges();
        }
        
        public async Task<bool> DumpOneStat()
        {
            var stat = InterferenceMatrixStats.Pop();
            if (stat == null) return false;
            var cellId = stat.ENodebId + "-" + stat.SectorId;
            var item =
                _repository.FirstOrDefault(
                    x => x.CellId == cellId && x.NeighborPci == stat.NeighborPci && x.StatTime == stat.StatTime);
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

    public class InterferenceMongoService
    {
        private readonly IInterferenceMongoRepository _mongoRepository;

        public InterferenceMongoService(IInterferenceMongoRepository mongoRepository)
        {
            _mongoRepository = mongoRepository;
        }

        public InterferenceMatrixMongo QueryMongo(int eNodebId, byte sectorId)
        {
            return _mongoRepository.GetOne(eNodebId + "-" + sectorId);
        }

        private static List<InterferenceMatrixStat> GenereateOverallStatList(IEnumerable<InterferenceMatrixMongo> statList)
        {
            var results = Mapper.Map<IEnumerable<InterferenceMatrixMongo>, IEnumerable<InterferenceMatrixStat>>(statList);
            return (from s in results
                group s by new { s.NeighborPci, s.ENodebId }
                into g
                select g.Select(x => x).ArraySum()).ToList();
        }

        private static List<InterferenceMatrixStat> GenereateStatList(List<InterferenceMatrixMongo> statList)
        {
            var results = Mapper.Map<List<InterferenceMatrixMongo>, IEnumerable<InterferenceMatrixStat>>(statList);
            return (from s in results
                group s by new { s.NeighborPci, s.ENodebId, RecordDate = s.StatTime.Date }
                into g
                select g.Select(x => x).ArraySum()).ToList();
        }

        public async Task<List<InterferenceMatrixMongo>> QueryMongoList(int eNodebId, byte sectorId, DateTime date)
        {
            var cellList = await _mongoRepository.GetListAsync(eNodebId + "-" + sectorId, date);
            return cellList;
        }

        public async Task<List<InterferenceMatrixStat>> QueryStats(int eNodebId, byte sectorId, DateTime time)
        {
            var statList = await _mongoRepository.GetListAsync(eNodebId + "-" + sectorId, time);
            return !statList.Any() ? new List<InterferenceMatrixStat>() : GenereateOverallStatList(statList);
        }

        public InterferenceMatrixStat QueryStat(int eNodebId, byte sectorId, short neighborPci, DateTime time)
        {
            var statList = _mongoRepository.GetList(eNodebId + "-" + sectorId, neighborPci, time);
            if (!statList.Any()) return null;
            return statList.ArraySum().MapTo<InterferenceMatrixStat>();
        }

        public async Task<List<InterferenceMatrixStat>> QueryStats(int eNodebId, byte sectorId)
        {
            var stats = await _mongoRepository.GetListAsync(eNodebId + "-" + sectorId);
            return !stats.Any() ? new List<InterferenceMatrixStat>() : GenereateStatList(stats);
        }
    }
}
