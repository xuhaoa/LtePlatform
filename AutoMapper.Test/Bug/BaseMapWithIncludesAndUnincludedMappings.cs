using System.Collections.Generic;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class BaseMapChildProperty
    {
        public class Container
        {
            public BaseA Item { get; set; }
        }

        public class Container2
        {
            public BaseB Item { get; set; }
        }
        public class BaseA
        {
            public string Name { get; set; }
        }

        public class BaseB
        {
            public string Name { get; set; }
        }

        public class ProxyOfSubA : SubA
        {
        }
        public class SubA : BaseA
        {
            public string Description { get; set; }
        }

        public class SubB : BaseB
        {
            public string Description { get; set; }
        }

        [Test]
        public void TestInitialiserProxyOfSub()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<SubA, SubB>();
                cfg.CreateMap<SubA, BaseB>().As<SubB>();
                cfg.CreateMap<Container, Container2>();
            });

            var mapped = Mapper.Map<Container, Container2>(new Container() { Item = new ProxyOfSubA() { Name = "Martin", Description = "Hello" } });
            mapped.Item.ShouldBeOfType<SubB>();

        }

        [Test]
        public void TestInitialiserProxyOfSub1()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<BaseA, SubB>();
                cfg.CreateMap<BaseA, BaseB>();
            });

            var mapped = Mapper.Map<BaseA, SubB>(new ProxyOfSubA() { Name = "Martin", Description = "Hello" });
            mapped.ShouldBeOfType<SubB>();

        }

        [Test]
        public void TestInitialiserProxyOfSubInclude()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<BaseA, BaseB>().Include<SubA, SubB>();
                cfg.CreateMap<SubA, SubB>();
                cfg.CreateMap<Container, Container2>();
            });

            var mapped = Mapper.Map<Container, Container2>(new Container() { Item = new ProxyOfSubA() { Name = "Martin", Description = "Hello" } });
            mapped.Item.ShouldBeOfType<SubB>();

        }
    }

    [TestFixture]
    public class CannotConvertEnumToNullable
    {
        public enum DummyTypes
        {
            Foo = 1,
            Bar = 2
        }

        public class DummySource
        {
            public DummyTypes Dummy { get; set; }
        }

        public class DummyDestination
        {
            public int? Dummy { get; set; }
        }

        [Test]
        public void Should_map_enum_to_nullable()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<DummySource, DummyDestination>());
            Mapper.AssertConfigurationIsValid();
            var src = new DummySource() { Dummy = DummyTypes.Bar };

            var destination = Mapper.Map<DummySource, DummyDestination>(src);

            destination.Dummy.ShouldBe((int)DummyTypes.Bar);
        }
    }
    
}