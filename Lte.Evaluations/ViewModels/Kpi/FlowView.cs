using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.ViewModels.Kpi
{
    [AutoMapFrom(typeof(FlowHuawei), typeof(FlowZte))]
    public class FlowView
    {
        public DateTime StatTime { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        [AutoMapPropertyResolve("DownlinkPdcpFlow", typeof(FlowZte))]
        public double PdcpDownlinkFlow { get; set; }

        [AutoMapPropertyResolve("UplindPdcpFlow", typeof(FlowZte))]
        public double PdcpUplinkFlow { get; set; }

        [AutoMapPropertyResolve("AverageRrcUsers", typeof(FlowZte))]
        public double AverageUsers { get; set; }

        [AutoMapPropertyResolve("MaxRrcUsers", typeof(FlowZte))]
        public int MaxUsers { get; set; }

        public double AverageActiveUsers { get; set; }

        public int MaxActiveUsers { get; set; }

        public static FlowView Average(IEnumerable<FlowView> views)
        {
            if (views == null || !views.Any()) return null;
            var first = views.FirstOrDefault();
            return new FlowView
            {
                StatTime = first.StatTime,
                ENodebId = first.ENodebId,
                SectorId = first.SectorId,
                PdcpUplinkFlow = views.Average(x => x.PdcpUplinkFlow),
                PdcpDownlinkFlow = views.Average(x => x.PdcpDownlinkFlow),
                AverageUsers = views.Average(x => x.AverageUsers),
                MaxUsers = views.Max(x => x.MaxUsers),
                AverageActiveUsers = views.Average(x => x.AverageActiveUsers),
                MaxActiveUsers = views.Max(x => x.MaxActiveUsers)
            };
        }
    }
}
