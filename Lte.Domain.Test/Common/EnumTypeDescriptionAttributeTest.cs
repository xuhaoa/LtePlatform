using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using NUnit.Framework;

namespace Lte.Domain.Test.Common
{
    [TestFixture]
    public class EnumTypeDescriptionAttributeTest
    {
        [Test]
        public void TestTypeName()
        {
            Assert.AreEqual(typeof (AlarmType).Name, "AlarmType");
        }
        
        [Test]
        public void TestEnumTypeDescriptionAttribute()
        {
            var attribute =
                typeof (AlarmType).GetCustomAttribute<EnumTypeDescriptionAttribute>();
            Assert.IsNotNull(attribute);
            var list = attribute.TupleList;
            Assert.AreEqual(list.Length, 46);
            var defaultValue = attribute.DefaultValue;
            Assert.AreEqual(defaultValue, AlarmType.Others);
        }

        [Test]
        public void TestGetEnumType()
        {
            var alarmType = "天馈驻波比异常(198098465)".GetEnumType<AlarmType>();
            Assert.AreEqual(alarmType, AlarmType.VswrLte);
        }

        [Test]
        public void TestGetEnumTypeAlternative()
        {
            var alarmType = "天馈驻波比异常(198098465)".GetEnumType(WirelessPublic.AlarmTypeHuaweiList);
            Assert.AreEqual(alarmType, AlarmType.Others);
            alarmType = "BBU CPRI光模块/电接口不在位告警".GetEnumType(WirelessPublic.AlarmTypeHuaweiList);
            Assert.AreEqual(alarmType, AlarmType.BbuCpriLost);
        }

        [Test]
        public void TestGetEnumDescription()
        {
            var alarmDecription = AlarmType.VswrLte.GetEnumDescription();
            Assert.AreEqual(alarmDecription, "天馈驻波比异常(198098465)");
            alarmDecription = AlarmType.BbuCpriLost.GetEnumDescription();
            Assert.AreEqual(alarmDecription, null);
        }

        [Test]
        public void TestGetEnumDescriptionAlternative()
        {
            var alarmDecription = AlarmType.VswrLte.GetEnumDescription(WirelessPublic.AlarmTypeHuaweiList);
            Assert.AreEqual(alarmDecription, "天馈驻波比异常(198098465)");
            alarmDecription = AlarmType.BbuCpriLost.GetEnumDescription(WirelessPublic.AlarmTypeHuaweiList);
            Assert.AreEqual(alarmDecription, "BBU CPRI光模块/电接口不在位告警");
        }
    }
}
