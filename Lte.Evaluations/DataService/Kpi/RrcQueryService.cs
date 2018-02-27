using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class RrcQueryService : DateSpanQuery<RrcView, IRrcHuaweiRepository, IRrcZteRepository>
    {
        public RrcQueryService(IRrcHuaweiRepository huaweiRepository, IRrcZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override Switch.IDateSpanQuery<List<RrcView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiRrcQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override Switch.IDateSpanQuery<List<RrcView>> GenerateZteQuery(int eNodebId, byte sectorId)
        {
            return new ZteRrcQuery(ZteRepository, eNodebId, sectorId);
        }

        public IEnumerable<RrcView> QueryTopRrcFailViews(string city, string district, DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryDistrictFlowViews<RrcView, RrcZte, RrcHuawei>(city, district,
                ZteRepository.GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end &&
                        x.MoDataRrcRequest + x.MoSignallingRrcRequest + x.MtAccessRrcRequest > 20000),
                HuaweiRepository.GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end &&
                        x.MoDataRrcRequest + x.MoSignallingRrcRequest + x.MtAccessRrcRequest > 20000),
                TownRepository, ENodebRepository);
            return results.OrderByDescending(x => x.TotalRrcFail).Take(topCount);
        }
    }
}