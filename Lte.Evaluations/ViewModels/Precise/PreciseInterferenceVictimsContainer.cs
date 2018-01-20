using System.Collections.Generic;

namespace Lte.Evaluations.ViewModels.Precise
{
    public class PreciseInterferenceVictimsContainer : IPreciseWorkItemDto<PreciseInterferenceVictimDto>
    {
        public List<PreciseInterferenceVictimDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }
}