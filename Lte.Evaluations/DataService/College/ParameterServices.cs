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
        private readonly IInfrastructureRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ILteRruRepository _rruRepository;
        private readonly IIndoorDistributionRepository _indoorDistributionRepository;

        public CollegeCellViewService(IInfrastructureRepository repository, ICellRepository cellRepoistory,
            IENodebRepository eNodebRepository, ILteRruRepository rruRepository, 
            IIndoorDistributionRepository indoorDistributionRepository)
        {
            _repository = repository;
            _cellRepository = cellRepoistory;
            _eNodebRepository = eNodebRepository;
            _rruRepository = rruRepository;
            _indoorDistributionRepository = indoorDistributionRepository;
        }

        public IEnumerable<CellRruView> GetViews(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.Cell);
            var cells = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return cells.Any()
                ? cells.Select(x => CellRruView.ConstructView(x, _eNodebRepository, _rruRepository))
                : new List<CellRruView>();
        }

        public IEnumerable<CellRruView> GetRruViews(string name)
        {
            var hotSpot =
                _repository.FirstOrDefault(
                    x => x.HotspotName == name && x.InfrastructureType == InfrastructureType.HotSpot);
            if (hotSpot == null) return new List<CellRruView>();
            var ids = _repository.GetHotSpotInfrastructureIds(name, InfrastructureType.Cell, hotSpot.HotspotType);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            var validPoints =
                query.Where(x => x.Longtitute > 110 && x.Longtitute < 120 && x.Lattitute > 20 && x.Lattitute < 30);
            if (validPoints.Any())
            {
                var longtitute = validPoints.Average(x => x.Longtitute);
                var lattitute = validPoints.Average(x => x.Lattitute);
                var distribution = _indoorDistributionRepository.FirstOrDefault(x =>
                    x.Name == "Hot Spot" && x.Id == hotSpot.InfrastructureId && x.SourceType == "Hot Spot");
                if (distribution != null)
                {
                    distribution.Longtitute = longtitute;
                    distribution.Lattitute = lattitute;
                    _indoorDistributionRepository.SaveChanges();
                }
            }
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
