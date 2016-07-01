using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Parameters.Entities;
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

    public class BtsWithTownIdContainer
    {
        public CdmaBts CdmaBts { get; set; }

        public int TownId { get; set; }
    }

    public class ENodebExcelWithTownIdContainer
    {
        public ENodebExcel ENodebExcel { get; set; }

        public int TownId { get; set; }
    }

    public class ENodebWithTownIdContainer
    {
        public ENodeb ENodeb { get; set; }

        public int TownId { get; set; }
    }

    public class ENodebBtsIdPair
    {
        public int ENodebId { get; set; }

        public int BtsId { get; set; }
    }

    [AutoMapFrom(typeof(Precise4GView), typeof(NearestPciCell), typeof(LteNeighborCell))]
    public class CellSectorIdPair
    {
        public int CellId { get; set; }

        public byte SectorId { get; set; }
    }
}
