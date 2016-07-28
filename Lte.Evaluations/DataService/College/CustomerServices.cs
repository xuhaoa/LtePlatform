﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFramework.AutoMapper;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Abp.EntityFramework.Repositories;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Parameters.Abstract;

namespace Lte.Evaluations.DataService.College
{
    public static class CustomerQueries
    {
        public static int DumpItem<TRepository, TEntity, TItem>(this TRepository repository, TItem dto, 
            ITownRepository townRepository)
            where TRepository : IRepository<TEntity>, IMatchRepository<TEntity, TItem>, ISaveChanges
            where TEntity : Entity
            where TItem : IDistrictTown, ITownId
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
            where TDto : IDistrictTown, ITownId
        {
            var results = Mapper.Map<List<TEntity>, List<TDto>>(repository.GetAllList(begin, end));
            results.ForEach(x =>
            {
                UpdateTown(townRepository, x);
            });
            return results;
        }

        public static TDto Query<TRepository, TEntity, TDto>(this TRepository repository,
            ITownRepository townRepository, int id)
            where TRepository : IRepository<TEntity>
            where TEntity: Entity
            where TDto : IDistrictTown, ITownId
        {
            var result = Mapper.Map<TEntity, TDto>(repository.Get(id));
            UpdateTown(townRepository, result);
            return result;
        }

        private static void UpdateTown<TDto>(ITownRepository townRepository, TDto x) 
            where TDto : IDistrictTown, ITownId
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

        public static Tuple<IEnumerable<string>, IEnumerable<int>> Query<TService, TItem>(this TService service, 
            DateTime date, Func<TItem, DateTime> queryDate)
            where TService : IDateSpanService<TItem>
        {
            var begin = new DateTime(date.Year, date.Month, 1);
            var start = new DateTime(date.Year, date.Month, 1);
            var end = new DateTime(date.Year, date.Month + 1, 1);
            var items = service.QueryItems(begin, end);
            var dateStrings = new List<string>();
            var counts = new List<int>();
            while (begin < end)
            {
                dateStrings.Add(begin.ToShortDateString());
                counts.Add(items.Count(x => queryDate(x) > start && queryDate(x) < begin.AddDays(1)));
                begin = begin.AddDays(1);
            }
            return new Tuple<IEnumerable<string>, IEnumerable<int>>(dateStrings, counts);
        }

        public static async Task<int> QueryCount<TService, TItem>(this TService service, DateTime today)
            where TService : IDateSpanService<TItem>
        {
            var begin = new DateTime(today.Year, today.Month, 1);
            return await service.QueryCount(begin, today.AddDays(1));
        }
    }

    public class EmergencyCommunicationService
    {
        private readonly IEmergencyCommunicationRepository _repository;
        private readonly ITownRepository _townRepository;
        private readonly IEmergencyProcessRepository _processRepository;

        public EmergencyCommunicationService(IEmergencyCommunicationRepository repository, ITownRepository townRepository,
            IEmergencyProcessRepository processRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
            _processRepository = processRepository;
        }

        public int Dump(EmergencyCommunicationDto dto)
        {
            return
                _repository
                    .DumpItem<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(
                        dto, _townRepository);
        }

        public EmergencyCommunicationDto Query(int id)
        {
            return
                _repository.Query<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(
                    _townRepository, id);
        }

        public IEnumerable<EmergencyProcessDto> QueryProcess(int id)
        {
            return
                Mapper.Map<List<EmergencyProcess>, IEnumerable<EmergencyProcessDto>>(_processRepository.GetAllList(id));
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

        public async Task<EmergencyProcessDto> ConstructProcess(EmergencyCommunicationDto dto, string userName)
        {
            return await 
                _repository
                    .ConstructProcess
                    <IEmergencyCommunicationRepository, IEmergencyProcessRepository, EmergencyCommunication,
                        EmergencyCommunicationDto, EmergencyProcess, EmergencyProcessDto>(_processRepository, dto, userName);
        }

        public async Task<int> UpdateAsync(EmergencyProcessDto dto)
        {
            return
                await
                    _processRepository.UpdateOne<IEmergencyProcessRepository, EmergencyProcess, EmergencyProcessDto>(dto);
        }
    }

    public class EmergencyFiberService
    {
        private readonly IEmergencyFiberWorkItemRepository _repository;

        public EmergencyFiberService(IEmergencyFiberWorkItemRepository repository)
        {
            _repository = repository;
        }

        public EmergencyFiberWorkItem Create(EmergencyFiberWorkItem item)
        {
            item.BeginDate = DateTime.Now;
            return _repository.ImportOne(item);
        }

        public async Task<int> Finish(EmergencyFiberWorkItem item)
        {
            var info =
                _repository.FirstOrDefault(
                    x => x.EmergencyId == item.EmergencyId && x.WorkItemNumber == item.WorkItemNumber);
            info.FinishDate = DateTime.Now;
            await _repository.UpdateAsync(info);
            return _repository.SaveChanges();
        }

        public List<EmergencyFiberWorkItem> Query(int id)
        {
            return _repository.GetAllList(id);
        }
    }

    public class VipDemandService : IDateSpanService<VipDemand>
    {
        private readonly IVipDemandRepository _repository;
        private readonly ITownRepository _townRepository;
        private readonly IVipProcessRepository _processRepository;

        public VipDemandService(IVipDemandRepository repository, ITownRepository townRepository,
            IVipProcessRepository processRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
            _processRepository = processRepository;
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

        public async Task<int> UpdateAsync(VipProcessDto dto)
        {
            return await _processRepository.UpdateOne<IVipProcessRepository, VipProcess, VipProcessDto>(dto);
        } 

        public VipDemandDto QuerySingle(string serialNumber)
        {
            var result =
                Mapper.Map<VipDemand, VipDemandDto>(_repository.FirstOrDefault(x => x.SerialNumber == serialNumber));
            var town = _townRepository.Get(result.TownId);
            if (town != null)
            {
                result.District = town.DistrictName;
                result.Town = town.TownName;
            }
            return result;
        }

        public List<VipDemand> QueryItems(DateTime begin, DateTime end)
        {
            return _repository.GetAllList(begin, end);
        }

        public async Task<int> QueryCount(DateTime begin, DateTime end)
        {
            return await _repository.CountAsync(x => x.BeginDate >= begin && x.BeginDate < end);
        }

        public async Task<VipProcessDto> ConstructProcess(VipDemandDto dto, string userName)
        {
            return await
                _repository
                    .ConstructProcess
                    <IVipDemandRepository, IVipProcessRepository, VipDemand,
                        VipDemandDto, VipProcess, VipProcessDto>(_processRepository, dto, userName);
        }

        public IEnumerable<VipProcessDto> QueryProcess(string serialNumber)
        {
            var items = _processRepository.GetAllList(serialNumber);
            return Mapper.Map<List<VipProcess>, IEnumerable<VipProcessDto>>(items);
        } 
    }

    public interface IDateSpanService<TItem>
    {
        List<TItem> QueryItems(DateTime begin, DateTime end);

        Task<int> QueryCount(DateTime begin, DateTime end);
    }

    public class ComplainService : IDateSpanService<ComplainItem>
    {
        private readonly IComplainItemRepository _repository;
        private readonly ITownRepository _townRepository;
        private readonly IComplainProcessRepository _processRepository;

        public ComplainService(IComplainItemRepository repository, ITownRepository townRepository,
            IComplainProcessRepository processRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
            _processRepository = processRepository;
        }

        public IEnumerable<ComplainPositionDto> QueryPositionDtos(DateTime begin, DateTime end)
        {
            return
                _repository.GetAllList(begin, end).Where(x => x.TownId == 0).MapTo<IEnumerable<ComplainPositionDto>>();
        }

        public List<ComplainItem> QueryItems(DateTime begin, DateTime end)
        {
            return _repository.GetAllList(begin, end);
        }

        public async Task<int> UpdateTown(ComplainPositionDto dto)
        {
            var item = _repository.Get(dto.SerialNumber);
            if (item == null) return 0;
            var town = _townRepository.QueryTown(dto.City, dto.District, dto.Town);
            if (town == null) return 0;
            item.TownId = town.Id;
            await _repository.UpdateAsync(item);
            return _repository.SaveChanges();
        }

        public async Task<int> QueryCount(DateTime begin, DateTime end)
        {
            return await _repository.CountAsync(x => x.BeginTime >= begin && x.BeginTime < end);
        }

        public async Task<ComplainProcessDto> ConstructProcess(ComplainDto dto, string userName)
        {
            return await
                _repository
                    .ConstructProcess
                    <IComplainItemRepository, IComplainProcessRepository, ComplainItem,
                        ComplainDto, ComplainProcess, ComplainProcessDto>(_processRepository, dto, userName);
        }

        public IEnumerable<ComplainProcessDto> QueryProcess(string serialNumber)
        {
            var items = _processRepository.GetAllList(serialNumber);
            return Mapper.Map<List<ComplainProcess>, IEnumerable<ComplainProcessDto>>(items);
        }

        public async Task<int> UpdateAsync(ComplainProcessDto dto)
        {
            return await _processRepository.UpdateOne<IComplainProcessRepository, ComplainProcess, ComplainProcessDto>(dto);
        }
    }

    public class BranchDemandService : IDateSpanService<BranchDemand>
    {
        private readonly IBranchDemandRepository _repository;

        public BranchDemandService(IBranchDemandRepository repository)
        {
            _repository = repository;
        }

        public List<BranchDemand> QueryItems(DateTime begin, DateTime end)
        {
            return _repository.GetAllList(begin, end);
        }

        public async Task<int> QueryCount(DateTime begin, DateTime end)
        {
            return await _repository.CountAsync(x => x.BeginDate >= begin && x.BeginDate < end);
        }
    }

    public class OnlineSustainService : IDateSpanService<OnlineSustain>
    {
        private readonly IOnlineSustainRepository _repository;

        public OnlineSustainService(IOnlineSustainRepository repository)
        {
            _repository = repository;
        }

        public List<OnlineSustain> QueryItems(DateTime begin, DateTime end)
        {
            return _repository.GetAllList(begin, end);
        }

        public async Task<int> QueryCount(DateTime begin, DateTime end)
        {
            return await _repository.CountAsync(x => x.BeginDate >= begin && x.BeginDate < end);
        }
    }
}
