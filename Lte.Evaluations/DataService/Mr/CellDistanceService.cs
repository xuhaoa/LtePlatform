using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Kpi;

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
            return totalList.Any() && rsrpList.Any()
                ? new List<double>
                {
                    (totalList.Sum(x => x.Distance0) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance0)/totalList.Sum(x => x.Distance0)) - 140,
                    (totalList.Sum(x => x.Distance1) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance1)/totalList.Sum(x => x.Distance1)) - 140,
                    (totalList.Sum(x => x.Distance2) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance2)/totalList.Sum(x => x.Distance2)) - 140,
                    (totalList.Sum(x => x.Distance3) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance3)/totalList.Sum(x => x.Distance3)) - 140,
                    (totalList.Sum(x => x.Distance4) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance4)/totalList.Sum(x => x.Distance4)) - 140,
                    (totalList.Sum(x => x.Distance5) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance5)/totalList.Sum(x => x.Distance5)) - 140,
                    (totalList.Sum(x => x.Distance6) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance6)/totalList.Sum(x => x.Distance6)) - 140,
                    (totalList.Sum(x => x.Distance7) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance7)/totalList.Sum(x => x.Distance7)) - 140,
                    (totalList.Sum(x => x.Distance8) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance8)/totalList.Sum(x => x.Distance8)) - 140,
                    (totalList.Sum(x => x.Distance9) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance9)/totalList.Sum(x => x.Distance9)) - 140,
                    (totalList.Sum(x => x.Distance10) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance10)/totalList.Sum(x => x.Distance10)) - 140,
                    (totalList.Sum(x => x.Distance11) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance11)/totalList.Sum(x => x.Distance11)) - 140,
                    (totalList.Sum(x => x.Distance12) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance12)/totalList.Sum(x => x.Distance12)) - 140,
                    (totalList.Sum(x => x.Distance13) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance13)/totalList.Sum(x => x.Distance13)) - 140,
                    (totalList.Sum(x => x.Distance14) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance14)/totalList.Sum(x => x.Distance14)) - 140,
                    (totalList.Sum(x => x.Distance15) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance15)/totalList.Sum(x => x.Distance15)) - 140,
                    (totalList.Sum(x => x.Distance16) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance16)/totalList.Sum(x => x.Distance16)) - 140,
                    (totalList.Sum(x => x.Distance17) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance17)/totalList.Sum(x => x.Distance17)) - 140,
                    (totalList.Sum(x => x.Distance18) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance18)/totalList.Sum(x => x.Distance18)) - 140,
                    (totalList.Sum(x => x.Distance19) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance19)/totalList.Sum(x => x.Distance19)) - 140,
                    (totalList.Sum(x => x.Distance20) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance20)/totalList.Sum(x => x.Distance20)) - 140,
                    (totalList.Sum(x => x.Distance21) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance21)/totalList.Sum(x => x.Distance21)) - 140,
                    (totalList.Sum(x => x.Distance22) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance22)/totalList.Sum(x => x.Distance22)) - 140,
                    (totalList.Sum(x => x.Distance23) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance23)/totalList.Sum(x => x.Distance23)) - 140,
                    (totalList.Sum(x => x.Distance24) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance24)/totalList.Sum(x => x.Distance24)) - 140,
                    (totalList.Sum(x => x.Distance25) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance25)/totalList.Sum(x => x.Distance25)) - 140,
                    (totalList.Sum(x => x.Distance26) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance26)/totalList.Sum(x => x.Distance26)) - 140,
                    (totalList.Sum(x => x.Distance27) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance27)/totalList.Sum(x => x.Distance27)) - 140,
                    (totalList.Sum(x => x.Distance28) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance28)/totalList.Sum(x => x.Distance28)) - 140,
                    (totalList.Sum(x => x.Distance29) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance29)/totalList.Sum(x => x.Distance29)) - 140,
                    (totalList.Sum(x => x.Distance30) == 0
                        ? 0
                        : rsrpList.Sum(x => x.Distance30)/totalList.Sum(x => x.Distance30)) - 140
                }
                : null;
        }
    }
}
