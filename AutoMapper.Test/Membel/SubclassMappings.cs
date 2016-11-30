using NUnit.Framework;

namespace AutoMapper.Test.Membel
{
    [TestFixture]
    public class SubclassMappings : AutoMapperSpecBase
    {
        public class Source
        {
            public string Name { get; set; }
        }

        public class Destination
        {
            public string Name { get; set; }
        }

        public class SubDestination : Destination
        {
            public string SubName { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Destination>();
        });

        [Test]
        public void TestCase()
        {

            var source = new Source() { Name = "Test" };
            var destination = new Destination();

            Mapper.Map<Source, Destination>(source, destination); // Works

            var subDestination = new SubDestination();

            Mapper.Map<Source, Destination>(source, subDestination); // Fails
        }
    }
}
