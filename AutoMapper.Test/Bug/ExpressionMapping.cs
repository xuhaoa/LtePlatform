using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper.Mappers;
using AutoMapper.QueryableExtensions;
using AutoMapper.Test.Membel;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class ExpressionMapping : NonValidatingSpecBase
    {
        public class GrandParentDTO
        {
            public ParentDTO Parent { get; set; }
        }
        public class ParentDTO
        {
            public ICollection<ChildDTO> Children { get; set; }
            public ChildDTO Child { get; set; }
            public DateTime DateTime { get; set; }
        }

        public class ChildDTO
        {
            public ParentDTO Parent { get; set; }
            public ChildDTO GrandChild { get; set; }
            public int ID_ { get; set; }
            public int? IDs { get; set; }
            public int ID2 { get; set; }
        }

        public class GrandParent
        {
            public Parent Parent { get; set; }
        }

        public class Parent
        {
            public ICollection<Child> Children { get; set; }

            private Child _child;
            public Child Child
            {
                get { return _child; }
                set
                {
                    _child = value;
                    _child.Parent = this;
                }
            }
            public DateTime DateTime { get; set; }
        }

        public class Child
        {
            private Parent _parent;
            public Parent Parent
            {
                get { return _parent; }
                set
                {
                    _parent = value;
                    if (GrandChild != null)
                        GrandChild.Parent = _parent;
                }
            }

            public int ID { get; set; }
            public Child GrandChild { get; set; }
            public int IDs { get; set; }
            public int? ID2 { get; set; }
        }

        private Expression<Func<ParentDTO, bool>> _predicateExpression;
        private Parent _valid; 

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<GrandParent, GrandParentDTO>().ReverseMap();
                cfg.CreateMap<Parent, ParentDTO>().ReverseMap();
                cfg.CreateMap<Child, ChildDTO>()
                    .ForMember(d => d.ID_, opt => opt.MapFrom(s => s.ID))
                    .ReverseMap()
                    .ForMember(d => d.ID, opt => opt.MapFrom(s => s.ID_));
            });
        }

        protected override void MainTeardown()
        {
            Should_Validate();
            base.MainTeardown();
        }

        private void Should_Validate()
        {
            var expression = Mapper.Map<Expression<Func<Parent, bool>>>(_predicateExpression);
            var items = new[] {_valid}.AsQueryable();
            _valid.ShouldBeOneOf(items.Where(expression).ToArray());
            var items2 = items.UseAsDataSource().For<ParentDTO>().Where(_predicateExpression);

            items2.Count().ShouldBe(1);
        }

        [Test]
        public void GrandParent_Mapping_To_Sub_Sub_Property_Condition()
        {
            Expression<Func<GrandParentDTO, bool>> _predicateExpression = gp => gp.Parent.Children.Any(c => c.ID2 == 3);
            var expression = Mapper.Map<Expression<Func<GrandParent, bool>>>(_predicateExpression);
            var items = new[] {new GrandParent(){Parent = new Parent(){Children = new[]{new Child(){ID2 = 3}}, Child = new Child(){ID2 = 3}}}}.AsQueryable();
            items.First().ShouldBeOneOf(items.Where(expression).ToArray());
            var items2 = items.UseAsDataSource().For<GrandParentDTO>().Where(_predicateExpression);
            items2.Count().ShouldBe(1);
            When_Use_Outside_Class_Method_Call();
        }

        [Test]
        public void GrandParent_Mapping_To_Sub_Sub_Property_Condition2()
        {
            Expression<Func<IQueryable<GrandParentDTO>, bool>> _predicateExpression = gps => gps.Any(gp => gp.Parent.Children.Any(c => c.ID_ == 3));
            Expression<Func<IQueryable<GrandParentDTO>, IQueryable<GrandParentDTO>>> _predicateExpression2 = gps => gps.Where(gp => gp.Parent.Children.Any(c => c.ID_ == 3));
            var expression = Mapper.Map<Expression<Func<IQueryable<GrandParent>, bool>>>(_predicateExpression);
            var expression2 = Mapper.Map<Expression<Func<IQueryable<GrandParent>, IQueryable<GrandParent>>>>(_predicateExpression2);
            When_Use_Outside_Class_Method_Call();
        }

        [Test]
        public void When_Use_Outside_Class_Method_Call()
        {
            var ids = new[] { 4, 5 };
            _predicateExpression = p => p.Children.Where((c, i) => c.ID_ > 4).Any(c => ids.Contains(c.ID_));
            _valid = new Parent { Children = new[] { new Child { ID = 5 } } };
        }

        [Test]
        public void When_Use_Property_From_Child_Property()
        {
            _predicateExpression = p => p.Child.ID_ > 4;
            _valid = new Parent { Child= new Child { ID = 5 } };
        }

        [Test]
        public void When_Use_Null_Substitution_Mappings_Against_Constants()
        {
            _predicateExpression = p => p.Child.ID_ > 4;
            _valid = new Parent { Child = new Child { ID = 5 } };
        }

        [Test]
        public void When_Use_Null_Substitution_Mappings_Against_Constants_Reverse_Order()
        {
            _predicateExpression = p => 4 < p.Child.ID_;
            _valid = new Parent { Child = new Child { ID = 5 } };
        }

        [Test]
        public void When_Use_Reverse_Null_Substitution_Mappings_Against_Constants()
        {
            _predicateExpression = p => p.Child.ID2 > 4;
            _valid = new Parent {Child = new Child {ID2 = 5}};
        }

        [Test]
        public void When_Use_Reverse_Null_Substitution_Mappings_Against_Constants_Reverse_Order()
        {
            _predicateExpression = p => 4 < p.Child.ID2;
            _valid = new Parent { Child = new Child { ID2 = 5 } };
        }

        [Test]
        public void When_Use_Sub_Lambda_Statement()
        {
            _predicateExpression = p => p.Children.Any(c => c.ID_ > 4);
            _valid = new Parent { Children = new[] { new Child { ID = 5 } } };
        }

        [Test]
        public void When_Use_Multiple_Parameter_Lambda_Statement()
        {
            _predicateExpression = p => p.Children.Any((c, i) => c.ID_ > 4);
            _valid = new Parent { Children = new[] { new Child { ID = 5 } } };
        }

        [Test]
        public void When_Use_Lambda_Statement_With_TypeMapped_Property_Being_Other_Than_First()
        {
            _predicateExpression = p => p.Children.AnyParamReverse((c, c2) => c.ID_ > 4);
            _valid = new Parent {Children = new[] {new Child {ID = 5}}};
        }

        [Test]
        public void When_Use_Child_TypeMap_In_Sub_Lambda_Statement()
        {
            _predicateExpression = p => p.Children.Any(c => c.GrandChild.GrandChild.ID_ == 4);
            _valid = new Parent
            {
                Children = new[]
                {
                    new Child {GrandChild = new Child {GrandChild = new Child {ID = 4}}}
                }
            };
        }

        [Test]
        public void When_Use_Parent_And_Child_Lambda_Parameters_In_Child_Lambda_Statement()
        {
            _predicateExpression = p => p.Children.Any(c => c.GrandChild.ID_ == p.Child.ID_);
            _valid = new Parent
            {
                Child = new Child {ID = 4},
                Children = new[] {new Child {GrandChild = new Child  {ID = 4}}}
            };
        }

        [Test]
        public void When_Use_Lambdas_Where_Type_Matches_Parent_Object()
        {
            _predicateExpression = p => p.Child.Lambda(c => c.ID_ == 4);
            _valid = new Parent {Child = new Child {ID = 4}};
        }

        [Test]
        public void When_Reusing_TypeMaps()
        {
            _predicateExpression = p => p.Child.Parent.Child.GrandChild.ID_ == 4;
            _valid = new Parent {Child = new Child {GrandChild = new Child {ID = 4}}};
        }

        [Test]
        public void When_Using_Non_TypeMapped_Class_Property()
        {
            var year = DateTime.Now.Year;
            _predicateExpression = p => p.DateTime.Year == year;
            _valid = new Parent {DateTime = DateTime.Now};
        }

        [Test]
        public void When_Using_Non_TypeMapped_Class_Method()
        {
            var year = DateTime.Now.Year;
            _predicateExpression = p => p.DateTime.Year.Equals(year);
            _valid = new Parent { DateTime = DateTime.Now };
        }

        [Test]
        public void When_Using_Non_TypeMapped_Class_Property_Against_Constant()
        {
            _predicateExpression = p => p.DateTime.Year.ToString() == "2015";
            _valid = new Parent { DateTime = DateTime.Now };
        }

        [Test]
        public void When_Using_Non_TypeMapped_Class_Method_Against_Constant()
        {
            _predicateExpression = p => p.DateTime.Year.ToString().Equals("2015");
            _valid = new Parent { DateTime = DateTime.Now };
        }

        [Test]
        public void When_Using_Everything_At_Once()
        {
            var year = DateTime.Now.Year;
            _predicateExpression = p => p.DateTime.Year == year && p.Child.Parent.Child.GrandChild.Parent.Child.GrandChild.GrandChild.ID_ == 4 && p.Children.Any(c => c.GrandChild.GrandChild.ID_ == 4);
            _valid = new Parent { DateTime = DateTime.Now, Child = new Child { GrandChild = new Child { GrandChild = new Child { ID = 4 } } }, Children = new[] { new Child { GrandChild = new Child { GrandChild = new Child { ID = 4 } } } } };
        }

        [Test]
        public void When_Using_Static_Constants()
        {
            _predicateExpression = p => p.DateTime.Year.ToString() != string.Empty;
            _valid = new Parent { DateTime = DateTime.Now };
        }
    }


    public class A<T> : IQueryable<T>
    {
        public IEnumerator<T> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public Expression Expression { get; private set; }

        public Type ElementType { get; private set; }

        public IQueryProvider Provider { get; private set; }
    }

    [TestFixture]
    public class When_configuring_all_members_and_some_do_not_match
    {
        public class ModelObjectNotMatching
        {
            public string Foo_notfound { get; set; }
            public string Bar_notfound;
        }

        public class ModelDto
        {
            public string Foo { get; set; }
            public string Bar;
        }

        [Test]
        public void Should_still_apply_configuration_to_missing_members()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ModelObjectNotMatching, ModelDto>()
                .ForAllMembers(opt => opt.Ignore()));
            Mapper.AssertConfigurationIsValid();
        }
    }


    namespace EntityTest1
    {
        #region Dto objects
        public abstract class DynamicPropertyDTO<T>
        {
        }

        public class ComplexPropertyDTO<T> : DynamicPropertyDTO<T>
        {
            public Dictionary<string, object> Properties { get; set; }

            public ComplexPropertyDTO()
            {
                Properties = new Dictionary<string, object>();
            }
        }

        public class ComponentContainerDTO
        {
            public Dictionary<string, ComponentDTO> Components
            {
                get;
                set;
            }

            public ComponentContainerDTO()
            {
                this.Components = new Dictionary<string, ComponentDTO>();
            }
        }

        public class EntityDTO : ComponentContainerDTO
        {
            public int Id { get; set; }

        }

        public class ComponentDTO : ComplexPropertyDTO<object>
        {
            public EntityDTO Owner { get; set; }
            public int Id { get; set; }
            public string Name { get; set; }

        }

        public class HealthDTO : ComponentDTO
        {
            public decimal CurrentHealth { get; set; }

        }

        public class PhysicalLocationDTO : ComponentDTO
        {
            public Point2D Location { get; set; }
        }
        #endregion


        #region Domain objects
        public abstract class DynamicProperty<T> : INotifyPropertyChanged
        {
            public abstract event PropertyChangedEventHandler PropertyChanged;
        }

        public class ComplexProperty<T> : DynamicProperty<T>
        {
            public Dictionary<string, object> Properties { get; set; }

#pragma warning disable 67
            public override event PropertyChangedEventHandler PropertyChanged;

            public ComplexProperty()
            {
                this.Properties = new Dictionary<string, object>();
            }
        }

        public class SimpleProperty<T> : DynamicProperty<T>
        {
#pragma warning disable 67
            public override event PropertyChangedEventHandler PropertyChanged;
        }

        public class ComponentContainer
        {
            public Dictionary<string, Component> Components { get; set; }

            public ComponentContainer()
            {
                this.Components = new Dictionary<string, Component>();
            }
        }

        public class Entity : ComponentContainer
        {
            public int Id { get; set; }

        }

        public class Component : ComplexProperty<object>
        {
            public Entity Owner { get; set; }
            public int Id { get; set; }
            public string Name { get; set; }

        }

        public class Health : Component
        {
            public decimal CurrentHealth { get; set; }
        }

        public struct Point2D
        {
            public decimal X;
            public decimal Y;

            public Point2D(decimal x, decimal y)
            {
                X = x;
                Y = y;
            }
        }

        public class PhysicalLocation : Component
        {
            public Point2D Location { get; set; }
        }
        #endregion

        [TestFixture]
        public class Program
        {
            [Test]
            public void Main()
            {
                var entity = new Entity() { Id = 1 };
                var healthComponent = new Health()
                {
                    CurrentHealth = 100,
                    Owner = entity,
                    Name = "Health",
                    Id = 2
                };
                entity.Components.Add("1", healthComponent);
                var locationComponent = new PhysicalLocation()
                {
                    Location
                        = new Point2D() { X = 1, Y = 2 },
                    Owner = entity,
                    Name =
                        "PhysicalLocation",
                    Id = 3
                };
                entity.Components.Add("2", locationComponent);

                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<ComponentContainer, ComponentContainerDTO>().Include<Entity, EntityDTO>();
                    cfg.CreateMap<Entity, EntityDTO>();
                    cfg.CreateMap<Component, ComponentDTO>()
                        .Include<Health, HealthDTO>()
                        .Include<PhysicalLocation, PhysicalLocationDTO>();
                    cfg.CreateMap<Health, HealthDTO>();
                    cfg.CreateMap<PhysicalLocation, PhysicalLocationDTO>();
                });
                Mapper.AssertConfigurationIsValid();

                var targetEntity = Mapper.Map<Entity, EntityDTO>(entity);

                targetEntity.Components.Count.ShouldBe(2);

                targetEntity.Components.Last().Value.Name.ShouldBe("PhysicalLocation");

                targetEntity.Components.First().Value.ShouldBeOfType<HealthDTO>();

                targetEntity.Components.Last().Value.ShouldBeOfType<PhysicalLocationDTO>();
            }
        }

        [TestFixture]
        public class LazyCollectionMapping
        {
            public LazyCollectionMapping()
            {
            }

            public class OneTimeEnumerator<T> : IEnumerable<T>
            {
                private readonly IEnumerable<T> inner;

                public OneTimeEnumerator(IEnumerable<T> inner)
                {
                    this.inner = inner;
                }

                private bool isEnumerated;

                public IEnumerator<T> GetEnumerator()
                {
                    if (isEnumerated)
                        throw new NotSupportedException();
                    isEnumerated = true;
                    return inner.GetEnumerator();
                }

                IEnumerator IEnumerable.GetEnumerator()
                {
                    return GetEnumerator();
                }
            }

            public class Source
            {
                public IEnumerable<string> Collection { get; set; }
            }

            public class Destination
            {
                public IEnumerable<string> Collection { get; set; }
            }

            [Test]
            public void OneTimeEnumerator_should_throw_exception_if_enumerating_twice()
            {
                var enumerable = Create(new[] { "one", "two", "three" });

                enumerable.Count().ShouldBe(3);

                typeof(NotSupportedException).ShouldBeThrownBy(() => enumerable.Count());
            }

            [Test]
            public void Should_not_enumerate_twice()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());

                var source = new Source { Collection = Create(new[] { "one", "two", "three" }) };
                var enumerable = Mapper.Map(source, new Destination());

                enumerable.Collection.Count().ShouldBe(3);
            }

            public static IEnumerable<T> Create<T>(IEnumerable<T> inner)
            {
                return new OneTimeEnumerator<T>(inner);
            }
        }

        [TestFixture]
        public class MappingToAReadOnlyCollection : AutoMapperSpecBase
        {
            private Destination _destination;

            public class Source
            {
                public int[] Values { get; set; }
                public int[] Values2 { get; set; }
            }

            public class Destination
            {
                public ReadOnlyCollection<int> Values { get; set; }
                public ReadOnlyCollection<int> Values2 { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());
            }

            protected override void Because_of()
            {
                var source = new Source
                {
                    Values = new[] { 1, 2, 3, 4 },
                    Values2 = new[] { 5, 6 },
                };
                _destination = Mapper.Map<Source, Destination>(source);
            }

            [Test]
            public void Should_map_the_list_of_source_items()
            {
                _destination.Values.ShouldNotBeNull();
                _destination.Values.ShouldBeOfLength(4);
                _destination.Values.ShouldContain(1);
                _destination.Values.ShouldContain(2);
                _destination.Values.ShouldContain(3);
                _destination.Values.ShouldContain(4);

                _destination.Values2.ShouldNotBeNull();
                _destination.Values2.ShouldBeOfLength(2);
                _destination.Values2.ShouldContain(5);
                _destination.Values2.ShouldContain(6);
            }
        }

        [TestFixture]
        public class CorrectCtorIsPickedOnDestinationType : AutoMapperSpecBase
        {
            public class SourceClass { }

            public class DestinationClass
            {
                public DestinationClass() { }

                // Since the name of the parameter is 'type', Automapper.TypeMapFactory chooses SourceClass.GetType()
                // to fulfill the dependency, causing an InvalidCastException during Mapper.Map()
                public DestinationClass(int type)
                {
                    Type = type;
                }

                public int Type { get; private set; }
            }

            [Test]
            public void Should_pick_a_ctor_which_best_matches()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<SourceClass, DestinationClass>());

                var source = new SourceClass();

                Mapper.Map<DestinationClass>(source);
            }
        }

        [TestFixture]
        public class MemberNamedTypeWrong : AutoMapperSpecBase
        {
            public class SourceClass
            {
                public string Type { get; set; }
            }

            public class DestinationClass
            {
                public string Type { get; set; }
            }

            [Test]
            public void Should_map_correctly()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<SourceClass, DestinationClass>());

                var source = new SourceClass
                {
                    Type = "Hello"
                };

                var result = Mapper.Map<DestinationClass>(source);
                result.Type.ShouldBe(source.Type);
            }
        }

        [TestFixture]
        public class MultidimensionalArrays : AutoMapperSpecBase
        {
            const int SomeValue = 154;
            Source _e = new Source(SomeValue);
            Destination[,] _destination;
            Source[,] _source;

            public class Source
            {
                public Source(int value)
                {
                    Value = value;
                }
                public int Value { get; set; }
            }

            public class Destination
            {
                public int Value { get; set; }
            }

            protected override void Establish_context()
            {
                Mapper.Initialize(cfg => cfg.CreateMap<Source, Destination>());
            }

            protected override void Because_of()
            {
                _source = new[,] { { _e, _e, new Source(2) }, { _e, new Source(11), _e }, { new Source(20), _e, _e }, { _e, _e, _e } };
                _destination = Mapper.Map<Destination[,]>(_source);
            }

            [Test]
            public void Should_map_multidimensional_array()
            {
                _destination.GetLength(0).ShouldBe(_source.GetLength(0));
                _destination.GetLength(1).ShouldBe(_source.GetLength(1));
                _destination[0, 0].Value.ShouldBe(SomeValue);
                _destination[0, 2].Value.ShouldBe(2);
                _destination[1, 1].Value.ShouldBe(11);
                _destination[2, 0].Value.ShouldBe(20);
                _destination[3, 2].Value.ShouldBe(SomeValue);
            }
        }

        [TestFixture]
        public class FillMultidimensionalArray : AutoMapperSpecBase
        {
            int[,] _source;
            MultidimensionalArrayFiller _filler;
            protected override void Establish_context()
            {
                _source = new int[4, 3];
                _filler = new MultidimensionalArrayFiller(_source);
            }

            protected override void Because_of()
            {
                for (var index = 0; index < _source.Length; index++)
                {
                    _filler.NewValue(index);
                }
            }

            [Test]
            public void Should_set_values_in_array()
            {
                var index = 0;
                foreach (var value in _source)
                {
                    value.ShouldBe(index);
                    index++;
                }
                index.ShouldBe(_source.Length);
            }
        }
    }
}