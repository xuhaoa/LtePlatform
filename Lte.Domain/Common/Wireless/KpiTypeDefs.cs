using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lte.Domain.Common.Wireless
{
    [EnumTypeDescription(typeof(OrderPreciseStatPolicy), OrderBySecondRate)]
    public enum OrderPreciseStatPolicy : byte
    {
        OrderBySecondRate,
        OrderBySecondNeighborsDescending,
        OrderByFirstRate,
        OrderByFirstNeighborsDescending,
        OrderByTotalMrsDescending,
        OrderByTopDatesDescending
    }
}
