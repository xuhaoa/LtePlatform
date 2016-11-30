using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(TopDrop2GCellExcel))]
    public class TopDrop2GCell : Entity, IBtsIdQuery
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; }

        public int BtsId { get; set; }

        [AutoMapPropertyResolve("CellName", typeof(TopDrop2GCellExcel), typeof(FirstBracketCellIdTransform))]
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public short Frequency { get; set; }

        public int Drops { get; set; }

        public int MoAssignmentSuccess { get; set; }

        public int MtAssignmentSuccess { get; set; }

        public int TrafficAssignmentSuccess { get; set; }

        public int CallAttempts { get; set; }
    }

    [AutoMapFrom(typeof(TopConnection2GExcel))]
    public class TopConnection2GCell : Entity
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; }

        public int BtsId { get; set; }

        [AutoMapPropertyResolve("CellName", typeof(TopConnection2GExcel), typeof(FirstBracketCellIdTransform))]
        public int CellId { get; set; }

        public byte SectorId { get; set; }

        public short Frequency { get; set; }

        public int Drops { get; set; }

        public int MoAssignmentSuccess { get; set; }

        public int MtAssignmentSuccess { get; set; }

        public int TrafficAssignmentSuccess { get; set; }

        public int CallAttempts { get; set; }

        public int TrafficAssignmentFail { get; set; }
    }

    public class TopDrop2GCellExcel
    {
        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("时")]
        public int StatHour { get; set; }

        public DateTime StatTime => StatDate.AddHours(StatHour);

        [ExcelColumn("站号")]
        public int BtsId { get; set; }

        [ExcelColumn("扇区")]
        public byte SectorId { get; set; }

        [ExcelColumn("载波")]
        public short Frequency { get; set; }

        [ExcelColumn("中文名")]
        public string CellName { get; set; }

        [ExcelColumn("业务信道掉话次数")]
        public int Drops { get; set; }

        [ExcelColumn("主叫业务信道分配成功次数")]
        public int MoAssignmentSuccess { get; set; }

        [ExcelColumn("被叫业务信道分配成功次数")]
        public int MtAssignmentSuccess { get; set; }

        [ExcelColumn("业务信道分配成功次数")]
        public int TrafficAssignmentSuccess { get; set; }

        [ExcelColumn("呼叫尝试总次数")]
        public int CallAttempts { get; set; }

        public static string SheetName { get; } = "掉话TOP30小区";
    }

    public class TopConnection2GExcel
    {
        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("时")]
        public int StatHour { get; set; }

        public DateTime StatTime => StatDate.AddHours(StatHour);

        [ExcelColumn("站号")]
        public int BtsId { get; set; }

        [ExcelColumn("扇区")]
        public byte SectorId { get; set; }

        [ExcelColumn("载波")]
        public short Frequency { get; set; }

        [ExcelColumn("中文名")]
        public string CellName { get; set; }

        [ExcelColumn("业务信道掉话次数")]
        public int Drops { get; set; }

        [ExcelColumn("主叫业务信道分配成功次数")]
        public int MoAssignmentSuccess { get; set; }

        [ExcelColumn("被叫业务信道分配成功次数")]
        public int MtAssignmentSuccess { get; set; }

        [ExcelColumn("业务信道分配成功次数")]
        public int TrafficAssignmentSuccess { get; set; }

        [ExcelColumn("呼叫尝试总次数")]
        public int CallAttempts { get; set; }

        [ExcelColumn("业务信道分配失败次数")]
        public int TrafficAssignmentFail { get; set; }

        public static string SheetName { get; } = "呼建TOP30小区";
    }
}
