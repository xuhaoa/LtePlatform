using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.Policy;
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
        private readonly Mock<IPreciseWorkItemCellRepository> _repository = new Mock<IPreciseWorkItemCellRepository>();
        private Mock<ICellPowerService> _powerRepository = new Mock<ICellPowerService>();
        private Mock<ICellRepository> _cellRepository = new Mock<ICellRepository>();
        private readonly ITypeFinder _typeFinder = new TypeFinder
        {
            AssemblyFinder = new MyAssemblyFinder()
        };

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            AutoMapperHelper.CreateMap(typeof(PreciseInterferenceNeighborDto));
            AutoMapperHelper.CreateMap(typeof(PreciseInterferenceVictimDto));
            AutoMapperHelper.CreateMap(typeof(PreciseCoverageDto));

            _repository.Setup(x => x.Get(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<string, int, byte>(
                    (number, eNodebId, sectorId) =>
                        _repository.Object.GetAll()
                            .FirstOrDefault(
                                x => x.WorkItemNumber == number && x.ENodebId == eNodebId && x.SectorId == sectorId));
            _repository.MockRepositorySaveItems<PreciseWorkItemCell, IPreciseWorkItemCellRepository>();
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
        }
    }
}
