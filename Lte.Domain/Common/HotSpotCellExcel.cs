using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class HotSpotCellExcel
    {
        [ExcelColumn("�ȵ�����")]
        public string HotSpotTypeDescription { get; set; }

        [ExcelColumn("�ȵ�����")]
        public string HotspotName { get; set; }

        [ExcelColumn("��վ���")]
        public int ENodebId { get; set; }

        [ExcelColumn("С�����")]
        public byte SectorId { get; set; }
    }
}