﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Evaluations.MapperSerive;
using Lte.Parameters.Abstract;
using Lte.Parameters.Entities;

namespace Lte.Evaluations.DataService.Dump
{
    public class ENodebDumpService
    {
        private readonly IENodebRepository _eNodebRepository;
        private readonly ITownRepository _townRepository;

        public ENodebDumpService(IENodebRepository eNodebRepository, ITownRepository townRepository)
        {
            _eNodebRepository = eNodebRepository;
            _townRepository = townRepository;
        }

        public void DumpNewEnodebExcels(IEnumerable<ENodebExcel> infos)
        {
            var containers = from info in infos
                join town in _townRepository.GetAllList()
                    on new {info.CityName, info.DistrictName, info.TownName} equals
                    new {town.CityName, town.DistrictName, town.TownName}
                select new ENodebExcelWithTownIdContainer
                {
                    ENodebExcel = info,
                    TownId = town.Id
                };

            if (!containers.Any()) return;
            var items =
                Mapper.Map<IEnumerable<ENodebExcelWithTownIdContainer>, List<ENodebWithTownIdContainer>>(containers);
            items.ForEach(x => { x.ENodeb.TownId = x.TownId; });

            items.Select(x => x.ENodeb).ToList().ForEach(x => _eNodebRepository.InsertAsync(x));
        }
    }
}
