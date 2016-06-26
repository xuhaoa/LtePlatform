using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract;

namespace Lte.Evaluations.DataService.College
{
    public class VipDemandRepository
    {
        private readonly IVipDemandRepository _repository;
        private readonly ITownRepository _townRepository;

        public VipDemandRepository(IVipDemandRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }
    }
}
