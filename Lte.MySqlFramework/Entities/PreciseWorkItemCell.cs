using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace Lte.MySqlFramework.Entities
{
    public class PreciseWorkItemCell : Entity
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public string WorkItemNumber { get; set; }

        public double Db6Share { get; set; }

        public double Db10Share { get; set; }

        public double Mod3Share { get; set; }

        public double WeakCoverageRate { get; set; }

        public double OriginalDownTilt { get; set; }

        public double OriginalRsPower { get; set; }

        public double AdjustDownTilt { get; set; }

        public double AdjustRsPower { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? FininshDate { get; set; }
    }
}
