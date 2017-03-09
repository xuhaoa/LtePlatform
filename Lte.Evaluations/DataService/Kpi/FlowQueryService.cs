using AutoMapper;
using Lte.Evaluations.DataService.Switch;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.ViewModels.RegionKpi;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowQueryService
    {
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ICellHuaweiMongoRepository _huaweiCellRepository;

        public FlowQueryService(IFlowHuaweiRepository huaweiRepository, IFlowZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellHuaweiMongoRepository huaweiCellRepository)
        {
            _huaweiRepository = huaweiRepository;
            _zteRepository = zteRepository;
            _eNodebRepository = eNodebRepository;
            _huaweiCellRepository = huaweiCellRepository;
        }

        private IDateSpanQuery<List<FlowView>> ConstructQuery(int eNodebId, byte sectorId)
        {
            var eNodeb = _eNodebRepository.GetByENodebId(eNodebId);
            if (eNodeb == null) return null;
            return eNodeb.Factory == "华为"
                ? (IDateSpanQuery<List<FlowView>>)
                    new HuaweiFlowQuery(_huaweiRepository, _huaweiCellRepository, eNodebId, sectorId)
                : new ZteFlowQuery(_zteRepository, eNodebId, sectorId);
        }

        public List<FlowView> QueryFlow(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            var query = ConstructQuery(eNodebId, sectorId);
            return query?.Query(begin, end);
        }

        public FlowView QueryAverageView(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            var query = ConstructQuery(eNodebId, sectorId);
            return FlowView.Average(query?.Query(begin, end));
        }
    }

    internal class HuaweiFlowQuery : IDateSpanQuery<List<FlowView>>
    {
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly ICellHuaweiMongoRepository _huaweiCellRepository;
        private readonly int _eNodebId;
        private readonly byte _sectorId;

        public HuaweiFlowQuery(IFlowHuaweiRepository huaweiRepository, ICellHuaweiMongoRepository huaweiCellRepository,
            int eNodebId, byte sectorId)
        {
            _huaweiRepository = huaweiRepository;
            _huaweiCellRepository = huaweiCellRepository;
            _eNodebId = eNodebId;
            _sectorId = sectorId;
        }

        public List<FlowView> Query(DateTime begin, DateTime end)
        {
            var huaweiCell = _huaweiCellRepository.GetRecent(_eNodebId, _sectorId);
            var localCellId = huaweiCell?.LocalCellId ?? _sectorId;
            var views =
                Mapper.Map<List<FlowHuawei>, List<FlowView>>(_huaweiRepository.GetAllList(begin, end, _eNodebId,
                    (byte) localCellId));
            foreach (var view in views)
            {
                view.SectorId = _sectorId;
            }
            return views;
        }
    }

    internal class ZteFlowQuery : IDateSpanQuery<List<FlowView>>
    {
        private readonly IFlowZteRepository _zteRepository;
        private readonly int _eNodebId;
        private readonly byte _sectorId;

        public ZteFlowQuery(IFlowZteRepository zteRepository, int eNodebId, byte sectorId)
        {
            _zteRepository = zteRepository;
            _eNodebId = eNodebId;
            _sectorId = sectorId;
        }

        public List<FlowView> Query(DateTime begin, DateTime end)
        {
            return Mapper.Map<List<FlowZte>, List<FlowView>>(_zteRepository.GetAllList(begin, end, _eNodebId, _sectorId));
        }
    }

    public class TownFlowService
    {
        private readonly ITownFlowRepository _repository;
        private readonly ITownRepository _townRepository;

        public TownFlowService(ITownFlowRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }

        public IEnumerable<TownFlowView> QueryLastDateStat(DateTime initialDate)
        {
            var beginDate = initialDate.AddDays(-100);
            var endDate = initialDate.AddDays(1);
            var rangeStats = _repository.GetAllList(beginDate, endDate);
            if (rangeStats.Count == 0) return new List<TownFlowView>();
            var maxDate = rangeStats.Max(x => x.StatTime);
            var stats = rangeStats.Where(x => x.StatTime == maxDate).ToList();
            return stats.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository));
        }

        public IEnumerable<FlowRegionDateView> QueryDateSpanStats(DateTime begin, DateTime end, string city)
        {
            var query = _repository.GetAllList(begin, end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository)).ToList();
            return from view in townViews
                   group view by view.StatTime into g
                   select new FlowRegionDateView
                   {
                       StatDate = g.Key,
                       TownFlowViews = g.Select(x => x),
                       DistrictFlowViews = g.Select(x => x).Merge(DistrictFlowView.ConstructView)
                   };
        } 
    }
}
