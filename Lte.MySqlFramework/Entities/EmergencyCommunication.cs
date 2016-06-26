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
    }


    public class EmergencyCommunicationDto : IDistrictTown
    {
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
    }
}
