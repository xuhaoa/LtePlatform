using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService.Basic;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowService
    {
        private readonly IFlowHuaweiRepository _huaweiRepository;
        private readonly IFlowZteRepository _zteRepository;
        private readonly IRrcZteRepository _rrcZteRepository;
        private readonly IRrcHuaweiRepository _rrcHuaweiRepository;
        private readonly IQciZteRepository _qciZteRepository;
        private readonly IQciHuaweiRepository _qciHuaweiRepository;
        private readonly ITownFlowRepository _townFlowRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ITownRrcRepository _townRrcRepository;
        private readonly ITownQciRepository _townQciRepository;
        private readonly ICellRepository _cellRepository;
        private readonly IPrbHuaweiRepository _prbHuaweiRepository;
        private readonly IPrbZteRepository _prbZteRepository;
        private readonly ITownPrbRepository _townPrbRepository;

        private static Stack<Tuple<FlowHuawei, RrcHuawei, QciHuawei, PrbHuawei>> FlowHuaweis { get; set; }

        private static Stack<Tuple<FlowZte, RrcZte, QciZte, PrbZte>> FlowZtes { get; set; }

        public int FlowHuaweiCount => FlowHuaweis.Count;

        public int FlowZteCount => FlowZtes.Count;

        public FlowService(
            IFlowHuaweiRepository huaweiRepositroy, IFlowZteRepository zteRepository,
            IRrcZteRepository rrcZteRepository, IRrcHuaweiRepository rrcHuaweiRepository,
            IQciZteRepository qciZteRepository, IQciHuaweiRepository qciHuaweiRepository,
            ITownFlowRepository townFlowRepository, IENodebRepository eNodebRepository,
            ITownRrcRepository townRrcRepository, ITownQciRepository townQciRepository, 
            ICellRepository cellRepository, IPrbHuaweiRepository prbHuaweiRepository,
            IPrbZteRepository prbZteRepository, ITownPrbRepository townPrbRepository)
        {
            _huaweiRepository = huaweiRepositroy;
            _zteRepository = zteRepository;
            _rrcZteRepository = rrcZteRepository;
            _rrcHuaweiRepository = rrcHuaweiRepository;
            _qciZteRepository = qciZteRepository;
            _qciHuaweiRepository = qciHuaweiRepository;
            _townFlowRepository = townFlowRepository;
            _eNodebRepository = eNodebRepository;
            _townRrcRepository = townRrcRepository;
            _townQciRepository = townQciRepository;
            _cellRepository = cellRepository;
            _prbHuaweiRepository = prbHuaweiRepository;
            _prbZteRepository = prbZteRepository;
            _townPrbRepository = townPrbRepository;
            if (FlowHuaweis == null) FlowHuaweis = new Stack<Tuple<FlowHuawei, RrcHuawei, QciHuawei, PrbHuawei>>();
            if (FlowZtes == null) FlowZtes = new Stack<Tuple<FlowZte, RrcZte, QciZte, PrbZte>>();
        }

        public void UploadFlowHuaweis(StreamReader reader)
        {
            var originCsvs = FlowHuaweiCsv.ReadFlowHuaweiCsvs(reader);
            var mergedCsvs = (from item in originCsvs
                group item by new
                {
                    item.StatTime.Date,
                    item.CellInfo
                }
                into g
                select g.ArrayAggration(stat =>
                {
                    stat.StatTime = g.Key.Date;
                    stat.CellInfo = g.Key.CellInfo;
                })).ToList();
            foreach (var csv in mergedCsvs)
            {
                FlowHuaweis.Push(
                    new Tuple<FlowHuawei, RrcHuawei, QciHuawei, PrbHuawei>(Mapper.Map<FlowHuaweiCsv, FlowHuawei>(csv),
                        Mapper.Map<FlowHuaweiCsv, RrcHuawei>(csv), Mapper.Map<FlowHuaweiCsv, QciHuawei>(csv),
                        Mapper.Map<FlowHuaweiCsv, PrbHuawei>(csv)));
            }
        }

        public void UploadFlowZtes(StreamReader reader)
        {
            var csvs = FlowZteCsv.ReadFlowZteCsvs(reader);
            foreach (var csv in csvs)
            {
                FlowZtes.Push(new Tuple<FlowZte, RrcZte, QciZte, PrbZte>(Mapper.Map<FlowZteCsv, FlowZte>(csv),
                    Mapper.Map<FlowZteCsv, RrcZte>(csv), Mapper.Map<FlowZteCsv, QciZte>(csv),
                    Mapper.Map<FlowZteCsv, PrbZte>(csv)));
            }
        }

        public async Task<bool> DumpOneHuaweiStat()
        {
            var stat = FlowHuaweis.Pop();
            if (stat.Item1 != null)
            {
                await _huaweiRepository.ImportOneAsync(stat.Item1);
            }
            if (stat.Item2 != null)
            {
                await _rrcHuaweiRepository.ImportOneAsync(stat.Item2);
            }
            if (stat.Item3 != null)
            {
                await _qciHuaweiRepository.ImportOneAsync(stat.Item3);
            }
            if (stat.Item4 != null)
            {
                await _prbHuaweiRepository.ImportOneAsync(stat.Item4);
            }

            return true;
        }

        public async Task<bool> DumpOneZteStat()
        {
            var stat = FlowZtes.Pop();
            if (stat.Item1 != null)
            {
                await _zteRepository.ImportOneAsync(stat.Item1);
            }
            if (stat.Item2 != null)
            {
                await _rrcZteRepository.ImportOneAsync(stat.Item2);
            }
            if (stat.Item3 != null)
            {
                await _qciZteRepository.ImportOneAsync(stat.Item3);
            }
            if (stat.Item4 != null)
            {
                await _prbZteRepository.ImportOneAsync(stat.Item4);
            }

            return true;
        }

        public void ClearHuaweiStats()
        {
            FlowHuaweis.Clear();
        }

        public void ClearZteStats()
        {
            FlowZtes.Clear();
        }
        
        public async Task<IEnumerable<FlowHistory>> GetFlowHistories(DateTime begin, DateTime end)
        {
            var results = new List<FlowHistory>();
            while (begin < end.AddDays(1))
            {
                var beginDate = begin;
                var endDate = begin.AddDays(1);
                var huaweiItems = await _huaweiRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var huaweiRrcs =
                    await _rrcHuaweiRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var zteItems = await _zteRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var zteRrcs = await _rrcZteRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var townItems =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.All); ;
                var townItems2100 =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.Band2100);
                var townItems1800 =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.Band1800);
                var townItems800 =
                    await _townFlowRepository.CountAsync(
                        x =>
                            x.StatTime >= beginDate && x.StatTime < endDate &&
                            x.FrequencyBandType == FrequencyBandType.Band800VoLte);
                var townRrcs = await _townRrcRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var townQcis = await _townQciRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                var townPrbs = await _townPrbRepository.CountAsync(x => x.StatTime >= beginDate && x.StatTime < endDate);
                results.Add(new FlowHistory
                {
                    DateString = begin.ToShortDateString(),
                    HuaweiItems = huaweiItems,
                    HuaweiRrcs = huaweiRrcs,
                    ZteItems = zteItems,
                    ZteRrcs = zteRrcs,
                    TownStats = townItems,
                    TownStats2100 = townItems2100,
                    TownStats1800 = townItems1800,
                    TownStats800VoLte = townItems800,
                    TownRrcs = townRrcs,
                    TownQcis = townQcis,
                    TownPrbs = townPrbs
                });
                begin = begin.AddDays(1);
            }
            return results;
        }

        public IEnumerable<CellIdPair> QueryUnmatchedHuaweis(int townId, DateTime date)
        {
            var eNodebs = _eNodebRepository.GetAllList(x => x.TownId == townId);
            var cells = from cell in _cellRepository.GetAllList()
                        join eNodeb in eNodebs on cell.ENodebId equals eNodeb.ENodebId
                        select cell;
            var stats = _huaweiRepository.GetAllList(x => x.StatTime >= date);
            var townStats = from stat in stats
                join eNodeb in eNodebs on stat.ENodebId equals eNodeb.ENodebId
                select stat;
            return from stat in townStats
                join cell in cells on new {stat.ENodebId, stat.LocalCellId} equals
                new {cell.ENodebId, LocalCellId = cell.LocalSectorId}
                into match
                from m in match.DefaultIfEmpty()
                   where m == null
                select new CellIdPair
                {
                    CellId = stat.ENodebId,
                    SectorId = stat.LocalCellId
                };
        }

    }
}

