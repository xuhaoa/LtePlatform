using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
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

        public IEnumerable<College4GTestView> GetViews(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(x => x.TestTime >= begin && x.TestTime < end);
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

        public IEnumerable<College4GTestView> GetResult(DateTime begin, DateTime end, string name)
        {
            var college = _collegeRepository.GetByName(name);
            if (college == null) return new List<College4GTestView>();

            var result =
                _repository.GetAllList(x => x.TestTime >= begin && x.TestTime < end && x.CollegeId == college.Id);
            var views = result.MapTo<IEnumerable<College4GTestView>>().Select(x =>
            {
                var eNodeb = _eNodebRepository.GetByENodebId(x.ENodebId);
                var cell = eNodeb == null
                    ? null
                    : _cellRepository.GetBySectorId(x.ENodebId, x.SectorId);
                var view = x.MapTo<College4GTestView>();
                view.CollegeName = name;
                view.CellName = eNodeb?.Name + "-" + x.SectorId;
                view.Pci = cell?.Pci ?? -1;
                return view;
            });
            return views;
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

        public async Task<int> Post(College4GTestView view)
        {
            var college = _collegeRepository.GetByName(view.CollegeName);
            if (college == null) return 0;
            view.TestTime = DateTime.Today.AddHours(DateTime.Now.Hour);
            var result =
                _repository.FirstOrDefault(
                    x => x.TestTime == view.TestTime && x.CollegeId == college.Id && x.Place == view.Place);
            if (result != null) Mapper.Map(view, result);
            result = view.MapTo<College4GTestResults>();
            result.CollegeId = college.Id;
            var fields = view.CellName.GetSplittedFields('-');
            if (fields.Length > 1)
            {
                var eNodeb = _eNodebRepository.GetByName(fields[0]);
                if (eNodeb != null)
                {
                    result.ENodebId = eNodeb.ENodebId;
                    result.SectorId = fields[1].ConvertToByte(0);
                }
            }
            await _repository.InsertOrUpdateAsync(result);
            return _repository.SaveChanges();
        }
    }
}
