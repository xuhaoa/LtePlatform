﻿using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using Lte.Domain.Regular;
using Lte.Evaluations.Policy;
using Lte.Parameters.Entities.Kpi;
using NUnit.Framework;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace Lte.Evaluations.DataService.Kpi
{
    [TestFixture]
    public class AlarmUploadTest
    {
        private AlarmsService _service;
        private readonly ITypeFinder _typeFinder = new TypeFinder(new MyAssemblyFinder());

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();
        }

        [SetUp]
        public void Setup()
        {
            _service=new AlarmsService(null);
        }

        [TestCase(@"根源告警标识,确认状态,告警级别,网元,网元内定位,告警码,发生时间,网元类型,告警类型,告警原因,附加文本,ADMC告警,告警恢复时间,重复计数,告警对象类型,告警对象DN,单板类型,告警对象ID,站点名称(局向),站点ID(局向),告警对象名称,产品,告警标识,影响网元,影响网元内定位,告警修改时间,附加内容,确认/反确认用户,确认/反确认系统,告警确认/反确认时间,告警确认/反确认信息,清除用户,清除系统,恢复方式,告警注释,注释用户,注释系统,注释时间,告警编号,网元IP,链路,网元分组,网元代理,系统类型,持续时间(hh:mm:ss),关联业务,产生方式,门限任务信息,调测状态,标准告警码,清除信息
,未确认,主要,西樵电信机房LBBU18(550974),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 281713201433; L eNBId:550974,否,2015/8/18 13:32,,SDR,""SubNetwork=440610,MEID=550974,TransportNetwork=1"",CCC,550974,西樵电信机房LBBU18,550974,西樵电信机房LBBU18,LTE FDD,148,,,,站点ID(局向) : 550974; 站点名称(局向) : 西樵电信机房LBBU18; 告警对象类型 : SDR; 告警对象ID : 550974; 告警对象名称 : 西樵电信机房LBBU18; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.53.170,,""广东电信LTE_OMMB5,佛山市南海区3(440610)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:43,,,,,通信子系统故障(306),
,未确认,主要,西樵电信机房LBBU25(551424),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 283448400911; L eNBId:551424,否,2015/8/18 13:32,,SDR,""SubNetwork=440610,MEID=551424,TransportNetwork=1"",CCC,551424,西樵电信机房LBBU25,551424,西樵电信机房LBBU25,LTE FDD,128,,,,站点ID(局向) : 551424; 站点名称(局向) : 西樵电信机房LBBU25; 告警对象类型 : SDR; 告警对象ID : 551424; 告警对象名称 : 西樵电信机房LBBU25; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.85.142,,""广东电信LTE_OMMB5,佛山市南海区3(440610)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:43,,,,,通信子系统故障(306),
,未确认,主要,西樵职校(503120),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 274912500754; L eNBId:503120,否,2015/8/18 13:32,,SDR,""SubNetwork=440604,MEID=503120,TransportNetwork=1"",CCC,503120,西樵职校,503120,西樵职校,LTE FDD,164,,,,站点ID(局向) : 503120; 站点名称(局向) : 西樵职校; 告警对象类型 : SDR; 告警对象ID : 503120; 告警对象名称 : 西樵职校; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.53.137,,""广东电信LTE_OMMB5,佛山市南海区2(440604)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:45,,,,,通信子系统故障(306),
,未确认,主要,西樵民乐(502926),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 274747400116; L eNBId:502926,否,2015/8/18 13:32,,SDR,""SubNetwork=440604,MEID=502926,TransportNetwork=1"",CCC,502926,西樵民乐,502926,西樵民乐,LTE FDD,93,,,,站点ID(局向) : 502926; 站点名称(局向) : 西樵民乐; 告警对象类型 : SDR; 告警对象ID : 502926; 告警对象名称 : 西樵民乐; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.53.136,,""广东电信LTE_OMMB5,佛山市南海区2(440604)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:45,,,,,通信子系统故障(306),
,未确认,主要,民乐向阳(502934),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 274875701398; L eNBId:502934,否,2015/8/18 13:32,,SDR,""SubNetwork=440604,MEID=502934,TransportNetwork=1"",CCC,502934,民乐向阳,502934,民乐向阳,LTE FDD,110,,,,站点ID(局向) : 502934; 站点名称(局向) : 民乐向阳; 告警对象类型 : SDR; 告警对象ID : 502934; 告警对象名称 : 民乐向阳; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.53.130,,""广东电信LTE_OMMB5,佛山市南海区2(440604)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:45,,,,,通信子系统故障(306),
,未确认,主要,西樵儒溪接入机房LBBU1(551057),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 282646400330; L eNBId:551057,否,2015/8/18 13:32,,SDR,""SubNetwork=440610,MEID=551057,TransportNetwork=1"",CCC,551057,西樵儒溪接入机房LBBU1,551057,西樵儒溪接入机房LBBU1,LTE FDD,149,,,,站点ID(局向) : 551057; 站点名称(局向) : 西樵儒溪接入机房LBBU1; 告警对象类型 : SDR; 告警对象ID : 551057; 告警对象名称 : 西樵儒溪接入机房LBBU1; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.85.130,,""广东电信LTE_OMMB5,佛山市南海区3(440610)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:45,,,,,通信子系统故障(306),
,未确认,主要,西樵简村(503193),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:22,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 274912500913; L eNBId:503193,否,2015/8/18 13:32,,SDR,""SubNetwork=440604,MEID=503193,TransportNetwork=1"",CCC,503193,西樵简村,503193,西樵简村,LTE FDD,224,,,,站点ID(局向) : 503193; 站点名称(局向) : 西樵简村; 告警对象类型 : SDR; 告警对象ID : 503193; 告警对象名称 : 西樵简村; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.53.133,,""广东电信LTE_OMMB5,佛山市南海区2(440604)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:09:46,,,,,通信子系统故障(306),
,未确认,主要,丹灶建行(502442),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015/8/18 13:19,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 274030500557; L eNBId:502442,否,2015/8/18 13:25,,SDR,""SubNetwork=440603,MEID=502442,TransportNetwork=1"",CCC,502442,丹灶建行,502442,丹灶建行,LTE FDD,430,,,,站点ID(局向) : 502442; 站点名称(局向) : 丹灶建行; 告警对象类型 : SDR; 告警对象ID : 502442; 告警对象名称 : 丹灶建行; 单板类型 : CCC; ,,,,,,,正常恢复,,,,,1.43923E+12,8.142.6.11,,""广东电信LTE_OMMB5,佛山市南海区1(440603)"",广东电信LTE_OMMB5,LTE FDD业务告警(20428),0:05:51,,,,,通信子系统故障(306),",
            8)]
        [TestCase(@"根源告警标识,确认状态,告警级别,网元,网元内定位,告警码,发生时间,网元类型,告警类型,告警原因,附加文本,ADMC告警,告警恢复时间,重复计数,告警对象类型,告警对象DN,单板类型,告警对象ID,站点名称(局向),站点ID(局向),告警对象名称,产品,告警标识,影响网元,影响网元内定位,告警修改时间,附加内容,确认/反确认用户,确认/反确认系统,告警确认/反确认时间,告警确认/反确认信息,清除用户,清除系统,恢复方式,告警注释,注释用户,注释系统,注释时间,告警编号,网元IP,链路,网元分组,网元代理,系统类型,持续时间(hh:mm:ss),关联业务,产生方式,门限任务信息,调测状态,标准告警码,清除信息
"""",未确认,主要,环市镇安中一(501927),""地面资源(MO SDR)=1,机架(MO SDR)=52,机框(MO SDR)=1,单板(MO SDR)=1"",RRU链路断(198097605),2015-10-15 10:35:43,管理网元(MO SDR),处理错误告警,1. RRU运行异常。 2. RRU与主控板之间的通讯链路故障。,""L eNBId:501927; 拓扑: 光接口板=(1,1,6), 光接口板光口号=1, 主链级联号=1"",否,2015-10-15 10:36:03,"""",RU,""SubNetwork=440601,MEID=501927,Equipment=1,Rack=52,SubRack=1,Slot=1,PlugInUnit=1"",R8862A S2100(A6A),52,环市镇安中一,501927,环市镇安中一,LTE FDD,7,"""","""","""",站点ID(局向) : 501927; 站点名称(局向) : 环市镇安中一; 告警对象类型 : RU; 告警对象ID : 52; 告警对象名称 : 环市镇安中一; 单板类型 : R8862A S2100(A6A); ,"""","""","""","""","""","""",调测恢复,"""","""","""","""",1439235125714,8.142.3.168,"""",""广东电信LTE_OMMB3,佛山市禅城区1(440601)"",广东电信LTE_OMMB3,平台告警(20420),00:00:20,"""","""","""","""",不可用(14),""""
"""",未确认,次要,环市镇安中一(501927),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=6"",光口接收链路故障(198098319),2015-10-15 10:35:43,管理网元(MO SDR),通信告警,1. 光纤/电缆损坏； 2. 光纤/电缆端面污染； 3. 本端或对端光/电模块或光纤/电缆没插好； 4. 对端设备的光/电模块损坏； 5. 光纤实际长度大于光模块支持的长度； 6. 本端、对端的光模块速率不匹配； 7. 对端设备工作异常。,光口1; 光口未接收到光信号; 单板序列号: 277707000044; L eNBId:501927,否,2015-10-15 10:36:03,"""",SDR,""SubNetwork=440601,MEID=501927,Equipment=1,Rack=1,SubRack=1,Slot=6,PlugInUnit=1,SdrDeviceGroup=1,FiberDeviceSet=1,FiberDevice=1"",BPL1,501927,环市镇安中一,501927,环市镇安中一,LTE FDD,4,"""","""","""",站点ID(局向) : 501927; 站点名称(局向) : 环市镇安中一; 告警对象类型 : SDR; 告警对象ID : 501927; 告警对象名称 : 环市镇安中一; 单板类型 : BPL1; ,"""","""","""","""","""","""",调测恢复,"""","""","""","""",1439235125716,8.142.3.168,"""",""广东电信LTE_OMMB3,佛山市禅城区1(440601)"",广东电信LTE_OMMB3,平台告警(20420),00:00:20,"""","""","""","""",线路故障(517),""""
"""",未确认,严重,环市镇安中一(501927),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",LTE小区退出服务(198094419),2015-10-15 10:35:43,管理网元(MO SDR),服务质量告警,1.S1链路故障； 2.小区所使用的主控板、基带板或RRU故障； 3.小区配置失败； 4.时钟失锁。,""小区用户标识: 环市镇安中一_1, 小区标识：1：RRU板异常导致; 小区类型：普通小区; 单板序列号: 275836101155; L eNBId:501927"",否,2015-10-15 10:36:03,"""",CELL,""SubNetwork=440601,MEID=501927,ENBFunctionFDD=501927,EUtranCellFDD=1"",CCC,1,环市镇安中一,501927,环市镇安中一_1,LTE FDD,10,"""","""","""",站点ID(局向) : 501927; 站点名称(局向) : 环市镇安中一; 告警对象类型 : CELL; 告警对象ID : 1; 告警对象名称 : 环市镇安中一_1; 单板类型 : CCC; ,"""","""","""","""","""","""",调测恢复,"""","""","""","""",1439235125713,8.142.3.168,"""",""广东电信LTE_OMMB3,佛山市禅城区1(440601)"",广东电信LTE_OMMB3,LTE FDD业务告警(20428),00:00:20,"""","""","""","""",通信子系统故障(306),""""
"""",未确认,主要,环市镇安中一(501927),""地面资源(MO SDR)=1,机架(MO SDR)=1,机框(MO SDR)=1,单板(MO SDR)=1"",X2断链告警(198094421),2015-10-15 10:35:43,管理网元(MO SDR),通信告警,1.SCTP偶联断； 2.X2AP建立失败（协商失败或基站无小区）。,单板序列号: 275836101155; L eNBId:501927,否,2015-10-15 10:36:03,"""",SDR,""SubNetwork=440601,MEID=501927,TransportNetwork=1"",CCC,501927,环市镇安中一,501927,环市镇安中一,LTE FDD,3,"""","""","""",站点ID(局向) : 501927; 站点名称(局向) : 环市镇安中一; 告警对象类型 : SDR; 告警对象ID : 501927; 告警对象名称 : 环市镇安中一; 单板类型 : CCC; ,"""","""","""","""","""","""",调测恢复,"""","""","""","""",1439235125715,8.142.3.168,"""",""广东电信LTE_OMMB3,佛山市禅城区1(440601)"",广东电信LTE_OMMB3,LTE FDD业务告警(20428),00:00:20,"""","""","""","""",通信子系统故障(306),""""
"""",未确认,主要,永丰大厦(502100),""地面资源(MO SDR)=1,机架(MO SDR)=53,机框(MO SDR)=1,单板(MO SDR)=1"",PA去使能(198098440),2015-10-15 10:34:08,管理网元(MO SDR),设备告警,1. 人工停用PA。 2. 天馈过驻波。 3. 内部故障导致PA停用。,""PA-ANT4; 原因信息: ANT OVER VSWR; 单板序列号: 219030688753; L eNBId:502100; 拓扑: 光接口板=(1,1,6), 光接口板光口号=2, 主链级联号=2"",否,2015-10-15 10:34:43,"""",RU,""SubNetwork=440601,MEID=502100,Equipment=1,Rack=53,SubRack=1,Slot=1,PlugInUnit=1"",R8882 S2100(B),53,永丰大厦,502100,永丰大厦,LTE FDD,4,"""","""","""",站点ID(局向) : 502100; 站点名称(局向) : 永丰大厦; 告警对象类型 : RU; 告警对象ID : 53; 告警对象名称 : 永丰大厦; 单板类型 : R8882 S2100(B); ,"""","""","""","""","""","""",调测恢复,"""","""","""","""",1439235125669,8.142.1.23,"""",""广东电信LTE_OMMB3,佛山市禅城区1(440601)"",广东电信LTE_OMMB3,平台告警(20420),00:00:35,"""","""","""","""",基础资源不可用(356),""""
"""",未确认,严重,永丰大厦(502100),""地面资源(MO SDR)=1,机架(MO SDR)=53,机框(MO SDR)=1,单板(MO SDR)=1"",天馈驻波比异常(198098465),2015-10-15 10:34:08,管理网元(MO SDR),设备告警,天馈线缆连接故障。,""TX-ANT4; 驻波比等级: 严重, 驻波比值: 3.31, 小区ID: CellId[0] = 2; 单板序列号: 219030688753; L eNBId:502100; 拓扑: 光接口板=(1,1,6), 光接口板光口号=2, 主链级联号=2"",否,2015-10-15 10:34:43,"""",RU,""SubNetwork=440601,MEID=502100,Equipment=1,Rack=53,SubRack=1,Slot=1,PlugInUnit=1"",R8882 S2100(B),53,永丰大厦,502100,永丰大厦,LTE FDD,3,"""","""","""",站点ID(局向) : 502100; 站点名称(局向) : 永丰大厦; 告警对象类型 : RU; 告警对象ID : 53; 告警对象名称 : 永丰大厦; 单板类型 : R8882 S2100(B); ,"""","""","""","""","""","""",调测恢复,"""","""","""","""",1439235125670,8.142.1.23,"""",""广东电信LTE_OMMB3,佛山市禅城区1(440601)"",广东电信LTE_OMMB3,平台告警(20420),00:00:35,"""","""","""","""",天线问题(503),""""",
            14)]
        public void Test_ReadFromMemory(string testInput, int count)
        {
            var reader = testInput.GetStreamReader();
            _service.UploadZteAlarms(reader);
            Assert.AreEqual(_service.GetAlarmsToBeDump(), count);
        }

        [Test]
        public void Test_Integrity()
        {
            var testDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "CsvFiles");
            var path = Path.Combine(testDir, "历史告警查询(禅城).csv");
            var reader = new StreamReader(path, Encoding.GetEncoding("GB2312"));
            var stats = CsvContext.Read<AlarmStatCsv>(reader,
                CsvFileDescription.CommaDescription).ToList();
            Assert.IsNotNull(stats, "wrong format");
            Assert.AreEqual(stats.Count, 307);
            _service.UploadZteAlarms(reader);
            Assert.AreEqual(_service.GetAlarmsToBeDump(), 307);
        }
    }
}
