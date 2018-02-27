using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class CqiQueryService : DateSpanQuery<QciView, IQciHuaweiRepository, IQciZteRepository>
    {
        public CqiQueryService(IQciHuaweiRepository huaweiRepository, IQciZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override Switch.IDateSpanQuery<List<QciView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiQciQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override Switch.IDateSpanQuery<List<QciView>> GenerateZteQuery(int eNodebId, byte sectorId)
        {
            return new ZteQciQuery(ZteRepository, eNodebId, sectorId);
        }

        private IEnumerable<QciView> QueryDistrictViews(string city, string district, DateTime begin, DateTime end)
        {
            var zteStats =
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end 
                         && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                         + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                         + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 2000);
            var huaweiStats =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end
                                                 && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                                                 + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                                                 + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 2000);
            var results = HuaweiCellRepository.QueryDistrictFlowViews<QciView, QciZte, QciHuawei>(city, district,
                zteStats,
                huaweiStats,
                TownRepository, ENodebRepository);
            return results;
        }

        private List<QciView> QueryTopViewsByPolicy(IEnumerable<QciView> source, int topCount,
            OrderCqiPolicy policy)
        {
            switch (policy)
            {
                case OrderCqiPolicy.OrderByCqiRate:
                    return source.OrderBy(x => x.CqiRate).Take(topCount).ToList();
                case OrderCqiPolicy.OrderByPoorCqiDescending:
                    return source.OrderByDescending(x => x.CqiCounts.Item1 - x.CqiCounts.Item2).Take(topCount).ToList();
            }
            return new List<QciView>();
        }

        public List<QciView> QueryTopCqiViews(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = QueryDistrictViews(city, district, begin, end);
            return results.OrderByDescending(x => x.CqiCounts.Item1 - x.CqiCounts.Item2).Take(topCount).ToList();
        }

        public List<QciView> QueryTopCqiViews(DateTime begin, DateTime end, int topCount, OrderCqiPolicy policy)
        {
            var zteViews =
                ZteRepository.GetAllList(
                        x => x.StatTime >= begin && x.StatTime < end
                             && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                             + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                             + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 200000)
                    .MapTo<IEnumerable<QciView>>();
            var huaweiViews =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end
                                                 && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                                                 + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                                                 + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 200000)
                    .MapTo<IEnumerable<QciView>>();
            var joinViews = zteViews.Concat(huaweiViews);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }

        public List<QciView> QueryTopCqiViews(string city, string district, DateTime begin, DateTime end,
            int topCount, OrderCqiPolicy policy)
        {
            var joinViews = QueryDistrictViews(city, district, begin, end);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }
    }
}