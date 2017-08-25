using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;
using Lte.Evaluations.ViewModels;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.Dependency;
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
        private readonly ITownFlowRepository _townFlowRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ITownRrcRepository _townRrcRepository;
        private readonly ICellRepository _cellRepository;

        private static Stack<Tuple<FlowHuawei, RrcHuawei>> FlowHuaweis { get; set; }

        private static Stack<Tuple<FlowZte, RrcZte>> FlowZtes { get; set; }

        public int FlowHuaweiCount => FlowHuaweis.Count;

        public int FlowZteCount => FlowZtes.Count;

        public FlowService(IFlowHuaweiRepository huaweiRepositroy, IFlowZteRepository zteRepository,
            IRrcZteRepository rrcZteRepository, IRrcHuaweiRepository rrcHuaweiRepository,
            ITownFlowRepository townFlowRepository, IENodebRepository eNodebRepository,
            ITownRrcRepository townRrcRepository, ICellRepository cellRepository)
        {
            _huaweiRepository = huaweiRepositroy;
            _zteRepository = zteRepository;
            _rrcZteRepository = rrcZteRepository;
            _rrcHuaweiRepository = rrcHuaweiRepository;
            _townFlowRepository = townFlowRepository;
            _eNodebRepository = eNodebRepository;
            _townRrcRepository = townRrcRepository;
            _cellRepository = cellRepository;
            if (FlowHuaweis == null) FlowHuaweis = new Stack<Tuple<FlowHuawei, RrcHuawei>>();
            if (FlowZtes == null) FlowZtes = new Stack<Tuple<FlowZte, RrcZte>>();
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
                select new FlowHuaweiCsv
                {
                    StatTime = g.Key.Date,
                    AverageActiveUsers = g.Average(x => x.AverageActiveUsers),
                    AverageUsers = g.Average(x => x.AverageUsers),
                    ButLastDownlinkDurationInMs = g.Sum(x => x.ButLastDownlinkDurationInMs),
                    ButLastUplinkDurationInMs = g.Sum(x => x.ButLastUplinkDurationInMs),
                    CellInfo = g.Key.CellInfo,
                    DedicatedPreambles = g.Sum(x => x.DedicatedPreambles),
                    DownlinkAveragePrbs = g.Average(x => x.DownlinkAveragePrbs),
                    DownlinkAverageUsers = g.Average(x => x.DownlinkAverageUsers),
                    DownlinkDciCces = g.Sum(x => x.DownlinkDciCces),
                    DownlinkDrbPbs = g.Average(x => x.DownlinkDrbPbs),
                    DownlinkDurationInMs = g.Sum(x => x.DownlinkDurationInMs),
                    DownlinkMaxUsers = g.Max(x => x.DownlinkMaxUsers),
                    GroupAPreambles = g.Sum(x => x.GroupAPreambles),
                    GroupBPreambles = g.Sum(x => x.GroupBPreambles),
                    LastTtiDownlinkFlowInByte = g.Sum(x => x.LastTtiDownlinkFlowInByte),
                    LastTtiUplinkFlowInByte = g.Sum(x => x.LastTtiUplinkFlowInByte),
                    MaxActiveUsers = g.Max(x => x.MaxActiveUsers),
                    MaxUsers = g.Max(x => x.MaxUsers),
                    PagingUsersString = g.First().PagingUsersString,
                    PdcpDownlinkFlowInByte = g.Sum(x => x.PdcpDownlinkFlowInByte),
                    PdcpUplinkFlowInByte = g.Sum(x => x.PdcpUplinkFlowInByte),
                    PucchPrbsString = g.Sum(x => x.PucchPrbsString.ConvertToInt(0)).ToString(),
                    TotalCces = g.Sum(x => x.TotalCces),
                    UplinkAveragePrbs = g.Average(x => x.UplinkAveragePrbs),
                    UplinkAverageUsers = g.Average(x => x.UplinkAverageUsers),
                    UplinkDciCces = g.Sum(x => x.UplinkDciCces),
                    UplinkDrbPbs = g.Sum(x => x.UplinkDrbPbs),
                    UplinkDurationInMs = g.Sum(x => x.UplinkDurationInMs),
                    UplinkMaxUsers = g.Max(x => x.UplinkMaxUsers),
                    SchedulingRank1String = g.Sum(x => x.SchedulingRank1String.ConvertToInt(0)).ToString(),
                    SchedulingRank2String = g.Sum(x => x.SchedulingRank2String.ConvertToInt(0)).ToString(),
                    RedirectCdma2000 = g.Sum(x => x.RedirectCdma2000),
                    RrcFailOtherResource = g.Sum(x => x.RrcFailOtherResource),
                    RrcFailPucchAssignment = g.Sum(x => x.RrcFailPucchAssignment),
                    RrcFailResourceAssignment = g.Sum(x => x.RrcFailResourceAssignment),
                    RrcFailSrsAssignment = g.Sum(x => x.RrcFailSrsAssignment),
                    RrcFailUeNoAnswer = g.Sum(x => x.RrcFailUeNoAnswer),
                    RrcFailUserLimit = g.Sum(x => x.RrcFailUserLimit),
                    RrcReconstructionLostFlowControl = g.Sum(x => x.RrcReconstructionLostFlowControl),
                    RrcRejectFail = g.Sum(x => x.RrcRejectFail),
                    RrcRejectFlowControl = g.Sum(x => x.RrcRejectFlowControl),
                    RrcRejectOverload = g.Sum(x => x.RrcRejectOverload),
                    RrcRequestLostFlowControl = g.Sum(x => x.RrcRequestLostFlowControl),
                    EmergencyRrcRequest = g.Sum(x => x.EmergencyRrcRequest),
                    EmergencyRrcRequestAll = g.Sum(x => x.EmergencyRrcRequestAll),
                    EmergencyRrcSuccess = g.Sum(x => x.EmergencyRrcSuccess),
                    MoDataRrcRequest = g.Sum(x => x.MoDataRrcRequest),
                    MoDataRrcRequestAll = g.Sum(x => x.MoDataRrcRequestAll),
                    MoDataRrcSuccess = g.Sum(x => x.MoDataRrcSuccess),
                    MoSignallingRrcRequest = g.Sum(x => x.MoSignallingRrcRequest),
                    MoSignallingRrcRequestAll = g.Sum(x => x.MoSignallingRrcRequestAll),
                    MoSignallingRrcSuccess = g.Sum(x => x.MoSignallingRrcSuccess),
                    MtAccessRrcRequest = g.Sum(x => x.MtAccessRrcRequest),
                    MtAccessRrcRequestAll = g.Sum(x => x.MtAccessRrcRequestAll),
                    MtAccessRrcSuccess = g.Sum(x => x.MtAccessRrcSuccess),
                    HighPriorityRrcRequest = g.Sum(x => x.HighPriorityRrcRequest),
                    HighPriorityRrcRequestAll = g.Sum(x => x.HighPriorityRrcRequestAll),
                    HighPriorityRrcSuccess = g.Sum(x => x.HighPriorityRrcSuccess)
                }).ToList();
            foreach (var csv in mergedCsvs)
            {
                FlowHuaweis.Push(new Tuple<FlowHuawei, RrcHuawei>(Mapper.Map<FlowHuaweiCsv, FlowHuawei>(csv),
                    Mapper.Map<FlowHuaweiCsv, RrcHuawei>(csv)));
            }
        }

        public void UploadFlowZtes(StreamReader reader)
        {
            var csvs = FlowZteCsv.ReadFlowZteCsvs(reader);
            foreach (var csv in csvs)
            {
                FlowZtes.Push(new Tuple<FlowZte, RrcZte>(Mapper.Map<FlowZteCsv, FlowZte>(csv),
                    Mapper.Map<FlowZteCsv, RrcZte>(csv)));
            }
        }

        public async Task<bool> DumpOneHuaweiStat()
        {
            var stat = FlowHuaweis.Pop();
            if (stat.Item1 != null)
            {
                var item =
                    await
                        _huaweiRepository.FirstOrDefaultAsync(
                            x =>
                                x.StatTime == stat.Item1.StatTime && x.ENodebId == stat.Item1.ENodebId &&
                                x.LocalCellId == stat.Item1.LocalCellId);
                if (item == null)
                {
                    await _huaweiRepository.InsertAsync(stat.Item1);
                    _huaweiRepository.SaveChanges();
                }
            }
            if (stat.Item2 != null)
            {
                var item =
                    await
                        _rrcHuaweiRepository.FirstOrDefaultAsync(
                            x =>
                                x.StatTime == stat.Item2.StatTime && x.ENodebId == stat.Item2.ENodebId &&
                                x.LocalCellId == stat.Item2.LocalCellId);
                if (item == null)
                {
                    await _rrcHuaweiRepository.InsertAsync(stat.Item2);
                    _rrcHuaweiRepository.SaveChanges();
                }
            }

            return true;
        }

        public async Task<bool> DumpOneZteStat()
        {
            var stat = FlowZtes.Pop();
            if (stat.Item1 != null)
            {
                var item1 =
                    await
                        _zteRepository.FirstOrDefaultAsync(
                            x =>
                                x.StatTime == stat.Item1.StatTime && x.ENodebId == stat.Item1.ENodebId &&
                                x.SectorId == stat.Item1.SectorId);
                if (item1 == null)
                {
                    await _zteRepository.InsertAsync(stat.Item1);
                    _zteRepository.SaveChanges();
                }
            }
            if (stat.Item2 != null)
            {
                var item2 =
                    await
                        _rrcZteRepository.FirstOrDefaultAsync(
                            x =>
                                x.StatTime == stat.Item2.StatTime && x.ENodebId == stat.Item2.ENodebId &&
                                x.SectorId == stat.Item2.SectorId);
                if (item2 == null)
                {
                    await _rrcZteRepository.InsertAsync(stat.Item2);
                    _rrcZteRepository.SaveChanges();
                }
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
                    TownRrcs = townRrcs
                });
                begin = begin.AddDays(1);
            }
            return results;
        }

        public async Task<Tuple<int, int, int, int, int>> GenerateTownStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var item1 = _townFlowRepository.Count(x => x.StatTime >= statDate && x.StatTime < end);
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
            return new Tuple<int, int, int, int, int>(item1, item2, item3, item4, item5);
        }

        private List<TownFlowStat> GetTownFlowStats(DateTime statDate, FrequencyBandType frequency = FrequencyBandType.All)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownFlowStat>();
            var huaweiFlows = _huaweiRepository.GetAllList(statDate, end);
            var zteFlows = _zteRepository.GetAllList(statDate, end);
            if (frequency != FrequencyBandType.All)
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
                huaweiFlows = (from f in huaweiFlows
                    join c in cells on new {f.ENodebId, f.LocalCellId} equals
                    new {c.ENodebId, LocalCellId = c.LocalSectorId}
                    select f).ToList();
                zteFlows = (from f in zteFlows
                               join c in cells on f.ENodebId equals c.ENodebId
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
            townStatList.AddRange(zteRrcs.GetTownStats<RrcZte,TownRrcStat>(_eNodebRepository));
            return townStatList;
        } 

        public IEnumerable<ENodebFlowView> GetENodebFlowViews(DateTime begin, DateTime end)
        {
            var eNodebStatList = new List<ENodebFlowView>();
            var huaweiFlows = _huaweiRepository.GetAllList(begin, end);
            eNodebStatList.AddRange(huaweiFlows.GetENodebStats<FlowHuawei, ENodebFlowView>(_eNodebRepository));
            var zteFlows = _zteRepository.GetAllList(begin, end);
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
