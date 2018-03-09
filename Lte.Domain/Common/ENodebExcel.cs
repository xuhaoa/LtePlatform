using System;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    [TypeDoc("�����¼LTE��վ����Ϣ��Excel����������")]
    public class ENodebExcel
    {
        [ExcelColumn("eNodeBName")]
        [MemberDoc("��վ����")]
        public string Name { get; set; }

        [ExcelColumn("����")]
        [MemberDoc("����")]
        public string DistrictName { get; set; }

        [ExcelColumn("����")]
        [MemberDoc("����")]
        public string TownName { get; set; }

        [ExcelColumn("����")]
        [MemberDoc("����")]
        public double Longtitute { get; set; }

        [ExcelColumn("γ��")]
        [MemberDoc("γ��")]
        public double Lattitute { get; set; }

        [ExcelColumn("��ַ")]
        [MemberDoc("��ַ")]
        public string Address { get; set; }

        [ExcelColumn("����")]
        [MemberDoc("����")]
        public string CityName { get; set; }

        [ExcelColumn("����")]
        [MemberDoc("����")]
        public string Grid { get; set; }

        [ExcelColumn("����")]
        [MemberDoc("����")]
        public string Factory { get; set; }

        [ExcelColumn("IP", TransformEnum.IpAddress)]
        [MemberDoc("IP")]
        public IpAddress Ip { get; set; } = new IpAddress("0.0.0.0");

        [ExcelColumn("eNodeB ID")]
        [MemberDoc("eNodeB ID")]
        public int ENodebId { get; set; }

        [MemberDoc("IP��ַ�ַ���")]
        public string IpString => Ip.AddressString;

        [ExcelColumn("����", TransformEnum.IpAddress)]
        [MemberDoc("����")]
        public IpAddress GatewayIp { get; set; } = new IpAddress("0.0.0.0");

        [MemberDoc("���ص�ַ�ַ���")]
        public string GatewayString => GatewayIp.AddressString;

        [ExcelColumn("�滮���(���Ժ)")]
        [MemberDoc("�滮���(���Ժ)")]
        public string PlanNum { get; set; }

        [ExcelColumn("��ʽ")]
        [MemberDoc("��ʽ")]
        public string DivisionDuplex { get; set; } = "FDD";

        [ExcelColumn("��������", TransformEnum.DefaultOpenDate)]
        [MemberDoc("��������")]
        public DateTime OpenDate { get; set; }
    }
}