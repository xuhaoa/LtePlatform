using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.MockOperations;
using Moq;
using NUnit.Framework;

namespace Lte.Evaluations.DataService.Mr
{
    [TestFixture]
    public class PreciseWorkItemTest
    {
        private readonly Mock<IPreciseWorkItemCellRepository> repository = new Mock<IPreciseWorkItemCellRepository>();
        private Mock<ICellPowerService> powerRepository = new Mock<ICellPowerService>();
        private Mock<ICellRepository> cellRepository = new Mock<ICellRepository>();
            
        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            AutoMapperHelper.CreateMap(typeof(PreciseInterferenceNeighborDto));
            AutoMapperHelper.CreateMap(typeof(PreciseInterferenceVictimDto));
            AutoMapperHelper.CreateMap(typeof(PreciseCoverageDto));

            repository.Setup(x => x.Get(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<string, int, byte>(
                    (number, eNodebId, sectorId) =>
                        repository.Object.GetAll()
                            .FirstOrDefault(
                                x => x.WorkItemNumber == number && x.ENodebId == eNodebId && x.SectorId == sectorId));
            repository.MockRepositorySaveItems<PreciseWorkItemCell, IPreciseWorkItemCellRepository>();
        }
    }
}
