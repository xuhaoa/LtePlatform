using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Neighbor;

namespace Lte.Evaluations.ViewModels.Mr
{
    [TypeDoc("来自MongoDB的LTE邻区关系视图")]
    [AutoMapFrom(typeof(EUtranRelationZte), typeof(ExternalEUtranCellFDDZte), typeof(EutranIntraFreqNCell))]
    public class NeighborCellMongo
    {
        [MemberDoc("小区编号（对于LTE来说就是基站编号）")]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(EUtranRelationZte))]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(ExternalEUtranCellFDDZte))]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(EutranIntraFreqNCell))]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("邻区小区编号")]
        [AutoMapPropertyResolve("eNBId", typeof(ExternalEUtranCellFDDZte))]
        [AutoMapPropertyResolve("eNodeBId", typeof(EutranIntraFreqNCell))]
        public int NeighborCellId { get; set; }

        [MemberDoc("邻区扇区编号")]
        [AutoMapPropertyResolve("cellLocalId", typeof(ExternalEUtranCellFDDZte))]
        [AutoMapPropertyResolve("CellId", typeof(EutranIntraFreqNCell))]
        public byte NeighborSectorId { get; set; }

        [MemberDoc("邻区名称")]
        [AutoMapPropertyResolve("userLabel", typeof(ExternalEUtranCellFDDZte))]
        [AutoMapPropertyResolve("NeighbourCellName", typeof(EutranIntraFreqNCell))]
        public string NeighborCellName { get; set; }

        [MemberDoc("PCI，便于查询邻区")]
        [AutoMapPropertyResolve("pci", typeof(ExternalEUtranCellFDDZte))]
        public short NeighborPci { get; set; }

        [MemberDoc("是否为ANR创建")]
        [AutoMapPropertyResolve("isAnrCreated", typeof(EUtranRelationZte), typeof(IntToBoolTransform))]
        [AutoMapPropertyResolve("AnrFlag", typeof(EutranIntraFreqNCell), typeof(PositiveBoolTransform))]
        public bool IsAnrCreated { get; set; }

        [MemberDoc("是否允许切换")]
        [AutoMapPropertyResolve("isHOAllowed", typeof(EUtranRelationZte), typeof(IntToBoolTransform))]
        [AutoMapPropertyResolve("NoHoFlag", typeof(EutranIntraFreqNCell), typeof(ZeroBoolTransform))]
        public bool HandoffAllowed { get; set; }

        [MemberDoc("是否可以被ANR删除")]
        [AutoMapPropertyResolve("isRemoveAllowed", typeof(EUtranRelationZte), typeof(IntToBoolTransform))]
        [AutoMapPropertyResolve("NoRmvFlag", typeof(EutranIntraFreqNCell), typeof(ZeroBoolTransform))]
        public bool RemovedAllowed { get; set; }

        [MemberDoc("小区测量优先级是否为高")]
        [AutoMapPropertyResolve("CellMeasPriority", typeof(EutranIntraFreqNCell))]
        [AutoMapPropertyResolve("nCelPriority", typeof(EUtranRelationZte))]
        public int CellPriority { get; set; }
    }
}
