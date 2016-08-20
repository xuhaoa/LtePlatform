using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
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

        public string CellName => ENodebName + "-" + SectorId;

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

    [AutoMapFrom(typeof(CdmaCell))]
    public class CdmaCellView
    {
        public string BtsName { get; set; }

        public int BtsId { get; set; } = -1;

        public byte SectorId { get; set; } = 31;

        public string CellName => BtsName + "-" + SectorId;

        public string CellType { get; set; } = "DO";

        public int Frequency { get; set; } = 0;

        public int CellId { get; set; }

        public string Lac { get; set; }

        public short Pn { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Height { get; set; }

        public double MTilt { get; set; }

        public double ETilt { get; set; }

        public double DownTilt => MTilt + ETilt;

        public double Azimuth { get; set; }

        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(CdmaCell), typeof(OutdoorDescriptionTransform))]
        public string Indoor { get; set; }

        public double RsPower { get; set; }

        public string FrequencyList { get; set; }

        public string OtherInfos => "Cell Type: " + CellType + "; Cell ID: " + CellId + "; LAC: " + Lac + "; PN: " +
                                    Pn + "; Frequency List: " + FrequencyList + "; BtsId: " + BtsId;

        public static CdmaCellView ConstructView(CdmaCell cell, IBtsRepository repository)
        {
            var view = Mapper.Map<CdmaCell, CdmaCellView>(cell);
            var bts = repository.GetByBtsId(cell.BtsId);
            view.BtsName = bts?.Name;
            return view;
        }
    }

    [AutoMapFrom(typeof(CdmaCell))]
    public class CdmaCompoundCellView
    {
        public string BtsName { get; set; }

        public int BtsId { get; set; } = -1;

        public byte SectorId { get; set; } = 31;

        public int CellId { get; set; }

        public string Lac { get; set; }

        public short Pn { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Height { get; set; }

        public double MTilt { get; set; }

        public double ETilt { get; set; }

        public double DownTilt => MTilt + ETilt;

        public double Azimuth { get; set; }

        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(CdmaCell), typeof(OutdoorDescriptionTransform))]
        public string Indoor { get; set; }

        public string OnexFrequencyList { get; set; }

        public string EvdoFrequencyList { get; set; }

        public static CdmaCompoundCellView ConstructView(CdmaCell onexCell, CdmaCell evdoCell, IBtsRepository repository)
        {
            CdmaCompoundCellView view = null;
            if (onexCell != null)
            {
                view = Mapper.Map<CdmaCell, CdmaCompoundCellView>(onexCell);
                view.OnexFrequencyList = onexCell.FrequencyList;
                if (evdoCell != null) view.EvdoFrequencyList = evdoCell.FrequencyList;
            }
            else if (evdoCell != null)
            {
                view = Mapper.Map<CdmaCell, CdmaCompoundCellView>(evdoCell);
                view.EvdoFrequencyList = evdoCell.FrequencyList;
            }

            if (view != null)
            {
                var bts = repository.GetByBtsId(view.BtsId);
                view.BtsName = bts?.Name;
            }

            return view;
        }
    }

    [TypeDoc("扇区视图，用于地理化显示")]
    [AutoMapFrom(typeof(CellView), typeof(CdmaCellView))]
    public class SectorView
    {
        [MemberDoc("小区名称，用于辨析小区")]
        public string CellName { get; set; }

        [MemberDoc("是否为室内小区")]
        public string Indoor { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("天线挂高")]
        public double Height { get; set; }

        [MemberDoc("下倾角")]
        public double DownTilt { get; set; }

        [MemberDoc("天线增益")]
        public double AntennaGain { get; set; }

        [MemberDoc("频点")]
        public int Frequency { get; set; }

        [MemberDoc("其他信息")]
        public string OtherInfos { get; set; }
    }
}
