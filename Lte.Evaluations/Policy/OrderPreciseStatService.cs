using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.MapperSerive.Kpi;
using Lte.Parameters.Entities;

namespace Lte.Evaluations.Policy
{
    public static class OrderPreciseStatService
    {
        public static List<TopPrecise4GContainer> Order(this IEnumerable<TopPrecise4GContainer> result, 
            OrderPreciseStatPolicy policy, int topCount)
        {
            switch (policy)
            {
                case OrderPreciseStatPolicy.OrderBySecondRate:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.SecondRate)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderBySecondNeighborsDescending:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.SecondNeighbors)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderByFirstRate:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.FirstRate)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderByFirstNeighborsDescending:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.FirstNeighbors)
                        .Take(topCount).ToList();
                case OrderPreciseStatPolicy.OrderByTopDatesDescending:
                    return result.OrderByDescending(x => x.TopDates).Take(topCount).ToList();
                default:
                    return result.OrderByDescending(x => x.PreciseCoverage4G.TotalMrs)
                        .Take(topCount).ToList();
            }
        }
    }
}
