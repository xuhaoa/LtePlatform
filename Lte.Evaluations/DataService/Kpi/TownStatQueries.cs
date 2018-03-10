using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.Dependency;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
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
            IEnumerable<ENodeb> eNodebs, Func<IGrouping<int, TStat>, TStat> filterFlow)
            where TStat : IENodebId
            where TENodebStat : IENodebId, IGeoPoint<double>
        {
            var query = from stat in stats.GroupBy(x => x.ENodebId)
                join eNodeb in eNodebs on stat.Key equals eNodeb.ENodebId
                select
                new
                {
                    Stat = stat,
                    eNodeb.Longtitute,
                    eNodeb.Lattitute
                };
            var eNodebStats = query.Select(x =>
            {
                var eNodebStat = Mapper.Map<TStat, TENodebStat>(filterFlow(x.Stat));
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


        public static IEnumerable<TTownStat> GetDateMergeStats<TTownStat>(this IEnumerable<TTownStat> townStats, DateTime statTime)
            where TTownStat : class, ITownId, IStatDate, new()
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
                stat.StatDate = statTime;
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