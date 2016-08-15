using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.MapperSerive.Kpi;
using Lte.Evaluations.Policy;
using Lte.Evaluations.ViewModels;
using Lte.Evaluations.ViewModels.Channel;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Channel;
using Lte.Parameters.Entities.Dt;
using Lte.Parameters.Entities.ExcelCsv;
using NUnit.Framework;
using Shouldly;

namespace Lte.Evaluations.MapperService
{
    [TestFixture]
    public class TopCellQueriesServiceTest
    {
        [Test]
        public void Test_OneItem()
        {
            var stats = new List<TopDrop2GCell>
            {
                new TopDrop2GCell
                {
                    BtsId = 1,
                    SectorId = 2,
                    StatTime = DateTime.Parse("2015-1-1"),
                    Drops = 100,
                    TrafficAssignmentSuccess = 1200
                }
            };
            var trends = stats.QueryTrends();
            Assert.AreEqual(trends.Count(), 1);
            var trend = trends.ElementAt(0);
            trend.BtsId.ShouldBe(1);
            trend.SectorId.ShouldBe((byte)2);
            trend.TopDates.ShouldBe(1);
            trend.TotalDrops.ShouldBe(100);
            trend.TotalCallAttempst.ShouldBe(1200);
        }

        [TestCase(1, 1, new[] {1, 200}, new[] {2100, 291})]
        [TestCase(1, 2, new[] { 1098, 220 }, new[] { 2300, 2191 })]
        [TestCase(3, 4, new[] { 1, 200, 2134 }, new[] { 2100, 291, 74 })]
        public void Test_MultiItems_SameCell(int btsId, byte sectorId, int[] drops, int[] calls)
        {
            var stats = drops.Select((t, i) => new TopDrop2GCell
            {
                BtsId = btsId,
                SectorId = sectorId,
                StatTime = DateTime.Parse("2015-1-1"),
                Drops = t,
                TrafficAssignmentSuccess = calls[i]
            });
            var trends = stats.QueryTrends();
            Assert.AreEqual(trends.Count(), 1);
            var trend = trends.ElementAt(0);
            trend.BtsId.ShouldBe(btsId);
            trend.SectorId.ShouldBe(sectorId);
            trend.TopDates.ShouldBe(drops.Length);
            trend.TotalDrops.ShouldBe(drops.Sum());
            trend.TotalCallAttempst.ShouldBe(calls.Sum());
        }
        
        [TestCase(new[] {1, 1}, new byte[] {2, 3}, new[] { 1, 200 }, new[] { 2100, 291 })]
        [TestCase(new[] {1, 3}, new byte[] {2, 2}, new[] { 1098, 220 }, new[] { 2300, 2191 })]
        [TestCase(new[] {1,1,2}, new byte[] {2,3,3}, new[] { 1, 200, 2134 }, new[] { 2100, 291, 74 })]
        public void Test_MultiItems_DifferentCells(int[] btsIds, byte[] sectorIds, int[] drops, int[] calls)
        {
            var stats = drops.Select((t, i) => new TopDrop2GCell
            {
                BtsId = btsIds[i],
                SectorId = sectorIds[i],
                StatTime = DateTime.Parse("2015-1-1"),
                Drops = t,
                TrafficAssignmentSuccess = calls[i]
            });
            var trends = stats.QueryTrends();
            trends.Count().ShouldBe(btsIds.Length);
            for (var i = 0; i < btsIds.Length; i++)
            {
                var trend = trends.ElementAt(i);
                trend.BtsId.ShouldBe(btsIds[i]);
                trend.SectorId.ShouldBe(sectorIds[i]);
                trend.TopDates.ShouldBe(1);
                trend.TotalDrops.ShouldBe(drops[i]);
                trend.TotalCallAttempst.ShouldBe(calls[i]);
            }
        }
    }

    [TestFixture]
    public class CellConstructionTest
    {
        private readonly ITypeFinder _typeFinder = new TypeFinder(new MyAssemblyFinder());

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
        }

        [TestCase(1233, 23, 12.345, 1, "1T1R", 1.0, "1T1R")]
        [TestCase(1253, 23, 223.45, 1825, "否", 3.2, "2T2R")]
        [TestCase(1353, 33, 27.34, 119, "DO", 4.2, "1T1R")]
        [TestCase(1353, 33, 27.34, 160, "DO", 4.2, "1T1R")]
        [TestCase(1353, 33, 2.734, 201, "否 ", 1.6, "2T4R")]
        [TestCase(1353, 33, 273.4, 75, "否 ", 3.2, "2T4R")]
        [TestCase(1353, 33, 27.34, 283, "2T4R", 6.4, "1T1R")]
        [TestCase(1353, 33, 2.734, 1013, "否", 1.28, "2T4R")]
        [TestCase(1353, 33, 27.34, 100, "4T4R", 0.9, "4T4R")]
        public void Test_NewCell(int eNodebId, byte sectorId, double longtitute, short frequency, string isIndoor,
            double azimuth, string antConfig)
        {
            var cellExcelInfo = new CellExcel
            {
                ENodebId = eNodebId,
                SectorId = sectorId,
                Longtitute = longtitute,
                Frequency = frequency,
                IsIndoor = isIndoor,
                AntennaGain = 12.8,
                Azimuth = azimuth,
                TransmitReceive = antConfig
            };
            var cell = Mapper.Map<CellExcel, Cell>(cellExcelInfo);
            Assert.IsNotNull(cell);
            Assert.AreEqual(cell.ENodebId, eNodebId);
            Assert.AreEqual(cell.SectorId, sectorId);
            Assert.AreEqual(cell.Longtitute, longtitute);
            Assert.AreEqual(cell.IsOutdoor, isIndoor.Trim() == "否");
            Assert.AreEqual(cell.AntennaGain, 12.8);
            Assert.AreEqual(cell.Azimuth, azimuth, "azimuth");
            Assert.AreEqual(cell.AntennaPorts, antConfig.GetEnumType<AntennaPortsConfigure>());
        }

        [TestCase(1233, 23, 1234, 37, "DO", 1, true)]
        [TestCase(1253, 23, 2234, 78, "DO", 2, true)]
        [TestCase(1353, 33, 2734, 119, "DO", 4, true)]
        [TestCase(1353, 33, 2734, 160, "1X", 8, true)]
        [TestCase(1353, 33, 2734, 201, "DO", 16, true)]
        [TestCase(1353, 33, 2734, 242, "1X", 32, true)]
        [TestCase(1353, 33, 2734, 283, "DO", 64, true)]
        [TestCase(1353, 33, 2734, 1013, "DO", 128, true)]
        [TestCase(1353, 33, 2734, 120, "DO", 0, false)]
        public void Test_NewCell(int btsId, byte sectorId, int cellId, short frequency, string cellType,
            int overallFrequency, bool updateFrequency)
        {
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = 12.8
            };
            var cell = CdmaCell.ConstructItem(cellExcelInfo);
            Assert.IsNotNull(cell);
            Assert.AreEqual(cell.BtsId, btsId);
            Assert.AreEqual(cell.SectorId, sectorId);
            Assert.AreEqual(cell.CellId, cellId);
            Assert.AreEqual(cell.CellType, cellType);
            Assert.AreEqual(cell.AntennaGain, 12.8);
            Assert.AreEqual(cell.Frequency, overallFrequency, "Wrong overall frequency");
            Assert.AreEqual(cell.Frequency2, -1);
            Assert.AreEqual(cell.Frequency3, -1);
            Assert.AreEqual(cell.Frequency4, -1);
            Assert.AreEqual(cell.Frequency5, -1);
            if (updateFrequency)
            {
                Assert.AreEqual(cell.Frequency1, frequency);
                Assert.IsTrue(cell.HasFrequency(frequency));
            }
            else
            {
                Assert.AreEqual(cell.Frequency1, -1);
                Assert.IsFalse(cell.HasFrequency(frequency));
            }
        }

        [TestCase(1233, 23, 1234, 37, "DO", 13.6, 1)]
        [TestCase(1253, 23, 2234, 78, "DO", 14.7, 2)]
        [TestCase(1353, 33, 2734, 119, "DO", 12.1, 4)]
        [TestCase(1353, 33, 2734, 160, "1X", 11.3, 8)]
        [TestCase(1353, 33, 2734, 201, "DO", 8.7, 16)]
        [TestCase(1353, 33, 2734, 242, "1X", 9.4, 32)]
        [TestCase(1353, 33, 2734, 283, "DO", 21.1, 64)]
        [TestCase(1353, 33, 2734, 1013, "DO", 13.1, 128)]
        [TestCase(1353, 33, 2734, 120, "DO", 11.7, 0)]
        public void Test_Import_UpdateFirstFrequency(
            int btsId, byte sectorId, int cellId, short frequency, string cellType, double antennaGain,
            short overallFrequency)
        {
            var cell = new CdmaCell
            {
                BtsId = 1,
                SectorId = 2,
                CellId = 3,
                Frequency = 0,
                CellType = "DO",
                AntennaGain = 12.8,
                Frequency1 = -1
            };
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = antennaGain
            };
            cell.Import(cellExcelInfo);
            Assert.AreEqual(cell.BtsId, 1, "btsId");
            Assert.AreEqual(cell.SectorId, 2);
            Assert.AreEqual(cell.CellId, 3);
            Assert.AreEqual(cell.CellType, "DO");
            Assert.AreEqual(cell.Frequency, overallFrequency, "frequency");
            Assert.AreEqual(cell.Frequency1, overallFrequency == 0 ? -1 : frequency, "frequency1");
            Assert.AreEqual(cell.AntennaGain, overallFrequency != 0 ? antennaGain : 12.8);
            Assert.AreEqual(cell.HasFrequency(frequency), overallFrequency != 0);
        }

        [TestCase(1233, 23, 1234, 37, "DO", 13.6, 1)]
        [TestCase(1253, 23, 2234, 78, "DO", 14.7, 3)]
        [TestCase(1353, 33, 2734, 119, "DO", 12.1, 5)]
        [TestCase(1353, 33, 2734, 160, "1X", 11.3, 9)]
        [TestCase(1353, 33, 2734, 201, "DO", 8.7, 17)]
        [TestCase(1353, 33, 2734, 242, "1X", 9.4, 33)]
        [TestCase(1353, 33, 2734, 283, "DO", 21.1, 65)]
        [TestCase(1353, 33, 2734, 1013, "DO", 13.1, 129)]
        [TestCase(1353, 33, 2734, 120, "DO", 11.7, 1)]
        public void Test_Import_UpdateSecondFrequency(
            int btsId, byte sectorId, int cellId, short frequency, string cellType, double antennaGain,
            short overallFrequency)
        {
            var cell = new CdmaCell
            {
                BtsId = 1,
                SectorId = 2,
                CellId = 3,
                Frequency = 1,
                CellType = "DO",
                AntennaGain = 12.8,
                Frequency1 = 37
            };
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = antennaGain
            };
            cell.Import(cellExcelInfo);
            Assert.AreEqual(cell.BtsId, 1, "btsId");
            Assert.AreEqual(cell.SectorId, 2);
            Assert.AreEqual(cell.CellId, 3);
            Assert.AreEqual(cell.CellType, "DO");
            Assert.AreEqual(cell.Frequency, overallFrequency, "frequency");
            Assert.AreEqual(cell.Frequency1, 37);
            Assert.AreEqual(cell.Frequency2, frequency == 37 || !frequency.IsCdmaFrequency() ? -1 : frequency);
            Assert.AreEqual(cell.AntennaGain, !frequency.IsCdmaFrequency() || frequency == 37 ? 12.8 : antennaGain);
        }

        [TestCase(1233, 23, 1234, 37, "DO", 13.6, 3)]
        [TestCase(1253, 23, 2234, 78, "DO", 14.7, 3)]
        [TestCase(1353, 33, 2734, 119, "DO", 12.1, 7)]
        [TestCase(1353, 33, 2734, 160, "1X", 11.3, 11)]
        [TestCase(1353, 33, 2734, 201, "DO", 8.7, 19)]
        [TestCase(1353, 33, 2734, 242, "1X", 9.4, 35)]
        [TestCase(1353, 33, 2734, 283, "DO", 21.1, 67)]
        [TestCase(1353, 33, 2734, 1013, "DO", 13.1, 131)]
        [TestCase(1353, 33, 2734, 120, "DO", 11.7, 3)]
        public void Test_Import_UpdateThirdFrequency(
            int btsId, byte sectorId, int cellId, short frequency, string cellType, double antennaGain,
            short overallFrequency)
        {
            var cell = new CdmaCell
            {
                BtsId = 1,
                SectorId = 2,
                CellId = 3,
                Frequency = 3,
                CellType = "DO",
                AntennaGain = 12.8,
                Frequency1 = 37,
                Frequency2 = 78
            };
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = antennaGain
            };
            cell.Import(cellExcelInfo);
            Assert.AreEqual(cell.BtsId, 1, "btsId");
            Assert.AreEqual(cell.SectorId, 2);
            Assert.AreEqual(cell.CellId, 3);
            Assert.AreEqual(cell.CellType, "DO");
            Assert.AreEqual(cell.Frequency, overallFrequency, "frequency");
            Assert.AreEqual(cell.Frequency1, 37);
            Assert.AreEqual(cell.Frequency2, 78);
            Assert.AreEqual(cell.Frequency3, frequency == 37 || frequency == 78 || !frequency.IsCdmaFrequency() ? -1 : frequency);
            Assert.AreEqual(cell.AntennaGain, frequency == 37 || frequency == 78 || !frequency.IsCdmaFrequency() ? 12.8 : antennaGain);
        }
    }

    [TestFixture]
    public class Precise4GSectorTest
    {
        private readonly ITypeFinder _typeFinder = new TypeFinder(new MyAssemblyFinder());

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
        }

        [Test]
        public void Test_FileRecordCoverage2G()
        {
            var record = new FileRecord2G
            {
                Ecio = null,
                Lattitute = 112.3344,
                Longtitute = null,
                RxAgc = 1.2,
                TxPower = null
            };
            var view = record.MapTo<FileRecordCoverage2G>();
            view.Ecio.ShouldBe(0);
            view.Longtitute.ShouldBe(0);
            view.Lattitute.ShouldBe(112.3344);
            view.RxAgc.ShouldBe(1.2);
            view.TxPower.ShouldBe(0);
        }

        [Test]
        public void Test_FlowHuawei()
        {
            var item = new FlowHuawei
            {
                AverageActiveUsers = 1,
                DownlinkAveragePrbs = 2.3,
                StatTime = new DateTime(2016, 7, 7),
                ButLastDownlinkDuration = 2.33,
                DownlinkDciCceRate = 2.77,
                AverageUsers = 233,
                PdcpUplinkFlow = 2.79
            };
            var view = item.MapTo<FlowView>();
            view.AverageActiveUsers.ShouldBe(1);
            view.StatTime.ShouldBe(new DateTime(2016,7,7));
            view.AverageUsers.ShouldBe(233);
            view.PdcpUplinkFlow.ShouldBe(2.79);
        }

        [Test]
        public void Test_FlowZte()
        {
            var item = new FlowZte
            {
                StatTime = new DateTime(2016, 8, 8),
                ENodebId = 11223,
                SectorId = 4,
                DownlinkPdcpFlow = 1.23,
                UplindPdcpFlow = 2.34,
                AverageRrcUsers = 17,
                MaxRrcUsers = 23,
                MaxActiveUsers = 28,
                AverageActiveUsers = 16
            };
            var view = item.MapTo<FlowView>();
            view.StatTime.ShouldBe(new DateTime(2016,8,8));
            view.AverageActiveUsers.ShouldBe(16);
            view.AverageUsers.ShouldBe(17);
            view.MaxActiveUsers.ShouldBe(28);
            view.MaxUsers.ShouldBe(23);
            view.ENodebId.ShouldBe(11223);
            view.SectorId.ShouldBe((byte)4);
            view.PdcpUplinkFlow.ShouldBe(2.34);
            view.PdcpDownlinkFlow.ShouldBe(1.23);
        }

        [Test]
        public void Test_Item()
        {
            var cell = new Cell
            {
                ENodebId = 1,
                SectorId = 2,
                Pci = 3,
                RsPower = 15.4,
                Azimuth = 122,
                Longtitute = 112.113,
                Lattitute = 22.344
            };
            var sector = new Precise4GSector
            {
                SectorId = 33,
                Pci = 23,
                Lattitute = 66.7
            };
            Mapper.Map(cell, sector);
            sector.SectorId.ShouldBe((byte) 2);
            sector.Pci.ShouldBe((short) 3);
            sector.RsPower.ShouldBe(15.4);
            sector.Azimuth.ShouldBe(122);
            sector.Longtitute.ShouldBe(112.113);
            sector.Lattitute.ShouldBe(22.344);
        }

        [Test]
        public void Test_From_CellExcel()
        {
            var info = new CellExcel
            {
                ENodebId = 1233,
                SectorId = 44,
                AntennaInfo = "2T4R",
                AntennaGain = 15.2,
                IsIndoor = "否"
            };

            var cell = Mapper.Map<Cell>(info);
            Assert.AreEqual(cell.ENodebId, 1233);
            Assert.AreEqual(cell.SectorId, 44);
            Assert.AreEqual(cell.AntennaPorts, AntennaPortsConfigure.Antenna2T4R);
            Assert.AreEqual(cell.AntennaGain, 15.2);
            Assert.IsTrue(cell.IsOutdoor);
        }

        [Test]
        public void Test_From_CellExcel2()
        {
            var info = new CellExcel
            {
                ENodebId = 1233,
                SectorId = 44,
                TransmitReceive = "2T2R",
                AntennaGain = 15.2,
                IsIndoor = "否"
            };

            var cell = Mapper.Map<Cell>(info);
            Assert.AreEqual(cell.ENodebId, 1233);
            Assert.AreEqual(cell.SectorId, 44);
            Assert.AreEqual(cell.AntennaPorts, AntennaPortsConfigure.Antenna2T2R);
            Assert.AreEqual(cell.AntennaGain, 15.2);
            Assert.IsTrue(cell.IsOutdoor);
        }

        private static IMappingExpression MappingCore(IMappingExpression coreMap,
            Type resolveActionType, string destName, string srcName)
        {
            if (resolveActionType == null)
                coreMap = coreMap.ForMember(destName, map => map.MapFrom(srcName));
            else
                coreMap = coreMap.ForMember(destName,
                    map => map.ResolveUsing(resolveActionType).FromMember(srcName));
            return coreMap;
        }

        [Test]
        public void TestCellType()
        {
            var targetType = typeof (CellExcel);
            var type = typeof (Cell);
            var coreMap = Mapper.CreateMap(targetType, type);
            foreach (var property in type.GetProperties())
            {
                var resolveAttributes = property.GetCustomAttributes<AutoMapPropertyResolveAttribute>();
                foreach (var resolveAttribute in resolveAttributes)
                {
                    if (resolveAttribute.TargetType != targetType) continue;
                    var srcName = resolveAttribute.PeerMemberName;
                    var destName = property.Name;
                    var resolveActionType = resolveAttribute.ResolveActionType;
                    coreMap = MappingCore(coreMap, resolveActionType, destName, srcName);
                }
            }
        }

        [Test]
        public void TestFormCdmaCellExcelToCdmaCell()
        {
            var info = new CdmaCellExcel
            {
                BtsId = 12333,
                SectorId = 3,
                Frequency = 283,
                IsIndoor = "否"
            };
            var item = info.MapTo<CdmaCell>();
            Assert.AreEqual(item.BtsId, 12333);
            Assert.AreEqual(item.SectorId, 3);
            Assert.AreEqual(item.Frequency, 0);
            Assert.IsTrue(item.IsOutdoor);
        }

        [Test]
        public void TestFormCdmaCellExcelToCdmaCell2()
        {
            var info = new CdmaCellExcel
            {
                BtsId = 12333,
                SectorId = 3,
                Frequency = 283,
                IsIndoor = "是"
            };
            var item = info.MapTo<CdmaCell>();
            Assert.AreEqual(item.BtsId, 12333);
            Assert.AreEqual(item.SectorId, 3);
            Assert.AreEqual(item.Frequency, 0);
            Assert.IsFalse(item.IsOutdoor);
        }

        [Test]
        public void TestCellOpenLoopPcView()
        {
            var info = new PowerControlULZte
            {
                p0NominalPUSCH = 1,
                poNominalPUCCH = 2,
                alpha = 3,
                deltaMsg3 = 4,
                deltaFPucchFormat2b = 5,
                deltaFPucchFormat2 = 6,
                deltaFPucchFormat1b = 7,
                deltaPreambleMsg3 = 8
            };
            var item = info.MapTo<CellOpenLoopPcView>();
            item.P0NominalPUSCH.ShouldBe(1);
            item.P0NominalPUCCH.ShouldBe(2);
            item.PassLossCoeff.ShouldBe(3);
            item.DeltaMsg2.ShouldBe(4);
            item.DeltaFPUCCHFormat2b.ShouldBe(5);
            item.DeltaFPUCCHFormat2.ShouldBe(6);
            item.DeltaFPUCCHFormat1b.ShouldBe(7);
            item.DeltaPreambleMsg3.ShouldBe(8);
        }
    }

    [TestFixture]
    public class PureTestcellClass
    { 
        class SourceCell
        {
            public string TransmitReceive { get; set; }
        }

        [Test]
        public void Test_AntennaPortsConfigureTransform()
        {
            var coreMap = Mapper.CreateMap(typeof (SourceCell), typeof (Cell));
            coreMap =   coreMap.ForMember("AntennaPorts",
                    map => map.ResolveUsing(typeof (AntennaPortsConfigureTransform)).FromMember("TransmitReceive"));
            var source = new SourceCell
            {
                TransmitReceive = "2T2R"
            };
            var dest = source.MapTo<Cell>();
            Assert.AreEqual(dest.AntennaPorts, AntennaPortsConfigure.Antenna2T2R);
        }
    }
}
