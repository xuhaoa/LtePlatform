using System;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class TopConnection3GCellExcel
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

        [ExcelColumn("���ߵ��ߴ���")]
        public int WirelessDrop { get; set; }

        [ExcelColumn("���ӳ��Դ���")]
        public int ConnectionAttempts { get; set; }

        [ExcelColumn("����ʧ�ܴ���")]
        public int ConnectionFails { get; set; }

        [ExcelColumn("������·��æ��")]
        public double LinkBusyRate { get; set; }

        public static string SheetName { get; } = "����TOP30С��";
    }
}