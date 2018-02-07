using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace Lte.MySqlFramework.Entities
{
    public class LteProblem : Entity
    {
        public string Type { get; set; }

        public string Body { get; set; }

        public int Choices { get; set; }

        public string ChoiceA { get; set; }

        public string ChoiceB { get; set; }

        public string ChoiceC { get; set; }

        public string ChoiceD { get; set; }

        public string ChoiceE { get; set; }

        public string ChoiceF { get; set; }

        public string Answer { get; set; }
    }
}
