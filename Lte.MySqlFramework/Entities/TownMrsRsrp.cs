using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Entities
{
    public class TownMrsRsrp: Entity, IStatDate, ITownId
    {
        public DateTime StatDate { get; set; }

        public long Rsrp120To115 { get; set; }

        public long Rsrp115To110 { get; set; }

        public long Rsrp110To105 { get; set; }

        public long Rsrp105To100 { get; set; }

        public long Rsrp100To95 { get; set; }

        public long Rsrp95To90 { get; set; }

        public long Rsrp90To80 { get; set; }

        public long Rsrp80To70 { get; set; }

        public long Rsrp70To60 { get; set; }

        public long RsrpAbove60 { get; set; }

        public int TownId { get; set; }
    }

    public class TownMrsRsrpView : IStatDate, ITownId, ICityDistrictTown
    {
        public DateTime StatDate { get; set; }

        public int TownId { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string City { get; set; }

        public long RsrpBelow120 { get; set; }

        public long Rsrp120To115 { get; set; }

        public long Rsrp115To110 { get; set; }

        public long Rsrp110To105 { get; set; }

        public long Rsrp105To100 { get; set; }

        public long Rsrp100To95 { get; set; }

        public long Rsrp95To90 { get; set; }

        public long Rsrp90To80 { get; set; }

        public long Rsrp80To70 { get; set; }

        public long Rsrp70To60 { get; set; }

        public long RsrpAbove60 { get; set; }

        public long TotalMrs => RsrpBelow120 + Rsrp120To115 + Rsrp115To110 + Rsrp110To105 + Rsrp105To100 + Rsrp100To95
                                + Rsrp95To90 + Rsrp90To80 + Rsrp80To70 + Rsrp70To60 + RsrpAbove60;

        public double MrsBelow115 => RsrpBelow120 + Rsrp120To115;

        public double CoverageRate115 => MrsBelow115 / TotalMrs;

        public double MrsBelow110 => MrsBelow115 + Rsrp115To110;

        public double CoverageRate110 => MrsBelow110 / TotalMrs;

        public double MrsBelow105 => MrsBelow110 + Rsrp110To105;

        public double CoverageRate105 => MrsBelow105 / TotalMrs;

        public double MrsBelow100 => MrsBelow105 + Rsrp105To100;

        public double CoverageRate100 => MrsBelow100 / TotalMrs;
    }
}
