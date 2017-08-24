using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System.Collections.Generic;
using Lte.Domain.Common;

namespace Lte.MySqlFramework.Abstract
{
    public interface IEmergencyCommunicationRepository 
        : IRepository<EmergencyCommunication>, 
        IMatchRepository<EmergencyCommunication, EmergencyCommunicationDto>, 
        IDateSpanQuery<EmergencyCommunication>,
        ISaveChanges
    {
    }

    public interface IVipDemandRepository 
        : IRepository<VipDemand>, 
        IMatchRepository<VipDemand, VipDemandExcel>, 
        IMatchRepository<VipDemand, VipDemandDto>,
        IDateSpanQuery<VipDemand>,
        ISaveChanges
    {
    }

    public interface IEmergencyProcessRepository
        : IRepository<EmergencyProcess>,
            IMatchRepository<EmergencyProcess, EmergencyProcessDto>,
            ISaveChanges
    {
        List<EmergencyProcess> GetAllList(int emergencyId);
    }

    public interface IVipProcessRepository
        : IRepository<VipProcess>,
            IMatchRepository<VipProcess, VipProcessDto>,
            ISaveChanges
    {
        List<VipProcess> GetAllList(string serialNumber);
    }

    public interface IComplainProcessRepository
        : IRepository<ComplainProcess>,
            IMatchRepository<ComplainProcess, OnlineSustainExcel>,
            ISaveChanges
    {
        List<ComplainProcess> GetAllList(string serialNumber);
    }

    public interface IEmergencyFiberWorkItemRepository
        : IRepository<EmergencyFiberWorkItem>,
            IMatchRepository<EmergencyFiberWorkItem>,
            ISaveChanges
    {
        List<EmergencyFiberWorkItem> GetAllList(int emergencyId);
    }

    public interface IComplainItemRepository
        : IRepository<ComplainItem>,
            IMatchRepository<ComplainItem, ComplainExcel>,
            IMatchRepository<ComplainItem, ComplainDto>,
            IDateSpanQuery<ComplainItem>,
            ISaveChanges
    {
        ComplainItem Get(string serialNumber);
    }

    public interface IBranchDemandRepository
        : IRepository<BranchDemand>, IMatchRepository<BranchDemand, BranchDemandExcel>,
        IDateSpanQuery<BranchDemand>, ISaveChanges
    {
        
    }

    public interface IOnlineSustainRepository
        : IRepository<OnlineSustain>, IMatchRepository<OnlineSustain, OnlineSustainExcel>,
            IDateSpanQuery<OnlineSustain>, ISaveChanges
    {
        
    }

    public interface IWebBrowsingRepository : IRepository<WebBrowsing>, IMatchRepository<WebBrowsing, WebBrowsingCsv>, 
        ISaveChanges
    {
        
    }

    public interface IAppStreamRepository : IRepository<AppSteam>, IMatchRepository<AppSteam, AppStreamingCsv>,
        ISaveChanges
    {
        
    }

    public interface IMicroItemRepository : IRepository<MicroItem>, ISaveChanges
    {
        
    }

    public interface IMicroAddressRepository : IRepository<MicroAddress>, ISaveChanges
    {
        
    }

    public interface ILteNeighborCellRepository : IRepository<LteNeighborCell>
    {
    }

    public interface INearestPciCellRepository : IRepository<NearestPciCell>
    {
        List<NearestPciCell> GetAllList(int cellId, byte sectorId);

        NearestPciCell GetNearestPciCell(int cellId, byte sectorId, short pci);

        int SaveChanges();
    }

}
