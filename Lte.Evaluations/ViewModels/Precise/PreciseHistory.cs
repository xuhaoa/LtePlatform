using System;

namespace Lte.Evaluations.ViewModels.Precise
{
    public class PreciseHistory
    {
        public string DateString { get; set; }

        public DateTime StatDate { get; set; }

        public int PreciseStats { get; set; }

        public int TownPreciseStats { get; set; }
    }
}
