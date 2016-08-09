using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Regular.Attributes;

namespace Lte.Evaluations.MapperSerive.Infrastructure
{
    [TypeDoc("校园名称容器")]
    public class CollegeNamesContainer
    {
        [MemberDoc("校园名称列表")]
        public IEnumerable<string> Names { get; set; }
    }

    public class CollegeCellNamesContainer
    {
        public string CollegeName { get; set; }

        public IEnumerable<string> CellNames { get; set; } 
    }
}
