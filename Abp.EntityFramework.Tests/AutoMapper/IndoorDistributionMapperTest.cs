using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using NUnit.Framework;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common;
using Lte.MySqlFramework.Entities;

namespace Abp.EntityFramework.Tests.AutoMapper
{
    [TestFixture]
    public class IndoorDistributionMapperTest
    {
        [SetUp]
        public void Setup()
        {
            Mapper.Initialize(cfg => AutoMapperHelper.CreateMap(typeof (IndoorDistributionExcel), cfg));
        }

        [Test]
        public void Map_Null_Test()
        {
            IndoorDistributionExcel info = null;
            var stat = info.MapTo<IndoorDistribution>();
            Assert.IsNull(stat);
        }

        [Test]
        public void Map_Name_Test()
        {
            var info = new IndoorDistributionExcel {Name = "abc123"};
            var stat = info.MapTo<IndoorDistribution>();
            Assert.IsNotNull(stat);
            stat.Name.ShouldBe("abc123");
        }
        
        [Test]
        public void Map_List_Test()
        {
            var infoList = new List<IndoorDistributionExcel>
            {
                new IndoorDistributionExcel {Name = "indoor 1"},
                new IndoorDistributionExcel {Name = "indoor 2"}
            };
            var statList = infoList.MapTo<IEnumerable<IndoorDistribution>>();
            statList.Count().ShouldBe(2);
            statList.ElementAt(0).Name.ShouldBe("indoor 1");
            statList.ElementAt(1).Name.ShouldBe("indoor 2");
        }
    }
}
