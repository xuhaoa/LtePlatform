using System;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class CdmaRegionStatExcel
    {
        [ExcelColumn("����")]
        public string Region { get; set; }

        [ExcelColumn("����")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("2Gȫ�컰�������л�")]
        public double ErlangIncludingSwitch { get; set; }

        [ExcelColumn("2Gȫ�컰���������л�")]
        public double ErlangExcludingSwitch { get; set; }

        [ExcelColumn("��������")]
        public int Drop2GNum { get; set; }

        [ExcelColumn("������ĸ")]
        public int Drop2GDem { get; set; }

        [ExcelColumn("��������")]
        public int CallSetupNum { get; set; }

        [ExcelColumn("������ĸ")]
        public int CallSetupDem { get; set; }

        [ExcelColumn("EcIo����")]
        public long EcioNum { get; set; }

        [ExcelColumn("EcIo��ĸ")]
        public long EcioDem { get; set; }

        [ExcelColumn("2G�����ʷ���")]
        public int Utility2GNum { get; set; }

        [ExcelColumn("2G�����ʷ�ĸ")]
        public int Utility2GDem { get; set; }

        [ExcelColumn("ȫ������MB")]
        public double Flow { get; set; }

        [ExcelColumn("DOȫ�컰����erl")]
        public double Erlang3G { get; set; }

        [ExcelColumn("���߷���")]
        public int Drop3GNum { get; set; }

        [ExcelColumn("���߷�ĸ")]
        public int Drop3GDem { get; set; }

        [ExcelColumn("���ӷ���")]
        public int ConnectionNum { get; set; }

        [ExcelColumn("���ӷ�ĸ")]
        public int ConnectionDem { get; set; }

        [ExcelColumn("CI����")]
        public long CiNum { get; set; }

        [ExcelColumn("CI��ĸ")]
        public long CiDem { get; set; }

        [ExcelColumn("������·��æ�ʷ���")]
        public int LinkBusyNum { get; set; }

        [ExcelColumn("������·��æ�ʷ�ĸ")]
        public int LinkBusyDem { get; set; }

        [ExcelColumn("3G��2G�����ȷ���")]
        public long DownSwitchNum { get; set; }

        [ExcelColumn("3G��2G�����ȷ�ĸ")]
        public int DownSwitchDem { get; set; }

        [ExcelColumn("3G�����ʷ���")]
        public int Utility3GNum { get; set; }

        [ExcelColumn("3G�����ʷ�ĸ_������")]
        public int Utility3GDem { get; set; }
    }
}