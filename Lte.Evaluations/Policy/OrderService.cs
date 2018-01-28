using Lte.Domain.Common.Wireless;
using Lte.Evaluations.Properties;
using Lte.Parameters.Entities.Kpi;
using System.Collections.Generic;
using System.Linq;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.Policy
{
    public static class OrderService
    {
        public static IEnumerable<TopPrecise4GContainer> GenerateContainers(this IEnumerable<PreciseCoverage4G> stats)
        {
            return from q in stats
                group q by new
                {
                    q.CellId,
                    q.SectorId
                }
                into g
                select new TopPrecise4GContainer
                {
                    PreciseCoverage4G = new PreciseCoverage4G
                    {
                        CellId = g.Key.CellId,
                        SectorId = g.Key.SectorId,
                        FirstNeighbors = g.Sum(q => q.FirstNeighbors),
                        SecondNeighbors = g.Sum(q => q.SecondNeighbors),
                        ThirdNeighbors = g.Sum(q => q.ThirdNeighbors),
                        TotalMrs = g.Sum(q => q.TotalMrs)
                    },
                    TopDates = g.Count()
                };
        }

        public static IEnumerable<TopMrsRsrpContainer> GenerateContainers(this IEnumerable<TopMrsRsrp> stats)
        {
            return from q in stats
                group q by new
                {
                    q.ENodebId,
                    q.SectorId
                }
                into g
                select new TopMrsRsrpContainer
                {
                    TopMrsRsrp = new TopMrsRsrp
                    {
                        ENodebId = g.Key.ENodebId,
                        SectorId = g.Key.SectorId,
                        RsrpBelow120 = g.Sum(q => q.RsrpBelow120),
                        Rsrp120To115 = g.Sum(q => q.Rsrp120To115),
                        Rsrp115To110 = g.Sum(q => q.Rsrp115To110),
                        Rsrp110To105 = g.Sum(q => q.Rsrp110To105),
                        Rsrp105To100 = g.Sum(q => q.Rsrp105To100),
                        Rsrp100To95 = g.Sum(q => q.Rsrp100To95),
                        Rsrp95To90 = g.Sum(q => q.Rsrp95To90),
                        Rsrp90To80 = g.Sum(q => q.Rsrp90To80),
                        Rsrp80To70 = g.Sum(q => q.Rsrp80To70),
                        Rsrp70To60 = g.Sum(q => q.Rsrp70To60),
                        RsrpAbove60 = g.Sum(q => q.RsrpAbove60)
                    },
                    TopDates = g.Count()
                };
        }

        public static List<TopPrecise4GContainer> Order(this IEnumerable<TopPrecise4GContainer> result, 
            OrderPreciseStatPolicy policy, int topCount)
        {
            switch (policy)
            {
                case OrderPreciseStatPolicy.OrderBySecondRate:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.SecondRate)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderBySecondNeighborsDescending:
                    return result
                        .Where(x => x.PreciseCoverage4G.SecondRate > Settings.Default.PreciseRateThreshold)
                        .OrderByDescending(x => x.PreciseCoverage4G.SecondNeighbors)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderByFirstRate:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.FirstRate)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderByFirstNeighborsDescending:
                    return result
                        .Where(x => x.PreciseCoverage4G.SecondRate > Settings.Default.PreciseRateThreshold)
                        .OrderByDescending(x => x.PreciseCoverage4G.FirstNeighbors)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderByTopDatesDescending:
                    return result
                        .Where(x => x.PreciseCoverage4G.SecondRate > Settings.Default.PreciseRateThreshold)
                        .OrderByDescending(x => x.TopDates).Take(topCount).ToList();
                default:
                    return result
                        .Where(x => x.PreciseCoverage4G.SecondRate > Settings.Default.PreciseRateThreshold)
                        .OrderByDescending(x => x.PreciseCoverage4G.TotalMrs)
                        .Take(topCount).ToList();
            }
        }

        public static IEnumerable<TopMrsRsrp> Order(this IEnumerable<TopMrsRsrp> stats, OrderMrsRsrpPolicy policy,
            int topCount)
        {
            switch (policy)
            {
                case OrderMrsRsrpPolicy.OrderBy105Rate:
                    return
                        stats.OrderByDescending(x => (x.RsrpBelow120 + x.Rsrp120To115 + x.Rsrp115To110 + x.Rsrp110To105)
                                                     /
                                                     (x.RsrpBelow120 + x.Rsrp120To115 + x.Rsrp115To110 + x.Rsrp110To105 +
                                                      x.Rsrp105To100 + x.Rsrp100To95
                                                      + x.Rsrp95To90 + x.Rsrp90To80 + x.Rsrp90To80 + x.Rsrp80To70 +
                                                      x.Rsrp70To60 + x.RsrpAbove60)).Take(topCount).ToList();
                case OrderMrsRsrpPolicy.OrderBy105TimesDescending:
                    return
                        stats.OrderByDescending(x => x.RsrpBelow120 + x.Rsrp120To115 + x.Rsrp115To110 + x.Rsrp110To105)
                            .Take(topCount)
                            .ToList();
                case OrderMrsRsrpPolicy.OrderBy110Rate:
                    return
                        stats.OrderByDescending(x => (x.RsrpBelow120 + x.Rsrp120To115 + x.Rsrp115To110)
                                                     /
                                                     (x.RsrpBelow120 + x.Rsrp120To115 + x.Rsrp115To110 + x.Rsrp110To105 +
                                                      x.Rsrp105To100 + x.Rsrp100To95
                                                      + x.Rsrp95To90 + x.Rsrp90To80 + x.Rsrp90To80 + x.Rsrp80To70 +
                                                      x.Rsrp70To60 + x.RsrpAbove60)).Take(topCount).ToList();
                default:
                    return
                        stats.OrderByDescending(x => x.RsrpBelow120 + x.Rsrp120To115 + x.Rsrp115To110)
                            .Take(topCount)
                            .ToList();
            }
        }

        public static IEnumerable<TopConnection3GTrendView> Order(this IEnumerable<TopConnection3GTrendView> stats,
            OrderTopConnection3GPolicy policy,
            int topCount)
        {
            switch (policy)
            {
                case OrderTopConnection3GPolicy.OrderByConnectionFailsDescending:
                    return stats.OrderByDescending(x => x.ConnectionFails).Take(topCount);
                case OrderTopConnection3GPolicy.OrderByConnectionRate:
                    return stats.OrderBy(x => x.ConnectionRate).Take(topCount);
                default:
                    return stats.OrderByDescending(x => x.TopDates).Take(topCount);
            }
        }

        public static IEnumerable<TopDrop2GTrendView> Order(this IEnumerable<TopDrop2GTrendView> stats,
            OrderTopDrop2GPolicy policy,
            int topCount)
        {
            switch (policy)
            {
                case OrderTopDrop2GPolicy.OrderByDropRateDescending:
                    return stats.OrderByDescending(x => x.DropRate).Take(topCount);
                case OrderTopDrop2GPolicy.OrderByDropsDescending:
                    return stats.OrderByDescending(x => x.TotalDrops).Take(topCount);
                default:
                    return stats.OrderByDescending(x => x.TopDates).Take(topCount);
            }
        }

    }
}
