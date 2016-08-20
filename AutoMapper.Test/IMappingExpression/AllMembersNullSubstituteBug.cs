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
    public class AllMembersNullSubstituteBug
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
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Source, Destination>()
                .ForAllMembers(opt => opt.NullSubstitute(string.Empty)));

            var src = new Source
            {
                Value1 = 5
            };

            var dest = config.CreateMapper().Map<Source, Destination>(src);

            dest.Value1.ShouldBe("5");
            dest.Value2.ShouldBe(string.Empty);
            dest.Value3.ShouldBe(string.Empty);
        }
    }
}
