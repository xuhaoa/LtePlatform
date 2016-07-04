using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Entities;
using NUnit.Framework;
using Shouldly;

namespace Lte.Parameters.Test.Entities
{
    [TestFixture]
    public class CustomerMapperTest
    {
        private void MapVipDemand()
        {
            Mapper.CreateMap<VipDemand, VipDemandDto>()
                .ForMember(d => d.DemandLevelDescription, opt => opt.MapFrom(s => s.DemandLevel.GetEnumDescription()))
                .ForMember(d => d.NetworkTypeDescription, opt => opt.MapFrom(s => s.NetworkType.GetEnumDescription()))
                .ForMember(d => d.IsFinished, opt => opt.MapFrom(s => s.FinishTime != null))
                .ForMember(d => d.IsInfoComplete,
                    opt =>
                        opt.MapFrom(
                            s =>
                                !string.IsNullOrEmpty(s.Area) && !string.IsNullOrEmpty(s.ContactPerson) &&
                                !string.IsNullOrEmpty(s.PhoneNumber) && s.TownId > 0))
                .ForMember(d => d.MarketThemeDescription, opt => opt.MapFrom(s => s.MarketTheme.GetEnumDescription()));
            Mapper.CreateMap<VipDemandDto, VipDemand>()
                .ForMember(d => d.DemandLevel,
                    opt => opt.MapFrom(s => s.DemandLevelDescription.GetEnumType<DemandLevel>()))
                .ForMember(d => d.NetworkType,
                    opt => opt.MapFrom(s => s.NetworkTypeDescription.GetEnumType<NetworkType>()))
                .ForMember(d => d.MarketTheme,
                    opt => opt.MapFrom(s => s.MarketThemeDescription.GetEnumType<MarketTheme>()));
        }

        [Test]
        public void Test_Map_VipDemand()
        {
            MapVipDemand();
        
            var entity = new VipDemand
            {
                Id = 2,
                SerialNumber = "4433",
                TownId = 4,
                FinishTime = DateTime.Parse("2016-7-6")
            };
            var dto = new VipDemandDto();
            Mapper.Map(entity, dto);
            dto.SerialNumber.ShouldBe("4433");
            dto.TownId.ShouldBe(4);
            dto.IsInfoComplete.ShouldBe(false);
            dto.IsFinished.ShouldBeTrue();
        }

        [Test]
        public void Test_Map_Reverse_VipDemandDto()
        {
            MapVipDemand();
            var dto = new VipDemandDto
            {
                SerialNumber = "4433",
                TownId = 5,
                IsFinished = true,
                DemandLevelDescription = "A级"
            };
            var entity = new VipDemand
            {
                Id = 5,
                TownId = 3
            };
            Mapper.Map(dto, entity);
            entity.SerialNumber.ShouldBe("4433");
            entity.Id.ShouldBe(5);
            entity.DemandLevel.ShouldBe(DemandLevel.LevelA);
            entity.FinishTime.ShouldBeNull();
        }
    }
}
