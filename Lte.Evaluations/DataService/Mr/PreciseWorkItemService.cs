using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;

namespace Lte.Evaluations.DataService.Mr
{
    public class PreciseWorkItemService
    {
        private readonly IPreciseWorkItemCellRepository _repository;
        private readonly ICellPowerService _powerService;
        private readonly ICellRepository _cellRepository;

        public PreciseWorkItemService(IPreciseWorkItemCellRepository repository, ICellPowerService powerService,
            ICellRepository cellRepository)
        {
            _repository = repository;
            _powerService = powerService;
            _cellRepository = cellRepository;
        }

        public async Task Update<TLteCellId>(IPreciseWorkItemDto<TLteCellId> container)
            where TLteCellId : class, ILteCellQuery, new()
        {
            foreach (var neighbor in container.Items)
            {
                var item = _repository.Get(container.WorkItemNumber, neighbor.ENodebId, neighbor.SectorId);
                if (item == null)
                {
                    item = neighbor.MapTo<PreciseWorkItemCell>();
                    var cell = _cellRepository.GetBySectorId(neighbor.ENodebId, neighbor.SectorId);
                    if (cell != null) item.OriginalDownTilt = cell.MTilt + cell.ETilt;
                    var power = _powerService.Query(neighbor.ENodebId, neighbor.SectorId);
                    if (power != null) item.OriginalRsPower = power.RsPower;
                    await _repository.InsertAsync(item);
                }
                else
                {
                    neighbor.CloneProperties(item);
                    await _repository.UpdateAsync(item);
                }
                _repository.SaveChanges();
            }
        }
    }
}
