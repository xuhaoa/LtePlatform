using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [TypeDoc("У԰��4G���Խ��")]
    [AutoMapFrom(typeof(College4GTestView))]
    public class College4GTestResults : Entity
    {
        [MemberDoc("У԰���")]
        public int CollegeId { get; set; }

        [MemberDoc("����ʱ��")]
        public DateTime TestTime { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        [MemberDoc("��������")]
        public double DownloadRate { get; set; }

        [MemberDoc("�ϴ�����")]
        public double UploadRate { get; set; }

        [MemberDoc("��վ���")]
        public int ENodebId { get; set; }

        [MemberDoc("�������")]
        public byte SectorId { get; set; }

        [MemberDoc("�����û���")]
        public int AccessUsers { get; set; }

        [MemberDoc("RSRP")]
        public double Rsrp { get; set; }

        [MemberDoc("SINR")]
        public double Sinr { get; set; }
    }
}