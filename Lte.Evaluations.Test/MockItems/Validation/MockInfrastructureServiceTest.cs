using Lte.Parameters.Abstract.Infrastructure;
using Moq;
using NUnit.Framework;
using System.Linq;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.MockItems.Validation
{
    [TestFixture]
    public class MockInfrastructureServiceTest
    {
        private readonly Mock<IInfrastructureRepository> _repository = new Mock<IInfrastructureRepository>();

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _repository.MockThreeCollegeENodebs();
            _repository.MockOperations();
        }

        [TestCase(1)]
        [TestCase(2)]
        [TestCase(3)]
        public void Test_GetENodebIds(int id)
        {
            var ids = _repository.Object.GetCollegeInfrastructureIds("College-" + id, InfrastructureType.ENodeb);
            Assert.AreEqual(ids.Count(), 1);
            Assert.AreEqual(ids.ElementAt(0), id);
        }
    }
}
