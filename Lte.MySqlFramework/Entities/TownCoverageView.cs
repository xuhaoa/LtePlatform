using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(TownCoverageStat))]
    public class TownCoverageView : ICityDistrictTown, IStatDate
    {
        public string District { get; set; }

        public string Town { get; set; }

        public string City { get; set; }

        public DateTime StatDate { get; set; }

        public int TelecomMrs { get; set; }

        public int UnicomMrs { get; set; }

        public int MobileMrs { get; set; }

        public int TelecomAbove110 { get; set; }

        public double TelecomAbove110Rate => TelecomMrs == 0 ? 0 : (double)TelecomAbove110 * 100 / TelecomMrs;

        public int MobileAbove110 { get; set; }

        public double MobileAbove110Rate => MobileMrs == 0 ? 0 : (double)MobileAbove110 * 100 / MobileMrs;

        public int UnicomAbove110 { get; set; }

        public double UnicomAbove110Rate => UnicomMrs == 0 ? 0 : (double)UnicomAbove110 * 100 / UnicomMrs;

        public int TelecomAbove105 { get; set; }

        public double TelecomAbove105Rate => TelecomMrs == 0 ? 0 : (double)TelecomAbove105 * 100 / TelecomMrs;

        public int MobileAbove105 { get; set; }

        public double MobileAbove105Rate => MobileMrs == 0 ? 0 : (double)MobileAbove105 * 100 / MobileMrs;

        public int UnicomAbove105 { get; set; }

        public double UnicomAbove105Rate => UnicomMrs == 0 ? 0 : (double)UnicomAbove105 * 100 / UnicomMrs;

        public int TelecomAbove115 { get; set; }

        public double TelecomAbove115Rate => TelecomMrs == 0 ? 0 : (double)TelecomAbove115 * 100 / TelecomMrs;

        public int MobileAbove115 { get; set; }

        public double MobileAbove115Rate => MobileMrs == 0 ? 0 : (double)MobileAbove115 * 100 / MobileMrs;

        public int UnicomAbove115 { get; set; }

        public double UnicomAbove115Rate => UnicomMrs == 0 ? 0 : (double)UnicomAbove115 * 100 / UnicomMrs;

        public double TelecomSum { get; set; }

        public double AverageTelecomRsrp => TelecomMrs == 0 ? 0 : TelecomSum / TelecomMrs;

        public double MobileSum { get; set; }

        public double AverageMobileRsrp => MobileMrs == 0 ? 0 : MobileSum / MobileMrs;

        public double UnicomSum { get; set; }

        public double AverageUnicomRsrp => UnicomMrs == 0 ? 0 : UnicomSum / UnicomMrs;

        public double TelecomSumAbove110 { get; set; }

        public double AverageTelecomRsrpAbove110 => TelecomAbove110 == 0 ? 0 : TelecomSumAbove110 / TelecomAbove110;

        public double MobileSumAbove110 { get; set; }

        public double AverageMobileRsrpAbove110 => MobileAbove110 == 0 ? 0 : MobileSumAbove110 / MobileAbove110;

        public double UnicomSumAbove110 { get; set; }

        public double AverageUnicomRsrpAbove110 => UnicomAbove110 == 0 ? 0 : UnicomSumAbove110 / UnicomAbove110;

    }

    [AutoMapFrom(typeof(TownCoverageView))]
    public class DistrictCoverageView : ICityDistrict, IStatDate
    {
        public string City { get; set; }

        public string District { get; set; }

        public DateTime StatDate { get; set; }

        public int TelecomMrs { get; set; }

        public int UnicomMrs { get; set; }

        public int MobileMrs { get; set; }

        public int TelecomAbove110 { get; set; }

        public double TelecomAbove110Rate => TelecomMrs == 0 ? 0 : (double)TelecomAbove110 * 100 / TelecomMrs;

        public int MobileAbove110 { get; set; }

        public double MobileAbove110Rate => MobileMrs == 0 ? 0 : (double)MobileAbove110 * 100 / MobileMrs;

        public int UnicomAbove110 { get; set; }

        public double UnicomAbove110Rate => UnicomMrs == 0 ? 0 : (double)UnicomAbove110 * 100 / UnicomMrs;

        public int TelecomAbove105 { get; set; }

        public double TelecomAbove105Rate => TelecomMrs == 0 ? 0 : (double)TelecomAbove105 * 100 / TelecomMrs;

        public int MobileAbove105 { get; set; }

        public double MobileAbove105Rate => MobileMrs == 0 ? 0 : (double)MobileAbove105 * 100 / MobileMrs;

        public int UnicomAbove105 { get; set; }

        public double UnicomAbove105Rate => UnicomMrs == 0 ? 0 : (double)UnicomAbove105 * 100 / UnicomMrs;

        public int TelecomAbove115 { get; set; }

        public double TelecomAbove115Rate => TelecomMrs == 0 ? 0 : (double)TelecomAbove115 * 100 / TelecomMrs;

        public int MobileAbove115 { get; set; }

        public double MobileAbove115Rate => MobileMrs == 0 ? 0 : (double)MobileAbove115 * 100 / MobileMrs;

        public int UnicomAbove115 { get; set; }

        public double UnicomAbove115Rate => UnicomMrs == 0 ? 0 : (double)UnicomAbove115 * 100 / UnicomMrs;

        public double TelecomSum { get; set; }

        public double AverageTelecomRsrp => TelecomMrs == 0 ? 0 : TelecomSum / TelecomMrs;

        public double MobileSum { get; set; }

        public double AverageMobileRsrp => MobileMrs == 0 ? 0 : MobileSum / MobileMrs;

        public double UnicomSum { get; set; }

        public double AverageUnicomRsrp => UnicomMrs == 0 ? 0 : UnicomSum / UnicomMrs;

        public double TelecomSumAbove110 { get; set; }

        public double AverageTelecomRsrpAbove110 => TelecomAbove110 == 0 ? 0 : TelecomSumAbove110 / TelecomAbove110;

        public double MobileSumAbove110 { get; set; }

        public double AverageMobileRsrpAbove110 => MobileAbove110 == 0 ? 0 : MobileSumAbove110 / MobileAbove110;

        public double UnicomSumAbove110 { get; set; }

        public double AverageUnicomRsrpAbove110 => UnicomAbove110 == 0 ? 0 : UnicomSumAbove110 / UnicomAbove110;

        public static DistrictCoverageView ConstructView(TownCoverageView townView)
        {
            return townView.MapTo<DistrictCoverageView>();
        }
    }
}
