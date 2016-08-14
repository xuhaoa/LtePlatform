using System;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Core
{
    [TestFixture]
    public class AutoMapperTester : IDisposable
	{
		[Test]
		public void Should_be_able_to_handle_derived_proxy_types()
		{
		    Mapper.Initialize(cfg => cfg.CreateMap<ModelType, DtoType>());
			var source = new[] { new DerivedModelType { TheProperty = "Foo" }, new DerivedModelType { TheProperty = "Bar" } };

			var destination = (DtoType[])Mapper.Map(source, typeof(ModelType[]), typeof(DtoType[]));

			destination[0].TheProperty.ShouldBe("Foo");
			destination[1].TheProperty.ShouldBe("Bar");
		}

		public void Dispose()
		{
		}

		public class ModelType
		{
			public string TheProperty { get; set; }
		}

		public class DerivedModelType : ModelType
		{
		}

		public class DtoType
		{
			public string TheProperty { get; set; }
		}
	}
}