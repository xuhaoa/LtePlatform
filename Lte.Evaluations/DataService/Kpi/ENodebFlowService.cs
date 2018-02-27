using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class ENodebFlowService
    {
        private readonly BandCellService _cellService;
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IRrcHuaweiRepository _rrcHuaweiRepository;
        private readonly IRrcZteRepository _rrcZteRepository;
        private readonly IQciZteRepository _qciZteRepository;
        private readonly IQciHuaweiRepository _qciHuaweiRepository;
        private readonly IPrbHuaweiRepository _prbHuaweiRepository;
        private readonly IPrbZteRepository _prbZteRepository;
        private readonly ITownFlowRepository _townFlowRepository;
        private readonly ITownRrcRepository _townRrcRepository;
        private readonly ITownQciRepository _townQciRepository;
        private readonly ITownPrbRepository _townPrbRepository;

        public ENodebFlowService(BandCellService cellService, IENodebRepository eNodebRepository,
            IFlowHuaweiRepository huaweiRepositroy, IFlowZteRepository zteRepository, 
            IRrcHuaweiRepository rrcHuaweiRepository, IRrcZteRepository rrcZteRepository,
            IQciZteRepository qciZteRepository, IQciHuaweiRepository qciHuaweiRepository,
            IPrbZteRepository prbZteRepository, IPrbHuaweiRepository prbHuaweiRepository,
            ITownFlowRepository townFlowRepository, ITownPrbRepository townPrbRepository,
            ITownRrcRepository townRrcRepository, ITownQciRepository townQciRepository)
        {
            _cellService = cellService;
            _eNodebRepository = eNodebRepository;
            _huaweiRepository = huaweiRepositroy;
            _zteRepository = zteRepository;
            _rrcHuaweiRepository = rrcHuaweiRepository;
            _rrcZteRepository = rrcZteRepository;
            _qciZteRepository = qciZteRepository;
            _qciHuaweiRepository = qciHuaweiRepository;
            _prbHuaweiRepository = prbHuaweiRepository;
            _prbZteRepository = prbZteRepository;
            _townFlowRepository = townFlowRepository;
            _townRrcRepository = townRrcRepository;
            _townQciRepository = townQciRepository;
            _townPrbRepository = townPrbRepository;
        }

        public IEnumerable<ENodebFlowView> GetENodebFlowViews(DateTime begin, DateTime end,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var eNodebStatList = new List<ENodebFlowView>();
            var huaweiFlows = _huaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end);
            var zteFlows = QueryZteFlows(frequency, begin, end);
            if (frequency != FrequencyBandType.All)
            {
                var cells = _cellService.GetHuaweiCellsByBandType(frequency);
                huaweiFlows = (from f in huaweiFlows
                               join c in cells on new { f.ENodebId, f.LocalCellId } equals
                               new { c.ENodebId, LocalCellId = c.LocalSectorId }
                               select f).ToList();
            }
            var eNodebs = _eNodebRepository.GetAllList();
            eNodebStatList.AddRange(
                huaweiFlows.GetENodebStats<FlowHuawei, ENodebFlowView>(eNodebs));
            eNodebStatList.AddRange(zteFlows.GetENodebStats<FlowZte, ENodebFlowView>(eNodebs));
            return eNodebStatList.GetPositionMergeStats();
        }

        private List<FlowZte> QueryZteFlows(FrequencyBandType frequency, DateTime begin, DateTime end)
        {
            switch (frequency)
            {
                case FrequencyBandType.All:
                    return _zteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end);
                case FrequencyBandType.Band2100:
                    return
                        _zteRepository.GetAllList(
                            x => x.StatTime >= begin && x.StatTime < end && x.SectorId < 16);
                case FrequencyBandType.Band1800:
                    return
                        _zteRepository.GetAllList(
                            x => x.StatTime >= begin && x.StatTime < end && x.SectorId >= 48 && x.SectorId < 64);
                default:
                    return
                        _zteRepository.GetAllList(
                            x => x.StatTime >= begin && x.StatTime < end && x.SectorId >= 16 && x.SectorId < 32);
            }
        }

        private List<TownFlowStat> GetTownFlowStats(DateTime statDate,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownFlowStat>();
            var huaweiFlows = _huaweiRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            var zteFlows = QueryZteFlows(frequency, statDate, end);
            if (frequency != FrequencyBandType.All)
            {
                var cells = _cellService.GetHuaweiCellsByBandType(frequency);
                huaweiFlows = (from f in huaweiFlows
                               join c in cells on new { f.ENodebId, f.LocalCellId } equals
                               new { c.ENodebId, LocalCellId = c.LocalSectorId }
                               select f).ToList();
            }
            townStatList.AddRange(huaweiFlows.GetTownStats<FlowHuawei, TownFlowStat>(_eNodebRepository));
            townStatList.AddRange(zteFlows.GetTownStats<FlowZte, TownFlowStat>(_eNodebRepository));
            return townStatList;
        }

        private List<TownRrcStat> GetTownRrcStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownRrcStat>();
            var huaweiRrcs = _rrcHuaweiRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(huaweiRrcs.GetTownStats<RrcHuawei, TownRrcStat>(_eNodebRepository));
            var zteRrcs = _rrcZteRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(zteRrcs.GetTownStats<RrcZte, TownRrcStat>(_eNodebRepository));
            return townStatList;
        }

        private List<TownQciStat> GetTownQciStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownQciStat>();
            var huaweiQcis = _qciHuaweiRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(huaweiQcis.GetTownStats<QciHuawei, TownQciStat>(_eNodebRepository));
            var zteQcis = _qciZteRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(zteQcis.GetTownStats<QciZte, TownQciStat>(_eNodebRepository));
            return townStatList;
        }

        private List<TownPrbStat> GetTownPrbStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownPrbStat>();
            var huaweiPrbs = _prbHuaweiRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(huaweiPrbs.GetTownStats<PrbHuawei, TownPrbStat>(_eNodebRepository));
            var ztePrbs = _prbZteRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(ztePrbs.GetTownStats<PrbZte, TownPrbStat>(_eNodebRepository));
            return townStatList;
        }

        public async Task<Tuple<int, int, int, int, int, int, int>> GenerateTownStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var item1 =
                _townFlowRepository.Count(
                    x => x.StatTime >= statDate && x.StatTime < end && x.FrequencyBandType == FrequencyBandType.All);
            if (item1 == 0)
            {
                var townStatList = GetTownFlowStats(statDate);
                foreach (var stat in townStatList.GetPositionMergeStats(statDate))
                {
                    await _townFlowRepository.InsertAsync(stat);
                }
                item1 = _townFlowRepository.SaveChanges();
            }
            var item2 = _townRrcRepository.Count(x => x.StatTime >= statDate && x.StatTime < end);
            if (item2 == 0)
            {
                var townRrcList = GetTownRrcStats(statDate);
                foreach (var stat in townRrcList.GetPositionMergeStats(statDate))
                {
                    await _townRrcRepository.InsertAsync(stat);
                }
                item2 = _townRrcRepository.SaveChanges();
            }
            var item3 =
                _townFlowRepository.Count(
                    x => x.StatTime >= statDate && x.StatTime < end && x.FrequencyBandType == FrequencyBandType.Band2100);
            if (item3 == 0)
            {
                var townStatList = GetTownFlowStats(statDate, FrequencyBandType.Band2100);
                foreach (var stat in townStatList.GetPositionMergeStats(statDate))
                {
                    stat.FrequencyBandType = FrequencyBandType.Band2100;
                    await _townFlowRepository.InsertAsync(stat);
                }
                item3 = _townFlowRepository.SaveChanges();
            }
            var item4 =
                _townFlowRepository.Count(
                    x => x.StatTime >= statDate && x.StatTime < end && x.FrequencyBandType == FrequencyBandType.Band1800);
            if (item4 == 0)
            {
                var townStatList = GetTownFlowStats(statDate, FrequencyBandType.Band1800);
                foreach (var stat in townStatList.GetPositionMergeStats(statDate))
                {
                    stat.FrequencyBandType = FrequencyBandType.Band1800;
                    await _townFlowRepository.InsertAsync(stat);
                }
                item4 = _townFlowRepository.SaveChanges();
            }
            var item5 =
                _townFlowRepository.Count(
                    x => x.StatTime >= statDate && x.StatTime < end && x.FrequencyBandType == FrequencyBandType.Band800VoLte);
            if (item5 == 0)
            {
                var townStatList = GetTownFlowStats(statDate, FrequencyBandType.Band800VoLte);
                foreach (var stat in townStatList.GetPositionMergeStats(statDate))
                {
                    stat.FrequencyBandType = FrequencyBandType.Band800VoLte;
                    await _townFlowRepository.InsertAsync(stat);
                }
                item5 = _townFlowRepository.SaveChanges();
            }
            var item6 = _townQciRepository.Count(x => x.StatTime >= statDate && x.StatTime < end);
            if (item6 == 0)
            {
                var townQciList = GetTownQciStats(statDate);
                foreach (var stat in townQciList.GetPositionMergeStats(statDate))
                {
                    await _townQciRepository.InsertAsync(stat);
                }
                item6 = _townQciRepository.SaveChanges();
            }
            var item7 = _townPrbRepository.Count(x => x.StatTime >= statDate && x.StatTime < end);
            if (item7 == 0)
            {
                var townPrbList = GetTownPrbStats(statDate);
                foreach (var stat in townPrbList.GetPositionMergeStats(statDate))
                {
                    await _townPrbRepository.InsertAsync(stat);
                }
                item7 = _townPrbRepository.SaveChanges();
            }
            return new Tuple<int, int, int, int, int, int, int>(item1, item2, item3, item4, item5, item6, item7);
        }

    }
}
