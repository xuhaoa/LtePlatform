using Lte.Domain.LinqToExcel;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;

namespace Lte.Domain.Test.LinqToExcel
{
    [TestFixture]
    public class UnSupportedMethods
    {
        [Test]
        public void contains()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                    select c).Contains(new Company());
            }, "LinqToExcel does not provide support for the Contains() method");
        }

        [Test]
        public void default_if_empty()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                    select c).DefaultIfEmpty().ToList();
            }, "LinqToExcel does not provide support for the DefaultIfEmpty() method");
        }

        [Test]
        public void except()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                    select c).Except(new List<Company>()).ToList();
            }, "LinqToExcel does not provide support for the Except() method");
        }

        [Test]
        public void group()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                    group c by c.CEO
                    into g
                    select g;
                try
                {
                    companies.ToList();
                }
                catch (OleDbException)
                {
                }
            }, "LinqToExcel does not provide support for the Group() method");
        }

        [Test]
        public void intersect()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        select c.CEO).Intersect(
                        from d in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        select d.CEO)
                    .ToList();
            }, "LinqToExcel does not provide support for the Intersect() method");
        }

        [Test]
        public void of_type()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                    select c).OfType<object>().ToList();
            }, "LinqToExcel does not provide support for the OfType() method");
        }

        [Test]
        public void single()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                    select c).Single();
            }, "LinqToExcel does not provide support for the Single() method. Use the First() method instead");
        }

        [Test]
        public void union()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        select c).Union(
                        from d in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        select d)
                    .ToList();
            }, "LinqToExcel does not provide support for the Union() method");
        }

        [Test]
        public void join()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        join d in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        on c.CEO equals d.CEO
                        select d)
                    .ToList();
            }, "LinqToExcel does not provide support for the Join() method");
        }

        [Test]
        public void distinct_on_whole_row()
        {
            Assert.Throws<NotSupportedException>(() =>
                {
                    var companies = (from c in ExcelQueryFactory.Worksheet<Company>(null, "", null)
                        select c).Distinct().ToList();
                },
                "LinqToExcel only provides support for the Distinct() method when it's mapped to a class and a single property is selected. " +
                "[e.g. (from row in excel.Worksheet<Person>() select row.FirstName).Distinct()]");

        }

        [Test]
        public void distinct_on_no_header()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var excel = new ExcelQueryFactory("");
                var companies = (from c in excel.WorksheetNoHeader()
                    select c).Distinct().ToList();
            }, "LinqToExcel only provides support for the Distinct() method " +
               "when it's mapped to a class and a single property is selected. " +
               "[e.g. (from row in excel.Worksheet<Person>() select row.FirstName).Distinct()]");
        }

        [Test]
        public void distinct_on_no_header_with_selected_column()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var excel = new ExcelQueryFactory("");
                var companies = (from c in excel.WorksheetNoHeader()
                    select c[0]).Distinct().ToList();
            }, "LinqToExcel only provides support for the Distinct() method " +
               "when it's mapped to a class and a single property is selected. " +
               "[e.g. (from row in excel.Worksheet<Person>() select row.FirstName).Distinct()]");
        }

        [Test]
        public void distinct_on_row()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var excel = new ExcelQueryFactory("");
                var companies = (from c in excel.Worksheet()
                    select c).Distinct().ToList();
            }, "LinqToExcel only provides support for the Distinct() method " +
               "when it's mapped to a class and a single property is selected. " +
               "[e.g. (from row in excel.Worksheet<Person>() select row.FirstName).Distinct()]");
        }

        [Test]
        public void distinct_on_row_with_selected_column()
        {
            Assert.Throws<NotSupportedException>(() =>
            {
                var excel = new ExcelQueryFactory("");
                var companies = (from c in excel.Worksheet()
                    select c["Name"]).Distinct().ToList();
            }, "LinqToExcel only provides support for the Distinct() method " +
               "when it's mapped to a class and a single property is selected. " +
               "[e.g. (from row in excel.Worksheet<Person>() select row.FirstName).Distinct()]");
        }
    }
}
