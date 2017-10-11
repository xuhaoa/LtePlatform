using Lte.Domain.LinqToExcel;
using Lte.Domain.Test.LinqToExcel;
using Lte.MySqlFramework.Entities;
using NUnit.Framework;
using System;
using System.IO;
using System.Linq;
using Lte.Domain.Common;

namespace Lte.Parameters.Test.Kpi
{
    public class CdmaTopKpiExcelTest : SQLLogStatements_Helper
    {
        ExcelQueryFactory _repo;
        string _excelFileName;
        
        public CdmaTopKpiExcelTest()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "佛山.xls");
        }

        [SetUp]
        public void s()
        {
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
        }

        [Test]
        public void Test_TopDrop2G()
        {
            var info = (from c in _repo.Worksheet<TopDrop2GCellExcel>(TopDrop2GCellExcel.SheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 30);
        }

        [Test]
        public void Test_TopConnection3G()
        {
            var info = (from c in _repo.Worksheet<TopConnection3GCellExcel>(TopConnection3GCellExcel.SheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 30);
        }
    }
}
