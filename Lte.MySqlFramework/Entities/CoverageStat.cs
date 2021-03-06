﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(CoverageStatExcel))]
    public class CoverageStat: Entity, IStatDate, ILteCellQuery
    {
        public DateTime StatDate { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public int TelecomMrs { get; set; }
        
        public int UnicomMrs { get; set; }

        public int MobileMrs { get; set; }
        
        public int TelecomAbove110 { get; set; }
        
        public int MobileAbove110 { get; set; }

        public int UnicomAbove110 { get; set; }
        
        public int TelecomAbove105 { get; set; }

        public int MobileAbove105 { get; set; }

        public int UnicomAbove115 { get; set; }

        public int TelecomAbove115 { get; set; }

        public int MobileAbove115 { get; set; }

        public int UnicomAbove105 { get; set; }

        public double TelecomSum { get; set; }
        
        public double MobileSum { get; set; }

        public double UnicomSum { get; set; }

        public double TelecomSumAbove110 { get; set; }

        public double MobileSumAbove110 { get; set; }

        public double UnicomSumAbove110 { get; set; }
    }
}
