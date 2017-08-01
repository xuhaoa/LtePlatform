using Lte.Domain.Regular;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class PreciseRegionStatService
    {
        private readonly ITownPreciseCoverage4GStatRepository _statRepository;
        private readonly ITownRepository _townRepository;

        public PreciseRegionStatService(ITownPreciseCoverage4GStatRepository statRepository,
            ITownRepository townRepository)
        {
            _statRepository = statRepository;
            _townRepository = townRepository;
        }

        public PreciseRegionDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _statRepository.QueryLastDate(initialDate, (repository, beginDate, endDate) =>
            {
                var query =
                    _statRepository.GetAllList(x => x.StatTime >= beginDate & x.StatTime < endDate);
                return
                    (from q in query
                        join t in _townRepository.GetAll(city) on q.TownId equals t.Id
                        select q).ToList();
            });
            var townViews = stats
                    .Select(x => x.ConstructView<TownPreciseCoverage4GStat, TownPreciseView>(_townRepository))
                    .ToList();

            return new PreciseRegionDateView
            {
                StatDate = townViews.Any() ? townViews.First().StatTime : initialDate,
                TownPreciseViews = townViews,
                DistrictPreciseViews = townViews.Merge(DistrictPreciseView.ConstructView)
            };
        }

        public IEnumerable<PreciseRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(x => x.StatTime >= begin & x.StatTime < end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownPreciseCoverage4GStat, TownPreciseView>(_townRepository)).ToList();
            return from view in townViews
                   group view by view.StatTime into g
                   select new PreciseRegionDateView
                   {
                       StatDate = g.Key,
                       TownPreciseViews = g.Select(x => x),
                       DistrictPreciseViews = g.Select(x => x).Merge(DistrictPreciseView.ConstructView)
                   };
        }
    }

    public class RrcRegionStatService
    {
        private readonly ITownRrcRepository _statRepository;
        private readonly ITownRepository _townRepository;

        public RrcRegionStatService(ITownRrcRepository statRepository, ITownRepository townRepository)
        {
            _statRepository = statRepository;
            _townRepository = townRepository;
        }

        public RrcRegionDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _statRepository.QueryLastDate(initialDate, (repository, beginDate, endDate) =>
            {
                var query =
                    _statRepository.GetAllList(x => x.StatTime >= beginDate & x.StatTime < endDate);
                return
                    (from q in query
                     join t in _townRepository.GetAll(city) on q.TownId equals t.Id
                     select q).ToList();
            });
            var townViews = stats
                    .Select(x => x.ConstructView<TownRrcStat, TownRrcView>(_townRepository))
                    .ToList();

            return new RrcRegionDateView
            {
                StatDate = townViews.Any() ? townViews.First().StatTime : initialDate,
                TownRrcViews = townViews,
                DistrictRrcViews = townViews.Merge(DistrictRrcView.ConstructView)
            };
        }

        public IEnumerable<RrcRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(x => x.StatTime >= begin & x.StatTime < end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownRrcStat, TownRrcView>(_townRepository)).ToList();
            return from view in townViews
                   group view by view.StatTime into g
                   select new RrcRegionDateView
                   {
                       StatDate = g.Key,
                       TownRrcViews = g.Select(x => x),
                       DistrictRrcViews = g.Select(x => x).Merge(DistrictRrcView.ConstructView)
                   };
        }
    }
}
