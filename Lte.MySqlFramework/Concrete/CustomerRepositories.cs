using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Concrete
{
    public class EmergencyCommunicationRepository : EfRepositoryBase<MySqlContext, EmergencyCommunication>,
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

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EmergencyCommunication Match(EmergencyCommunicationDto stat)
        {
            var begin = stat.BeginDate.AddDays(-7);
            var end = stat.EndDate.AddDays(7);
            return FirstOrDefault(x => x.ProjectName == stat.ProjectName && x.BeginDate >= begin && x.EndDate < end);
        }
    }

    public class VipDemandRepository : EfRepositoryBase<MySqlContext, VipDemand>, IVipDemandRepository
    {
        public VipDemandRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public VipDemand Match(VipDemandExcel stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
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

    public class EmergencyProcessRepository : EfRepositoryBase<MySqlContext, EmergencyProcess>,
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

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public List<EmergencyProcess> GetAllList(int emergencyId)
        {
            return GetAllList(x => x.EmergencyId == emergencyId);
        }
    }

    public class VipProcessRepository : EfRepositoryBase<MySqlContext, VipProcess>, IVipProcessRepository
    {
        public VipProcessRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public VipProcess Match(VipProcessDto stat)
        {
            var state = stat.VipStateDescription.GetEnumType<VipState>();
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber && x.VipState == state);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public List<VipProcess> GetAllList(string serialNumber)
        {
            return GetAllList(x => x.SerialNumber == serialNumber);
        }
    }

    public class EmergencyFiberWorkItemRepository : EfRepositoryBase<MySqlContext, EmergencyFiberWorkItem>,
        IEmergencyFiberWorkItemRepository
    {
        public EmergencyFiberWorkItemRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public EmergencyFiberWorkItem Match(EmergencyFiberWorkItem stat)
        {
            return FirstOrDefault(x => x.EmergencyId == stat.EmergencyId && x.WorkItemNumber == stat.WorkItemNumber);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public List<EmergencyFiberWorkItem> GetAllList(int emergencyId)
        {
            return GetAllList(x => x.EmergencyId == emergencyId);
        }
    }

    public class ComplainItemRepository : EfRepositoryBase<MySqlContext, ComplainItem>,
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

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public ComplainItem Get(string serialNumber)
        {
            return FirstOrDefault(x => x.SerialNumber == serialNumber);
        }
    }

    public class BranchDemandRepository : EfRepositoryBase<MySqlContext, BranchDemand>,IBranchDemandRepository
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

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public BranchDemand Match(BranchDemandExcel stat)
        {
            return FirstOrDefault(x => x.SerialNumber == stat.SerialNumber);
        }
    }

    public class OnlineSustainRepository : EfRepositoryBase<MySqlContext, OnlineSustain>, IOnlineSustainRepository
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

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }
}
