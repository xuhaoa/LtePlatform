﻿using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System.Globalization;

namespace Lte.Parameters.Entities.Basic
{
    [TypeDoc("定义LTE小区数据库中对应的ORM对象")]
    [AutoMapFrom(typeof(CellExcel))]
    public class Cell : Entity
    {
        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号，目前2.1G取0-15，1.8G取48-63，800M取16-31")]
        public byte SectorId { get; set; }

        [MemberDoc("本地小区编号")]
        public byte LocalSectorId { get; set; }

        [MemberDoc("频点号，目前2.1G主要用100频点，1.8G主要用1825频点，800M主要用2446频点")]
        public int Frequency { get; set; }

        [MemberDoc("频带编号，如1表示2.1G，3表示1.8G，5表示800M")]
        public byte BandClass { get; set; }

        [MemberDoc("物理小区编号，范围0-503")]
        public short Pci { get; set; }

        [MemberDoc("物理随机接入信道序列索引，范围0-839")]
        public short Prach { get; set; }

        [MemberDoc("参考信号(Reference Signal)功率，单位是dBm")]
        public double RsPower { get; set; }

        [AutoMapPropertyResolve("IsIndoor", typeof(CellExcel), typeof(IndoorDescriptionToOutdoorBoolTransform))]
        [MemberDoc("是否为室外小区")]
        public bool IsOutdoor { get; set; }

        [MemberDoc("跟踪区编号")]
        public int Tac { get; set; }

        [MemberDoc("小区经度")]
        public double Longtitute { get; set; }

        [MemberDoc("小区纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("天线挂高，单位米")]
        public double Height { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [MemberDoc("机械下倾")]
        public double MTilt { get; set; }

        [MemberDoc("电子下倾")]
        public double ETilt { get; set; }

        [MemberDoc("天线增益，单位是dB")]
        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("TransmitReceive", typeof(CellExcel), typeof(AntennaPortsConfigureTransform))]
        [MemberDoc("天线收发配置")]
        public AntennaPortsConfigure AntennaPorts { get; set; }

        [MemberDoc("是否在用")]
        public bool IsInUse { get; set; } = true;
    }

    [AutoMapFrom(typeof(CdmaCellExcel))]
    public class CdmaCell : Entity
    {
        public int BtsId { get; set; } = -1;

        public byte SectorId { get; set; } = 31;

        public string CellType { get; set; } = "DO";

        [IgnoreMap]
        public int Frequency { get; set; } = 0;

        public int CellId { get; set; }

        public string Lac { get; set; }

        public short Pn { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Height { get; set; }

        public double MTilt { get; set; }

        public double ETilt { get; set; }

        public double Azimuth { get; set; }

        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("IsIndoor", typeof(CdmaCellExcel), typeof(IndoorDescriptionToOutdoorBoolTransform))]
        public bool IsOutdoor { get; set; }

        public short Frequency1 { get; set; } = -1;

        public short Frequency2 { get; set; } = -1;

        public short Frequency3 { get; set; } = -1;

        public short Frequency4 { get; set; } = -1;

        public short Frequency5 { get; set; } = -1;

        public short Pci { get; set; }

        public double RsPower { get; set; }

        public bool IsInUse { get; set; } = true;

        public static CdmaCell ConstructItem(CdmaCellExcel cellExcelInfo)
        {
            var cell = Mapper.Map<CdmaCellExcel, CdmaCell>(cellExcelInfo);
            cell.Frequency1 = cell.AddFrequency((short)cellExcelInfo.Frequency);
            return cell;
        }

        public void Import(CdmaCellExcel cellExcelInfo)
        {
            var currentFrequency = (short)cellExcelInfo.Frequency;
            if (!currentFrequency.IsCdmaFrequency()) return;

            if (HasFrequency(currentFrequency)) return;
            AntennaGain = cellExcelInfo.AntennaGain;
            if (Frequency1 == -1)
            {
                Frequency1 = AddFrequency(currentFrequency);
            }
            else if (Frequency2 == -1)
            {
                Frequency2 = AddFrequency(currentFrequency);
            }
            else if (Frequency3 == -1)
            {
                Frequency3 = AddFrequency(currentFrequency);
            }
            else if (Frequency4 == -1)
            {
                Frequency4 = AddFrequency(currentFrequency);
            }
            else if (Frequency5 == -1)
            {
                Frequency5 = AddFrequency(currentFrequency);
            }
        }

        public short AddFrequency(int freq)
        {
            switch (freq)
            {
                case 37:
                    Frequency += 1;
                    return 37;
                case 78:
                    Frequency += 2;
                    return 78;
                case 119:
                    Frequency += 4;
                    return 119;
                case 160:
                    Frequency += 8;
                    return 160;
                case 201:
                    Frequency += 16;
                    return 201;
                case 242:
                    Frequency += 32;
                    return 242;
                case 283:
                    Frequency += 64;
                    return 283;
                case 1013:
                    Frequency += 128;
                    return 1013;
                default:
                    return -1;
            }
        }

        public bool HasFrequency(int freq)
        {
            switch (freq)
            {
                case 37:
                    return (Frequency & 1) != 0;
                case 78:
                    return (Frequency & 2) != 0;
                case 119:
                    return (Frequency & 4) != 0;
                case 160:
                    return (Frequency & 8) != 0;
                case 201:
                    return (Frequency & 16) != 0;
                case 242:
                    return (Frequency & 32) != 0;
                case 283:
                    return (Frequency & 64) != 0;
                case 1013:
                    return (Frequency & 128) != 0;
                default:
                    return false;
            }
        }

        public string FrequencyList
        {
            get
            {
                if (Frequency1 == -1) { return "空"; }
                var result = Frequency1.ToString(CultureInfo.InvariantCulture);
                if (Frequency2 == -1) { return result; }
                result += "&" + Frequency2;
                if (Frequency3 == -1) { return result; }
                result += "&" + Frequency3;
                if (Frequency4 == -1) { return result; }
                result += "&" + Frequency4;
                if (Frequency5 == -1) { return result; }
                result += "&" + Frequency5;
                return result;
            }
        }
    }
}
