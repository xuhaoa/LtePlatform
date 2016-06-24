using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.LinqToExcel;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.DataService.Kpi
{
    public class KpiImportService
    {
        private readonly ICdmaRegionStatRepository _regionStatRepository;
        private readonly ITopDrop2GCellRepository _top2GRepository;
        private readonly ITopConnection3GRepository _top3GRepository;
        private readonly IDownSwitchFlowRepository _downSwitchRepository;
        private readonly IVipDemandRepository _vipDemandRepository;

        public KpiImportService(ICdmaRegionStatRepository regionStatRepository,
            ITopDrop2GCellRepository top2GRepository, ITopConnection3GRepository top3GRepository,
            IDownSwitchFlowRepository downSwitchRepository, IVipDemandRepository vipDemandRepository)
        {
            _regionStatRepository = regionStatRepository;
            _top2GRepository = top2GRepository;
            _top3GRepository = top3GRepository;
            _downSwitchRepository = downSwitchRepository;
            _vipDemandRepository = vipDemandRepository;
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
    }
}
