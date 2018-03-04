using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class ENodebFlowService
    {
        private readonly BandCellService _cellService;
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly IENodebRepository _eNodebRepository;

        public ENodebFlowService(BandCellService cellService, IENodebRepository eNodebRepository,
            IFlowHuaweiRepository huaweiRepositroy, IFlowZteRepository zteRepository)
        {
            _cellService = cellService;
            _eNodebRepository = eNodebRepository;
            _huaweiRepository = huaweiRepositroy;
            _zteRepository = zteRepository;
        }
        
        public IEnumerable<ENodebFlowView> GetENodebFlowViews(DateTime begin, DateTime end,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var eNodebStatList = new List<ENodebFlowView>();
            var zteFlows = QueryZteFlows(frequency, begin, end);
            var huaweiFlows = QueryHuaweiFlows(begin, end, frequency);
            var eNodebs = _eNodebRepository.GetAllList();
            return GenerateENodebFlowViews(eNodebStatList, huaweiFlows, eNodebs, zteFlows);
        }

        public IEnumerable<ENodebFlowView> GetENodebFlowViews(DateTime begin, DateTime end,
            string city, string district,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var eNodebStatList = new List<ENodebFlowView>();
            var zteFlows = QueryZteFlows(frequency, begin, end);
            var huaweiFlows = QueryHuaweiFlows(begin, end, frequency);
            var eNodebs = _cellService.GetDistrictENodebs(city, district);
            return GenerateENodebFlowViews(eNodebStatList, huaweiFlows, eNodebs, zteFlows);
        }

        private static IEnumerable<ENodebFlowView> GenerateENodebFlowViews(
            List<ENodebFlowView> eNodebStatList, List<FlowHuawei> huaweiFlows, 
            List<ENodeb> eNodebs, List<FlowZte> zteFlows)
        {
            eNodebStatList.AddRange(
                huaweiFlows.GetENodebStats<FlowHuawei, ENodebFlowView>(eNodebs,
                    stat =>
                    {
                        var max = stat.Max(s => s.PdcpDownlinkFlow);
                        return
                            stat.FirstOrDefault(x => Math.Abs(x.PdcpDownlinkFlow - max) < 1);
                    }));
            eNodebStatList.AddRange(
                zteFlows.GetENodebStats<FlowZte, ENodebFlowView>(eNodebs,
                    stat =>
                    {
                        var max = stat.Max(s => s.DownlinkPdcpFlow);
                        return
                            stat.FirstOrDefault(x => Math.Abs(x.DownlinkPdcpFlow - max) < 1);
                    }));
            return eNodebStatList.GetPositionMergeStats();
        }

        private List<FlowHuawei> QueryHuaweiFlows(DateTime begin, DateTime end, FrequencyBandType frequency)
        {
            var huaweiFlows = _huaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end);
            if (frequency == FrequencyBandType.All) return huaweiFlows;
            var cells = _cellService.GetHuaweiCellsByBandType(frequency);
            huaweiFlows = (from f in huaweiFlows
                join c in cells on new {f.ENodebId, f.LocalCellId} equals
                new {c.ENodebId, LocalCellId = c.LocalSectorId}
                select f).ToList();
            return huaweiFlows;
        }

        public List<FlowZte> QueryZteFlows(FrequencyBandType frequency, DateTime begin, DateTime end)
        {
            switch (frequency)
            {
                case FrequencyBandType.All:
                    return _zteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end);
                case FrequencyBandType.Band2100:
                    return
                        _zteRepository.GetAllList(
                            x => x.StatTime >= begin && x.StatTime < end && x.SectorId < 16);
                case FrequencyBandType.Band1800:
                    return
                        _zteRepository.GetAllList(
                            x => x.StatTime >= begin && x.StatTime < end && x.SectorId >= 48 && x.SectorId < 64);
                default:
                    return
                        _zteRepository.GetAllList(
                            x => x.StatTime >= begin && x.StatTime < end && x.SectorId >= 16 && x.SectorId < 32);
            }
        }

    }
}
