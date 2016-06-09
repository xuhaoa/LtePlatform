using System.Collections.Generic;
using Lte.Evaluations.MockItems;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Moq;

namespace Lte.Evaluations.TestService
{
    public class CollegeDistributionTestService
    {
        private readonly Mock<IInfrastructureRepository> _repository;
        private readonly Mock<IIndoorDistributionRepository> _indoorRepository;

        public CollegeDistributionTestService(Mock<IInfrastructureRepository> repository,
            Mock<IIndoorDistributionRepository> indoorRepository)
        {
            _repository = repository;
            _indoorRepository = indoorRepository;
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
            _repository.MockInfrastructures(infrastructures);
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
            _repository.MockInfrastructures(infrastructures);
        }
    }
}
