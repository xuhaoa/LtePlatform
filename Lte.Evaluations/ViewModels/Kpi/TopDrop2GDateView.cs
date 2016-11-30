using Lte.Domain.Regular.Attributes;
using System;
using System.Collections.Generic;

namespace Lte.Evaluations.ViewModels.Kpi
{
    [TypeDoc("单日TOP掉话小区视图")]
    public class TopDrop2GDateView
    {
        [MemberDoc("统计日期")]
        public DateTime StatDate { get; set; }

        [MemberDoc("TOP掉话小区视图列表")]
        public IEnumerable<TopDrop2GCellView> StatViews { get; set; }
    }
}
