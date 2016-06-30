using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Abp.EntityFramework.Repositories;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Parameters.Abstract;

namespace Lte.Evaluations.DataService.College
{
    public static class CustomerQueries
    {
        public static int DumpItem<TRepository, TEntity, TItem>(this TRepository repository, TItem dto, 
            ITownRepository townRepository)
            where TRepository : IRepository<TEntity>, IMatchRepository<TEntity, TItem>, ISaveChanges
            where TEntity : Entity
            where TItem : IDistrictTown
        {
            dto.TownId =
                townRepository.QueryTown(dto.District, dto.Town)?.Id ?? 1;
            return
                repository
                    .ImportOne<TRepository, TEntity, TItem>(dto);
        }

        public static List<TDto> Query<TRepository, TEntity, TDto>(this TRepository repository,
            ITownRepository townRepository, DateTime begin, DateTime end)
            where TRepository : IDateSpanQuery<TEntity>
            where TDto : IDistrictTown
        {
            var results = Mapper.Map<List<TEntity>, List<TDto>>(repository.GetAllList(begin, end));
            results.ForEach(x =>
            {
                if (x.TownId == 0)
                {
                    x.District = "未知";
                    x.Town = "未知";
                }
                else
                {
                    var town = townRepository.Get(x.TownId);
                    if (town != null)
                    {
                        x.District = town.DistrictName;
                        x.Town = town.TownName;
                    }
                }
            });
            return results;
        }

        public static List<TDto> Query<TRepository, TEntity, TDto>(this TRepository repository,
            ITownRepository townRepository, string district, string town, DateTime begin, DateTime end)
            where TRepository : IDateSpanQuery<TEntity>
            where TDto : IDistrictTown
        {
            var townId = townRepository.QueryTown(district, town)?.Id ?? 1;
            var results = Mapper.Map<List<TEntity>, List<TDto>>(repository.GetAllList(townId, begin, end));
            results.ForEach(x =>
            {
                x.District = district;
                x.Town = town;
            });
            return results;
        }
    }

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
            return
                _repository
                    .DumpItem<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(
                        dto, _townRepository);
        }

        public List<EmergencyCommunicationDto> Query(DateTime begin, DateTime end)
        {
            return
                _repository.Query<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(
                    _townRepository, begin, end);
        }

        public List<EmergencyCommunicationDto> Query(string district, string town, DateTime begin, DateTime end)
        {
            return
                _repository.Query<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(
                    _townRepository, district, town, begin, end);
        }
    }

    public class VipDemandService
    {
        private readonly IVipDemandRepository _repository;
        private readonly ITownRepository _townRepository;

        public VipDemandService(IVipDemandRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }

        public int Dump(VipDemandDto dto)
        {
            return
                _repository
                    .DumpItem<IVipDemandRepository, VipDemand, VipDemandDto>(dto, _townRepository);
        }

        public List<VipDemandDto> Query(DateTime begin, DateTime end)
        {
            return _repository.Query<IVipDemandRepository, VipDemand, VipDemandDto>(_townRepository, begin, end);
        }

        public List<VipDemandDto> Query(string district, string town, DateTime begin, DateTime end)
        {
            return _repository.Query<IVipDemandRepository, VipDemand, VipDemandDto>(_townRepository, district, town,
                begin, end);
        }

        public async Task<int> UpdateAsync(VipDemandDto dto)
        {
            dto.TownId =
                _townRepository.QueryTown(dto.District, dto.Town)?.Id ?? 1;
            return await _repository.UpdateOne<IVipDemandRepository, VipDemand, VipDemandDto>(dto);
        }

        public VipDemandDto QuerySingle(string serialNumber)
        {
            return Mapper.Map<VipDemand, VipDemandDto>(_repository.FirstOrDefault(x => x.SerialNumber == serialNumber));
        }
    }
}
