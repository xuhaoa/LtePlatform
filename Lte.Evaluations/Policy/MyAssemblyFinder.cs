using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Abp.Reflection;

namespace Lte.Evaluations.Policy
{
    public class MyAssemblyFinder : IAssemblyFinder
    {
        public List<Assembly> GetAllAssemblies()
        {
            return new List<Assembly>
            {
                Assembly.Load("Lte.Parameters"),
                Assembly.Load("Lte.Evaluations")
            };
        }
    }
}
