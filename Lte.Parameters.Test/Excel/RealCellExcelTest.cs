using System;
using System.IO;
using System.Linq;
using Lte.Domain.Common;
using Lte.Domain.LinqToExcel;
using Lte.Domain.Test.LinqToExcel;
using Lte.MySqlFramework.Entities;
using NUnit.Framework;
using Shouldly;

namespace Lte.Parameters.Test.Excel
{
    [TestFixture]
    public class RealCellExcelTest : SQLLogStatements_Helper
    {
        ExcelQueryFactory _repo;
        string _excelFileName;
        string _worksheetName;

        [TestFixtureSetUp]
        public void fs()
        {
            InstantiateLogger();
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "佛山无线中心LTE工参-20151105.xlsx");
            _worksheetName = "小区级";
        }

        [SetUp]
        public void s()
        {
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
        }

        [Test]
        public void Test_ReadCells_Sheet()
        {
            var info = (from c in _repo.Worksheet<CellExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 14999);
            var longtitutes = info.Select(x => x.Longtitute).Where(x => x > 112 && x < 114);
            longtitutes.Count().ShouldBe(14999);
        }
    }

    public class OnlineSustainTests : SQLLogStatements_Helper
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
            _worksheetName = "Sheet1";
        }

        [Test]
        public void Test_Read_Sheet()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "Online1.xlsx");
            _repo = new ExcelQueryFactory {FileName = _excelFileName};
            var info = (from c in _repo.Worksheet<OnlineSustainExcel>(_worksheetName)
                select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 2);
        }

        [Test]
        public void Test_Read_Sheet2()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "在线支撑1.xlsx");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<OnlineSustainExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 24);
        }

        [Test]
        public void Test_Read_Sheet3()
        {
            _excelFileName = Path.Combine(_excelFilesDirectory, "在线支撑.xlsx");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<OnlineSustainExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 3349);
        }
    }
}
