using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
	namespace DuplicateValuesBug
	{
		public class SourceObject
		{
			public int Id;
			public IList<SourceObject> Children;

			public void AddChild(SourceObject childObject)
			{
				if (this.Children == null)
					this.Children = new List<SourceObject>();

				Children.Add(childObject);
			}
		}


		public class DestObject
		{
			public int Id;
			public IList<DestObject> Children;

			public void AddChild(DestObject childObject)
			{
				if (this.Children == null)
					this.Children = new List<DestObject>();

				Children.Add(childObject);
			}
		}

        [TestFixture]
		public class DuplicateValuesIssue : AutoMapperSpecBase
		{
			[Test]
			public void Should_map_the_existing_array_elements_over()
			{
				var sourceList = new List<SourceObject>();
				var destList = new List<DestObject>();

			    Mapper.Initialize(cfg => cfg.CreateMap<SourceObject, DestObject>());
				Mapper.AssertConfigurationIsValid();

				var source1 = new SourceObject
				{
					Id = 1,
				};
				sourceList.Add(source1);

				var source2 = new SourceObject
				{
					Id = 2,
				};
				sourceList.Add(source2);

				source1.AddChild(source2); // This causes the problem

				var dest1 = new DestObject();
				Mapper.Map(sourceList, destList);

				destList.Count.ShouldBe(2);
				destList[0].Children.Count.ShouldBe(1);
				destList[0].Children[0].ShouldBeSameAs(destList[1]);
			}
		}
	}

    [TestFixture]
    public class EmptyNullSubstituteBug : NonValidatingSpecBase
    {
        private Entity _destination;

        public class Model
        {
            public string Name { get; set; }
            public int Age { get; set; }
        }

        public class Entity
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public string ClientIPAddress { get; set; }
            public string NotifyEmail { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Model, Entity>()
                .ForMember(e => e.ClientIPAddress, opts => opts.NullSubstitute(""))
                .ForMember(e => e.NotifyEmail, opts => opts.NullSubstitute("")));
        }

        protected override void Because_of()
        {
            var model = new Model
            {
                Name = "Eric Cartman",
                Age = 12
            };

            _destination = new Entity
            {
                Name = "Eric Cartman",
                Age = 12,
                ClientIPAddress = "192.22.2.1",
                NotifyEmail = "stan@gmail.com"
            };

            _destination = Mapper.Map(model, _destination);
        }

        [Test]
        public void Should_keep_existing_ip_address()
        {
            _destination.ClientIPAddress.ShouldBe("192.22.2.1");
        }
    }

    [TestFixture]
    public class ExistingArrays : AutoMapperSpecBase
    {
        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Source, Dest>();
                cfg.CreateMap<Source, DestWithIEnumerableInitializer>();
            });
        }

        [Test]
        public void should_map_array_inside_object()
        {
            var source = new Source { Values = new[] { "1", "2" } };
            var dest = Mapper.Map<Dest>(source);
        }


        [Test]
        public void should_map_over_enumerable_empty()
        {
            var source = new Source { Values = new[] { "1", "2" } };
            var dest = Mapper.Map<DestWithIEnumerableInitializer>(source);
        }

        public class Source
        {
            public Source()
            {
                Values = new string[0];
            }

            public string[] Values { get; set; }
        }

        public class Dest
        {
            public Dest()
            {
                // remove this line will get it fixed. 
                Values = new string[0];
            }

            public string[] Values { get; set; }
        }

        public class DestWithIEnumerableInitializer
        {
            public DestWithIEnumerableInitializer()
            {
                // remove this line will get it fixed. 
                Values = Enumerable.Empty<string>();
            }

            public IEnumerable<string> Values { get; set; }
        }
    }
}