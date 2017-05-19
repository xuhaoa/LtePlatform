﻿using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lte.MySqlFramework.Abstract
{
    public interface ICdmaRegionStatRepository : IRepository<CdmaRegionStat>,
        IMatchRepository<CdmaRegionStat, CdmaRegionStatExcel>, ISaveChanges
    {
        List<CdmaRegionStat> GetAllList(DateTime begin, DateTime end);

        Task<List<CdmaRegionStat>> GetAllListAsync(DateTime begin, DateTime end);
    }

    public interface ITopDrop2GCellRepository : IRepository<TopDrop2GCell>,
        IMatchRepository<TopDrop2GCell, TopDrop2GCellExcel>, ISaveChanges
    {
        List<TopDrop2GCell> GetAllList(string city, DateTime begin, DateTime end);
    }

    public interface ITopConnection2GRepository : IRepository<TopConnection2GCell>,
        IMatchRepository<TopConnection2GCell, TopConnection2GExcel>, ISaveChanges
    {
        List<TopConnection2GCell> GetAllList(string city, DateTime begin, DateTime end);
    }

    public interface ITopConnection3GRepository : IRepository<TopConnection3GCell>,
        IMatchRepository<TopConnection3GCell, TopConnection3GCellExcel>, ISaveChanges
    {
        List<TopConnection3GCell> GetAllList(string city, DateTime begin, DateTime end);
    }

    public interface ICdmaRruRepository : IRepository<CdmaRru>,
        IMatchRepository<CdmaRru, CdmaCellExcel>, ISaveChanges
    {
        CdmaRru Get(int btsId, byte sectorId);
    }

    public interface ILteRruRepository : IRepository<LteRru>,
        IMatchRepository<LteRru, CellExcel>, ISaveChanges
    {
        LteRru Get(int eNodebId, byte localSectorId);
    }

    public interface IConstruction_InformationRepository : IRepository<ConstructionInformation>, ISaveChanges
    {
        ConstructionInformation GetByFslNo(string fslNo);

        ConstructionInformation GetBySiteNo(string siteNo);
    }

    public interface IEnodeb_BaseRepository : IRepository<ENodebBase>, ISaveChanges
    {
        ENodebBase GetByENodebId(int eNodebId);

        ENodebBase GetByName(string name);
    }

}
