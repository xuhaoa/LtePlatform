using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeAlarmService
    {
        private readonly IInfrastructureRepository _infrastructureRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IAlarmRepository _alarmRepository;

        public CollegeAlarmService(IInfrastructureRepository infrastructureRepository,
            IENodebRepository eNodebRepository, IAlarmRepository alarmRepository)
        {
            _infrastructureRepository = infrastructureRepository;
            _eNodebRepository = eNodebRepository;
            _alarmRepository = alarmRepository;
        }

        public IEnumerable<Tuple<string, IEnumerable<AlarmStat>>> QueryCollegeENodebAlarms(string collegeName,
            DateTime begin, DateTime end)
        {
            var ids = _infrastructureRepository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.ENodeb);
            return (from id in ids
                    select _eNodebRepository.Get(id)
                into eNodeb
                    where eNodeb != null
                    let stats = _alarmRepository.GetAllList(begin, end, eNodeb.ENodebId)
                    select new Tuple<string, IEnumerable<AlarmStat>>(eNodeb.Name, stats)).ToList();
        }
    }

    public class CollegeCellViewService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;

        public CollegeCellViewService(IInfrastructureRepository repository, ICellRepository cellRepoistory,
            IENodebRepository eNodebRepository)
        {
            _repository = repository;
            _cellRepository = cellRepoistory;
            _eNodebRepository = eNodebRepository;
        }

        public IEnumerable<CellView> GetViews(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.Cell);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? query.Select(x => CellView.ConstructView(x, _eNodebRepository))
                : new List<CellView>();
        }

    }

    public class CollegeCdmaCellViewService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly ICdmaCellRepository _cellRepository;
        private readonly IBtsRepository _btsRepository;

        public CollegeCdmaCellViewService(IInfrastructureRepository repository, ICdmaCellRepository cellRepository,
            IBtsRepository btsRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _btsRepository = btsRepository;
        }

        public IEnumerable<CdmaCellView> GetViews(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.CdmaCell);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? query.Select(x => CdmaCellView.ConstructView(x, _btsRepository))
                : null;
        }

    }
}
