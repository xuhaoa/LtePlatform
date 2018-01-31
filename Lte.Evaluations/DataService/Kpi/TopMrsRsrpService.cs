﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.Policy;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class TopMrsRsrpService
    {
        private readonly ITopMrsRsrpRepository _topMrsRsrpRepository;
        private readonly IENodebRepository _eNodebRepository;

        public TopMrsRsrpService(ITopMrsRsrpRepository topMrsRsrpRepository, IENodebRepository eNodebRepository)
        {
            _topMrsRsrpRepository = topMrsRsrpRepository;
            _eNodebRepository = eNodebRepository;
        }

        private IEnumerable<TopMrsRsrpView> GetTopViews(DateTime begin, DateTime end, int topCount,
            OrderMrsRsrpPolicy policy, Func<DateTime, DateTime, List<TopMrsRsrp>> queryFunc)
        {
            if (topCount <= 0) return new List<TopMrsRsrpView>();
            var orderResult = new List<TopMrsRsrp>();
            var beginDate = begin;
            var endDate = beginDate.AddDays(1);
            while (endDate < end)
            {
                var stats = queryFunc(beginDate, endDate);
                if (stats.Any())
                {
                    orderResult.AddRange(stats.Order(policy, topCount));
                }
                beginDate = beginDate.AddDays(1);
                endDate = beginDate.AddDays(1);
            }
            var containers = orderResult.GenerateContainers();
            return containers.Select(x =>
            {
                var view = TopMrsRsrpView.ConstructView(x.TopMrsRsrp, _eNodebRepository);
                view.TopDates = x.TopDates;
                return view;
            });
        }

        public IEnumerable<TopMrsRsrpView> GetAllTopViews(DateTime begin, DateTime end, int topCount,
            OrderMrsRsrpPolicy policy)
        {
            return GetTopViews(begin, end, topCount, policy,
                (beginDate, endDate) =>
                    _topMrsRsrpRepository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate));
        }

        public IEnumerable<TopMrsRsrpView> GetPartialTopViews(DateTime begin, DateTime end, int topCount,
            OrderMrsRsrpPolicy policy, IEnumerable<ENodeb> eNodebs)
        {
            return GetTopViews(begin, end, topCount, policy,
                (beginDate, endDate) =>
                {
                    var stats = _topMrsRsrpRepository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate);
                    return (from q in stats
                        join e in eNodebs on q.ENodebId equals e.ENodebId
                        select q).ToList();
                });
        }
    }
}
