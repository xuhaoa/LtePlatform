using System.Collections.Generic;
using System.Linq;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities.College;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeStatService
    {
        private readonly ICollegeRepository _repository;
        private readonly IInfrastructureRepository _infrastructureRepository;
        private readonly ICollegeYearRepository _yearRepository;

        public CollegeStatService(ICollegeRepository repository, IInfrastructureRepository infrastructureRepository,
            ICollegeYearRepository yearRepository)
        {
            _repository = repository;
            _infrastructureRepository = infrastructureRepository;
            _yearRepository = yearRepository;
        }

        public CollegeStat QueryStat(int id, int year)
        {
            var info = _repository.Get(id);
            return info == null
                ? null
                : new CollegeStat(_repository, info, _yearRepository.GetByCollegeAndYear(id, year),
                    _infrastructureRepository);
        }

        public IEnumerable<CollegeStat> QueryStats(int year)
        {
            var infos = _repository.GetAllList();
            return !infos.Any()
                ? new List<CollegeStat>()
                : (infos.Select(
                    x =>
                        new CollegeStat(_repository, x, _yearRepository.GetByCollegeAndYear(x.Id, year),
                            _infrastructureRepository))).Where(x=>x.ExpectedSubscribers > 0);
        }

        public IEnumerable<string> QueryNames()
        {
            return _repository.GetAllList().Select(x => x.Name).Distinct();
        }

        public IEnumerable<string> QueryNames(int year)
        {
            var infos = _repository.GetAllList();
            var query =
                infos.Select(x => new {x.Name, YearInfo = _yearRepository.GetByCollegeAndYear(x.Id, year)})
                    .Where(x => x.YearInfo != null);
            return query.Select(x => x.Name).Distinct();
        }
    }
}
