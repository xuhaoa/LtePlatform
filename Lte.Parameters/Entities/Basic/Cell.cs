using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System.Globalization;
using Lte.Parameters.Abstract.Basic;

namespace Lte.Parameters.Entities.Basic
{
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

    [AutoMapFrom(typeof(CdmaCell))]
    public class CdmaCellView
    {
        public string BtsName { get; set; }

        public int BtsId { get; set; } = -1;

        public byte SectorId { get; set; } = 31;

        public string CellName => BtsName + "-" + SectorId;

        public string CellType { get; set; } = "DO";

        public int Frequency { get; set; } = 0;

        public int CellId { get; set; }

        public string Lac { get; set; }

        public short Pn { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Height { get; set; }

        public double MTilt { get; set; }

        public double ETilt { get; set; }

        public double DownTilt => MTilt + ETilt;

        public double Azimuth { get; set; }

        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(CdmaCell), typeof(OutdoorDescriptionTransform))]
        public string Indoor { get; set; }

        public double RsPower { get; set; }

        public string FrequencyList { get; set; }

        public string OtherInfos => "Cell Type: " + CellType + "; Cell ID: " + CellId + "; LAC: " + Lac + "; PN: " +
                                    Pn + "; Frequency List: " + FrequencyList + "; BtsId: " + BtsId;

        public static CdmaCellView ConstructView(CdmaCell cell, IBtsRepository repository)
        {
            var view = Mapper.Map<CdmaCell, CdmaCellView>(cell);
            var bts = repository.GetByBtsId(cell.BtsId);
            view.BtsName = bts?.Name;
            return view;
        }
    }

    [AutoMapFrom(typeof(CdmaCell))]
    public class CdmaCompoundCellView
    {
        public string BtsName { get; set; }

        public int BtsId { get; set; } = -1;

        public byte SectorId { get; set; } = 31;

        public int CellId { get; set; }

        public string Lac { get; set; }

        public short Pn { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public double Height { get; set; }

        public double MTilt { get; set; }

        public double ETilt { get; set; }

        public double DownTilt => MTilt + ETilt;

        public double Azimuth { get; set; }

        public double AntennaGain { get; set; }

        [AutoMapPropertyResolve("IsOutdoor", typeof(CdmaCell), typeof(OutdoorDescriptionTransform))]
        public string Indoor { get; set; }

        public string OnexFrequencyList { get; set; }

        public string EvdoFrequencyList { get; set; }

        public static CdmaCompoundCellView ConstructView(CdmaCell onexCell, CdmaCell evdoCell, IBtsRepository repository)
        {
            CdmaCompoundCellView view = null;
            if (onexCell != null)
            {
                view = Mapper.Map<CdmaCell, CdmaCompoundCellView>(onexCell);
                view.OnexFrequencyList = onexCell.FrequencyList;
                if (evdoCell != null) view.EvdoFrequencyList = evdoCell.FrequencyList;
            }
            else if (evdoCell != null)
            {
                view = Mapper.Map<CdmaCell, CdmaCompoundCellView>(evdoCell);
                view.EvdoFrequencyList = evdoCell.FrequencyList;
            }

            if (view != null)
            {
                var bts = repository.GetByBtsId(view.BtsId);
                view.BtsName = bts?.Name;
            }

            return view;
        }
    }

    [TypeDoc("扇区视图，用于地理化显示")]
    [AutoMapFrom(typeof(CdmaCellView))]
    public class SectorView
    {
        [MemberDoc("小区名称，用于辨析小区")]
        public string CellName { get; set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("是否为室内小区")]
        public string Indoor { get; set; }

        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("天线挂高")]
        public double Height { get; set; }

        [MemberDoc("下倾角")]
        public double DownTilt { get; set; }

        [MemberDoc("天线增益")]
        public double AntennaGain { get; set; }

        [MemberDoc("频点")]
        public int Frequency { get; set; }

        [MemberDoc("其他信息")]
        public string OtherInfos { get; set; }
    }

}
