using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [TypeDoc("������ͼ�����ڵ�����ʾ")]
    [AutoMapFrom(typeof(CdmaCellView))]
    public class SectorView
    {
        [MemberDoc("С�����ƣ����ڱ���С��")]
        public string CellName { get; set; }

        [MemberDoc("��վ���")]
        public int ENodebId { get; set; }

        [MemberDoc("�������")]
        public byte SectorId { get; set; }

        [MemberDoc("�Ƿ�Ϊ����С��")]
        public string Indoor { get; set; }

        [MemberDoc("��λ��")]
        public double Azimuth { get; set; }

        [MemberDoc("����")]
        public double Longtitute { get; set; }

        [MemberDoc("γ��")]
        public double Lattitute { get; set; }

        [MemberDoc("���߹Ҹ�")]
        public double Height { get; set; }

        [MemberDoc("�����")]
        public double DownTilt { get; set; }

        [MemberDoc("��������")]
        public double AntennaGain { get; set; }

        [MemberDoc("Ƶ��")]
        public int Frequency { get; set; }

        [MemberDoc("Ƶ����ţ���1��ʾ2.1G��3��ʾ1.8G��5��ʾ800M")]
        public byte BandClass { get; set; }

        [MemberDoc("������Ϣ")]
        public string OtherInfos { get; set; }
    }
}