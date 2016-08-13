using System.Collections.Generic;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.MapperSerive.Infrastructure
{
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
            return obj.ENodebId*839 + obj.Pci;
        }
    }

    [TypeDoc("指定扇区查询范围条件")]
    public class SectorRangeContainer
    {
        [MemberDoc("西边经度")]
        public double West { get; set; }

        [MemberDoc("东边经度")]
        public double East { get; set; }

        [MemberDoc("南边纬度")]
        public double South { get; set; }

        [MemberDoc(("北边纬度"))]
        public double North { get; set; }

        [MemberDoc("需要排除的小区列表")]
        public IEnumerable<CellIdPair> ExcludedCells { get; set; }
    }

    public class ENodebRangeContainer
    {
        [MemberDoc("西边经度")]
        public double West { get; set; }

        [MemberDoc("东边经度")]
        public double East { get; set; }

        [MemberDoc("南边纬度")]
        public double South { get; set; }

        [MemberDoc(("北边纬度"))]
        public double North { get; set; }

        public IEnumerable<int> ExcludedIds { get; set; } 
    }

    [TypeDoc("小区编号和扇区编号定义 ")]
    public class CellIdPair
    {
        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }
    }

    [TypeDoc("CDMA小区编号和扇区编号定义 ")]
    public class CdmaCellIdPair
    {
        [MemberDoc("小区编号")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("小区类型")]
        public string CellType { get; set; }
    }

    [TypeDoc("基站编号容器")]
    public class ENodebIdsContainer
    {
        [MemberDoc("基站编号列表")]
        public IEnumerable<int> ENodebIds { get; set; }
    }

    [TypeDoc("小区编号容器")]
    public class CellIdsContainer
    {
        [MemberDoc("小区编号列表")]
        public IEnumerable<CellIdPair> CellIdPairs { get; set; }
    }

    [TypeDoc("CDMA小区编号容器")]
    public class CdmaCellIdsContainer
    {
        [MemberDoc("小区编号列表")]
        public IEnumerable<CdmaCellIdPair> CellIdPairs { get; set; }
    }
}