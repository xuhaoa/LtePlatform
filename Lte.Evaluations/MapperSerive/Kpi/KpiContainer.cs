using System.Collections.Generic;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.ViewModels.Kpi;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.MapperSerive.Kpi
{
    public class TopCellContainer<TTopCell>
        where TTopCell : IBtsIdQuery
    {
        public TTopCell TopCell { get; set; }

        public string CdmaName { get; set; }

        public string LteName { get; set; }
    }

    public class TopConnection3GCellViewContainer
    {
        public TopConnection3GCellView TopConnection3GCellView { get; set; }

        public string LteName { get; set; }

        public string CdmaName { get; set; }
    }

    public class TopConnection3GTrendViewContainer
    {
        public TopConnection3GTrendView TopConnection3GTrendView { get; set; }

        public string ENodebName { get; set; }

        public string CellName { get; set; }
    }

    public class TopDrop2GCellViewContainer
    {
        public TopDrop2GCellView TopDrop2GCellView { get; set; }

        public string LteName { get; set; }

        public string CdmaName { get; set; }
    }

    public class TopDrop2GTrendViewContainer
    {
        public TopDrop2GTrendView TopDrop2GTrendView { get; set; }

        public string ENodebName { get; set; }

        public string CellName { get; set; }
    }

    public class TopPrecise4GContainer
    {
        public PreciseCoverage4G PreciseCoverage4G { get; set; }

        public int TopDates { get; set; }
    }

    public class TopPreciseViewContainer
    {
        public IEnumerable<Precise4GView> Views { get; set; }
    }

    public class TownPreciseViewContainer
    {
        public IEnumerable<TownPreciseView> Views { get; set; }
    }
}
