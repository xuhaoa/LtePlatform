using NUnit.Framework;
using Shouldly;
using System.Collections.Generic;

namespace AutoMapper.Test.Bug
{
    namespace AssignableCollectionBug
    {
        public interface IAddress
		{
			string Street { get; }
		}

        public interface IPerson
		{
			string Name { get; set; }
			IList<IAddress> Addresses { get; set; }
		}

		// To keep things as simple as possible, implementations are exactly the same.
        public class PersonOne : IPerson
		{
			#region Implementation of IPerson

			public string Name { get; set; }
			public IList<IAddress> Addresses { get; set; }

			#endregion
		}

        public class PersonTwo : IPerson
		{
			public string Name { get; set; }
			public IList<IAddress> Addresses { get; set; }
		}

        public class AddressOne : IAddress
		{
			#region Implementation of IAddress

			public string Street { get; set; }

			#endregion
		}

        public class AddressTwo : IAddress
		{
			#region Implementation of IAddress

			public string Street { get; set; }

			#endregion
		}

        [TestFixture]
		public class MappingTests
		{
			[Test]
			public void CanMapPersonOneToPersonTwo()
			{
				IList<IAddress> adrList = new List<IAddress> { new AddressOne { Street = "Street One" } };
				var source = new PersonOne { Name = "A Name", Addresses = adrList };

				// I thought these mappings would be enough. I tried various others, without success.
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<PersonOne, PersonTwo>();
                    cfg.CreateMap<AddressOne, AddressTwo>();
                    cfg.CreateMap<AddressOne, IAddress>().ConvertUsing(Mapper.Map<AddressOne, AddressTwo>);
                });
				Mapper.AssertConfigurationIsValid();
				var result = Mapper.Map<PersonOne, PersonTwo>(source);

				// These are ok.
				source.Name.ShouldBe(result.Name);
				result.Addresses.ShouldNotBeNull();
				(result.Addresses.Count == 1).ShouldBeTrue();
				source.Addresses[0].Street.ShouldBe(result.Addresses[0].Street);

				// This is what I can't get to pass:
				result.Addresses[0].ShouldBeOfType<AddressTwo>();

				// Expected: instance of <AutomapperTest.AddressTwo>
				// But was:  <AutomapperTest.AddressOne>
			}
		}

	}
    
    namespace AssignableLists
    {
        [TestFixture]
        public class AutoMapperTests
        {
            [Test]
            public void ListShouldNotMapAsReference()
            {
                // arrange
                Mapper.Initialize(cfg => cfg.CreateMap<A, B>());
                var source = new A { Images = new List<string>() };

                // act
                var destination = Mapper.Map<B>(source);
                destination.Images.Add("test");

                // assert
                destination.Images.Count.ShouldBe(1);
                source.Images.Count.ShouldBe(0); // in 3.1.0 source.Images.Count is 1
            }
        }

        public class A
        {
            public IList<string> Images { get; set; }
        }

        public class B
        {
            public IList<string> Images { get; set; }
        }
    }
}
