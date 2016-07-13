using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Lte.Parameters.Entities.Basic;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Channel
{
    public class PowerControlULZte : IEntity<ObjectId>, IZteMongo
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeB_Name { get; set; }

        public string lastModifedTime { get; set; }

        public string iDate { get; set; }

        public string parentLDN { get; set; }

        public string description { get; set; }

        public int pucchTgtPsLwLimt { get; set; }

        public int swithForPHR { get; set; }

        public int p0NominalPUSCH { get; set; }

        public int poUpMax { get; set; }

        public int p0UePucchPub { get; set; }

        public int switchForDCI3A3Pucch { get; set; }

        public int puschCLPCSwitch { get; set; }
        
        public int ueTransMcsTarget { get; set; }

        public int powerOffsetOfSRS { get; set; }

        public int deltaFPucchFormat1 { get; set; }

        public int deltaFPucchFormat2a { get; set; }

        public int deltaFPucchFormat1b { get; set; }

        public int deltaPreambleMsg3 { get; set; }

        public int lenofNIWindow { get; set; }

        public int deltaFPucchFormat2b { get; set; }

        public int pucchTgtPsHiLimt { get; set; }

        public int rsrpPeriodMeasSwitchDl { get; set; }

        public int alpha { get; set; }

        public int oiSwitchOfClosePc { get; set; }

        public int ks { get; set; }

        public int deltaMsg3 { get; set; }

        public int p0UePusch1Pub { get; set; }

        public int poNominalPUCCH { get; set; }

        public int dCI3A3SelPusch { get; set; }

        public int puschPCAdjType { get; set; }

        public int dCI3A3SelPucch { get; set; }

        public int poDownMax { get; set; }

        public int rsrpEventMeasSwitchDl { get; set; }

        public int poNominalPUSCH1 { get; set; }

        public int filterCoeffRSRP { get; set; }

        public int switchForCLPCofPUCCH { get; set; }

        public int targetIOT { get; set; }

        public int deltaFPucchFormat2 { get; set; }

        public int PowerControlUL { get; set; }
        
        public int switchForDCI3A3Pusch { get; set; }

        public int switchForCLPCofPUSCH { get; set; }

        public int ueTransPowerCeiling { get; set; }

        public int? deltaFPucchFormat1bCS { get; set; }

        public int? deltaFPucchFormat3 { get; set; }

        public int? tarSinrPucchUl { get; set; }
    }
}
