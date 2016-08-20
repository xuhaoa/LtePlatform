using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class NullableBytesAndEnums : AutoMapperSpecBase
    {
        private Destination _destination;

        public class Source
        {
            public byte? Value { get; set; }
        }

        public enum Foo : byte
        {
            Blarg = 1,
            Splorg = 2
        }

        public class Destination
        {
            public Foo? Value { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>();
        });

        protected override void Because_of()
        {
            _destination = Mapper.Map<Source, Destination>(new Source { Value = 2 });
        }

        [Test]
        public void Should_map_the_byte_to_the_enum_with_the_same_value()
        {
            _destination.Value.ShouldBe(Foo.Splorg);
        }
    }

    [TestFixture]
    public class NullableLong : AutoMapperSpecBase
    {
        private Destination _destination;

        public class Source
        {
            public int Value { get; set; }
        }

        public class Destination
        {
            public long? Value { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>();
        });

        protected override void Because_of()
        {
            _destination = Mapper.Map<Source, Destination>(new Source { Value = 2 });
        }

        [Test]
        public void Should_map_the_byte_to_the_enum_with_the_same_value()
        {
            _destination.Value.ShouldBe(2);
        }
    }

    [TestFixture]
    public class NullableShortWithCustomMapFrom : AutoMapperSpecBase
    {
        private Destination _destination;

        public class Source
        {
            public short Value { get; set; }
        }

        public class Destination
        {
            public short? Value { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>()
                .ForMember(t => t.Value, opts => opts.MapFrom(s => s.Value > 0 ? s.Value : default(short?)));
        });

        protected override void Because_of()
        {
        }

        [Test]
        public void Should_map_the_value()
        {
            var destination = Mapper.Map<Source, Destination>(new Source { Value = 2 });
            destination.Value.ShouldBe((short)2);
        }

        [Test]
        public void Should_map_the_value_with_condition()
        {
            var destination = Mapper.Map<Source, Destination>(new Source { Value = 0 });
            destination.Value.ShouldBeNull();
        }
    }
}
