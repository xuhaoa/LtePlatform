using Lte.Domain.LinqToExcel;
using NUnit.Framework;
using System;
using System.IO;
using System.Linq;

namespace Lte.Domain.Test.LinqToExcel
{
    [TestFixture]
    public class ConfiguredWorksheetName_IntegrationTests : SQLLogStatements_Helper
    {
        private string _excelFileName;
        
        public ConfiguredWorksheetName_IntegrationTests() : base()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "Companies.xls");
        }

        [SetUp]
        public void s()
        {
            ClearLogEvents();
        }

        [Test]
        public void data_is_read_from_correct_worksheet()
        {
            var companies = from c in ExcelQueryFactory.Worksheet<Company>("More Companies", _excelFileName)
                            select c;

            Assert.AreEqual(3, companies.ToList().Count);
        }

        [Test]
        public void worksheetIndex_of_2_uses_third_table_name_orderedby_name()
        {
            var companies = (from c in ExcelQueryFactory.Worksheet<Company>(2, _excelFileName)
                             select c).ToList();

            const string expectedSql = "SELECT * FROM [More Companies$]";
            Assert.AreEqual(expectedSql, GetSQLStatement(), "SQL Statement");
        }

        [Test]
        public void worksheetIndex_too_high_throws_exception()
        {
            Assert.Throws<System.Data.DataException>(() =>
            {
                var companies = from c in ExcelQueryFactory.Worksheet<Company>(8, _excelFileName)
                    select c;

                companies.ToList();
            });

        }
    }
}
