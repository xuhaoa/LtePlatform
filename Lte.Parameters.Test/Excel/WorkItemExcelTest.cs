using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToExcel;
using Lte.Domain.Test.LinqToExcel;
using Lte.Evaluations.MapperSerive;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Work;
using NUnit.Framework;
using Shouldly;

namespace Lte.Parameters.Test.Excel
{
    [TestFixture]
    public class WorkItemExcelTest : SQLLogStatements_Helper
    {
        ExcelQueryFactory _repo;
        string _excelFileName;
        string _worksheetName;
        private string _testDirectory;

        [TestFixtureSetUp]
        public void fs()
        {
            InstantiateLogger();
            _testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            _worksheetName = "工单查询结果";
        }
        
        [Test]
        public void Test_Read_Sheet()
        {
            var excelFilesDirectory = Path.Combine(_testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "工单查询结果_20151225145352.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<WorkItemExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 1004);
        }

        [Test]
        public void Test_Read_Sheet2()
        {
            var excelFilesDirectory = Path.Combine(_testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "工单查询结果_20160719143442.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<WorkItemExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 3090);
        }
    }

    [TestFixture]
    public class ComplainExcelTest : SQLLogStatements_Helper
    {
        ExcelQueryFactory _repo;
        string _excelFileName;
        string _worksheetName;
        private string _excelFilesDirectory;

        [TestFixtureSetUp]
        public void fs()
        {
            InstantiateLogger();
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            _excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _worksheetName = "组合项目";
            InfrastructureMapperService.MapCustomerEntities();
        }

        [Test]
        public void Test_Read_Sheet()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "抱怨量.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<ComplainExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 994);
            info[0].Longtitute.ShouldBe(113.277);
            info[4].Lattitute.ShouldBe(23.031);
            info[1].CandidateDistrict.ShouldBe("南海");
            info[2].SerialNumber.ShouldBe("2016010510008434");

            var stats = Mapper.Map<List<ComplainExcel>, List<ComplainItem>>(info);
            stats.Count.ShouldBe(994);
            stats[0].ComplainSource.ShouldBe(ComplainSource.Voice);
            stats[1].District.ShouldBe("南海");
            stats[2].BeginTime.ShouldBeGreaterThan(new DateTime(2016,1,1));
            stats[3].ComplainReason.ShouldBe(ComplainReason.NetworkOptimize);
            stats[3].ComplainSubReason.ShouldBe(ComplainSubReason.ParameterAdjust);
            stats[4].IsIndoor.ShouldBeFalse();
            stats[5].IsIndoor.ShouldBeTrue();
            stats[5].SitePosition.ShouldBe("魁奇电信");
            stats[6].SitePosition.ShouldBe("西樵民乐1");
            stats[5].ComplainScene.ShouldBe(ComplainScene.Residential);
            stats[6].ComplainScene.ShouldBe(ComplainScene.VillageInCity);
            stats[7].ComplainCategory.ShouldBe(ComplainCategory.WeakCoverageVoice);
        }

        [Test]
        public void Test_Read_Sheet1()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "抱怨量1.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<ComplainExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 7);
            info[0].Longtitute.ShouldBe(113.277);
            info[4].Lattitute.ShouldBe(23.031);
            info[1].CandidateDistrict.ShouldBe("南海");
            info[2].SerialNumber.ShouldBe("2016010510008434");
        }

        [Test]
        public void Test_Read_Sheet2()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "抱怨量2.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<ComplainExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 15);
            info[0].Longtitute.ShouldBe(112.89, 1E-6);
            info[0].Lattitute.ShouldBe(23.3457);
            info[1].Longtitute.ShouldBe(0);
            info[2].Lattitute.ShouldBe(0);
            info[4].Longtitute.ShouldBe(113.1872);
            info[4].Lattitute.ShouldBe(23.0057);
            info[1].CandidateDistrict.ShouldBe("");
            info[2].SerialNumber.ShouldBe("2016022110007894");
        }

        [Test]
        public void Test_Read_Sheet3()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "抱怨量3.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<ComplainExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 12);
            info[0].Longtitute.ShouldBe(0);
            info[0].Lattitute.ShouldBe(0);
            info[1].Longtitute.ShouldBe(0);
            info[2].Lattitute.ShouldBe(0);
            info[3].Longtitute.ShouldBe(113.132);
            info[3].Lattitute.ShouldBe(22.0023);
            info[1].CandidateDistrict.ShouldBe("");
            info[2].SerialNumber.ShouldBe("2016040710008333");
        }
    }
}
