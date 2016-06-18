using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.MockItems;
using Lte.Evaluations.TestService;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities.Basic;
using Moq;
using NUnit.Framework;
using Shouldly;

namespace Lte.Evaluations.DataService.College
{
    [TestFixture]
    public class CollegeENodebServiceTest
    {
        private readonly Mock<IInfrastructureRepository> _repository = new Mock<IInfrastructureRepository>();
        private readonly Mock<IENodebRepository> _eNodebRepository = new Mock<IENodebRepository>();
        private readonly Mock<IAlarmRepository> _alarmRepository = new Mock<IAlarmRepository>();
        private CollegeENodebService _service;
        private CollegeENodebTestService _testService;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _service = new CollegeENodebService(_repository.Object, _eNodebRepository.Object);
            AutoMapperHelper.CreateMap(typeof(ENodebView));
            _eNodebRepository.MockOperations();
            _eNodebRepository.MockGetId<IENodebRepository, ENodeb>();
            _eNodebRepository.MockThreeENodebs();
            _repository.MockOperations();
            _alarmRepository.MockOperations();
            _testService = new CollegeENodebTestService(_repository, _eNodebRepository, _alarmRepository);
        }
        
        [TestCase("aaa", new[] {1}, 1)]
        [TestCase("aab", new[] { 1, 2 }, 2)]
        [TestCase("acb", new[] { 1, 2, 3 }, 3)]
        [TestCase("acbs", new[] { 1, 2, 3, 4 }, 3)]
        public void Test_QueryCollegeENodebs_FromENodebNames_OneCollege(string collegeName, int[] eNodebIds,
            int resultCounts)
        {
            _testService.MockManyENodebInfrastructure(new Dictionary<string, IEnumerable<int>>
            {
                {collegeName, eNodebIds }
            });
            var views = _service.Query(new List<string> {collegeName});
            views.Count().ShouldBe(resultCounts);
        }

        [TestCase("aaa", "bbb", new[] { 1 }, new[] { 2 }, 2)]
        [TestCase("aaa", "bbb", new[] { 1 }, new[] { 1 }, 1)]
        [TestCase("aaa", "bbb", new[] { 1, 2 }, new[] { 2 }, 2)]
        [TestCase("aaa", "bbb", new[] { 1, 2 }, new[] { 3 }, 3)]
        [TestCase("aaa1", "bbb2", new[] { 1, 2 }, new[] { 2, 3 }, 3)]
        [TestCase("aaa13", "bbb2", new[] { 1, 2, 4 }, new[] { 2, 3 }, 3)]
        public void Test_QueryCollegeENodebs_FromENodebNames_TwoColleges(string collegeName1, string collegeName2,
            int[] eNodebIds1, int[] eNodebIds2, int resultCounts)
        {
            _testService.MockManyENodebInfrastructure(new Dictionary<string, IEnumerable<int>>
            {
                {collegeName1, eNodebIds1 },
                {collegeName2, eNodebIds2 }
            });
            var views = _service.Query(new List<string>
            {
                collegeName1,
                collegeName2
            });
            views.Count().ShouldBe(resultCounts);
        }

        [TestCase("aaa", "bbb", "cccc", new[] { 1 }, new[] { 2 }, new[] { 3 }, 3)]
        [TestCase("aaa", "bbb", "cccc", new[] { 1 }, new[] { 2 }, new[] { 2 }, 2)]
        public void Test_QueryCollegeENodebs_FromENodebNames_ThreeColleges(string collegeName1, string collegeName2,
            string collegeName3, int[] eNodebIds1, int[] eNodebIds2, int[] eNodebIds3, int resultCounts)
        {
            _testService.MockManyENodebInfrastructure(new Dictionary<string, IEnumerable<int>>
            {
                {collegeName1, eNodebIds1 },
                {collegeName2, eNodebIds2 },
                {collegeName3, eNodebIds3 }
            });
            var views = _service.Query(new List<string>
            {
                collegeName1,
                collegeName2,
                collegeName3
            });
            views.Count().ShouldBe(resultCounts);
        }
    }
}
