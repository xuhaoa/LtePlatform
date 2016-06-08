using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Abstract;

namespace Lte.Evaluations.DataService.Mr
{
    public class PreciseWorkItemService
    {
        private readonly IPreciseWorkItemCellRepository _repository;
        private readonly ICellPowerService _powerService;

        public PreciseWorkItemService(IPreciseWorkItemCellRepository repository, ICellPowerService powerService)
        {
            _repository = repository;
            _powerService = powerService;
        }
    }
}
