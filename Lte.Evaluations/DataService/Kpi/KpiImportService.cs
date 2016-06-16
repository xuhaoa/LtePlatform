using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.LinqToExcel;
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

        public KpiImportService(ICdmaRegionStatRepository regionStatRepository,
            ITopDrop2GCellRepository top2GRepository, ITopConnection3GRepository top3GRepository)
        {
            _regionStatRepository = regionStatRepository;
            _top2GRepository = top2GRepository;
            _top3GRepository = top3GRepository;
        }

        private int Import(IEnumerable<CdmaRegionStatExcel> stats)
        {
            foreach (var stat in from stat in stats
                                 let info = _regionStatRepository.FirstOrDefault(x => x.Region == stat.Region && x.StatDate == stat.StatDate)
                                 where info == null
                                 select stat)
            {
                _regionStatRepository.Insert(stat.MapTo<CdmaRegionStat>());
            }
            return _regionStatRepository.SaveChanges();
        }

        private int Import(IEnumerable<TopDrop2GCellExcel> stats)
        {
            foreach (var stat in from stat in stats
                                 let time = stat.StatDate.AddHours(stat.StatHour)
                                 let info =
                                     _top2GRepository.FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time)
                                 where info == null
                                 select stat)
            {
                _top2GRepository.Insert(TopDrop2GCell.ConstructStat(stat));
            }
            return _top2GRepository.SaveChanges();
        }

        private int Import(IEnumerable<TopConnection3GCellExcel> stats)
        {
            foreach (var stat in from stat in stats
                                 let time = stat.StatDate.AddHours(stat.StatHour)
                                 let info =
                                     _top3GRepository.FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time)
                                 where info == null
                                 select stat)
            {
                _top3GRepository.Insert(TopConnection3GCell.ConstructStat(stat));
            }
            return _top3GRepository.SaveChanges();
        }

        public List<string> Import(string path, IEnumerable<string> regions)
        {
            var factory = new ExcelQueryFactory {FileName = path};
            var message = (from region in regions
                let stats = (from c in factory.Worksheet<CdmaRegionStatExcel>(region)
                    where c.StatDate > DateTime.Today.AddDays(-30) && c.StatDate <= DateTime.Today
                    select c).ToList()
                let count = Import(stats)
                select "完成导入区域：'" + region + "'的日常指标导入" + count + "条").ToList();
            var topDrops = (from c in factory.Worksheet<TopDrop2GCellExcel>(TopDrop2GCellExcel.SheetName)
                            select c).ToList();
            var drops = Import(topDrops);
            message.Add("完成TOP掉话小区导入" + drops + "个");
            var topConnections = (from c in factory.Worksheet<TopConnection3GCellExcel>(TopConnection3GCellExcel.SheetName)
                                  select c).ToList();
            var connections = Import(topConnections);
            message.Add("完成TOP连接小区导入" + connections + "个");
            return message;
        }

        public string ImportDownSwitch(string path)
        {
            var factory = new ExcelQueryFactory { FileName = path };
            var stats = (from c in factory.Worksheet<DownSwitchFlowExcel>("4G考核_片区")
                where c.StatDate > DateTime.Today.AddDays(-30) && c.StatDate <= DateTime.Today
                select c).ToList();
        }
    }
}
