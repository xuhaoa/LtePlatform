using Lte.Domain.LinqToExcel;
using Lte.Domain.Test.LinqToExcel;
using Lte.MySqlFramework.Entities;
using NUnit.Framework;
using Shouldly;
using System;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using Castle.Components.DictionaryAdapter.Xml;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

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

        [Test]
        public void Test_Read_Sheet3()
        {
            var excelFilesDirectory = Path.Combine(_testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "综合查询信息表-归档工单20170614.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<WorkItemExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 135);
            info[0].CauseDescription.ShouldBe("基站设施被盗");
            info[1].CauseDescription.GetEnumType<WorkItemCause>().ShouldBe(WorkItemCause.Overload);
            info[2].BeginTime.ToLongDateString().ShouldBe("2017年3月16日");
            info[3].Comments.ShouldBe("[2017-03-19 10:11:03]【2017年03月18日（请求次数：12187；业务优良率（%）：65.97；总流量（MB）：105.95；）2017年03月17日（请求次数：10906；业【2017年03月18日（请求次数：12187；业务优良率（%）：65.97；总流量（MB）：105.95；）2017年03月17日（请求次数：10906；业务优良率（%）：61.62；总流量（MB）：236.87；）2017年03月16日（请求次数：17584；业务优良率（%）：65.72；总流量（MB）：283.61；】");
            info[4].Deadline.ToLongDateString().ShouldBe("2017年3月30日");
            info[5].Position.ShouldBe("/Ne=高明纺院网络机房LBBU3_1");
            info[5].ENodebPart.ShouldBe("enb_id：502541");
            info[5].ENodebId.ShouldBe(502541);
            info[5].SectorId.ShouldBe((byte)49);
            info[18].ENodebId.ShouldBe(502458);
            info[5].FinishTime.ShouldNotBeNull();
            info[5].FinishTime?.ToLongDateString().ShouldBe("2017年3月29日");
            info[6].SerialNumber.ShouldBe("GDNOC-20170322-02541");
            info[7].CauseDescription.ShouldBe("疑似终端或用户原因");
            info[8].StaffName.ShouldBe("/直属单位/网络监控维护中心/网络监控室/");
            info[9].StateDescription.ShouldBe("已归档");
            info[9].StateDescription.GetEnumType<WorkItemState>().ShouldBe(WorkItemState.Finished);
            info[10].SubTypeDescription.ShouldBe("小区连续3天感知差");
            info[10].SubTypeDescription.GetEnumType<WorkItemSubtype>().ShouldBe(WorkItemSubtype.BadFeeling);
            info[11].TypeDescription.ShouldBe("/移动业务感知/无线/综合感知/");

            for (var i = 0; i < 135; i++)
            {
                Console.WriteLine(" i=: " + i + "  " + info[i].Comments);
                
            }
        }

        [Test]
        public void Test_Read_Sheet4()
        {
            var excelFilesDirectory = Path.Combine(_testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "综合查询信息表-在途工单20170614.xls");
            _repo = new ExcelQueryFactory { FileName = _excelFileName };
            var info = (from c in _repo.Worksheet<WorkItemExcel>(_worksheetName)
                        select c).ToList();

            Assert.IsNotNull(info);
            Assert.AreEqual(info.Count, 64);
            info[0].CauseDescription.ShouldBe("");
            info[1].CauseDescription.GetEnumType<WorkItemCause>().ShouldBe(WorkItemCause.Others);
            info[2].BeginTime.ToLongDateString().ShouldBe("2017年3月29日");
            info[3].Comments.ShouldBe("[2017-03-30 06:03:52]问题判决条件:小区连续两天满足，存在两个小时，且PRB上行控制信道干扰大于-100dbm，且全天PDCP层总流量>50M，全天最大激活用户数>3）。恢复判决条件:连续4天均不符合故障筛选天特征。噪声干扰指标值:2017-03-29,0/-97.8,1/-99.3,2/-99.4,3/-100.2,4/-100.8,5/-100.3,6/-100,7/-99.1,8/-100,9/-99.3,10/-99.6,11/-99.8,12/-98.8,13/-99.6,14/-100.7,15/-99.7,16/-100.5,17/-100.1,18/-99.3,19/-99.2,20/-99,21/-99.3,22/-98.6,23/-98.4。联系方式：曾涛，18998291989，zengt8.gd@chinatelecom.cn");
            info[4].Deadline.ToLongDateString().ShouldBe("2017年4月30日");
            info[5].Position.ShouldBe("/Ne=地市:佛山_500157_0:大良银畔丽苑_0");
            info[5].ENodebPart.ShouldBe(null);
            info[5].ENodebId.ShouldBe(500157);
            info[5].SectorId.ShouldBe((byte)0);
            info[18].ENodebId.ShouldBe(502100);
            info[5].FinishTime.ShouldBe(null);
            info[6].SerialNumber.ShouldBe("GDNOC-20170405-00752");
            info[7].CauseDescription.ShouldBe("");
            info[8].StaffName.ShouldBe("/直属单位/网络监控维护中心/网络监控室/");
            info[9].StateDescription.ShouldBe("待回单");
            info[9].StateDescription.GetEnumType<WorkItemState>().ShouldBe(WorkItemState.Processing);
            info[10].SubTypeDescription.ShouldBe("PRB上行控制信道严重干扰");
            info[10].SubTypeDescription.GetEnumType<WorkItemSubtype>().ShouldBe(WorkItemSubtype.PrbUplinkSevereInterference);
            info[11].TypeDescription.ShouldBe("/移动业务感知/无线/综合感知/");
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
