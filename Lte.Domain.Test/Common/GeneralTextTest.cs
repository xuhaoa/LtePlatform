using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common;
using NUnit.Framework;

namespace Lte.Domain.Test.Common
{
    [TestFixture]
    public class GeneralTextTest
    {
        [Test]
        public void TestSplittedFields()
        {
            var source = "/新增资源/已立项待建设/";
            var fields = source.GetSplittedFields('/');
            Assert.AreEqual(fields.Length, 2);
            Assert.AreEqual(fields[0], "新增资源");
        }
    }
}
