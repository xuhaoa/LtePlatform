using System.Collections.Generic;
using System.Linq;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Moq;

namespace Lte.Evaluations.MockItems
{
    public static class MockENodebService
    {
        public static void MockThreeENodebs(this Mock<IENodebRepository> repository)
        {
            repository.MockENodebs(new List<ENodeb>
            {
                new ENodeb {Id = 1, ENodebId = 1, Name = "ENodeb-1", TownId = 1, Address = "Address-1", PlanNum = "FSL-1"},
                new ENodeb {Id = 2, ENodebId = 2, Name = "ENodeb-2", TownId = 2, Address = "Address-2", PlanNum = "FSL-2"},
                new ENodeb {Id = 3, ENodebId = 3, Name = "ENodeb-3", TownId = 3, Address = "Address-3", PlanNum = "FSL-3"}
            });
        }
    }
}
