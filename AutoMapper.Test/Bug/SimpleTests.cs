using System.Collections;
using System.Collections.Generic;
using AutoMapper;
using AutoMapper.Test;
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
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Inner, InnerDTO>();
                cfg.CreateMap<Outer, OuterDTO>();
            });
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
            Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>()
                .ForAllMembers(opt => opt.NullSubstitute(string.Empty)));
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

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class SequenceContainsNoElementsTest : AutoMapperSpecBase
    {
        public SequenceContainsNoElementsTest()
        {
            SetUp();
        }

        public void SetUp()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Person, PersonModel>());
        }

        [Test]
        public void should_not_throw_InvalidOperationException()
        {
            var personArr = new Person[] { };
            var people = new People(personArr);
            var pmc = Mapper.Map<People, List<PersonModel>>(people);
            pmc.ShouldNotBeNull();
            pmc.Count.ShouldBe(0);
        }
    }

    public class People : IEnumerable
    {
        private readonly Person[] people;
        public People(Person[] people)
        {
            this.people = people;
        }
        public IEnumerator GetEnumerator()
        {
            return people.GetEnumerator();
        }
    }

    public abstract class Person
    {
        public string Name { get; set; }
    }

    public abstract class PersonModel
    {
        public string Name { get; set; }
    }
}

namespace SetterOnlyBug
{
    [TestFixture]
    public class MappingTests : AutoMapperSpecBase
    {
        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Source, Desitination>()
                .ForMember("Property", o => o.Ignore())); ;
        }

        [Test]
        public void TestMapping()
        {
            var source = new Source
            {
                Property = "Something"
            };
            var destination = Mapper.Map<Source, Desitination>(source);

            destination.GetProperty().ShouldBeNull();
        }
    }

    public class Source
    {
        public string Property { get; set; }
    }

    public class Desitination
    {
        string _property;

        public string Property
        {
            set { _property = value; }
        }

        public string GetProperty()
        {
            return _property;
        }
    }

    [TestFixture]
    public class SubclassMappings : AutoMapperSpecBase
    {
        public class Source
        {
            public string Name { get; set; }
        }

        public class Destination
        {
            public string Name { get; set; }
        }

        public class SubDestination : Destination
        {
            public string SubName { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());
        }

        [Test]
        public void TestCase()
        {

            var source = new Source() { Name = "Test" };
            var destination = new Destination();

            Mapper.Map<Source, Destination>(source, destination); // Works

            var subDestination = new SubDestination();

            Mapper.Map<Source, Destination>(source, subDestination); // Fails
        }
    }

    [TestFixture]
    public class TargetISet : AutoMapperSpecBase
    {
        Destination _destination;
        readonly string[] _items = { "one", "two", "three" };

        public class Source
        {
            public IEnumerable<string> Items { get; set; }
        }

        class Destination
        {
            public ISet<string> Items { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());
        }

        [Test]
        public void Should_map_IEnumerable_to_ISet()
        {
            _destination = Mapper.Map<Destination>(new Source { Items = _items });
            _destination.Items.SetEquals(_items).ShouldBeTrue();
        }
    }
}
