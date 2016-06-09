using System.Collections.Generic;
using Lte.Evaluations.DataService.Mr;
using Lte.Parameters.Entities.Mr;
using NUnit.Framework;

namespace Lte.Evaluations.MapperService
{
    [TestFixture]
    public class CellDistanceTransformTest
    {
        [Test]
        public void Test_QueryAverageRsrp()
        {
            var totalList = new List<CellDistance>
            {
                new CellDistance {Distance0 = 0, Distance1 = 1, Distance10 = 10},
                new CellDistance {Distance0 = 1, Distance1 = 2, Distance10 = 10},
                new CellDistance {Distance0 = 2, Distance1 = 3, Distance10 = 10}
            };
            var rsrpList = new List<CellDistance>
            {
                new CellDistance {Distance0 = 10, Distance1 = 6, Distance10 = 20},
                new CellDistance {Distance0 = 3, Distance1 = 7, Distance10 = 10},
                new CellDistance {Distance0 = 3, Distance1 = 6, Distance10 = 10}
            };
            var result = CellDistanceService.QueryAverageRsrp(totalList, rsrpList);
            Assert.AreEqual(result[0], -134.667, 1E-2);
        }
    }
}
