﻿using Lte.Domain.LinqToExcel;
using NUnit.Framework;
using System.Data.OleDb;
using System.Linq;

namespace Lte.Domain.Test.LinqToExcel
{
    [TestFixture]
    public class ConfiguredWorksheetName_SQLStatements_UnitTests : SQLLogStatements_Helper
    {
        public ConfiguredWorksheetName_SQLStatements_UnitTests() : base()
        {
        }

        [SetUp]
        public void Setup()
        {
            ClearLogEvents();
        }

        [Test]
        public void table_name_in_sql_statement_matches_configured_table_name()
        {
            var companies = from c in ExcelQueryFactory.Worksheet<Company>("Company Worksheet", "")
                            select c;

            try { companies.GetEnumerator(); }
            catch (OleDbException) { }
            const string expectedSql = "SELECT * FROM [Company Worksheet$]";
            Assert.AreEqual(expectedSql, GetSQLStatement());
        }
    }
}
