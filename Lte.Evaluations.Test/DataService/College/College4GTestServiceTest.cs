using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using Lte.Evaluations.MockItems;
using Lte.Evaluations.Policy;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.College;
using Lte.Parameters.MockOperations;
using Moq;
using NUnit.Framework;

namespace Lte.Evaluations.DataService.College
{
    [TestFixture]
    public class College4GTestServiceTest
    {
        private AbpAutoMapperModule _module;
        private TypeFinder _typeFinder;
        private readonly Mock<ICollege4GTestRepository> _repository = new Mock<ICollege4GTestRepository>();
        private readonly Mock<ICollegeRepository> _collegeRepository = new Mock<ICollegeRepository>();
        private readonly Mock<IENodebRepository> _eNodebRepository = new Mock<IENodebRepository>();
        private readonly Mock<ICellRepository> _cellRepository = new Mock<ICellRepository>();
        private College4GTestService _service;

        [TestFixtureSetUp]
        public void TfSetup()
        {
            _typeFinder = new TypeFinder(new MyAssemblyFinder());
            _module = new AbpAutoMapperModule(_typeFinder);
            _module.PostInitialize();
            _service = new College4GTestService(_repository.Object, _collegeRepository.Object,
                _eNodebRepository.Object, _cellRepository.Object);
            _collegeRepository.MockThreeColleges();
            _collegeRepository.Setup(x => x.Get(It.IsAny<int>())).Returns<int>(
                id => new CollegeInfo
                {
                    Id = id,
                    Name = "college-1"
                });
        }

        [Test]
        public void Test_MockValues()
        {
            Assert.IsNotNull(_collegeRepository.Object.GetAll().FirstOrDefault(x => x.Id == 1));
            Assert.IsNotNull(_collegeRepository.Object.Get(1)); ;
        }

        [TestCase(1, "2015-10-10", 4, 15)]
        public void Test_GetViews_OneTestItem(int collegId, string testDate, int hour, int users)
        {
            _repository.MockQueryItems(new List<College4GTestResults>
            {
                new College4GTestResults
                {
                    CollegeId = collegId,
                    TestTime = DateTime.Parse(testDate).AddHours(hour),
                    AccessUsers = users
                }
            }.AsQueryable());

            var views = _service.GetViews(DateTime.Parse(testDate), hour).ToList();
            Assert.IsNotNull(views);
            Assert.AreEqual(views.Count, 1);
            Assert.AreEqual(views[0].CollegeName, "college-" + collegId);
            Assert.AreEqual(views[0].AccessUsers, users);
        }
    }
}
