using System;
using System.Collections.Generic;
using System.IO;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.MockItems;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.MockOperations;
using Moq;
using NUnit.Framework;

namespace Lte.Evaluations.DataService.Kpi
{
    [TestFixture]
    public class KpiImportServiceTest
    {
        private string _excelFileName;
        private readonly Mock<ICdmaRegionStatRepository> _regionRepository = new Mock<ICdmaRegionStatRepository>();
        private readonly Mock<ITopDrop2GCellRepository> _dropRepository = new Mock<ITopDrop2GCellRepository>();
        private readonly Mock<ITopConnection3GRepository> _connectionRepository = new Mock<ITopConnection3GRepository>();
        private KpiImportService _service;

        private readonly IEnumerable<string> _regionSheetNames = new List<string>
        {
            "佛山1区",
            "佛山2区",
            "佛山3区",
            "佛山4区"
        };
            
        [TestFixtureSetUp]
        public void fs()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var excelFilesDirectory = Path.Combine(testDirectory, "ExcelFiles");
            _excelFileName = Path.Combine(excelFilesDirectory, "佛山.xls");
            _regionRepository.MockOperation();
            _dropRepository.MockOperation();
            _service = new KpiImportService(_regionRepository.Object, _dropRepository.Object,
                _connectionRepository.Object, null);
            AutoMapperHelper.CreateMap(typeof(CdmaRegionStat));
            StatMapperService.MapTopKpi();
        }
        
        [Test]
        public void Test()
        {
            var message = _service.Import(_excelFileName, _regionSheetNames);
            Assert.AreEqual(message.Count, 6);
            foreach (var m in message)
            {
                Console.Write(m);
            }
            
        }
    }
}
