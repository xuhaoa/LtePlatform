using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common;
using NUnit.Framework;
using TraceParser.Common;
using Moq;

namespace TraceParser.Test.RRC
{
    [CodeBitChoice(Choice = 4)]
    public class Foo
    {
        [CodeBit(Position = 2, BitToBeRead = 55)]
        public string Field1;

        [CodeBit(Position = 5, BitToBeRead = 67)]
        public string Field2;

        [CodeBit(Position = 7, BitToBeRead = 33)]
        public string Field3;
    }

    [TestFixture]
    public class CodeBitAttributeTest
    {
        private readonly Mock<IBitArrayReader> _reader = new Mock<IBitArrayReader>();

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _reader.Setup(x => x.ReadBitString(It.IsAny<int>())).Returns<int>(position => "code" + position.ToString());
        }
    }
}
