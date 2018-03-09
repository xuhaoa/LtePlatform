using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    [TypeDoc("�����¼CDMA��վ��Ϣ��Excel�����������Ҫ������CdmaBts֮���ӳ���ϵ��")]
    public class BtsExcel
    {
        [ExcelColumn("��վ����")]
        public string Name { get; set; }

        [ExcelColumn("��������")]
        public string DistrictName { get; set; }

        [ExcelColumn("��������")]
        public string TownName { get; set; }

        [ExcelColumn("����")]
        public double Longtitute { get; set; }

        [ExcelColumn("γ��")]
        public double Lattitute { get; set; }

        [ExcelColumn("��ַ", TransformEnum.AntiNullAddress)]
        public string Address { get; set; }

        [ExcelColumn("��վ���")]
        public int BtsId { get; set; }

        [ExcelColumn("BSC���")]
        public short BscId { get; set; }
    }
}