using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.ViewModels.Basic
{
    [AutoMapFrom(typeof(Cell))]
    public class CellView
    {
        public string ENodebName { get; private set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int Frequency { get; set; }

        public byte BandClass { get; set; }

        public short Pci { get; set; }

        public short Prach { get; set; }

        public double RsPower { get; set; }

        public int Tac { get; set; }

        public double Height { get; set; }

        public double Azimuth { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(Cell), typeof(OutdoorDescriptionTransform))]
        public string Indoor { get; set; }

        public double MTilt { get; set; }

        public double ETilt { get; set; }

        public double DownTilt => MTilt + ETilt;

        public double AntennaGain { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }
        
        public static CellView ConstructView(Cell cell, IENodebRepository repository)
        {
            var view = Mapper.Map<Cell, CellView>(cell);
            var eNodeb = repository.GetByENodebId(cell.ENodebId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }
    }
}
