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
using System.Linq.Expressions;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.ViewModels.RegionKpi;
using Abp.EntityFramework.Dependency;
using Castle.Core.Internal;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowQueryService
    {
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ICellHuaweiMongoRepository _huaweiCellRepository;
        private readonly ITownRepository _townRepository;

        public FlowQueryService(IFlowHuaweiRepository huaweiRepository, IFlowZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellHuaweiMongoRepository huaweiCellRepository,
            ITownRepository townRepository)
        {
            _huaweiRepository = huaweiRepository;
            _zteRepository = zteRepository;
            _eNodebRepository = eNodebRepository;
            _huaweiCellRepository = huaweiCellRepository;
            _townRepository = townRepository;
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

        public IEnumerable<FlowView> QueryTopDownSwitchViews(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = QueryDistrictFlowViews(city, district,
                _zteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectA2 + x.RedirectB2 > 2000),
                _huaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectCdma2000 > 2000));
            return results.OrderByDescending(x => x.RedirectCdma2000).Take(topCount);
        }

        public IEnumerable<FlowView> QueryTopRank2Views(string city, string district, DateTime begin, DateTime end,
            int topCount)
        {
            var results = QueryDistrictFlowViews(city, district,
                _zteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.SchedulingTm3 > 10000000),
                _huaweiRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.SchedulingRank1 + x.SchedulingRank2 > 20000000));
            return results.OrderBy(x => x.Rank2Rate).Take(topCount);
        }

        private IEnumerable<FlowView> QueryDistrictFlowViews(string city, string district, 
            List<FlowZte> zteStats, List<FlowHuawei> huaweiStats)
        {
            var towns = _townRepository.GetAllList(city, district);
            if (!towns.Any())
            {
                return new List<FlowView>();
            }
            var eNodebs = (from eNodeb in _eNodebRepository.GetAllList()
                join town in towns on eNodeb.TownId equals town.Id
                select eNodeb).ToList();
            if (!eNodebs.Any())
            {
                return new List<FlowView>();
            }
            var zteViews = new List<FlowView>();
            var zteGroups = zteStats.GroupBy(x => new
            {
                x.ENodebId,
                x.SectorId
            });
            foreach (var group in zteGroups)
            {
                var eNodeb = eNodebs.FirstOrDefault(x => x.ENodebId == group.Key.ENodebId);

                if (eNodeb == null) continue;
                var views = group.Select(g => g.MapTo<FlowView>());
                var view = FlowView.Average(views);
                view.ENodebName = eNodeb.Name;
                zteViews.Add(view);
            }
            var huaweiViews = new List<FlowView>();
            if (eNodebs.FirstOrDefault(x => x.Factory == "华为") == null) return zteViews;
            var huaweiGroups = huaweiStats.GroupBy(x => new
            {
                x.ENodebId,
                x.LocalCellId
            });
            foreach (var group in huaweiGroups)
            {
                var eNodeb = eNodebs.FirstOrDefault(x => x.ENodebId == group.Key.ENodebId);

                if (eNodeb == null) continue;
                var views = group.Select(g => g.MapTo<FlowView>());
                var view = FlowView.Average(views);
                view.ENodebName = eNodeb.Name;
                var cell = _huaweiCellRepository.GetByLocal(group.Key.ENodebId, group.Key.LocalCellId);
                view.SectorId = (byte)(cell?.CellId??group.Key.LocalCellId);
                huaweiViews.Add(view);
            }

            return zteViews.Concat(huaweiViews).ToList();
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
            var stats = _repository.Query(initialDate, (repository, beginDate, endDate) => repository.GetAllList(beginDate, endDate));
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
                       DistrictFlowViews = g.Select(x => x).Merge(v =>v.MapTo<DistrictFlowView>())
                   };
        } 
    }

    public class DownSwitchFlowService
    {
        private readonly IDownSwitchFlowRepository _repository;

        private readonly IAppStreamRepository _streamRepository;
        private readonly IWebBrowsingRepository _browsingRepository;

        public DownSwitchFlowService(IDownSwitchFlowRepository repository,
            IAppStreamRepository streamRepository, IWebBrowsingRepository browsingRepository)
        {
            _repository = repository;
            _streamRepository = streamRepository;
            _browsingRepository = browsingRepository;
        }

        public DownSwitchFlowDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _repository.QueryDate(initialDate,
                (repository, beginDate, endDate) => repository.GetAllList(beginDate, endDate)).ToList();
            return new DownSwitchFlowDateView
            {
                StatDate = stats.Any() ? stats.First().StatDate : initialDate,
                City = city,
                DownSwitchFlowViews = stats.MapTo<IEnumerable<DownSwitchFlowView>>()
            };
        }

        public IEnumerable<AppSteam> QueryAppSteams(DateTime initialDate)
        {
            return
                _streamRepository.QueryDate(initialDate,
                    (repository, beginDate, endDate) =>
                        repository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate)).ToList();
        }

        public IEnumerable<WebBrowsing> QueryBrowsings(DateTime initialDate)
        {
            return
                _browsingRepository.QueryDate(initialDate,
                    (repository, beginDate, endDate) =>
                        repository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate)).ToList();
        }
    }
}
