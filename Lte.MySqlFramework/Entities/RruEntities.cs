using System;
using System.Collections.Generic;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(CdmaCellExcel))]
    public class CdmaRru : Entity
    {
        public int BtsId { get; set; }

        public byte SectorId { get; set; }

        public byte TrmId { get; set; }

        public string RruName { get; set; }
    }

    [AutoMapFrom(typeof(CellExcel))]
    public class LteRru : Entity
    {
        public int ENodebId { get; set; }

        public byte LocalSectorId { get; set; }

        public string RruName { get; set; }

        public string PlanNum { get; set; }

        public string AntennaInfo { get; set; }

        [AutoMapPropertyResolve("AntennaFactoryString", typeof(CellExcel), typeof(AntennaFactoryTransform))]
        public AntennaFactory AntennaFactory { get; set; }

        public string AntennaModel { get; set; }

        [AutoMapPropertyResolve("CanBeETiltDescription", typeof(CellExcel), typeof(YesToBoolTransform))]
        public bool CanBeTilt { get; set; }

        [AutoMapPropertyResolve("IsBeautifyDescription", typeof(CellExcel), typeof(YesToBoolTransform))]
        public string IsBeautify { get; set; }

        [AutoMapPropertyResolve("IsCaDescription", typeof(CellExcel), typeof(YesToBoolTransform))]
        public string IsCa { get; set; }
    }

    [AutoMapFrom(typeof(IndoorDistributionExcel))]
    public class DistributionSystem : Entity, IGeoPoint<double>
    {
        public string StationNum { get; set; }
        
        public string Name { get; set; }
        
        public string Address { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string City { get; set; }
        
        public string District { get; set; }
        
        public string Server { get; set; }

        public string ServiceArea { get; set; }

        public string ScaleDescription { get; set; }

        public string Owner { get; set; }

        public byte SourceAppliances { get; set; }

        public byte OutdoorPicos { get; set; }

        public byte OutdoorRepeaters { get; set; }

        public byte OutdoorRrus { get; set; }

        public byte IndoorPicos { get; set; }

        public byte IndoorRepeaters { get; set; }

        public byte IndoorRrus { get; set; }

        public byte Amplifiers { get; set; }

        public int ENodebId { get; set; }

        public byte LteSectorId { get; set; }

        public int BtsId { get; set; }

        public byte CdmaSectorId { get; set; }

        public bool IsLteRru => ENodebId > 0;

        public bool IsCdmaRru => BtsId > 0;
    }

    public class HotSpotENodebId : Entity, IHotSpot, IENodebId
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; } = InfrastructureType.ENodeb;
        
        public int ENodebId { get; set; }
    }

    [AutoMapFrom(typeof(HotSpotCellExcel))]
    public class HotSpotCellId : Entity, IHotSpot, ILteCellQuery
    {
        [AutoMapPropertyResolve("HotSpotTypeDescription", typeof(HotSpotCellExcel), typeof(HotspotTypeTransform))]
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; } = InfrastructureType.Cell;

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }
    }

    public class HotSpotBtsId : Entity, IHotSpot, IBtsIdQuery
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; } = InfrastructureType.CdmaBts;

        public int BtsId { get; set; }
    }

    public class HotSpotCdmaCellId : Entity, IHotSpot, ICdmaCellQuery
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; } = InfrastructureType.CdmaCell;

        public int BtsId { get; set; }

        public byte SectorId { get; set; }
    }

    public class MicroItem : Entity
    {
        public string Name { get; set; }

        public string Type { get; set; }

        public string ItemNumber { get; set; }

        public string Factory { get; set; }

        public string AddressNumber { get; set; }

        public DateTime BorrowDate { get; set; }

        public string Borrower { get; set; }

        public string Complainer { get; set; }
        
        public string ComplainPhone { get; set; }

        public string MateriaNumber { get; set; }

        public string SubmitForm { get; set; }

        public string Protocol { get; set; }

        public string SerialNumber { get; set; }

        public string Comments { get; set; }
    }

    public class MicroAddress : Entity, IGeoPoint<double>
    {
        public string AddressNumber { get; set; }

        public string District { get; set; }

        public string Address { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string BaseStation { get; set; }

        public int TownId { get; set; }
    }

    [AutoMapFrom(typeof(MicroAddress))]
    public class MicroAmplifierView : IGeoPoint<double>, IDistrictTown
    {
        public string AddressNumber { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string Address { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string BaseStation { get; set; }

        public int TownId { get; set; }

        public IEnumerable<MicroItem> MicroItems { get; set; } 
    }

    [TypeDoc("定义LTE小区数据库中对应的ORM对象")]
    [AutoMapFrom(typeof(CellExcel))]
    public class Cell : Entity
    {
        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号，目前2.1G取0-15，1.8G取48-63，800M取16-31")]
        public byte SectorId { get; set; }

        [MemberDoc("本地小区编号")]
        public byte LocalSectorId { get; set; }

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

        [AutoMapPropertyResolve("IsIndoor", typeof(CellExcel), typeof(IndoorDescriptionToOutdoorBoolTransform))]
        [MemberDoc("是否为室外小区")]
        public bool IsOutdoor { get; set; }

        [MemberDoc("跟踪区编号")]
        public int Tac { get; set; }

        [MemberDoc("小区经度")]
        public double Longtitute { get; set; }

        [MemberDoc("小区纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("天线挂高，单位米")]
        public double Height { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [MemberDoc("机械下倾")]
        public double MTilt { get; set; }

        [MemberDoc("电子下倾")]
        public double ETilt { get; set; }

        [MemberDoc("天线增益，单位是dB")]
        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("TransmitReceive", typeof(CellExcel), typeof(AntennaPortsConfigureTransform))]
        [MemberDoc("天线收发配置")]
        public AntennaPortsConfigure AntennaPorts { get; set; }

        [MemberDoc("是否在用")]
        public bool IsInUse { get; set; } = true;
    }

    [AutoMapFrom(typeof(Cell))]
    public class PciCell
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public short Pci { get; set; }

        public int Frequency { get; set; }
    }

    [AutoMapFrom(typeof(PciCell))]
    public class PciCellPair
    {
        public int ENodebId { get; set; }

        public short Pci { get; set; }
    }

    public class PciCellPairComparer : IEqualityComparer<PciCellPair>
    {
        public bool Equals(PciCellPair x, PciCellPair y)
        {
            return x.ENodebId == y.ENodebId && x.Pci == y.Pci;
        }

        public int GetHashCode(PciCellPair obj)
        {
            return obj.ENodebId * 839 + obj.Pci;
        }
    }

    [AutoMapFrom(typeof(Cell), typeof(LteRru))]
    [TypeDoc("LTE-RRU小区视图，显示小区（包含RRU名称）详细信息")]
    public class CellRruView
    {
        [MemberDoc("基站名称")]
        public string ENodebName { get; set; }

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

    }

}
