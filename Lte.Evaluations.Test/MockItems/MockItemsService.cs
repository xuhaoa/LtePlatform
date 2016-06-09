using System.Collections.Generic;
using System.Linq;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.MockOperations;
using Moq;

namespace Lte.Evaluations.MockItems
{
    public static class MockItemsService
    {
        public static void MockCdmaCells(this Mock<ICdmaCellRepository> repository, List<CdmaCell> cells)
        {
            repository.MockQueryItems(cells.AsQueryable());
        }

        public static void MockAlarms(this Mock<IAlarmRepository> repository, List<AlarmStat> alarms)
        {
            repository.MockQueryItems(alarms.AsQueryable());
        }

        public static void MockTowns(this Mock<ITownRepository> repository, List<Town> towns)
        {
            repository.MockQueryItems(towns.AsQueryable());
        }
    }
}
