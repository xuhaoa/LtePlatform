using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.MockOperations;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.TestService
{
    public class CollegeBtsTestService
    {
        private readonly Mock<IInfrastructureRepository> _repository = new Mock<IInfrastructureRepository>();
        private readonly Mock<IBtsRepository> _btsRepository = new Mock<IBtsRepository>();

        public CollegeBtsTestService(Mock<IInfrastructureRepository> repository, Mock<IBtsRepository> btsRepository)
        {
            _repository = repository;
            _btsRepository = btsRepository;
        }

        public void MockOneBtsInfrastructure(int id)
        {
            var infrastructures = new List<InfrastructureInfo>
            {
                new InfrastructureInfo
                {
                    HotspotName = "College-"+id,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.CdmaBts,
                    InfrastructureId = id
                }
            };
            _repository.MockQueryItems(infrastructures.AsQueryable());
        }
    }
}
