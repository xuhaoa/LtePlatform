using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;

namespace Lte.MySqlFramework.Concrete
{
    public class EmergencyCommunicationRepository : EfRepositorySave<MySqlContext, EmergencyCommunication>,
        IEmergencyCommunicationRepository
    {
        public EmergencyCommunicationRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<EmergencyCommunication> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end);
        }

        public List<EmergencyCommunication> GetAllList(int townId, DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end && x.TownId == townId);
        }
        
        public EmergencyCommunication Match(EmergencyCommunicationDto stat)
        {
            return stat.Id <= 0 ? FirstOrDefault(x => x.ProjectName == stat.ProjectName) : Get(stat.Id);
        }
    }

    public class VipDemandRepository : EfRepositorySave<MySqlContext, VipDemand>, IVipDemandRepository
    {
        public VipDemandRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public VipDemand Match(VipDemandExcel stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }
        
        public List<VipDemand> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate <= end);
        }

        public List<VipDemand> GetAllList(int townId, DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate <= end && x.TownId == townId);
        }

        public VipDemand Match(VipDemandDto stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }
    }

    public class EmergencyProcessRepository : EfRepositorySave<MySqlContext, EmergencyProcess>,
        IEmergencyProcessRepository
    {
        public EmergencyProcessRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public EmergencyProcess Match(EmergencyProcessDto stat)
        {
            var state = stat.ProcessStateDescription.GetEnumType<EmergencyState>();
            return FirstOrDefault(x => x.EmergencyId == stat.EmergencyId && x.ProcessState == state);
        }
        
        public List<EmergencyProcess> GetAllList(int emergencyId)
        {
            return GetAllList(x => x.EmergencyId == emergencyId);
        }
    }

    public class VipProcessRepository : EfRepositorySave<MySqlContext, VipProcess>, IVipProcessRepository
    {
        public VipProcessRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public VipProcess Match(VipProcessDto stat)
        {
            var state = stat.VipStateDescription.GetEnumType<VipState>();
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber && x.VipState == state);
        }
        
        public List<VipProcess> GetAllList(string serialNumber)
        {
            return GetAllList(x => x.SerialNumber == serialNumber);
        }
    }

    public class ComplainProcessRepository : EfRepositorySave<MySqlContext, ComplainProcess>, IComplainProcessRepository
    {
        public ComplainProcessRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public ComplainProcess Match(OnlineSustainExcel stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }
        
        public List<ComplainProcess> GetAllList(string serialNumber)
        {
            return GetAllList(x => x.SerialNumber == serialNumber);
        }
    }

    public class EmergencyFiberWorkItemRepository : EfRepositorySave<MySqlContext, EmergencyFiberWorkItem>,
        IEmergencyFiberWorkItemRepository
    {
        public EmergencyFiberWorkItemRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public EmergencyFiberWorkItem Match(EmergencyFiberWorkItem stat)
        {
            return FirstOrDefault(x => x.EmergencyId == stat.EmergencyId && x.WorkItemNumber == stat.WorkItemNumber);
        }
        
        public List<EmergencyFiberWorkItem> GetAllList(int emergencyId)
        {
            return GetAllList(x => x.EmergencyId == emergencyId);
        }
    }

    public class ComplainItemRepository : EfRepositorySave<MySqlContext, ComplainItem>,
        IComplainItemRepository
    {
        public ComplainItemRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public ComplainItem Match(ComplainExcel stat)
        {
            return Get(stat.SerialNumber);
        }

        public List<ComplainItem> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginTime >= begin && x.BeginTime < end);
        }

        public List<ComplainItem> GetAllList(int townId, DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginTime >= begin && x.BeginTime < end && x.TownId == townId);
        }
        
        public ComplainItem Get(string serialNumber)
        {
            return FirstOrDefault(x => x.SerialNumber == serialNumber);
        }

        public ComplainItem Match(ComplainDto stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }
    }

    public class BranchDemandRepository : EfRepositorySave<MySqlContext, BranchDemand>,IBranchDemandRepository
    {
        public BranchDemandRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<BranchDemand> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end);
        }

        public List<BranchDemand> GetAllList(int townId, DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end && x.TownId == townId);
        }
        
        public BranchDemand Match(BranchDemandExcel stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }
    }

    public class OnlineSustainRepository : EfRepositorySave<MySqlContext, OnlineSustain>, IOnlineSustainRepository
    {
        public OnlineSustainRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public OnlineSustain Match(OnlineSustainExcel stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }

        public List<OnlineSustain> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end);
        }

        public List<OnlineSustain> GetAllList(int townId, DateTime begin, DateTime end)
        {
            return GetAllList(x => x.BeginDate >= begin && x.BeginDate < end && x.TownId == townId);
        }
    }

    public class WebBrowsingRepository : EfRepositorySave<MySqlContext, WebBrowsing>, IWebBrowsingRepository
    {
        public WebBrowsingRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public WebBrowsing Match(WebBrowsingCsv stat)
        {
            return FirstOrDefault(x => x.Meid == stat.Meid && x.StatDate == stat.PageSurfTime);
        }
    }

    public class AppStreamRepository : EfRepositorySave<MySqlContext, AppSteam>, IAppStreamRepository
    {
        public AppStreamRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public AppSteam Match(AppStreamingCsv stat)
        {
            return FirstOrDefault(x => x.Meid == stat.Meid && x.StatDate == stat.VideoTestTime);
        }
    }

    public class MicroItemRepository : EfRepositorySave<MySqlContext, MicroItem>, IMicroItemRepository
    {
        public MicroItemRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class MicroAddressRepository : EfRepositorySave<MySqlContext, MicroAddress>, IMicroAddressRepository
    {
        public MicroAddressRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
