using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using Lte.Domain.LinqToExcel;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.DataService.Kpi
{
    public class CoverageStatService
    {
        private readonly ICoverageStatRepository _repository;

        private static Stack<CoverageStat> CoverageStats { get; set; }

        public CoverageStatService(ICoverageStatRepository repository)
        {
            _repository = repository;
            if (CoverageStats == null)
                CoverageStats = new Stack<CoverageStat>();
        }

        public void UploadStats(string path, string sheetName)
        {
            try
            {
                var factory = new ExcelQueryFactory { FileName = path };
                var stats = (from c in factory.Worksheet<CoverageStatExcel>(sheetName) select c).ToList();
                foreach (var stat in stats)
                {
                    CoverageStats.Push(stat.MapTo<CoverageStat>());
                }
            }
            catch
            {
                //ignore.
            }
        }

        public bool DumpOneStat()
        {
            var stat = CoverageStats.Pop();
            if (stat == null) throw new NullReferenceException("alarm stat is null!");
            return _repository.ImportOne(stat) != null;
        }

        public int GetStatsToBeDump()
        {
            return CoverageStats.Count;
        }

        public void ClearStats()
        {
            CoverageStats.Clear();
        }

    }
}
