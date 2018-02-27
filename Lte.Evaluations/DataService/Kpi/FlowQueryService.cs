using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowQueryService : DateSpanQuery<FlowView, IFlowHuaweiRepository, IFlowZteRepository>
    {
        private IEnumerable<FlowView> QueryDistrictViews(string city, string district, DateTime begin, DateTime end)
        {
            var zteStats =
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.RedirectA2 + x.RedirectB2 > 2000);
            var huaweiStats =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectCdma2000 > 2000);
            var results = HuaweiCellRepository.QueryDistrictFlowViews<FlowView, FlowZte, FlowHuawei>(city, district,
                zteStats,
                huaweiStats,
                TownRepository, ENodebRepository);
            return results;
        }

        private List<FlowView> QueryTopViewsByPolicy(IEnumerable<FlowView> source, int topCount,
            OrderDownSwitchPolicy policy)
        {
            switch (policy)
            {
                case OrderDownSwitchPolicy.OrderByDownSwitchCountsDescendings:
                    return source.OrderByDescending(x => x.RedirectCdma2000).Take(topCount).ToList();
                case OrderDownSwitchPolicy.OrderByDownSwitchRateDescending:
                    return source.OrderByDescending(x => x.DownSwitchRate).Take(topCount).ToList();
            }
            return new List<FlowView>();
        }

        public List<FlowView> QueryTopDownSwitchViews(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = QueryDistrictViews(city, district, begin, end);
            return results.OrderByDescending(x => x.RedirectCdma2000).Take(topCount).ToList();
        }

        public List<FlowView> QueryTopDownSwitchViews(DateTime begin, DateTime end, int topCount, OrderDownSwitchPolicy policy)
        {
            var zteViews =
                ZteRepository.GetAllList(
                        x => x.StatTime >= begin && x.StatTime < end && x.RedirectA2 + x.RedirectB2 > 2000)
                    .MapTo<IEnumerable<FlowView>>();
            var huaweiViews =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectCdma2000 > 2000)
                    .MapTo<IEnumerable<FlowView>>();
            var joinViews = zteViews.Concat(huaweiViews);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }

        public List<FlowView> QueryTopDownSwitchViews(string city, string district, DateTime begin, DateTime end,
            int topCount, OrderDownSwitchPolicy policy)
        {
            var joinViews = QueryDistrictViews(city, district, begin, end);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }

        public IEnumerable<FlowView> QueryTopRank2Views(string city, string district, DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryDistrictFlowViews<FlowView, FlowZte, FlowHuawei>(city, district,
                ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end 
                && x.SchedulingTm3 -x.SchedulingTm3Rank2 > 10000000),
                HuaweiRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.SchedulingRank1 > 1000000),
                TownRepository, ENodebRepository);
            return results.OrderBy(x => x.Rank2Rate).Take(topCount);
        }

        public IEnumerable<FlowView> QueryAllTopRank2Views(DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryAllFlowViews<FlowView, FlowZte, FlowHuawei>(
                ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end 
                && x.SchedulingTm3 - x.SchedulingTm3Rank2 > 10000000),
                HuaweiRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.SchedulingRank1 > 1000000),
                ENodebRepository);
            return results.OrderBy(x => x.Rank2Rate).Take(topCount);
        }

        public FlowQueryService(IFlowHuaweiRepository huaweiRepository, IFlowZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override Switch.IDateSpanQuery<List<FlowView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiFlowQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override Switch.IDateSpanQuery<List<FlowView>> GenerateZteQuery(int eNodebId, byte sectorId)
        {
            return new ZteFlowQuery(ZteRepository, eNodebId, sectorId);
        }
    }
}
