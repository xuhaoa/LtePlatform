using System.Linq;
using Lte.Parameters.Abstract;
using Lte.Parameters.Entities;
using Moq;

namespace Lte.Evaluations.MockItems
{
    public static class MockTownService
    {

        public static void MockSixTowns(this Mock<ITownRepository> repository)
        {
            var ids = new [] {1, 2, 3, 4, 5, 6};
            repository.MockTowns(ids.Select(x=>new Town
            {
                Id = x,
                CityName = "city-" + x,
                DistrictName = "district-" + x,
                TownName = "town-" + x
            }).ToList());
        }
    }
}
