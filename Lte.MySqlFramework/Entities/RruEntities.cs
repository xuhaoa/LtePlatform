using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;

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

        public InfrastructureType InfrastructureType { get; set; }
        
        public int ENodebId { get; set; }
    }

    public class HotSpotCellId : Entity, IHotSpot, ILteCellQuery
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }
    }

    public class HotSpotBtsId : Entity, IHotSpot, IBtsIdQuery
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; }

        public int BtsId { get; set; }
    }

    public class HotSpotCdmaCellId : Entity, IHotSpot, ICdmaCellQuery
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; }

        public int BtsId { get; set; }

        public byte SectorId { get; set; }
    }
}
