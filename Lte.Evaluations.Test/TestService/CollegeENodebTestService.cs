using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.MockOperations;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.TestService
{
    public class CollegeENodebTestService
    {
        private readonly Mock<IInfrastructureRepository> _repository;
        private readonly Mock<IENodebRepository> _eNodebRepository;
        private readonly Mock<IAlarmRepository> _alarmRepository;

        public CollegeENodebTestService(Mock<IInfrastructureRepository> repository,
            Mock<IENodebRepository> eNodebRepository, Mock<IAlarmRepository> alarmRepository)
        {
            _repository = repository;
            _eNodebRepository = eNodebRepository;
            _alarmRepository = alarmRepository;
        }

        public void MockOneENodebInfrastructure(int id)
        {
            var infrastructures = new List<InfrastructureInfo>
            {
                new InfrastructureInfo
                {
                    HotspotName = "College-"+id,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.ENodeb,
                    InfrastructureId = id
                }
            };
            _repository.MockQueryItems(infrastructures.AsQueryable());
        }

        public void MockOneAlarm(string dateString)
        {
            _alarmRepository.MockQueryItems(new List<AlarmStat>
            {
                new AlarmStat {HappenTime = DateTime.Parse(dateString), Details = "Single"}
            }.AsQueryable());
        }

        public void MockManyENodebInfrastructure(Dictionary<string, IEnumerable<int>> definitions)
        {
            var infrastructures = new List<InfrastructureInfo>();
            foreach (var definition in definitions)
            {
                infrastructures.AddRange(definition.Value.Select(x => new InfrastructureInfo
                {
                    HotspotName = definition.Key,
                    HotspotType = HotspotType.College,
                    InfrastructureType = InfrastructureType.ENodeb,
                    InfrastructureId = x
                }));
            }
            _repository.MockQueryItems(infrastructures.AsQueryable());
        }
    }
}
