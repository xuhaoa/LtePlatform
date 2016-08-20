using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using AutoMapper.QueryableExtensions;
using NUnit.Framework;
using Shouldly;

namespace AutoMapper.Test.Bug
{
    namespace ParentChildResolversBug
    {
        public enum DestEnum
        {
            a,
            b,
            c,
        }

        public enum ParentDestEnum
        {
            d,
            e,
            f
        }

        public class ParentDest
        {
            public ParentDestEnum? field
            {
                get;
                set;
            }
        }

        public class Dest : ParentDest
        {
            public new DestEnum? field
            {
                get;
                set;
            }
        }

        public class Source
        {
            public string fieldCode
            {
                get;
                set;
            }
        }


        public class ParentResolver : IValueResolver<Source, ParentDest, ParentDestEnum?>
        {
            public ParentDestEnum? Resolve(Source source, ParentDest destination, ParentDestEnum? destMember, ResolutionContext context)
            {
                switch (source.fieldCode)
                {
                    case "testa": return ParentDestEnum.d;
                    case "testb": return ParentDestEnum.e;
                    case "testc": return ParentDestEnum.f;
                    default: return null;
                }
            }
        }

        public class Resolver : IValueResolver<Source, Dest, DestEnum?>
        {
            public DestEnum? Resolve(Source source, Dest destination, DestEnum? destMember, ResolutionContext context)
            {
                switch (source.fieldCode)
                {
                    case "testa": return DestEnum.a;
                    case "testb": return DestEnum.b;
                    case "testc": return DestEnum.c;
                    default: return null;
                }
            }
        }
        
    }

}