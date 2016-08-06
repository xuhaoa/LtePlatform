using System;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Evaluations.ViewModels.Channel;
using Lte.Evaluations.ViewModels.Mr;
using Lte.Evaluations.ViewModels.Switch;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.Channel;
using Lte.Parameters.Entities.ExcelCsv;
using Lte.Parameters.Entities.Neighbor;
using Lte.Parameters.Entities.Switch;

namespace Lte.Evaluations.MapperSerive
{
    public static class InfrastructureMapperService
    {
        public static void MapCustomerEntities()
        {
            Mapper.CreateMap<ComplainExcel, ComplainItem>()
                .ForMember(d => d.ComplainSource,
                    opt => opt.MapFrom(s => s.SourceDescription.GetEnumType<ComplainSource>()))
                .ForMember(d => d.District,
                    opt => opt.MapFrom(s => s.Grid.StartsWith("FS") ? s.Grid.Substring(2) : s.CandidateDistrict))
                .ForMember(d => d.ComplainReason, opt => opt.MapFrom(s => s.ReasonFirst.GetEnumType<ComplainReason>()))
                .ForMember(d => d.ComplainSubReason,
                    opt => opt.MapFrom(s => s.ReasonSecond.GetEnumType<ComplainSubReason>()))
                .ForMember(d => d.NetworkType, opt => opt.MapFrom(s => s.NetworkDescription.GetEnumType<NetworkType>()))
                .ForMember(d => d.ComplainScene, opt => opt.MapFrom(s => s.Scene.GetEnumType<ComplainScene>()))
                .ForMember(d => d.ComplainCategory,
                    opt => opt.MapFrom(s => s.CategoryDescription.GetEnumType<ComplainCategory>()))
                .ForMember(d => d.IsIndoor, opt => opt.MapFrom(s => s.IndoorDescription == "室内"))
                .ForMember(d => d.SitePosition,
                    opt => opt.MapFrom(s => string.IsNullOrEmpty(s.Site) ? s.Position : s.Site));
        }
    }
}
