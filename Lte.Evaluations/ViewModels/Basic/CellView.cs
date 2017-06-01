using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Channel;

namespace Lte.Evaluations.ViewModels.Basic
{
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

        public static CellRruView ConstructView(Cell cell, IENodebRepository repository, LteRru rru)
        {
            var view = Mapper.Map<Cell, CellRruView>(cell);
            var eNodeb = repository.GetByENodebId(cell.ENodebId);
            view.ENodebName = eNodeb?.Name;
            rru?.MapTo(view);
            return view;
        }
    }

    public class CellPower
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double RsPower { get; set; }

        public int Pa { get; set; }

        public int Pb { get; set; }

        public CellPower(EUtranCellFDDZte cellFdd, PowerControlDLZte pcDl)
        {
            ENodebId = cellFdd.eNodeB_Id;
            RsPower = cellFdd.cellReferenceSignalPower;
            Pb = cellFdd.pb;
            Pa = pcDl.paForDTCH;
        }

        public CellPower(PDSCHCfg cfg, CellDlpcPdschPa paCfg)
        {
            ENodebId = cfg.eNodeB_Id;
            RsPower = cfg.ReferenceSignalPwr * 0.1;
            Pb = cfg.Pb;
            Pa = paCfg.PaPcOff;
        }

        public CellPower() { }
    }
}
