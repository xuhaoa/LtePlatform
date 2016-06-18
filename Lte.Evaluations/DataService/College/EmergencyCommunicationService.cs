using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Abp.EntityFramework.Repositories;
using AutoMapper;
using Lte.Parameters.Abstract;

namespace Lte.Evaluations.DataService.College
{
    public class EmergencyCommunicationService
    {
        private readonly IEmergencyCommunicationRepository _repository;
        private readonly ITownRepository _townRepository;

        public EmergencyCommunicationService(IEmergencyCommunicationRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }

        public int Dump(EmergencyCommunicationDto dto)
        {
            dto.TownId =
                _townRepository.QueryTown(dto.District, dto.Town)?.Id ?? 1;
            return
                _repository
                    .ImportOne<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(dto);
        }

        public List<EmergencyCommunicationDto> Query(DateTime begin, DateTime end)
        {
            var results = Mapper.Map<List<EmergencyCommunicationDto>>(_repository.GetAllList(begin, end));
            results.ForEach(x =>
            {
                var town = _townRepository.Get(x.TownId);
                if (town != null)
                {
                    x.District = town.DistrictName;
                    x.Town = town.TownName;
                }
            });
            return results;
        }

        public List<EmergencyCommunicationDto> Query(string district, string town, DateTime begin, DateTime end)
        {
            var townId = _townRepository.QueryTown(district, town)?.Id ?? 1;
            var results = Mapper.Map<List<EmergencyCommunicationDto>>(_repository.GetAllList(townId, begin, end));
            results.ForEach(x =>
            {
                x.District = district;
                x.Town = town;
            });
            return results;
        }
    }
}
