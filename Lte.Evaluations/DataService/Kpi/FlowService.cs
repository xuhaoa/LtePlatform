using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowService
    {
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly IRrcZteRepository _rrcZteRepository;
        private readonly IRrcHuaweiRepository _rrcHuaweiRepository;
        private readonly IQciZteRepository _qciZteRepository;
        private readonly IQciHuaweiRepository _qciHuaweiRepository;
        private readonly ITownFlowRepository _townFlowRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ITownRrcRepository _townRrcRepository;
        private readonly ITownQciRepository _townQciRepository;
        private readonly ICellRepository _cellRepository;
        private readonly IPrbHuaweiRepository _prbHuaweiRepository;
        private readonly IPrbZteRepository _prbZteRepository;
        private readonly ITownPrbRepository _townPrbRepository;

        private static Stack<Tuple<FlowHuawei, RrcHuawei, QciHuawei, PrbHuawei>> FlowHuaweis { get; set; }

        private static Stack<Tuple<FlowZte, RrcZte, QciZte, PrbZte>> FlowZtes { get; set; }

        public int FlowHuaweiCount => FlowHuaweis.Count;

        public int FlowZteCount => FlowZtes.Count;

        public FlowService(IFlowHuaweiRepository huaweiRepositroy, IFlowZteRepository zteRepository,
            IRrcZteRepository rrcZteRepository, IRrcHuaweiRepository rrcHuaweiRepository,
            IQciZteRepository qciZteRepository, IQciHuaweiRepository qciHuaweiRepository,
            ITownFlowRepository townFlowRepository, IENodebRepository eNodebRepository,
            ITownRrcRepository townRrcRepository, ITownQciRepository townQciRepository, 
            ICellRepository cellRepository, IPrbHuaweiRepository prbHuaweiRepository,
            IPrbZteRepository prbZteRepository, ITownPrbRepository townPrbRepository)
        {
            _huaweiRepository = huaweiRepositroy;
            _zteRepository = zteRepository;
            _rrcZteRepository = rrcZteRepository;
            _rrcHuaweiRepository = rrcHuaweiRepository;
            _qciZteRepository = qciZteRepository;
            _qciHuaweiRepository = qciHuaweiRepository;
            _townFlowRepository = townFlowRepository;
            _eNodebRepository = eNodebRepository;
            _townRrcRepository = townRrcRepository;
            _townQciRepository = townQciRepository;
            _cellRepository = cellRepository;
            _prbHuaweiRepository = prbHuaweiRepository;
            _prbZteRepository = prbZteRepository;
            _townPrbRepository = townPrbRepository;
            if (FlowHuaweis == null) FlowHuaweis = new Stack<Tuple<FlowHuawei, RrcHuawei, QciHuawei, PrbHuawei>>();
            if (FlowZtes == null) FlowZtes = new Stack<Tuple<FlowZte, RrcZte, QciZte, PrbZte>>();
        }

        public void UploadFlowHuaweis(StreamReader reader)
        {
            var originCsvs = FlowHuaweiCsv.ReadFlowHuaweiCsvs(reader);
            var mergedCsvs = (from item in originCsvs
                group item by new
                {
                    item.StatTime.Date,
                    item.CellInfo
                }
                into g
                select g.ArrayAggration(stat =>
                {
                    stat.StatTime = g.Key.Date;
                    stat.CellInfo = g.Key.CellInfo;
                })).ToList();
            foreach (var csv in mergedCsvs)
            {
                FlowHuaweis.Push(
                    new Tuple<FlowHuawei, RrcHuawei, QciHuawei, PrbHuawei>(Mapper.Map<FlowHuaweiCsv, FlowHuawei>(csv),
                        Mapper.Map<FlowHuaweiCsv, RrcHuawei>(csv), Mapper.Map<FlowHuaweiCsv, QciHuawei>(csv),
                        Mapper.Map<FlowHuaweiCsv, PrbHuawei>(csv)));
            }
        }

        public void UploadFlowZtes(StreamReader reader)
        {
            var csvs = FlowZteCsv.ReadFlowZteCsvs(reader);
            foreach (var csv in csvs)
            {
                FlowZtes.Push(new Tuple<FlowZte, RrcZte, QciZte, PrbZte>(Mapper.Map<FlowZteCsv, FlowZte>(csv),
                    Mapper.Map<FlowZteCsv, RrcZte>(csv), Mapper.Map<FlowZteCsv, QciZte>(csv),
                    Mapper.Map<FlowZteCsv, PrbZte>(csv)));
            }
        }

        public async Task<bool> DumpOneHuaweiStat()
        {
            var stat = FlowHuaweis.Pop();
            if (stat.Item1 != null)
            {
                await _huaweiRepository.ImportOneAsync(stat.Item1);
            }
            if (stat.Item2 != null)
            {
                await _rrcHuaweiRepository.ImportOneAsync(stat.Item2);
            }
            if (stat.Item3 != null)
            {
                await _qciHuaweiRepository.ImportOneAsync(stat.Item3);
            }
            if (stat.Item4 != null)
            {
                await _prbHuaweiRepository.ImportOneAsync(stat.Item4);
            }

            return true;
        }

        public async Task<bool> DumpOneZteStat()
        {
            var stat = FlowZtes.Pop();
            if (stat.Item1 != null)
            {
                await _zteRepository.ImportOneAsync(stat.Item1);
            }
            if (stat.Item2 != null)
            {
                await _rrcZteRepository.ImportOneAsync(stat.Item2);
            }
            if (stat.Item3 != null)
            {
                await _qciZteRepository.ImportOneAsync(stat.Item3);
            }
            if (stat.Item4 != null)
            {
                await _prbZteRepository.ImportOneAsync(stat.Item4);
            }

            return true;
        }

        public void ClearHuaweiStats()
        {
            FlowHuaweis.Clear();
        }

        public void ClearZteStats()
        {
            FlowZtes.Clear();
        }
        
        public async Task<IEnumerable<FlowHistory>> GetFlowHistories(DateTime begin, DateTime end)
        {
            var results = new List<FlowHistory>();
            while (begin < end.AddDays(1))
            {
                var beginDate = begin;
                var endDate = begin.AddDays(1);
                var huaweiItems = await _huaweiRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var huaweiRrcs =
                    await _rrcHuaweiRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var zteItems = await _zteRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var zteRrcs = await _rrcZteRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var townItems =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.All); ;
                var townItems2100 =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.Band2100);
                var townItems1800 =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.Band1800);
                var townItems800 =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.Band800VoLte);
                var townRrcs = await _townRrcRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var townQcis = await _townQciRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var townPrbs = await _townPrbRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                results.Add(new FlowHistory
                {
                    DateString = begin.ToShortDateString(),
                    HuaweiItems = huaweiItems,
                    HuaweiRrcs = huaweiRrcs,
                    ZteItems = zteItems,
                    ZteRrcs = zteRrcs,
                    TownStats = townItems,
                    TownStats2100 = townItems2100,
                    TownStats1800 = townItems1800,
                    TownStats800VoLte = townItems800,
                    TownRrcs = townRrcs,
                    TownQcis = townQcis,
                    TownPrbs = townPrbs
                });
                begin = begin.AddDays(1);
            }
            return results;
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

        private List<TownFlowStat> GetTownFlowStats(DateTime statDate,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownFlowStat>();
            var huaweiFlows = _huaweiRepository.GetAllList(statDate, end);
            var zteFlows = _zteRepository.GetAllList(statDate, end);
            if (frequency != FrequencyBandType.All)
            {
                var cells = GetCellsByBandType(frequency);
                huaweiFlows = (from f in huaweiFlows
                    join c in cells on new {f.ENodebId, f.LocalCellId} equals
                    new {c.ENodebId, LocalCellId = c.LocalSectorId}
                    select f).ToList();
                zteFlows = (from f in zteFlows
                    join c in cells on new {f.ENodebId, f.SectorId} equals
                    new {c.ENodebId, c.SectorId}
                    select f).ToList();
            }
            townStatList.AddRange(huaweiFlows.GetTownStats<FlowHuawei, TownFlowStat>(_eNodebRepository));
            townStatList.AddRange(zteFlows.GetTownStats<FlowZte, TownFlowStat>(_eNodebRepository));
            return townStatList;
        }

        private List<Cell> GetCellsByBandType(FrequencyBandType frequency)
        {
            List<Cell> cells;
            switch (frequency)
            {
                case FrequencyBandType.Band2100:
                    cells = _cellRepository.GetAllList(x => x.BandClass == 1);
                    break;
                case FrequencyBandType.Band1800:
                    cells = _cellRepository.GetAllList(x => x.BandClass == 3);
                    break;
                default:
                    cells = _cellRepository.GetAllList(x => x.BandClass == 5);
                    break;
            }
            return cells;
        }

        public IEnumerable<CellIdPair> QueryUnmatchedHuaweis(int townId, DateTime date)
        {
            var eNodebs = _eNodebRepository.GetAllList(x => x.TownId == townId);
            var cells = from cell in _cellRepository.GetAllList()
                        join eNodeb in eNodebs on cell.ENodebId equals eNodeb.ENodebId
                        select cell;
            var stats = _huaweiRepository.GetAllList(x => x.StatTime >= date);
            var townStats = from stat in stats
                join eNodeb in eNodebs on stat.ENodebId equals eNodeb.ENodebId
                select stat;
            return from stat in townStats
                join cell in cells on new {stat.ENodebId, stat.LocalCellId} equals
                new {cell.ENodebId, LocalCellId = cell.LocalSectorId}
                into match
                from m in match.DefaultIfEmpty()
                   where m == null
                select new CellIdPair
                {
                    CellId = stat.ENodebId,
                    SectorId = stat.LocalCellId
                };
        }

        private List<TownRrcStat> GetTownRrcStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownRrcStat>();
            var huaweiRrcs = _rrcHuaweiRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(huaweiRrcs.GetTownStats<RrcHuawei, TownRrcStat>(_eNodebRepository));
            var zteRrcs = _rrcZteRepository.GetAllList(x => x.StatTime >= statDate && x.StatTime < end);
            townStatList.AddRange(zteRrcs.GetTownStats<RrcZte,TownRrcStat>(_eNodebRepository));
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

        public IEnumerable<ENodebFlowView> GetENodebFlowViews(DateTime begin, DateTime end,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var eNodebStatList = new List<ENodebFlowView>();
            var huaweiFlows = _huaweiRepository.GetAllList(begin, end);
            var zteFlows = _zteRepository.GetAllList(begin, end);
            if (frequency != FrequencyBandType.All)
            {
                var cells = GetCellsByBandType(frequency);
                huaweiFlows = (from f in huaweiFlows
                               join c in cells on new { f.ENodebId, f.LocalCellId } equals
                               new { c.ENodebId, LocalCellId = c.LocalSectorId }
                               select f).ToList();
                zteFlows = (from f in zteFlows
                            join c in cells on new { f.ENodebId, f.SectorId } equals
                            new { c.ENodebId, c.SectorId }
                            select f).ToList();
            }
            eNodebStatList.AddRange(huaweiFlows.GetENodebStats<FlowHuawei, ENodebFlowView>(_eNodebRepository));
            eNodebStatList.AddRange(zteFlows.GetENodebStats<FlowZte, ENodebFlowView>(_eNodebRepository));
            return eNodebStatList.GetPositionMergeStats();
        }
    }

    public static class TownStatQueries
    {
        public static IEnumerable<TTownStat> GetTownStats<TStat, TTownStat>(this IEnumerable<TStat> stats,
            IENodebRepository eNodebRepository)
            where TStat : IENodebId
            where TTownStat : ITownId
        {
            var query = from stat in stats
                        join eNodeb in eNodebRepository.GetAllList() on stat.ENodebId equals eNodeb.ENodebId
                        select
                            new
                            {
                                Stat = stat,
                                eNodeb.TownId
                            };
            var townStats = query.Select(x =>
            {
                var townStat = Mapper.Map<TStat, TTownStat>(x.Stat);
                townStat.TownId = x.TownId;
                return townStat;
            });
            return townStats;
        }

        public static IEnumerable<TENodebStat> GetENodebStats<TStat, TENodebStat>(this IEnumerable<TStat> stats,
            IENodebRepository eNodebRepository)
            where TStat : IENodebId
            where TENodebStat : IENodebId, IGeoPoint<double>
        {
            var query = from stat in stats
                        join eNodeb in eNodebRepository.GetAllList() on stat.ENodebId equals eNodeb.ENodebId
                        select
                            new
                            {
                                Stat = stat,
                                eNodeb.Longtitute,
                                eNodeb.Lattitute
                            };
            var eNodebStats = query.Select(x =>
            {
                var eNodebStat = Mapper.Map<TStat, TENodebStat>(x.Stat);
                eNodebStat.Longtitute = x.Longtitute;
                eNodebStat.Lattitute = x.Lattitute;
                return eNodebStat;
            });
            return eNodebStats;
        }

        public static IEnumerable<TTownStat> GetPositionMergeStats<TTownStat>(this IEnumerable<TTownStat> townStats, DateTime statTime)
            where TTownStat : class, ITownId, IStatTime, new()
        {
            var mergeStats = from stat in townStats
                group stat by stat.TownId
                into g
                select new
                {
                    TownId = g.Key,
                    Value = g.ArraySum()
                };
            return mergeStats.Select(x =>
            {
                var stat = x.Value;
                stat.TownId = x.TownId;
                stat.StatTime = statTime;
                return stat;
            });
        }

        public static IEnumerable<ENodebFlowView> GetPositionMergeStats(this IEnumerable<ENodebFlowView> eNodebStats)
        {
            var mergeStats = from stat in eNodebStats
                group stat by new
                {
                    stat.Longtitute,
                    stat.Lattitute
                }
                into g
                select new
                {
                    g.Key.Longtitute,
                    g.Key.Lattitute,
                    Value = g.ArraySum()
                };
            return mergeStats.Select(x =>
            {
                var stat = x.Value;
                stat.Longtitute = x.Longtitute;
                stat.Lattitute = x.Lattitute;
                return stat;
            });
        }

    }
}

