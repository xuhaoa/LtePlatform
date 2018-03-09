using System;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class TopDrop2GCellExcel
    {
        [ExcelColumn("����")]
        public string City { get; set; }

        [ExcelColumn("����")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("ʱ")]
        public int StatHour { get; set; }

        public DateTime StatTime => StatDate.AddHours(StatHour);

        [ExcelColumn("վ��")]
        public int BtsId { get; set; }

        [ExcelColumn("����")]
        public byte SectorId { get; set; }

        [ExcelColumn("�ز�")]
        public short Frequency { get; set; }

        [ExcelColumn("������")]
        public string CellName { get; set; }

        [ExcelColumn("ҵ���ŵ���������")]
        public int Drops { get; set; }

        [ExcelColumn("����ҵ���ŵ�����ɹ�����")]
        public int MoAssignmentSuccess { get; set; }

        [ExcelColumn("����ҵ���ŵ�����ɹ�����")]
        public int MtAssignmentSuccess { get; set; }

        [ExcelColumn("ҵ���ŵ�����ɹ�����")]
        public int TrafficAssignmentSuccess { get; set; }

        [ExcelColumn("���г����ܴ���")]
        public int CallAttempts { get; set; }

        public static string SheetName { get; } = "����TOP30С��";
    }
}