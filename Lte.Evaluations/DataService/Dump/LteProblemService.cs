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
    }
}
