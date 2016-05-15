﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.ViewModels.Mr;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract;
using Lte.Parameters.Entities.Mr;

namespace Lte.Evaluations.DataService.Mr
{
    public class CellStasticService
    {
        private readonly ICellStasticRepository _repository;
        private readonly ICellStatMysqlRepository _statRepository;

        public CellStasticService(ICellStasticRepository repository, ICellStatMysqlRepository statRepository)
        {
            _repository = repository;
            _statRepository = statRepository;
        }

        public CellStasticView QueryDateSpanAverageStat(int eNodebId, short pci, DateTime begin, DateTime end)
        {
            var dateSpanStats = QueryDateSpanStatList(eNodebId, pci, begin, end);
            return dateSpanStats.Any() ? new CellStasticView(dateSpanStats) : null;
        }

        public List<ICellStastic> QueryDateSpanStatList(int eNodebId, short pci, DateTime begin, DateTime end)
        {
            var dateSpanStats = new List<ICellStastic>();
            while (begin < end)
            {
                var oneDayMysqlStat = _statRepository.Get(eNodebId, pci, begin);
                var oneDayStats = _repository.GetList(eNodebId, pci, begin);
                if (oneDayStats.Any())
                    dateSpanStats.Add(new CellStastic
                    {
                        Mod3Count = oneDayStats.Sum(x => x.Mod3Count),
                        Mod6Count = oneDayStats.Sum(x => x.Mod6Count),
                        MrCount = oneDayStats.Sum(x => x.MrCount),
                        OverCoverCount = oneDayStats.Sum(x => x.OverCoverCount),
                        PreciseCount = oneDayStats.Sum(x => x.PreciseCount),
                        WeakCoverCount = oneDayStats.Sum(x => x.WeakCoverCount)
                    });
                begin = begin.AddDays(1);
            }
            return dateSpanStats;
        }
    }
}
