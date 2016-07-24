using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(CdmaCellExcel))]
    public class CdmaRru : Entity
    {
        public int BtsId { get; set; }

        public byte SectorId { get; set; }

        public byte TrmId { get; set; }

        public string RruName { get; set; }
    }
}
