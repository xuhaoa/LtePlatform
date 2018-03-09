using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    [TypeDoc("�����¼CDMAС������Ϣ��Excel�����������Ҫ������CdmaCell֮���ӳ���ϵ")]
    public class CdmaCellExcel
    {
        [ExcelColumn("������ʶ")]
        [MemberDoc("������ʶ")]
        [Required]
        public byte SectorId { get; set; }

        [ExcelColumn("Ƶ��")]
        [MemberDoc("CDMAƵ�㣬��283��201��37��")]
        public int Frequency { get; set; }

        [ExcelColumn("��������(����/����/����)")]
        [MemberDoc("��������(����/����/����)")]
        public string IsIndoor { get; set; } = "��";

        [ExcelColumn("����")]
        [MemberDoc("����")]
        [Required]
        public double Longtitute { get; set; }

        [ExcelColumn("γ��")]
        [MemberDoc("γ��")]
        [Required]
        public double Lattitute { get; set; }

        [ExcelColumn("�Ҹ�")]
        [MemberDoc("���߹Ҹߣ��ף�")]
        public double Height { get; set; }

        [ExcelColumn("����ǣ���е��")]
        [MemberDoc("����ǣ���е��")]
        public double MTilt { get; set; }

        [ExcelColumn("����ǣ������")]
        [MemberDoc("����ǣ������")]
        public double ETilt { get; set; }

        [ExcelColumn("��λ��")]
        [MemberDoc("��λ��")]
        public double Azimuth { get; set; }

        [ExcelColumn("�������棨dBi��", TransformEnum.DefaultZeroDouble)]
        [MemberDoc("�������棨dBi��")]
        public double AntennaGain { get; set; }

        [ExcelColumn("��վ���")]
        [MemberDoc("��վ���")]
        public int BtsId { get; set; }

        [ExcelColumn("С����ʶ")]
        [MemberDoc("С����ʶ")]
        public int CellId { get; set; }

        [IgnoreMap]
        [ExcelColumn("��������(1X/DO)")]
        [MemberDoc("��������(1X/DO)")]
        public string CellType { get; set; }

        [IgnoreMap]
        [ExcelColumn("LAC")]
        [MemberDoc("LAC��λ��������")]
        public string Lac { get; set; }

        [IgnoreMap]
        [ExcelColumn("PN��")]
        [MemberDoc("PN��")]
        public short Pn { get; set; }

        [ExcelColumn("�Ƿ���RRU(���ԣ�RRU��Զ��)")]
        public string IsRru { get; set; }

        [ExcelColumn("TRM�����")]
        public byte TrmId { get; set; }

        [ExcelColumn("RRU��������(���ԣ�RRU��Զ��)")]
        public string RruName { get; set; }
    }
}