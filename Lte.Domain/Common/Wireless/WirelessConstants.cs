using System;
using System.Collections.Generic;

namespace Lte.Domain.Common.Wireless
{
    public static class WirelessConstants
    {
        public static readonly Dictionary<string, Tuple<object, string>[]> EnumDictionary = new Dictionary
            <string, Tuple<object, string>[]>
        {
            {
                "AlarmType", new[]
                {
                    new Tuple<object, string>(AlarmType.CeNotEnough, "CE不足"),
                    new Tuple<object, string>(AlarmType.StarUnlocked, "锁星问题"),
                    new Tuple<object, string>(AlarmType.TrunkProblem, "传输问题"),
                    new Tuple<object, string>(AlarmType.RssiProblem, "RSSI问题"),
                    new Tuple<object, string>(AlarmType.CellDown, "小区退服"),
                    new Tuple<object, string>(AlarmType.VswrProblem, "驻波比问题"),
                    new Tuple<object, string>(AlarmType.VswrLte, "天馈驻波比异常(198098465)"),
                    new Tuple<object, string>(AlarmType.Unimportant, "不影响业务问题"),
                    new Tuple<object, string>(AlarmType.LinkBroken, "网元断链告警(198099803)"),
                    new Tuple<object, string>(AlarmType.X2Broken, "X2断链告警(198094421)"),
                    new Tuple<object, string>(AlarmType.X2UserPlane, "X2用户面路径不可用(198094467)"),
                    new Tuple<object, string>(AlarmType.S1Broken, "S1断链告警(198094420)"),
                    new Tuple<object, string>(AlarmType.S1UserPlane, "S1用户面路径不可用(198094466)"),
                    new Tuple<object, string>(AlarmType.EthernetBroken, "以太网物理连接断(198098252)"),
                    new Tuple<object, string>(AlarmType.LteCellDown, "LTE小区退出服务(198094419)"),
                    new Tuple<object, string>(AlarmType.LteCellError, "小区关断告警(198094461)"),
                    new Tuple<object, string>(AlarmType.SuperCellDown, "超级小区CP退出服务(198094440)"),
                    new Tuple<object, string>(AlarmType.ENodebDown, "基站退出服务(198094422)"),
                    new Tuple<object, string>(AlarmType.GnssStar, "GNSS接收机搜星故障(198096837)"),
                    new Tuple<object, string>(AlarmType.GnssFeed, "GNSS天馈链路故障(198096836)"),
                    new Tuple<object, string>(AlarmType.PaDeactivate, "PA去使能(198098440)"),
                    new Tuple<object, string>(AlarmType.RruBroken, "RRU链路断(198097605)"),
                    new Tuple<object, string>(AlarmType.RxChannel, "RX通道异常(198098469)"),
                    new Tuple<object, string>(AlarmType.SntpFail, "SNTP对时失败(198092014)"),
                    new Tuple<object, string>(AlarmType.VersionError, "版本包故障(198097567)"),
                    new Tuple<object, string>(AlarmType.InitializationError, "初始化失败(198092070)"),
                    new Tuple<object, string>(AlarmType.BoardInexist, "单板不在位(198092072)"),
                    new Tuple<object, string>(AlarmType.BoardInitialize, "单板处于初始化状态(198092348)"),
                    new Tuple<object, string>(AlarmType.BoardPowerDown, "单板电源关断(198092057)"),
                    new Tuple<object, string>(AlarmType.BoardCommunication, "单板通讯链路断(198097060)"),
                    new Tuple<object, string>(AlarmType.BoardSoftId, "找不到单板软件标识(198092397)"),
                    new Tuple<object, string>(AlarmType.FiberReceiver, "光口接收链路故障(198098319)"),
                    new Tuple<object, string>(AlarmType.FiberModule, "光模块不可用(198098318)"),
                    new Tuple<object, string>(AlarmType.BbuInitialize, "基带单元处于初始化状态(198097050)"),
                    new Tuple<object, string>(AlarmType.Temperature, "温度异常(198097061)"),
                    new Tuple<object, string>(AlarmType.FanTemperature, "进风口温度异常(198092042)"),
                    new Tuple<object, string>(AlarmType.NoClock, "没有可用的空口时钟源(198092217)"),
                    new Tuple<object, string>(AlarmType.InnerError, "内部故障(198098467)"),
                    new Tuple<object, string>(AlarmType.SoftwareAbnormal, "软件运行异常(198097604)"),
                    new Tuple<object, string>(AlarmType.ApparatusPowerDown, "设备掉电(198092295)"),
                    new Tuple<object, string>(AlarmType.InputVolte, "输入电压异常(198092053)"),
                    new Tuple<object, string>(AlarmType.OuterApparatus, "外部扩展设备故障(198098468)"),
                    new Tuple<object, string>(AlarmType.ParametersConfiguation, "网元不支持配置的参数(198097510)"),
                    new Tuple<object, string>(AlarmType.BadPerformance, "性能门限越界(1513)"),
                    new Tuple<object, string>(AlarmType.Others, "其他告警"),
                    new Tuple<object, string>(AlarmType.DatabaseDelay, "性能数据入库延迟(15010001)")
                }
            },
            {
                "AlarmLevel", new[]
                {
                    new Tuple<object, string>(AlarmLevel.Serious, "严重"),
                    new Tuple<object, string>(AlarmLevel.Primary, "主要"),
                    new Tuple<object, string>(AlarmLevel.Secondary, "次要"),
                    new Tuple<object, string>(AlarmLevel.Warning, "警告"),
                    new Tuple<object, string>(AlarmLevel.Urgent, "紧急"),
                    new Tuple<object, string>(AlarmLevel.Important, "重要"),
                    new Tuple<object, string>(AlarmLevel.Tips, "提示")
                }
            },
            {
                "AlarmCategory", new[]
                {
                    new Tuple<object, string>(AlarmCategory.Communication, "通信告警"),
                    new Tuple<object, string>(AlarmCategory.Qos, "服务质量告警"),
                    new Tuple<object, string>(AlarmCategory.ProcessError, "处理错误告警"),
                    new Tuple<object, string>(AlarmCategory.Environment, "环境告警"),
                    new Tuple<object, string>(AlarmCategory.Apparatus, "设备告警"),
                    new Tuple<object, string>(AlarmCategory.Huawei, "华为告警")
                }
            },
            {
                "AntennaPortsConfigure", new[]
                {
                    new Tuple<object, string>(AntennaPortsConfigure.Antenna1T1R, "1T1R"),
                    new Tuple<object, string>(AntennaPortsConfigure.Antenna2T2R, "2T2R"),
                    new Tuple<object, string>(AntennaPortsConfigure.Antenna2T4R, "2T4R"),
                    new Tuple<object, string>(AntennaPortsConfigure.Antenna2T8R, "2T8R"),
                    new Tuple<object, string>(AntennaPortsConfigure.Antenna4T4R, "4T4R")
                }
            },
            {
                "DemandLevel", new[]
                {
                    new Tuple<object, string>(DemandLevel.LevelA, "A级"),
                    new Tuple<object, string>(DemandLevel.LevelB, "B级"),
                    new Tuple<object, string>(DemandLevel.LevelC, "C级"),
                }
            },
            {
                "VehicleType", new[]
                {
                    new Tuple<object, string>(VehicleType.CdmaHuawei, "C网华为"),
                    new Tuple<object, string>(VehicleType.CdmaZte, "C网中兴"),
                    new Tuple<object, string>(VehicleType.CdmaAl, "C网阿朗"),
                    new Tuple<object, string>(VehicleType.PhsUt, "PHS UTStarcom"),
                    new Tuple<object, string>(VehicleType.PhsZte, "PHS中兴"),
                    new Tuple<object, string>(VehicleType.SatelliteC, "PHS中兴"),
                    new Tuple<object, string>(VehicleType.SatelliteKu, "Ku频段卫星车"),
                    new Tuple<object, string>(VehicleType.Flyaway, "Flyaway"),
                    new Tuple<object, string>(VehicleType.Electirc1000Kw, "1000KW电源车"),
                    new Tuple<object, string>(VehicleType.Electirc200Kw, "200KW电源车"),
                    new Tuple<object, string>(VehicleType.Electric60Kw, "60KW电源车"),
                    new Tuple<object, string>(VehicleType.SoftSwitch, "软交换应急车"),
                    new Tuple<object, string>(VehicleType.LittleYouji, "小油机"),
                    new Tuple<object, string>(VehicleType.LittleMicrowave, "小微波"),
                    new Tuple<object, string>(VehicleType.MarineVstat, "海事卫星电话"),
                    new Tuple<object, string>(VehicleType.EmergencyVstat, "应急VSAT"),
                    new Tuple<object, string>(VehicleType.Broadcast, "电台"),
                    new Tuple<object, string>(VehicleType.CPlusL, "C+L"),
                    new Tuple<object, string>(VehicleType.LteHuawei, "L网华为"),
                    new Tuple<object, string>(VehicleType.LteZte, "L网中兴"),
                    new Tuple<object, string>(VehicleType.LteEricsson, "L网爱立信")
                }
            },
            {
                "OrderPreciseStatPolicy", new[]
                {
                    new Tuple<object, string>(OrderPreciseStatPolicy.OrderBySecondRate, "按照精确覆盖率升序"),
                    new Tuple<object, string>(OrderPreciseStatPolicy.OrderBySecondNeighborsDescending, "按照第二邻区数量降序"),
                    new Tuple<object, string>(OrderPreciseStatPolicy.OrderByFirstRate, "按照第一邻区精确覆盖率升序"),
                    new Tuple<object, string>(OrderPreciseStatPolicy.OrderByFirstNeighborsDescending, "按照第一邻区数量降序"),
                    new Tuple<object, string>(OrderPreciseStatPolicy.OrderByTotalMrsDescending, "按照总测量报告数降序"),
                    new Tuple<object, string>(OrderPreciseStatPolicy.OrderByTopDatesDescending, "按照TOP天数排序")
                }
            },
            {
                "OrderTopConnection3GPolicy", new[]
                {
                    new Tuple<object, string>(OrderTopConnection3GPolicy.OrderByConnectionFailsDescending,
                        "按照连接失败次数降序排列"),
                    new Tuple<object, string>(OrderTopConnection3GPolicy.OrderByConnectionRate, "按照连接成功率升序排列"),
                    new Tuple<object, string>(OrderTopConnection3GPolicy.OrderByTopDatesDescending, "按照出现次数降序排列")
                }
            },
            {
                "OrderTopDrop2GPolicy", new[]
                {
                    new Tuple<object, string>(OrderTopDrop2GPolicy.OrderByDropsDescending, "按照掉话次数降序排列"),
                    new Tuple<object, string>(OrderTopDrop2GPolicy.OrderByDropRateDescending, "按照掉话率降序排列"),
                    new Tuple<object, string>(OrderTopDrop2GPolicy.OrderByTopDatesDescending, "按照出现次数降序排列")
                }
            },
            {
                "NetworkType", new[]
                {
                    new Tuple<object, string>(NetworkType.With2G, "2G"),
                    new Tuple<object, string>(NetworkType.With2G3G, "2G/3G"),
                    new Tuple<object, string>(NetworkType.With2G3G4G, "2G/3G/4G"),
                    new Tuple<object, string>(NetworkType.With2G3G4G4GPlus, "2G/3G/4G/4G+"),
                    new Tuple<object, string>(NetworkType.With3G, "3G"),
                    new Tuple<object, string>(NetworkType.With4G, "4G")
                }
            },
            {
                "MarketTheme", new[]
                {
                    new Tuple<object, string>(MarketTheme.CollegeAutumn, "校园秋营"),
                    new Tuple<object, string>(MarketTheme.CollegeSpring, "校园春营"),
                    new Tuple<object, string>(MarketTheme.ElectricGauge, "电力抄表"),
                    new Tuple<object, string>(MarketTheme.HappyNewYear, "岁末年初"),
                    new Tuple<object, string>(MarketTheme.OpenChannel, "开放渠道"),
                    new Tuple<object, string>(MarketTheme.Others, "其他")
                }
            },
            {
                "EmergencyState", new[]
                {
                    new Tuple<object, string>(EmergencyState.Begin, "生成工单"), 
                    new Tuple<object, string>(EmergencyState.Register, "通信车申请"),
                    new Tuple<object, string>(EmergencyState.FiberBegin, "光纤起单"),
                    new Tuple<object, string>(EmergencyState.ElectricPrepare, "电源准备"),
                    new Tuple<object, string>(EmergencyState.FiberFinish, "光纤调通"),
                    new Tuple<object, string>(EmergencyState.VehicleInPlace, "通信车就位"),
                    new Tuple<object, string>(EmergencyState.VehicleInService, "通信车开通"),
                    new Tuple<object, string>(EmergencyState.Test, "优化测试"),
                    new Tuple<object, string>(EmergencyState.Finish, "完成")
                }
            },
            {
                "ComplainSource", new[]
                {
                    new Tuple<object, string>(ComplainSource.Number10000, "10000号"),
                    new Tuple<object, string>(ComplainSource.Qq, "10000号QQ客服"),
                    new Tuple<object, string>(ComplainSource.Weixin, "10000号微信客服"),
                    new Tuple<object, string>(ComplainSource.Voice, "10000号语音呼入"),
                    new Tuple<object, string>(ComplainSource.BranchService, "分公司客服中心"),
                    new Tuple<object, string>(ComplainSource.Others, "其他"),
                    new Tuple<object, string>(ComplainSource.Wangting, "网厅"),
                    new Tuple<object, string>(ComplainSource.Zhangting, "掌厅"),
                    new Tuple<object, string>(ComplainSource.Yingyeting, "营业厅"),
                    new Tuple<object, string>(ComplainSource.Unknown, "未知")
                }
            },
            {
                "CustomerType", new[]
                {
                    new Tuple<object, string>(CustomerType.Individual, "个人客户"),
                    new Tuple<object, string>(CustomerType.Family, "家庭客户"),
                    new Tuple<object, string>(CustomerType.Company, "政企客户"),
                    new Tuple<object, string>(CustomerType.Unknown, "未知"),
                }
            },
            {
                "ComplainReason", new[]
                {
                    new Tuple<object, string>(ComplainReason.OutOfBuisiness, "错派或非本专业"),
                    new Tuple<object, string>(ComplainReason.SubscriberProblem, "客户侧问题"),
                    new Tuple<object, string>(ComplainReason.OtherMalfunction, "其他原因导致故障"),
                    new Tuple<object, string>(ComplainReason.NetworkMalfunction, "网络设备故障"),
                    new Tuple<object, string>(ComplainReason.NetworkOptimize, "网络优化调整"),
                    new Tuple<object, string>(ComplainReason.UnConfirmed, "未确认"),
                    new Tuple<object, string>(ComplainReason.BiqianMalfunction, "物业逼迁导致故障"),
                    new Tuple<object, string>(ComplainReason.NeedNewSite, "需新增资源"),
                    new Tuple<object, string>(ComplainReason.NeedNewSite, "新增资源"),
                    new Tuple<object, string>(ComplainReason.CustomerReservation, "预约客户"),
                    new Tuple<object, string>(ComplainReason.Unknown, "未知原因")
                }
            },
            {
                "ComplainSubReason", new[]
                {
                    new Tuple<object, string>(ComplainSubReason.Biqian, "逼迁关停"),
                    new Tuple<object, string>(ComplainSubReason.ParameterAdjust, "参数调整"),
                    new Tuple<object, string>(ComplainSubReason.OutOfBuisiness, "非本专业原因"),
                    new Tuple<object, string>(ComplainSubReason.NothingWithNetwork, "非网络质量投诉"),
                    new Tuple<object, string>(ComplainSubReason.BaseStationMalfunction, "基站设备故障"),
                    new Tuple<object, string>(ComplainSubReason.WrongDestination, "申告地错派"),
                    new Tuple<object, string>(ComplainSubReason.OutInterference, "外部干扰"),
                    new Tuple<object, string>(ComplainSubReason.ProjectNotBegin, "未立项"),
                    new Tuple<object, string>(ComplainSubReason.UnableToConfirmCustomer, "无法与用户确认"),
                    new Tuple<object, string>(ComplainSubReason.WuyeProblem, "物业阻挠"),
                    new Tuple<object, string>(ComplainSubReason.WrongReasonJustified, "业务表象错派"),
                    new Tuple<object, string>(ComplainSubReason.RecoverButUnknownReason, "业务恢复但原因未知"),
                    new Tuple<object, string>(ComplainSubReason.EmergencyOptimization, "应急优化解决"),
                    new Tuple<object, string>(ComplainSubReason.SubscriberFeeling, "用户感知问题"),
                    new Tuple<object, string>(ComplainSubReason.SubscriberTerminal, "用户感知问题"),
                    new Tuple<object, string>(ComplainSubReason.ReservationTest, "预约客户测试"),
                    new Tuple<object, string>(ComplainSubReason.Others, "其他原因"),
                }
            },
            {
                "ComplainScene", new[]
                {
                    new Tuple<object, string>(ComplainScene.BetweenCityAndVillage, "城乡结合部"),
                    new Tuple<object, string>(ComplainScene.VillageInCity, "城中村"),
                    new Tuple<object, string>(ComplainScene.SubRailway, "地铁"),
                    new Tuple<object, string>(ComplainScene.TransportationRoutine, "交通要道"),
                    new Tuple<object, string>(ComplainScene.College, "校园"),
                    new Tuple<object, string>(ComplainScene.CenterOfCity, "中心市区"),
                    new Tuple<object, string>(ComplainScene.ImportantRegion, "重要区域"),
                    new Tuple<object, string>(ComplainScene.Residential, "住宅小区"),
                    new Tuple<object, string>(ComplainScene.Others, "其他")
                }
            },
            {
                "ComplainCategory", new[]
                {
                    new Tuple<object, string>(ComplainCategory.LowSpeed3G, "3G-网速慢"),
                    new Tuple<object, string>(ComplainCategory.WeakCoverage3G, "3G-无信号或信号弱"),
                    new Tuple<object, string>(ComplainCategory.LowSpeed4G, "4G-网速慢"),
                    new Tuple<object, string>(ComplainCategory.WeakCoverage4G, "4G-无信号或信号弱"),
                    new Tuple<object, string>(ComplainCategory.BadQualityVoice, "语音-通话质量差"),
                    new Tuple<object, string>(ComplainCategory.WeakCoverageVoice, "语音-无信号或信号弱"),
                    new Tuple<object, string>(ComplainCategory.Others, "其他"),
                    new Tuple<object, string>(ComplainCategory.Voice, "语音"), 
                    new Tuple<object, string>(ComplainCategory.Web, "上网"),
                    new Tuple<object, string>(ComplainCategory.ShortMessage, "短信"),  
                }
            },
            {
                "WorkItemType", new[]
                {
                    new Tuple<object, string>(WorkItemType.Infrastructure4G, "4G基础数据"),
                    new Tuple<object, string>(WorkItemType.Interference4G, "4G干扰故障"),
                    new Tuple<object, string>(WorkItemType.Kpi2G, "2G性能故障"),
                    new Tuple<object, string>(WorkItemType.Kpi4G, "4G性能故障"),
                    new Tuple<object, string>(WorkItemType.NetworkProblem, "网元故障"),
                    new Tuple<object, string>(WorkItemType.RrcConnection, "RRC连接成功率恶化"),
                    new Tuple<object, string>(WorkItemType.Others, "其他类型"),
                    new Tuple<object, string>(WorkItemType.DailyTask, "日常网优作业计划"),
                    new Tuple<object, string>(WorkItemType.DailyReport, "日报"),
                    new Tuple<object, string>(WorkItemType.Yilutong, "翼路通"),
                    new Tuple<object, string>(WorkItemType.KeySite, "省-集团测试保障-关键站点清单收集"),
                    new Tuple<object, string>(WorkItemType.SelfConstruction, "自建工单")
                }
            },
            {
                "WorkItemSubtype", new[]
                {
                    new Tuple<object, string>(WorkItemSubtype.CallSetup, "小区级呼叫建立成功率异常"),
                    new Tuple<object, string>(WorkItemSubtype.DataMaintainence, "数据维护"),
                    new Tuple<object, string>(WorkItemSubtype.Drop2G, "小区级掉话率异常"),
                    new Tuple<object, string>(WorkItemSubtype.ErabConnection, "小区级E-RAB建立成功率异常"),
                    new Tuple<object, string>(WorkItemSubtype.ErabDrop, "小区级E-RAB掉线率异常"),
                    new Tuple<object, string>(WorkItemSubtype.PrbUplinkInterference, "PRB上行控制信道干扰"),
                    new Tuple<object, string>(WorkItemSubtype.PrbUplinkSevereInterference, "PRB上行控制信道严重干扰"),
                    new Tuple<object, string>(WorkItemSubtype.PreciseRate, "小区级精确覆盖率异常"),
                    new Tuple<object, string>(WorkItemSubtype.RrcConnection, "小区级RRC连接成功率恶化"),
                    new Tuple<object, string>(WorkItemSubtype.Rssi, "RSSI故障"),
                    new Tuple<object, string>(WorkItemSubtype.UplinkInterference, "小区级上行干扰"),
                    new Tuple<object, string>(WorkItemSubtype.UplinkSevereInterference, "小区级上行严重干扰"),
                    new Tuple<object, string>(WorkItemSubtype.Others, "其他类型"),
                    new Tuple<object, string>(WorkItemSubtype.AutomaticDt, "自动路测系统管理"),
                    new Tuple<object, string>(WorkItemSubtype.ResourceOptimize, "资源调优管理"),
                    new Tuple<object, string>(WorkItemSubtype.ProjectOptimization, "专题专项优化"),
                    new Tuple<object, string>(WorkItemSubtype.CommunicationSustain, "重大通信保障"),
                    new Tuple<object, string>(WorkItemSubtype.OptimizationWorkItem, "优化工单处理"),
                    new Tuple<object, string>(WorkItemSubtype.KpiAlarm, "性能监控预警"),
                    new Tuple<object, string>(WorkItemSubtype.RectifyDemand, "网优整改需求管理"),
                    new Tuple<object, string>(WorkItemSubtype.NetworkPlan, "网络规划选址"),
                    new Tuple<object, string>(WorkItemSubtype.SpecialData, "特殊数据更新"),
                    new Tuple<object, string>(WorkItemSubtype.Dispossessed, "逼迁应急优化"),
                    new Tuple<object, string>(WorkItemSubtype.ParameterCheck, "参数核查优化"),
                    new Tuple<object, string>(WorkItemSubtype.ClusterRf, "簇射频优化"),
                    new Tuple<object, string>(WorkItemSubtype.CoverageEvaluation, "覆盖系统评估"),
                    new Tuple<object, string>(WorkItemSubtype.InterferenceCheck, "干扰排查整治"),
                    new Tuple<object, string>(WorkItemSubtype.EngineeringOptimization, "工程优化管理"),
                    new Tuple<object, string>(WorkItemSubtype.PlanDemandLibrary, "规划需求库管理"),
                    new Tuple<object, string>(WorkItemSubtype.EngineeringParameters, "基站工参维护"),
                    new Tuple<object, string>(WorkItemSubtype.MarketSustain, "市场支撑保障"),
                    new Tuple<object, string>(WorkItemSubtype.CapacityEvaluation, "容量系统评估"),
                    new Tuple<object, string>(WorkItemSubtype.CustomerComplain, "客户投诉处理"),
                    new Tuple<object, string>(WorkItemSubtype.WeeklyAnalysis, "每周质量分析"),
                    new Tuple<object, string>(WorkItemSubtype.DailyTest, "日常测试管理")
                }
            },
            {
                "WorkItemState", new[]
                {
                    new Tuple<object, string>(WorkItemState.Processing, "待处理"),
                    new Tuple<object, string>(WorkItemState.Processed, "待归档"),
                    new Tuple<object, string>(WorkItemState.Finished, "已归档"),
                    new Tuple<object, string>(WorkItemState.ToBeSigned, "待签单"),
                    new Tuple<object, string>(WorkItemState.Processing, "处理"),
                    new Tuple<object, string>(WorkItemState.Processing, "任务处理"),  
                    new Tuple<object, string>(WorkItemState.Auditing, "审核"), 
                    new Tuple<object, string>(WorkItemState.Auditing, "回单审核"), 
                }
            },
            {
                "WorkItemCause", new[]
                {
                    new Tuple<object, string>(WorkItemCause.Antenna, "天线问题"),
                    new Tuple<object, string>(WorkItemCause.AntennaFeedline, "天馈器件异常"),
                    new Tuple<object, string>(WorkItemCause.ApplianceProblem, "设备故障"),
                    new Tuple<object, string>(WorkItemCause.FeedAppliance, "馈线链接器件问题"),
                    new Tuple<object, string>(WorkItemCause.HardSwitch, "硬切换问题"),
                    new Tuple<object, string>(WorkItemCause.ImproperPower, "功率不合理"),
                    new Tuple<object, string>(WorkItemCause.IndoorDistribution, "室分器件异常"),
                    new Tuple<object, string>(WorkItemCause.InterferenceCoverage, "干扰覆盖问题"),
                    new Tuple<object, string>(WorkItemCause.InvisibleAlarm, "主设备隐性故障"),
                    new Tuple<object, string>(WorkItemCause.Jamming, "拥塞"),
                    new Tuple<object, string>(WorkItemCause.MainAlarm, "主设备障碍告警"),
                    new Tuple<object, string>(WorkItemCause.NeighborCell, "邻区漏配"),
                    new Tuple<object, string>(WorkItemCause.Others, "其他"),
                    new Tuple<object, string>(WorkItemCause.Others, "其它"),
                    new Tuple<object, string>(WorkItemCause.Others, "其它原因"),
                    new Tuple<object, string>(WorkItemCause.OuterInterference, "外界干扰"),
                    new Tuple<object, string>(WorkItemCause.OuterInterference, "网络外部干扰"),
                    new Tuple<object, string>(WorkItemCause.OverCoverage, "越区覆盖"),
                    new Tuple<object, string>(WorkItemCause.OverCoverage, "越区覆盖问题"),
                    new Tuple<object, string>(WorkItemCause.Overload, "负荷过载"),
                    new Tuple<object, string>(WorkItemCause.PagingChannelBusy, "寻呼信道负荷高"),
                    new Tuple<object, string>(WorkItemCause.ParameterConfig, "参数配置错误"),
                    new Tuple<object, string>(WorkItemCause.PilotPolution, "导频污染"),
                    new Tuple<object, string>(WorkItemCause.ResouceJamming, "资源拥塞"),
                    new Tuple<object, string>(WorkItemCause.Rssi, "RSSI异常"),
                    new Tuple<object, string>(WorkItemCause.TrunkProblem, "传输故障"),
                    new Tuple<object, string>(WorkItemCause.WeakCoverage, "弱覆盖"),
                    new Tuple<object, string>(WorkItemCause.WeakCoverage, "弱覆盖问题"),
                    new Tuple<object, string>(WorkItemCause.WrongDownTilt, "下倾角错误")
                }
            },
            {
                "SolveFunction", new []
                {
                    new Tuple<object, string>(SolveFunction.NewSitePlanned,"新增基站（已规划）"), 
                    new Tuple<object, string>(SolveFunction.NewSiteUnplanned, "新增基站（未规划）"), 
                    new Tuple<object, string>(SolveFunction.NewRruPlanned, "新增RRU（已规划）"), 
                    new Tuple<object, string>(SolveFunction.NewRruUnplanned, "新增RRU（未规划）"), 
                    new Tuple<object, string>(SolveFunction.NewDistributionPlanned, "新增室分系统（已规划）"), 
                    new Tuple<object, string>(SolveFunction.NewDistributionUnplanned, "新增室分系统（未规划）"), 
                    new Tuple<object, string>(SolveFunction.NewRepeaterPlanned, "新增直放站（已规划）"),
                    new Tuple<object, string>(SolveFunction.NewRepeaterUnplanned, "新增直放站（未规划）"),
                    new Tuple<object, string>(SolveFunction.NewDoPlanned, "新增DO资源（有规划）"),
                    new Tuple<object, string>(SolveFunction.NewDoUnplanned, "新增DO资源（无规划）"),
                    new Tuple<object, string>(SolveFunction.DistributionExpansion, "室分系统（扩容）"),
                    new Tuple<object, string>(SolveFunction.SubscriberTerminal, "用户终端问题"),
                    new Tuple<object, string>(SolveFunction.BtsMalfunction, "基站故障处理"),
                    new Tuple<object, string>(SolveFunction.DistributionMalfunction, "室分故障处理"),
                    new Tuple<object, string>(SolveFunction.RepeaterMalfunction, "直放站故障处理"),
                    new Tuple<object, string>(SolveFunction.NetworkOptimization, "网优调整"),
                    new Tuple<object, string>(SolveFunction.SelfRecoverage, "查中自复户"),
                    new Tuple<object, string>(SolveFunction.NormalTest, "测试正常"),
                    new Tuple<object, string>(SolveFunction.NoContact, "联系不上用"),
                    new Tuple<object, string>(SolveFunction.Others, "其他")
                }
            },
            {
                "VipState", new[]
                {
                    new Tuple<object, string>(VipState.Begin, "生成工单"), 
                    new Tuple<object, string>(VipState.Preprocessed, "预处理"),
                    new Tuple<object, string>(VipState.Test, "现场测试"),  
                    new Tuple<object, string>(VipState.TestEvaluation, "测试评估"), 
                    new Tuple<object, string>(VipState.NetworkOptimization, "优化调整"), 
                    new Tuple<object, string>(VipState.NewSite, "新增资源"), 
                    new Tuple<object, string>(VipState.EmergencyDemand, "通信车需求"), 
                    new Tuple<object, string>(VipState.Conclusion, "保障结论"), 
                }
            },
            {
                "ComplainState", new[]
                {
                    new Tuple<object, string>(ComplainState.Begin, "生成工单"), 
                    new Tuple<object, string>(ComplainState.Preprocessed, "预处理"),
                    new Tuple<object, string>(ComplainState.PlanTest, "预约测试"),
                    new Tuple<object, string>(ComplainState.Test, "现场测试"),   
                    new Tuple<object, string>(ComplainState.ProcessIssues, "问题处理"),
                    new Tuple<object, string>(ComplainState.Feedback, "回访用户"),
                    new Tuple<object, string>(ComplainState.Archive, "工单归档"),   
                }
            },
            {
                "AntennaFactory", new []
                {
                    new Tuple<object, string>(AntennaFactory.Rfs, "RFS"), 
                    new Tuple<object, string>(AntennaFactory.Andrew, "安德鲁"), 
                    new Tuple<object, string>(AntennaFactory.Anjiexin, "安捷信"), 
                    new Tuple<object, string>(AntennaFactory.Guoren, "国人"), 
                    new Tuple<object, string>(AntennaFactory.Jingxin, "京信"), 
                    new Tuple<object, string>(AntennaFactory.Indoor, "室分"), 
                    new Tuple<object, string>(AntennaFactory.Indoor, "室内"), 
                }
            },
            {
                "InfrastructureType", new []
                {
                    new Tuple<object, string>(InfrastructureType.ENodeb, "LTE基站"),
                    new Tuple<object, string>(InfrastructureType.Cell, "LTE小区"),
                    new Tuple<object, string>(InfrastructureType.CdmaBts, "CDMA基站"),
                    new Tuple<object, string>(InfrastructureType.CdmaCell, "CDMA小区"),
                    new Tuple<object, string>(InfrastructureType.LteIndoor, "LTE室内分布"),     
                    new Tuple<object, string>(InfrastructureType.CdmaIndoor, "CDMA室内分布"),
                    new Tuple<object, string>(InfrastructureType.HotSpot, "热点"),
                    new Tuple<object, string>(InfrastructureType.Unknown, "未知"),   
                }
            },
            {
                "HotspotType", new []
                {
                    new Tuple<object, string>(HotspotType.Building, "楼宇"),
                    new Tuple<object, string>(HotspotType.College, "校园网"),
                    new Tuple<object, string>(HotspotType.Hospital, "医院"),
                    new Tuple<object, string>(HotspotType.ShoppingMall, "商场"),
                    new Tuple<object, string>(HotspotType.TopPrecise, "TOP小区"),
                    new Tuple<object, string>(HotspotType.Transportation, "交通枢纽"),
                    new Tuple<object, string>(HotspotType.Others, "其他"),       
                }
            }
        };
    }

    public static class WirelessPublic
    {
        public static readonly Tuple<AlarmType, string>[] AlarmTypeHuaweiList =
        {
            new Tuple<AlarmType, string>(AlarmType.PciCrack, "小区PCI冲突告警"),
            new Tuple<AlarmType, string>(AlarmType.FiberModule, "BBU光模块收发异常告警"),
            new Tuple<AlarmType, string>(AlarmType.RruBroken, "射频单元硬件故障告警"),
            new Tuple<AlarmType, string>(AlarmType.RruRtwp, "射频单元接收通道RTWP/RSSI过低告警"),
            new Tuple<AlarmType, string>(AlarmType.BadPerformance, "小区服务能力下降告警"),
            new Tuple<AlarmType, string>(AlarmType.BbuCpriLost, "BBU CPRI光模块/电接口不在位告警"),
            new Tuple<AlarmType, string>(AlarmType.BbuCpriInterface, "BBU CPRI光模块/电接口不在位告警"),
            new Tuple<AlarmType, string>(AlarmType.RssiProblem, "RSSI值过高告警"),
            new Tuple<AlarmType, string>(AlarmType.S1UserPlane, "S1接口故障告警"),
            new Tuple<AlarmType, string>(AlarmType.S1Broken, "SCTP链路故障告警"),
            new Tuple<AlarmType, string>(AlarmType.X2UserPlane, "X2接口故障告警"),
            new Tuple<AlarmType, string>(AlarmType.FiberReceiver, "传输光接口异常告警"),
            new Tuple<AlarmType, string>(AlarmType.EletricAntenna, "电调天线未校准告警"),
            new Tuple<AlarmType, string>(AlarmType.S1Broken, "基站控制面传输中断告警"),
            new Tuple<AlarmType, string>(AlarmType.SoftwareAbnormal, "配置数据不一致告警"),
            new Tuple<AlarmType, string>(AlarmType.InnerError, "任务执行失败告警"),
            new Tuple<AlarmType, string>(AlarmType.RfAld, "射频单元ALD电流异常告警"),
            new Tuple<AlarmType, string>(AlarmType.RruCpriInterface, "射频单元CPRI接口异常告警"),
            new Tuple<AlarmType, string>(AlarmType.RruInterfacePerformance, "射频单元光接口性能恶化告警"),
            new Tuple<AlarmType, string>(AlarmType.RruPowerDown, "射频单元交流掉电告警"),
            new Tuple<AlarmType, string>(AlarmType.RruRtwpUnbalance, "射频单元接收通道RTWP/RSSI不平衡告警"),
            new Tuple<AlarmType, string>(AlarmType.RruClock, "射频单元时钟异常告警"),
            new Tuple<AlarmType, string>(AlarmType.RruOmcLink, "射频单元维护链路异常告警"),
            new Tuple<AlarmType, string>(AlarmType.VswrProblem, "射频单元驻波告警"),
            new Tuple<AlarmType, string>(AlarmType.SntpFail, "时间同步失败告警"),
            new Tuple<AlarmType, string>(AlarmType.ClockReference, "时钟参考源异常告警"),
            new Tuple<AlarmType, string>(AlarmType.Database, "数据库占用率过高告警(提示)"),
            new Tuple<AlarmType, string>(AlarmType.Database, "数据库占用率过高告警(次要)"),
            new Tuple<AlarmType, string>(AlarmType.AntennaLink, "天线设备维护链路异常告警"),
            new Tuple<AlarmType, string>(AlarmType.LinkBroken, "网元连接中断"),
            new Tuple<AlarmType, string>(AlarmType.NoClock, "系统时钟不可用告警"),
            new Tuple<AlarmType, string>(AlarmType.CellDown, "小区不可用告警"),
            new Tuple<AlarmType, string>(AlarmType.StarUnlocked, "星卡天线故障告警"),
            new Tuple<AlarmType, string>(AlarmType.DatabaseDelay, "性能数据库剩余空间不足"),
            new Tuple<AlarmType, string>(AlarmType.EthernetBroken, "以太网链路故障告警"),
            new Tuple<AlarmType, string>(AlarmType.TrunkProblem, "用户面承载链路故障告警"),
            new Tuple<AlarmType, string>(AlarmType.UserPlane, "用户面承载链路故障告警"),
            new Tuple<AlarmType, string>(AlarmType.RemoteOmc, "远程维护通道故障告警"),
            new Tuple<AlarmType, string>(AlarmType.LoginError, "登录尝试次数达到最大值告警"),
            new Tuple<AlarmType, string>(AlarmType.OuterApparatus, "网管服务异常退出告警"),
            new Tuple<AlarmType, string>(AlarmType.AnalogLoad, "小区模拟负载启动告警"),
        };
    }
}
