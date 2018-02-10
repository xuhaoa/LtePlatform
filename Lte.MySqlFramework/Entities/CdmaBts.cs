using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [TypeDoc("����CDMA��վ�����ݿ��Ӧ��ORM����")]
    [AutoMapFrom(typeof(BtsExcel))]
    public class CdmaBts : Entity, IGeoPoint<double>, ITownId
    {
        public int ENodebId { get; set; } = -1;

        [MaxLength(50)]
        public string Name { get; set; }

        public int TownId { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string Address { get; set; }

        public int BtsId { get; set; }

        public short BscId { get; set; }

        public bool IsInUse { get; set; } = true;
    }

    [AutoMapFrom(typeof(CdmaBts))]
    [TypeDoc("CDMA��վ��ͼ")]
    public class CdmaBtsView : IGeoPoint<double>
    {
        [MemberDoc("��վ����")]
        public string Name { get; set; }

        [MemberDoc("�����������")]
        public int TownId { get; set; }

        [MemberDoc("����")]
        public double Longtitute { get; set; }

        [MemberDoc("����")]
        public string DistrictName { get; set; }

        [MemberDoc("����")]
        public string TownName { get; set; }

        [MemberDoc("γ��")]
        public double Lattitute { get; set; }

        [MemberDoc("��ַ")]
        public string Address { get; set; }

        [MemberDoc("��վ���")]
        public int BtsId { get; set; }

        [MemberDoc("BSC���")]
        public int BscId { get; set; }

        [MemberDoc("�Ƿ�����")]
        public bool IsInUse { get; set; }
    }

    public class CdmaBtsCluster
    {
        public int LongtituteGrid { get; set; }

        public double Longtitute => (double) LongtituteGrid / 100000;

        public int LattituteGrid { get; set; }

        public double Lattitute => (double) LattituteGrid / 100000;

        public IEnumerable<CdmaBtsView> CdmaBtsViews { get; set; }
    }

}