using Lte.Domain.Common;
using Lte.Domain.LinqToExcel;
using Lte.Domain.Test.LinqToExcel;
using NUnit.Framework;
using Shouldly;
using System;
using System.IO;
using System.Linq;

namespace Lte.Parameters.Test.Excel
{
    [TestFixture]
    public class CellExcelTest : SQLLogStatements_Helper
    {

        ExcelQueryFactory _repo;
        string _excelFileName;
        string _worksheetName;
        
        public CellExcelTest()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "Cell.xlsx");
            _worksheetName = "小区级";
        }

        [SetUp]
        public void s()
        {
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
        }

        [Test]
        public void Test_Read_Sheet()
        {
            var info = (from c in _repo.Worksheet<CellExcel>(_worksheetName)
                select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 9);
            info[0].ENodebId.ShouldBe(870238);
            info[0].PlanNum.ShouldBe("FSL13996");
            info[1].SectorId.ShouldBe((byte)0);
            info[2].AntennaInfo.ShouldBe("6端口三频C/F/T");
        }
    }
}
