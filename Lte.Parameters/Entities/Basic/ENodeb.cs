using System;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Abstract;
using Lte.Parameters.Entities.ExcelCsv;

namespace Lte.Parameters.Entities.Basic
{
    [TypeDoc("定义LTE基站数据库表对应的ORM对象")]
    [AutoMapFrom(typeof(ENodebExcel))]
    public class ENodeb : Entity, IGeoPoint<double>
    {
        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MaxLength(50)]
        [MemberDoc("基站名称")]
        public string Name { get; set; }

        [MemberDoc("镇区编号")]
        public int TownId { get; set; }

        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("厂家")]
        public string Factory { get; set; }

        [MemberDoc("FDD制式")]
        [AutoMapPropertyResolve("DivisionDuplex", typeof(ENodebExcel), typeof(FddTransform))]
        public bool IsFdd { get; set; }

        [MemberDoc("地址")]
        public string Address { get; set; }

        [MemberDoc("网关")]
        [AutoMapPropertyResolve("GatewayIp", typeof(ENodebExcel), typeof(IpAddressTransform))]
        public int Gateway { get; set; }

        [MemberDoc("子IP")]
        [AutoMapPropertyResolve("Ip", typeof(ENodebExcel), typeof(IpByte4Transform))]
        public byte SubIp { get; set; }

        [MemberDoc("网关IP")]
        public IpAddress GatewayIp => new IpAddress { AddressValue = Gateway };

        [MemberDoc("IP")]
        public IpAddress Ip => new IpAddress { AddressValue = Gateway, IpByte4 = SubIp };

        [MemberDoc("规划编号(设计院)")]
        public string PlanNum { get; set; }

        [MemberDoc("入网日期")]
        public DateTime OpenDate { get; set; }

        [MemberDoc("是否在用")]
        public bool IsInUse { get; set; } = true;

        public static ENodeb ConstructENodeb(ENodebExcel info, ITownRepository repository)
        {
            var town = repository.QueryTown(info.CityName, info.DistrictName, info.TownName);
            var eNodeb = Mapper.Map<ENodebExcel, ENodeb>(info);
            eNodeb.TownId = town?.Id ?? -1;
            return eNodeb;
        }
    }

    [TypeDoc("定义CDMA基站的数据库对应的ORM对象")]
    public class CdmaBts : Entity
    {
        public int ENodebId { get; set; } = -1;

        [MaxLength(50)]
        public string Name { get; set; }

        public int TownId { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string Address { get; set; }

        public int BtsId { get; set; }

        public short BscId { get; set; }

        public bool IsInUse { get; set; } = true;

        public static CdmaBts ConstructBts(BtsExcel info, ITownRepository repository)
        {
            var town = repository.QueryTown(info.DistrictName, info.TownName);
            var bts = Mapper.Map<BtsExcel, CdmaBts>(info);
            bts.TownId = town?.Id ?? -1;
            return bts;
        }
    }
}
