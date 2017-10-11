using Lte.Domain.LinqToExcel;
using NUnit.Framework;
using System;
using System.Data;
using System.IO;
using System.Linq;

namespace Lte.Domain.Test.LinqToExcel
{
    [TestFixture]
    public class InvalidColumnNamesUsed
    {
        private string _excelFileName;

        [OneTimeSetUp]
        public void fs()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "Companies.xls");
        }

        [Test]
        public void row_column_in_where_clause()
        {
            Assert.Throws<DataException>(() =>
            {
                var list = (from x in ExcelQueryFactory.Worksheet("Sheet1", _excelFileName)
                    where x["Bad Column"].ToString() == "nothing"
                    select x).ToList();
            }, "'Bad Column' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void row_column_in_orderby_clause()
        {
            Assert.Throws<DataException>(() =>
            {
                var list = (from x in ExcelQueryFactory.Worksheet("Sheet1", _excelFileName)
                        select x)
                    .OrderBy(x => x["Bad Column"])
                    .ToList();
            }, "'Bad Column' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_in_where_clause()
        {
            Assert.Throws<DataException>(() =>
            {
                var list = (from x in ExcelQueryFactory.Worksheet<CompanyWithCity>("Sheet1", _excelFileName)
                    where x.City == "Omaha"
                    select x).ToList();
            }, "'City' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_mapping_in_where_clause()
        {
            Assert.Throws<DataException>(() =>
            {
                var excel = new ExcelQueryFactory(_excelFileName);
                excel.AddMapping<CompanyWithCity>(x => x.City, "Town");
                var list = (from x in excel.Worksheet<CompanyWithCity>("Sheet1")
                    where x.City == "Omaha"
                    select x).ToList();
            }, "'Town' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_in_orderby_clause()
        {
            Assert.Throws<DataException>(() =>
            {
                var list = (from x in ExcelQueryFactory.Worksheet<CompanyWithCity>("Sheet1", _excelFileName)
                        select x)
                    .OrderBy(x => x.City)
                    .ToList();
            }, "'City' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_mapping_in_orderby_clause()
        {
            Assert.Throws<DataException>(() =>
            {
                var excel = new ExcelQueryFactory(_excelFileName);
                excel.AddMapping<CompanyWithCity>(x => x.City, "Town");
                var list = (from x in excel.Worksheet<CompanyWithCity>("Sheet1")
                        select x)
                    .OrderBy(x => x.City)
                    .ToList();
            }, "'Town' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_in_average_aggregate()
        {
            Assert.Throws<DataException>(() =>
            {
                var excel = new ExcelQueryFactory(_excelFileName);
                excel.AddMapping<CompanyWithCity>(x => x.EmployeeCount, "Employees");
                var list = (from x in excel.Worksheet<CompanyWithCity>("Sheet1")
                        select x)
                    .Average(x => x.EmployeeCount);
            }, "'Employees' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_in_max_aggregate()
        {
            Assert.Throws<DataException>(() =>
            {
                var excel = new ExcelQueryFactory(_excelFileName);
                excel.AddMapping<CompanyWithCity>(x => x.EmployeeCount, "Employees");
                var list = (from x in excel.Worksheet<CompanyWithCity>("Sheet1")
                        select x)
                    .Max(x => x.EmployeeCount);
            }, "'Employees' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_in_min_aggregate()
        {
            Assert.Throws<DataException>(() =>
            {
                var excel = new ExcelQueryFactory(_excelFileName);
                excel.AddMapping<CompanyWithCity>(x => x.EmployeeCount, "Employees");
                var list = (from x in excel.Worksheet<CompanyWithCity>("Sheet1")
                        select x)
                    .Min(x => x.EmployeeCount);
            }, "'Employees' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }

        [Test]
        public void bad_column_in_sum_aggregate()
        {
            Assert.Throws<DataException>(() =>
            {
                var excel = new ExcelQueryFactory(_excelFileName);
                excel.AddMapping<CompanyWithCity>(x => x.EmployeeCount, "Employees");
                var list = (from x in excel.Worksheet<CompanyWithCity>("Sheet1")
                        select x)
                    .Sum(x => x.EmployeeCount);
            }, "'Employees' is not a valid column name. " +
               "Valid column names are: 'Name', 'CEO', 'EmployeeCount', 'StartDate'");
        }
    }
}
