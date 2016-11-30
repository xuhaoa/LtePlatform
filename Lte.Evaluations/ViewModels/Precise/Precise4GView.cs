using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Kpi;
using System;

namespace Lte.Evaluations.ViewModels.Precise
{
    [AutoMapFrom(typeof(PreciseCoverage4G))]
    public class Precise4GView
    {
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public int TotalMrs { get; set; }

        public int SecondNeighbors { get; set; }

        public double FirstRate { get; set; }

        public double SecondRate { get; set; }

        public double ThirdRate { get; set; }

        public string ENodebName { get; set; } = "未导入基站";

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
    public class Precise4GSector : Precise4GView
    {
        public double Height { get; set; }

        public double Azimuth { get; set; }

        public double DownTilt { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public short Pci { get; set; }

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
