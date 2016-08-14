using System.Collections.Generic;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.ExcelCsv;
using Lte.Parameters.Entities.Neighbor;

namespace Lte.Evaluations.MapperSerive.Infrastructure
{
    public class BtsExcelWithTownIdContainer
    {
        public BtsExcel BtsExcel { get; set; }

        public int TownId { get; set; }
    }

    public class CdmaBtsTransform : ValueResolver<BtsExcel, CdmaBts>
    {
        protected override CdmaBts ResolveCore(BtsExcel source)
        {
            return source.MapTo<CdmaBts>();
        }
    }

    [AutoMapFrom(typeof(BtsExcelWithTownIdContainer))]
    public class BtsWithTownIdContainer
    {
        [AutoMapPropertyResolve("BtsExcel", typeof(BtsExcelWithTownIdContainer), typeof(CdmaBtsTransform))]
        public CdmaBts CdmaBts { get; set; }

        public int TownId { get; set; }
    }

    public class ENodebExcelWithTownIdContainer
    {
        public ENodebExcel ENodebExcel { get; set; }

        public int TownId { get; set; }
    }

    public class ENodebExcelTransform : ValueResolver<ENodebExcel, ENodeb>
    {
        protected override ENodeb ResolveCore(ENodebExcel source)
        {
            return source.MapTo<ENodeb>();
        }
    }

    [AutoMapFrom(typeof(ENodebExcelWithTownIdContainer))]
    public class ENodebWithTownIdContainer
    {
        [AutoMapPropertyResolve("ENodebExcel", typeof(ENodebExcelWithTownIdContainer), typeof(ENodebExcelTransform))]
        public ENodeb ENodeb { get; set; }

        public int TownId { get; set; }
    }

    public class SharedBtsIdTransform : ValueResolver<string, int>
    {
        protected override int ResolveCore(string source)
        {
            return source.Split('_').Length > 2 ? source.Split('_')[1].ConvertToInt(-1) : -1;
        }
    }

    [AutoMapFrom(typeof(CellExcel))]
    public class ENodebBtsIdPair
    {
        public int ENodebId { get; set; }

        [AutoMapPropertyResolve("ShareCdmaInfo", typeof(CellExcel), typeof(SharedBtsIdTransform))]
        public int BtsId { get; set; }
    }

    [AutoMapFrom(typeof(Precise4GView), typeof(NearestPciCell), typeof(LteNeighborCell))]
    public class CellSectorIdPair
    {
        public int CellId { get; set; }

        public byte SectorId { get; set; }
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

    public class CollegeENodebIdsContainer
    {
        public string CollegeName { get; set; }

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

    public class CollegeCellNamesContainer
    {
        public string CollegeName { get; set; }

        public IEnumerable<string> CellNames { get; set; }
    }
}
