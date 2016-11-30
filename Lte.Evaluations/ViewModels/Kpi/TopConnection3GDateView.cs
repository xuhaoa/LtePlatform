using Lte.Domain.Regular.Attributes;
using System;
using System.Collections.Generic;

namespace Lte.Evaluations.ViewModels.Kpi
{
    [TypeDoc("单日TOP连接成功率小区视图")]
    public class TopConnection3GDateView
    {
        [MemberDoc("统计日期")]
        public DateTime StatDate { get; set; }

        [MemberDoc("TOP连接成功率小区视图列表")]
        public IEnumerable<TopConnection3GCellView> StatViews { get; set; }
    }
}
