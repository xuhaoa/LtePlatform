using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using AutoMapper.Mappers;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Core
{
    [TestFixture]
    public class ConvensionTest : AutoMapperSpecBase
    {
        public class Client
        {
            public int ID { get; set; }
            public string Value { get; set; }
            public string Transval { get; set; }
        }

        public class ClientDto
        {
            public int ID { get; set; }
            public string ValueTransfer { get; set; }
            public string val { get; set; }
        }

        [Test]
        public void Fact()
        {
            Mapper.Initialize(cfg =>
            {
                var profile = cfg.CreateProfile("New Profile");
                profile.AddMemberConfiguration().AddName<PrePostfixName>(
                        _ => _.AddStrings(p => p.DestinationPostfixes, "Transfer")
                            .AddStrings(p => p.Postfixes, "Transfer")
                            .AddStrings(p => p.DestinationPrefixes, "Trans")
                            .AddStrings(p => p.Prefixes, "Trans"));
                profile.AddConditionalObjectMapper().Where((s, d) => s.Name.Contains(d.Name) || d.Name.Contains(s.Name));
            });

            var a2 = Mapper.Map<ClientDto>(new Client() { Value= "Test", Transval = "test"});
            a2.ValueTransfer.ShouldBe("Test");
            a2.val.ShouldBe("test");

            var a = Mapper.Map<Client>(new ClientDto() { ValueTransfer = "TestTransfer", val = "testTransfer"});
            a.Value.ShouldBe("TestTransfer");
            a.Transval.ShouldBe("testTransfer");

            var clients = Mapper.Map<Client[]>(new[] { new ClientDto() });
            Expression<Func<Client, bool>> expr = c => c.ID < 5;
            var clientExp = Mapper.Map<Expression<Func<ClientDto,bool>>>(expr);
        }

        public class ConventionProfile : Profile
        {
            protected override void Configure()
            {
                AddMemberConfiguration().AddName<PrePostfixName>(
                        _ => _.AddStrings(p => p.DestinationPostfixes, "Transfer")
                            .AddStrings(p => p.Postfixes, "Transfer")
                            .AddStrings(p => p.DestinationPrefixes, "Trans")
                            .AddStrings(p => p.Prefixes, "Trans"));
                AddConditionalObjectMapper().Where((s, d) => s.Name.Contains(d.Name) || d.Name.Contains(s.Name));
            }
        }

        public class ToDTO : Profile
        {
            protected override void Configure()
            {
                AddMemberConfiguration().AddName<PrePostfixName>(
                        _ => _.AddStrings(p => p.Postfixes, "Transfer")
                            .AddStrings(p => p.DestinationPrefixes, "Trans")).NameMapper.GetMembers.AddCondition(_ => _ is PropertyInfo);
                AddConditionalObjectMapper().Where((s, d) => s.Name == d.Name + "Dto");
            }
        }

        public class FromDTO : Profile
        {
            protected override void Configure()
            {
                AddMemberConfiguration().AddName<PrePostfixName>(
                        _ => _.AddStrings(p => p.DestinationPostfixes, "Transfer")
                            .AddStrings(p => p.Prefixes, "Trans")).NameMapper.GetMembers.AddCondition(_ => _ is PropertyInfo);
                AddConditionalObjectMapper().Where((s, d) => d.Name == s.Name + "Dto");
            }
        }

        [Test]
        public void Fact2()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<ConventionProfile>();
            });

            var a2 = Mapper.Map<ClientDto>(new Client() { Value = "Test", Transval = "test" });
            a2.ValueTransfer.ShouldBe("Test");
            a2.val.ShouldBe("test");

            var a = Mapper.Map<Client>(new ClientDto() { ValueTransfer = "TestTransfer", val = "testTransfer" });
            a.Value.ShouldBe("TestTransfer");
            a.Transval.ShouldBe("testTransfer");

            var clients = Mapper.Map<Client[]>(new[] { new ClientDto() });
            Expression<Func<Client, bool>> expr = c => c.ID < 5;
            var clientExp = Mapper.Map<Expression<Func<ClientDto, bool>>>(expr);
        }

        [Test]
        public void Fact3()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<ToDTO>();
                cfg.AddProfile<FromDTO>();
            });

            var a2 = Mapper.Map<ClientDto>(new Client() { Value = "Test", Transval = "test" });
            a2.ValueTransfer.ShouldBe("Test");
            a2.val.ShouldBe("test");

            var a = Mapper.Map<Client>(new ClientDto() { ValueTransfer = "TestTransfer", val = "testTransfer" });
            a.Value.ShouldBe("TestTransfer");
            a.Transval.ShouldBe("testTransfer");

            var clients = Mapper.Map<Client[]>(new[] { new ClientDto() });
            Expression<Func<Client, bool>> expr = c => c.ID < 5;
            var clientExp = Mapper.Map<Expression<Func<ClientDto, bool>>>(expr);
        }
    }

    [TestFixture]
    public class CascadeMapperTester : AutoMapperSpecBase
    {
        private Destination _destination;
        private Source _source;
        private CascadeDestination _cascadeDestination;

        public class Source
        {
            public Destination Destination { get; set; }
        }

        public class Destination
        {
            public int Foo1 { get; set; }

            public int Foo2 { get; set; }
        }

        public class CascadeDestination
        {
            public Destination Destination { get; set; }
        }

        public class ExtendedDestination
        {
            public int Foo1 { get; set; }

            public int Foo2 { get; set; }

            public int Foo3 { get; set; }
        }

        public class ExtendedCascadeDestination
        {
            public ExtendedDestination ExtendedDestination { get; set; }
        }

        protected override void Establish_context()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Destination, Destination>();
                cfg.CreateMap<Source, CascadeDestination>();
                cfg.CreateMap<Destination, ExtendedDestination>();
                cfg.CreateMap<Source, ExtendedCascadeDestination>()
                    .ForMember(d => d.ExtendedDestination,
                        opt => opt.MapFrom(s => Mapper.Map<Destination, ExtendedDestination>(s.Destination)));
            });
        }

        protected override void Because_of()
        {
            _source = new Source
            {
                Destination = new Destination
                {
                    Foo1 = 11,
                    Foo2 = 22
                }
            };
        }

        [Test]
        public void Test_plane_case()
        {
            _destination = Mapper.Map<Destination, Destination>(_source.Destination);
            _destination.Foo1.ShouldBe(11);
            _destination.Foo2.ShouldBe(22);
        }

        [Test]
        public void Test_cascade_case()
        {
            _cascadeDestination = Mapper.Map<Source, CascadeDestination>(_source);
            _cascadeDestination.Destination.Foo1.ShouldBe(11);
            _cascadeDestination.Destination.Foo2.ShouldBe(22);
        }

        [Test]
        public void Test_extended_cascade_case()
        {
            var extended = Mapper.Map<Source, ExtendedCascadeDestination>(_source);
            extended.ExtendedDestination.Foo1.ShouldBe(11);
            extended.ExtendedDestination.Foo2.ShouldBe(22);
        }

        [Test]
        public void Test_extended_cascade_case_list()
        {
            var sources = new List<Source>
            {
                _source
            };
            var extended = Mapper.Map<List<Source>, IEnumerable<ExtendedCascadeDestination>>(sources);
            extended.ElementAt(0).ExtendedDestination.Foo1.ShouldBe(11);
            extended.ElementAt(0).ExtendedDestination.Foo2.ShouldBe(22);
        }
    }
}