﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface ICollegeYearRepository : IRepository<CollegeYearInfo>, ISaveChanges
    {
        CollegeYearInfo GetByCollegeAndYear(int collegeId, int year);
    }
}
