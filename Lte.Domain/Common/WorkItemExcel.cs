using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class WorkItemExcel
    {
        [ExcelColumn("���ϵ���")]
        public string SerialNumber { get; set; }

        [ExcelColumn("���ϱ���")]
        public string Title { get; set; }

        public string SubTypeDescription
            => Title.Replace("���Žӿ�", "").Replace("ʡ�ӿ�", "").Replace("���ƶ�ҵ���֪/���ߡ�", "").GetSplittedFields("/Ne=")[0];

        [ExcelColumn("��������")]
        public string TypeDescription { get; set; }

        [ExcelColumn("����λ��")]
        public string Position { get; set; }

        public string[] NetworkElement
            => Position.Contains(':') ? Position.GetSplittedFields(':')[1].GetSplittedFields('_') : new[] { "" };

        public string ENodebPart => SplittedContents.FirstOrDefault(x => x.StartsWith("enb_id��"));

        public int ENodebId
            =>
                NetworkElement.Length > 2
                    ? NetworkElement[1].ConvertToInt(0)
                    : ENodebPart?.Replace("enb_id��", "").ConvertToInt(0) ?? 0;

        public string SectorPart => SplittedContents.FirstOrDefault(x => x.StartsWith("cell_id��"));

        public byte SectorId
            =>
                NetworkElement.Length > 2
                    ? NetworkElement[2].ConvertToByte(0)
                    : SectorPart?.Replace("cell_id��", "").ConvertToByte(0) ?? 0;

        [ExcelColumn("����ʱ��")]
        public DateTime BeginTime { get; set; }

        [ExcelColumn("Ӧ�ָ�ʱ��")]
        public DateTime Deadline { get; set; }

        [ExcelColumn("������")]
        public string StaffName { get; set; }

        [ExcelColumn("�����޸�ʱ��")]
        public DateTime? FinishTime { get; set; }

        [ExcelColumn("����״̬")]
        public string StateDescription { get; set; }

        [ExcelColumn("����ԭ��")]
        public string MalfunctionCause { get; set; }

        public string CauseDescription
            => string.IsNullOrEmpty(MalfunctionCause) ? "" : MalfunctionCause.GetSplittedFields(',')[0];

        [ExcelColumn("��������")]
        public string Contents { get; set; }

        public string[] SplittedContents => Contents.GetSplittedFields("��");

        public string[] Information => Contents.GetSplittedFields("<br/>");

        public string DateTimeString
            =>
                Information.FirstOrDefault(x => x.StartsWith("���澯�����ı���Ϣ��:"))?.Replace("���澯�����ı���Ϣ��:", "") ??
                (Information.Length > 0 ? Information[0] : DateTime.Today.ToShortDateString());

        public IEnumerable<string> Condition => Information.Where(x => x.StartsWith("�����о�����:") || x.Contains("���������"));

        public string Comments
            => "[" + DateTimeString + "]" + (Condition.Any() ? Condition.Aggregate((x, y) => x + y) : "");
    }
}