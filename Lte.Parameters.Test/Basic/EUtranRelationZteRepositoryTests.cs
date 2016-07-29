using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Neighbor;
using Lte.Parameters.Abstract.Switch;
using Lte.Parameters.Concrete;
using Lte.Parameters.Concrete.Basic;
using Lte.Parameters.Concrete.Neighbor;
using Lte.Parameters.Concrete.Switch;
using NUnit.Framework;

namespace Lte.Parameters.Test.Basic
{
    [TestFixture]
    public class EUtranRelationZteRepositoryTests
    {
        private readonly IEUtranRelationZteRepository _repository = new EUtranRelationZteRepository();

        [Test]
        public void Test_GetRecentBySectorId()
        {
            var results = _repository.GetRecentList(551203, 48);
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 26);
            Assert.AreEqual(results[0].iDate, "20160318");
        }

        [Test]
        public void Test_GetRecentByENodebId()
        {
            var results = _repository.GetRecentList(551203);
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 99);
            Assert.AreEqual(results[0].iDate, "20160318");
        }

        [Test]
        public void Test_GetRecentByENodebId2()
        {
            var results = _repository.GetRecentList(501965);
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 592);
            Assert.AreEqual(results[0].iDate, "20160408");
        }

        [TestCase(551203, 49, "20160408")]
        [TestCase(502776, 148, "20160408")]
        [TestCase(502776, 123, "20160408")]
        [TestCase(551606, 35, "20160408")]
        public void Test_GetRecent(int eNodebId, int externalId, string date)
        {
            var result = _repository.GetRecent(eNodebId, externalId);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.iDate, date);
        }
    }

    [TestFixture]
    public class EUtranRelationZteRepositoryTestsOuter
    {
        private readonly IEUtranRelationZteRepository _repository = new EUtranRelationZteRepository(new OuterMongoProvider("fangww"));

        [Test]
        public void Test_GetRecentBySectorId()
        {
            var results = _repository.GetRecentList(551203, 48);
            Assert.IsNotNull(results);
            Assert.AreEqual(results.Count, 189);
            Assert.AreEqual(results[0].iDate, "20160722");
        }

        [TestCase(551203, 49, "20160722")]
        [TestCase(502776, 148, "20160722")]
        [TestCase(502776, 123, "20160722")]
        [TestCase(551606, 35, "20160722")]
        public void Test_GetRecent(int eNodebId, int externalId, string date)
        {
            var result = _repository.GetRecent(eNodebId, externalId);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.iDate, date);
        }
    }

    [TestFixture]
    public class EUtranCellFDDZteRepositoryTestsOuter
    {
        private readonly IEUtranCellFDDZteRepository _repository=new EUtranCellFDDZteRepository(new OuterMongoProvider("fangww"));

        [Test]
        public void Test_GetRecentBySectorId()
        {
            var results = _repository.GetRecent(501777, 49);
            Assert.IsNotNull(results);
            Assert.AreEqual(results.eNodeB_Id, 501777);
            Assert.AreEqual(results.cellLocalId, 49);
            Assert.AreEqual(results.adminState, 0);
        }

    }

    [TestFixture]
    public class EUtranCellMeasurementZteTestsOuter
    {
        private readonly IEUtranCellMeasurementZteRepository _repository = new EUtranCellMeasurementZteRepository(new OuterMongoProvider("fangww"));

        [Test]
        public void Test_GetRecentBySectorId()
        {
            var results = _repository.GetRecent(501777, 49);
            Assert.IsNotNull(results);
            Assert.AreEqual(results.eNodeB_Id, 501777);
            Assert.AreEqual(results.description, "cellLocalId=49");
            Assert.AreEqual(results.CDMA2000MeasParas_cdmaType, 0);
        }
    }
}
