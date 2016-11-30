using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;

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

        public IEnumerable<MrsPhrStat> QueryPhrStats(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _phrRepository.GetList(eNodebId + "-" + sectorId, begin, end);
        } 

        public MrsTadvRsrpStat QueryTadvRsrpStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _tadvRsrpRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public IEnumerable<MrsTadvRsrpStat> QueryTadvRsrpStats(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _tadvRsrpRepository.GetList(eNodebId + "-" + sectorId, begin, end);
        }

        public MrsRsrpStat QueryRsrpStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _rsrpRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public IEnumerable<MrsRsrpStat> QueryRsrpStats(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _rsrpRepository.GetList(eNodebId + "-" + sectorId, begin, end);
        }

        public MrsSinrUlStat QuerySinrUlStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _sinrUlRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public IEnumerable<MrsSinrUlStat> QuerySinrUlStats(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _sinrUlRepository.GetList(eNodebId + "-" + sectorId, begin, end);
        }

        public MrsTadvStat QueryTadvStat(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _tadvRepository.Get(eNodebId + "-" + sectorId, statDate);
        }

        public IEnumerable<MrsTadvStat> QueryTadvStats(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _tadvRepository.GetList(eNodebId + "-" + sectorId, begin, end);
        }

    }
}
