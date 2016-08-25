using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(College3GTestView))]
    public class College3GTestResults : Entity
    {
        public int CollegeId { get; set; }

        public DateTime TestTime { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        public double DownloadRate { get; set; }

        public int AccessUsers { get; set; }

        public double MinRssi { get; set; }

        public double MaxRssi { get; set; }

        public double Vswr { get; set; }
    }

    [TypeDoc("校园网4G测试结果")]
    [AutoMapFrom(typeof(College4GTestView))]
    public class College4GTestResults : Entity
    {
        [MemberDoc("校园编号")]
        public int CollegeId { get; set; }

        [MemberDoc("测试时间")]
        public DateTime TestTime { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        [MemberDoc("下载速率")]
        public double DownloadRate { get; set; }

        [MemberDoc("上传速率")]
        public double UploadRate { get; set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("接入用户数")]
        public int AccessUsers { get; set; }

        [MemberDoc("RSRP")]
        public double Rsrp { get; set; }

        [MemberDoc("SINR")]
        public double Sinr { get; set; }
    }

    public class CollegeKpi : AuditedEntity
    {
        public int CollegeId { get; set; }

        public DateTime TestTime { get; set; }

        public int OnlineUsers { get; set; }

        public double DownloadFlow { get; set; }

        public double UploadFlow { get; set; }

        public double RrcConnection { get; set; }

        public double ErabConnection { get; set; }

        public double ErabDrop { get; set; }

        public double Connection2G { get; set; }

        public double Connection3G { get; set; }

        public double Erlang3G { get; set; }

        public double Drop3G { get; set; }

        public double Flow3G { get; set; }
    }

    [AutoMapFrom(typeof(CollegeKpi))]
    public class CollegeKpiView
    {
        public DateTime TestTime { get; set; }

        public string CollegeName { get; set; }

        public int OnlineUsers { get; set; }

        public double DownloadFlow { get; set; }

        public double UploadFlow { get; set; }

        public double RrcConnection { get; set; }

        public double ErabConnection { get; set; }

        public double ErabDrop { get; set; }

        public double Connection2G { get; set; }

        public double Connection3G { get; set; }

        public double Erlang3G { get; set; }

        public double Drop3G { get; set; }

        public double Flow3G { get; set; }
    }

    [AutoMapFrom(typeof(College3GTestResults))]
    public class College3GTestView
    {
        public DateTime TestTime { get; set; }

        public string CollegeName { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        public double DownloadRate { get; set; }

        public int AccessUsers { get; set; }

        public double MinRssi { get; set; }

        public double MaxRssi { get; set; }

        public double Vswr { get; set; }
    }

    [AutoMapFrom(typeof(College4GTestResults))]
    [TypeDoc("记录校园网4G测试记录视图的类")]
    public class College4GTestView
    {
        [MemberDoc("测试时间")]
        public DateTime TestTime { get; set; }

        [MemberDoc("校园名称")]
        public string CollegeName { get; set; }

        public string Place { get; set; }

        public string Tester { get; set; }

        [MemberDoc("小区名称")]
        public string CellName { get; set; }

        [MemberDoc("小区PCI")]
        public short Pci { get; set; }

        [MemberDoc("下载速率（kByte/s）")]
        public double DownloadRate { get; set; }

        [MemberDoc("上传速率（kByte/s）")]
        public double UploadRate { get; set; }

        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("接入用户数")]
        public int AccessUsers { get; set; }

        [MemberDoc("RSRP")]
        public double Rsrp { get; set; }

        [MemberDoc("SINR")]
        public double Sinr { get; set; }
    }
}
