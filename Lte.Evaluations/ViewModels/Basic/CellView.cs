using System.CodeDom;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.ViewModels.Basic
{
    [AutoMapFrom(typeof(Cell))]
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

    [AutoMapFrom(typeof(Cell), typeof(LteRru))]
    [TypeDoc("LTE-RRU小区视图，显示小区（包含RRU名称）详细信息")]
    public class CellRruView
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

        [MemberDoc("本地小区编号，一般是华为有效")]
        public byte LocalSectorId { get; set; }

        [MemberDoc("RRU名称")]
        public string RruName { get; set; }

        [MemberDoc("天线信息")]
        public string AntennaInfo { get; set; }

        [MemberDoc("天线厂家")]
        [AutoMapPropertyResolve("AntennaFactory", typeof(LteRru), typeof(AntennaFactoryDescriptionTransform))]
        public string AntennaFactoryDescription { get; set; }

        [MemberDoc("天线型号")]
        public string AntennaModel { get; set; }
        
        public static CellRruView ConstructView(Cell cell, IENodebRepository repository, ILteRruRepository rruRepository)
        {
            var view = Mapper.Map<Cell, CellRruView>(cell);
            var eNodeb = repository.GetByENodebId(cell.ENodebId);
            view.ENodebName = eNodeb?.Name;
            var rru =
                rruRepository.FirstOrDefault(x => x.ENodebId == cell.ENodebId && x.LocalSectorId == cell.LocalSectorId);
            rru?.MapTo(view);
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
