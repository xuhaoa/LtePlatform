using System;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Parameters.Entities.Work;

namespace Lte.Parameters.MockOperations
{
    public class WorkItemConverter : TypeConverter<WorkItemExcel, WorkItem>
    {
        protected override WorkItem ConvertCore(WorkItemExcel source)
        {
            var result = new WorkItem
            {
                SerialNumber = source.SerialNumber,
                ENodebId = source.ENodebId,
                SectorId = source.SectorId,
                BeginTime = source.BeginTime,
                FeedbackTime = source.FeedbackTime,
                FinishTime = source.FinishTime,
                Deadline = source.Deadline,
                Cause = source.CauseDescription.GetEnumType<WorkItemCause>(),
                State = source.StateDescription.GetEnumType<WorkItemState>()
            };

            var title = source.Title ?? "";
            var typeFields = title.Split('_');
            var titleFields = title.GetSplittedFields("--");
            var titleFields2 = title.GetSplittedFields("—");
            if (typeFields.Length > 3)
            {
                result.Type = typeFields[1].GetEnumType<WorkItemType>();
                result.Subtype = typeFields[2].GetEnumType<WorkItemSubtype>();
                result.FeedbackContents = "[" + DateTime.Now + "]创建信息：" + typeFields[3];
            }
            else if (typeFields.Length == 3)
            {
                result.Type = typeFields[1].GetEnumType<WorkItemType>();
                result.Subtype = WorkItemSubtype.Others;
                result.FeedbackContents = "[" + DateTime.Now + "]创建信息：" + typeFields[2];
            }
            else if (titleFields.Length == 2)
            {
                result.Type = titleFields[0].GetEnumType<WorkItemType>();
                result.Subtype = WorkItemSubtype.Others;
                result.FeedbackContents = "[" + DateTime.Now + "]创建信息：" + titleFields[1];
            }
            else if (titleFields2.Length == 2)
            {
                result.Type = titleFields2[0].GetEnumType<WorkItemType>();
                result.Subtype = WorkItemSubtype.Others;
                result.FeedbackContents = "[" + DateTime.Now + "]创建信息：" + titleFields2[1];
            }
            else
            {
                result.Type = WorkItemType.Others;
                result.Subtype = WorkItemSubtype.Others;
                result.FeedbackContents = "[" + DateTime.Now + "]创建信息：" + title;
            }
            return result;
        }
    }
}
