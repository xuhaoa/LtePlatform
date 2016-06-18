using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeAlarmService
    {
        private readonly ICollegeRepository _repository;
        private readonly IInfrastructureRepository _infrastructureRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IAlarmRepository _alarmRepository;

        public CollegeAlarmService(ICollegeRepository repository, IInfrastructureRepository infrastructureRepository,
            IENodebRepository eNodebRepository, IAlarmRepository alarmRepository)
        {
            _repository = repository;
            _infrastructureRepository = infrastructureRepository;
            _eNodebRepository = eNodebRepository;
            _alarmRepository = alarmRepository;
        }

        public IEnumerable<Tuple<string, IEnumerable<AlarmStat>>> QueryCollegeENodebAlarms(string collegeName,
            DateTime begin, DateTime end)
        {
            var ids = _infrastructureRepository.GetENodebIds(collegeName);
            return (from id in ids
                    select _eNodebRepository.Get(id)
                into eNodeb
                    where eNodeb != null
                    let stats = _alarmRepository.GetAllList(begin, end, eNodeb.ENodebId)
                    select new Tuple<string, IEnumerable<AlarmStat>>(eNodeb.Name, stats)).ToList();
        }

        public Dictionary<string, IEnumerable<Tuple<string, int>>> GetAlarmCounts(DateTime begin, DateTime end)
        {
            var colleges = _repository.GetAllList().Select(x => x.Name);
            var results = new Dictionary<string, IEnumerable<Tuple<string, int>>>();
            foreach (var college in colleges)
            {
                var alarms = QueryCollegeENodebAlarms(college, begin, end).ToArray();
                if (alarms.Any())
                {
                    results.Add(college, alarms.Select(x => new Tuple<string, int>(x.Item1, x.Item2.Count())));
                }
            }
            return results;
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
            var ids = _repository.GetCellIds(collegeName);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? query.Select(x => CellView.ConstructView(x, _eNodebRepository))
                : null;
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
            var ids = _repository.GetCdmaCellIds(collegeName);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? query.Select(x => CdmaCellView.ConstructView(x, _btsRepository))
                : null;
        }

    }
}
