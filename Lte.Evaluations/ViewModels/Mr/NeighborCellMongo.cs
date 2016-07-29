using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Neighbor;

namespace Lte.Evaluations.ViewModels.Mr
{
    [TypeDoc("来自MongoDB的LTE邻区关系视图")]
    [AutoMapFrom(typeof(EUtranRelationZte))]
    [AutoMapFrom(typeof(ExternalEUtranCellFDDZte))]
    public class NeighborCellMongo
    {
        [MemberDoc("小区编号（对于LTE来说就是基站编号）")]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(EUtranRelationZte))]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(ExternalEUtranCellFDDZte))]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("邻区小区编号")]
        [AutoMapPropertyResolve("eNBId", typeof(ExternalEUtranCellFDDZte))]
        public int NeighborCellId { get; set; }

        [MemberDoc("邻区扇区编号")]
        [AutoMapPropertyResolve("cellLocalId", typeof(ExternalEUtranCellFDDZte))]
        public byte NeighborSectorId { get; set; }

        [MemberDoc("邻区名称")]
        [AutoMapPropertyResolve("userLabel", typeof(ExternalEUtranCellFDDZte))]
        public string NeighborCellName { get; set; }

        [MemberDoc("PCI，便于查询邻区")]
        [AutoMapPropertyResolve("pci", typeof(ExternalEUtranCellFDDZte))]
        public short NeighborPci { get; set; }

        [MemberDoc("是否为ANR创建")]
        [AutoMapPropertyResolve("isAnrCreated", typeof(EUtranRelationZte), typeof(IntToBoolTransform))]
        public bool IsAnrCreated { get; set; }

        [MemberDoc("是否允许切换")]
        [AutoMapPropertyResolve("isHOAllowed", typeof(EUtranRelationZte), typeof(IntToBoolTransform))]
        public bool HandoffAllowed { get; set; }

        [MemberDoc("是否可以被ANR删除")]
        [AutoMapPropertyResolve("isRemoveAllowed", typeof(EUtranRelationZte), typeof(IntToBoolTransform))]
        public bool RemovedAllowed { get; set; }

        [MemberDoc("小区测量优先级是否为高")]
        [AutoMapPropertyResolve("nCelPriority", typeof(EUtranRelationZte))]
        public int CellPriority { get; set; }
    }
}
