using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Reflection;

namespace Abp.Tests.Localization
{
    [TestClass]
    public class Test_Assembly
    {
        [TestMethod]
        public void Test_Assmebly()
        {
            var assmebly = Assembly.GetExecutingAssembly();
            Assert.AreEqual(assmebly.FullName, "Abp.Tests, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
            var names = assmebly.GetManifestResourceNames();
            Assert.AreEqual(names.Length, 4);
            Assert.AreEqual(names[0], "Abp.Tests.Localization.TestResourceFiles.MyTestResource.resources");
            Assert.AreEqual(names[1], "Abp.Tests.Resources.Embedded.MyResources.js.MyScriptFile1.js");
            Assert.AreEqual(names[2], "Abp.Tests.Localization.TestXmlFiles.Test-tr.xml");
            Assert.AreEqual(names[3], "Abp.Tests.Localization.TestXmlFiles.Test.xml");
        }
    }
}
