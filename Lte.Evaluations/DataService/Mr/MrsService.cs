using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.DataService.Mr
{
    public class MrsService
    {
        private readonly IMrsPhrRepository _phrRepository;
        private readonly IMrsTadvRsrpRepository _tadvRsrpRepository;
        private readonly IMrsRsrpRepository _rsrpRepository;
        private readonly IMrsSinrUlRepository _sinrUlRepository;
        private readonly IMrsTadvRepository _tadvRepository;

        public MrsService(IMrsPhrRepository phrRepository, IMrsTadvRsrpRepository tadvRsrpRepository,
            IMrsRsrpRepository rsrpRepository, IMrsSinrUlRepository sinrUlRepository, IMrsTadvRepository tadvRepository)
        {
            _phrRepository = phrRepository;
            _tadvRsrpRepository = tadvRsrpRepository;
            _rsrpRepository = rsrpRepository;
            _sinrUlRepository = sinrUlRepository;
            _tadvRepository = tadvRepository;
        }

        public MrsPhrStat QueryPhrStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _phrRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public MrsTadvRsrpStat QueryTadvRsrpStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _tadvRsrpRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public MrsRsrpStat QueryRsrpStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _rsrpRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public MrsSinrUlStat QuerySinrUlStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _sinrUlRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public MrsTadvStat QueryTadvStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _tadvRepository.Get(eNodebId + "-" + sectorId, statDate);
        }
    }
}
