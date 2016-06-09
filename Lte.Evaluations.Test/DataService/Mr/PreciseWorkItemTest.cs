using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.MockItems;
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
        private readonly Mock<ICellPowerService> _powerRepository = new Mock<ICellPowerService>();
        private readonly Mock<ICellRepository> _cellRepository = new Mock<ICellRepository>();
        private readonly ITypeFinder _typeFinder = new TypeFinder
        {
            AssemblyFinder = new MyAssemblyFinder()
        };

        private PreciseWorkItemService _serivice;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _repository.MockOperation();
            _repository.MockRepositorySaveItems<PreciseWorkItemCell, IPreciseWorkItemCellRepository>();
            _repository.MockRepositoryUpdateWorkItemCell<PreciseWorkItemCell, IPreciseWorkItemCellRepository>();

            _serivice = new PreciseWorkItemService(_repository.Object, _powerRepository.Object, _cellRepository.Object);

            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();

        }
    }
}
