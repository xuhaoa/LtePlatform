using System;
using System.Collections.Generic;
using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class ZteFlowQuery : ZteDateSpanQuery<FlowZte, FlowView, IFlowZteRepository>
    {
        public ZteFlowQuery(IFlowZteRepository zteRepository, int eNodebId, byte sectorId)
            : base(zteRepository, eNodebId, sectorId)
        {
        }

        protected override List<FlowZte> QueryList(DateTime begin, DateTime end)
        {
            return ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end
                                                 && x.ENodebId == ENodebId && x.SectorId == SectorId);
        }
    }
}