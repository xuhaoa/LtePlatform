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

    public class HotSpotCellExcel
    {
        [ExcelColumn("热点类型")]
        public string HotSpotTypeDescription { get; set; }

        [ExcelColumn("热点名称")]
        public string HotspotName { get; set; }

        [ExcelColumn("基站编号")]
        public int ENodebId { get; set; }

        [ExcelColumn("小区编号")]
        public byte SectorId { get; set; }
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
}
