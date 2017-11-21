angular.module('topic.parameters.station', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
    .controller('map.stationList.dialog',
        function($scope,
            dialogTitle,
            $uibModalInstance,
            workItemDialog,
            downSwitchService,
            parametersDialogService) {
            $scope.dialogTitle = dialogTitle;
            $scope.distincts = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
            $scope.stationList = [];
            $scope.page = 1;
            $scope.stationName = '';
            $scope.totolPage = 1;
            
            $scope.details = function(stationId) {
                downSwitchService.getCommonStationById(stationId).then(function(result) {
                    workItemDialog.showStationInfoDialog(result.result[0]);
                });
            }

            $scope.delete = function(stationId) {
                if (confirm("你确定删除该站点？")) {
                    downSwitchService.deleteStationById(stationId).then(function(result) {
                        alert(result.description);
                        $scope.jumpPage($scope.page);
                    });
                }
            }
            $scope.edit = function(stationId) {
                parametersDialogService.showStationEdit(stationId);
            }
            $scope.addStation = function() {
                parametersDialogService.showStationAdd();
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
            $scope.search = function() {
                $scope.page = 1;
                $scope.jumpPage($scope.page);
            }
            $scope.firstPage = function() {
                $scope.page = 1;
                $scope.jumpPage($scope.page);
            }
            $scope.lastPage = function() {
                $scope.page = $scope.totolPage;
                $scope.jumpPage($scope.page);
            }
            $scope.prevPage = function() {
                if ($scope.page !== 1)
                    $scope.page--;
                $scope.jumpPage($scope.page);
            }
            $scope.nextPage = function() {
                if ($scope.page !== $scope.totolPage)
                    $scope.page++;
                $scope.jumpPage($scope.page);
            }
            $scope.jumpPage = function(page) {
                if (page >= $scope.totolPage)
                    page = $scope.totolPage;
                downSwitchService.getStationListByName($scope.stationName, $scope.selectDistinct, page, 10)
                    .then(function(result) {
                        $scope.stationList = result.result.rows;
                        $scope.totolPage = result.result.total_pages;
                        $scope.page = result.result.curr_page;
                    });
            };
            $scope.jumpPage(1);
    })
    .controller('map.stationAddList.dialog',
    function ($scope,
        dialogTitle,
        type,
        $uibModalInstance,
        workItemDialog,
        downSwitchService,
        parametersDialogService,
        appUrlService) {
        $scope.dialogTitle = dialogTitle;
        $scope.distincts = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.stationList = [];
        $scope.page = 1;
        $scope.stationName = '';
        $scope.totolPage = 1;
        $scope.type = type;

        $scope.edit = function (stationId) {
            parametersDialogService.showStationEdit(stationId);
        }
        $scope.addStation = function (station) {
            if (type == 'JZ') {
                parametersDialogService.showStationAdd(station);
            } else if (type == 'SF') {
                parametersDialogService.showIndoorAdd(station);
            }
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.search = function () {
            $scope.page = 1;
            $scope.jumpPage($scope.page);
        }
        $scope.download = function () {
            location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/StationCommon/toAddStationDownload/type/" + type + "/areaName/" + $scope.selectDistinct;      
        }
        $scope.firstPage = function () {
            $scope.page = 1;
            $scope.jumpPage($scope.page);
        }
        $scope.lastPage = function () {
            $scope.page = $scope.totolPage;
            $scope.jumpPage($scope.page);
        }
        $scope.prevPage = function () {
            if ($scope.page !== 1)
                $scope.page--;
            $scope.jumpPage($scope.page);
        }
        $scope.nextPage = function () {
            if ($scope.page !== $scope.totolPage)
                $scope.page++;
            $scope.jumpPage($scope.page);
        }
        $scope.jumpPage = function (page) {
            if (page >= $scope.totolPage)
                page = $scope.totolPage;
            downSwitchService.getStationAddListByName($scope.selectDistinct, $scope.stationName,$scope.type, page, 10)
                .then(function (result) {
                    $scope.stationList = result.result.rows;
                    $scope.totolPage = result.result.total_pages;
                    $scope.page = result.result.curr_page;
                    $scope.records = result.result.records;
                });
        };
        $scope.jumpPage(1);
    })
    .controller('map.stationEdit.dialog',
        function($scope, stationId, dialogTitle, $uibModalInstance, downSwitchService) {
            $scope.dialogTitle = dialogTitle;
            $scope.station = {};
            downSwitchService.getStationById(stationId).then(function(result) {
                $scope.station = result.result[0];
            });
            $scope.ok = function() {
                downSwitchService.updateStation({
                    "Station": JSON.stringify($scope.station)
                }).then(function(result) {
                    alert(result.description);
                });
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
        })
    .controller('map.common-stationEdit.dialog', function ($scope, stationId, dialogTitle, $uibModalInstance, downSwitchService) {
	    $scope.dialogTitle = dialogTitle;
	    $scope.station = {};
        downSwitchService.getStationCommonById(stationId).then(function(result) {
            $scope.station = result.result[0];
            $scope.station.longtitute = result.result[0].longtitute*1;
            $scope.station.lattitute = result.result[0].lattitute*1;
        });
	    
	    $scope.ok = function() {
                downSwitchService.updateStationCommon({
                    "Station": JSON.stringify($scope.station)
                }).then(function(result) {
                    alert(result.description);
                });
            }
	    $scope.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	    }
	})
    .controller('map.stationAdd.dialog',
        function($scope, dialogTitle, $uibModalInstance, downSwitchService,station) {
            $scope.dialogTitle = dialogTitle;
            $scope.station = {};
            var areaMap = {
                'SD':'顺德',
                'NH':'南海',
                'CC':'禅城',
                'SS':'三水',
                'GM':'高明'
            };
            $scope.grades = new Array('A', 'B', 'C', 'D');
            $scope.stationTypes = new Array('包含固网设备的无线机房', '电信机楼内无线机房', '一体化机柜', '拉远', '安装点', '微基站', '微峰窝', '接入网机房', '综合机房','其它无线机房');
            $scope.roomAttributions = new Array('电信', '联通', '铁塔');
            $scope.isNewRooms = new Array('新建', '存量');
            $scope.towerTypes = new Array('楼面抱杆', '普通楼面塔', '普通地面塔', '景观塔', '单管塔', '增高架', '楼面支撑杆', '屋顶抱杆',
                '支撑杆', '通信杆', '落地塔', '楼面塔', '角钢塔', '美化杆', '路灯杆塔', '楼面增高架',
                '铁塔', '美化天线', '抱杆', '抱杆天线', '排气管型', '楼面美化天线', '管型天线', '美化桶',
                '方柱型天线', '地面通信杆', '楼面角钢塔', '楼面美化方柱', '楼面排气管', '射灯型', '楼面美化集束杆',
                '地面美化树', '楼面美化水罐', '楼面笼架', '单杆塔', '租赁机房', '小灵通杆', '排气管');
            $scope.towerAttributions = new Array('电信', '联通', '铁塔');
            $scope.isNewTowers = new Array('新建', '存量');
            $scope.attributionNatures = new Array('城市', '市区', '乡镇', '镇区', '农村');
            $scope.isSimples = new Array('是', '否');
            $scope.isDangerouss = new Array('是', '否');
            $scope.isShares = new Array('是', '否');
            $scope.isPowers = new Array('是', '否');
            $scope.isBBUs = new Array('是', '否');
            $scope.netTypes = new Array('C', 'FL', 'VL', 'C+FL', 'C+VL', 'FL+VL', 'C+FL+VL', 'C+FL+TL','C+FL+TL+VL');
      
            var areaCode = station.id.substr(0, 2);
            var areaName = areaMap[areaCode];
            $scope.station.StationId = station.id;
            $scope.station.StationName = station.name;
            $scope.station.InstallAddr = station.address;
            $scope.station.longtitute = station.longtitute;
            $scope.station.lattitute = station.lattitute;
            $scope.station.AreaName = areaName;
            $scope.station.TowerHeight = 0;

            $scope.ok = function () {
                downSwitchService.addStation({
                    "Station": JSON.stringify($scope.station)
                }).then(function(result) {
                    alert(result.description);
                });
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
    })
    .controller('map.indoorAdd.dialog',
    function ($scope, dialogTitle, $uibModalInstance, downSwitchService, station) {
        $scope.dialogTitle = dialogTitle;
        $scope.station = {};
        var areaMap = {
            'SD': '顺德',
            'NH': '南海',
            'CC': '禅城',
            'SS': '三水',
            'GM': '高明'
        };
        $scope.grades = new Array('A', 'B', 'C', 'D');
        $scope.indoortypes = new Array('住宅，公寓', '机关企业', '餐饮娱乐', '居民住宅', '商业市场', '教育医疗', '工业区', '室内', '公共医院', '大型办公楼',
            '公寓', '住宅小区', '商场公寓', '商品楼', '政府机关', '商务酒店', '写字楼', '商业小区', '交通枢纽', '商业营业部',
            '综合办公楼', '商业店铺', '商场办公综合体', '学校', '企业办公楼', '商场', '综合楼宇', '厂区办公楼', '营业厅', '商务办公');
        $scope.isNews = new Array('电信新建站点', '联通原有站点（改造）', '联通原有站点', '小灵通改造', '联通原有站点（新建）', '联通原有站点（电信新建站点）', '联通划归站点（改造）',
            '联通划归站点（新建）', '新建', '电信整改站点', '电信站点', '联通划归', '电信扩容站点', '电信合路铁塔站点');
        $scope.deviceTypes = new Array('RPT', 'CRRU', 'LRRU', 'CRRU+RPT', 'LRRU+RPT', 'CRRU+LRRU', 'CRRU+LRRU+RPT');
        $scope.systemClassifies = new Array('小型', '中型', '大型', '超大型', '五类');
        $scope.netTypes = new Array('C', 'FL', 'VL', 'C+FL', 'C+VL', 'FL+VL', 'C+FL+VL', 'C+FL+TL', 'C+FL+TL+VL');

        var areaCode = station.id.substr(0, 2);
        var areaName = areaMap[areaCode];
        $scope.station.stationId = station.id;
        $scope.station.name = station.name;
        $scope.station.address = station.address;
        $scope.longtitute = station.longtitute;
        $scope.lattitute = station.lattitute;
        $scope.station.areaName = areaName;
        $scope.station.deviceNum = 1;

        $scope.ok = function () {
            downSwitchService.addIndoor({
                "Indoor": JSON.stringify($scope.station)
            }).then(function (result) {
                alert(result.description);
            });
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('map.common-stationAdd.dialog',
        function($scope,
            $http,
            dialogTitle,
            type,
            $uibModalInstance,
            downSwitchService,
            stationFactory) {
            $scope.dialogTitle = dialogTitle;
            $scope.station = {};
            $scope.distincts = stationFactory.stationDistincts;

            $scope.change = function() {
                downSwitchService.getCommonStationIdAdd($scope.selectedDistinct, type).then(function(result) {
                    $scope.station.id = result.result;
                });
            };
            
            $scope.ok = function() {
                downSwitchService.addCommonStation({
                    "Station": JSON.stringify($scope.station)
                }).then(function(result) {
                    alert(result.description);
                });
            }

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
        })
    .controller('map.construction.dialog',
        function($scope, $uibModalInstance, dialogTitle, site, appFormatService, downSwitchService) {
            $scope.dialogTitle = dialogTitle;
            $scope.site = site;
            $scope.upload = {
                dwg: false
            };
            $scope.constructionGroups = appFormatService.generateConstructionGroups(site);
            $scope.uploadNewDwg = function() {
                $scope.upload.dwg = true;
                var $uploader = $("#btsInfo_upload_dwg");
                //配置上传控件
                $uploader.fileinput({
                    language: "zh", //本地化语言
                    uploadUrl: "/api/DwgView?directory=Common&btsId=" + site.fslNumber,
                    uploadAsync: true,
                    minFileCount: 1,
                    maxFileCount: 6, //一次最多上传数量
                    overwriteInitial: false,
                    allowedFileExtensions: ["pdf", "vsd", "vsdx"],
                    previewSettings: {
                        image: { width: "120px", height: "80px" }
                    },
                    initialPreviewAsData: true // identify if you are sending preview data only and not the markup
                }).on('fileuploaded',
                    function(event, data, id, index) {
                        $scope.upload.dwg = false;
                        $scope.getDwgList();
                    }).on('filebatchuploaderror',
                    function(event, data, previewId, index) {
                        $scope.upload.dwg = false;
                    });

                //清空已选
                $uploader.fileinput('clear');
            };

            $scope.getDwgList = function() {
                downSwitchService.queryDwgList(site.fslNumber).then(function(list) {
                    $scope.dwgList = list;
                });
            };
            $scope.download = function(fileName) {
                downSwitchService.queryDwgUrl(site.fslNumber, fileName).then(function(result) {
                    if (result.error) {
                        console.log(error);
                    } else {
                        $scope.downloadUrl = "http://" +
                            window.location.hostname +
                            ":2015/BTSDWG/Common/" +
                            site.fslNumber +
                            "/" +
                            encodeURIComponent(result.file);
                    }
                });
            };

            $scope.getDwgList();

            $scope.ok = function() {
                $uibModalInstance.close($scope.site);
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.assessmentAdd.dialog',
        function($scope,
            $http,
            dialogTitle,
            downSwitchService,
            mapDialogService,
            $uibModalInstance) {
            $scope.dialogTitle = dialogTitle;

            $scope.assessment = {};

            $scope.tab = 1;
            $scope.jqf = 0;
            $scope.xcccd = 100;
            $scope.kpid = 100;
            $scope.test = 1;

            $scope.distincts = new Array('顺德', '南海', '禅城', '三水', '高明');
            $scope.services = new Array('广东宜通世纪科技股份有限公司', '广东南方建设工程有限公司', '广东省电信工程有限公司');
            //$scope.services = new Array('宜通世纪', '南方建设', '电信工程');
            $scope.cycles = new Array('2017年5月', '2017年6月', '2017年7月', '2017年8月', '2017年9月');

            $scope.change = function () {
                downSwitchService.getStationCnt($scope.selectDistinct).then(function (result) {
                    $scope.assessment = result.result;
                });
            };

            $scope.getAssessment = function(areaName) {
                downSwitchService.getAssessment(areaName, cycle).then(function(result) {
                    mapDialogService.showCommonStationInfo(result.result[0]);
                });
            };

            

            $scope.changejqf = function () {
                $scope.jqf = 0 + $scope.assessment.jqf1 + $scope.assessment.jqf2 + $scope.assessment.jqf3 + $scope.assessment.jqf4 + $scope.assessment.jqf5;
                $scope.zf = $scope.jqf + $scope.kpid * 0.3 + $scope.xcccd * 0.7;
            };
            
            $scope.changecxcc = function() {
                $scope.xcccd = 100 +
                    $scope.assessment.xccc1 +
                    $scope.assessment.xccc2 +
                    $scope.assessment.xccc3 +
                    $scope.assessment.xccc4 +
                    $scope.assessment.xccc5 +
                    $scope.assessment.xccc6 +
                    $scope.assessment.xccc7 +
                    $scope.assessment.xccc8;
                $scope.zf = $scope.jqf + $scope.kpid * 0.3 + $scope.xcccd * 0.7;
            };
            $scope.changekpi = function() {
                $scope.kpi = 0 + $scope.assessment.kpi1 + $scope.assessment.kpi2 + $scope.assessment.kpi3;
                $scope.kpid = 100 + $scope.kpi;
                $scope.zf = $scope.jqf + $scope.kpid * 0.3 + $scope.xcccd * 0.7;
            };
            $scope.ok = function () {
                downSwitchService.addAssessment({
                    "Assessment": JSON.stringify($scope.assessment)
                }).then(function (result) {
                    alert(result.description);
                });
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.selectTab = function (setTab) {
                $scope.tab = setTab;
            }
            $scope.isSelectTab = function (checkTab) {
                return $scope.tab === checkTab
            }
            $scope.selectTab(0);
    })
    .controller('map.assessmentList.dialog',
    function ($scope,
        $http,
        dialogTitle,
        downSwitchService,
        mapDialogService,
        parametersDialogService,
        $uibModalInstance) {

        $scope.dialogTitle = dialogTitle;
        $scope.distincts = new Array('全市', '顺德', '南海', '禅城', '三水', '高明');
        $scope.assessmentList = [];
        $scope.page = 1;
        $scope.cycle = '';
        $scope.totolPage = 1;

        $scope.details = function (stationId) {
            downSwitchService.getCommonStationById(stationId).then(function (result) {
                workItemDialog.showStationInfoDialog(result.result[0]);
            });
        }

        $scope.delete = function (stationId) {
            if (confirm("你确定删除该条记录？")) {
                downSwitchService.deleteStationById(stationId).then(function (result) {
                    alert(result.description);
                    $scope.jumpPage($scope.page);
                });
            }
        }
        $scope.edit = function (stationId) {
            parametersDialogService.showStationEdit(stationId);
        }
        $scope.addAssessment = function () {
            parametersDialogService.showAssessmentAdd();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.search = function () {
            $scope.page = 1;
            $scope.jumpPage($scope.page);
        }
        $scope.firstPage = function () {
            $scope.page = 1;
            $scope.jumpPage($scope.page);
        }
        $scope.lastPage = function () {
            $scope.page = $scope.totolPage;
            $scope.jumpPage($scope.page);
        }
        $scope.prevPage = function () {
            if ($scope.page !== 1)
                $scope.page--;
            $scope.jumpPage($scope.page);
        }
        $scope.nextPage = function () {
            if ($scope.page !== $scope.totolPage)
                $scope.page++;
            $scope.jumpPage($scope.page);
        }
        $scope.jumpPage = function (page) {
            if (page >= $scope.totolPage)
                page = $scope.totolPage;
            downSwitchService.getAssessmentListByAreaName($scope.cycle, $scope.selectDistinct, page, 10)
                .then(function (result) {
                    $scope.assessmentList = result.result.rows;
                    $scope.totolPage = result.result.total_pages;
                    $scope.page = result.result.curr_page;
                });
        };
        $scope.jumpPage(1);
       
    });