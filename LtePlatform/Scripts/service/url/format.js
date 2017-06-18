angular.module('app.format', [])
    .factory('appFormatService', function () {
        return {
            getDate: function(strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                    function(a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return date;
            },
            getUTCTime: function(strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                    function(a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
            },
            getDateString: function(dateTime, fmt) {
                var o = {
                    "M+": dateTime.getMonth() + 1, //月份 
                    "d+": dateTime.getDate(), //日 
                    "h+": dateTime.getHours(), //小时 
                    "m+": dateTime.getMinutes(), //分 
                    "s+": dateTime.getSeconds(), //秒 
                    "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度 
                    "S": dateTime.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (o.hasOwnProperty(k))
                        if (new RegExp("(" + k + ")").test(fmt))
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            lowerFirstLetter: function(str) {
                return str.substring(0, 1).toLowerCase() +
                    str.substring(1);
            },
            getId: function(name) {
                return window.document !== undefined && document.getElementById && document.getElementById(name);
            },
            queryEscapeText: function(s) {
                if (!s) {
                    return "";
                }
                s = s + "";

                // Both single quotes and double quotes (for attributes)
                return s.replace(/['"<>&]/g, function(ss) {
                    switch (ss) {
                    case "'":
                        return "&#039;";
                    case "\"":
                        return "&quot;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "&":
                        return "&amp;";
                    default:
                        return "";
                    }
                });
            },
            getUrlParams: function() {
                var urlParams = {};
                var params = window.location.search.slice(1).split("&");

                if (params[0]) {
                    angular.forEach(params, function(param) {
                        var current = param.split("=");
                        current[0] = decodeURIComponent(current[0]);

                        // allow just a key to turn on a flag, e.g., test.html?noglobals
                        current[1] = current[1] ? decodeURIComponent(current[1]) : true;
                        if (urlParams[current[0]]) {
                            urlParams[current[0]] = [].concat(urlParams[current[0]], current[1]);
                        } else {
                            urlParams[current[0]] = current[1];
                        }
                    });
                }

                return urlParams;
            },
            searchText: function(options, matchFunction) {
                for (var i = 0; i < options.length; i++) {
                    if (matchFunction(options[i])) {
                        return options[i];
                    }
                }
                return null;
            },
            searchPattern: function(options, text) {
                for (var i = 0; i < options.length; i++) {
                    var pattern = new RegExp(options[i]);
                    if (pattern.test(text)) {
                        return options[i];
                    }
                }
                return null;
            },
            calculateAverages: function(data, queryFunctions) {
                var outputs = [];
                angular.forEach(queryFunctions, function(func) {
                    outputs.push({
                        sum: 0,
                        count: 0
                    });
                });
                angular.forEach(data, function(item) {
                    angular.forEach(queryFunctions, function(func, index) {
                        var value = func(item);
                        if (value !== 0) {
                            outputs[index].sum += value;
                            outputs[index].count += 1;
                        }
                    });
                });
                return outputs;
            },
            prefixInteger: function(num, length) {
                return (Array(length).join('0') + num).slice(-length);
            },
            generateSiteGroups: function(site) {
                return [
                    {
                        items: [
                            {
                                key: '正式名称',
                                value: site.formalName
                            }, {
                                key: '规划名称',
                                value: site.planName
                            }, {
                                key: '规划编号',
                                value: site.planNum
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '区域',
                                value: site.district
                            }, {
                                key: '镇区',
                                value: site.town
                            }, {
                                key: '获取日期',
                                value: site.gottenDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '杆塔类型',
                                value: site.towerType
                            }, {
                                key: '天线高度',
                                value: site.antennaHeight
                            }, {
                                key: '开通日期',
                                value: site.finishedDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: site.longtitute
                            }, {
                                key: '纬度',
                                value: site.lattitute
                            }
                        ]
                    }
                ];
            },
            generateSiteDetailsGroups: function(site) {
                return [
                    {
                        items: [
                            {
                                key: '天线类型',
                                value: site.antennaType
                            }, {
                                key: '完工日期',
                                value: site.completeDate
                            }, {
                                key: '合同签订日期',
                                value: site.contractDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否获取',
                                value: site.isGotton ? '已获取' : '未获取'
                            }, {
                                key: '受阻说明',
                                value: site.shouzuShuoming
                            }, {
                                key: '站点类型',
                                value: site.siteCategory
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '站点来源',
                                value: site.siteSource
                            }, {
                                key: '铁塔联系人',
                                value: site.towerContaction
                            }, {
                                key: '铁塔盖章方案',
                                value: site.towerScheme
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '铁塔规划需求名',
                                value: site.towerSiteName
                            }, {
                                key: '验收交付时间',
                                value: site.yanshouDate
                            }
                        ]
                    }
                ];
            },
            generateStationGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站点名称',
                                value: station.StationName
                            }, {
                                key: '机房名称',
                                value: station.EngineRoom
                            }, {
                                key: '站点类型',
                                value: station.StationType
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '区域',
                                value: station.AreaName
                            }, {
                                key: '镇区',
                                value: station.Town
                            }, {
                                key: '安装地址',
                                value: station.InstallAddr
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '杆塔类型',
                                value: station.TowerType
                            }, {
                                key: '天线高度',
                                value: station.TowerHeight
                            }, {
                                key: '开通日期',
                                value: station.IntersectionDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '系统站址ID',
                                value: station.SysStationId
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '机房归属',
                                value: station.RoomAttribution
                            }, {
                                key: '是否新建机房',
                                value: station.IsNewRoom
                            }, {
                                key: 'CL网是否共用天线',
                                value: station.IsShare
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '网络类型',
                                value: station.NetType
                            }, {
                                key: '是否高危站点',
                                value: station.IsDangerous
                            }, {
                                key: '是否简易机房',
                                value: station.IsSimple
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '属地性质',
                                value: station.AttributionNature
                            }, {
                                key: '是否新建铁塔',
                                value: station.IsNewTower
                            }, {
                                key: '铁塔归属',
                                value: station.TowerAttribution
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '铁塔高度',
                                value: station.TowerHeight
                            }, {
                                key: '铁塔类型',
                                value: station.TowerType
                            }, {
                                key: '铁塔编号',
                                value: station.TowerCode
                            }
                        ]
                    }
                ];
            },
            generateENodebGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '基站名称',
                                value: station.name
                            }, {
                                key: '基站编号',
                                value: station.eNodebId
                            }, {
                                key: '城市',
                                value: station.cityName
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '区域',
                                value: station.districtName
                            }, {
                                key: '镇区',
                                value: station.townName
                            }, {
                                key: '安装地址',
                                value: station.address
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '规划编号',
                                value: station.planNum
                            }, {
                                key: '入网日期',
                                value: station.openDate
                            }, {
                                key: '厂家',
                                value: station.factory
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '制式',
                                value: station.divisionDuplex
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '网关',
                                value: station.gatewayIp.addressString
                            }, {
                                key: 'IP',
                                value: station.ip.addressString
                            }, {
                                key: '是否在用',
                                value: station.isInUse
                            }
                        ]
                    }
                ];
            },
            generateCellGroups: function(cell) {
                return [
                    {
                        items: [
                            {
                                key: '小区名称',
                                value: cell.cellName
                            }, {
                                key: '基站编号',
                                value: cell.eNodebId
                            }, {
                                key: 'TAC',
                                value: cell.tac
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '频段',
                                value: cell.bandClass
                            }, {
                                key: '频点',
                                value: cell.frequency
                            }, {
                                key: '天线增益',
                                value: cell.antennaGain
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '天线挂高',
                                value: cell.height
                            }, {
                                key: '方位角',
                                value: cell.azimuth
                            }, {
                                key: '下倾角',
                                value: cell.downTilt
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: cell.longtitute
                            }, {
                                key: '纬度',
                                value: cell.lattitute
                            }, {
                                key: '室内外',
                                value: cell.indoor
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: 'PCI',
                                value: cell.pci
                            }, {
                                key: 'PRACH',
                                value: cell.prach
                            }, {
                                key: 'RS功率',
                                value: cell.rsPower
                            }
                        ]
                    }
                ];
            },
            generateSustainGroups: function(cell) {
                return [
                    {
                        items: [
                            {
                                key: '工单编号',
                                value: cell.serialNumber
                            }, {
                                key: '派单日期',
                                value: cell.beginDate
                            }, {
                                key: '投诉站点',
                                value: cell.site
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉分类',
                                value: cell.complainCategoryDescription
                            }, {
                                key: '投诉原因',
                                value: cell.complainReasonDescription
                            }, {
                                key: '投诉子原因',
                                value: cell.complainSubReasonDescription
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉地址',
                                value: cell.address
                            }, {
                                key: '联系电话',
                                value: cell.contactPhone
                            }, {
                                key: '是否预处理',
                                value: cell.isPreProcessedDescription
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '城市',
                                value: cell.city
                            }, {
                                key: '区域',
                                value: cell.district
                            }, {
                                key: '镇区',
                                value: cell.town
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: cell.longtitute
                            }, {
                                key: '纬度',
                                value: cell.lattitute
                            }, {
                                key: '专家回复',
                                value: cell.specialResponse
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉来源',
                                value: cell.complainSourceDescription
                            }, {
                                key: '问题描述',
                                value: cell.issue
                            }, {
                                key: '反馈信息',
                                value: cell.feedbackInfo
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉现象',
                                value: cell.phenomenon,
                                span: 5
                            }
                        ]
                    }
                ];
            },
            generateRruGroups: function(cell) {
                return [
                    {
                        items: [
                            {
                                key: '天线厂家',
                                value: cell.antennaFactoryDescription
                            }, {
                                key: '天线信息',
                                value: cell.antennaInfo
                            }, {
                                key: '天线型号',
                                value: cell.antennaModel
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '电下倾角',
                                value: cell.eTilt
                            }, {
                                key: '机械下倾',
                                value: cell.mTilt
                            }, {
                                key: 'RRU名称',
                                value: cell.rruName
                            }
                        ]
                    }
                ];
            },
            generateSpecialStationGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '网管站名',
                                value: station.enodebName
                            }, {
                                key: '基站编号',
                                value: station.stationId
                            }, {
                                key: '行政区',
                                value: station.areaName
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '归属',
                                value: station.alongTo
                            }, {
                                key: '基站ID',
                                value: station.enodebId
                            }, {
                                key: '故障',
                                value: station.fault
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '故障分类',
                                value: station.faultType
                            }, {
                                key: '是否恢复',
                                value: station.isRecover
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '反馈',
                                value: station.feedback
                            }
                        ]
                    }
                ];
            },
            generateSpecialIndoorGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站点名称',
                                value: station.enodebName
                            }, {
                                key: '行政区',
                                value: station.areaName
                            }, {
                                key: '割接后施主基站',
                                value: station.afterName
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '故障类型',
                                value: station.faultType
                            }, {
                                key: '解决方案',
                                value: station.solution
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }
                        ]
                    }
                ];
            },
            generateZeroFlowGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '基站名',
                                value: station.enodebName
                            }, {
                                key: '地市',
                                value: station.city
                            }, {
                                key: '厂家',
                                value: station.factory
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否断站',
                                value: station.isOff
                            }, {
                                key: '是否存在小区退服',
                                value: station.isOut
                            }, {
                                key: 'BBU是否交维',
                                value: station.isIntersect
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: 'BBU是否下挂RRU',
                                value: station.isUnderbarrel
                            }, {
                                key: '是否已解决',
                                value: station.isSolve
                            }, {
                                key: '零流量原因类型',
                                value: station.reasonType
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '计划解决时间',
                                value: station.planDate
                            }, {
                                key: '完成时间',
                                value: station.finishDate
                            }, {
                                key: '责任单位',
                                value: station.unit
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '解决措施',
                                value: station.solution
                            }
                        ]
                    }
                ];
            },
            generateZeroVoiceGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '基站名',
                                value: station.BTSName
                            }, {
                                key: '地市',
                                value: station.city
                            }, {
                                key: '厂家',
                                value: station.factory
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否断站',
                                value: station.isOff
                            }, {
                                key: '是否存在小区退服',
                                value: station.isOut
                            }, {
                                key: 'BBU是否交维',
                                value: station.isIntersect
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: 'BBU是否下挂RRU',
                                value: station.isUnderbarrel
                            }, {
                                key: '是否已解决',
                                value: station.isSolve
                            }, {
                                key: '零话务原因类型',
                                value: station.reasonType
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '计划解决时间',
                                value: station.planDate
                            }, {
                                key: 'BTSTYPE',
                                value: station.BTSTYPE
                            }, {
                                key: '责任单位',
                                value: station.unit
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '解决措施',
                                value: station.solution
                            }
                        ]
                    }
                ];
            },
            generateFaultStationGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站点名称',
                                value: station.enodebName
                            }, {
                                key: '单号',
                                value: station.orderId
                            }, {
                                key: '告警名称',
                                value: station.alarmName
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '故障反馈',
                                value: station.feedback
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }
                        ]
                    }
                ];
            },
            generateCheckingStationGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '网元编号',
                                value: station.enodebCode
                            }, {
                                key: '网元名称',
                                value: station.enodebName
                            }, {
                                key: '网格名称',
                                value: station.areaName
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '巡检单位',
                                value: station.checkingComp
                            }, {
                                key: '巡检人',
                                value: station.checkingMan
                            }, {
                                key: '状态',
                                value: station.status
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }
                        ]
                    }
                ];
            },
            generateFixingStationGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站址编号',
                                value: station.id
                            }, {
                                key: '站址名称',
                                value: station.name
                            }, {
                                key: '地址',
                                value: station.address
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '状态',
                                value: station.status
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '需求时间',
                                value: station.requireTime
                            }, {
                                key: '整治人员',
                                value: station.checkingMan
                            }, {
                                key: '预算金额',
                                value: station.cost
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '整治级别',
                                value: station.level
                            }, {
                                key: '整治计划',
                                value: station.plan
                            }, {
                                key: '整治内容描述',
                                value: station.details
                            }
                        ]
                    }
                ];
            },

            generateCdmaCellGroups: function(cell) {
                return [
                    {
                        items: [
                            {
                                key: '基站名称',
                                value: cell.btsName
                            }, {
                                key: '基站编号',
                                value: cell.btsId
                            }, {
                                key: '扇区编号',
                                value: cell.sectorId
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '1X频点',
                                value: cell.onexFrequencyList
                            }, {
                                key: 'DO频点',
                                value: cell.evdoFrequencyList
                            }, {
                                key: '天线增益',
                                value: cell.antennaGain
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '天线挂高',
                                value: cell.height
                            }, {
                                key: '方位角',
                                value: cell.azimuth
                            }, {
                                key: '下倾角',
                                value: cell.downTilt
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: cell.longtitute
                            }, {
                                key: '纬度',
                                value: cell.lattitute
                            }, {
                                key: '室内外',
                                value: cell.indoor
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: 'PN',
                                value: cell.pn
                            }, {
                                key: 'LAC',
                                value: cell.lac
                            }, {
                                key: '小区编号',
                                value: cell.cellId
                            }
                        ]
                    }
                ];
            },
            generateDistributionGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '室分名称',
                                value: station.name
                            }, {
                                key: '城市',
                                value: station.city
                            }, {
                                key: '区域',
                                value: station.district
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '站点编号',
                                value: station.stationNum
                            }, {
                                key: '地址',
                                value: station.address
                            }, {
                                key: '维护单位',
                                value: station.server
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否为LTE RRU',
                                value: station.isLteRru ? '是' : '否'
                            }, {
                                key: 'LTE基站编号',
                                value: station.eNodebId
                            }, {
                                key: 'LTE小区编号',
                                value: station.lteSectorId
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否为CDMA RRU',
                                value: station.isCdmaRru ? '是' : '否'
                            }, {
                                key: 'CDMA基站编号',
                                value: station.btsId
                            }, {
                                key: 'CDMA小区编号',
                                value: station.cdmaSectorId
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '干放个数',
                                value: station.amplifiers
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '规模',
                                value: station.scaleDescription
                            }, {
                                key: '服务区域编码',
                                value: station.serviceArea
                            }, {
                                key: '有源器件数',
                                value: station.sourceAppliances
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '室外微基站数',
                                value: station.outdoorPicos
                            }, {
                                key: '室外拉远数',
                                value: station.outdoorRrus
                            }, {
                                key: '室外直放站数',
                                value: station.outdoorRepeaters
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '室内微基站数',
                                value: station.indoorPicos
                            }, {
                                key: '室内拉远数',
                                value: station.indoorRrus
                            }, {
                                key: '室内直放站数',
                                value: station.indoorRepeaters
                            }
                        ]
                    }
                ];
            },
            generateIndoorGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站点名称',
                                value: station.name
                            }, {
                                key: '区分公司',
                                value: station.areaName
                            }, {
                                key: '镇区',
                                value: station.town
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '站点等级',
                                value: station.grade
                            }, {
                                key: '站点归属',
                                value: station.isNew
                            }, {
                                key: '站点类型属性',
                                value: station.indoortype
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '主要覆盖范围',
                                value: station.coverage
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '地址',
                                value: station.address
                            }
                        ]
                    }
                ];
            },
            generateConstructionGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站点名称',
                                value: station.eNodebName
                            }, {
                                key: '营销中心',
                                value: station.town
                            }, {
                                key: '区域',
                                value: station.district
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '站点编号',
                                value: station.siteNumber
                            }, {
                                key: 'FSL编号',
                                value: station.fslNumber
                            }, {
                                key: 'FSC编号',
                                value: station.fscNumber
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否室内',
                                value: station.isIndoor
                            }, {
                                key: '是否已移交',
                                value: station.isTransfer
                            }, {
                                key: '会审时间',
                                value: station.uploadTime
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '建设状态',
                                value: station.status
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '开通时间',
                                value: station.openTime
                            }, {
                                key: '完工时间',
                                value: station.completedTime
                            }, {
                                key: '建设时间',
                                value: station.constructionTime
                            }
                        ]
                    }
                ];
            },
            generateMicroAddressGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '地址编号',
                                value: station.addressNumber
                            }, {
                                key: '镇区',
                                value: station.town
                            }, {
                                key: '区域',
                                value: station.district
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '施主基站',
                                value: station.baseStation
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '详细地址',
                                value: station.address,
                                span: 5
                            }
                        ]
                    }
                ];
            },
            generateMicroItemGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '设备名称',
                                value: station.name
                            }, {
                                key: '设备型号',
                                value: station.type,
                                span: 3
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '设备编码',
                                value: station.itemNumber
                            }, {
                                key: '设备厂家',
                                value: station.factory
                            }, {
                                key: '资产编号',
                                value: station.materialNumber
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '出仓日期',
                                value: station.borrowDate
                            }, {
                                key: '领取人',
                                value: station.borrower
                            }, {
                                key: '编号',
                                value: station.serialNumber
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉人',
                                value: station.complainer
                            }, {
                                key: '投诉电话',
                                value: station.complainPhone
                            }, {
                                key: '是否交申请表',
                                value: station.submitForm
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '是否交协议',
                                value: station.protocol
                            }, {
                                key: '备注',
                                value: station.comments
                            }
                        ]
                    }
                ];
            },
            generateComplainItemGroups: function(item) {
                return [
                    {
                        items: [
                            {
                                key: '接单时间',
                                value: item.beginDate
                            }, {
                                key: '时限要求',
                                value: item.deadline
                            }, {
                                key: '处理时间',
                                value: item.processTime
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '城市',
                                value: item.city
                            }, {
                                key: '区域',
                                value: item.district
                            }, {
                                key: '室内外',
                                value: item.isIndoorDescription
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '楼宇名称',
                                value: item.buildingName
                            }, {
                                key: '道路名称',
                                value: item.roadName
                            }, {
                                key: '匹配站点',
                                value: item.sitePosition
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '原因定位',
                                value: item.causeLocation
                            }, {
                                key: '投诉分类',
                                value: item.complainCategoryDescription
                            }, {
                                key: '投诉原因',
                                value: item.complainReasonDescription
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉场景',
                                value: item.complainSceneDescription
                            }, {
                                key: '投诉来源',
                                value: item.complainSourceDescription
                            }, {
                                key: '投诉子原因',
                                value: item.complainSubReasonDescription
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '联系地址',
                                value: item.contactAddress
                            }, {
                                key: '联系人',
                                value: item.contactPerson
                            }, {
                                key: '联系电话',
                                value: item.contactPhone
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '投诉内容',
                                value: item.complainContents,
                                span: 5
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '用户姓名',
                                value: item.subscriberInfo
                            }, {
                                key: '用户号码',
                                value: item.subscriberPhone
                            }, {
                                key: '业务类型',
                                value: item.serviceCategoryDescription
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '室内外',
                                value: item.isIndoorDescription

                            }, {
                                key: '经度',
                                value: item.longtitute
                            }, {
                                key: '纬度',
                                value: item.lattitute
                            }
                        ]
                    }
                ];
            }
        };
    })
    .factory('chartCalculateService', function (appFormatService) {
        return {
            generateDrillDownData: function (districtStats, townStats, queryFunction) {
                var results = [];
                angular.forEach(districtStats, function (districtStat) {
                    var subData = [];
                    var district = districtStat.district;
                    var districtData = queryFunction(districtStat);
                    angular.forEach(townStats, function (townStat) {
                        if (townStat.district === district) {
                            subData.push([townStat.town, queryFunction(townStat)]);
                        }
                    });

                    results.push({
                        district: district,
                        districtData: districtData,
                        subData: subData
                    });
                });
                return results;
            },
            generateDrillDownPieOptions: function (stats, settings) {
                var chart = new DrilldownPie();
                chart.initialize(settings);
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },
            generateDrillDownPieOptionsWithFunc: function (stats, settings, func) {
                var chart = new DrilldownPie();
                chart.initialize(settings);
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: func.nameFunc(stat),
                        value: func.valueFunc(stat),
                        subData: stat.subData
                    });
                });
                return chart.options;
            },
            generateDrillDownColumnOptionsWithFunc: function (stats, settings, func) {
                var chart = new DrilldownColumn();
                chart.initialize(settings);
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: func.nameFunc(stat),
                        value: func.valueFunc(stat),
                        subData: stat.subData
                    });
                });
                return chart.options;
            },
            generateSplineChartOptions: function (result, districts, settings) {
                var chart = new ComboChart();
                chart.initialize(settings);
                chart.xAxis[0].categories = result.statDates;

                angular.forEach(districts, function (district, index) {
                    chart.series.push({
                        type: "spline",
                        name: district,
                        data: result.districtStats[index]
                    });
                });
                return chart.options;
            },
            calculateMemberSum: function (array, memberList, categoryFunc) {
                var result = _.reduce(array, function (memo, num) {
                    var temp = {};
                    angular.forEach(memberList, function (member) {
                        temp[member] = memo[member] + num[member];
                    });
                    return temp;
                });
                categoryFunc(result);
                return result;
            },
            generateDistrictStats: function (districts, stats, funcs) {
                var outputStats = [];
                angular.forEach(stats, function (stat) {
                    var districtViews = funcs.districtViewFunc(stat);
                    var statDate = stat.statDate;
                    var generalStat = {};
                    funcs.initializeFunc(generalStat);
                    var values = [];
                    angular.forEach(districts, function (district) {
                        for (var k = 0; k < districtViews.length; k++) {
                            var view = districtViews[k];
                            if (view.district === district) {
                                values.push(funcs.calculateFunc(view));
                                funcs.accumulateFunc(generalStat, view);
                                break;
                            }
                        }
                        if (k === districtViews.length) {
                            values.push(funcs.zeroFunc());
                        }
                    });
                    values.push(funcs.totalFunc(generalStat));
                    outputStats.push({
                        statDate: statDate,
                        values: values
                    });
                });
                return outputStats;
            },
            generateDateDistrictStats: function (stats, districtLength, queryFunction) {
                var statDates = [];
                var districtStats = [];
                angular.forEach(stats, function (stat, index) {
                    statDates.push(stat.statDate.split('T')[0]);
                    for (var j = 0; j < districtLength; j++) {
                        var statValue = stat.values[j] ? queryFunction(stat.values[j]) : 0;
                        if (index === 0) {
                            districtStats.push([statValue]);
                        } else {
                            districtStats[j].push(statValue);
                        }
                    }
                });
                return {
                    statDates: statDates,
                    districtStats: districtStats
                };
            },
            generateStatsForPie: function (trendStat, result, funcs) {
                trendStat.districtStats = funcs.districtViewsFunc(result[0]);
                trendStat.townStats = funcs.townViewsFunc(result[0]);
                for (var i = 1; i < result.length; i++) {
                    angular.forEach(funcs.districtViewsFunc(result[0]), function (currentDistrictStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.districtStats.length; k++) {
                            if (trendStat.districtStats[k].city === currentDistrictStat.city
                                && trendStat.districtStats[k].district === currentDistrictStat.district) {
                                funcs.accumulateFunc(trendStat.districtStats[k], currentDistrictStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.districtStats.push(currentDistrictStat);
                        }
                    });
                    angular.forEach(result[i].townPreciseView, function (currentTownStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.townStats.length; k++) {
                            if (trendStat.townStats[k].city === currentTownStat.city
                                && trendStat.townStats[k].district === currentTownStat.district
                                && trendStat.townStats[k].town === currentTownStat.town) {
                                funcs.accumulateFunc(trendStat.townStats[k], currentTownStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.townStats.push(currentTownStat);
                        }
                    });
                }
                angular.forEach(trendStat.districtStats, function (stat) {
                    if (funcs.districtCalculate) {
                        funcs.districtCalculate(stat);
                    }

                });
                angular.forEach(trendStat.townStats, function (stat) {
                    if (funcs.townCalculate) {
                        funcs.townCalculate(stat);
                    }
                });
            },
            generateSeriesInfo: function (seriesInfo, stats, categoryKey, dataKeys) {
                var categories = [];
                angular.forEach(dataKeys, function (key) {
                    seriesInfo[key].data = [];
                });
                angular.forEach(stats, function (stat) {
                    categories.push(stat[categoryKey]);
                    angular.forEach(dataKeys, function (key) {
                        seriesInfo[key].data.push(stat[key]);
                    });
                });
                return {
                    categories: categories,
                    info: seriesInfo
                };
            },
            writeSeriesData: function (series, seriesInfo, dataKeys) {
                angular.forEach(dataKeys, function (key) {
                    series.push({
                        type: seriesInfo[key].type,
                        name: seriesInfo[key].name,
                        data: seriesInfo[key].data
                    });
                });
            },
            generateMrsRsrpStats: function (stats) {
                var categories = _.range(-140, -43);
                var values = _.range(0, 97, 0);
                var array = _.map(_.range(48), function (index) {
                    var value = stats['rsrP_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                var i;
                for (i = 2; i < 37; i++) {
                    values[i + 24] = array[i];
                }
                for (i = 37; i < 47; i++) {
                    values[2 * i - 13] = values[2 * i - 12] = array[i] / 2;
                }
                var tail = array[47];
                for (i = 0; i < 17; i++) {
                    if (tail > values[80 + i] / 2) {
                        tail -= values[80 + i] / 2 + 1;
                        values[81 + i] = values[80 + i] / 2 + 1;
                    } else {
                        values[81 + i] = tail;
                        break;
                    }
                }
                var avg = array[1] / 5;
                var step = (values[26] - avg) / 3;
                for (i = 0; i < 5; i++) {
                    values[21 + i] = avg + (i - 2) * step;
                }
                var head = values[21];
                for (i = 0; i < 21; i++) {
                    if (head > values[21 - i] / 2) {
                        head -= values[21 - i] / 2 + 1;
                        values[21 - i - 1] = values[21 - i] / 2 + 1;
                    } else {
                        values[21 - i - 1] = head;
                    }
                }
                return {
                    categories: categories,
                    values: values
                };
            },
            generateCoverageStats: function (stats) {
                var array = _.map(_.range(48), function (index) {
                    var value = stats['rsrP_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                var sum = _.reduce(array, function (memo, num) { return memo + num; }, 0);
                return {
                    total: sum,
                    sumBelow115: array[0] + array[1],
                    sumBetween115And110: array[2] + array[3] + array[4] + array[5] + array[6],
                    sumBetween110And105: array[7] + array[8] + array[9] + array[10] + array[11]
                };
            },
            generateMrsTaStats: function (stats) {
                var array = _.map(_.range(45), function (index) {
                    var value = stats['tadv_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                return {
                    categories: [
                        100,
                        200,
                        300,
                        400,
                        500,
                        600,
                        700,
                        800,
                        900,
                        1000,
                        1150,
                        1300,
                        1450,
                        1600,
                        1750,
                        1900,
                        2050,
                        2200,
                        2350,
                        2500,
                        2700,
                        2900,
                        3100,
                        3300,
                        3500,
                        3700,
                        3900,
                        4100,
                        4300,
                        4500,
                        4700,
                        4900,
                        5500,
                        6500,
                        8000,
                        9500,
                        11500,
                        15000,
                        20000
                    ],
                    values: [
                        array[0] + 0.280082 * array[1],
                        0.719918 * array[1] + 0.560164 * array[2],
                        0.489836 * array[2] + 0.840246 * array[3],
                        0.159754 * array[3] + array[4] + 0.120328 * array[5],
                        0.879672 * array[5] + 0.40041 * array[6],
                        0.59959 * array[6] + 0.680492 * array[7],
                        0.319508 * array[7] + 0.960593 * array[8],
                        0.039427 * array[8] + array[9] + 0.240655 * array[10],
                        0.759345 * array[11] + 0.520737 * array[12],
                        0.479263 * array[12] + 0.40041 * array[13],
                        0.59959 * array[13] + 0.360471 * array[14],
                        0.639529 * array[14] + 0.320533 * array[15],
                        0.679467 * array[15] + 0.280594 * array[16],
                        0.719406 * array[16] + 0.240655 * array[17],
                        0.759345 * array[17] + 0.200717 * array[18],
                        0.799283 * array[18] + 0.160778 * array[19],
                        0.839222 * array[19] + 0.12084 * array[20],
                        0.87916 * array[20] + 0.080901 * array[21],
                        0.919099 * array[21] + 0.040963 * array[22],
                        0.959037 * array[22] + 0.001024 * array[23],
                        0.998976 * array[23] + 0.281106 * array[24],
                        0.718894 * array[24] + 0.561188 * array[25],
                        0.438812 * array[25] + 0.84127 * array[26],
                        0.15873 * array[26] + array[27] + 0.121352 * array[28],
                        0.878648 * array[28] + 0.401434 * array[29],
                        0.598566 * array[29] + 0.681516 * array[30],
                        0.318484 * array[30] + 0.961598 * array[31],
                        0.038402 * array[31] + array[32] + 0.241679 * array[33],
                        0.758321 * array[33] + 0.521761 * array[34],
                        0.478239 * array[34] + 0.801843 * array[35],
                        0.198157 * array[35] + array[36] + 0.081925 * array[37],
                        0.918075 * array[37] + 0.362007 * array[38],
                        0.637993 * array[38] + 0.400282 * array[39],
                        0.599718 * array[39] + 0.200333 * array[40],
                        0.799667 * array[40] + 0.40041 * array[41],
                        0.59959 * array[41] + 0.600486 * array[42],
                        0.399514 * array[42] + 0.300147 * array[43],
                        0.699853 * array[43] + 0.000192 * array[44],
                        0.999808 * array[44]
                    ]
                };
            },
            generateOverCoverageStats: function (stats) {
                var array = _.map(_.range(45), function (index) {
                    var value = stats['tadv_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                var arrayOver = _.map(_.range(18, 45), function (index) {
                    var value = stats['tadv_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                return {
                    total: _.reduce(array, function (memo, num) { return memo + num; }, 0),
                    over: _.reduce(arrayOver, function (memo, num) { return memo + num; }, 0)
                }
            },
            generateRsrpTaStats: function (stats, rsrpIndex) {
                var rsrpDivisions = [
                    -110,
                    -105,
                    -100,
                    -95,
                    -90,
                    -85,
                    -80,
                    -75,
                    -70,
                    -65,
                    -60,
                    -44
                ];
                rsrpIndex = Math.min(Math.max(0, rsrpIndex), 11);
                var array = _.map(_.range(11), function (index) {
                    var value = stats['tadv' + appFormatService.prefixInteger(index, 2) + 'Rsrp' + appFormatService.prefixInteger(rsrpIndex, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                return {
                    seriesName: rsrpIndex === 0 ? 'RSRP<-110dBm' : rsrpDivisions[rsrpIndex - 1] + 'dBm<=RSRP<' + rsrpDivisions[rsrpIndex] + 'dBm',
                    categories: [
                        100,
                        200,
                        300,
                        400,
                        500,
                        600,
                        700,
                        800,
                        900,
                        1000,
                        1200,
                        1400,
                        1600,
                        1800,
                        2000,
                        2400,
                        2800,
                        3200,
                        3600,
                        4000,
                        5000,
                        6000,
                        8000,
                        10000,
                        15000
                    ],
                    values: [
                        0.426693975 * array[0],
                        0.426693975 * array[0],
                        0.14661205 * array[0] + 0.280081925 * array[1],
                        0.426693975 * array[1],
                        0.2932241 * array[1] + 0.133469875 * array[2],
                        0.426693975 * array[2],
                        0.426693975 * array[2],
                        0.013142174 * array[2] + 0.413551801 * array[3],
                        0.426693975 * array[3],
                        0.159754224 * array[3] + 0.133469875 * array[4],
                        0.426693975 * array[4],
                        0.426693975 * array[4],
                        0.013142174 * array[4] + 0.413551801 * array[5],
                        0.426693975 * array[5],
                        0.159754224 * array[5] + 0.133469875 * array[6],
                        0.426693975 * array[6],
                        0.426693975 * array[6],
                        0.013142174 * array[6] + 0.413551801 * array[7],
                        0.426693975 * array[7],
                        0.159754224 * array[7] + 0.266939751 * array[8],
                        0.129363573 * array[8] + 0.058883769 * array[9],
                        0.188247342 * array[9],
                        0.376494684 * array[9],
                        0.376374206 * array[9] + 0.000064 * array[10],
                        0.500032002 * array[10]
                    ]
                };
            },
            updateHeatMapIntervalDefs: function (intervalDef, max) {
                var gradient = {};
                var heatIntervals = [
                {
                    key: 0.2,
                    color: 'rgb(100,255,100)'
                }, {
                    key: 0.5,
                    color: 'rgb(100, 255, 255)'
                }, {
                    key: 0.7,
                    color: 'rgb(255,100,200)'
                }, {
                    key: 0.85,
                    color: 'rgb(255,100,100)'
                }];
                angular.forEach(heatIntervals, function (interval) {
                    gradient[interval.key] = interval.color;
                    intervalDef.push({
                        color: interval.color,
                        threshold: interval.key * max
                    });
                });
                return gradient;
            }
        };
    })
    .factory('calculateService', function (chartCalculateService) {
        return {
            calculateOverCoverageRate: function (taList) {
                var sum = 0;
                var sumOver = 0;
                angular.forEach(taList, function (ta) {
                    var stat = chartCalculateService.generateOverCoverageStats(ta);
                    sum += stat.total;
                    sumOver += stat.over;
                });
                return sumOver / sum;
            },
            calculateWeakCoverageRate: function (coverageList) {
                var sum = 0;
                var sum115 = 0;
                var sum110 = 0;
                var sum105 = 0;
                angular.forEach(coverageList, function (coverage) {
                    var stat = chartCalculateService.generateCoverageStats(coverage);
                    sum += stat.total;
                    sum115 += stat.sumBelow115;
                    sum110 += stat.sumBetween115And110;
                    sum105 += stat.sumBetween110And105;
                });
                return {
                    rate115: sum115 / sum,
                    rate110: (sum115 + sum110) / sum,
                    rate105: (sum115 + sum110 + sum105) / sum
                };
            },
            generateGridDirective: function (settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            generateShortGridDirective: function (settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div style="height: 150px" ui-grid="gridOptions"></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            generatePagingGridDirective: function (settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            generateSelectionGridDirective: function (settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-selection></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            mergeDataByKey: function (list, data, key, dataKeys) {
                angular.forEach(data, function (num) {
                    var finder = {};
                    finder[key] = num[key];
                    var match = _.where(list, finder);
                    if (match.length > 0) {
                        angular.forEach(dataKeys, function (dataKey) {
                            match[0][dataKey] += num[dataKey];
                        });
                    } else {
                        var newNum = {};
                        newNum[key] = num[key];
                        angular.forEach(dataKeys, function (dataKey) {
                            newNum[dataKey] = num[dataKey];
                        });
                        list.push(newNum);
                    }
                });
                return _.sortBy(list, function (num) { return num[key]; });
            },
            generateCellDetailsGroups: function (site) {
                return [
                    {
                        items: [
                            {
                                key: '频点',
                                value: site.frequency
                            }, {
                                key: '经度',
                                value: site.longtitute
                            }, {
                                key: '纬度',
                                value: site.lattitute
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '天线挂高',
                                value: site.height
                            }, {
                                key: '方位角',
                                value: site.azimuth
                            }, {
                                key: '下倾角',
                                value: site.downTilt
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '室内外',
                                value: site.indoor
                            }, {
                                key: '天线增益',
                                value: site.antennaGain
                            }, {
                                key: 'RS功率',
                                value: site.rsPower
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: 'PCI',
                                value: site.pci
                            }, {
                                key: 'PRACH',
                                value: site.prach
                            }, {
                                key: 'TAC',
                                value: site.tac
                            }
                        ]
                    }
                ];
            },
            generateFlowDetailsGroups: function (site) {
                return [
                    {
                        items: [
                            {
                                key: '小区名称',
                                value: site.eNodebName + '-' + site.sectorId
                            }, {
                                key: '经度',
                                value: site.longtitute
                            }, {
                                key: '纬度',
                                value: site.lattitute
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '天线挂高',
                                value: site.height
                            }, {
                                key: '方位角',
                                value: site.azimuth
                            }, {
                                key: '下倾角',
                                value: site.downTilt
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '室内外',
                                value: site.indoor
                            }, {
                                key: '天线增益',
                                value: site.antennaGain
                            }, {
                                key: 'RS功率',
                                value: site.rsPower
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '下行流量（MB）',
                                value: site.pdcpDownlinkFlow
                            }, {
                                key: '上行流量（MB）',
                                value: site.pdcpUplinkFlow
                            }, {
                                key: '用户数',
                                value: site.maxUsers
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '下行感知速率（Mbit/s）',
                                value: site.downlinkFeelingRate
                            }, {
                                key: '上行感知速率（Mbit/s）',
                                value: site.uplinkFeelingRate
                            }, {
                                key: 'PCI',
                                value: site.pci
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '4G下切3G次数',
                                value: site.redirectCdma2000
                            }, {
                                key: '4G双流比',
                                value: site.rank2Rate
                            }, {
                                key: 'PRACH',
                                value: site.prach
                            }
                        ]
                    }
                ];
            },
            generateRrcDetailsGroups: function (site) {
                return [
                    {
                        items: [
                            {
                                key: '基站编号',
                                value: site.eNodebId
                            }, {
                                key: '扇区编号',
                                value: site.sectorId
                            }, {
                                key: '统计日期',
                                value: site.statTime,
                                format: 'date'
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '被叫接入RRC请求次数',
                                value: site.mtAccessRrcRequest
                            }, {
                                key: '被叫接入RRC失败次数',
                                value: site.mtAccessRrcFail
                            }, {
                                key: '被叫接入RRC成功率',
                                value: 100*site.mtAccessRrcRate,
                                format: 'percentage'
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '主叫信令RRC请求次数',
                                value: site.moSignallingRrcRequest
                            }, {
                                key: '主叫信令RRC失败次数',
                                value: site.moSignallingRrcFail
                            }, {
                                key: '主叫信令RRC成功率',
                                value: 100*site.moSiganllingRrcRate,
                                format: 'percentage'
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '主叫数据RRC请求次数',
                                value: site.moDataRrcRequest
                            }, {
                                key: '主叫数据RRC失败次数',
                                value: site.moDataRrcFail
                            }, {
                                key: '主叫数据RRC成功率',
                                value: 100*site.moDataRrcRate,
                                format: 'percentage'
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '全部RRC请求次数',
                                value: site.totalRrcRequest
                            }, {
                                key: '全部RRC失败次数',
                                value: site.totalRrcFail
                            }, {
                                key: '总体RRC成功率',
                                value: 100*site.rrcSuccessRate,
                                format: 'percentage'
                            }
                        ]
                    }
                ];
            },

            generateCellMongoGroups: function (site) {
                return [
                    {
                        items: [
                            {
                                key: '网管PCI',
                                value: site.phyCellId
                            }, {
                                key: '网管PRACH',
                                value: site.rootSequenceIdx
                            }, {
                                key: '本地小区标识（仅华为有效）',
                                value: site.localCellId
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '服务小区偏移量',
                                value: site.cellSpecificOffset,
                                filter: 'dbStep32'
                            }, {
                                key: '服务小区偏置',
                                value: site.qoffsetFreq,
                                filter: 'dbStep32'
                            }, {
                                key: '前导格式',
                                value: site.preambleFmt
                            }
                        ]
                    }
                ];
            },
            accumulatePreciseStat: function (source, accumulate) {
                source.totalMrs += accumulate.totalMrs;
                source.firstNeighbors += accumulate.firstNeighbors;
                source.secondNeighbors += accumulate.secondNeighbors;
                source.thirdNeighbors += accumulate.thirdNeighbors;
            },
            accumulateFlowStat: function (source, accumulate) {
                source.pdcpDownlinkFlow += accumulate.pdcpDownlinkFlow;
                source.pdcpUplinkFlow += accumulate.pdcpUplinkFlow;
            },
            calculateDistrictRates: function (districtStat) {
                districtStat.firstRate = 100 - 100 * districtStat.firstNeighbors / districtStat.totalMrs;
                districtStat.preciseRate = 100 - 100 * districtStat.secondNeighbors / districtStat.totalMrs;
                districtStat.thirdRate = 100 - 100 * districtStat.thirdNeighbors / districtStat.totalMrs;
                return districtStat;
            },
            calculateTownRates: function (townStat) {
                townStat.firstRate = 100 - 100 * townStat.firstNeighbors / townStat.totalMrs;
                townStat.preciseRate = 100 - 100 * townStat.secondNeighbors / townStat.totalMrs;
                townStat.thirdRate = 100 - 100 * townStat.thirdNeighbors / townStat.totalMrs;
            },
            getValueFromDivisionAbove: function (division, value) {
                for (var i = 0; i < division.length; i++) {
                    if (value > division[i]) {
                        return 5 - i;
                    }
                }
                return 0;
            },
            getValueFromDivisionBelow: function (division, value) {
                for (var i = 0; i < division.length; i++) {
                    if (value < division[i]) {
                        return 5 - i;
                    }
                }
                return 0;
            },
            generateCoveragePointsWithFunc: function (pointDef, points, func) {
                var intervals = pointDef.intervals;
                angular.forEach(points, function (point) {
                    var value = func(point);
                    for (var i = 0; i < intervals.length; i++) {
                        if ((pointDef.sign && value < intervals[i].threshold) || (!pointDef.sign && value > intervals[i].threshold)) {
                            intervals[i].coors.push({
                                longtitute: point.longtitute,
                                lattitute: point.lattitute
                            });
                            break;
                        }
                    }
                });
            }
        };
    })
    .factory('preciseChartService', function(generalChartService, chartCalculateService) {
        return {
            getTypeOption: function(views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views), {
                    title: "工单类型分布图",
                    seriesName: "工单类型"
                });
            },

            getStateOption: function(views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views), {
                    title: "工单状态分布图",
                    seriesName: "工单状态"
                });
            },

            getDistrictOption: function(views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views), {
                    title: "工单镇区分布图",
                    seriesName: "镇区"
                });
            },

            getTownFlowOption: function(views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views, function(view) {
                    return view.district;
                }, function(view) {
                    return view.town;
                }, function(view) {
                    return (view.pdcpDownlinkFlow + view.pdcpUplinkFlow) / 1024 / 1024 / 8;
                }), {
                    title: "流量镇区分布图(TB)",
                    seriesName: "区域"
                });
            },

            getTownUsersOption: function(views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views, function(view) {
                    return view.district;
                }, function(view) {
                    return view.town;
                }, function(view) {
                    return view.maxUsers;
                }), {
                    title: "最大在线用户数镇区分布图(TB)",
                    seriesName: "区域"
                });
            },

            getCoverageOptions: function(stats) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '覆盖情况统计',
                    xTitle: 'RSRP(dBm)',
                    yTitle: 'MR次数'
                });
                angular.forEach(stats, function(stat, index) {
                    var data = chartCalculateService.generateMrsRsrpStats(stat);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                    }
                    chart.series.push({
                        type: 'spline',
                        name: stat.statDate,
                        data: data.values
                    });
                });

                return chart.options;
            },

            getTaOptions: function(stats) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '接入距离分布统计',
                    xTitle: '接入距离(米)',
                    yTitle: 'MR次数'
                });
                angular.forEach(stats, function(stat, index) {
                    var data = chartCalculateService.generateMrsTaStats(stat);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                    }
                    chart.series.push({
                        type: 'spline',
                        name: stat.statDate,
                        data: data.values
                    });
                });

                return chart.options;
            },

            getRsrpTaOptions: function(stats, rsrpIndex) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '接入距离分布统计',
                    xTitle: '接入距离(米)',
                    yTitle: 'MR次数'
                });
                chart.legend.align = 'right';
                angular.forEach(stats, function(stat, index) {
                    var data = chartCalculateService.generateRsrpTaStats(stat, rsrpIndex);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                        chart.title.text += '(' + data.seriesName + ')';
                    }
                    chart.series.push({
                        type: 'line',
                        name: stat.statDate,
                        data: data.values
                    });
                });

                return chart.options;
            }
        }
    });