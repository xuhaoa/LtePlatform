using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.MapperSerive;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using NUnit.Framework;

namespace Lte.Parameters.Test.Entities
{
    [TestFixture]
    public class CellConstructionTest
    {
        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            InfrastructureMapperService.MapCell();
        }

        [TestCase(1233, 23, 12.345, 1, "1T1R", 1.0, "1T1R")]
        [TestCase(1253, 23, 223.45, 1825, "否", 3.2, "2T2R")]
        [TestCase(1353, 33, 27.34, 119, "DO", 4.2, "1T1R")]
        [TestCase(1353, 33, 27.34, 160, "DO", 4.2, "1T1R")]
        [TestCase(1353, 33, 2.734, 201, "否 ", 1.6, "2T4R")]
        [TestCase(1353, 33, 273.4, 75, "否 ", 3.2, "2T4R")]
        [TestCase(1353, 33, 27.34, 283, "2T4R", 6.4, "1T1R")]
        [TestCase(1353, 33, 2.734, 1013, "否", 1.28, "2T4R")]
        [TestCase(1353, 33, 27.34, 100, "4T4R", 0.9, "4T4R")]
        public void Test_NewCell(int eNodebId, byte sectorId, double longtitute, short frequency, string isIndoor,
            double azimuth, string antConfig)
        {
            var cellExcelInfo = new CellExcel
            {
                ENodebId = eNodebId,
                SectorId = sectorId,
                Longtitute = longtitute,
                Frequency = frequency,
                IsIndoor = isIndoor,
                AntennaGain = 12.8,
                Azimuth = azimuth,
                TransmitReceive = antConfig
            };
            var cell = Mapper.Map<CellExcel, Cell>(cellExcelInfo);
            Assert.IsNotNull(cell);
            Assert.AreEqual(cell.ENodebId, eNodebId);
            Assert.AreEqual(cell.SectorId, sectorId);
            Assert.AreEqual(cell.Longtitute, longtitute);
            Assert.AreEqual(cell.IsOutdoor, isIndoor.Trim() == "否");
            Assert.AreEqual(cell.AntennaGain, 12.8);
            Assert.AreEqual(cell.Azimuth, azimuth, "azimuth");
            Assert.AreEqual(cell.AntennaPorts, antConfig.GetEnumType<AntennaPortsConfigure>());
        }
    }
    
    [TestFixture]
    public class CdmaCellConstructionTest
    {
        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            InfrastructureMapperService.MapCell();
        }

        [TestCase(1233, 23, 1234, 37, "DO", 1, true)]
        [TestCase(1253, 23, 2234, 78, "DO", 2, true)]
        [TestCase(1353, 33, 2734, 119, "DO", 4, true)]
        [TestCase(1353, 33, 2734, 160, "1X", 8, true)]
        [TestCase(1353, 33, 2734, 201, "DO", 16, true)]
        [TestCase(1353, 33, 2734, 242, "1X", 32, true)]
        [TestCase(1353, 33, 2734, 283, "DO", 64, true)]
        [TestCase(1353, 33, 2734, 1013, "DO", 128, true)]
        [TestCase(1353, 33, 2734, 120, "DO", 0, false)]
        public void Test_NewCell(int btsId, byte sectorId, int cellId, short frequency, string cellType,
            int overallFrequency, bool updateFrequency)
        {
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = 12.8
            };
            var cell = CdmaCell.ConstructItem(cellExcelInfo);
            Assert.IsNotNull(cell);
            Assert.AreEqual(cell.BtsId, btsId);
            Assert.AreEqual(cell.SectorId, sectorId);
            Assert.AreEqual(cell.CellId, cellId);
            Assert.AreEqual(cell.CellType, cellType);
            Assert.AreEqual(cell.AntennaGain, 12.8);
            Assert.AreEqual(cell.Frequency, overallFrequency, "Wrong overall frequency");
            Assert.AreEqual(cell.Frequency2, -1);
            Assert.AreEqual(cell.Frequency3, -1);
            Assert.AreEqual(cell.Frequency4, -1);
            Assert.AreEqual(cell.Frequency5, -1);
            if (updateFrequency)
            {
                Assert.AreEqual(cell.Frequency1, frequency);
                Assert.IsTrue(cell.HasFrequency(frequency));
            }
            else
            {
                Assert.AreEqual(cell.Frequency1, -1);
                Assert.IsFalse(cell.HasFrequency(frequency));
            }
        }

        [TestCase(1233, 23, 1234, 37, "DO", 13.6, 1)]
        [TestCase(1253, 23, 2234, 78, "DO", 14.7, 2)]
        [TestCase(1353, 33, 2734, 119, "DO", 12.1, 4)]
        [TestCase(1353, 33, 2734, 160, "1X", 11.3, 8)]
        [TestCase(1353, 33, 2734, 201, "DO", 8.7, 16)]
        [TestCase(1353, 33, 2734, 242, "1X", 9.4, 32)]
        [TestCase(1353, 33, 2734, 283, "DO", 21.1, 64)]
        [TestCase(1353, 33, 2734, 1013, "DO", 13.1, 128)]
        [TestCase(1353, 33, 2734, 120, "DO", 11.7, 0)]
        public void Test_Import_UpdateFirstFrequency(
            int btsId, byte sectorId, int cellId, short frequency, string cellType, double antennaGain,
            short overallFrequency)
        {
            var cell = new CdmaCell
            {
                BtsId = 1,
                SectorId = 2,
                CellId = 3,
                Frequency = 0,
                CellType = "DO",
                AntennaGain = 12.8,
                Frequency1 = -1
            };
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = antennaGain
            };
            cell.Import(cellExcelInfo);
            Assert.AreEqual(cell.BtsId, 1, "btsId");
            Assert.AreEqual(cell.SectorId, 2);
            Assert.AreEqual(cell.CellId, 3);
            Assert.AreEqual(cell.CellType, "DO");
            Assert.AreEqual(cell.Frequency, overallFrequency, "frequency");
            Assert.AreEqual(cell.Frequency1, overallFrequency == 0 ? -1 : frequency, "frequency1");
            Assert.AreEqual(cell.AntennaGain, overallFrequency != 0 ? antennaGain : 12.8);
            Assert.AreEqual(cell.HasFrequency(frequency), overallFrequency != 0);
        }

        [TestCase(1233, 23, 1234, 37, "DO", 13.6, 1)]
        [TestCase(1253, 23, 2234, 78, "DO", 14.7, 3)]
        [TestCase(1353, 33, 2734, 119, "DO", 12.1, 5)]
        [TestCase(1353, 33, 2734, 160, "1X", 11.3, 9)]
        [TestCase(1353, 33, 2734, 201, "DO", 8.7, 17)]
        [TestCase(1353, 33, 2734, 242, "1X", 9.4, 33)]
        [TestCase(1353, 33, 2734, 283, "DO", 21.1, 65)]
        [TestCase(1353, 33, 2734, 1013, "DO", 13.1, 129)]
        [TestCase(1353, 33, 2734, 120, "DO", 11.7, 1)]
        public void Test_Import_UpdateSecondFrequency(
            int btsId, byte sectorId, int cellId, short frequency, string cellType, double antennaGain,
            short overallFrequency)
        {
            var cell = new CdmaCell
            {
                BtsId = 1,
                SectorId = 2,
                CellId = 3,
                Frequency = 1,
                CellType = "DO",
                AntennaGain = 12.8,
                Frequency1 = 37
            };
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = antennaGain
            };
            cell.Import(cellExcelInfo);
            Assert.AreEqual(cell.BtsId, 1, "btsId");
            Assert.AreEqual(cell.SectorId, 2);
            Assert.AreEqual(cell.CellId, 3);
            Assert.AreEqual(cell.CellType, "DO");
            Assert.AreEqual(cell.Frequency, overallFrequency, "frequency");
            Assert.AreEqual(cell.Frequency1, 37);
            Assert.AreEqual(cell.Frequency2, frequency == 37 || !frequency.IsCdmaFrequency() ? -1 : frequency);
            Assert.AreEqual(cell.AntennaGain, !frequency.IsCdmaFrequency() || frequency == 37 ? 12.8 : antennaGain);
        }

        [TestCase(1233, 23, 1234, 37, "DO", 13.6, 3)]
        [TestCase(1253, 23, 2234, 78, "DO", 14.7, 3)]
        [TestCase(1353, 33, 2734, 119, "DO", 12.1, 7)]
        [TestCase(1353, 33, 2734, 160, "1X", 11.3, 11)]
        [TestCase(1353, 33, 2734, 201, "DO", 8.7, 19)]
        [TestCase(1353, 33, 2734, 242, "1X", 9.4, 35)]
        [TestCase(1353, 33, 2734, 283, "DO", 21.1, 67)]
        [TestCase(1353, 33, 2734, 1013, "DO", 13.1, 131)]
        [TestCase(1353, 33, 2734, 120, "DO", 11.7, 3)]
        public void Test_Import_UpdateThirdFrequency(
            int btsId, byte sectorId, int cellId, short frequency, string cellType, double antennaGain,
            short overallFrequency)
        {
            var cell = new CdmaCell
            {
                BtsId = 1,
                SectorId = 2,
                CellId = 3,
                Frequency = 3,
                CellType = "DO",
                AntennaGain = 12.8,
                Frequency1 = 37,
                Frequency2 = 78
            };
            var cellExcelInfo = new CdmaCellExcel
            {
                BtsId = btsId,
                SectorId = sectorId,
                CellId = cellId,
                Frequency = frequency,
                CellType = cellType,
                AntennaGain = antennaGain
            };
            cell.Import(cellExcelInfo);
            Assert.AreEqual(cell.BtsId, 1, "btsId");
            Assert.AreEqual(cell.SectorId, 2);
            Assert.AreEqual(cell.CellId, 3);
            Assert.AreEqual(cell.CellType, "DO");
            Assert.AreEqual(cell.Frequency, overallFrequency, "frequency");
            Assert.AreEqual(cell.Frequency1, 37);
            Assert.AreEqual(cell.Frequency2, 78);
            Assert.AreEqual(cell.Frequency3, frequency == 37 || frequency == 78 || !frequency.IsCdmaFrequency() ? -1 : frequency);
            Assert.AreEqual(cell.AntennaGain, frequency == 37 || frequency == 78 || !frequency.IsCdmaFrequency() ? 12.8 : antennaGain);
        }
    }
}
