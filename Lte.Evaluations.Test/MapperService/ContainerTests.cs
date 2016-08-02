using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.Policy;
using Lte.Evaluations.ViewModels.Mr;
using Lte.Evaluations.ViewModels.Switch;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.ExcelCsv;
using Lte.Parameters.Entities.Neighbor;
using Lte.Parameters.Entities.Switch;
using NUnit.Framework;
using Shouldly;

namespace Lte.Evaluations.MapperService
{
    [TestFixture]
    public class MapFromENodebContainerServiceTest
    {
        private readonly ITypeFinder _typeFinder = new TypeFinder(new MyAssemblyFinder());

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
            InfrastructureMapperService.MapDumpConatainers();
        }

        [TestCase("abc", "ieowue", 1, 2, "10.17.165.0", "10.17.165.100")]
        [TestCase("arebc", "ieo--wue", 3, 4, "219.128.254.0", "219.128.254.41")]
        public void Test_OneItem(string name, string address, int townId, int eNodebId, string gatewayAddress,
            string ipAddress)
        {
            var container = new ENodebExcelWithTownIdContainer
            {
                ENodebExcel = new ENodebExcel
                {
                    Name = name,
                    Address = address,
                    ENodebId = eNodebId,
                    Ip = new IpAddress(ipAddress),
                    GatewayIp = new IpAddress(gatewayAddress)
                },
                TownId = townId
            };
            var item = Mapper.Map<ENodebExcelWithTownIdContainer, ENodebWithTownIdContainer>(container);

            item.ENodeb.ENodebId.ShouldBe(eNodebId);
            item.ENodeb.Name.ShouldBe(name);
            item.ENodeb.Address.ShouldBe(address);
            item.TownId.ShouldBe(townId);
            item.ENodeb.Ip.AddressString.ShouldBe(ipAddress);
            item.ENodeb.GatewayIp.AddressString.ShouldBe(gatewayAddress);
        }

        [TestCase(new [] { "abc"}, new [] { "ieowue"}, new [] { 1}, new [] { 2})]
        [TestCase(new[] { "abc", "ert" }, new[] { "ieowue", "oe90w" }, new[] { 1, 100 }, new[] { 2, 2077 })]
        [TestCase(new[] { "arebc"}, new[] { "ieo--wue"}, new[] { 3}, new[] { 4})]
        public void Test_MultiItems(string[] names, string[] addresses, int[] townIds, int[] eNodebIds)
        {
            var containers = names.Select((t, i) => new ENodebExcelWithTownIdContainer
            {
                ENodebExcel = new ENodebExcel
                {
                    Name = t,
                    Address = addresses[i],
                    ENodebId = eNodebIds[i]
                },
                TownId = townIds[i]
            });

            var items =
                Mapper.Map<IEnumerable<ENodebExcelWithTownIdContainer>, List<ENodebWithTownIdContainer>>(containers);
            items.ForEach(x=> { x.ENodeb.TownId = x.TownId; });
            var results = items.Select(x => x.ENodeb);
            results.Select(x => x.ENodebId).ToArray().ShouldBe(eNodebIds);
            results.Select(x => x.Name).ToArray().ShouldBe(names);
            results.Select(x => x.Address).ToArray().ShouldBe(addresses);
            results.Select(x => x.TownId).ToArray().ShouldBe(townIds);
        }
    }

    [TestFixture]
    public class CdmaRegionMapperTest
    {
        [SetUp]
        public void Setup()
        {
            AutoMapperHelper.CreateMap(typeof(CdmaRegionStat));
        }

        [Test]
        public void Map_Null_Tests()
        {
            CdmaRegionStatExcel info = null;
            var stat = info.MapTo<CdmaRegionStat>();
            stat.ShouldBeNull();
        }

        [Test]
        public void Map_Region_Tests()
        {
            var info = new CdmaRegionStatExcel
            {
                Region = "foshan1",
                Drop2GNum = 22
            };
            var stat = info.MapTo<CdmaRegionStat>();
            stat.Region.ShouldBe("foshan1");
            stat.Drop2GNum.ShouldBe(22);
        }
    }

    [TestFixture]
    public class NeighborCellMongoTest
    {
        private AbpAutoMapperModule _module;
        private TypeFinder _typeFinder;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _typeFinder = new TypeFinder(new MyAssemblyFinder());
            _module = new AbpAutoMapperModule(_typeFinder);
            _module.PostInitialize();
        }

        [Test]
        public void Test()
        {
            var relation = new EUtranRelationZte
            {
                eNodeB_Id = 11111,
                isAnrCreated = 1,
                isHOAllowed = 1,
                isRemoveAllowed = 0,
                nCelPriority = 22
            };
            var item = relation.MapTo<NeighborCellMongo>();
            Assert.AreEqual(item.CellId, 11111);
            Assert.IsTrue(item.IsAnrCreated);
            item.HandoffAllowed.ShouldBeTrue();
            item.RemovedAllowed.ShouldBeFalse();
            item.CellPriority.ShouldBe(22);
        }

        [Test]
        public void Test_From_ExternalEUtranCellFDDZte()
        {
            var external = new ExternalEUtranCellFDDZte
            {
                eNodeB_Id = 12345,
                eNBId = 21,
                cellLocalId = 5,
                pci = 223,
                userLabel = "wer"
            };
            var item = external.MapTo<NeighborCellMongo>();
            Assert.AreEqual(item.CellId, 12345);
            item.NeighborCellId.ShouldBe(21);
            Assert.AreEqual(item.NeighborSectorId, 5);
            Assert.AreEqual(item.NeighborPci, 223);
            item.NeighborCellName.ShouldBe("wer");
        }

        [Test]
        public void Test_From_EutranIntraFreqNCell()
        {
            var cell = new EutranIntraFreqNCell
            {
                eNodeB_Id = 54321,
                eNodeBId = 22222,
                CellId = 4,
                NeighbourCellName = "ere",
                AnrFlag = 2,
                NoHoFlag = 1,
                NoRmvFlag = 0,
                CellMeasPriority = 4
            };
            var item = cell.MapTo<NeighborCellMongo>();
            Assert.AreEqual(item.CellId, 54321);
            Assert.AreEqual(item.NeighborCellId, 22222);
            Assert.AreEqual(item.NeighborSectorId, 4);
            Assert.AreEqual(item.NeighborCellName, "ere");
            Assert.IsTrue(item.IsAnrCreated);
            Assert.IsFalse(item.HandoffAllowed);
            Assert.IsTrue(item.RemovedAllowed);
            Assert.AreEqual(item.CellPriority, 4);
        }

        [Test]
        public void Test_ENodebIntraFreqHoView()
        {
            var info = new IntraRatHoComm
            {
                eNodeB_Id = 12,
                IntraFreqHoRprtInterval = 34,
                IntraRatHoRprtAmount = 56,
                IntraRatHoMaxRprtCell = 78,
                IntraFreqHoA3TrigQuan = 90,
                IntraFreqHoA3RprtQuan = 111
            };
            var item = info.MapTo<ENodebIntraFreqHoView>();
            item.ENodebId.ShouldBe(12);
            item.ReportInterval.ShouldBe(34);
            item.ReportAmount.ShouldBe(56);
            item.MaxReportCellNum.ShouldBe(78);
            item.TriggerQuantity.ShouldBe(90);
            item.ReportQuantity.ShouldBe(111);
        }

        [Test]
        public void Test_From_UeEUtranMeasurementZte()
        {
            var info = new UeEUtranMeasurementZte
            {
                eNodeB_Id = 12,
                reportInterval = 34,
                reportAmount = 56,
                maxReportCellNum = 78,
                triggerQuantity = 90,
                reportQuantity = 111
            };
            var item = info.MapTo<ENodebIntraFreqHoView>();
            item.ENodebId.ShouldBe(12);
            item.ReportInterval.ShouldBe(34);
            item.ReportAmount.ShouldBe(56);
            item.MaxReportCellNum.ShouldBe(78);
            item.TriggerQuantity.ShouldBe(90);
            item.ReportQuantity.ShouldBe(111);
        }

        [Test]
        public void Test_CellIntraFreqHoView()
        {
            var info = new IntraFreqHoGroup
            {
                eNodeB_Id = 12,
                IntraFreqHoA3Hyst = 34,
                IntraFreqHoA3TimeToTrig = 56,
                IntraFreqHoA3Offset = 78
            };
            var item = info.MapTo<CellIntraFreqHoView>();
            item.ENodebId.ShouldBe(12);
            item.Hysteresis.ShouldBe(34);
            item.TimeToTrigger.ShouldBe(56);
            item.A3Offset.ShouldBe(78);
        }

        [Test]
        public void Test_CellIntraFreqHoView_From_UeEUtranMeasurementZte()
        {
            var info = new UeEUtranMeasurementZte
            {
                eNodeB_Id = 12,
                hysteresis = 1.5,
                timeToTrigger = 34,
                a3Offset = 2.5
            };
            var item= info.MapTo<CellIntraFreqHoView>();
            item.ENodebId.ShouldBe(12);
            item.Hysteresis.ShouldBe(3);
            item.TimeToTrigger.ShouldBe(34);
            item.A3Offset.ShouldBe(5);
        }

        [Test]
        public void Test_ENodebInterFreqHoView()
        {
            var info = new IntraRatHoComm
            {
                eNodeB_Id = 12,
                InterFreqHoA4RprtQuan = 34,
                InterFreqHoA4TrigQuan = 5,
                InterFreqHoA1A2TrigQuan = 67,
                A3InterFreqHoA1A2TrigQuan = 8,
                InterFreqHoRprtInterval = 90
            };
            var item = info.MapTo<ENodebInterFreqHoView>();
            item.ENodebId.ShouldBe(12);
            item.InterFreqHoA4RprtQuan.ShouldBe(34);
            item.InterFreqHoA4TrigQuan.ShouldBe(5);
            item.InterFreqHoA1TrigQuan.ShouldBe(67);
            item.InterFreqHoA2TrigQuan.ShouldBe(67);
            item.A3InterFreqHoA1TrigQuan.ShouldBe(8);
            item.A3InterFreqHoA2TrigQuan.ShouldBe(8);
            item.InterFreqHoRprtInterval.ShouldBe(90);
        }

        [Test]
        public void Test_EmergencyCommunicationDto()
        {
            var info = new EmergencyCommunication
            {
                Description = "[abc]defg",
                DemandLevel = DemandLevel.LevelC,
                VehicleType = VehicleType.CdmaAl,
                TransmitFunction = "ghih",
                ContactPerson = "abc(123)",
                EmergencyState = EmergencyState.FiberFinish
            };
            var item = info.MapTo<EmergencyCommunicationDto>();
            Assert.AreEqual(item.DemandLevelDescription.GetEnumType<DemandLevel>(), DemandLevel.LevelC);
            Assert.AreEqual(item.VehicularTypeDescription.GetEnumType<VehicleType>(), VehicleType.CdmaAl);
            Assert.AreEqual(item.TransmitFunction, "ghih");
            Assert.AreEqual(item.Person, "abc");
            Assert.AreEqual(item.Phone, "123");
            Assert.AreEqual(item.VehicleLocation, "abc");
            Assert.AreEqual(item.OtherDescription, "defg");
            Assert.AreEqual(item.CurrentStateDescription.GetEnumType<EmergencyState>(), EmergencyState.FiberFinish);
        }

        [Test]
        public void Test_VipDemand_FromExcel()
        {
            var info = new VipDemandExcel
            {
                DemandLevelDescription = DemandLevel.LevelA.GetEnumDescription(),
                ProjectName = "abcdef",
                ContactPerson = "12345",
                NetworkTypeDescription = NetworkType.With2G3G.GetEnumDescription(),
                PlanDate = new DateTime(2016, 2, 2)
            };
            var item = info.MapTo<VipDemand>();
            Assert.AreEqual(item.DemandLevel, DemandLevel.LevelA);
            Assert.AreEqual(item.ProjectName, "abcdef");
            Assert.AreEqual(item.ContactPerson, "12345");
            Assert.AreEqual(item.NetworkType, NetworkType.With2G3G);
            Assert.AreEqual(item.PlanDate, new DateTime(2016, 2, 2));
        }

        [Test]
        public void Test_VipDemand_FromDto()
        {
            var info = new VipDemandDto
            {
                DemandLevelDescription = DemandLevel.LevelA.GetEnumDescription(),
                ProjectName = "abcdef",
                ContactPerson = "12345",
                NetworkTypeDescription = NetworkType.With2G3G.GetEnumDescription(),
                MarketThemeDescription = MarketTheme.CollegeSpring.GetEnumDescription(),
                CurrentStateDescription = VipState.Conclusion.GetEnumDescription(),
                PlanDate = new DateTime(2016, 2, 2)
            };
            var item = info.MapTo<VipDemand>();
            Assert.AreEqual(item.DemandLevel,DemandLevel.LevelA);
            Assert.AreEqual(item.ProjectName, "abcdef");
            Assert.AreEqual(item.ContactPerson, "12345");
            Assert.AreEqual(item.NetworkType, NetworkType.With2G3G);
            Assert.AreEqual(item.MarketTheme,MarketTheme.CollegeSpring);
            Assert.AreEqual(item.VipState,VipState.Conclusion);
            Assert.IsNotNull(item.FinishTime);
            Assert.AreEqual(((DateTime)item.FinishTime).Date, DateTime.Today);
            Assert.AreEqual(item.PlanDate, new DateTime(2016, 2, 2));
        }
    }
}
