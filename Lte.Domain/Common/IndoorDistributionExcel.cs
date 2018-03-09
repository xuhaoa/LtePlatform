using Lte.Domain.Common.Geo;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class IndoorDistributionExcel : IGeoPoint<double>
    {
        [ExcelColumn("վַ���")]
        public string StationNum { get; set; }

        [ExcelColumn("վ��")]
        public string Name { get; set; }

        [ExcelColumn("��ϸ��ַ")]
        public string Address { get; set; }
        
        [ExcelColumn("����")]
        public double Longtitute { get; set; }

        [ExcelColumn("γ��")]
        public double Lattitute { get; set; }

        [ExcelColumn("����")]
        public string City { get; set; }

        [ExcelColumn("��������")]
        public string District { get; set; }

        [ExcelColumn("����������")]
        public string Server { get; set; }

        [ExcelColumn("���������")]
        public string ServiceArea { get; set; }

        [ExcelColumn("ϵͳ����")]
        public string ScaleDescription { get; set; }

        [ExcelColumn("վ�����")]
        public string Owner { get; set; }

        [ExcelColumn("��Դ�豸����")]
        public byte SourceAppliances { get; set; }

        [ExcelColumn("����΢��վ����")]
        public byte OutdoorPicos { get; set; }

        [ExcelColumn("����ֱ��վ����")]
        public byte OutdoorRepeaters { get; set; }

        [ExcelColumn("����RRU��Զ����")]
        public byte OutdoorRrus { get; set; }

        [ExcelColumn("�ҷ���Դ΢��վ����")]
        public byte IndoorPicos { get; set; }

        [ExcelColumn("�ҷ���Դֱ��վ����")]
        public byte IndoorRepeaters { get; set; }

        [ExcelColumn("�ҷ���ԴRRU��Զ����")]
        public byte IndoorRrus { get; set; }

        [ExcelColumn("�ҷָɷ�����")]
        public byte Amplifiers { get; set; }

        [ExcelColumn("L����վ���")]
        public int ENodebId { get; set; }

        [ExcelColumn("L���������")]
        public byte LteSectorId { get; set; }

        [ExcelColumn("C����վ���")]
        public int BtsId { get; set; }

        [ExcelColumn("C���������")]
        public byte CdmaSectorId { get; set; }
    }
}