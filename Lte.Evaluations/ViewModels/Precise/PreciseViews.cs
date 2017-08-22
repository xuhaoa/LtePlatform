using System;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Entities;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.Entities.Neighbor;

namespace Lte.Evaluations.ViewModels.Precise
{
    public interface IPreciseWorkItemDto<TLteCellId>
        where TLteCellId : class, ILteCellQuery, new()
    {
        List<TLteCellId> Items { get; set; }

        string WorkItemNumber { get; set; }
    }

    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseInterferenceNeighborDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double Db6Share { get; set; }

        public double Db10Share { get; set; }

        public double Mod3Share { get; set; }

        public double Mod6Share { get; set; }
    }

    public class PreciseInterferenceNeighborsContainer : IPreciseWorkItemDto<PreciseInterferenceNeighborDto>
    {
        public List<PreciseInterferenceNeighborDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }

    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseInterferenceVictimDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double BackwardDb6Share { get; set; }

        public double BackwardDb10Share { get; set; }

        public double BackwardMod3Share { get; set; }

        public double BackwardMod6Share { get; set; }
    }

    public class PreciseInterferenceVictimsContainer : IPreciseWorkItemDto<PreciseInterferenceVictimDto>
    {
        public List<PreciseInterferenceVictimDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }

    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseCoverageDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double WeakCoverageRate { get; set; }

        public double OverCoverageRate { get; set; }
    }

    public class PreciseCoveragesContainer : IPreciseWorkItemDto<PreciseCoverageDto>
    {
        public List<PreciseCoverageDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }

    public class PreciseHistory
    {
        public string DateString { get; set; }

        public DateTime StatDate { get; set; }

        public int PreciseStats { get; set; }

        public int TownPreciseStats { get; set; }
    }

    [AutoMapFrom(typeof(PreciseCoverage4G))]
    [AutoMapTo(typeof(Precise4GSector))]
    [TypeDoc("4G精确覆盖率视图")]
    public class Precise4GView
    {
        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("总测量报告数")]
        public int TotalMrs { get; set; }

        [MemberDoc("第二邻区数")]
        public int SecondNeighbors { get; set; }

        [MemberDoc("第一邻区精确覆盖率")]
        public double FirstRate { get; set; }

        [MemberDoc("第二邻区精确覆盖率")]
        public double SecondRate { get; set; }

        [MemberDoc("第三邻区精确覆盖率")]
        public double ThirdRate { get; set; }

        [MemberDoc("基站名称")]
        public string ENodebName { get; set; } = "未导入基站";

        [MemberDoc("TOP天数")]
        public int TopDates { get; set; }

        public static Precise4GView ConstructView(PreciseCoverage4G stat, IENodebRepository repository)
        {
            var view = Mapper.Map<PreciseCoverage4G, Precise4GView>(stat);
            var eNodeb = repository.GetByENodebId(stat.CellId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }
    }

    public class TopPreciseViewContainer
    {
        public IEnumerable<Precise4GView> Views { get; set; }
    }

    [AutoMapFrom(typeof(Precise4GView), typeof(NearestPciCell), typeof(LteNeighborCell))]
    public class CellSectorIdPair
    {
        public int CellId { get; set; }

        public byte SectorId { get; set; }
    }

    public class PreciseImportView
    {
        public Precise4GView View { get; set; }

        public DateTime Begin { get; set; }

        public DateTime End { get; set; }
    }

    public static class PreciseViewsQuery
    {
        public static Precise4GSector ConstructSector(this Precise4GView view, ICellRepository repository)
        {
            var sector = Mapper.Map<Precise4GView, Precise4GSector>(view);
            var cell = repository.GetBySectorId(view.CellId, view.SectorId);
            if (cell == null)
            {
                sector.Height = -1;
            }
            else
            {
                Mapper.Map(cell, sector);
                sector.DownTilt = cell.MTilt + cell.ETilt;
            }
            return sector;
        }
    }

    [AutoMapFrom(typeof(Cell))]
    [AutoMapTo(typeof(SectorView))]
    [TypeDoc("LTE小区视图，显示小区详细信息")]
    public class CellView
    {
        [MemberDoc("基站名称")]
        public string ENodebName { get; private set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号，目前2.1G取0-15，1.8G取48-63，800M取16-31")]
        public byte SectorId { get; set; }

        [MemberDoc("小区名称")]
        public string CellName => ENodebName + "-" + SectorId;

        [MemberDoc("频点号，目前2.1G主要用100频点，1.8G主要用1825频点，800M主要用2446频点")]
        public int Frequency { get; set; }

        [MemberDoc("频带编号，如1表示2.1G，3表示1.8G，5表示800M")]
        public byte BandClass { get; set; }

        [MemberDoc("物理小区编号，范围0-503")]
        public short Pci { get; set; }

        [MemberDoc("物理随机接入信道序列索引，范围0-839")]
        public short Prach { get; set; }

        [MemberDoc("参考信号(Reference Signal)功率，单位是dBm")]
        public double RsPower { get; set; }

        [MemberDoc("跟踪区编号")]
        public int Tac { get; set; }

        [MemberDoc("天线挂高，单位米")]
        public double Height { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(Cell), typeof(OutdoorDescriptionTransform))]
        [MemberDoc("室内外小区")]
        public string Indoor { get; set; }

        [MemberDoc("机械下倾")]
        public double MTilt { get; set; }

        [MemberDoc("电子下倾")]
        public double ETilt { get; set; }

        [MemberDoc("总下倾角")]
        public double DownTilt => MTilt + ETilt;

        [MemberDoc("天线增益，单位是dB")]
        public double AntennaGain { get; set; }

        [MemberDoc("小区经度")]
        public double Longtitute { get; set; }

        [MemberDoc("小区纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("其他信息")]
        public string OtherInfos
            => "PCI: " + Pci + "; PRACH: " + Prach + "; RS Power(dBm): " + RsPower + "; TAC: " +
               Tac + "; ENodebId: " + ENodebId;


        public static CellView ConstructView(Cell cell, IENodebRepository repository)
        {
            var view = Mapper.Map<Cell, CellView>(cell);
            var eNodeb = repository.GetByENodebId(cell.ENodebId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }
    }

    [AutoMapFrom(typeof(Cell))]
    public class CellPreciseKpiView
    {
        public string ENodebName { get; private set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int Frequency { get; set; }

        public double RsPower { get; set; }

        public double Height { get; set; }

        public double Azimuth { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(Cell), typeof(OutdoorDescriptionTransform))]
        public string Indoor { get; set; }

        public double ETilt { get; set; }

        public double MTilt { get; set; }

        public double DownTilt => ETilt + MTilt;

        public double AntennaGain { get; set; }

        public double PreciseRate { get; set; } = 100.0;

        public static CellPreciseKpiView ConstructView(Cell cell, IENodebRepository repository)
        {
            var view = Mapper.Map<Cell, CellPreciseKpiView>(cell);
            var eNodeb = repository.GetByENodebId(cell.ENodebId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }

        public void UpdateKpi(IPreciseCoverage4GRepository repository, DateTime begin, DateTime end)
        {
            var query = repository.GetAll().Where(x => x.StatTime >= begin && x.StatTime < end
                                                       && x.CellId == ENodebId && x.SectorId == SectorId).ToList();
            if (query.Count > 0)
            {
                var sum = query.Sum(x => x.TotalMrs);
                PreciseRate = sum == 0 ? 100 : 100 - (double)query.Sum(x => x.SecondNeighbors) / sum * 100;
            }
        }
    }

    [AutoMapFrom(typeof(Cell))]
    [TypeDoc("4G精确覆盖率视图，用于扇区信息显示")]
    public class Precise4GSector
    {
        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("总测量报告数")]
        public int TotalMrs { get; set; }

        [MemberDoc("第二邻区数")]
        public int SecondNeighbors { get; set; }

        [MemberDoc("第一邻区精确覆盖率")]
        public double FirstRate { get; set; }

        [MemberDoc("第二邻区精确覆盖率")]
        public double SecondRate { get; set; }

        [MemberDoc("第三邻区精确覆盖率")]
        public double ThirdRate { get; set; }

        [MemberDoc("基站名称")]
        public string ENodebName { get; set; } = "未导入基站";

        [MemberDoc("TOP天数")]
        public int TopDates { get; set; }

        [MemberDoc("天线挂高")]
        public double Height { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [MemberDoc("总下倾角")]
        public double DownTilt { get; set; }

        [MemberDoc("小区经度")]
        public double Longtitute { get; set; }

        [MemberDoc("小区纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("物理小区编号，范围0-503")]
        public short Pci { get; set; }

        [MemberDoc("参考信号(Reference Signal)功率，单位是dBm")]
        public double RsPower { get; set; }
    }

}
