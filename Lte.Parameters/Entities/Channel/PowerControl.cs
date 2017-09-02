using System.Linq;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Channel
{
    [TypeDoc("中兴下行功率控制数据结构")]
    public class PowerControlDLZte : IEntity<ObjectId>, IZteMongo
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

        public int paForPCCH { get; set; }

        public int paForBCCH { get; set; }

        public int paForDTCH { get; set; }

        [MemberDoc("PDCCH DCI0的功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF0PwrOfst { get; set; }

        public int[] Dci0PowerOffsets => pdcchF0PwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI1的功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF1PwrOfst { get; set; }

        public int[] Dci1PowerOffsets => pdcchF1PwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI1A功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF1APwrOfst { get; set; }

        public int[] Dci1APowerOffsets => pdcchF1APwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI1B功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF1BPwrOfst { get; set; }

        public int[] Dci1BPowerOffsets => pdcchF1BPwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI1C功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF1CPwrOfst { get; set; }

        public int[] Dci1CPowerOffsets => pdcchF1CPwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI1D功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF1DPwrOfst { get; set; }

        public int[] Dci1DPowerOffsets => pdcchF1DPwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI2功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF2PwrOfst { get; set; }

        public int[] Dci2PowerOffsets => pdcchF2PwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI2A功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF2APwrOfst { get; set; }

        public int[] Dci2APowerOffsets => pdcchF2APwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI3功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF3PwrOfst { get; set; }

        public int[] Dci3PowerOffsets => pdcchF3PwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        [MemberDoc("PDCCH DCI3A功率相对于DTCH_PA的偏差(dB)")]
        public string pdcchF3APwrOfst { get; set; }

        public int[] Dci3APowerOffsets => pdcchF3APwrOfst.GetSplittedFields(',').Select(x => x.ConvertToInt(0)).ToArray();

        public int pdschCLPCSwchDl { get; set; }

        public int paForMSG2 { get; set; }

        public int pcfichPwrOfst { get; set; }

        public int paForCCCH { get; set; }

        public int PowerControlDL { get; set; }

        public int phichPwrOfst { get; set; }

        public int paForDCCH { get; set; }

        public int csiRSPwrOfst { get; set; }

        public int? adjustPwr4CrsCtrl1 { get; set; }

        public int? adjustPwr4CrsCtrl2 { get; set; }

        public int? adjustPwr4PwrCtrl { get; set; }

        public int? adjustPwr4TM3PwrCtrl { get; set; }

        public string mcsThr4PwrCtrl { get; set; }

        public string mcsThres4PwrCtrl { get; set; }

        public double? rbRatioThr4PwrCtrl { get; set; }

        public double? rbRatioThr4CrsCtrl { get; set; }

        public string qamMcsThr4PwrCtrl { get; set; }

        public string qam256MCSThr4PwrCtrl { get; set; }

        public double? cellRBRatioThr4PwrCtrl { get; set; }

        public int? pwrCtlSwchDl { get; set; }

        public int? crsPwrCtlSwch { get; set; }

        public int? uenumThr4CrsCtrl { get; set; }
    }

    public class PowerControlULZte : IEntity<ObjectId>, IZteMongo
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeB_Name { get; set; }

        public string lastModifedTime { get; set; }

        public string iDate { get; set; }

        public string parentLDN { get; set; }

        public string description { get; set; }

        public int pucchTgtPsLwLimt { get; set; }

        public int swithForPHR { get; set; }

        public int p0NominalPUSCH { get; set; }

        public int poUpMax { get; set; }

        public int p0UePucchPub { get; set; }

        public int switchForDCI3A3Pucch { get; set; }

        public int puschCLPCSwitch { get; set; }

        public int ueTransMcsTarget { get; set; }

        public int powerOffsetOfSRS { get; set; }

        public int deltaFPucchFormat1 { get; set; }

        public int deltaFPucchFormat2a { get; set; }

        public int deltaFPucchFormat1b { get; set; }

        public int deltaPreambleMsg3 { get; set; }

        public int lenofNIWindow { get; set; }

        public int deltaFPucchFormat2b { get; set; }

        public int pucchTgtPsHiLimt { get; set; }

        public int rsrpPeriodMeasSwitchDl { get; set; }

        public int alpha { get; set; }

        public int oiSwitchOfClosePc { get; set; }

        public int ks { get; set; }

        public int deltaMsg3 { get; set; }

        public int p0UePusch1Pub { get; set; }

        public int poNominalPUCCH { get; set; }

        public int dCI3A3SelPusch { get; set; }

        public int puschPCAdjType { get; set; }

        public int dCI3A3SelPucch { get; set; }

        public int poDownMax { get; set; }

        public int rsrpEventMeasSwitchDl { get; set; }

        public int poNominalPUSCH1 { get; set; }

        public int filterCoeffRSRP { get; set; }

        public int switchForCLPCofPUCCH { get; set; }

        public int targetIOT { get; set; }

        public int deltaFPucchFormat2 { get; set; }

        public int PowerControlUL { get; set; }

        public int switchForDCI3A3Pusch { get; set; }

        public int switchForCLPCofPUSCH { get; set; }

        public int ueTransPowerCeiling { get; set; }

        public int? deltaFPucchFormat1bCS { get; set; }

        public int? deltaFPucchFormat3 { get; set; }

        public int? tarSinrPucchUl { get; set; }

        public int? fiMarginforMU { get; set; }

        public int? deltaFiMarginforVoLTE { get; set; }

        public int? fiMarginfor64Qam { get; set; }

        public int? puschPwrFiUpMargin { get; set; }

        public int? puschPwrNiThr { get; set; }

        public int? pucchFmt2InPowCtrlSwch { get; set; }

        public double? targetBler4A0 { get; set; }

        public double? targetBler4A1 { get; set; }

        public double? targetBler4A2 { get; set; }

        public int? deltaPL { get; set; }

        public int? phrThpThrInAtmosduct { get; set; }

        public int? difofPucchPsandNi { get; set; }

        public int? pmaxforPuschPowCtrl { get; set; }

        public int? pucchPsTargetAdapSwch { get; set; }
    }

    public class ECellEquipmentFunctionZte : IEntity<ObjectId>, IZteMongo
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

        public string supercellFlag { get; set; }

        public int antMapUl { get; set; }

        public int antMapDl { get; set; }

        public string refRfDevice { get; set; }

        public int insPortCmpModDl { get; set; }

        public string ref1SdrDeviceGroup { get; set; }

        public string anttoPortMap { get; set; }

        public int ECellEquipmentFunction { get; set; }

        public int aasTiltUl { get; set; }

        public int bplType { get; set; }

        public int cpTransTime { get; set; }

        public double cpTransPwr { get; set; }

        public string reservedByEUtranCellFDD { get; set; }

        public int dlTransInd { get; set; }

        public double cpSpeRefSigPwr { get; set; }

        public string refSdrDeviceGroup { get; set; }

        public int rfAppMode { get; set; }

        public double maxCPTransPwr { get; set; }

        public int bplPort { get; set; }

        public int adminState { get; set; }

        public int aasTiltDl { get; set; }

        public int upActAntBitmap { get; set; }

        public int rruCarrierNo { get; set; }

        public int dynBaseBandPoolSwch { get; set; }

        public string refBpDevice { get; set; }

        public int cellMod { get; set; }

        public int slaveRRUFlag { get; set; }

        public int cpId { get; set; }
    }

    [TypeDoc("华为上行控制参数")]
    public class CellUlpcComm : IEntity<ObjectId>, IHuaweiCellMongo
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string iDate { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeBId_Name { get; set; }

        [MemberDoc("消息2功率偏置, 该参数为上行随机接入过程中的Msg3的功率偏置值，该参数也用于控制PUSCH/PUCCH的闭环功控累积量初始值。该参数仅适用于TDD。")]
        public int DeltaMsg2 { get; set; }

        [MemberDoc("PUCCH格式2b的偏置，该参数表示PUCCH格式2b的Delta值。参数的使用细节请参见3GPP TS 36.213。")]
        public int DeltaFPUCCHFormat2b { get; set; }

        [MemberDoc("PUSCH标称P0值：该参数表示PUSCH的标称P0值，应用于上行功控过程，参数的使用细节请参见3GPP TS 36.213。")]
        public int P0NominalPUSCH { get; set; }

        [MemberDoc("PUCCH格式2a的偏置：该参数表示PUCCH格式2a的Delta值。参数的使用细节请参见3GPP TS 36.213。")]
        public int DeltaFPUCCHFormat2a { get; set; }

        [MemberDoc("消息3相对前导的功率偏置：该参数表示消息3的前导Delta值，步长为2。参数的使用细节请参见3GPP TS 36.213。")]
        public int DeltaPreambleMsg3 { get; set; }

        [MemberDoc("PUCCH格式1b的偏置：该参数表示PUCCH格式1b的Delta值。参数的使用细节请参见3GPP TS 36.213。")]
        public int DeltaFPUCCHFormat1b { get; set; }

        [MemberDoc("PUCCH标称P0值：该参数表示正常进行PUCCH解调，eNodeB所期望的PUCCH发射功率水平。参数的使用细节请参见3GPP TS 36.213。")]
        public int P0NominalPUCCH { get; set; }

        [MemberDoc("PUCCH格式1的偏置：该参数表示PUCCH格式1的Delta值。参数的使用细节请参见3GPP TS 36.213。")]
        public int DeltaFPUCCHFormat1 { get; set; }

        [MemberDoc("路径损耗因子：该参数表示路径损耗补偿因子，应用于上行功控过程，参数的使用细节请参见3GPP TS 36.213。")]
        public int PassLossCoeff { get; set; }

        [MemberDoc("PUCCH格式2的偏置：该参数表示PUCCH格式2的Delta值。参数的使用细节请参见3GPP TS 36.213。")]
        public int DeltaFPUCCHFormat2 { get; set; }

        public int LocalCellId { get; set; }
    }

    [AutoMapFrom(typeof(CellUlpcComm), typeof(PowerControlULZte))]
    public class CellOpenLoopPcView
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        [AutoMapPropertyResolve("p0NominalPUSCH", typeof(PowerControlULZte))]
        public int P0NominalPUSCH { get; set; }

        [AutoMapPropertyResolve("poNominalPUCCH", typeof(PowerControlULZte))]
        public int P0NominalPUCCH { get; set; }

        [AutoMapPropertyResolve("alpha", typeof(PowerControlULZte))]
        public int PassLossCoeff { get; set; }

        [AutoMapPropertyResolve("deltaMsg3", typeof(PowerControlULZte))]
        public int DeltaMsg2 { get; set; }

        [AutoMapPropertyResolve("deltaFPucchFormat2b", typeof(PowerControlULZte))]
        public int DeltaFPUCCHFormat2b { get; set; }

        [AutoMapPropertyResolve("deltaFPucchFormat2a", typeof(PowerControlULZte))]
        public int DeltaFPUCCHFormat2a { get; set; }

        [AutoMapPropertyResolve("deltaPreambleMsg3", typeof(PowerControlULZte))]
        public int DeltaPreambleMsg3 { get; set; }

        [AutoMapPropertyResolve("deltaFPucchFormat1b", typeof(PowerControlULZte))]
        public int DeltaFPUCCHFormat1b { get; set; }

        [AutoMapPropertyResolve("deltaFPucchFormat1", typeof(PowerControlULZte))]
        public int DeltaFPUCCHFormat1 { get; set; }

        [AutoMapPropertyResolve("deltaFPucchFormat2", typeof(PowerControlULZte))]
        public int DeltaFPUCCHFormat2 { get; set; }
    }
}
