using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.MockItems;
using Lte.Evaluations.Policy;
using Lte.Evaluations.ViewModels;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities.Basic;
using Moq;
using NUnit.Framework;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeCdmaCellsServiceTest
    {
        private readonly Mock<IInfrastructureRepository> _repository = new Mock<IInfrastructureRepository>();
        private readonly Mock<ICdmaCellRepository> _cellRepository = new Mock<ICdmaCellRepository>();
        private readonly Mock<IBtsRepository> _btsRepository = new Mock<IBtsRepository>();
        private CollegeCdmaCellsService _service;
        private CollegeCdmaCellViewService _viewService;
        private readonly ITypeFinder _typeFinder = new TypeFinder(new MyAssemblyFinder());

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
            _service = new CollegeCdmaCellsService(_repository.Object, _cellRepository.Object, _btsRepository.Object);
            _viewService = new CollegeCdmaCellViewService(_repository.Object, _cellRepository.Object,
                _btsRepository.Object);
            BaiduMapperService.MapCdmaCellView();
            _repository.MockOperations();
            _repository.MockSixCollegeCdmaCells();
            _cellRepository.MockGetId<ICdmaCellRepository, CdmaCell>();
            _cellRepository.MockOperations();
            _btsRepository.MockOperation();
            _btsRepository.MockGetId<IBtsRepository, CdmaBts>();
            _btsRepository.MockThreeBtss();
        }

        [TestCase(1, true, "Bts-1-1", 112.3, 23.2, 30, "室外")]
        [TestCase(2, true, "Bts-2-1", 112.3, 23.2, 60, "室外")]
        [TestCase(3, true, "Bts-2-2", 112.3, 23.2, 90, "室外")]
        [TestCase(4, true, "Bts-3-1", 112.3, 23.2, 150, "室外")]
        [TestCase(5, true, "Bts-3-2", 112.3, 23.2, 210, "室外")]
        [TestCase(6, true, "Bts-3-3", 112.3, 23.2, 270, "室外")]
        [TestCase(7, false, "ENodeb-3-3", 112.3, 23.2, 270, "室外")]
        [TestCase(27, false, "ENodeb-3-3", 112.3, 23.2, 270, "室外")]
        public void Test_GetViews_SingleInfrastructure(int id, bool matched, string cellName, double lontitute,
            double lattitute, double azimuth, string indoor)
        {
            _cellRepository.MockSixCells(lontitute, lattitute);
            var views = _viewService.GetViews("College-" + id);
            if (matched)
            {
                Assert.IsNotNull(views);
                var cellViews = views as CdmaCellView[] ?? views.ToArray();
                Assert.AreEqual(cellViews.Count(), 1);
            }
        }

        [TestCase(1, true, "Bts-1-1", 112.3, 23.2, 30, "室外")]
        [TestCase(2, true, "Bts-2-1", 112.3, 23.2, 60, "室外")]
        [TestCase(3, true, "Bts-2-2", 112.3, 23.2, 90, "室外")]
        [TestCase(4, true, "Bts-3-1", 112.3, 23.2, 150, "室外")]
        [TestCase(5, true, "Bts-3-2", 112.3, 23.2, 210, "室外")]
        [TestCase(6, true, "Bts-3-3", 112.3, 23.2, 270, "室外")]
        [TestCase(7, false, "ENodeb-3-3", 112.3, 23.2, 270, "室外")]
        [TestCase(27, false, "ENodeb-3-3", 112.3, 23.2, 270, "室外")]
        public void Test_QuerySectors_SingleInfrastructure(int id, bool matched, string cellName, double lontitute,
            double lattitute, double azimuth, string indoor)
        {
            _cellRepository.MockSixCells(lontitute, lattitute);
            var views = _service.Query("College-" + id);
            if (matched)
            {
                Assert.IsNotNull(views);
                var cellViews = views as SectorView[] ?? views.ToArray();
                Assert.AreEqual(cellViews.Count(), 1);
            }
        }
    }
}
