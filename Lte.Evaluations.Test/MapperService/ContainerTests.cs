using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using AutoMapper;
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
        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            InfrastructureMapperService.MapCell();
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
    }
}
