using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Core
{
	namespace General
	{
        [TestFixture]
		public class When_mapping_dto_with_a_missing_match : NonValidatingSpecBase
		{
			public class ModelObject
			{
			}

			public class ModelDto
			{
				public string SomePropertyThatDoesNotExistOnModel { get; set; }
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());
			}

			[Test]
			public void Should_map_successfully()
			{
				ModelDto dto = Mapper.Map<ModelObject, ModelDto>(new ModelObject());

				dto.ShouldNotBeNull();
			}
		}

        [TestFixture]
		public class When_mapping_a_null_model : AutoMapperSpecBase
		{
			private ModelDto _result;

			public class ModelDto
			{
			}

			public class ModelObject
			{
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());

				_result = Mapper.Map<ModelObject, ModelDto>(null);
			}

			[Test]
			public void Should_always_provide_a_dto()
			{
				_result.ShouldNotBeNull();
			}
		}

        [TestFixture]
		public class When_mapping_a_dto_with_a_private_parameterless_constructor : AutoMapperSpecBase
		{
			private ModelDto _result;

			public class ModelObject
			{
				public string SomeValue { get; set; }
			}

			public class ModelDto
			{
				public string SomeValue { get; set; }

				private ModelDto()
				{
				}
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());

				var model = new ModelObject
				{
					SomeValue = "Some value"
				};

				_result = Mapper.Map<ModelObject, ModelDto>(model);
			}

			[Test]
			public void Should_map_the_dto_value()
			{
				_result.SomeValue.ShouldBe("Some value");
			}
		}

        [TestFixture]
		public class When_mapping_to_a_dto_string_property_and_the_dto_type_is_not_a_string : AutoMapperSpecBase
		{
			private ModelDto _result;

			public class ModelObject
			{
				public int NotAString { get; set; }
			}

			public class ModelDto
			{
				public string NotAString { get; set; }
			}

			protected override void Establish_context()
			{
				var model = new ModelObject
				{
					NotAString = 5
				};

			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>()
			        .ForMember(d => d.NotAString, opt => opt.MapFrom(s => s.NotAString.ToString())));

				_result = Mapper.Map<ModelObject, ModelDto>(model);
			}

			[Test]
			public void Should_use_the_ToString_value_of_the_unmatched_type()
			{
				_result.NotAString.ShouldBe("5");
			}
		}

        [TestFixture]
		public class When_mapping_dto_with_an_array_property : AutoMapperSpecBase
		{
			private ModelDto _result;

			public class ModelObject
			{
				public IEnumerable<int> GetSomeCoolValues()
				{
					return new[] { 4, 5, 6 };
				}
			}

			public class ModelDto
			{
				public string[] SomeCoolValues { get; set; }
			}

			protected override void Establish_context()
			{
				var model = new ModelObject();

			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>()
			        .ForMember(d => d.SomeCoolValues, opt => opt.MapFrom(s => s.GetSomeCoolValues().Select(x => x.ToString()))));

				_result = Mapper.Map<ModelObject, ModelDto>(model);
			}

			[Test]
			public void Should_map_the_collection_of_items_in_the_input_to_the_array()
			{
				_result.SomeCoolValues[0].ShouldBe("4");
				_result.SomeCoolValues[1].ShouldBe("5");
				_result.SomeCoolValues[2].ShouldBe("6");
			}
		}

        [TestFixture]
		public class When_mapping_a_dto_with_mismatched_property_types : NonValidatingSpecBase
		{
			public class ModelObject
			{
				public string NullableDate { get; set; }
			}

			public class ModelDto
			{
				public DateTime NullableDate { get; set; }
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());
			}

			[Test]
			public void Should_throw_a_mapping_exception()
			{
				var model = new ModelObject();
				model.NullableDate = "Lorem Ipsum";
				
				typeof(AutoMapperMappingException).ShouldBeThrownBy(() => Mapper.Map<ModelObject, ModelDto>(model));
			}
		}

        [TestFixture]
		public class When_mapping_an_array_of_model_objects : AutoMapperSpecBase
		{
			private ModelObject[] _model;
			private ModelDto[] _dto;

			public class ModelObject
			{
				public string SomeValue { get; set; }
			}

			public class ModelDto
			{
				public string SomeValue { get; set; }
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());

				_model = new[] { new ModelObject { SomeValue = "First" }, new ModelObject { SomeValue = "Second" } };
				_dto = (ModelDto[])Mapper.Map(_model, typeof(ModelObject[]), typeof(ModelDto[]));
			}

			[Test]
			public void Should_create_an_array_of_ModelDto_objects()
			{
				_dto.Length.ShouldBe(2);
			}

			[Test]
			public void Should_map_properties()
			{
                _dto.Any(d => d.SomeValue.Contains("First")).ShouldBeTrue();
                _dto.Any(d => d.SomeValue.Contains("Second")).ShouldBeTrue();
            }
		}

        [TestFixture]
		public class When_mapping_a_List_of_model_objects : AutoMapperSpecBase
		{
			private List<ModelObject> _model;
			private ModelDto[] _dto;

			public class ModelObject
			{
				public string SomeValue { get; set; }
			}

			public class ModelDto
			{
				public string SomeValue { get; set; }
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());

				_model = new List<ModelObject> { new ModelObject { SomeValue = "First" }, new ModelObject { SomeValue = "Second" } };
				_dto = (ModelDto[])Mapper.Map(_model, typeof(ModelObject[]), typeof(ModelDto[]));
			}

			[Test]
			public void Should_create_an_array_of_ModelDto_objects()
			{
				_dto.Length.ShouldBe(2);
			}

			[Test]
			public void Should_map_properties()
			{
                _dto.Any(d => d.SomeValue.Contains("First")).ShouldBeTrue();
                _dto.Any(d => d.SomeValue.Contains("Second")).ShouldBeTrue();
			}
		}

        [TestFixture]
		public class When_mapping_a_nullable_type_to_non_nullable_type : AutoMapperSpecBase
		{
			private ModelObject _model;
			private ModelDto _dto;

			public class ModelObject
			{
				public int? SomeValue { get; set; }
				public int? SomeNullableValue { get; set; }
			}

			public class ModelDto
			{
				public int SomeValue { get; set; }
				public int SomeNullableValue { get; set; }
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());
			}

            protected override void Because_of()
            {
                _model = new ModelObject { SomeValue = 2 };
                _dto = Mapper.Map<ModelObject, ModelDto>(_model);
            }

			[Test]
			public void Should_map_value_if_has_value()
			{
				_dto.SomeValue.ShouldBe(2);
			}

			[Test]
			public void Should_not_set_value_if_null()
			{
				_dto.SomeNullableValue.ShouldBe(0);
			}
		}

        [TestFixture]
		public class When_mapping_a_non_nullable_type_to_a_nullable_type : AutoMapperSpecBase
		{
			private ModelObject _model;
			private ModelDto _dto;

			public class ModelObject
			{
				public int SomeValue { get; set; }
				public int SomeOtherValue { get; set; }
			}

			public class ModelDto
			{
				public int? SomeValue { get; set; }
				public int? SomeOtherValue { get; set; }
			}

			protected override void Establish_context()
			{
			    Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>());

				_model = new ModelObject { SomeValue = 2 };
			}

			protected override void Because_of()
			{
				_dto = Mapper.Map<ModelObject, ModelDto>(_model);
			}

			[Test]
			public void Should_map_value_if_has_value()
			{
				_dto.SomeValue.ShouldBe(2);
			}

			[Test]
			public void Should_not_set_value_if_null()
			{
				_dto.SomeOtherValue.ShouldBe(0);
			}

		}

        [TestFixture]
        public class When_mapping_a_nullable_type_to_a_nullable_type : AutoMapperSpecBase
        {
            private ModelObject _model;
            private ModelDto _dto;

            public class ModelObject
            {
                public int? SomeValue { get; set; }
                public int? SomeOtherValue { get; set; }
            }

            public class ModelDto
            {
                public int? SomeValue { get; set; }
                public int? SomeOtherValue2 { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<ModelObject, ModelDto>()
                    .ForMember(dest => dest.SomeOtherValue2, opt => opt.MapFrom(src => src.SomeOtherValue)));

                _model = new ModelObject();
            }

            protected override void Because_of()
            {
                _dto = Mapper.Map<ModelObject, ModelDto>(_model);
            }

            [Test]
            public void Should_map_value_if_has_value()
            {
                _dto.SomeValue.ShouldBeNull();
            }

            [Test]
            public void Should_not_set_value_if_null()
            {
                _dto.SomeOtherValue2.ShouldBeNull();
            }

        }

        [TestFixture]
	    public class When_mapping_tuples : AutoMapperSpecBase
	    {
	        private Dest _dest;

	        public class Source
	        {
	            public Tuple<int, int> Value { get; set; }
	        }
	        public class Dest
	        {
	            public Tuple<int, int> Value { get; set; }
	        }

	        protected override void Establish_context()
	        {
	            Mapper.Initialize(cfg => cfg.CreateMap<Source, Dest>());
	        }

	        protected override void Because_of()
	        {
	            var source = new Source
	            {
	                Value = new Tuple<int, int>(10, 11)
	            };
	            _dest = Mapper.Map<Source, Dest>(source);
	        }

	        [Test]
	        public void Should_map_tuple()
	        {
	            _dest.Value.ShouldNotBeNull();
                _dest.Value.Item1.ShouldBe(10);
                _dest.Value.Item2.ShouldBe(11);
	        }
	    }

        [TestFixture]
        public class IgnoreAllTests
        {
            public class Source
            {
                public string ShouldBeMapped { get; set; }
            }

            public class Destination
            {
                public string ShouldBeMapped { get; set; }
                public string StartingWith_ShouldNotBeMapped { get; set; }
                public List<string> StartingWith_ShouldBeNullAfterwards { get; set; }
                public string AnotherString_ShouldBeNullAfterwards { get; set; }
            }

            public class DestinationWrongType
            {
                public Destination ShouldBeMapped { get; set; }
            }

            [Test]
            public void GlobalIgnore_ignores_all_properties_beginning_with_string()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.AddGlobalIgnore("StartingWith");
                    cfg.CreateMap<Source, Destination>()
                        .ForMember(dest => dest.AnotherString_ShouldBeNullAfterwards, opt => opt.Ignore());
                });

                Mapper.Map<Source, Destination>(new Source { ShouldBeMapped = "true" });
                Mapper.AssertConfigurationIsValid();
            }

            [Test]
            public void GlobalIgnore_ignores_properties_with_names_matching_but_different_types()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.AddGlobalIgnore("ShouldBeMapped");
                    cfg.CreateMap<Source, DestinationWrongType>();
                });

                Mapper.Map<Source, DestinationWrongType>(new Source { ShouldBeMapped = "true" });
                Mapper.AssertConfigurationIsValid();
            }

            [Test]
            public void Ignored_properties_should_be_default_value()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.AddGlobalIgnore("StartingWith");
                    cfg.CreateMap<Source, Destination>()
                        .ForMember(dest => dest.AnotherString_ShouldBeNullAfterwards, opt => opt.Ignore());
                });

                Destination destination = Mapper.Map<Source, Destination>(new Source { ShouldBeMapped = "true" });
                destination.StartingWith_ShouldBeNullAfterwards.ShouldBe(null);
                destination.StartingWith_ShouldNotBeMapped.ShouldBe(null);
            }

            [Test]
            public void Ignore_supports_two_different_values()
            {
                Mapper.Initialize(cfg =>
                {
                    cfg.AddGlobalIgnore("StartingWith");
                    cfg.AddGlobalIgnore("AnotherString");
                    cfg.CreateMap<Source, Destination>();
                });

                Destination destination = Mapper.Map<Source, Destination>(new Source { ShouldBeMapped = "true" });
                destination.AnotherString_ShouldBeNullAfterwards.ShouldBe(null);
                destination.StartingWith_ShouldNotBeMapped.ShouldBe(null);
            }
        }

        [TestFixture]
        public class IgnoreAttributeTests
        {
            public class Source
            {
                public string ShouldBeMapped { get; set; }
                public string ShouldNotBeMapped { get; set; }
            }

            public class Destination
            {
                public string ShouldBeMapped { get; set; }
                [IgnoreMap]
                public string ShouldNotBeMapped { get; set; }
            }

            [Test]
            public void Ignore_On_Source_Field()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());
                Mapper.AssertConfigurationIsValid();

                Source source = new Source
                {
                    ShouldBeMapped = "Value1",
                    ShouldNotBeMapped = "Value2"
                };

                Destination destination = Mapper.Map<Source, Destination>(source);
                destination.ShouldNotBeMapped.ShouldBe(null);
            }
        }

        [TestFixture]
        public class ReverseMapIgnoreAttributeTests
        {
            public class Source
            {
                public string ShouldBeMapped { get; set; }
                public string ShouldNotBeMapped { get; set; }
            }

            public class Destination
            {
                public string ShouldBeMapped { get; set; }

                [IgnoreMap]
                public string ShouldNotBeMapped { get; set; }
            }

            [Test]
            public void Ignore_On_Source_Field()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>().ReverseMap());
                Mapper.AssertConfigurationIsValid();

                Destination source = new Destination
                {
                    ShouldBeMapped = "Value1",
                    ShouldNotBeMapped = "Value2"
                };

                Source destination = Mapper.Map<Destination, Source>(source);
                destination.ShouldNotBeMapped.ShouldBe(null);

            }
        }

        [TestFixture]
        public class When_mapping_to_a_destination_with_an_indexer_property : AutoMapperSpecBase
        {
            private Destination _result;

            public class Source
            {
                public string Value { get; set; }
            }

            public class Destination
            {
                public string Value { get; set; }
                public string this[string key] { get { return null; } }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());
            }

            protected override void Because_of()
            {
                _result = Mapper.Map<Source, Destination>(new Source { Value = "Bob" });
            }

            [Test]
            public void Should_ignore_indexers_and_map_successfully()
            {
                _result.Value.ShouldBe("Bob");
            }

            [Test]
            public void Should_pass_configuration_check()
            {
                Exception thrown = null;
                try
                {
                    Mapper.AssertConfigurationIsValid();
                }
                catch (Exception ex)
                {
                    thrown = ex;
                }

                thrown.ShouldBeNull();
            }
        }
    }
}
