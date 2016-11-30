using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.IMappingExpression
{
    [TestFixture]
    public class NullableEnums : AutoMapperSpecBase
    {
        public class Src { public EnumType? A { get; set; } }
        public class Dst { public EnumType? A { get; set; } }

        public enum EnumType { One, Two }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Src, Dst>();
        });

        [Test]
        public void TestNullableEnum()
        {
            var d = Mapper.Map(new Src { A = null }, new Dst { A = EnumType.One });

            d.A.ShouldBeNull();
        }
    }
}
