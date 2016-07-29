using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class CaseSensitivityBug : NonValidatingSpecBase
    {
        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Foo, Bar>());
        }

        [Test]
        public void TestMethod1()
        {
            typeof(AutoMapperConfigurationException).ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
        }

        public class Foo
        {
            public int ID { get; set; }
        }

        public class Bar
        {
            public int id { get; set; }
        }
    }

    [TestFixture]
    public class AfterMapNestedObjects : AutoMapperSpecBase
    {
        bool _afterMapCalled;

        public class Inner
        {
            public string Prop1 { get; set; }
        }

        public class Outer
        {
            public Inner Inner { get; set; }
        }

        public class InnerDTO
        {
            public string Prop1 { get; set; }
        }

        public class OuterDTO
        {
            public InnerDTO Inner { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.CreateMap<Inner, InnerDTO>();
            Mapper.CreateMap<Outer, OuterDTO>();
        }

        protected override void Because_of()
        {
            var outer = new Outer { Inner = new Inner() { Prop1 = "Prop1" } };
            Mapper.Map<Outer, OuterDTO>(outer, o => o.AfterMap((s, d) => _afterMapCalled = true));
        }

        [Test]
        public void Should_call_aftermap_for_outer_objects()
        {
            _afterMapCalled.ShouldBeTrue();
        }
    }

    [TestFixture]
    public class AddingConfigurationForNonMatchingDestinationMemberBug
    {
        public class Source
        {

        }

        public class Destination
        {
            public string Value { get; set; }
        }

        [SetUp]
        public void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Source, Destination>()
                    .ForMember(dest => dest.Value, opt => opt.NullSubstitute("Foo"));
            });
        }

        [Test]
        [ExpectedException(typeof(AutoMapperConfigurationException))]
        public void Should_show_configuration_error()
        {
            Mapper.AssertConfigurationIsValid();
        }
    }

    [TestFixture]
    public class AllMembersNullSubstituteBug : AutoMapperSpecBase
    {
        public class Source
        {
            public int? Value1 { get; set; }

            public int? Value2 { get; set; }

            public int? Value3 { get; set; }
        }

        public class Destination
        {
            public string Value1 { get; set; }

            public string Value2 { get; set; }

            public string Value3 { get; set; }
        }

        [SetUp]
        public void SetUp()
        {
            Mapper.CreateMap<Source, Destination>()
                .ForAllMembers(opt => opt.NullSubstitute(string.Empty));
        }

        [Test]
        public void Should_map_all_null_values_to_its_substitute()
        {
            var src = new Source
            {
                Value1 = 5
            };

            var dest = Mapper.Map<Source, Destination>(src);

            dest.Value1.ShouldBe("5");
            dest.Value2.ShouldBe(string.Empty);
            dest.Value3.ShouldBe(string.Empty);
        }

        [Test]
        public void Test_Using_Type_Map()
        {
            var src = new Source
            {
                Value2 = 4
            };


            var dest = (Destination)Mapper.Map(src, typeof (Source), typeof (Destination));
            dest.Value1.ShouldBe(string.Empty);
            dest.Value2.ShouldBe("4");
            dest.Value3.ShouldBe(string.Empty);
        }
    }
}