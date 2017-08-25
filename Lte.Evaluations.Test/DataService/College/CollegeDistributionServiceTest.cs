using System.Collections.Generic;
using Lte.Evaluations.MockItems;
using Lte.Evaluations.TestService;
using Moq;
using NUnit.Framework;
using System.Linq;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.MockOperations;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeDistributionTestService
    {
        private readonly Mock<IInfrastructureRepository> _repository;

        public CollegeDistributionTestService(Mock<IInfrastructureRepository> repository)
        {
            _repository = repository;
        }

        public void MockOneLteDistribution(int id)
        {
            var infrastructures = new List<InfrastructureInfo>
            {
                new InfrastructureInfo
                {
                    HotspotName = "College-"+id,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.LteIndoor,
                    InfrastructureId = id
                }
            };
            _repository.MockQueryItems(infrastructures.AsQueryable());
        }

        public void MockOneCdmaDistribution(int id)
        {
            var infrastructures = new List<InfrastructureInfo>
            {
                new InfrastructureInfo
                {
                    HotspotName = "College-"+id,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.CdmaIndoor,
                    InfrastructureId = id
                }
            };
            _repository.MockQueryItems(infrastructures.AsQueryable());
        }
    }

    public class CollegeDistributionServiceTest
    {
        private readonly Mock<IInfrastructureRepository> _repository = new Mock<IInfrastructureRepository>();

        private readonly Mock<IIndoorDistributionRepository> _indoorRepository =
            new Mock<IIndoorDistributionRepository>();

        private CollegeLteDistributionService _service;
        private CollegeCdmaDistributionService _cdmaService;
        private CollegeDistributionTestService _testService;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _repository.MockOperations();
            _indoorRepository.MockGetId<IIndoorDistributionRepository, IndoorDistribution>();
            _indoorRepository.MockThreeDistributions();
            _service = new CollegeLteDistributionService(_repository.Object, _indoorRepository.Object);
            _cdmaService = new CollegeCdmaDistributionService(_repository.Object, _indoorRepository.Object);
            _testService = new CollegeDistributionTestService(_repository);
        }

        [TestCase(1)]
        [TestCase(2)]
        [TestCase(3)]
        [TestCase(4)]
        [TestCase(5)]
        public void Test_QueryLteDistributions_SingleInfrastructure(int id)
        {
            _testService.MockOneLteDistribution(id);
            var views = _service.Query("College-" + id);
            Assert.IsNotNull(views);

            if (id > 0 && id <= 3)
            {
                Assert.AreEqual(views.Count(), 1);
            }
            else
            {
                Assert.AreEqual(views.Count(), 0);
            }
        }

        [TestCase(1)]
        [TestCase(2)]
        [TestCase(3)]
        [TestCase(4)]
        [TestCase(5)]
        public void Test_QueryCdmaDistributions_SingleInfrastructure(int id)
        {
            _testService.MockOneCdmaDistribution(id);
            var views = _cdmaService.Query("College-" + id);
            Assert.IsNotNull(views);

            if (id > 0 && id <= 3)
            {
                Assert.AreEqual(views.Count(), 1);
            }
            else
            {
                Assert.AreEqual(views.Count(), 0);
            }
        }
    }
}
