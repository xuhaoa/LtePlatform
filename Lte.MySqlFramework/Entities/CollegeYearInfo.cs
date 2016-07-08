using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace Lte.MySqlFramework.Entities
{
    public class CollegeYearInfo : Entity
    {
        public int CollegeId { get; set; }

        public int Year { get; set; }

        public int TotalStudents { get; set; }

        public int CurrentSubscribers { get; set; }

        public int GraduateStudents { get; set; }

        public int NewSubscribers { get; set; }

        public DateTime OldOpenDate { get; set; }

        public DateTime NewOpenDate { get; set; }

        public int ExpectedSubscribers => CurrentSubscribers + NewSubscribers - GraduateStudents;
    }
}
