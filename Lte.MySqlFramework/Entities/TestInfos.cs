using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Abstract;

namespace Lte.MySqlFramework.Entities
{
    public class CollegeInfo : AuditedEntity
    {
        public int TownId { get; set; }

        public string Name { get; set; }

        public CollegeRegion CollegeRegion { get; set; }

    }

    public class CollegeRegion
    {
        [Key]
        public int AreaId { get; set; }

        public double Area { get; set; }

        public RegionType RegionType { get; set; }

        public string Info { get; set; }

        public RectangleRange RectangleRange
        {
            get
            {
                var coordinates = Info.Split(';');
                switch (RegionType)
                {
                    case RegionType.Circle:
                        return new RectangleRange
                        {
                            West = coordinates[0].ConvertToDouble(112) - coordinates[2].ConvertToDouble(0.01),
                            East = coordinates[0].ConvertToDouble(112) + coordinates[2].ConvertToDouble(0.01),
                            South = coordinates[1].ConvertToDouble(23) - coordinates[2].ConvertToDouble(0.01),
                            North = coordinates[1].ConvertToDouble(23) - coordinates[2].ConvertToDouble(0.01)
                        };
                    case RegionType.Rectangle:
                        return new RectangleRange
                        {
                            West = coordinates[0].ConvertToDouble(112),
                            East = coordinates[2].ConvertToDouble(112.01),
                            South = coordinates[1].ConvertToDouble(23),
                            North = coordinates[3].ConvertToDouble(23.01)
                        };
                    default:
                        var xcoors = new List<double>();
                        var ycoors = new List<double>();
                        for (var i = 0; i < coordinates.Length; i += 2)
                        {
                            xcoors.Add(coordinates[i].ConvertToDouble(112));
                            ycoors.Add(coordinates[i + 1].ConvertToDouble(23));
                        }
                        return new RectangleRange
                        {
                            West = xcoors.Min() - 0.005,
                            East = xcoors.Max() + 0.005,
                            South = ycoors.Min() - 0.005,
                            North = ycoors.Max() + 0.005
                        };
                }
            }
        }
    }

    [AutoMapFrom(typeof(College3GTestView))]
    public class College3GTestResults : Entity
    {
        public int CollegeId { get; set; }

        public DateTime TestTime { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        public double DownloadRate { get; set; }

        public int AccessUsers { get; set; }

        public double MinRssi { get; set; }

        public double MaxRssi { get; set; }

        public double Vswr { get; set; }
    }

    [TypeDoc("校园网4G测试结果")]
    [AutoMapFrom(typeof(College4GTestView))]
    public class College4GTestResults : Entity
    {
        [MemberDoc("校园编号")]
        public int CollegeId { get; set; }

        [MemberDoc("测试时间")]
        public DateTime TestTime { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        [MemberDoc("下载速率")]
        public double DownloadRate { get; set; }

        [MemberDoc("上传速率")]
        public double UploadRate { get; set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("接入用户数")]
        public int AccessUsers { get; set; }

        [MemberDoc("RSRP")]
        public double Rsrp { get; set; }

        [MemberDoc("SINR")]
        public double Sinr { get; set; }
    }

    public class CollegeKpi : AuditedEntity
    {
        public int CollegeId { get; set; }

        public DateTime TestTime { get; set; }

        public int OnlineUsers { get; set; }

        public double DownloadFlow { get; set; }

        public double UploadFlow { get; set; }

        public double RrcConnection { get; set; }

        public double ErabConnection { get; set; }

        public double ErabDrop { get; set; }

        public double Connection2G { get; set; }

        public double Connection3G { get; set; }

        public double Erlang3G { get; set; }

        public double Drop3G { get; set; }

        public double Flow3G { get; set; }
    }

    [AutoMapFrom(typeof(CollegeKpi))]
    public class CollegeKpiView
    {
        public DateTime TestTime { get; set; }

        public string CollegeName { get; set; }

        public int OnlineUsers { get; set; }

        public double DownloadFlow { get; set; }

        public double UploadFlow { get; set; }

        public double RrcConnection { get; set; }

        public double ErabConnection { get; set; }

        public double ErabDrop { get; set; }

        public double Connection2G { get; set; }

        public double Connection3G { get; set; }

        public double Erlang3G { get; set; }

        public double Drop3G { get; set; }

        public double Flow3G { get; set; }
    }

    [AutoMapFrom(typeof(College3GTestResults))]
    public class College3GTestView
    {
        public DateTime TestTime { get; set; }

        public string CollegeName { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        public double DownloadRate { get; set; }

        public int AccessUsers { get; set; }

        public double MinRssi { get; set; }

        public double MaxRssi { get; set; }

        public double Vswr { get; set; }
    }

    [AutoMapFrom(typeof(College4GTestResults))]
    [TypeDoc("记录校园网4G测试记录视图的类")]
    public class College4GTestView
    {
        [MemberDoc("测试时间")]
        public DateTime TestTime { get; set; }

        [MemberDoc("校园名称")]
        public string CollegeName { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        [MemberDoc("小区名称")]
        public string CellName { get; set; }

        [MemberDoc("小区PCI")]
        public short Pci { get; set; }

        [MemberDoc("下载速率（kByte/s）")]
        public double DownloadRate { get; set; }

        [MemberDoc("上传速率（kByte/s）")]
        public double UploadRate { get; set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("接入用户数")]
        public int AccessUsers { get; set; }

        [MemberDoc("RSRP")]
        public double Rsrp { get; set; }

        [MemberDoc("SINR")]
        public double Sinr { get; set; }
    }

    public class CollegeYearInfo : Entity
    {
        public int CollegeId { get; set; }

        public int Year { get; set; }

        public int TotalStudents { get; set; }

        public int CurrentSubscribers { get; set; }

        public int GraduateStudents { get; set; }

        public int NewSubscribers { get; set; }

        public DateTime OldOpenDate { get; set; }

        public DateTime NewOpenDate { get; set; }

        public int ExpectedSubscribers => CurrentSubscribers + NewSubscribers - GraduateStudents;
    }

    [AutoMapFrom(typeof(CollegeYearInfo))]
    public class CollegeYearView
    {
        public string Name { get; set; }

        public int TotalStudents { get; set; }

        public int CurrentSubscribers { get; set; }

        public int GraduateStudents { get; set; }

        public int NewSubscribers { get; set; }

        public DateTime OldOpenDate { get; set; }

        public DateTime NewOpenDate { get; set; }

        public int ExpectedSubscribers { get; set; }
    }

    public class TownBoundary : Entity, ITownId
    {
        public int TownId { get; set; }

        public string AreaName { get; set; }

        public string Boundary { get; set; }
    }

    public class AreaTestInfo : Entity, ITownId
    {
        public int FileId { get; set; }

        public double Distance { get; set; }

        public int Count { get; set; }

        public int CoverageCount { get; set; }

        public double CoverageRate => Count == 0 ? 0 : 100 * (double)CoverageCount / Count;

        public int TownId { get; set; }
    }

    [AutoMapFrom(typeof(AreaTestInfo))]
    public class AreaTestFileView
    {
        public DateTime TestDate { get; set; }

        public string CsvFileName { get; set; }

        public double Distance { get; set; }

        public int Count { get; set; }

        public int CoverageCount { get; set; }

        public double CoverageRate => Count == 0 ? 0 : 100 * (double)CoverageCount / Count;

        public string AreaName { get; set; }
    }

    public abstract class AreaTestInfoQuery
    {
        private int _currentTownId;
        private double _lastLon;
        private double _lastLat;
        private readonly ITownBoundaryRepository _boundaryRepository;

        protected AreaTestInfoQuery(ITownBoundaryRepository boundaryRepository)
        {
            _currentTownId = -1;
            _lastLon = -1.0;
            _lastLat = -1.0;
            _boundaryRepository = boundaryRepository;
        }

        protected void UpdateCurrentTownId(List<AreaTestInfo> results, int townId, GeoPoint point, int fileId,
            bool isCoverage)
        {
            var distance = 0.0;
            if (townId == _currentTownId)
            {
                if (_lastLon > 0 && _lastLat > 0)
                {
                    distance = point.Distance(new GeoPoint(_lastLon, _lastLat));
                }
                _lastLon = point.Longtitute;
                _lastLat = point.Lattitute;
            }
            else
            {
                _currentTownId = townId;
                _lastLon = -1.0;
                _lastLat = -1.0;
            }
            var item = results.FirstOrDefault(x => x.TownId == townId);
            if (item == null)
            {
                results.Add(new AreaTestInfo
                {
                    FileId = fileId,
                    TownId = townId,
                    Distance = distance,
                    Count = 1,
                    CoverageCount = isCoverage ? 1 : 0
                });
            }
            else
            {
                item.Distance += distance;
                item.Count++;
                if (isCoverage) item.CoverageCount++;
            }
        }

        protected void UpdateTownRecords<TRecord>(List<int> townIds, int fileId, IEnumerable<TRecord> data, List<AreaTestInfo> results)
            where TRecord : IGeoPoint<double?>, ICoverage
        {
            foreach (var record in data)
            {
                if (record.Longtitute == null || record.Lattitute == null)
                    continue;
                var point = new GeoPoint(record.Longtitute ?? 0, record.Lattitute ?? 0);
                foreach (var townId in townIds)
                {
                    var coors = _boundaryRepository.GetAllList(x => x.TownId == townId);
                    if (coors == null) continue;
                    if (!coors.IsInTownRange(point)) continue;
                    UpdateCurrentTownId(results, townId, point, fileId, record.IsCoverage());
                    break;
                }
            }
        }

        protected void UpdateRoadRecords<TRecord>(List<int> townIds, int fileId, IEnumerable<TRecord> data, List<AreaTestInfo> results)
            where TRecord : IGeoPoint<double?>, ICoverage
        {
            foreach (var record in data)
            {
                if (record.Longtitute == null || record.Lattitute == null)
                    continue;
                var point = new GeoPoint(record.Longtitute ?? 0, record.Lattitute ?? 0);
                foreach (var townId in townIds)
                {
                    var coors = _boundaryRepository.FirstOrDefault(x => x.TownId == townId);
                    if (coors == null) continue;
                    if (!coors.IsInTownRange(point)) continue;
                    UpdateCurrentTownId(results, townId, point, fileId, record.IsCoverage());
                    break;
                }
            }
        }

        public abstract List<AreaTestInfo> QueryAreaTestInfos(List<int> townIds, string csvFileName, int fileId);

        public abstract List<AreaTestInfo> QueryRoadTestInfos(List<int> townIds, string csvFileName, int fileId);
    }

    public class TownBoundaryView
    {
        public string Town { get; set; }

        public List<GeoPoint> BoundaryGeoPoints { get; set; }
    }

    public class RasterInfo : Entity, IGeoPoint<double>
    {
        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string Area { get; set; }
    }

    public class RasterTestInfo : Entity
    {
        public int RasterNum { get; set; }
        
        public string CsvFilesName { get; set; }
        
        public string NetworkType { get; set; }
    }

    public class RasterFileDtInfo : Entity
    {
        public int FileId { get; set; }

        public int RasterNum { get; set; }

        public int Count { get; set; }

        public int CoverageCount { get; set; }

        public double CoverageRate => Count == 0 ? 0 : 100 * (double)CoverageCount / Count;
    }

    public class CsvFilesInfo : Entity
    {
        public DateTime TestDate { get; set; }
        
        public string CsvFileName { get; set; }
        
        public double Distance { get; set; }

        public int Count { get; set; }

        public int CoverageCount { get; set; }

        public double CoverageRate => Count == 0 ? 0 : 100 * (double)CoverageCount / Count;
    }

    [TypeDoc("测试数据文件网格视图，一个测试数据文件包含的若干个网格")]
    public class FileRasterInfoView
    {
        [MemberDoc("测试数据文件名")]
        [Required]
        public string CsvFileName { get; set; }

        [MemberDoc("包含的网格编号列表")]
        public IEnumerable<int> RasterNums { get; set; }
    }

}
