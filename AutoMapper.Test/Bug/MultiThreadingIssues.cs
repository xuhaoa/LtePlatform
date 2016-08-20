#if !SILVERLIGHT && !NETFX_CORE
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using AutoMapper.Test;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class MultiThreadingIssues
    {
		public class Type1
		{
			public string FirstName ;
			public string MiddleName ;
			public string LastName ;
			public int Age ;
		}

		public class Type1Point3
		{
			public string FirstName ;
			public string MiddleName ;
			public string LastName ;
		}

		public class Type1Point2
		{
			public string FirstName ;
			public string MiddleName ;
		}

		public class Type1Point1
		{
			public string FirstName ;
		}

		public class DestType
		{
			public string FirstName ;
			public string MiddleName ;
			public string LastName ;
			public int Age ;
		}

    	static int _done ;
    	readonly ManualResetEvent _allDone = new ManualResetEvent( false );

		[Test]
        public void ShouldMapToNewISet()
        {
			const int threadCount = 130 ;

			for (var i = 0; i < threadCount; i++)
			{
				Task.Factory.StartNew( doMapping ).ContinueWith(
					a =>
						{
							if (Interlocked.Increment(ref _done) == threadCount)
							{
								_allDone.Set( ) ;
							}

						} ) ;
			}

			_allDone.WaitOne( TimeSpan.FromSeconds( 10 ) ) ;
        }

    	static void doMapping( )
    	{
    		var source = createSource( ) ;

    		Console.WriteLine( @"Mapping {0} on thread {1}", source.GetType( ), Thread.CurrentThread.ManagedThreadId ) ;

    	    Mapper.Initialize(cfg => cfg.CreateMap(source.GetType(), typeof (DestType)));

    		var t2 = (DestType)Mapper.Map(source, source.GetType(  ), typeof( DestType ) )  ;
    	}
    	
		static readonly Random _random = new Random();

    	static object createSource( )
    	{
    		
			var n = _random.Next( 0, 4 ) ;
    		
			switch (n)
			{
			    case 0:
			        return new Type1
			        {
			            Age = 12,
			            FirstName = @"Fred",
			            LastName = @"Smith",
			            MiddleName = @"G"
			        } ;
			    case 1:
			        return new Type1Point1( ) 
			        {
			            FirstName = @"Fred",
			        } ;
			    case 2:
			        return new Type1Point2( ) 
			        {
			            FirstName = @"Fred",
			            MiddleName = @"G"
			        } ;
			    case 3:
			        return new Type1Point3( ) 
			        {
			            FirstName = @"Fred",
			            LastName = @"Smith",
			            MiddleName = @"G"
			        } ;
			}

    	    throw new Exception();
    	}
    }

    [TestFixture]
    public class NestedMappingProjectionsExplicitExpanding : AutoMapperSpecBase
    {
        Fu _destination;
        int _propValue = 23;

        public class FuEntity
        {
            public ManEntity Man { get; set; }
        }

        public class ManEntity
        {
            public ChuEntity Chu { get; set; }
        }

        public class ChuEntity
        {
            public int Prop { get; set; }
        }

        public class Fu
        {
            public Man Man { get; set; }
        }

        public class Man
        {
            public Chu Chu { get; set; }
        }

        public class Chu
        {
            public int Prop { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<FuEntity, Fu>().ForMember(dest => dest.Man, opt => opt.ExplicitExpansion());
                cfg.CreateMap<ManEntity, Man>().ForMember(dest => dest.Chu, opt => opt.ExplicitExpansion());
                cfg.CreateMap<ChuEntity, Chu>();
            });
        }

        protected override void Because_of()
        {
            var fuEntity = new FuEntity { Man = new ManEntity { Chu = new ChuEntity { Prop = _propValue } } };
            _destination = new[] { fuEntity }.AsQueryable().ProjectTo<Fu>(m => m.Man, m => m.Man.Chu).First();
        }

        [Test]
        public void Should_map_nested_classes()
        {
            _destination.Man.Chu.Prop.ShouldBe(_propValue);
        }
    }
    
}
#endif

namespace AutoMapperIssue
{
    [TestFixture]
    public class TestProblem
    {
        [Test]
        public void Example()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<int?, Entity>().ConvertUsing<NullableIntToEntityConverter>();
                cfg.CreateMap<int, Entity>().ConvertUsing<IntToEntityConverter>();
            });
            var guids = new List<int?>()
                    {
                        1,
                        2,
                        null
                    };

            var result = Mapper.Map<List<Entity>>(guids);

            result[2].ShouldBeNull();
        }
    }

    public class IntToEntityConverter : ITypeConverter<int, Entity>
    {
        public Entity Convert(int source, Entity destination, ResolutionContext context)
        {
            return new Entity() { Id = source };
        }
    }

    public class NullableIntToEntityConverter : ITypeConverter<int?, Entity>
    {
        public Entity Convert(int? source, Entity destination, ResolutionContext context)
        {
            if (source.HasValue)
            {
                return new Entity() { Id = source.Value };
            }

            return null;
        }
    }

    public class Entity
    {
        public int Id { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }

    [TestFixture]
    public class NullableEnums : AutoMapperSpecBase
    {
        public class Src { public EnumType? A { get; set; } }
        public class Dst { public EnumType? A { get; set; } }

        public enum EnumType { One, Two }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Src, Dst>());
        }

        [Test]
        public void TestNullableEnum()
        {
            var d = Mapper.Map(new Src { A = null }, new Dst { A = EnumType.One });

            d.A.ShouldBeNull();
        }
    }

    public class NullableEnumToNullableValueType
    {
        [TestFixture]
        public class CannotConvertEnumToNullableWhenPassedNull : AutoMapperSpecBase
        {
            public enum DummyTypes : int
            {
                Foo = 1,
                Bar = 2
            }

            public class DummySource
            {
                public DummyTypes? Dummy { get; set; }
            }

            public class DummyDestination
            {
                public int? Dummy { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<DummySource, DummyDestination>());
            }

            [Test]
            public void Should_map_null_enum_to_nullable_base_type()
            {
                var src = new DummySource() { Dummy = null };

                var destination = Mapper.Map<DummySource, DummyDestination>(src);

                destination.Dummy.ShouldBeNull();
            }
        }

        [TestFixture]
        public class ObjectTypeMapFailure : NonValidatingSpecBase
        {
            [Test]
            public void Should_map_the_object_type()
            {
                var displayModel = new DisplayModel
                {
                    Radius = 300
                };
                object vm = new SomeViewModel();
                Mapper.Initialize(cfg => cfg.CreateMap<DisplayModel, SomeViewModel>());

                Mapper.Map(displayModel, vm);
                ((SomeViewModel)vm).Radius.ShouldBe(300); // fails

                var vm2 = new SomeViewModel();
                Mapper.Map(displayModel, vm2);
                vm2.Radius.ShouldBe(300); // succeeds
            }

            public class SomeViewModel
            {
                public int Radius { get; set; }
            }

            public class DisplayModel
            {
                public int Radius { get; set; }
            }
        }
    }
}