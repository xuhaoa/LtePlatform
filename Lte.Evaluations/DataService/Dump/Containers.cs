using System.Collections.Generic;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.DataService.Dump
{
    public class NewBtsListContainer
    {
        public IEnumerable<BtsExcel> Infos { get; set; } 
    }

    [TypeDoc("新的小区信息列表容器")]
    public class NewCellListContainer
    {
        [MemberDoc("Excel小区信息列表")]
        public IEnumerable<CellExcel> Infos { get; set; }
    }

    [TypeDoc("新基站信息容器")]
    public class NewENodebListContainer
    {
        [MemberDoc("基站Excel信息列表")]
        public IEnumerable<ENodebExcel> Infos { get; set; }
    }

    [TypeDoc("CDMA小区EXCEL信息容器，用于打包向服务器POST")]
    public class NewCdmaCellListContainer
    {
        public IEnumerable<CdmaCellExcel> Infos { get; set; }
    }
}
