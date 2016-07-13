using Abp.EntityFramework;
using Lte.Evaluations.MapperSerive;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Switch;
using Lte.Parameters.Concrete;
using Lte.Parameters.Concrete.Basic;
using Lte.Parameters.Concrete.Switch;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Switch;
using Moq;
using NUnit.Framework;
using Shouldly;

namespace Lte.Evaluations.DataService.Switch
{
    [TestFixture]
    public class IntraFreqHoServiceTests
    {
        private readonly IUeEUtranMeasurementRepository _zteMeasurementRepository = new UeEUtranMeasurementRepository();
        private readonly ICellMeasGroupZteRepository _zteGroupRepository = new CellMeasGroupZteRepository();

        private readonly IEUtranCellMeasurementZteRepository _zteCellGroupRepository =
            new EUtranCellMeasurementZteRepository();

        private readonly IIntraFreqHoGroupRepository _huaweiCellHoRepository = new IntraFreqHoGroupRepository();

        private readonly Mock<IIntraRatHoCommRepository> _huaweiENodebHoRepository = new Mock<IIntraRatHoCommRepository>();

        private readonly ICellHuaweiMongoRepository _huaweiCellRepository = new CellHuaweiMongoRepository();

        private readonly Mock<IENodebRepository> _eNodebRepository = new Mock<IENodebRepository>();

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            InfrastructureMapperService.MapHoParametersService();
            _eNodebRepository.Setup(x => x.GetByENodebId(It.IsAny<int>())).Returns(new ENodeb
            {
                Factory = "中兴"
            });
            _eNodebRepository.Setup(x => x.GetByENodebId(It.Is<int>(id => id == 500814))).Returns(new ENodeb
            {
                Factory = "华为"
            });
            _huaweiENodebHoRepository.Setup(x => x.GetRecent(It.IsAny<int>()))
                .Returns<int>(eNodebId => new IntraRatHoComm
                {
                    eNodeB_Id = eNodebId,
                    IntraFreqHoA3RprtQuan = 3344
                });
        }

        [TestCase(500814)]
        [TestCase(500923)]
        public void Test_HuaweiInterFreqENodebQuery(int eNodebId)
        {
            var query = new HuaweiIntraFreqENodebQuery(_huaweiENodebHoRepository.Object, eNodebId);
            Assert.IsNotNull(query);
            var result = query.Query();
            Assert.IsNotNull(result);
            result.ENodebId.ShouldBe(eNodebId);
            result.ReportQuantity.ShouldBe(3344);
        }

        [TestCase(500814)]
        [TestCase(501766)]
        public void Test_ENodebQuery(int eNodebId)
        {
            var service = new IntraFreqHoService(_zteMeasurementRepository, _zteGroupRepository, _zteCellGroupRepository,
                _huaweiCellHoRepository, _huaweiENodebHoRepository.Object, _huaweiCellRepository, _eNodebRepository.Object);
            var result = service.QueryENodebHo(eNodebId);
            Assert.IsNotNull(result);
        }
    }
}
