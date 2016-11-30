using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.IMappingExpression
{
    [TestFixture]
    public class When_mapping_byte_arrays : AutoMapperSpecBase
    {
        private Picture _source;
        private PictureDto _dest;

        public class Picture
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public byte[] ImageData { get; set; }
        }

        public class PictureDto
        {
            public string Description { get; set; }
            public byte[] ImageData { get; set; }
        }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Picture, PictureDto>();
        });

        protected override void Because_of()
        {
            _source = new Picture { ImageData = new byte[100] };
            _dest = Mapper.Map<Picture, PictureDto>(_source);
        }

        [Test]
        public void Should_copy_array()
        {
            _dest.ImageData.ShouldBe(_source.ImageData);
        }
    }
}
