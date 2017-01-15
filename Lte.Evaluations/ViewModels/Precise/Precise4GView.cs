using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Kpi;
using System;
using Lte.Domain.Regular.Attributes;

namespace Lte.Evaluations.ViewModels.Precise
{
    [AutoMapFrom(typeof(PreciseCoverage4G))]
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

    public class PreciseImportView
    {
        public Precise4GView View { get; set; }

        public DateTime Begin { get; set; }

        public DateTime End { get; set; }
    }

    [AutoMapFrom(typeof(Cell), typeof(Precise4GView))]
    [TypeDoc("4G精确覆盖率视图，用于扇区信息显示")]
    public class Precise4GSector : Precise4GView
    {
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

        public static Precise4GSector ConstructSector(Precise4GView view, ICellRepository repository)
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
}
