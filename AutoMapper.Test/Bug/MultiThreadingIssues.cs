#if !SILVERLIGHT && !NETFX_CORE
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
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

        [Test]
        public void Example2()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<int?, Entity>().ConvertUsing(new NullableIntToEntityConverter());
                cfg.CreateMap<int, Entity>().ConvertUsing(new IntToEntityConverter());
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
    
}