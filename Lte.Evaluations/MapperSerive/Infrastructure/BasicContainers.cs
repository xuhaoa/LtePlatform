using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
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
}
