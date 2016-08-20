using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.IMappingExpression
{
    [TestFixture]
    public class TargetISet : AutoMapperSpecBase
    {
        Destination _destination;
        string[] _items = new[] { "one", "two", "three" };

        public class Source
        {
            public IEnumerable<string> Items { get; set; }
        }

        class Destination
        {
            public ISet<string> Items { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>();
        });

        protected override void Because_of()
        {
            _destination = Mapper.Map<Destination>(new Source { Items = _items });
        }

        [Test]
        public void Should_map_IEnumerable_to_ISet()
        {
            _destination.Items.SetEquals(_items).ShouldBeTrue();
        }
    }
}
