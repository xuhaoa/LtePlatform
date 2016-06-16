using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Abstract;

namespace Lte.Evaluations.DataService.Kpi
{
    public class DownSwitchFlowService
    {
        private readonly IDownSwitchFlowRepository _repository;

        public DownSwitchFlowService(IDownSwitchFlowRepository repository)
        {
            _repository = repository;
        }

        public DownSwitchFlowDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var beginDate = initialDate.AddDays(-100);
            var endDate = initialDate.AddDays(1);
            var stats = _repository.GetAllList(beginDate, endDate);
            if (stats.Count == 0) return null;
            var maxDate = stats.Max(x => x.StatDate);
            return new DownSwitchFlowDateView
            {
                StatDate = maxDate,
                City = city,
                DownSwitchFlowViews = stats.Where(x => x.StatDate == maxDate).MapTo<IEnumerable<DownSwitchFlowView>>()
            };
        }
    }
}
