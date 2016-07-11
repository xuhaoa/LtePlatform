using System;
using Lte.Domain.Regular.Attributes;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.College;
using System.Runtime.Serialization;
using Abp.EntityFramework.AutoMapper;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Infrastructure;

namespace Lte.Evaluations.ViewModels.College
{
    [TypeDoc("校园网统计信息，主要包括用户数和有关的基础信息")]
    [DataContract]
    public class CollegeStat
    {
        [MemberDoc("校园编号")]
        [DataMember]
        public int Id { get; set; }

        [MemberDoc("校园名称")]
        [DataMember]
        public string Name { get; private set; }

        [MemberDoc("用户到达数")]
        [DataMember]
        public int ExpectedSubscribers { get; private set; }

        [MemberDoc("区域面积")]
        [DataMember]
        public double Area { get; private set; }

        [MemberDoc("LTE基站总数")]
        [DataMember]
        public int TotalLteENodebs { get; set; }

        [MemberDoc("LTE小区总数")]
        [DataMember]
        public int TotalLteCells { get; set; }

        [MemberDoc("CDMA基站总数")]
        [DataMember]
        public int TotalCdmaBts { get; set; }

        [MemberDoc("CDMA小区总数")]
        [DataMember]
        public int TotalCdmaCells { get; set; }

        [MemberDoc("LTE室内分布总数")]
        [DataMember]
        public int TotalLteIndoors { get; set; }

        [MemberDoc("CDMA室内分布总数")]
        [DataMember]
        public int TotalCdmaIndoors { get; set; }

        public CollegeStat(ICollegeRepository repository, CollegeInfo info, CollegeYearInfo yearInfo,
            IInfrastructureRepository infrastructureRepository)
        {
            CollegeRegion region = repository.GetRegion(info.Id);
            Name = info.Name;
            ExpectedSubscribers = yearInfo?.ExpectedSubscribers ?? 0;
            Area = region?.Area??0;
            Id = region?.AreaId??2;
            UpdateStats(infrastructureRepository);
        }

        private void UpdateStats(IInfrastructureRepository repository)
        {
            TotalLteENodebs = repository.Count(x => x.HotspotName == Name
                                                    && x.HotspotType == HotspotType.College
                                                    && x.InfrastructureType == InfrastructureType.ENodeb);
            TotalLteCells = repository.Count(x => x.HotspotName == Name
                                                  && x.HotspotType == HotspotType.College
                                                  && x.InfrastructureType == InfrastructureType.Cell);
            TotalCdmaBts = repository.Count(x => x.HotspotName == Name
                                                 && x.HotspotType == HotspotType.College
                                                 && x.InfrastructureType == InfrastructureType.CdmaBts);
            TotalCdmaCells = repository.Count(x => x.HotspotName == Name
                                                   && x.HotspotType == HotspotType.College
                                                   && x.InfrastructureType == InfrastructureType.CdmaCell);
            TotalLteIndoors = repository.Count(x => x.HotspotName == Name
                                                    && x.HotspotType == HotspotType.College
                                                    && x.InfrastructureType == InfrastructureType.LteIndoor);
            TotalCdmaIndoors = repository.Count(x => x.HotspotName == Name
                                                     && x.HotspotType == HotspotType.College
                                                     && x.InfrastructureType == InfrastructureType.CdmaIndoor);
        }
    }

    [AutoMapFrom(typeof(CollegeYearInfo))]
    public class CollegeYearView
    {
        public string Name { get; set; }

        public int TotalStudents { get; set; }

        public int CurrentSubscribers { get; set; }

        public int GraduateStudents { get; set; }

        public int NewSubscribers { get; set; }

        public DateTime OldOpenDate { get; set; }

        public DateTime NewOpenDate { get; set; }

        public int ExpectedSubscribers { get; set; }
    }
}
