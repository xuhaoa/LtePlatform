using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Concrete.Channel;
using NUnit.Framework;
using Shouldly;

namespace Lte.Parameters.Test.Channel
{
    [TestFixture]
    public class CellDlpcPdschPaRepositoryTest
    {
        private readonly ICellDlpcPdschPaRepository _repository = new CellDlpcPdschPaRepository();

        [Test]
        public void Test_GetBySectorId()
        {
            var result = _repository.GetRecent(500017, 1);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.iDate, "20160708");
            result.PaPcOff.ShouldBe(4);
        }
    }

    [TestFixture]
    public class CellUlpcCommRepositoryTest
    {
        private readonly ICellUlpcCommRepository _repository = new CellUlpcCommRepository();

        [Test]
        public void Test_GetBySectorId()
        {
            var result = _repository.GetRecent(500017, 1);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.iDate, "20160708");
            result.P0NominalPUCCH.ShouldBe(-115);
        }
    }
}
