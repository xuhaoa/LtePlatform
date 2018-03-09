using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    [TypeDoc("�����¼LTEС������Ϣ��Excel����������")]
    public class CellExcel
    {
        [ExcelColumn("CELL_ID", TransformEnum.ByteRemoveQuotions)]
        public byte SectorId { get; set; }

        [ExcelColumn("FSL���")]
        public string PlanNum { get; set; }

        [ExcelColumn("SectorID")]
        public byte LocalSectorId { get; set; }

        [ExcelColumn("Ƶ��")]
        public int Frequency { get; set; }

        [ExcelColumn("��Զ����")]
        public string RruName { get; set; }

        [ExcelColumn("�Ƿ���ҷ�")]
        public string IsIndoor { get; set; } = "��";

        [ExcelColumn("����")]
        public double Longtitute { get; set; }

        [ExcelColumn("γ��")]
        public double Lattitute { get; set; }

        [ExcelColumn("���߹Ҹ�")]
        public double Height { get; set; }

        [ExcelColumn("��е�����")]
        public double MTilt { get; set; }

        [ExcelColumn("�������")]
        public double ETilt { get; set; }

        [ExcelColumn("��λ��")]
        public double Azimuth { get; set; }

        [ExcelColumn("��������")]
        public double AntennaGain { get; set; }

        [ExcelColumn("eNodeB ID", TransformEnum.IntegerRemoveQuotions)]
        public int ENodebId { get; set; }

        [ExcelColumn("Ƶ�κ�")]
        public byte BandClass { get; set; }

        [ExcelColumn("������Ϣ")]
        public string AntennaInfo { get; set; }

        [ExcelColumn("�շ�����")]
        public string TransmitReceive { get; set; }

        [ExcelColumn("��������Ϣ")]
        public string ShareCdmaInfo { get; set; }

        [ExcelColumn("PCI")]
        public short Pci { get; set; }

        [ExcelColumn("����������")]
        public short Prach { get; set; }

        [ExcelColumn("TAC")]
        public int Tac { get; set; }

        [ExcelColumn("�ο��źŹ���")]
        public double RsPower { get; set; }

        [ExcelColumn("C����վС��ID")]
        public string CdmaCellId { get; set; }

        [ExcelColumn("���߳���")]
        public string AntennaFactoryString { get; set; }

        [ExcelColumn("�����ͺ�")]
        public string AntennaModel { get; set; }

        [ExcelColumn("�ܷ���")]
        public string CanBeETiltDescription { get; set; }

        [ExcelColumn("�Ƿ�����")]
        public string IsBeautifyDescription { get; set; }

        [ExcelColumn("�Ƿ�CA")]
        public string IsCaDescription { get; set; }
    }
}