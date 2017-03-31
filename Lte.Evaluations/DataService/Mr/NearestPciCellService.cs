using System;
using Lte.Evaluations.ViewModels.Mr;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Neighbor;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract.Infrastructure;

namespace Lte.Evaluations.DataService.Mr
{
    public class NearestPciCellService
    {
        private readonly INearestPciCellRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IAgisDtPointRepository _agisRepository;
        private readonly ITownRepository _townRepository;
        private readonly IMrGridRepository _mrGridRepository;

        private readonly IAppStreamRepository _streamRepository;
        private readonly IWebBrowsingRepository _browsingRepository;

        private static Stack<NearestPciCell> NearestCells { get; set; }

        public int NearestCellCount => NearestCells.Count;

        public NearestPciCellService(INearestPciCellRepository repository, ICellRepository cellRepository,
            IENodebRepository eNodebRepository, IAgisDtPointRepository agisRepository,
            ITownRepository townRepository, IMrGridRepository mrGridRepository,
            IAppStreamRepository streamRepository, IWebBrowsingRepository browsingRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _eNodebRepository = eNodebRepository;
            _agisRepository = agisRepository;
            _townRepository = townRepository;
            _mrGridRepository = mrGridRepository;
            _streamRepository = streamRepository;
            _browsingRepository = browsingRepository;
            if (NearestCells == null)
                NearestCells = new Stack<NearestPciCell>();
        }

        public List<NearestPciCellView> QueryCells(int cellId, byte sectorId)
        {
            return
                _repository.GetAllList(cellId, sectorId)
                    .Select(
                        x =>
                            NearestPciCellView.ConstructView(x, _eNodebRepository))
                    .ToList();
        }

        public List<NearestPciCell> QueryNeighbors(int cellId, byte sectorId)
        {
            return _repository.GetAllList(cellId, sectorId);
        }

        public NearestPciCell QueryNearestPciCell(int cellId, byte sectorId, short pci)
        {
            return _repository.GetNearestPciCell(cellId, sectorId, pci);
        }

        public int UpdateNeighborPcis(int cellId, byte sectorId)
        {
            var neighborList = _repository.GetAllList(cellId, sectorId);
            foreach (var pciCell in neighborList)
            {
                var cell = _cellRepository.GetBySectorId(pciCell.NearestCellId, pciCell.NearestSectorId);
                if (cell == null || pciCell.Pci == cell.Pci) continue;
                pciCell.Pci = cell.Pci;
                _repository.Update(pciCell);
                neighborList = _repository.GetAllList(pciCell.NearestCellId, pciCell.NearestSectorId);
                foreach (var nearestPciCell in neighborList)
                {
                    cell = _cellRepository.GetBySectorId(nearestPciCell.NearestCellId, nearestPciCell.NearestSectorId);
                    if (cell==null||nearestPciCell.Pci==cell.Pci) continue;
                    nearestPciCell.Pci = cell.Pci;
                    _repository.Update(nearestPciCell);
                }
            }
            return _repository.SaveChanges();
        }

        public void UpdateNeighborCell(NearestPciCell cell)
        {
            var item = _repository.GetNearestPciCell(cell.CellId, cell.SectorId, cell.Pci);
            if (item != null)
            {
                item.NearestCellId = cell.NearestCellId;
                item.NearestSectorId = cell.NearestSectorId;
                _repository.Update(item);
            }
            else
            {
                cell.TotalTimes = 98;
                _repository.Insert(cell);
            }
            _repository.SaveChanges();
        }

        public void UploadAgisDtPoints(StreamReader reader)
        {
            string line;
            int count = 0;
            while (!string.IsNullOrEmpty(line = reader.ReadLine()))
            {
                var fields = line.Split(',');
                var dtPoint = new AgisDtPoint
                {
                    Operator = fields[0],
                    Longtitute = fields[1].ConvertToDouble(0),
                    Lattitute = fields[2].ConvertToDouble(0),
                    UnicomRsrp = fields[3].ConvertToDouble(-140),
                    MobileRsrp = fields[4].ConvertToDouble(-140),
                    TelecomRsrp = fields[5].ConvertToDouble(-140),
                    StatDate = DateTime.Today.AddDays(-1)
                };
                _agisRepository.Insert(dtPoint);
                if (count++%1000 == 0)
                    _agisRepository.SaveChanges();
            }
            _agisRepository.SaveChanges();

        }

        public void UploadMrGrids(StreamReader reader, string fileName)
        {
            var xml = new XmlDocument();
            xml.Load(reader);
            var districts = _townRepository.GetAllList().Select(x => x.DistrictName).Distinct();
            var district = districts.FirstOrDefault(fileName.Contains);
            var candidateDescritions = new [] {"竞对总体", "移动竞对", "联通竞对" };
            var competeDescription = candidateDescritions.FirstOrDefault(fileName.Contains);
            var list = competeDescription == null
                ? MrGridXml.ReadGridXmls(xml, district ?? "禅城")
                : MrGridXml.ReadGridXmlsWithCompete(xml, district ?? "禅城", competeDescription);
            foreach (var item in list)
            {
                _mrGridRepository.Insert(item.MapTo<MrGrid>());
            }
            _mrGridRepository.SaveChanges();
        }

        public async Task<int> UploadWebBrowsings(StreamReader reader)
        {
            var csvs = CsvContext.Read<WebBrowsingCsv>(reader);
            return await _browsingRepository.UpdateMany<IWebBrowsingRepository, WebBrowsing, WebBrowsingCsv>(csvs);
        }

        public async Task<int> UploadStreamings(StreamReader reader)
        {
            var csvs = CsvContext.Read<AppStreamingCsv>(reader);
            return await _streamRepository.UpdateMany<IAppStreamRepository, AppSteam, AppStreamingCsv>(csvs);
        }

        public IEnumerable<AgisDtPoint> QueryAgisDtPoints(DateTime begin, DateTime end)
        {
            var points = _agisRepository.GetAllList(x => x.StatDate > begin && x.StatDate <= end);
            return points;
        }

        public IEnumerable<AgisDtPoint> QueryAgisDtPoints(DateTime begin, DateTime end, string topic)
        {
            var points = _agisRepository.GetAllList(x => x.StatDate > begin && x.StatDate <= end && x.Operator == topic);
            return points;
        }

        public IEnumerable<MrCoverageGridView> QueryCoverageGridViews(DateTime initialDate, string district)
        {
            var stats =
                _mrGridRepository.QueryDate(initialDate, (repository, beginDate, endDate) => repository.GetAllList(
                    x =>
                        x.StatDate >= beginDate && x.StatDate < endDate && x.District == district &&
                        x.Compete == AlarmCategory.Self)).ToList();
            return stats.MapTo<IEnumerable<MrCoverageGridView>>();
        }

        public IEnumerable<MrCompeteGridView> QueryCompeteGridViews(DateTime initialDate, string district,
            string competeDescription)
        {
            var competeTuple =
                WirelessConstants.EnumDictionary["AlarmCategory"].FirstOrDefault(x => x.Item2 == competeDescription);
            var compete = (AlarmCategory?)competeTuple?.Item1;

            var stats =
                _mrGridRepository.QueryDate(initialDate, (repository, beginDate, endDate) => repository.GetAllList(
                    x =>
                        x.StatDate >= beginDate && x.StatDate < endDate && x.District == district &&
                        x.Frequency == -1 && x.Compete == compete)).ToList();
            return stats.MapTo<IEnumerable<MrCompeteGridView>>();
        }
    }
}
