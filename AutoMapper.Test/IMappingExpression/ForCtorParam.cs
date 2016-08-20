using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.IMappingExpression
{
    [TestFixture]
    public class When_configuring__non_generic_ctor_param_members : AutoMapperSpecBase
    {
        public class Source
        {
            public int Value { get; set; }
        }

        public class Dest
        {
            public Dest(int thing)
            {
                Value1 = thing;
            }

            public int Value1 { get; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap(typeof(Source), typeof(Dest))
                .ForCtorParam("thing", opt => opt.MapFrom(src => ((Source)src).Value));
        });

        [Test]
        public void Should_redirect_value()
        {
            var dest = Mapper.Map<Source, Dest>(new Source { Value = 5 });

            dest.Value1.ShouldBe(5);
        }

        [Test]
        public void Should_resolve_using_custom_func()
        {
            var mapper = new MapperConfiguration(
                cfg => cfg.CreateMap<Source, Dest>().ForCtorParam("thing", opt => opt.ResolveUsing(src =>
                {
                    var rev = src.Value + 3;
                    return rev;
                })))
                .CreateMapper();

            var dest = mapper.Map<Source, Dest>(new Source { Value = 5 });

            dest.Value1.ShouldBe(8);
        }
    }


    [TestFixture]
    public class NonGenericAllMembersNullSubstituteBug : SpecBase
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

        [Test]
        public void Should_map_all_null_values_to_its_substitute()
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap(typeof(Source), typeof(Destination))
                .ForAllMembers(opt => opt.NullSubstitute(string.Empty)));

            var src = new Source
            {
                Value1 = 5
            };

            var mapper = config.CreateMapper();
            var dest = mapper.Map<Source, Destination>(src);

            dest.Value1.ShouldBe("5");
            dest.Value2.ShouldBe(string.Empty);
            dest.Value3.ShouldBe(string.Empty);
        }
    }
}