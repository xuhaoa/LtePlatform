using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Mr;

namespace Lte.Evaluations.DataService.Mr
{
    public class CellDistanceService
    {
        private readonly ICellDistanceRepository _repository;
        private readonly ICellRepository _cellRepository;

        public CellDistanceService(ICellDistanceRepository repository, ICellRepository cellRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
        }

        public List<double> QueryAverageRsrpTaStatList(int eNodebId, byte sectorId, DateTime date)
        {
            var cell = _cellRepository.GetBySectorId(eNodebId, sectorId);
            var pci = cell?.Pci ?? 0;
            var totalList = _repository.GetTotalList(eNodebId, pci, date);
            var rsrpList = _repository.GetRsrpList(eNodebId, pci, date);
            if (!(totalList.Any() && rsrpList.Any())) return null;
            return QueryAverageRsrp(totalList, rsrpList);
        }

        public static List<double> QueryAverageRsrp(List<CellDistance> totalList, List<CellDistance> rsrpList)
        {
            var result = new List<double>();
            var properties = (typeof (CellDistance)).GetProperties();
            for (var i = 0; i < 31; i++)
            {
                var property = properties.FirstOrDefault(p => p.Name == "Distance" + i);
                if (property == null) continue;
                var total = totalList.Sum(x => (int) property.GetValue(x));
                result.Add(total == 0 ? -140 : rsrpList.Sum(x => (int) property.GetValue(x))/(double)total - 140);
            }
            return result;
        }

        public List<double> QueryAbove110TaRateList(int eNodebId, byte sectorId, DateTime date)
        {
            var cell = _cellRepository.GetBySectorId(eNodebId, sectorId);
            var pci = cell?.Pci ?? 0;
            var totalList = _repository.GetTotalList(eNodebId, pci, date);
            var above110List = _repository.Get110List(eNodebId, pci, date);
            if (!(totalList.Any() && above110List.Any())) return null;
            return QueryTaRate(totalList, above110List);
        }

        private static List<double> QueryTaRate(List<CellDistance> totalList, List<CellDistance> aboveList)
        {
            var result = new List<double>();
            var properties = (typeof (CellDistance)).GetProperties();
            for (var i = 0; i < 31; i++)
            {
                var property = properties.FirstOrDefault(p => p.Name == "Distance" + i);
                if (property == null) continue;
                var total = totalList.Sum(x => (int) property.GetValue(x));
                result.Add(total == 0 ? 0 : aboveList.Sum(x => (int) property.GetValue(x))/(double) total*100);
            }
            return result;
        }

        public List<double> QueryAbove105TaRateList(int eNodebId, byte sectorId, DateTime date)
        {
            var cell = _cellRepository.GetBySectorId(eNodebId, sectorId);
            var pci = cell?.Pci ?? 0;
            var totalList = _repository.GetTotalList(eNodebId, pci, date);
            var above105List = _repository.Get105List(eNodebId, pci, date);
            if (!(totalList.Any() && above105List.Any())) return null;
            return QueryTaRate(totalList, above105List);
        }
    }
}
