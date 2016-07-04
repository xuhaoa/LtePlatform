using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Entities
{
    public class EmergencyCommunication : Entity
    {
        public DemandLevel DemandLevel { get; set; }

        public int TownId { get; set; }

        public string ProjectName { get; set; }

        public int ExpectedPeople { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime EndDate { get; set; }

        public VehicleType VehicleType { get; set; }

        public byte Vehicles { get; set; }

        public string TransmitFunction { get; set; }

        public string ElectricSupply { get; set; }

        public string Area { get; set; }

        public string Department { get; set; }

        public string ContactPerson { get; set; }

        public string Description { get; set; }

        public EmergencyState EmergencyState { get; set; }
    }


    public class EmergencyCommunicationDto : IDistrictTown
    {
        public int Id { get; set; }

        public string DemandLevelDescription { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public int TownId { get; set; }

        public string ProjectName { get; set; }

        public int ExpectedPeople { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime EndDate { get; set; }

        public string VehicularTypeDescription { get; set; }

        public byte Vehicles { get; set; }

        public string TransmitFunction { get; set; }

        public string ElectricSupply { get; set; }

        public string Area { get; set; }

        public string Department { get; set; }

        public string Person { get; set; }

        public string Phone { get; set; }

        public string VehicleLocation { get; set; }

        public string OtherDescription { get; set; }

        public string EmergencyStateDescription { get; set; }
    }

    public class EmergencyProcess : Entity
    {
        public int EmergencyId { get; set; }

        public EmergencyState ProcessState { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }
    }

    public class EmergencyProcessDto
    {
        public int EmergencyId { get; set; }

        public string ProcessStateDescription { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }
    }

    public class EmergencyFiberWorkItem : Entity
    {
        public int EmergencyId { get; set; }

        public string WorkItemNumber { get; set; }

        public string Person { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime? FinishDate { get; set; }
    }
}
