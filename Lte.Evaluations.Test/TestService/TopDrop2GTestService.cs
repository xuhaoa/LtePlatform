using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Evaluations.MockItems;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.MockOperations;
using Moq;

namespace Lte.Evaluations.TestService
{
    public class TopDrop2GTestService
    {
        private readonly Mock<ITopDrop2GCellRepository> _repository;
        private readonly Mock<IBtsRepository> _btsRepository;
        private readonly Mock<IENodebRepository> _eNodebRepository;

        public TopDrop2GTestService(Mock<ITopDrop2GCellRepository> repository, Mock<IBtsRepository> btsRepository,
            Mock<IENodebRepository> eNodebRepository)
        {
            _repository = repository;
            _btsRepository = btsRepository;
            _eNodebRepository = eNodebRepository;
        }

        public void ImportOneStat(int btsId, byte sectorId, int drops, int assignmentSuccess)
        {
            _repository.MockQueryItems(new List<TopDrop2GCell>
            {
                new TopDrop2GCell
                {
                    BtsId = btsId,
                    SectorId = sectorId,
                    Drops = drops,
                    TrafficAssignmentSuccess = assignmentSuccess,
                    City = "Foshan",
                    StatTime = DateTime.Parse("2015-1-1")
                }
            }.AsQueryable());
        }
    }
}
