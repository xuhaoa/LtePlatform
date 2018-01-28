﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Abstract;

namespace Lte.MySqlFramework.Entities
{
    public class TopMrsRsrp : Entity, IStatDate, ILteCellQuery
    {
        public DateTime StatDate { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public long RsrpBelow120 { get; set; }

        public long Rsrp120To115 { get; set; }

        public long Rsrp115To110 { get; set; }

        public long Rsrp110To105 { get; set; }

        public long Rsrp105To100 { get; set; }

        public long Rsrp100To95 { get; set; }

        public long Rsrp95To90 { get; set; }

        public long Rsrp90To80 { get; set; }

        public long Rsrp80To70 { get; set; }

        public long Rsrp70To60 { get; set; }

        public long RsrpAbove60 { get; set; }
    }

    [AutoMapFrom(typeof(TopMrsRsrp))]
    public class TopMrsRsrpView : IStatDate, ILteCellQuery
    {
        public DateTime StatDate { get; set; }

        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public string ENodebName { get; set; }

        public string CellName => ENodebName + "-" + SectorId;

        public long RsrpBelow120 { get; set; }

        public long Rsrp120To115 { get; set; }

        public long Rsrp115To110 { get; set; }

        public long Rsrp110To105 { get; set; }

        public long Rsrp105To100 { get; set; }

        public long Rsrp100To95 { get; set; }

        public long Rsrp95To90 { get; set; }

        public long Rsrp90To80 { get; set; }

        public long Rsrp80To70 { get; set; }

        public long Rsrp70To60 { get; set; }

        public long RsrpAbove60 { get; set; }

        public long TotalMrs => RsrpBelow120 + Rsrp120To115 + Rsrp115To110 + Rsrp110To105 + Rsrp105To100 + Rsrp100To95
                                + Rsrp95To90 + Rsrp90To80 + Rsrp80To70 + Rsrp70To60 + RsrpAbove60;

        public double MrsBelow115 => RsrpBelow120 + Rsrp120To115;

        public double CoverageRate115 => 100 - 100 * MrsBelow115 / TotalMrs;

        public double MrsBelow110 => MrsBelow115 + Rsrp115To110;

        public double CoverageRate110 => 100 - 100 * MrsBelow110 / TotalMrs;

        public double MrsBelow105 => MrsBelow110 + Rsrp110To105;

        public double CoverageRate105 => 100 - 100 * MrsBelow105 / TotalMrs;

        public double MrsBelow100 => MrsBelow105 + Rsrp105To100;

        public double CoverageRate100 => 100 - 100 * MrsBelow100 / TotalMrs;

        public int TopDates { get; set; }

        public static TopMrsRsrpView ConstructView(TopMrsRsrp stat, IENodebRepository repository)
        {
            var view = Mapper.Map<TopMrsRsrp, TopMrsRsrpView>(stat);
            var eNodeb = repository.FirstOrDefault(x => x.ENodebId == stat.ENodebId);
            view.ENodebName = eNodeb?.Name;
            return view;
        }
    }

    public class TopMrsRsrpContainer
    {
        public TopMrsRsrp TopMrsRsrp { get; set; }

        public int TopDates { get; set; }
    }
}
