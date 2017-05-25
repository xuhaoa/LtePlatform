using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Channel
{
    public class AgpsMongo : IEntity<ObjectId>, IStatDateCell, IGeoPointReadonly<double>
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public DateTime StatDate { get; set; }

        public string CellId { get; set; }

        [ArraySumProtection]
        public int X { get; set; }

        public int Y { get; set; }

        public double Longtitute => 112 + X*0.00049;

        public double Lattitute => 22 + Y*0.00045;

        public int Rsrp { get; set; }

        public int Count { get; set; }

        public int GoodCount { get; set; }

        public int GoodCount105 { get; set; }

        public int GoodCount100 { get; set; }
    }

    public class AgpsCoverageView : IStatDate, IGeoPoint<double>
    {
        public DateTime StatDate { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public int Rsrp { get; set; }

        public double AverageRsrp => (double) Rsrp/Count;

        public int Count { get; set; }

        public int GoodCount { get; set; }

        public double CoverageRate110 => (double) GoodCount/Count;

        public int GoodCount105 { get; set; }

        public int GoodCount100 { get; set; }
    }
}
