using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Basic
{
    public class BandCellService
    {
        private readonly ICellRepository _repository;

        public BandCellService(ICellRepository repository)
        {
            _repository = repository;
        }

        public List<Cell> GetHuaweiCellsByBandType(FrequencyBandType frequency)
        {
            switch (frequency)
            {
                case FrequencyBandType.Band2100:
                    return
                        _repository.GetAllList(
                            x =>
                                x.BandClass == 1 && 
                                ((x.ENodebId >= 499712 && x.ENodebId < 501248) || (x.ENodebId >= 552448 &&
                                x.ENodebId < 552960) || (x.ENodebId >= 870144 && x.ENodebId < 870460)));
                case FrequencyBandType.Band1800:
                    return _repository.GetAllList(
                            x =>
                                x.BandClass == 3 &&
                                ((x.ENodebId >= 499712 && x.ENodebId < 501248) || (x.ENodebId >= 552448 &&
                                x.ENodebId < 552960) || (x.ENodebId >= 870144 && x.ENodebId < 870460)));
                default:
                    return _repository.GetAllList(
                            x =>
                                x.BandClass == 5 &&
                                ((x.ENodebId >= 499712 && x.ENodebId < 501248) || (x.ENodebId >= 552448 &&
                                x.ENodebId < 552960) || (x.ENodebId >= 870144 && x.ENodebId < 870460)));
            }
        }
        
    }
}
