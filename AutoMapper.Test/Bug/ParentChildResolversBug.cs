using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using AutoMapper.QueryableExtensions;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    namespace ParentChildResolversBug
    {
        public enum DestEnum
        {
            a,
            b,
            c,
        }

        public enum ParentDestEnum
        {
            d,
            e,
            f
        }

        public class ParentDest
        {
            public ParentDestEnum? field
            {
                get;
                set;
            }
        }

        public class Dest : ParentDest
        {
            public new DestEnum? field
            {
                get;
                set;
            }
        }

        public class Source
        {
            public string fieldCode
            {
                get;
                set;
            }
        }


        public class ParentResolver : IValueResolver<Source, ParentDest, ParentDestEnum?>
        {
            public ParentDestEnum? Resolve(Source source, ParentDest destination, ParentDestEnum? destMember, ResolutionContext context)
            {
                switch (source.fieldCode)
                {
                    case "testa": return ParentDestEnum.d;
                    case "testb": return ParentDestEnum.e;
                    case "testc": return ParentDestEnum.f;
                    default: return null;
                }
            }
        }

        public class Resolver : IValueResolver<Source, Dest, DestEnum?>
        {
            public DestEnum? Resolve(Source source, Dest destination, DestEnum? destMember, ResolutionContext context)
            {
                switch (source.fieldCode)
                {
                    case "testa": return DestEnum.a;
                    case "testb": return DestEnum.b;
                    case "testc": return DestEnum.c;
                    default: return null;
                }
            }
        }

        [TestFixture]
        public class ParentChildResolverTests : AutoMapperSpecBase
        {
            private Dest _dest;

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Source, ParentDest>()
                        .ForMember(dest => dest.field, opt => opt.ResolveUsing<ParentResolver>())
                        .Include<Source, Dest>();

                    cfg.CreateMap<Source, Dest>()
                        .ForMember(dest => dest.field, opt => opt.ResolveUsing<Resolver>());
                });
            }

            protected override void Because_of()
            {
                var source = new Source()
                {
                    fieldCode = "testa"
                };

                _dest = Mapper.Map<Dest>(source);
            }

            [Test]
            public void Should_use_correct_resolver()
            {
                _dest.field.ShouldBe(DestEnum.a);
            }
        }
    }

    namespace ProjectCollectionsBug
    {
        public class A
        {
            public int AP1 { get; set; }
            public string AP2 { get; set; }
        }

        public class B
        {
            public B()
            {
                BP2 = new HashSet<A>();
            }
            public int BP1 { get; set; }
            public ICollection<A> BP2 { get; set; }
        }

        public class AEntity
        {
            public int AP1 { get; set; }
            public string AP2 { get; set; }
        }

        public class BEntity
        {
            public BEntity()
            {
                BP2 = new HashSet<AEntity>();
            }
            public int BP1 { get; set; }
            public ICollection<AEntity> BP2 { get; set; }
        }

        [TestFixture]
        public class Bug
        {
            [Test]
            public void Should_not_throw_exception()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<BEntity, B>();
                    cfg.CreateMap<AEntity, A>();
                });
                Mapper.AssertConfigurationIsValid();

                var be = new BEntity { BP1 = 3 };
                be.BP2.Add(new AEntity() { AP1 = 1, AP2 = "hello" });
                be.BP2.Add(new AEntity() { AP1 = 2, AP2 = "two" });

                var b = Mapper.Map<BEntity, B>(be);

                var belist = new List<BEntity> { be };
                var bei = belist.AsQueryable();
                typeof(Exception).ShouldNotBeThrownBy(() => bei.ProjectTo<B>());
            }
        }

        [TestFixture]
        public class ProjectConstructorParameters : AutoMapperSpecBase
        {
            SourceDto _dest;
            const int SomeValue = 15;

            public class Inner
            {
                public int Member { get; set; }
            }

            public class Source
            {
                public int Value { get; set; }
                public Inner Inner { get; set; }
            }

            public class SourceDto
            {
                public SourceDto(int innerMember)
                {
                    Value = innerMember;
                }

                public int Value { get; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, SourceDto>());
            }

            protected override void Because_of()
            {
                var source = new Source { Inner = new Inner { Member = SomeValue } };
                //_dest = Mapper.Map<Source, SourceDto>(source);
                _dest = new[] { source }.AsQueryable().ProjectTo<SourceDto>().First();
            }

            [Test]
            public void Should_project_constructor_parameter_mappings()
            {
                _dest.Value.ShouldBe(SomeValue);
            }
        }

        [TestFixture]
        // Bug #511
        // https://github.com/AutoMapper/AutoMapper/issues/511
        public class ReadOnlyCollectionMappingBug
        {
            class Source { public int X { get; set; } }

            class Target { public int X { get; set; } }

            [Test]
            public void Example()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Target>());

                var source = new List<Source> { new Source { X = 42 } };
                var target = Mapper.Map<ReadOnlyCollection<Target>>(source);

                target.Count.ShouldBe(source.Count);
                target[0].X.ShouldBe(source[0].X);
            }
        }

        [TestFixture]
        public class When_mapping_for_derived_class_is_duplicated : AutoMapperSpecBase
        {
            public class ModelObject
            {
                public string BaseString { get; set; }
            }

            public abstract class ModelSubObject : ModelObject
            {
                public string SubString { get; set; }
            }

            public class DtoObject
            {
                public string BaseString { get; set; }
            }

            public abstract class DtoSubObject : DtoObject
            {
                public string SubString { get; set; }
            }

            [Test]
            public void should_not_throw_duplicated_key_exception()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<ModelSubObject, DtoObject>().Include<ModelSubObject, DtoSubObject>();
                    cfg.CreateMap<ModelSubObject, DtoSubObject>();
                    cfg.CreateMap<ModelSubObject, DtoObject>().Include<ModelSubObject, DtoSubObject>();
                    cfg.CreateMap<ModelSubObject, DtoSubObject>();
                });
            }
        }

        [TestFixture]
        public class SelectiveConfigurationValidation : NonValidatingSpecBase
        {
            public class GoodSrc { }
            public class GoodDest { }

            public class BadSrc
            {
                public Type BlowUp { get; set; }
            }

            public class BadDest
            {
                public int Value { get; set; }
                public int BlowUp { get; set; }
            }
            public class GoodProfile : Profile
            {
                protected override void Configure()
                {
                    CreateMap<GoodSrc, GoodDest>();
                }
            }

            public class BadProfile : Profile
            {
                protected override void Configure()
                {
                    CreateMap<BadSrc, BadDest>();
                }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.AddProfile<GoodProfile>();
                    cfg.AddProfile<BadProfile>();
                });
            }

            [Test]
            public void Should_pass_specific_profile_assertion()
            {
                typeof(AutoMapperConfigurationException)
                    .ShouldNotBeThrownBy(Mapper.AssertConfigurationIsValid);
            }
        }
    }
}