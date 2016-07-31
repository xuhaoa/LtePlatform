using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Remoting.Channels;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using NUnit.Framework;

namespace Lte.Domain.Test.Regular
{
    [TestFixture]
    public class EnumTypeConstructorTest
    {
        private class Source
        {
            public VehicleType VehicleType { get; set; } 
        }

        private class Dest
        {
            public string VehicleTypeDescription { get; set; }
        }

        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {
            Expression<Func<Source, Dest>> constructor = src => new Dest
            {
                VehicleTypeDescription = src.VehicleType.GetEnumDescription()
            };
            Mapper.CreateMap(typeof(Source), typeof(Dest)).ConstructProjectionUsing(constructor);
        }

        [Test]
        public void Test()
        {
            var src = new Source
            {
                VehicleType = VehicleType.Broadcast
            };
            var dest = Mapper.Map<Source, Dest>(src);
            Assert.AreEqual(dest.VehicleTypeDescription.GetEnumType<VehicleType>(), VehicleType.Broadcast);
        }
    }

    public class MemberResolutionUsingTest
    {
        private class Source
        {
            public VehicleType VehicleType { get; set; }
        }

        private class Dest
        {
            public string VehicleTypeDescription { get; set; }

            public DateTime DestTime { get; set; }
        }

        class TypeResolver : ValueResolver<VehicleType,string>
        {
            protected override string ResolveCore(VehicleType source)
            {
                return source.GetEnumDescription();
            }
        }

        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {

            Mapper.CreateMap(typeof (Source), typeof (Dest))
                .ForMember("VehicleTypeDescription",
                    map => map.ResolveUsing(typeof (TypeResolver)).FromMember("VehicleType"))
                .ForMember("DestTime", map => map.ResolveUsing(typeof (DateTimeNowTransform)));
        }

        [Test]
        public void Test()
        {
            var src = new Source
            {
                VehicleType = VehicleType.Broadcast
            };
            var dest = Mapper.Map<Source, Dest>(src);
            Assert.AreEqual(dest.VehicleTypeDescription.GetEnumType<VehicleType>(), VehicleType.Broadcast);
            Assert.AreEqual(dest.DestTime.Date, DateTime.Today);
        }
    }
}
