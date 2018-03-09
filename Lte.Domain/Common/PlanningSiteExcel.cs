using System;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class PlanningSiteExcel : IDistrictTown
    {
        [ExcelColumn("����")]
        public string District { get; set; }

        [ExcelColumn("�־�")]
        public string Town { get; set; }

        [ExcelColumn("���")]
        public string PlanNum { get; set; }

        [ExcelColumn("�滮��")]
        public string PlanName { get; set; }

        [ExcelColumn("�������")]
        public string TowerNum { get; set; }

        [ExcelColumn("����վ��")]
        public string TowerName { get; set; }

        [ExcelColumn("���ų�ͼվ��")]
        public string FormalName { get; set; }

        [ExcelColumn("��ע���嵥��Դ��")]
        public string SiteSource { get; set; }

        [ExcelColumn("��������")]
        public string SiteCategory { get; set; }

        [ExcelColumn("����˵��")]
        public string ShouzuShuoming { get; set; }

        [ExcelColumn("�滮����")]
        public double PlanLongtitute { get; set; }

        [ExcelColumn("�滮γ��")]
        public double PlanLattitute { get; set; }

        [ExcelColumn("ѡַ����")]
        public double? FinalLongtitute { get; set; }

        [ExcelColumn("ѡַγ��")]
        public double? FinalLattitute { get; set; }

        public double Longtitute => FinalLongtitute ?? PlanLongtitute;

        public double Lattitute => FinalLattitute ?? PlanLattitute;

        [ExcelColumn("��������")]
        public string TowerType { get; set; }

        [ExcelColumn("���߹Ҹ�")]
        public double? AntennaHeight { get; set; }

        [ExcelColumn("�����깤ʱ��")]
        public DateTime? CompleteDate { get; set; }

        [ExcelColumn("���ս���ʱ��")]
        public DateTime? YanshouDate { get; set; }

        [ExcelColumn("̸��״̬")]
        public string GottenState { get; set; }

        public bool IsGotton => GottenState == "��̸��";

        [ExcelColumn("̸���������")]
        public DateTime? GottenDate { get; set; }

        [ExcelColumn("�����Խ���ϵ�˼���ϵ��ʽ")]
        public string TowerContaction { get; set; }

        [ExcelColumn("��ͬǩ������")]
        public DateTime? ContractDate { get; set; }

        [ExcelColumn("��ͨ����")]
        public DateTime? FinishedDate { get; set; }

        [ExcelColumn("�������·���")]
        public string TowerScheme { get; set; }

        [ExcelColumn("��Ӧ�ṩ�������滮���������̶���")]
        public string TowerSiteName { get; set; }

        [ExcelColumn("�����������")]
        public string AntennaType { get; set; }
    }
}