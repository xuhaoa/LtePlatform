using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Concrete.Mr;
using Lte.Parameters.Entities.Mr;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using NUnit.Framework;
using Shouldly;

namespace Lte.Parameters.Test.Mr
{
    [TestFixture]
    public class InterferenceMongoRepositoryTests
    {
        private readonly IInterferenceMongoRepository _repository = new InterferenceMongoRepository();
        
        [TestCase(501298, 328, 329, "2016-04-28")]
        [TestCase(501454, 255, 438, "2016-04-28")]
        [TestCase(500520, 34, 113, "2016-05-09")]
        [TestCase(552820, 241, 113, "2016-05-09")]
        [TestCase(552820, 242, 113, "2016-05-09")]
        [TestCase(552820, 240, 113, "2016-05-09")]
        public void Test_GetList(int eNodebId, short pci, short neighborPci, string dateString)
        {
            var result = _repository.GetList(eNodebId, pci, neighborPci, DateTime.Parse(dateString));
            Assert.IsNotNull(result);
        }

        [TestCase(500028, 280, 196, "2016-05-09", 26)]
        public void Test_GetList(int eNodebId, short pci, short neighborPci, string dateString, int count)
        {
            var result = _repository.GetList(eNodebId, pci, neighborPci, DateTime.Parse(dateString));
            Assert.AreEqual(result.Count, count);
        }
    }
}
