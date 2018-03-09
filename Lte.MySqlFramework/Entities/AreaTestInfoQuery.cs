using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.MySqlFramework.Abstract;

namespace Lte.MySqlFramework.Entities
{
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
}