using System;
using System.Linq;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Core
{
    [TestFixture]
    public class AutoMapperTester : IDisposable
	{
		[Test]
		public void Should_be_able_to_handle_derived_proxy_types()
		{
		    Mapper.Initialize(cfg => cfg.CreateMap<ModelType, DtoType>());
			var source = new[] { new DerivedModelType { TheProperty = "Foo" }, new DerivedModelType { TheProperty = "Bar" } };

			var destination = (DtoType[])Mapper.Map(source, typeof(ModelType[]), typeof(DtoType[]));

			destination[0].TheProperty.ShouldBe("Foo");
			destination[1].TheProperty.ShouldBe("Bar");
		}

		public void Dispose()
		{
		}

		public class ModelType
		{
			public string TheProperty { get; set; }
		}

		public class DerivedModelType : ModelType
		{
		}

		public class DtoType
		{
			public string TheProperty { get; set; }
		}
	}

    [TestFixture]
    public class When_configuring_before_and_after_methods : AutoMapperSpecBase
    {
        private Source _src;

        public class Source
        {
        }
        public class Destination
        {
        }

        protected override void Establish_context()
        {
            _src = new Source();
        }

        [Test]
        public void Before_and_After_should_be_called()
        {
            var beforeMapCalled = false;
            var afterMapCalled = false;

            Mapper.Initialize(cfg =>
                cfg.CreateMap<Source, Destination>()
                    .BeforeMap((src, dest) => beforeMapCalled = true)
                    .AfterMap((src, dest) => afterMapCalled = true));
            Mapper.Map<Source, Destination>(_src);

            beforeMapCalled.ShouldBeTrue();
            afterMapCalled.ShouldBeTrue();
        }

    }

    [TestFixture]
    public class When_configuring_before_and_after_methods_multiple_times : AutoMapperSpecBase
    {
        private Source _src;

        public class Source
        {
        }
        public class Destination
        {
        }

        protected override void Establish_context()
        {
            _src = new Source();
        }

        [Test]
        public void Before_and_After_should_be_called()
        {
            var beforeMapCount = 0;
            var afterMapCount = 0;

            Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>()
                .BeforeMap((src, dest) => beforeMapCount++)
                .BeforeMap((src, dest) => beforeMapCount++)
                .AfterMap((src, dest) => afterMapCount++)
                .AfterMap((src, dest) => afterMapCount++));

            Mapper.Map<Source, Destination>(_src);

            beforeMapCount.ShouldBe(2);
            afterMapCount.ShouldBe(2);
        }

    }

    [TestFixture]
    public class When_using_a_class_to_do_before_after_mappings : AutoMapperSpecBase
    {
        private Destination _destination;

        public class Source
        {
            public int Value { get; set; }
        }

        public class Destination
        {
            public int Value { get; set; }
        }

        public class BeforeMapAction : IMappingAction<Source, Destination>
        {
            private readonly int _decrement;

            public BeforeMapAction(int decrement)
            {
                _decrement = decrement;
            }

            public void Process(Source source, Destination destination)
            {
                source.Value -= _decrement * 2;
            }
        }

        public class AfterMapAction : IMappingAction<Source, Destination>
        {
            private readonly int _increment;

            public AfterMapAction(int increment)
            {
                _increment = increment;
            }

            public void Process(Source source, Destination destination)
            {
                destination.Value += _increment * 5;
            }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.ConstructServicesUsing(t => Activator.CreateInstance(t, 2));
                cfg.CreateMap<Source, Destination>()
                    .BeforeMap<BeforeMapAction>()
                    .AfterMap<AfterMapAction>();
            });
        }

        protected override void Because_of()
        {
            _destination = Mapper.Map<Source, Destination>(new Source { Value = 4 });
        }

        [Test]
        public void Should_use_global_constructor_for_building_mapping_actions()
        {
            _destination.Value.ShouldBe(10);
        }
    }

    [TestFixture]
    public class MappingSpecificBeforeMapping : AutoMapperSpecBase
    {
        private Dest _dest;

        public class Source
        {
            public int Value { get; set; }
        }

        public class Dest
        {
            public int Value { get; set; }
        }


        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Source, Dest>()
                .BeforeMap((src, dest) => src.Value += 10));
        }

        protected override void Because_of()
        {
            _dest = Mapper.Map<Source, Dest>(new Source
            {
                Value = 5
            }, opt => opt.BeforeMap((src, dest) => src.Value += 10));
        }

        [Test]
        public void Should_execute_typemap_and_scoped_beforemap()
        {
            _dest.Value.ShouldBe(25);
        }
    }

    [TestFixture]
    public class MappingSpecificAfterMapping : AutoMapperSpecBase
    {
        private Dest _dest;

        public class Source
        {
            public int Value { get; set; }
        }

        public class Dest
        {
            public int Value { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Source, Dest>()
                .AfterMap((src, dest) => dest.Value += 10));
        }

        protected override void Because_of()
        {
            _dest = Mapper.Map<Source, Dest>(new Source
            {
                Value = 5
            }, opt => opt.AfterMap((src, dest) => dest.Value += 10));
        }

        [Test]
        public void Should_execute_typemap_and_scoped_aftermap()
        {
            _dest.Value.ShouldBe(25);
        }
    }

    [TestFixture]
    public class When_configuring_a_member_to_skip_based_on_the_property_metadata : AutoMapperSpecBase
    {
        private Destination _destination;

        public class Source
        {
            public int Value { get; set; }
            public int Value2 { get; set; }
        }

        public class Destination
        {
            public int Value { get; set; }

            [Skip]
            public int Value2 { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Source, Destination>()
                    .ForAllMembers(opt => opt.Condition(CustomCondition));
            });
        }

        private static bool CustomCondition(ResolutionContext context)
        {
            return !context.PropertyMap.DestinationProperty.MemberInfo.GetCustomAttributes(true).Any(attr => attr is SkipAttribute);
        }

        protected override void Because_of()
        {
            _destination = Mapper.Map<Source, Destination>(new Source { Value = 5, Value2 = 10 });
        }

        [Test]
        public void Should_include_the_normal_members_by_default()
        {
            _destination.Value.ShouldBe(5);
        }

        [Test]
        public void Should_skip_any_members_based_on_the_skip_condition()
        {
            _destination.Value2.ShouldBe(default(int));
        }

        public class SkipAttribute : Attribute { }
    }

    [TestFixture]
    public class When_configuring_a_map_to_ignore_all_properties_with_an_inaccessible_setter : AutoMapperSpecBase
    {
        private Destination _destination;

        public class Source
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string CodeName { get; set; }
            public string Nickname { get; set; }
            public string ScreenName { get; set; }
        }

        public class Destination
        {
            public int Id { get; set; }
            public virtual string Name { get; protected set; }
            public string Title { get; internal set; }
            public string CodeName { get; private set; }
            public string Nickname { get; private set; }
            public string ScreenName { get; private set; }
            public int Age { get; private set; }

            public double Height { get; }

            public Destination()
            {
                Height = 60;
            }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Source, Destination>()
                    .ForMember(dest => dest.ScreenName, opt => opt.MapFrom(src => src.ScreenName))
                    .IgnoreAllPropertiesWithAnInaccessibleSetter()
                    .ForMember(dest => dest.Nickname, opt => opt.MapFrom(src => src.Nickname));
            });
        }

        protected override void Because_of()
        {
            _destination = Mapper.Map<Source, Destination>(new Source { Id = 5, CodeName = "007", Nickname = "Jimmy", ScreenName = "jbogard" });
        }

        [Test]
        public void Should_consider_the_configuration_valid_even_if_some_properties_with_an_inaccessible_setter_are_unmapped()
        {
            typeof(AutoMapperConfigurationException).ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
        }

        [Test]
        public void Should_map_a_property_with_an_inaccessible_setter_if_a_specific_mapping_is_configured_after_the_ignore_method()
        {
            _destination.Nickname.ShouldBe("Jimmy");
        }

        [Test]
        public void Should_not_map_a_property_with_an_inaccessible_setter_if_no_specific_mapping_is_configured_even_though_name_and_type_match()
        {
            _destination.CodeName.ShouldBeNull();
        }

        [Test]
        public void Should_not_map_a_property_with_no_public_setter_if_a_specific_mapping_is_configured_before_the_ignore_method()
        {
            _destination.ScreenName.ShouldBeNull();
        }
    }

    [TestFixture]
    public class When_configuring_a_reverse_map_to_ignore_all_source_properties_with_an_inaccessible_setter : AutoMapperSpecBase
    {
        private Destination _destination;
        private Source _source;

        public class Source
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string Force { get; set; }
            public string ReverseForce { get; private set; }
            public string Respect { get; private set; }
            public int Foo { get; private set; }
            public int Bar { get; protected set; }

            public void Initialize()
            {
                ReverseForce = "You With";
                Respect = "R-E-S-P-E-C-T";
            }
        }

        public class Destination
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public bool IsVisible { get; set; }
            public string Force { get; private set; }
            public string ReverseForce { get; set; }
            public string Respect { get; set; }
            public int Foz { get; private set; }
            public int Baz { get; protected set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Source, Destination>()
                    .IgnoreAllPropertiesWithAnInaccessibleSetter()
                    .ForMember(dest => dest.IsVisible, opt => opt.Ignore())
                    .ForMember(dest => dest.Force, opt => opt.MapFrom(src => src.Force))
                    .ReverseMap()
                    .IgnoreAllSourcePropertiesWithAnInaccessibleSetter()
                    .ForMember(dest => dest.ReverseForce, opt => opt.MapFrom(src => src.ReverseForce))
                    .ForSourceMember(dest => dest.IsVisible, opt => opt.Ignore());
            });
        }

        protected override void Because_of()
        {
            var source = new Source { Id = 5, Name = "Bob", Age = 35, Force = "With You" };
            source.Initialize();
            _destination = Mapper.Map<Source, Destination>(source);
            _source = Mapper.Map<Destination, Source>(_destination);
        }

        [Test]
        public void Should_consider_the_configuration_valid_even_if_some_properties_with_an_inaccessible_setter_are_unmapped()
        {
            typeof(AutoMapperConfigurationException).ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
        }

        [Test]
        public void Should_forward_and_reverse_map_a_property_that_is_accessible_on_both_source_and_destination()
        {
            _source.Name.ShouldBe("Bob");
        }

        [Test]
        public void Should_forward_and_reverse_map_an_inaccessible_destination_property_if_a_mapping_is_defined()
        {
            _source.Force.ShouldBe("With You");
        }

        [Test]
        public void Should_forward_and_reverse_map_an_inaccessible_source_property_if_a_mapping_is_defined()
        {
            _source.ReverseForce.ShouldBe("You With");
        }

        [Test]
        public void Should_forward_and_reverse_map_an_inaccessible_source_property_even_if_a_mapping_is_not_defined()
        {
            _source.Respect.ShouldBe("R-E-S-P-E-C-T"); // justification: if the mapping works one way, it should work in reverse
        }
    }
}