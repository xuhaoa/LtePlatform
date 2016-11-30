using Lte.Domain.LinqToExcel;
using Lte.Domain.LinqToExcel.Entities;
using Lte.Domain.Regular;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Lte.Domain.Test.LinqToExcel
{
    [TestFixture]
    public class Excel2007_IntegrationTests
    {
        string _filesDirectory;

        [TestFixtureSetUp]
        public void fs()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            _filesDirectory = Path.Combine(testDirectory, "ExcelFiles");
        }

        [Test]
        public void xlsx()
        {
            var fileName = Path.Combine(_filesDirectory, "Companies.xlsx");
            var companies = from c in ExcelQueryFactory.Worksheet<Company>("MoreCompanies", fileName)
                            select c;

            //Using ToList() because using Count() first would change the sql 
            //string to "SELECT COUNT(*)" which we're not testing here
            Assert.AreEqual(3, companies.ToList().Count);
        }

        [Test]
        public void xlsm()
        {
            var fileName = Path.Combine(_filesDirectory, "Companies.xlsm");
            var companies = from c in ExcelQueryFactory.Worksheet<Company>("MoreCompanies", fileName, null)
                            select c;

            //Using ToList() because using Count() first would change the sql 
            //string to "SELECT COUNT(*)" which we're not testing here
            Assert.AreEqual(3, companies.ToList().Count);
        }
        
        [Test]
        public void xls_with_Ace_DatabaseEngine()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            var excelFileName = Path.Combine(excelFilesDirectory, "Companies.xls");

            var excel = new ExcelQueryFactory(excelFileName);
            excel.DatabaseEngine = ExcelDatabaseEngine.Ace;
            var companies = from c in excel.Worksheet<Company>()
                            select c;

            Assert.AreEqual(7, companies.ToList().Count);
        }

        [Test]
        public void ConverToIntTest()
        {
            var number = ("02344").ConvertToInt(0);
            Assert.AreEqual(number,2344);
        }
    }

    [TestFixture]
    public class Process
    {

        [Test]
        public void test_match10()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            var excelFileName = Path.Combine(excelFilesDirectory, "match10.csv");
            var stream=new StreamReader(excelFileName);
            var outputFileName = Path.Combine(excelFilesDirectory, "output.csv");
            var count = 0;
            var records=new List<Record>();
            while (true)
            {
                var line = stream.ReadLine();
                if (line==null) break;
                var fields = line.Split(',');

                if (fields.Length > 3)
                {
                    records.Add(new Record
                    {
                        UserId = fields[0].Replace("'", ""),
                        Url = fields[1].Replace("'", ""),
                        Times = fields[fields.Length-1].Replace("'", "").ConvertToInt(0)
                    });
                }
                else if (fields.Length==3)
                {
                    records.Add(new Record
                    {
                        UserId = fields[0].Replace("'", ""),
                        Url = fields[1].Replace("'", ""),
                        Times = fields[2].Replace("'", "").ConvertToInt(0)
                    });
                }
                count++;
            } 
            Assert.AreEqual(count, 3000000);
            Assert.AreEqual(records[0].UserId, "00008d13724");
            Assert.AreEqual(records[0].Url, "http://i.thsi.cn/Mobileicon/gPhone/gupiaokaihu20160601g.png");
            Assert.AreEqual(records[0].Times, 103925);
            var payingRecords = records.Where(x => x.Url.StartsWith("http://m.360buyimg.com/") || x.Url.StartsWith("http://alipay")).GroupBy(x=>x.UserId).Select(u =>new
            {
                UserId = u.Key,
                TotalTimes = u.Sum(g=>g.Times),
                JingdongTimes = u.Where(g=>g.Url.StartsWith("http://m.360buyimg.com/")).Sum(g=>g.Times),
                AliTimes = u.Where(g => g.Url.StartsWith("http://alipay")).Sum(g => g.Times)
            });
            var totalRecords=records.GroupBy(x => x.UserId).Select(u => new
            {
                UserId = u.Key,
                TotalTimes = u.Sum(g => g.Times)
            });
            var results = from lr in payingRecords join ttri in totalRecords on lr.UserId equals ttri.UserId select new 
            {
                UserId = lr.UserId,
                Factor = lr.TotalTimes/10 + ttri.TotalTimes,
                lr.JingdongTimes,
                lr.AliTimes
            };
            //Assert.AreEqual(results.Count(), 14363);
            var writer = new StreamWriter(outputFileName);
            foreach (var result in results)
            {
                writer.WriteLine(result.UserId+","+result.Factor+","+result.JingdongTimes+","+result.AliTimes);
            }
            //Assert.AreEqual(line, "'00008d13724','http://i.thsi.cn/Mobileicon/gPhone/gupiaokaihu20160601g.png','103925'");
            stream.Close();
        }
        
    }

    internal class Record
    {
        public string UserId { get; set; }

        public string Url { get; set; }

        public int Times { get; set; }
    }
}
