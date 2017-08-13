using System;
using System.Collections.Generic;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Entities.College;
using System.Linq;
using Lte.Domain.Common.Wireless;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities.Dt;

namespace Lte.Parameters.Concrete.College
{
    public class EFCollegeRepository : EfRepositoryBase<EFParametersContext, CollegeInfo>, ICollegeRepository
    {
        public CollegeRegion GetRegion(int id)
        {
            return GetAll().Select(x => new {x.Id, x.CollegeRegion}).FirstOrDefault(x => x.Id == id)?.CollegeRegion;
        }

        public CollegeInfo GetByName(string name)
        {
            return FirstOrDefault(x => x.Name == name);
        }

        public RectangleRange GetRange(string name)
        {
            var college = GetByName(name);
            return college == null ? null : GetRegion(college.Id)?.RectangleRange;
        }
        
        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollegeRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class MasterFileRecordRepository : IFileRecordRepository
    {
        private readonly MasterTestContext _context = new MasterTestContext();
        
        public IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName)
        {
            return _context.Get4GFileContents(fileName);
        }

        public IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName, int rasterNum)
        {
            return _context.Get4GFileContents(fileName, rasterNum);
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName)
        {
            return _context.Get3GFileContents(fileName);
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName, int rasterNum)
        {
            return _context.Get3GFileContents(fileName, rasterNum);
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName)
        {
            return _context.Get2GFileContents(fileName);
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName, int rasterNum)
        {
            return _context.Get2GFileContents(fileName, rasterNum);
        }

        public IEnumerable<string> GetTables()
        {
            return _context.GetTables();
        }

        public int InsertFileRecord2Gs(IEnumerable<FileRecord2G> stats, string tableName)
        {
            _context.ExecuteCommand("CREATE TABLE [" + tableName + "](rasterNum SMALLINT," +
                                    "testTime CHAR(50), lon float, lat float, refPN SMALLINT,EcIo REAL, rxAGC REAL, txAGC REAL, txPower REAL, txGain REAL, GridNo50m INT)");
            var index = 0;
            foreach (var stat in stats)
            {
                index += _context.ExecuteCommand(stat.GenerateInsertSql(tableName));
            }
            return index;
        }

    }
}
