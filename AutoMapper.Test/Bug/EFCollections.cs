﻿using NUnit.Framework;
using Shouldly;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AutoMapper.Test.Bug
{
    [TestFixture]
    public class EFCollections : AutoMapperSpecBase
    {
        private Dest _dest;

        public class Source
        {
            public ICollection<Child> Children { get; set; }

        }

        public class OtherSource : Source
        {
        }

        public class OtherChild : Child
        {

        }

        public class Dest
        {
            public ICollection<DestChild> Children { get; set; }
        }

        public class DestChild { }

        protected override MapperConfiguration Configuration { get; } = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Source, Dest>();
            cfg.CreateMap<Child, DestChild>();
        });

        protected override void Because_of()
        {
            var source = new OtherSource
            {
                Children = new Collection<Child>
                {
                    new OtherChild(),
                    new OtherChild()
                }
            };
            _dest = Mapper.Map<Source, Dest>(source);
        }

        [Test]
        public void Should_map_collection_items()
        {
            _dest.Children.Count.ShouldBe(2);
        }
    }
}
