using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Dump
{
    public class LteProblemService
    {
        private readonly ILteProblemRepository _repository;

        public LteProblemService(ILteProblemRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<LteProblem> QueryProblems(string type)
        {
            return _repository.GetAllList(x => x.Type == type);
        }

        public IEnumerable<LteProblem> QueryRandomProblems(string type, int count)
        {
            var list = _repository.GetAllList(x => x.Type == type);
            if (count >= list.Count) return list;
            var selected = 0;
            var results = new List<LteProblem>();
            while (selected < count)
            {
                var random = new Random();
                var r = random.Next(list.Count);
                var result = list[r];
                if (results.Contains(result)) continue;
                results.Add(result);
                selected++;
            }
            return results;
        }
    }
}
