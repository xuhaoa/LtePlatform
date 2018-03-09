using System;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class ComplainExcel : IBeginDate
    {
        [ExcelColumn("�������")]
        public string SerialNumber { get; set; }

        [ExcelColumn("��������")]
        public string SelfDistrict { get; set; }

        public string District
            =>
                string.IsNullOrEmpty(SelfDistrict)
                    ? (string.IsNullOrEmpty(Grid)
                        ? (string.IsNullOrEmpty(CandidateDistrict) ? "" : CandidateDistrict.Replace("��", ""))
                        : Grid.Replace("FS", ""))
                    : SelfDistrict;

        [ExcelColumn("��Ʒ����")]
        public string ProductType { get; set; }

        [ExcelColumn("�������")]
        public string ServiceType { get; set; }

        public string[] ServiceTypeFields => ServiceType.GetSplittedFields('-');

        public string ServiceType1 => ServiceTypeFields.Length > 0 ? ServiceTypeFields[0] : "";

        public string ServiceType2 => ServiceTypeFields.Length > 1 ? ServiceTypeFields[1] : "";

        public string ServiceType3 => ServiceTypeFields.Length > 2 ? ServiceTypeFields[2] : "";

        [ExcelColumn("����״̬")]
        public string StateDescription { get; set; }

        [ExcelColumn("�ͻ��绰")]
        public string SubscriberPhone { get; set; }

        [ExcelColumn("�ظ�����")]
        public byte? RepeatTimes { get; set; }

        [ExcelColumn("�����̶�")]
        public string UrgentDescription { get; set; }

        public bool IsUrgent => UrgentDescription == "����";

        [ExcelColumn("������Դ")]
        public string ComplainSource { get; set; }

        [ExcelColumn("������")]
        public string City { get; set; }

        [ExcelColumn("�ͻ�����")]
        public string SubscriberInfo { get; set; }

        [ExcelColumn("��ϵ�绰1")]
        public string ContactPhone { get; set; }

        [ExcelColumn("��ϵ��")]
        public string ContactPerson { get; set; }

        [ExcelColumn("��ϵ��ַ")]
        public string ContactAddress { get; set; }

        [ExcelColumn("��������")]
        public string ComplainContents { get; set; }

        [ExcelColumn("����ʱ��")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("�����˰���")]
        public string ManagerInfo { get; set; }

        [ExcelColumn("��ǰ����")]
        public string StageDescription { get; set; }

        [ExcelColumn("ȫ�̳�ʱʱ��")]
        public DateTime Deadline { get; set; }

        [ExcelColumn("��ǰ�������")]
        public string CurrentProcessor { get; set; }

        [ExcelColumn("��ǰ����ӵ�ʱ��")]
        public DateTime ProcessTime { get; set; }

        [ExcelColumn("������ά��ˮ��")]
        public string OssSerialNumber { get; set; }

        [ExcelColumn("������Դ")]
        public string SourceDescription { get; set; }

        [ExcelColumn("����ʱ��")]
        public DateTime BeginTime { get; set; }

        [ExcelColumn("��/��")]
        public string CandidateDistrict { get; set; }

        [ExcelColumn("·��")]
        public string RoadName { get; set; }

        [ExcelColumn("¥������")]
        public string BuildingName { get; set; }

        [ExcelColumn("ԭ����")]
        public string CauseLocation { get; set; }

        [ExcelColumn("Ԥ��������")]
        public string PreProcessContents { get; set; }

        [ExcelColumn("4G�û�")]
        public string Subscriber4G { get; set; }

        [ExcelColumn("����", TransformEnum.Longtitute, 0)]
        public double Longtitute { get; set; }

        [ExcelColumn("γ��", TransformEnum.Lattitute, 0)]
        public double Lattitute { get; set; }

        [ExcelColumn("ԭ����һ��")]
        public string FirstReason { get; set; }

        public string ReasonFirst => string.IsNullOrEmpty(FirstReason) ? ServiceType2 : FirstReason;

        [ExcelColumn("ԭ���Զ���")]
        public string SecondReason { get; set; }

        public string ReasonSecond => string.IsNullOrEmpty(SecondReason) ? ServiceType3 : SecondReason;

        [ExcelColumn("��������")]
        public string Grid { get; set; }

        [ExcelColumn("ҵ������")]
        public string NetworkDescription { get; set; }

        [ExcelColumn("���վ������")]
        public string Site { get; set; }

        [ExcelColumn("��������������")]
        public string Position { get; set; }

        public string SitePosition => string.IsNullOrEmpty(Site) ? Position : Site;

        [ExcelColumn("��������")]
        public string IndoorDescription { get; set; }

        [ExcelColumn("ʹ�ó���")]
        public string Scene { get; set; }

        [ExcelColumn("�������")]
        public string CategoryDescription { get; set; }

        public int TownId { get; set; }
    }
}