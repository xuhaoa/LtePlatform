using Lte.Domain.Common.Wireless;
using Lte.Evaluations.MapperSerive.Kpi;
using Lte.Evaluations.Properties;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.Parameters.Entities.Kpi;
using System.Collections.Generic;
using System.Linq;

namespace Lte.Evaluations.Policy
{
    public static class OrderPreciseStatService
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
