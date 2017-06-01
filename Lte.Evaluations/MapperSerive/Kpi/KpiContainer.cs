using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Kpi;
using System.Collections.Generic;

namespace Lte.Evaluations.MapperSerive.Kpi
{
    public class TopCellContainer<TTopCell>
        where TTopCell : IBtsIdQuery
    {
        public TTopCell TopCell { get; set; }

        public string CdmaName { get; set; }

        public string LteName { get; set; }
    }

    [AutoMapFrom(typeof(TopCellContainer<TopConnection3GCell>))]
    public class TopConnection3GCellViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopConnection3GCell>))]
        public TopConnection3GCellView TopConnection3GCellView { get; set; }

        public string LteName { get; set; }

        public string CdmaName { get; set; }
    }

    [AutoMapFrom(typeof(TopCellContainer<TopConnection3GTrend>))]
    public class TopConnection3GTrendViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopConnection3GTrend>))]
        public TopConnection3GTrendView TopConnection3GTrendView { get; set; }

        [AutoMapPropertyResolve("LteName", typeof(TopCellContainer<TopConnection3GTrend>))]
        public string ENodebName { get; set; }

        public string CdmaName { get; set; }

        public string CellName => CdmaName + "-" + TopConnection3GTrendView.SectorId;
    }

    [AutoMapFrom(typeof(TopCellContainer<TopDrop2GCell>))]
    public class TopDrop2GCellViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopDrop2GCell>))]
        public TopDrop2GCellView TopDrop2GCellView { get; set; }

        public string LteName { get; set; }

        public string CdmaName { get; set; }
    }

    [AutoMapFrom(typeof(TopCellContainer<TopDrop2GTrend>))]
    public class TopDrop2GTrendViewContainer
    {
        [AutoMapPropertyResolve("TopCell", typeof(TopCellContainer<TopDrop2GTrend>))]
        public TopDrop2GTrendView TopDrop2GTrendView { get; set; }

        [AutoMapPropertyResolve("LteName", typeof(TopCellContainer<TopDrop2GTrend>))]
        public string ENodebName { get; set; }

        public string CdmaName { get; set; }

        public string CellName => CdmaName + "-" + TopDrop2GTrendView.SectorId;
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
