using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using Lte.Evaluations.Policy;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Basic;
using NUnit.Framework;
using Shouldly;

namespace Abp.EntityFramework.Tests
{
    [TestFixture]
    public class AbpAutoMapperModuleTest
    {
        private AbpAutoMapperModule module;
        private TypeFinder typeFinder;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            typeFinder = new TypeFinder
            {
                AssemblyFinder = new MyAssemblyFinder()
            };
            module = new AbpAutoMapperModule(typeFinder);
            module.PostInitialize();
        }

        [Test]
        public void Test_QueryFinders()
        {
            var types = typeFinder.Find(type =>
                type.IsDefined(typeof(AutoMapAttribute)) ||
                type.IsDefined(typeof(AutoMapFromAttribute)) ||
                type.IsDefined(typeof(AutoMapToAttribute))
                );
            types.FirstOrDefault(t => t == typeof (ENodebView)).ShouldNotBeNull();
        }

        [Test]
        public void Test_Module_Map_ENodebView()
        {
            var eNodeb = new ENodeb
            {
                ENodebId = 1,
                Factory = "Huawei"
            };
            var view = eNodeb.MapTo<ENodebView>();
            view.ENodebId.ShouldBe(1);
            view.Factory.ShouldBe("Huawei");
        }

        [Test]
        public void Test_Module_Map_CdmaBtsView()
        {
            var bts = new CdmaBts
            {
                BtsId = 1,
                Address = "Pussy Cat's house"
            };
            var view = bts.MapTo<CdmaBtsView>();
            view.BtsId.ShouldBe(1);
            view.Address.ShouldBe("Pussy Cat's house");
        }

        [Test]
        public void Test_Module_Map_PreciseInterferenceNeighborDto()
        {
            var dto = new PreciseInterferenceNeighborDto
            {
                ENodebId = 2,
                SectorId = 3,
                Db10Share = 10.5,
                Mod3Share = 2.3
            };
            var cell = dto.MapTo<PreciseWorkItemCell>();
            cell.ENodebId.ShouldBe(2);
            cell.SectorId.ShouldBe((byte)3);
            cell.Db10Share.ShouldBe(10.5);
            cell.Mod3Share.ShouldBe(2.3);
        }
    }
}
