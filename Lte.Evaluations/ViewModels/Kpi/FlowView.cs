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
    }
}
