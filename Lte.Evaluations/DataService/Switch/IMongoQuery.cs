using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Evaluations.ViewModels.Switch;
using Lte.Parameters.Abstract.Switch;
using Lte.Parameters.Entities.Switch;

namespace Lte.Evaluations.DataService.Switch
{
    public interface IMongoQuery<out T>
    {
        T Query();
    }

    public interface IDateSpanQuery<out T>
    {
        T Query(DateTime begin, DateTime end);
    }

    public abstract class HuaweiENodebQuery<TStat, TView, TRepository> : IMongoQuery<TView>
        where TRepository: IRecent<TStat>
        where TView: class 
    {
        protected readonly TRepository _repository;
        protected readonly int _eNodebId;

        protected HuaweiENodebQuery(TRepository repository, int eNodebId)
        {
            _repository = repository;
            _eNodebId = eNodebId;
        }

        public TView Query()
        {
            var huaweiPara = _repository.GetRecent(_eNodebId);
            return huaweiPara == null ? null : Mapper.Map<TStat, TView>(huaweiPara);
        }
    }
}
