using System;
using System.Linq;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    public class NullableDateTimeMapFromArray : AutoMapperSpecBase
    {
        public class Source
        {
            public SourceInner[] Bars { get; set; }
        }

        public class SourceInner
        {
            public DateTime Bar { get; set; }
        }

        public class Destination
        {
            public DateTime? Foo { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>()
                .ForMember(m => m.Foo, opt =>
                {
                    opt.Condition(src => src.Bars != null && src.Bars.Length > 0);
                    opt.MapFrom(src => src.Bars.Min(b => b.Bar));
                });
        });
    }

    [TestFixture]
    public class FromDateToNullableDateTime : AutoMapperSpecBase
    {
        Destination _destination;
        DateTime _date = new DateTime(1900, 1, 1);

        public class Source
        {
            public DateTime? FiredDate { get; set; }
            public DateTime HiredDate { get; set; }
        }

        public class Destination
        {
            public DateTime? FiredDate { get; set; }
            public DateTime HiredDate { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>().ForMember(d => d.FiredDate, o => o.MapFrom(s => s.HiredDate.Date));
        });

        protected override void Because_of()
        {
            _destination = Mapper.Map<Destination>(new Source { HiredDate = _date });
        }

        [Test]
        public void Should_map_as_usual()
        {
            _destination.FiredDate.ShouldBe(_date.Date);
        }
    }

    [TestFixture]
    public class NullableDateTime : AutoMapperSpecBase
    {
        Destination _destination;
        DateTime _date = new DateTime(1900, 1, 1);

        public class Source
        {
            public DateTime Value { get; set; }
        }

        public class Destination
        {
            public DateTime Value { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>();
            cfg.CreateMap<DateTime, DateTime?>()
                .ConvertUsing(source => source == new DateTime(1900, 1, 1) ? (DateTime?)null : source);
        });

        protected override void Because_of()
        {
            _destination = Mapper.Map<Destination>(new Source { Value = _date });
        }

        [Test]
        public void Should_map_as_usual()
        {
            _destination.Value.ShouldBe(_date);
        }
    }
}