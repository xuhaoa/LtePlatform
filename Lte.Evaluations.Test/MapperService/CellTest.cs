using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using AutoMapper;
using Lte.Evaluations.MapperSerive.Kpi;
using Lte.Evaluations.Policy;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Basic;
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
    public class Precise4GSectorTest
    {
        private readonly ITypeFinder _typeFinder = new TypeFinder
        {
            AssemblyFinder = new MyAssemblyFinder()
        };

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
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
            sector.SectorId.ShouldBe((byte)2);
            sector.Pci.ShouldBe((short) 3);
            sector.RsPower.ShouldBe(15.4);
            sector.Azimuth.ShouldBe(122);
            sector.Longtitute.ShouldBe(112.113);
            sector.Lattitute.ShouldBe(22.344);
        }
    }
}
