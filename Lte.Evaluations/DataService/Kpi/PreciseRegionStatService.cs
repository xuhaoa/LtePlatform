using Lte.Domain.Regular;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Extensions;
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
                return query.FilterTownList(_townRepository.GetAll(city));
            });
            var townViews = stats.ConstructViews<TownPreciseCoverage4GStat, TownPreciseView>(_townRepository);
            return townViews.QueryRegionDateView<PreciseRegionDateView, DistrictPreciseView, TownPreciseView>(initialDate,
                DistrictPreciseView.ConstructView);
        }

        public IEnumerable<PreciseRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(x => x.StatTime >= begin & x.StatTime < end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownPreciseCoverage4GStat, TownPreciseView>(_townRepository)).ToList();
            return
                townViews.QueryDateSpanViews<PreciseRegionDateView, DistrictPreciseView, TownPreciseView>(
                    DistrictPreciseView.ConstructView);
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
                return query.FilterTownList(_townRepository.GetAll(city));
            });
            var townViews = stats.ConstructViews<TownRrcStat, TownRrcView>(_townRepository);
            return townViews.QueryRegionDateView<RrcRegionDateView, DistrictRrcView, TownRrcView>(initialDate,
                DistrictRrcView.ConstructView);
        }

        public IEnumerable<RrcRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(x => x.StatTime >= begin & x.StatTime < end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownRrcStat, TownRrcView>(_townRepository)).ToList();
            return
                townViews.QueryDateSpanViews<RrcRegionDateView, DistrictRrcView, TownRrcView>(
                    DistrictRrcView.ConstructView);
        }
    }

    public class CqiRegionStatService
    {
        private readonly ITownQciRepository _statRepository;
        private readonly ITownRepository _townRepository;

        public CqiRegionStatService(ITownQciRepository statRepository, ITownRepository townRepository)
        {
            _statRepository = statRepository;
            _townRepository = townRepository;
        }

        public QciRegionDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _statRepository.QueryLastDate(initialDate, (repository, beginDate, endDate) =>
            {
                var query =
                    _statRepository.GetAllList(x => x.StatTime >= beginDate & x.StatTime < endDate);
                return query.FilterTownList(_townRepository.GetAll(city));
            });
            var townViews = stats.ConstructViews<TownQciStat, TownQciView>(_townRepository);
            return townViews.QueryRegionDateView<QciRegionDateView, DistrictQciView, TownQciView>(initialDate,
                DistrictQciView.ConstructView);
        }

        public IEnumerable<QciRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(x => x.StatTime >= begin & x.StatTime < end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownQciStat, TownQciView>(_townRepository)).ToList();
            return
                townViews.QueryDateSpanViews<QciRegionDateView, DistrictQciView, TownQciView>(
                    DistrictQciView.ConstructView);
        }
    }
}
