using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Mr
{
    public class CellDistance : IEntity<ObjectId>
    {
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public int ENodebId { get; set; }

        public string PciInfo { get; set; }

        public DateTime CurrentDate { get; set; }

        public int Distance0 { get; set; }

        public int Distance1 { get; set; }

        public int Distance2 { get; set; }

        public int Distance3 { get; set; }

        public int Distance4 { get; set; }

        public int Distance5 { get; set; }

        public int Distance6 { get; set; }

        public int Distance7 { get; set; }

        public int Distance8 { get; set; }

        public int Distance9 { get; set; }

        public int Distance10 { get; set; }

        public int Distance11 { get; set; }

        public int Distance12 { get; set; }

        public int Distance13 { get; set; }

        public int Distance14 { get; set; }

        public int Distance15 { get; set; }

        public int Distance16 { get; set; }

        public int Distance17 { get; set; }

        public int Distance18 { get; set; }

        public int Distance19 { get; set; }

        public int Distance20 { get; set; }

        public int Distance21 { get; set; }

        public int Distance22 { get; set; }

        public int Distance23 { get; set; }

        public int Distance24 { get; set; }

        public int Distance25 { get; set; }

        public int Distance26 { get; set; }

        public int Distance27 { get; set; }

        public int Distance28 { get; set; }

        public int Distance29 { get; set; }

        public int Distance30 { get; set; }
    }
}
