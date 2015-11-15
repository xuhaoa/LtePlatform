﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Lte.Parameters.Entities;

namespace Lte.Parameters.Abstract
{
    public interface IInfrastructureRepository : IRepository<InfrastructureInfo>
    {
        IEnumerable<int> GetIds(string collegeName);

        IEnumerable<int> GetCellIds(string collegeName);
    }
}
