using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Extensions;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class MrsRegionStatService
    {
        private readonly ITownMrsRsrpRepository _statRepository;
        private readonly ITownRepository _townRepository;

        public MrsRegionStatService(ITownMrsRsrpRepository statRepository, ITownRepository townRepository)
        {
            _statRepository = statRepository;
            _townRepository = townRepository;
        }

        public MrsRegionDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _statRepository.QueryDate(initialDate, (repository, beginDate, endDate) =>
            {
                var query =
                    _statRepository.GetAllList(x => x.StatDate >= beginDate & x.StatDate < endDate);
                return query.FilterTownList(_townRepository.GetAllList().Where(x => x.CityName == city).ToList());
            });
            var townViews = stats.ConstructViews<TownMrsRsrp, TownMrsRsrpView>(_townRepository);
            return townViews.QueryRegionDateDateView<MrsRegionDateView, DistrictMrsRsrpView, TownMrsRsrpView>(initialDate,
                DistrictMrsRsrpView.ConstructView);
        }

        public IEnumerable<MrsRegionDateView> QueryDateViews(DateTime begin, DateTime end, string city)
        {
            var query = _statRepository.GetAllList(x => x.StatDate >= begin & x.StatDate < end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownMrsRsrp, TownMrsRsrpView>(_townRepository)).ToList();
            return
                townViews.QueryDateDateViews<MrsRegionDateView, DistrictMrsRsrpView, TownMrsRsrpView>(
                    DistrictMrsRsrpView.ConstructView);
        }
    }
}