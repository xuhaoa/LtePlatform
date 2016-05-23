using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Concrete.Mr;
using NUnit.Framework;

namespace Lte.Parameters.Test.Mr
{
    [TestFixture]
    public class CellDistanceRepositoryTests
    {
        private readonly ICellDistanceRepository _repository = new CellDistanceRepository();

        [Test]
        public void Test_GetTotalList()
        {
            var results = _repository.GetTotalList(552238, 401, new DateTime(2016, 4, 26));
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 84);
        }

        [Test]
        public void Test_GetRsrpList()
        {
            var results = _repository.GetRsrpList(552238, 401, new DateTime(2016, 4, 26));
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 84);
        }

        [Test]
        public void Test_Get110List()
        {
            var results = _repository.Get110List(552238, 401, new DateTime(2016, 4, 26));
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 84);
        }

        [Test]
        public void Test_Get105List()
        {
            var results = _repository.Get105List(552238, 401, new DateTime(2016, 4, 26));
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 84);
        }
    }
}
