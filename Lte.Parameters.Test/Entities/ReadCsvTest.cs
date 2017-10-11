using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Parameters.Entities.Dt;

namespace Lte.Parameters.Test.Entities
{
    [TestFixture]
    public class ReadNeighborCellCsvTest
    {
        [Test]
        public void Test_HuaweiFile()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "NeighborCellHw.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<NeighborCellHwCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count, 999);
        }

        [Test]
        public void Test_HuaweiFile_Merge()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "NeighborCellHw.csv");

            var reader = new StreamReader(path);
            var infos = NeighborCellHwCsv.ReadNeighborCellHwCsvs(reader);
            Assert.AreEqual(infos.Count, 7);
        }

        [Test]
        public void Test_ZteFile1()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "NeighborCellZte1.csv");

            var reader = new StreamReader(path, Encoding.GetEncoding("GB2312"));
            var infos = CsvContext.Read<NeighborCellZteCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count, 1);
        }

        [Test]
        public void Test_ZteFile()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "NeighborCellZte.csv");

            var reader = new StreamReader(path, Encoding.GetEncoding("GB2312"));
            var infos = CsvContext.Read<NeighborCellZteCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count, 998);
        }

        [Test]
        public void Test_ZteFile_Merge()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "NeighborCellZte.csv");

            var reader = new StreamReader(path, Encoding.GetEncoding("GB2312"));
            var infos = NeighborCellZteCsv.ReadNeighborCellZteCsvs(reader);
            Assert.AreEqual(infos.Count, 998);
        }

    }

    [TestFixture]
    public class ReadFileRecordCsvTest
    {
        [OneTimeSetUp]
        public void Ts()
        {
            Mapper.Initialize(cfg=>cfg.CreateMap<FileRecord3GCsv, FileRecord3G>());
        }

        [Test]
        public void Test_Read_2G()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "CDMA_20140114_禅城区_城区_短呼_姚华海_高基街_2.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord2GCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count, 610);
            Assert.AreEqual(((double?)null).ToString(), "");
            var legalInfos =
                infos.Where(x => x.Longtitute != null && x.Lattitute != null && x.RxAgc != null && x.EcIo != null);
            Assert.AreEqual(legalInfos.Count(), 212);
        }

        [Test]
        public void Test_Read_3G()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "CDMA_20140114_禅城区_城区_短呼_姚华海_高基街_4.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord3GCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count, 2564);
            var legalInfos =
                infos.Where(
                    x =>
                        x.Longtitute != null && x.Lattitute != null && x.Pn != null);
            Assert.AreEqual(legalInfos.Count(), 1017);
            var pnStats = legalInfos.MapTo<List<FileRecord3G>>();
            Assert.AreEqual(pnStats[0].Pn, 282);
        }

        [Test]
        public void Test_Actual_2G()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "CDMA_20140114_禅城区_城区_短呼_姚华海_高基街_2.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord2GCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            var filterInfos =
                infos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            Assert.AreEqual(filterInfos.Count, 599);
            var pnInfos = infos.Where(x => x.Pn != null).ToList();
            Assert.AreEqual(pnInfos.Count, 90);
            Assert.AreEqual(pnInfos[0].Pn,282);
            Assert.AreEqual(pnInfos[1].Pn,282);
            Assert.AreEqual(pnInfos[33].Pn,140);
            var stats = filterInfos.MergeRecordList();
            Assert.AreEqual(stats.Count, 11);
            Assert.AreEqual(stats[0].Count, 11);
            Assert.AreEqual(stats[0][0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"), "2014-1-14 14:39:39.999");
            Assert.AreEqual(stats[10][0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"), "2014-1-14 14:41:40.319");
            var subRecords = stats[0].MergeSubRecords((subList, lon, lat) => new FileRecord2G
            {
                Longtitute = lon,
                Lattitute = lat,
                Pn = (short?)subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                RxAgc = subList.Where(x => x.RxAgc != null).Average(x => x.RxAgc),
                TxAgc = subList.Where(x => x.TxAgc != null).Average(x => x.TxAgc),
                TestTimeString = subList[0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"),
                TxGain = subList.Where(x => x.TxGain != null).Average(x => x.TxGain),
                TxPower = subList.Where(x => x.TxPower != null).Average(x => x.TxPower)
            }, (csv, stat) =>
            {
                if (csv.RxAgc != null) stat.RxAgc = csv.RxAgc;
                if (csv.TxAgc != null) stat.TxAgc = csv.TxAgc;
                if (csv.EcIo != null) stat.Ecio = csv.EcIo;
                return stat.RxAgc != null && stat.TxAgc != null && stat.Ecio != null;
            });
            Assert.AreEqual(subRecords.Count(), 1);
            Assert.AreEqual(stats[1].Count, 190);
            subRecords = stats[1].MergeSubRecords((subList, lon, lat) => new FileRecord2G
            {
                Longtitute = lon,
                Lattitute = lat,
                Pn = (short?)subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                RxAgc = subList.Where(x => x.RxAgc != null).Average(x => x.RxAgc),
                TxAgc = subList.Where(x => x.TxAgc != null).Average(x => x.TxAgc),
                TestTimeString = subList[0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"),
                TxGain = subList.Where(x => x.TxGain != null).Average(x => x.TxGain),
                TxPower = subList.Where(x => x.TxPower != null).Average(x => x.TxPower)
            }, (csv, stat) =>
            {
                if (csv.RxAgc != null) stat.RxAgc = csv.RxAgc;
                if (csv.TxAgc != null) stat.TxAgc = csv.TxAgc;
                if (csv.EcIo != null) stat.Ecio = csv.EcIo;
                return stat.RxAgc != null && stat.TxAgc != null && stat.Ecio != null;
            });
            Assert.AreEqual(subRecords.Count(), 1);
            Assert.AreEqual(stats[2].Count, 7);
            subRecords = stats[2].MergeSubRecords((subList, lon, lat) => new FileRecord2G
            {
                Longtitute = lon,
                Lattitute = lat,
                Pn = (short?)subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                RxAgc = subList.Where(x => x.RxAgc != null).Average(x => x.RxAgc),
                TxAgc = subList.Where(x => x.TxAgc != null).Average(x => x.TxAgc),
                TestTimeString = subList[0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"),
                TxGain = subList.Where(x => x.TxGain != null).Average(x => x.TxGain),
                TxPower = subList.Where(x => x.TxPower != null).Average(x => x.TxPower)
            }, (csv, stat) =>
            {
                if (csv.RxAgc != null) stat.RxAgc = csv.RxAgc;
                if (csv.TxAgc != null) stat.TxAgc = csv.TxAgc;
                if (csv.EcIo != null) stat.Ecio = csv.EcIo;
                return stat.RxAgc != null && stat.TxAgc != null && stat.Ecio != null;
            });
            Assert.AreEqual(subRecords.Count(), 1);
            Assert.AreEqual(stats[3].Count, 20);
            subRecords = stats[3].MergeSubRecords((subList, lon, lat) => new FileRecord2G
            {
                Longtitute = lon,
                Lattitute = lat,
                Pn = (short?)subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                RxAgc = subList.Where(x => x.RxAgc != null).Average(x => x.RxAgc),
                TxAgc = subList.Where(x => x.TxAgc != null).Average(x => x.TxAgc),
                TestTimeString = subList[0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"),
                TxGain = subList.Where(x => x.TxGain != null).Average(x => x.TxGain),
                TxPower = subList.Where(x => x.TxPower != null).Average(x => x.TxPower)
            }, (csv, stat) =>
            {
                if (csv.RxAgc != null) stat.RxAgc = csv.RxAgc;
                if (csv.TxAgc != null) stat.TxAgc = csv.TxAgc;
                if (csv.EcIo != null) stat.Ecio = csv.EcIo;
                return stat.RxAgc != null && stat.TxAgc != null && stat.Ecio != null;
            });
            Assert.AreEqual(subRecords.Count(), 1);
            Assert.AreEqual(stats[4].Count, 63);
        }

        [Test]
        public void Test_Merge_2G()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "CDMA_20140114_禅城区_城区_短呼_姚华海_高基街_2.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord2GCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            var filterInfos =
                infos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            var stats = filterInfos.MergeRecords();
            Assert.AreEqual(stats.Count, 121);
            Assert.AreEqual(stats[0].TestTimeString, "2014-1-14 14:39:39.999");
            Assert.AreEqual(stats[0].GenerateInsertSql("CDMA_0601-110248锦龙医药dt_2_All"),
                "INSERT INTO [CDMA_0601-110248锦龙医药dt_2_All] ( [rasterNum],[testTime],[lon],[lat],[refPN],[EcIo],[rxAGC],[txAGC],[txPower],[txGain]) VALUES(4649,'2014-1-14 14:39:39.999',113.108658666667,23.0380863333333,282,-7.04,-71.58,NULL,NULL,NULL)");
            Assert.AreEqual(stats[0].RxAgc ?? 0, -71.58, 1e-6);
            Assert.AreEqual(stats[0].Ecio ?? 0, -7.04, 1e-6);
            Assert.AreEqual(stats[0].TxAgc, null);
            Assert.AreEqual(stats[0].Pn, 282);
            Assert.AreEqual(stats[0].RasterNum, 4649);
            Assert.AreEqual(stats[1].TestTimeString, "2014-1-14 14:39:42.559");
            Assert.AreEqual(stats[1].RxAgc ?? 0, -69.91, 1e-6);
            Assert.AreEqual(stats[1].Ecio ?? 0, -7.12, 1e-6);
            Assert.AreEqual(stats[0].TxAgc, null);
            Assert.AreEqual(stats[0].Pn, 282);
            Assert.AreEqual(stats[2].TestTimeString, "2014-1-14 14:39:45.119");
            Assert.AreEqual(stats[3].TestTimeString, "2014-1-14 14:39:47.680");
        }

        [Test]
        public void Test_Merge_4G()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "桂城城区_南海区_PBM20151110205026.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord4GCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            var filterInfos =
                infos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            var stats = filterInfos.MergeRecords(new DateTime(2017, 4, 3));
            Assert.AreEqual(stats.Count, 759);
            Assert.AreEqual(stats[0].TestTimeString, "2017-4-3 00:00:00.000");
        }

        [Test]
        public void Test_Merge_4G_3()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "Z20170710_112329.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord4GCsv>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count, 14122);
            var zteInfos =
                CsvContext.Read<FileRecord4GZte>(reader, CsvFileDescription.CommaDescription)
                    .ToList();
            var filterInfos =
                zteInfos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            Assert.AreEqual(zteInfos.Count, 14122);
        }

        [Test]
        public void Test_Merge_4G_4()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "20170701-优化前-上传.csv");

            var reader = new StreamReader(path);
            var zteInfos =
                CsvContext.Read<FileRecord4GHuawei>(reader, CsvFileDescription.CommaDescription)
                    .ToList();
            var filterInfos =
                zteInfos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            Assert.AreEqual(zteInfos.Count, 17375);
            Assert.AreEqual(filterInfos.Count, 17372);
            Assert.IsNotNull(filterInfos.FirstOrDefault(x => x.Rsrp != null));
        }

        [Test]
        public void Test_Merge_4G_Dingli()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "佰德广场卜蜂莲花室外4G-1_0712-153103660_UE1_port1_0815110103.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord4GDingli>(reader, CsvFileDescription.CommaDescription).ToList();
            var filterInfos =
                infos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            var stats = filterInfos.MergeRecords();
            Assert.AreEqual(stats.Count, 143);
            Assert.AreEqual(stats[0].TestTimeString, "2017-7-12 15:31:28.970");
            Assert.AreEqual((double)stats[1].Rsrp, -85.859247311828, 1e-6);
            Assert.AreEqual((double)stats[1].Sinr, 3.7878064516129029, 1e-6);
            Assert.AreEqual((double)stats[2].Rsrp, -91.965, 1e-6);
            Assert.AreEqual((double)stats[2].Sinr, 2.2245, 1e-6);
            Assert.AreEqual((double)stats[3].Rsrp, -92.06, 1e-6);
            Assert.AreEqual((double)stats[3].Sinr, 0.6, 1e-6);
            Assert.AreEqual((double)stats[3].PdcpThroughputDl, 9578.875, 1e-6);
            Assert.AreEqual((double)stats[6].PdcpThroughputDl, 24741.0078125, 1e-6);
        }

        [Test]
        public void Test_Merge_4G_Dingli_2()
        {
            var testDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var csvFilesDirectory = Path.Combine(testDirectory, "CsvFiles");
            var path = Path.Combine(csvFilesDirectory, "徐工集团4G室外-01_0706-151838135_UE1_port1_0814090333.csv");

            var reader = new StreamReader(path);
            var infos = CsvContext.Read<FileRecord4GDingli>(reader, CsvFileDescription.CommaDescription).ToList();
            Assert.AreEqual(infos.Count,736);
            var filterInfos =
                infos.Where(x => x.Longtitute != null && x.Lattitute != null).ToList();
            var stats = filterInfos.MergeRecords();
            Assert.AreEqual(stats.Count, 145);
        }

        [Test]
        public void BasicTest()
        {
            var list = new List<FileRecord2GCsv>();
            var result = list.Average(x => x.RxAgc);
            Assert.IsNull(result);
        }
    }
}
