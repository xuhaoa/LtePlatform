using Lte.Domain.Common.Geo;

namespace Lte.Domain.Common.Wireless
{
    public interface ICellStastic
    {
        int Mod3Count { get; set; }

        int WeakCoverCount { get; set; }

        int Mod6Count { get; set; }

        int OverCoverCount { get; set; }

        int PreciseCount { get; set; }

        int MrCount { get; set; }
    }

    public interface IBtsIdQuery
    {
        int BtsId { get; set; }
    }

    public interface ILteCellQuery : IENodebId
    {
        byte SectorId { get; set; }
    }

    public interface ICdmaCellQuery : IBtsIdQuery
    {
        byte SectorId { get; set; }
    }

    public interface IWorkItemCell : ILteCellQuery
    {
        string WorkItemNumber { get; set; }
    }

    public interface IHotSpot
    {
        HotspotType HotspotType { get; set; }

        string HotspotName { get; set; }

        InfrastructureType InfrastructureType { get; set; }
    }
}
