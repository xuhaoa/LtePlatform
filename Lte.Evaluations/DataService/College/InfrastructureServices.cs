﻿using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeENodebService
    {
        private readonly IHotSpotENodebRepository _repository;
        private readonly IENodebRepository _eNodebRepository;

        public CollegeENodebService(IHotSpotENodebRepository repository, IENodebRepository eNodebRepository)
        {
            _repository = repository;
            _eNodebRepository = eNodebRepository;
        }

        public IEnumerable<ENodebView> Query(string collegeName)
        {
            var ids =
                _repository.GetAllList(
                    x =>
                        x.HotspotName == collegeName && x.HotspotType == HotspotType.College &&
                        x.InfrastructureType == InfrastructureType.ENodeb);
            return (from id in ids
                select _eNodebRepository.GetByENodebId(id.ENodebId)
                into eNodeb
                where eNodeb != null
                select Mapper.Map<ENodeb, ENodebView>(eNodeb)).ToList();
        }

        public async Task<int> UpdateENodebs(CollegeENodebIdsContainer container)
        {
            foreach (var eNodebId in container.ENodebIds)
            {
                await _repository.InsertAsync(new HotSpotENodebId
                {
                    ENodebId = eNodebId,
                    HotspotType = HotspotType.College,
                    HotspotName = container.CollegeName
                });
            }
            return _repository.SaveChanges();
        } 
    }

    public class CollegeBtssService
    {
        private readonly IHotSpotBtsRepository _repository;
        private readonly IBtsRepository _btsRepository;
        private readonly ITownRepository _townRepository;

        public CollegeBtssService(IHotSpotBtsRepository repository, IBtsRepository btsRepository, ITownRepository townRepository)
        {
            _repository = repository;
            _btsRepository = btsRepository;
            _townRepository = townRepository;
        }

        public IEnumerable<CdmaBtsView> Query(string collegeName)
        {
            var ids =
                _repository.GetAllList(
                    x =>
                        x.HotspotName == collegeName && x.HotspotType == HotspotType.College &&
                        x.InfrastructureType == InfrastructureType.CdmaBts);
            var btss = ids.Select(x => _btsRepository.GetByBtsId(x.BtsId)).Where(bts => bts != null).ToList();
            var views = Mapper.Map<List<CdmaBts>, List<CdmaBtsView>>(btss);
            views.ForEach(x =>
            {
                var town = _townRepository.Get(x.TownId);
                if (town != null)
                {
                    x.DistrictName = town.DistrictName;
                    x.TownName = town.TownName;
                }
            });
            return views;
        }

        public async Task<int> UpdateBtss(CollegeBtsIdsContainer container)
        {
            foreach (var btsId in container.BtsIds)
            {
                await _repository.InsertAsync(new HotSpotBtsId
                {
                    BtsId = btsId,
                    HotspotName = container.CollegeName,
                    HotspotType = HotspotType.College
                });
            }
            return _repository.SaveChanges();
        }
    }

    public class CollegeCellsService
    {
        private readonly IHotSpotCellRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;

        public CollegeCellsService(IHotSpotCellRepository repository, ICellRepository cellRepository,
            IENodebRepository eNodebRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _eNodebRepository = eNodebRepository;
        }

        public IEnumerable<SectorView> Query(string collegeName)
        {
            var ids =
                _repository.GetAllList(
                    x =>
                        x.HotspotName == collegeName && x.HotspotType == HotspotType.College &&
                        x.InfrastructureType == InfrastructureType.Cell);
            var query =
                ids.Select(x => _cellRepository.GetBySectorId(x.ENodebId, x.SectorId))
                    .Where(cell => cell != null)
                    .ToList();
            return query.Any()
                ? Mapper.Map<IEnumerable<CellView>, IEnumerable<SectorView>>(
                    query.Select(x => CellView.ConstructView(x, _eNodebRepository)))
                : null;
        }
        
        public async Task<int> UpdateHotSpotCells(CollegeCellNamesContainer container)
        {
            foreach (var cell in from cellName in container.CellNames
                                 select cellName.GetSplittedFields('-')
                                 into fields
                                 where fields.Length > 1
                                 let eNodeb = _eNodebRepository.GetByName(fields[0])
                                 where eNodeb != null
                                 select _cellRepository.GetBySectorId(eNodeb.ENodebId, fields[1].ConvertToByte(0))
                                 into cell
                                 where cell != null
                                 select cell)
            {
                await _repository.InsertAsync(new HotSpotCellId
                {
                    ENodebId = cell.ENodebId,
                    SectorId = cell.SectorId,
                    HotspotType = HotspotType.College,
                    HotspotName = container.CollegeName
                });
            }
            return _repository.SaveChanges();
        }
    }

    public class CollegeCdmaCellsService
    {
        private readonly IHotSpotCdmaCellRepository _repository;
        private readonly ICdmaCellRepository _cellRepository;
        private readonly IBtsRepository _btsRepository;

        public CollegeCdmaCellsService(IHotSpotCdmaCellRepository repository, ICdmaCellRepository cellRepository,
            IBtsRepository btsRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _btsRepository = btsRepository;
        }

        public IEnumerable<SectorView> Query(string collegeName)
        {
            var ids =
                _repository.GetAllList(
                    x =>
                        x.HotspotType == HotspotType.College && x.InfrastructureType == InfrastructureType.CdmaCell &&
                        x.HotspotName == collegeName);
            var query =
                ids.Select(x => _cellRepository.GetBySectorId(x.BtsId, x.SectorId)).Where(cell => cell != null).ToList();
            return query.Any()
                ? Mapper.Map<IEnumerable<CdmaCellView>, IEnumerable<SectorView>>(
                    query.Select(x => CdmaCellView.ConstructView(x, _btsRepository)))
                : null;
        }

        public async Task<int> UpdateHotSpotCells(CollegeCellNamesContainer container)
        {
            foreach (var cell in from cellName in container.CellNames
                                 select cellName.GetSplittedFields('-')
                                 into fields
                                 where fields.Length > 1
                                 let bts = _btsRepository.GetByName(fields[0])
                                 where bts != null
                                 select _cellRepository.GetBySectorId(bts.BtsId, fields[1].ConvertToByte(0))
                                 into cell
                                 where cell != null
                                 select cell)
            {
                await _repository.InsertAsync(new HotSpotCdmaCellId
                {
                    BtsId = cell.BtsId,
                    SectorId = cell.SectorId,
                    HotspotType = HotspotType.College,
                    HotspotName = container.CollegeName
                });
            }
            return _repository.SaveChanges();
        }
    }

    public class CollegeLteDistributionService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly IIndoorDistributionRepository _indoorRepository;

        public CollegeLteDistributionService(IInfrastructureRepository repository,
            IIndoorDistributionRepository indoorRepository)
        {
            _repository = repository;
            _indoorRepository = indoorRepository;
        }

        public IEnumerable<IndoorDistribution> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.LteIndoor);
            var distributions = ids.Select(_indoorRepository.Get).Where(distribution => distribution != null).ToList();
            return distributions;
        }
    }

    public class CollegeCdmaDistributionService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly IIndoorDistributionRepository _indoorRepository;

        public CollegeCdmaDistributionService(IInfrastructureRepository repository,
            IIndoorDistributionRepository indoorRepository)
        {
            _repository = repository;
            _indoorRepository = indoorRepository;
        }

        public IEnumerable<IndoorDistribution> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.CdmaIndoor);
            var distributions = ids.Select(_indoorRepository.Get).Where(distribution => distribution != null).ToList();
            return distributions;
        }
    }

    public class HotSpotService
    {
        private readonly IInfrastructureRepository _repository;

        public HotSpotService(IInfrastructureRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> SaveBuildingHotSpot(HotSpotView dto)
        {
            var info =
                _repository.FirstOrDefault(
                    x => x.HotspotName == dto.HotspotName && x.InfrastructureType == InfrastructureType.HotSpot);
            if (info == null)
            {
                info = dto.MapTo<InfrastructureInfo>();
                info.InfrastructureType = InfrastructureType.HotSpot;
                await _repository.InsertAsync(info);
            }
            else
            {
                dto.MapTo(info);
            }
            
            return _repository.SaveChanges();
        }

        public IEnumerable<HotSpotView> QueryHotSpotViews()
        {
            var results = _repository.GetAllHotSpots().MapTo<IEnumerable<HotSpotView>>();
            return results;
        } 
    }
}
