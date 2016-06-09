using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Moq;
using NUnit.Framework;
using Shouldly;

namespace Lte.Evaluations.MockItems.Validation
{
    [TestFixture]
    public class MockCellServiceTest
    {
        private readonly Mock<ICellRepository> _cellRepository = new Mock<ICellRepository>();

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _cellRepository.MockSixCells();
        }

        [SetUp]
        public void Setup()
        {
            _cellRepository.MockOperations();
            _cellRepository.MockGetId<ICellRepository, Cell>();
        }

        [Test]
        public void Test_GetAllList()
        {
            var allList = _cellRepository.Object.GetAllList();
            Assert.AreEqual(allList.Count, 6);
            allList[0].IsInUse.ShouldBeTrue();
        }

        [Test]
        public void Test_GetAllInUseList()
        {
            var inuseList = _cellRepository.Object.GetAllInUseList();
            Assert.AreEqual(inuseList.Count, 6);
        }
    }
}
