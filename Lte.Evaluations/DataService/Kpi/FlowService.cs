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

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowService
    {
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly ITownFlowRepository _townFlowRepository;
        private readonly IENodebRepository _eNodebRepository;

        private static Stack<FlowHuawei> FlowHuaweis { get; set; }

        private static Stack<FlowZte> FlowZtes { get; set; }

        public int FlowHuaweiCount => FlowHuaweis.Count;

        public int FlowZteCount => FlowZtes.Count;

        public FlowService(IFlowHuaweiRepository huaweiRepositroy, IFlowZteRepository zteRepository,
            ITownFlowRepository townFlowRepository, IENodebRepository eNodebRepository)
        {
            _huaweiRepository = huaweiRepositroy;
            _zteRepository = zteRepository;
            _townFlowRepository = townFlowRepository;
            _eNodebRepository = eNodebRepository;
            if (FlowHuaweis == null)
                FlowHuaweis = new Stack<FlowHuawei>();
            if (FlowZtes == null)
                FlowZtes = new Stack<FlowZte>();
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
                    SchedulingRank2String = g.Sum(x => x.SchedulingRank2String.ConvertToInt(0)).ToString()
                }).ToList();
            var flows =
                Mapper.Map<List<FlowHuaweiCsv>, IEnumerable<FlowHuawei>>(mergedCsvs);
            foreach (var flow in flows)
            {
                FlowHuaweis.Push(flow);
            }
        }

        public void UploadFlowZtes(StreamReader reader)
        {
            var flows = Mapper.Map<IEnumerable<FlowZteCsv>, IEnumerable<FlowZte>>(FlowZteCsv.ReadFlowZteCsvs(reader));
            foreach (var flow in flows)
            {
                FlowZtes.Push(flow);
            }
        }

        public FlowHuawei GetTopHuaweiItem()
        {
            return FlowHuaweis.Pop();
        }

        public async Task<bool> DumpOneHuaweiStat()
        {
            var stat = GetTopHuaweiItem();
            if (stat == null) return false;
            var item =
                await
                    _huaweiRepository.FirstOrDefaultAsync(
                        x =>
                            x.StatTime == stat.StatTime && x.ENodebId == stat.ENodebId &&
                            x.LocalCellId == stat.LocalCellId);
            if (item == null)
            {
                var result = await _huaweiRepository.InsertAsync(stat);
                _huaweiRepository.SaveChanges();
                return result != null;
            }
            return false;
        }

        public async Task<bool> DumpOneZteStat()
        {
            var stat = FlowZtes.Pop();
            if (stat == null) return false;
            var item =
                await
                    _zteRepository.FirstOrDefaultAsync(
                        x =>
                            x.StatTime == stat.StatTime && x.ENodebId == stat.ENodebId &&
                            x.SectorId == stat.SectorId);
            if (item == null)
            {
                var result = await _zteRepository.InsertAsync(stat);
                _zteRepository.SaveChanges();
                return result != null;
            }
            return false;
        }

        public void ClearHuaweiStats()
        {
            FlowHuaweis.Clear();
        }

        public void ClearZteStats()
        {
            FlowZtes.Clear();
        }

        public FlowHuawei QueryHuaweiStat(int index)
        {
            return FlowHuaweis.ElementAt(index);
        }

        public async Task<IEnumerable<FlowHistory>> GetFlowHistories(DateTime begin, DateTime end)
        {
            var results = new List<FlowHistory>();
            while (begin < end.AddDays(1))
            {
                var beginDate = begin;
                var endDate = begin.AddDays(1);
                var huaweiItems = await _huaweiRepository.CountAsync(beginDate, endDate);
                var zteItems = await _zteRepository.CountAsync(beginDate, endDate);
                var townItems = await _townFlowRepository.CountAsync(beginDate, endDate);
                results.Add(new FlowHistory
                {
                    DateString = begin.ToShortDateString(),
                    HuaweiItems = huaweiItems,
                    ZteItems = zteItems,
                    TownStats = townItems
                });
                begin = begin.AddDays(1);
            }
            return results;
        }

        public async Task<int> GenerateTownStats(DateTime statDate)
        {
            var end = statDate.AddDays(1);
            var townStatList = new List<TownFlowStat>();
            townStatList.AddRange(
                _huaweiRepository.GetAllList(statDate, end)
                    .GetTownStats<FlowHuawei, TownFlowStat>(_eNodebRepository));
            townStatList.AddRange(
                _zteRepository.GetAllList(statDate, end)
                    .GetTownStats<FlowZte, TownFlowStat>(_eNodebRepository));
            foreach (var stat in townStatList.GetMergeStats(statDate))
            {
                await _townFlowRepository.InsertAsync(stat);
            }
            return _townFlowRepository.SaveChanges();
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


        public static IEnumerable<TownFlowStat> GetMergeStats(this IEnumerable<TownFlowStat> townStats, DateTime statTime)
        {
            var mergeStats = from stat in townStats
                group stat by stat.TownId
                into g
                select new TownFlowStat
                {
                    TownId = g.Key,
                    PdcpDownlinkFlow = g.Sum(x => x.PdcpDownlinkFlow),
                    PdcpUplinkFlow = g.Sum(x => x.PdcpUplinkFlow),
                    StatTime = statTime,
                    MaxActiveUsers = g.Sum(x => x.MaxActiveUsers),
                    MaxUsers = g.Sum(x => x.MaxUsers),
                    AverageActiveUsers = g.Sum(x => x.AverageActiveUsers),
                    AverageUsers = g.Sum(x => x.AverageUsers)
                };
            return mergeStats;
        }

    }
}
