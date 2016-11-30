﻿using Abp.Domain.Entities;
using Lte.Domain.Regular.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Lte.Parameters.Entities.Neighbor
{
    [Table("dbo.LteNeighborCells")]
    [KnownType(typeof(NearestPciCell))]
    [TypeDoc("LTE邻区关系定义")]
    public class LteNeighborCell : Entity
    {
        [MemberDoc("小区编号（对于LTE来说就是基站编号）")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("邻区小区编号")]
        public int NearestCellId { get; set; }

        [MemberDoc("邻区扇区编号")]
        public byte NearestSectorId { get; set; }
    }
}
