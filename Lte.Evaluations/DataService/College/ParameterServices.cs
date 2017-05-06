using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;

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
        private readonly IHotSpotCellRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ILteRruRepository _rruRepository;

        public CollegeCellViewService(IHotSpotCellRepository repository, ICellRepository cellRepoistory,
            IENodebRepository eNodebRepository, ILteRruRepository rruRepository)
        {
            _repository = repository;
            _cellRepository = cellRepoistory;
            _eNodebRepository = eNodebRepository;
            _rruRepository = rruRepository;
        }

        public IEnumerable<CellRruView> GetViews(string collegeName)
        {
            var ids =
                _repository.GetAllList(
                    x =>
                        x.HotspotType == HotspotType.College && x.HotspotName == collegeName &&
                        x.InfrastructureType == InfrastructureType.Cell);
            var cells =
                ids.Select(x => _cellRepository.GetBySectorId(x.ENodebId, x.SectorId))
                    .Where(cell => cell != null)
                    .ToList();
            return cells.Any()
                ? cells.Select(x => CellRruView.ConstructView(x, _eNodebRepository, _rruRepository))
                : new List<CellRruView>();
        }

        public IEnumerable<CellRruView> GetRruViews(string name)
        {
            var ids = _repository.GetAllList(
                    x =>
                        x.HotspotName == name && x.InfrastructureType == InfrastructureType.Cell);
            var query = ids.Select(x => _cellRepository.GetBySectorId(x.ENodebId, x.SectorId)).Where(cell => cell != null).ToList();
            return query.Any()
                ? query.Select(x => CellRruView.ConstructView(x, _eNodebRepository, _rruRepository))
                : new List<CellRruView>();
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
