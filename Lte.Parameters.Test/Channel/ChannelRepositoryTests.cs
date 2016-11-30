using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Concrete.Channel;
using NUnit.Framework;
using Shouldly;

namespace Lte.Parameters.Test.Channel
{
    [TestFixture]
    public class PDSCHCfgRepositoryTest
    {
        private readonly IPDSCHCfgRepository _repository = new PDSCHCfgRepository();

        [Test]
        public void Test_GetBySectorId()
        {
            var result = _repository.GetRecent(500017, 1);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.iDate, "20160708");
            result.ReferenceSignalPwr.ShouldBe(152);
        }
    }
}
