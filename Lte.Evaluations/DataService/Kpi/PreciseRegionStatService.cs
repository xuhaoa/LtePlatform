using Lte.Domain.Regular;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Geo;

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
            var beginDate = initialDate.AddDays(-100);
            var endDate = initialDate.AddDays(1);
            var query =
                _statRepository.GetAllList(beginDate, endDate);
            var result =
                (from q in query
                    join t in _townRepository.GetAll(city) on q.TownId equals t.Id
                    select q).ToList();
            if (result.Count == 0) return null;
            var maxDate = result.Max(x => x.StatTime);
            var townViews =
                result.Where(x => x.StatTime == maxDate)
                    .Select(x => x.ConstructView<TownPreciseCoverage4GStat, TownPreciseView>(_townRepository))
                    .ToList();
            return new PreciseRegionDateView
            {
                StatDate = maxDate,
                TownPreciseViews = townViews,
                DistrictPreciseViews = townViews.Merge(DistrictPreciseView.ConstructView)
            };
        }

        public IEnumerable<PreciseRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(begin, end);
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
}
