using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.MySqlFramework.Abstract;

namespace Lte.Evaluations.DataService.Mr
{
    public class PreciseWorkItemService
    {
        private readonly IPreciseWorkItemCellRepository _repository;

        public PreciseWorkItemService(IPreciseWorkItemCellRepository repository)
        {
            _repository = repository;
        }
    }
}
