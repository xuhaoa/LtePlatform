﻿using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common;
using Lte.MySqlFramework.Entities;
using NUnit.Framework;

namespace Abp.EntityFramework.Tests.AutoMapper
{
    [TestFixture]
    public class BtsExcelMapperTest
    {
        public BtsExcelMapperTest()
        {
            Mapper.Initialize(cfg => AutoMapperHelper.CreateMap(typeof (BtsExcel), cfg));
        }

        [Test]
        public void Map_Null_Test()
        {
            BtsExcel info = null;
            var stat = info.MapTo<CdmaBts>();
            Assert.IsNull(stat);
        }

        [Test]
        public void Map_Name_Test()
        {
            var info = new BtsExcel {Name = "12orfi9"};
            var stat = info.MapTo<CdmaBts>();
            Assert.IsNotNull(stat);
            stat.Name.ShouldBe("12orfi9");
        }

        [Test]
        public void Map_Longtitute_Test()
        {
            var info = new BtsExcel {Longtitute = 123.222};
            var stat = info.MapTo<CdmaBts>();
            Assert.IsNotNull(stat);
            stat.Longtitute.ShouldBe(123.222);
        }

        [Test]
        public void Map_List_Test()
        {
            var infoList = new List<BtsExcel>
            {
                new BtsExcel {Lattitute = 22.444},
                new BtsExcel {Lattitute = 22.789}
            };
            var statList = infoList.MapTo<IEnumerable<CdmaBts>>();
            statList.Count().ShouldBe(2);
            statList.ElementAt(0).Lattitute.ShouldBe(22.444);
            statList.ElementAt(1).Lattitute.ShouldBe(22.789);
        }
    }
}
