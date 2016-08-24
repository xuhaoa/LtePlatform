using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;

namespace Lte.Evaluations.DataService.College
{
    public class College3GTestService
    {
        private readonly ICollege3GTestRepository _repository;
        private readonly ICollegeRepository _collegeRepository;

        public College3GTestService(ICollege3GTestRepository repository, ICollegeRepository collegeRepository)
        {
            _repository = repository;
            _collegeRepository = collegeRepository;
        }

        public IEnumerable<College3GTestView> GetViews(DateTime begin, DateTime end, string name)
        {
            var college = _collegeRepository.GetByName(name);
            if (college == null) return new List<College3GTestView>();
            var results =
                _repository.GetAllList(x => x.TestTime >= begin && x.TestTime < end).MapTo<List<College3GTestView>>();
            results.ForEach(x=>x.CollegeName=name);
            return results;
        }
        
        public Dictionary<string, double> GetAverageRates(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new {c.Name, Rate = r.DownloadRate };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rate));
        }

        public Dictionary<string, double> GetAverageUsers(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                select new {c.Name, Users = (double) r.AccessUsers};
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Users));
        }

        public Dictionary<string, double> GetAverageMinRssi(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rssi = r.MinRssi };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rssi));
        }

        public Dictionary<string, double> GetAverageMaxRssi(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rssi = r.MaxRssi };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rssi));
        }

        public Dictionary<string, double> GetAverageVswr(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, r.Vswr };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Vswr));
        }

        public async Task<int> Post(College3GTestView view)
        {
            var college = _collegeRepository.GetByName(view.CollegeName);
            if (college == null) return 0;
            view.TestTime = DateTime.Today.AddHours(DateTime.Now.Hour);
            var result =
                _repository.FirstOrDefault(
                    x => x.TestTime == view.TestTime && x.CollegeId == college.Id && x.Place == view.Place);
            if (result != null) Mapper.Map(view, result);
            result = view.MapTo<College3GTestResults>();
            result.CollegeId = college.Id;
            await _repository.InsertOrUpdateAsync(result);
            return _repository.SaveChanges();
        }
    }

    public class College4GTestService
    {
        private readonly ICollege4GTestRepository _repository;
        private readonly ICollegeRepository _collegeRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ICellRepository _cellRepository;

        public College4GTestService(ICollege4GTestRepository repository,
            ICollegeRepository collegeRepository, IENodebRepository eNodebRepository, ICellRepository cellRepository)
        {
            _repository = repository;
            _collegeRepository = collegeRepository;
            _eNodebRepository = eNodebRepository;
            _cellRepository = cellRepository;
        }

        public IEnumerable<College4GTestView> GetViews(DateTime date, int hour)
        {
            var statTime = date.AddHours(hour);
            var results = _repository.GetAllList().Where(x => x.TestTime == statTime).ToList();
            if (!results.Any()) return new List<College4GTestView>();
            return results.Select(x =>
            {
                var college = _collegeRepository.Get(x.CollegeId);
                var eNodeb = _eNodebRepository.GetByENodebId(x.ENodebId);
                var cell = eNodeb == null
                    ? null
                    : _cellRepository.GetBySectorId(x.ENodebId, x.SectorId);
                var view = x.MapTo<College4GTestView>();
                view.CollegeName = college?.Name;
                view.CellName = eNodeb?.Name + "-" + x.SectorId;
                view.Pci = cell?.Pci ?? -1;
                return view;
            });
        }

        public College4GTestResults GetResult(DateTime date, int hour, string name, string eNodebName, byte sectorId)
        {
            var college = _collegeRepository.GetByName(name);
            if (college == null) return null;
            var eNodeb = _eNodebRepository.GetByName(eNodebName);
            if (eNodeb == null) return null;
            var time = date.AddHours(hour);
            var result = _repository.GetByCollegeIdAndTime(college.Id, time);
            if (result == null)
                return new College4GTestResults
                {
                    TestTime = date.AddHours(hour),
                    CollegeId = college.Id,
                    ENodebId = eNodeb.ENodebId,
                    AccessUsers = 20,
                    DownloadRate = 8000,
                    UploadRate = 3000,
                    SectorId = sectorId,
                    Rsrp = -90,
                    Sinr = 14
                };
            result.ENodebId = eNodeb.ENodebId;
            result.SectorId = sectorId;
            return result;
        }

        public Dictionary<string, double> GetAverageRates(DateTime begin, DateTime end, byte upload)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rate = (upload == 0) ? r.DownloadRate : r.UploadRate };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rate));
        }

        public Dictionary<string, double> GetAverageUsers(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Users = (double)r.AccessUsers };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Users));
        }

        public Dictionary<string, double> GetAverageRsrp(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, r.Rsrp };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rsrp));
        }

        public Dictionary<string, double> GetAverageSinr(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, r.Sinr };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Sinr));
        }

        public async Task<int> Post(College4GTestResults result)
        {
            await _repository.InsertOrUpdateAsync(result);
            return _repository.SaveChanges();
        }

        public async Task<int> Delete(College4GTestResults result)
        {
            await _repository.DeleteAsync(result);
            return _repository.SaveChanges();
        }

        public College4GTestResults GetRecordResult(DateTime time, string name)
        {
            var college = _collegeRepository.GetByName(name);
            return college == null ? null : _repository.GetByCollegeIdAndTime(college.Id, time);
        }
    }
}
