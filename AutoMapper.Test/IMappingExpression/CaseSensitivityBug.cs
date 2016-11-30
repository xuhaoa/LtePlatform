using NUnit.Framework;

namespace AutoMapper.Test.IMappingExpression
{
    [TestFixture]
    public class CaseSensitivityBug : NonValidatingSpecBase
    {
        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Foo, Bar>();
        });

        [Test]
        public void TestMethod1()
        {
            typeof(AutoMapperConfigurationException).ShouldNotBeThrownBy(Configuration.AssertConfigurationIsValid);
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
}
