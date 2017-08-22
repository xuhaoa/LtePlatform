using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System.Globalization;
using Abp.EntityFramework.Dependency;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Channel;
using MongoDB.Bson;

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

    public class EUtranCellFDDZte : IEntity<ObjectId>, IZteMongo
    {
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public int eNodeB_Id { get; set; }

        public string eNodeB_Name { get; set; }

        public string lastModifedTime { get; set; }

        public string iDate { get; set; }

        public string parentLDN { get; set; }

        public string description { get; set; }

        public int flagSwiMode { get; set; }

        public double latitude { get; set; }

        public int cpMerger { get; set; }

        public int ratTarCarriFre_ratTarCarriFreTDD { get; set; }

        public int siWindowLength { get; set; }

        public int minMCSDl { get; set; }

        public int pullCardJudgeSwitch { get; set; }

        public int radioMode { get; set; }

        public int rlfDelayTime { get; set; }

        public int phsNIInd { get; set; }

        public int tm34T4RSwch { get; set; }

        public int ocs { get; set; }

        public int switchUlPRBRandom { get; set; }

        public int oldCellId { get; set; }

        public int switchForNGbrDrx { get; set; }

        public string pciList { get; set; }

        public string rbInterferenceBitMapUl { get; set; }

        public int bandWidthDl { get; set; }

        public int maxUeRbNumUl { get; set; }

        public int matrixType { get; set; }

        public int cqiExpiredTimer { get; set; }

        public string masterECellEqFun { get; set; }

        public int coMPFlagUl { get; set; }

        public int voIPRLFDelayTime { get; set; }

        public int bfmumimoEnableDl { get; set; }

        public int ratTarCarriFre_ratTarCarriFreUTRATDD { get; set; }

        public int pci { get; set; }

        public string cellReservedForOptUse { get; set; }

        public double cellReferenceSignalPower { get; set; }

        public int maxMCSUl { get; set; }

        public int ratTarCarriFre_ratTarCarriFreUTRAFDD { get; set; }

        public int simuLoadSwchDl { get; set; }

        public int ratTarCarriFre_ratTarCarriFreGERAN { get; set; }

        public int pb { get; set; }

        public int sceneCfg { get; set; }

        public double maximumTransmissionPower { get; set; }

        public string addiFreqBand { get; set; }

        public int maxUeRbNumDl { get; set; }

        public double earfcnDl { get; set; }

        public string reservedByEUtranRelation { get; set; }

        public int eai { get; set; }

        public int ratioShared { get; set; }

        public int phyChCPSel { get; set; }

        public string refECellEquipmentFunction { get; set; }

        public int freqBandInd { get; set; }

        public int csfbMethodofGSM { get; set; }

        public string userLabel { get; set; }

        public string alias { get; set; }

        public int allowedAccessClasses { get; set; }

        public int mumimoEnableUl { get; set; }

        public int csfbMethdofCDMA { get; set; }

        public int sfAssignment { get; set; }

        public int cFI { get; set; }

        public int cceAdaptMod { get; set; }

        public int voLTESwch { get; set; }

        public int cutRbNumDl { get; set; }

        public int rd4ForCoverage { get; set; }

        public int minMCSUl { get; set; }

        public int sampleRateCfg { get; set; }

        public int testState { get; set; }

        public int ceuccuSwitch { get; set; }

        public int loadtestSwitch { get; set; }

        public int cutRbNumUl { get; set; }

        public int cellLocalId { get; set; }

        public string ratioOperatorn { get; set; }

        public int commCCENumDl { get; set; }

        public int qosAdpSwchUL { get; set; }

        public int specialSfPatterns { get; set; }

        public int tac { get; set; }

        public int cellSize { get; set; }

        public string refPlmn { get; set; }

        public int addiSpecEmiss { get; set; }

        public int aggregationUl { get; set; }

        public int switchForGbrDrx { get; set; }

        public int ratTarCarriFre_ratTarCarriFreCMA1xRTT { get; set; }

        public double earfcnUl { get; set; }

        public int avoidFreqOffsetNISwch { get; set; }

        public int ueTransMode { get; set; }

        public int mimoModeSwitch { get; set; }

        public int energySavControl { get; set; }

        public int srsRLFSwitch { get; set; }

        public int cellResvInfo { get; set; }

        public int wimaxCoexistSwitch { get; set; }

        public double longitude { get; set; }

        public int ratTarCarriFre_ratTarCarriFreFDD { get; set; }

        public int maxMCSDl { get; set; }

        public int isCompressed { get; set; }

        public string rbInterferenceBitMapDl { get; set; }

        public double offsetAngle { get; set; }

        public int cellCapaLeveInd { get; set; }

        public int cellRadius { get; set; }

        public int timeAlignTimer { get; set; }

        public int ratTarCarriFre_ratTarCarriFreCMAHRPD { get; set; }

        public int antPort1 { get; set; }

        public int EUtranCellFDD { get; set; }

        public double transmissionPower { get; set; }

        public int glCSSSwch { get; set; }

        public int rbSharMode { get; set; }

        public int rlfSwitch { get; set; }

        public int fullConfigSwch { get; set; }

        public int bandIndicator { get; set; }

        public int ueTransModeTDD { get; set; }

        public int bandWidthUl { get; set; }

        public int antDecRankSwch { get; set; }

        public int adminState { get; set; }

        public int upInterfFreqEffThr { get; set; }

        public int nbrBlackListExist { get; set; }

        public int preScheUEAccessSwitchUl { get; set; }

        public int csfbMethdofUMTS { get; set; }

        public int mimoScenarios { get; set; }

        public int flagSwiModeUl { get; set; }

        public string buildPhyLocation { get; set; }

        public int aggregationDl { get; set; }

        public string addiSpecEmissForAddiFreq { get; set; }

        public int cellRSPortNum { get; set; }

        public int qosAdpSwchDL { get; set; }

        public string supercellFlag { get; set; }

        public int magicRadioSwch { get; set; }

        public int qam64DemSpIndUl { get; set; }

        public int? narrowInterferenceSwch { get; set; }

        public string reservedPara10 { get; set; }

        public string reservedPara9 { get; set; }

        public string reservedPara8 { get; set; }

        public string reservedPara7 { get; set; }

        public string reservedPara6 { get; set; }

        public string reservedPara5 { get; set; }

        public string reservedPara4 { get; set; }

        public string reservedPara3 { get; set; }

        public string reservedPara2 { get; set; }

        public string reservedPara1 { get; set; }

        public int? deRohcSch { get; set; }

        public int? bandWidth { get; set; }

        public int? sfBitmapSwchDl { get; set; }

        public int? codeRateSwitchDl { get; set; }

        public string relatedCellLocalId { get; set; }

        public int? codeRateSwitchUl { get; set; }

        public int? magicRadioULDCESwch { get; set; }

        public int? narrowInterferenceLen { get; set; }

        public int? sfBitmapSwchUl { get; set; }

        public int? switchDlPRBRandom { get; set; }

        public int? hiterThreshold { get; set; }

        public int? pucchDTXThre { get; set; }

        public int? prachSupFarCoverSwch { get; set; }

        public string refSignalResCfg { get; set; }

        public int? mbsfnSyncAreaID { get; set; }

        public int? mbmsCCEAdaptMod { get; set; }

        public int? cfiNotSameSwitch { get; set; }

        public int? bfRbExpandSwch { get; set; }

        public int? qamSwch { get; set; }

        public int? forbidRbNum4NStandBWDl { get; set; }

        public int? atmosphericSwch { get; set; }

        public int? earfcn { get; set; }
    }

    public class CellPower
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double RsPower { get; set; }

        public int Pa { get; set; }

        public int Pb { get; set; }

        public CellPower(EUtranCellFDDZte cellFdd, PowerControlDLZte pcDl)
        {
            ENodebId = cellFdd.eNodeB_Id;
            RsPower = cellFdd.cellReferenceSignalPower;
            Pb = cellFdd.pb;
            Pa = pcDl.paForDTCH;
        }

        public CellPower(PDSCHCfg cfg, CellDlpcPdschPa paCfg)
        {
            ENodebId = cfg.eNodeB_Id;
            RsPower = cfg.ReferenceSignalPwr * 0.1;
            Pb = cfg.Pb;
            Pa = paCfg.PaPcOff;
        }

        public CellPower() { }
    }

}
