using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Parameters.Entities.Channel;

namespace Lte.Evaluations.ViewModels.Channel
{
    [AutoMapFrom(typeof(CellUlpcComm))]
    public class CellOpenLoopPcView
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int P0NominalPUSCH { get; set; }

        public int P0NominalPUCCH { get; set; }

        public int PassLossCoeff { get; set; }

        public int DeltaMsg2 { get; set; }

        public int DeltaFPUCCHFormat2b { get; set; }

        public int DeltaFPUCCHFormat2a { get; set; }

        public int DeltaPreambleMsg3 { get; set; }

        public int DeltaFPUCCHFormat1b { get; set; }

        public int DeltaFPUCCHFormat1 { get; set; }

        public int DeltaFPUCCHFormat2 { get; set; }
    }
}
