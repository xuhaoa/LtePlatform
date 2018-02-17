using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(StandarProblemExcel), typeof(ChoiceProblemExcel))]
    public class LteProblem : Entity
    {
        public string Type { get; set; }

        public string Body { get; set; }

        public int Choices { get; set; }

        public string ChoiceA { get; set; }

        public string ChoiceB { get; set; }

        public string ChoiceC { get; set; }

        public string ChoiceD { get; set; }

        public string ChoiceE { get; set; }

        public string ChoiceF { get; set; }

        public string Answer { get; set; }
    }

    public class StandarProblemExcel
    {
        [ExcelColumn("题目")]
        public string Problem { get; set; }

        public string[] Fields
            => Problem.Split(new[] {"A.", "B.", "C.", "D.", "E.", "F."}, StringSplitOptions.RemoveEmptyEntries);

        public int Choices => Fields.Length - 1;

        public string Body => Fields.Length > 0 ? Fields[0] : Problem;

        public string ChoiceA => Choices > 0 ? Fields[1] : "";

        public string ChoiceB => Choices > 1 ? Fields[2] : "";

        public string ChoiceC => Choices > 2 ? Fields[3] : "";

        public string ChoiceD => Choices > 3 ? Fields[4] : "";

        public string ChoiceE => Choices > 4 ? Fields[5] : "";

        public string ChoiceF => Choices > 5 ? Fields[6] : "";

        [ExcelColumn("参考答案")]
        public string AnswerContent { get; set; }

        public string Answer => AnswerContent.Replace(" ", "");

        [ExcelColumn("类型")]
        public string Type { get; set; }
    }

    public class ChoiceProblemExcel
    {
        [ExcelColumn("题目")]
        public string Body { get; set; }

        [ExcelColumn("选项")]
        public string Selection { get; set; }

        public string[] Fields
            => Selection.Split(new[] { "A.", "A）",
                "B.", "B）",
                "C.", "C）",
                "D.", "D）",
                "E.", "E）",
                "F）", "F."
            }, 
                StringSplitOptions.RemoveEmptyEntries);

        public int Choices => Fields.Length;

        public string ChoiceA => Choices > 0 ? Fields[0] : "";

        public string ChoiceB => Choices > 1 ? Fields[1] : "";

        public string ChoiceC => Choices > 2 ? Fields[2] : "";

        public string ChoiceD => Choices > 3 ? Fields[3] : "";

        public string ChoiceE => Choices > 4 ? Fields[4] : "";

        public string ChoiceF => Choices > 5 ? Fields[5] : "";

        [ExcelColumn("参考答案")]
        public string AnswerContent { get; set; }

        public string Answer => AnswerContent.Replace(" ", "");

        [ExcelColumn("类型")]
        public string Type { get; set; }
    }
}
