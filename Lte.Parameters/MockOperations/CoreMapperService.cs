using System;
using AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Parameters.Entities;

namespace Lte.Parameters.MockOperations
{
    public static class CoreMapperService
    {
        public static void MapDtItems()
        {
            Mapper.CreateMap<FileRecord2G, FileRecordCoverage2G>()
                .ForMember(d => d.Longtitute, opt => opt.MapFrom(s => s.Longtitute ?? -1))
                .ForMember(d => d.Lattitute, opt => opt.MapFrom(s => s.Lattitute ?? -1))
                .ForMember(d => d.Ecio, opt => opt.MapFrom(s => s.Ecio ?? 0))
                .ForMember(d => d.RxAgc, opt => opt.MapFrom(s => s.RxAgc ?? 0))
                .ForMember(d => d.TxPower, opt => opt.MapFrom(s => s.TxPower ?? 0));
            Mapper.CreateMap<FileRecord3G, FileRecordCoverage3G>()
                .ForMember(d => d.Longtitute, opt => opt.MapFrom(s => s.Longtitute ?? -1))
                .ForMember(d => d.Lattitute, opt => opt.MapFrom(s => s.Lattitute ?? -1))
                .ForMember(d => d.RxAgc0, opt => opt.MapFrom(s => s.RxAgc0 ?? 0))
                .ForMember(d => d.RxAgc1, opt => opt.MapFrom(s => s.RxAgc1 ?? 0))
                .ForMember(d => d.Sinr, opt => opt.MapFrom(s => s.Sinr ?? 0));
            Mapper.CreateMap<FileRecord4G, FileRecordCoverage4G>()
                .ForMember(d => d.Longtitute, opt => opt.MapFrom(s => s.Longtitute ?? -1))
                .ForMember(d => d.Lattitute, opt => opt.MapFrom(s => s.Lattitute ?? -1))
                .ForMember(d => d.Rsrp, opt => opt.MapFrom(s => s.Rsrp ?? 0))
                .ForMember(d => d.Sinr, opt => opt.MapFrom(s => s.Sinr ?? 0));
        }
    }
}
