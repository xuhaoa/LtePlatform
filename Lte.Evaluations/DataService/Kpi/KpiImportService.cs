using Abp.EntityFramework.Repositories;
using Lte.Domain.LinqToExcel;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Lte.Domain.Common;

namespace Lte.Evaluations.DataService.Kpi
{
    public class KpiImportService
    {
        private readonly ICdmaRegionStatRepository _regionStatRepository;
        private readonly ITopDrop2GCellRepository _top2GRepository;
        private readonly ITopConnection3GRepository _top3GRepository;
        private readonly ITopConnection2GRepository _topConnection2GRepository;
        private readonly IDownSwitchFlowRepository _downSwitchRepository;
        private readonly IVipDemandRepository _vipDemandRepository;
        private readonly IComplainItemRepository _complainItemRepository;
        private readonly IBranchDemandRepository _branchDemandRepository;
        private readonly IOnlineSustainRepository _onlineSustainRepository;
        private readonly IPlanningSiteRepository _planningSiteRepository;
        private readonly IComplainProcessRepository _processRepository;
        private readonly List<Town> _towns; 

        public KpiImportService(ICdmaRegionStatRepository regionStatRepository,
            ITopDrop2GCellRepository top2GRepository, ITopConnection3GRepository top3GRepository,
            ITopConnection2GRepository topConnection2GRepository,
            IDownSwitchFlowRepository downSwitchRepository, IVipDemandRepository vipDemandRepository,
            IComplainItemRepository complainItemRepository, IBranchDemandRepository branchDemandRepository,
            IOnlineSustainRepository onlineSustainRepository, IPlanningSiteRepository planningSiteRepository, 
            IComplainProcessRepository processRepository, ITownRepository townRepository)
        {
            _regionStatRepository = regionStatRepository;
            _top2GRepository = top2GRepository;
            _top3GRepository = top3GRepository;
            _topConnection2GRepository = topConnection2GRepository;
            _downSwitchRepository = downSwitchRepository;
            _vipDemandRepository = vipDemandRepository;
            _complainItemRepository = complainItemRepository;
            _branchDemandRepository = branchDemandRepository;
            _onlineSustainRepository = onlineSustainRepository;
            _planningSiteRepository = planningSiteRepository;
            _processRepository = processRepository;
            _towns = townRepository.GetAllList();
        }
        public List<string> Import(string path, IEnumerable<string> regions)
        {
            var factory = new ExcelQueryFactory {FileName = path};
            var message = (from region in regions
                let stats = (from c in factory.Worksheet<CdmaRegionStatExcel>(region)
                    where c.StatDate > DateTime.Today.AddDays(-30) && c.StatDate <= DateTime.Today
                    select c).ToList()
                let count = _regionStatRepository.Import<ICdmaRegionStatRepository, CdmaRegionStat, CdmaRegionStatExcel>(stats)
                select "完成导入区域：'" + region + "'的日常指标导入" + count + "条").ToList();

            var topDrops = (from c in factory.Worksheet<TopDrop2GCellExcel>(TopDrop2GCellExcel.SheetName)
                            select c).ToList();
            var drops = _top2GRepository.Import<ITopDrop2GCellRepository, TopDrop2GCell, TopDrop2GCellExcel>(topDrops);
            message.Add("完成TOP掉话小区导入" + drops + "个");

            var topConnections = (from c in factory.Worksheet<TopConnection3GCellExcel>(TopConnection3GCellExcel.SheetName)
                                  select c).ToList();
            var connections =
                _top3GRepository.Import<ITopConnection3GRepository, TopConnection3GCell, TopConnection3GCellExcel>(
                    topConnections);
            message.Add("完成TOP连接小区导入" + connections + "个");

            var topConnection2Gs = (from c in factory.Worksheet<TopConnection2GExcel>(TopConnection2GExcel.SheetName)
                select c).ToList();
            var connection2Gs =
                _topConnection2GRepository.Import<ITopConnection2GRepository, TopConnection2GCell, TopConnection2GExcel>
                    (topConnection2Gs);
            message.Add("完成TOP呼建小区导入" + connection2Gs + "个");

            return message;
        }

        public string ImportDownSwitch(string path)
        {
            var factory = new ExcelQueryFactory { FileName = path };
            var stats = (from c in factory.Worksheet<DownSwitchFlowExcel>("4G考核_片区")
                where c.StatDate > DateTime.Today.AddDays(-30) && c.StatDate <= DateTime.Today
                select c).ToList().Where(x => x.DownSwitchFlow3G > 0 && x.Flow4G > 0);
            var count =
                _downSwitchRepository.Import<IDownSwitchFlowRepository, DownSwitchFlow, DownSwitchFlowExcel>(stats);
            return "完成4G用户3G流量比记录导入" + count + "个";
        }

        public string ImportVipDemand(string path)
        {
            var factory = new ExcelQueryFactory {FileName = path};
            var stats = (from c in factory.Worksheet<VipDemandExcel>("2016年支撑保障详情表")
                select c).ToList();
            var count =
                _vipDemandRepository.Import<IVipDemandRepository, VipDemand, VipDemandExcel>(stats);
            return "完成政企客户支撑信息导入" + count + "条";
        }

        public string ImportComplain(string path)
        {
            var factory = new ExcelQueryFactory { FileName = path };
            var stats = (from c in factory.Worksheet<ComplainExcel>("当月累积受理工单详单")
                         select c).ToList();
            foreach (var stat in stats)
            {
                var town =
                    _towns.FirstOrDefault(
                        x => stat.District.Contains(x.DistrictName)
                             && (stat.RoadName ?? "" + (stat.BuildingName ?? "")).Contains(x.TownName));
                if (town != null)
                    stat.TownId = town.Id;
            }
            var count =
                _complainItemRepository.Import<IComplainItemRepository, ComplainItem, ComplainExcel>(stats);
            return "完成抱怨量信息导入" + count + "条";
        }

        public string ImportBranchDemand(string path)
        {
            var factory = new ExcelQueryFactory {FileName = path};
            var stats = (from c in factory.Worksheet<BranchDemandExcel>("Sheet1") select c).ToList();
            var count =
                _branchDemandRepository.Import<IBranchDemandRepository, BranchDemand, BranchDemandExcel, Town>(stats,
                    _towns);
            return "完成分公司需求信息导入" + count + "条";
        }

        public string ImportOnlineDemand(string path)
        {
            var factory = new ExcelQueryFactory { FileName = path };
            var stats = (from c in factory.Worksheet<OnlineSustainExcel>("汇总表") select c).ToList();
            var count =
                _onlineSustainRepository.Import<IOnlineSustainRepository, OnlineSustain, OnlineSustainExcel, Town>(stats, _towns,
                    (towns, stat) =>
                    {
                        if (!string.IsNullOrEmpty(stat.Town))
                        {
                            var candidateTown =
                                towns.FirstOrDefault(x => x.DistrictName == stat.District && x.TownName == stat.Town);
                            if (candidateTown != null)
                            {
                                return candidateTown.Id;
                            }
                        }
                        var candidateTowns = towns.Where(x => x.DistrictName == stat.District).ToList();
                        if (!candidateTowns.Any()) candidateTowns = _towns;

                        var town = ((string.IsNullOrEmpty(stat.Site)
                            ? null
                            : candidateTowns.FirstOrDefault(x => stat.Site.Contains(x.TownName))) ??
                                    (string.IsNullOrEmpty(stat.Address)
                                        ? null
                                        : candidateTowns.FirstOrDefault(x => stat.Address.Contains(x.TownName)))) ??
                                   (string.IsNullOrEmpty(stat.Phenomenon)
                                       ? null
                                       : candidateTowns.FirstOrDefault(x => stat.Phenomenon.Contains(x.TownName)));
                        return town?.Id ?? candidateTowns.First().Id;
                    });
            var count2 =
                _processRepository.Import<IComplainProcessRepository, ComplainProcess, OnlineSustainExcel>(stats);
            return "完成在线支撑信息导入" + count + "条; " + "处理记录" + count2 + "条";
        }

        public string ImportPlanningSite(string path)
        {
            var factory = new ExcelQueryFactory { FileName = path };
            var stats = (from c in factory.Worksheet<PlanningSiteExcel>("谈点清单") select c).ToList();
            var count =
                _planningSiteRepository.Import<IPlanningSiteRepository, PlanningSite, PlanningSiteExcel, Town>(stats, _towns);
            return "完成规则站点信息导入" + count + "条";
        }
    }
}
