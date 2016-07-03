using System;
using System.Linq;
using System.Text.RegularExpressions;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Membel
{
    namespace ReverseMapping
    {
        [TestFixture]
        public class ReverseMapConventions : AutoMapperSpecBase
        {
            private Rotator_Ad_Run _destination;
            private readonly DateTime _startDate = DateTime.Now;
            private readonly DateTime _endDate = DateTime.Now.AddHours(2);

            public class Rotator_Ad_Run
            {
                public DateTime Start_Date { get; set; }
                public DateTime End_Date { get; set; }
                public bool Enabled { get; set; }
            }

            public class RotatorAdRunViewModel
            {
                public DateTime StartDate { get; set; }
                public DateTime EndDate { get; set; }
                public bool Enabled { get; set; }
            }

            public class UnderscoreNamingConvention : INamingConvention
            {
                public Regex SplittingExpression { get; } = new Regex(@"\p{Lu}[a-z0-9]*(?=_?)");

                public string SeparatorCharacter => "_";

                public string ReplaceValue(Match match)
                {
                    return match.Value;
                }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(config =>
                {
                    config.CreateProfile("MyMapperProfile", prf =>
                    {
                        prf.SourceMemberNamingConvention = new UnderscoreNamingConvention();
                        prf.CreateMap<Rotator_Ad_Run, RotatorAdRunViewModel>();
                    });
                    config.CreateProfile("MyMapperProfile2", prf =>
                    {
                        prf.DestinationMemberNamingConvention = new UnderscoreNamingConvention();
                        prf.CreateMap<RotatorAdRunViewModel, Rotator_Ad_Run>();
                    });
                });
            }

            protected override void Because_of()
            {
                _destination =
                    Mapper.Map<RotatorAdRunViewModel, Rotator_Ad_Run>(new RotatorAdRunViewModel
                    {
                        Enabled = true,
                        EndDate = _endDate,
                        StartDate = _startDate
                    });
            }

            [Test]
            public void Should_apply_the_convention_in_reverse()
            {
                _destination.Enabled.ShouldBeTrue();
                _destination.End_Date.ShouldBe(_endDate);
                _destination.Start_Date.ShouldBe(_startDate);
            }
        }

        [TestFixture]
        public class When_reverse_mapping_classes_with_simple_properties : AutoMapperSpecBase
        {
            private Source _source;

            public class Source
            {
                public int Value { get; set; }
            }

            public class Destination
            {
                public int Value { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, Destination>()
                        .ReverseMap();
                });
            }

            protected override void Because_of()
            {
                var dest = new Destination
                {
                    Value = 10
                };
                _source = Mapper.Map<Destination, Source>(dest);
            }

            [Test]
            public void Should_create_a_map_with_the_reverse_items()
            {
                _source.Value.ShouldBe(10);
            }
        }

        [TestFixture]
        public class When_validating_only_against_source_members_and_source_matches : NonValidatingSpecBase
        {
            public class Source
            {
                public int Value { get; set; }
            }

            public class Destination
            {
                public int Value { get; set; }
                public int Value2 { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, Destination>(MemberList.Source);
                });
            }

            [Test]
            public void Should_only_map_source_members()
            {
                var typeMap = Mapper.FindTypeMapFor<Source, Destination>();

                typeMap.GetPropertyMaps().Count().ShouldBe(1);
            }

            [Test]
            public void Should_not_throw_any_configuration_validation_errors()
            {
                typeof (AutoMapperConfigurationException).ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
            }
        }

        [TestFixture]
        public class When_validating_only_against_source_members_and_source_does_not_match : NonValidatingSpecBase
        {
            public class Source
            {
                public int Value { get; set; }
                public int Value2 { get; set; }
            }

            public class Destination
            {
                public int Value { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, Destination>(MemberList.Source);
                });
            }

            [Test]
            public void Should_throw_a_configuration_validation_error()
            {
                typeof (AutoMapperConfigurationException).ShouldBeThrownBy(Mapper.AssertConfigurationIsValid);
            }
        }

        [TestFixture]
        public class When_validating_only_against_source_members_and_unmatching_source_members_are_manually_mapped :
            NonValidatingSpecBase
        {
            public class Source
            {
                public int Value { get; set; }
                public int Value2 { get; set; }
            }

            public class Destination
            {
                public int Value { get; set; }
                public int Value3 { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, Destination>(MemberList.Source)
                        .ForMember(dest => dest.Value3, opt => opt.MapFrom(src => src.Value2));
                });
            }

            [Test]
            public void Should_not_throw_a_configuration_validation_error()
            {
                typeof (AutoMapperConfigurationException).ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
            }
        }

        [TestFixture]
        public class
            When_validating_only_against_source_members_and_unmatching_source_members_are_manually_mapped_with_resolvers :
                NonValidatingSpecBase
        {
            public class Source
            {
                public int Value { get; set; }
                public int Value2 { get; set; }
            }

            public class Destination
            {
                public int Value { get; set; }
                public int Value3 { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, Destination>(MemberList.Source)
                        .ForMember(dest => dest.Value3, opt => opt.ResolveUsing(src => src.Value2))
                        .ForSourceMember(src => src.Value2, opt => opt.Ignore());
                });
            }

            [Test]
            public void Should_not_throw_a_configuration_validation_error()
            {
                typeof (AutoMapperConfigurationException).ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
            }
        }

        [TestFixture]
        public class When_reverse_mapping_and_ignoring_via_method : NonValidatingSpecBase
        {
            public class Source
            {
                public int Value { get; set; }
            }

            public class Dest
            {
                public int Value { get; set; }
                public int Ignored { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, Dest>()
                        .ForMember(d => d.Ignored, opt => opt.Ignore())
                        .ReverseMap();
                });
            }

            [Test]
            public void Should_show_valid()
            {
                typeof (AutoMapperConfigurationException).ShouldNotBeThrownBy(() => Mapper.AssertConfigurationIsValid());
            }
        }

        [TestFixture]
        public class When_reverse_mapping_and_ignoring : AutoMapperSpecBase
        {
            public class Foo
            {
                public string Bar { get; set; }
                public string Baz { get; set; }
            }

            public class Foo2
            {
                public string Bar { get; set; }
                public string Boo { get; set; }
            }

            [Test]
            public void GetUnmappedPropertyNames_ShouldReturnBoo()
            {
                //Arrange
                Mapper.CreateMap<Foo, Foo2>();
                var typeMap = Mapper.GetAllTypeMaps()
                    .First(x => x.SourceType == typeof (Foo) && x.DestinationType == typeof (Foo2));
                //Act
                var unmappedPropertyNames = typeMap.GetUnmappedPropertyNames();
                //Assert
                unmappedPropertyNames[0].ShouldBe("Boo");
            }

            [Test]
            public void WhenSecondCallTo_GetUnmappedPropertyNames_ShouldReturnBoo()
            {
                //Arrange
                Mapper.CreateMap<Foo, Foo2>().ReverseMap();
                var typeMap = Mapper.GetAllTypeMaps()
                    .First(x => x.SourceType == typeof (Foo2) && x.DestinationType == typeof (Foo));
                //Act
                var unmappedPropertyNames = typeMap.GetUnmappedPropertyNames();
                //Assert
                unmappedPropertyNames[0].ShouldBe("Boo");
            }

            [Test]
            public void Should_not_throw_exception_for_unmapped_properties()
            {
                Mapper.CreateMap<Foo, Foo2>()
                    .IgnoreAllNonExisting()
                    .ReverseMap()
                    .IgnoreAllNonExistingSource();

                Mapper.AssertConfigurationIsValid();
            }

        }

        public static class AutoMapperExtensions
        {
            // from http://stackoverflow.com/questions/954480/automapper-ignore-the-rest/6474397#6474397
            public static IMappingExpression<TSource, TDestination> IgnoreAllNonExisting<TSource, TDestination>(
                this IMappingExpression<TSource, TDestination> expression)
            {
                var sourceType = typeof (TSource);
                var destinationType = typeof (TDestination);
                var existingMaps =
                    Mapper.GetAllTypeMaps()
                        .First(x => x.SourceType == sourceType && x.DestinationType == destinationType);
                foreach (var property in existingMaps.GetUnmappedPropertyNames())
                {
                    expression.ForMember(property, opt => opt.Ignore());
                }
                return expression;
            }

            public static IMappingExpression<TSource, TDestination> IgnoreAllNonExistingSource<TSource, TDestination>(
                this IMappingExpression<TSource, TDestination> expression)
            {
                var sourceType = typeof (TSource);
                var destinationType = typeof (TDestination);
                var existingMaps =
                    Mapper.GetAllTypeMaps()
                        .First(x => x.SourceType == sourceType && x.DestinationType == destinationType);
                foreach (var property in existingMaps.GetUnmappedPropertyNames())
                {
                    expression.ForSourceMember(property, opt => opt.Ignore());
                }
                return expression;
            }
        }

    }
}