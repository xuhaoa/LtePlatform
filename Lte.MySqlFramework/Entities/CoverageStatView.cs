using System;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(CoverageStat))]
    public class CoverageStatView : IStatDate, ILteCellQuery, IENodebName
    {
        public DateTime StatDate { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int TelecomMrs { get; set; }

        public int UnicomMrs { get; set; }

        public int MobileMrs { get; set; }

        public int TelecomAbove110 { get; set; }

        public double TelecomAbove110Rate => TelecomMrs == 0 ? 0 : (double) TelecomAbove110 * 100 / TelecomMrs;

        public int MobileAbove110 { get; set; }

        public double MobileAbove110Rate => MobileMrs == 0 ? 0 : (double) MobileAbove110 * 100 / MobileMrs;

        public int UnicomAbove110 { get; set; }

        public double UnicomAbove110Rate => UnicomMrs == 0 ? 0 : (double) UnicomAbove110 * 100 / UnicomMrs;

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

        public static CoverageStatView ConstructView(CoverageStat stat, IENodebRepository repository)
        {
            var view = Mapper.Map<CoverageStat, CoverageStatView>(stat);
            var eNodeb = repository.FirstOrDefault(x => x.ENodebId == stat.ENodebId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }

        public string ENodebName { get; set; }
    }
}