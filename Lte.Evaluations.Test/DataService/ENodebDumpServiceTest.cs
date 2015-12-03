﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.Should;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.Dump;
using Lte.Evaluations.MapperSerive;
using Lte.Evaluations.Test.MockItems;
using Lte.Evaluations.Test.DataService.Queries;
using Lte.Parameters.Abstract;
using Lte.Parameters.Entities;
using Lte.Parameters.MockOperations;
using Moq;
using NUnit.Framework;

namespace Lte.Evaluations.Test.DataService
{
    [TestFixture]
    public class ENodebDumpServiceTest
    {
        private readonly Mock<IENodebRepository> _eNodebRepository = new Mock<IENodebRepository>();
        private readonly Mock<ITownRepository> _townRepository = new Mock<ITownRepository>();
        private ENodebDumpService _service;

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            _service = new ENodebDumpService(_eNodebRepository.Object, _townRepository.Object);
            _eNodebRepository.MockOperations();
            _eNodebRepository.MockRepositorySaveItems<ENodeb, IENodebRepository>();
            _townRepository.MockOpertion();
            _townRepository.MockSixTowns();
            ParametersDumpMapperService.MapFromENodebContainerService();
        }

        [SetUp]
        public void Setup()
        {
            _eNodebRepository.MockThreeENodebs();
        }

        [TestCase("abc", "ieowue", 1, 2, "10.17.165.0", "10.17.165.100")]
        [TestCase("arebc", "ieo--wue", 3, 4, "219.128.254.0", "219.128.254.41")]
        public void Test_SingleItem(string name, string address, int townId, int eNodebId, string gatewayAddress,
            string ipAddress)
        {
            var infos = new List<ENodebExcel>
            {
                new ENodebExcel
                {
                    Name = name,
                    Address = address,
                    ENodebId = eNodebId,
                    Ip = new IpAddress(ipAddress),
                    Gateway = new IpAddress(gatewayAddress),
                    CityName = "city-" + townId,
                    DistrictName = "district-" + townId,
                    TownName = "town-" + townId
                }
            };
            _service.DumpNewEnodebExcels(infos);
            _eNodebRepository.Object.Count().ShouldEqual(4);
            _eNodebRepository.Object.GetAllList()[3].ShouldEqual(name,address,townId,eNodebId,gatewayAddress,ipAddress);
        }
    }
}
