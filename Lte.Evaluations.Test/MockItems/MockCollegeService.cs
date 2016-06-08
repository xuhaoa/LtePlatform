using System.Collections.Generic;
using System.Linq;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.College;
using Lte.Parameters.MockOperations;
using Moq;

namespace Lte.Evaluations.MockItems
{
    public static class MockCollegeService
    {
        public static void MockThreeColleges(this Mock<ICollegeRepository> repository)
        {
            repository.MockAuditedItems(new List<CollegeInfo>
            {
                new CollegeInfo
                {
                    Id = 1,
                    Name = "college-1"
                },
                new CollegeInfo
                {
                    Id = 2,
                    Name = "college-2"
                },
                new CollegeInfo
                {
                    Id = 3,
                    Name = "college-3"
                }
            }.AsQueryable());
        }
    }
}
