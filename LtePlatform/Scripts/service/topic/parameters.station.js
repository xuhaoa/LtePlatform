angular.module('topic.parameters.station', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap", 'angularFileUpload'])
    .controller('map.stationList.dialog',
        function($scope,
            dialogTitle,
            $uibModalInstance,
            workItemDialog,
            downSwitchService,
            parametersDialogService,
            appUrlService,
            $upload) {
            $scope.dialogTitle = dialogTitle;
            $scope.distincts = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
            $scope.stationList = [];
            $scope.page = 1;
            $scope.stationName = '';
            $scope.totolPage = 1;

            $scope.data = {
                file: null
            };
            $scope.onFileSelect = function ($files) {
                $scope.data.file = $files[0];
            }
            $scope.upload = function () {
                if (!$scope.data.file) {
                    return;
                }
                var url = appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Station/upload/';  //params是model传的参数，图片上传接口的url
                var data = angular.copy($scope.data || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                data.file = $scope.data.file;

                $upload.upload({
                    url: url,
                    data: data
                }).success(function (data) {
                    alert('success');
                }).error(function () {
                    alert('error');
                });
            };

            $scope.details = function(stationId) {
                downSwitchService.getCommonStationById(stationId).then(function(result) {
                    workItemDialog.showStationInfoDialog(result.result[0]);
                });
            }
            $scope.addCheckPlan = function (stationId,name) {
                parametersDialogService.addCheckPlanDialog(stationId, name);
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
                        $scope.records = result.result.records;
                    });
            };
            $scope.jumpPage(1);
    })
    .controller('map.indoorList.dialog',
    function ($scope,
        dialogTitle,
        $uibModalInstance,
        workItemDialog,
        downSwitchService,
        parametersDialogService,
        appUrlService,
        $upload) {
        $scope.dialogTitle = dialogTitle;
        $scope.distincts = new Array('全市', '顺德', '南海', '禅城', '三水', '高明');
        $scope.stationList = [];
        $scope.page = 1;
        $scope.stationName = '';
        $scope.totolPage = 1;

        $scope.data = {
            file: null
        };
        $scope.onFileSelect = function ($files) {
            $scope.data.file = $files[0];
        }
        $scope.upload = function () {
            if (!$scope.data.file) {
                return;
            }
            var url = appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Indoor/upload/';  //params是model传的参数，图片上传接口的url
            var data = angular.copy($scope.data || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
            data.file = $scope.data.file;

            $upload.upload({
                url: url,
                data: data
            }).success(function (data) {
                alert('success');
            }).error(function () {
                alert('error');
            });
        };

        $scope.details = function (stationId) {
            downSwitchService.getCommonStationById(stationId).then(function (result) {
                workItemDialog.showIndoorInfoDialog(result.result[0]);
            });
        }

        $scope.delete = function (stationId) {
            if (confirm("你确定删除该站点？")) {
                downSwitchService.deleteIndoorById(stationId).then(function (result) {
                    alert(result.description);
                    $scope.jumpPage($scope.page);
                });
            }
        }
        $scope.addCheckPlan = function (stationId, name) {
            parametersDialogService.addCheckPlanDialog(stationId, name);
        }
        $scope.edit = function (stationId) {
            parametersDialogService.showIndoorEdit(stationId);
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
            downSwitchService.getIndoorListByName($scope.stationName, $scope.selectDistinct, page, 10)
                .then(function (result) {
                    $scope.stationList = result.result.rows;
                    $scope.totolPage = result.result.total_pages;
                    $scope.page = result.result.curr_page;
                    $scope.records = result.result.records;
                });
        };
        $scope.jumpPage(1);
    })
    .controller('map.checkPlanList.dialog',
    function ($scope,
        dialogTitle,
        type,
        $uibModalInstance,
        workItemDialog,
        downSwitchService,
        parametersDialogService,
        appUrlService,
        ) {
        $scope.dialogTitle = dialogTitle;
        $scope.distincts = new Array('全市', '顺德', '南海', '禅城', '三水', '高明');
        $scope.stationList = [];
        $scope.page = 1;
        $scope.stationName = '';
        $scope.totolPage = 1;

        $scope.addCheckResult = function (StationId, StationName) {

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
            downSwitchService.getCheckPlanByName($scope.stationName, $scope.selectDistinct,type, page, 10)
                .then(function (result) {
                    $scope.stationList = result.result.rows;
                    $scope.totolPage = result.result.total_pages;
                    $scope.page = result.result.curr_page;
                    $scope.records = result.result.records;
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
    .controller('map.indoorEdit.dialog',
    function ($scope, stationId, dialogTitle, $uibModalInstance, downSwitchService) {
        $scope.dialogTitle = dialogTitle;
        $scope.station = {};
        $scope.grades = new Array('A', 'B', 'C', 'D');
        $scope.indoortypes = new Array('住宅，公寓', '机关企业', '餐饮娱乐', '居民住宅', '商业市场', '教育医疗', '工业区', '室内', '公共医院', '大型办公楼',
            '公寓', '住宅小区', '商场公寓', '商品楼', '政府机关', '商务酒店', '写字楼', '商业小区', '交通枢纽', '商业营业部',
            '综合办公楼', '商业店铺', '商场办公综合体', '学校', '企业办公楼', '商场', '综合楼宇', '厂区办公楼', '营业厅', '商务办公');
        $scope.isNews = new Array('电信新建站点', '联通原有站点（改造）', '联通原有站点', '小灵通改造', '联通原有站点（新建）', '联通原有站点（电信新建站点）', '联通划归站点（改造）',
            '联通划归站点（新建）', '新建', '电信整改站点', '电信站点', '联通划归', '电信扩容站点', '电信合路铁塔站点');
        $scope.deviceTypes = new Array('RPT', 'CRRU', 'LRRU', 'CRRU+RPT', 'LRRU+RPT', 'CRRU+LRRU', 'CRRU+LRRU+RPT');
        $scope.systemClassifies = new Array('小型', '中型', '大型', '超大型', '五类');
        $scope.netTypes = new Array('C', 'FL', 'VL', 'C+FL', 'C+VL', 'FL+VL', 'C+FL+VL', 'C+FL+TL', 'C+FL+TL+VL');

        downSwitchService.getIndoorById(stationId).then(function (result) {
            $scope.station = result.result[0];
            $scope.station.deviceNum = result.result[0].deviceNum*1; 
        });
        $scope.ok = function () {
            downSwitchService.updateIndoor({
                "Indoor": JSON.stringify($scope.station)
            }).then(function (result) {
                alert(result.description);
            });
        }
        $scope.cancel = function () {
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
    .controller('map.addCheckPlan.dialog',
    function ($scope, dialogTitle, $uibModalInstance, downSwitchService, stationId, name) {
        $scope.dialogTitle = dialogTitle;
        $scope.station = {};
        var areaMap = {
            'SD': '顺德',
            'NH': '南海',
            'CC': '禅城',
            'SS': '三水',
            'GM': '高明'
        };
        $scope.statuss = new Array('未巡检', '已巡检');
        $scope.services = new Array('省工程', '宜通', '南建');
        $scope.planWeeks = new Array('第一完整周', '第二完整周', '第三完整周', '第四完整周');

        var areaCode = stationId.substr(0, 2);
        var areaName = areaMap[areaCode];
        $scope.station.StationId = stationId;
        $scope.station.StationName = name;
        $scope.station.AreaName = areaName;


        $scope.ok = function () {
            downSwitchService.addCheckPlan({
                "Station": JSON.stringify($scope.station)
            }).then(function (result) {
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
            var Nowdate = new Date();
            var vYear = Nowdate.getFullYear();
            var vMon = Nowdate.getMonth();
            if (vMon == 0) {
                vMon = 12;
                vYear = parseInt(vYear) - 1;
            }
            $scope.assessment.cycle = vYear + '年' + vMon + '月';
            $scope.tab = 1;
            $scope.jqf = 0;
            $scope.xcccd = 100;
            $scope.kpid = 100;
            $scope.test = 1;
            $scope.assessment.xccc1 = 0;
            $scope.assessment.xccc2 = 0;
            $scope.assessment.xccc3 = 0;
            $scope.assessment.xccc4 = 0;
            $scope.assessment.xccc5 = 0;
            $scope.assessment.xccc6 = 0;
            $scope.assessment.xccc7 = 0;
            $scope.assessment.xccc8 = 0;
            $scope.assessment.jqf1 = 0;
            $scope.assessment.jqf2 = 0;
            $scope.assessment.jqf3 = 0;
            $scope.assessment.jqf4 = 0;
            $scope.assessment.jqf5 = 0;
            $scope.assessment.kpi1 = 0;
            $scope.assessment.kpi2 = 0;
            $scope.assessment.kpi3 = 0;

            

            $scope.assessment.areaname = '顺德';
            $scope.distincts = new Array('顺德', '南海', '禅城', '三水', '高明');
            $scope.services = new Array('广东宜通世纪科技股份有限公司', '广东南方建设工程有限公司', '广东省电信工程有限公司');
           
            
            $scope.change = function () {
                downSwitchService.getStationCnt($scope.assessment.areaname, $scope.assessment.cycle).then(function (result) {
                    if ($scope.assessment.areaname == '顺德') {
                        $scope.assessment.service = '广东宜通世纪科技股份有限公司';
                    } else if ($scope.assessment.areaname == '南海') {
                        $scope.assessment.service = '广东南方建设工程有限公司';
                    } else {
                        $scope.assessment.service = '广东省电信工程有限公司';
                    }
                    $scope.assessment.jzn1 = result.result.jzn1;
                    $scope.assessment.jzn2 = result.result.jzn2;
                    $scope.assessment.jzn3 = result.result.jzn3;
                    $scope.assessment.jzn4 = result.result.jzn4;
                    $scope.assessment.jzzd = result.result.jzzd;
                    $scope.assessment.jzw1 = result.result.jzw1;
                    $scope.assessment.jzw2 = result.result.jzw2;
                    $scope.assessment.jzw3 = result.result.jzw3;
                    $scope.assessment.jzw4 = result.result.jzw4;
                    $scope.assessment.xxnw = result.result.xxnw;
                    $scope.assessment.zxnw = result.result.zxnw;
                    $scope.assessment.dxnw = result.result.dxnw;
                    $scope.assessment.cdxnw = result.result.cdxnw;
                    $scope.assessment.snwfbxt = result.result.snwfbxt;
                    $scope.assessment.wlxfbxt = result.result.wlxfbxt;
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
            $scope.change();
    })
    .controller('map.assessmentEdit.dialog',
    function ($scope,
        $http,
        dialogTitle,
        assessment,
        downSwitchService,
        mapDialogService,
        $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;

        $scope.assessment = assessment;
        var Nowdate = new Date();
        var vYear = Nowdate.getFullYear();
        var vMon = Nowdate.getMonth();
        if (vMon == 0) {
            vMon = 12;
            vYear = parseInt(vYear) - 1;
        }
        $scope.assessment.cycle = vYear + '年' + vMon + '月';
        $scope.tab = 1;
        $scope.jqf = 0;
        $scope.xcccd = 100;
        $scope.kpid = 100;
        $scope.test = 1;
        $scope.assessment.xccc1 = 0;
        $scope.assessment.xccc2 = 0;
        $scope.assessment.xccc3 = 0;
        $scope.assessment.xccc4 = 0;
        $scope.assessment.xccc5 = 0;
        $scope.assessment.xccc6 = 0;
        $scope.assessment.xccc7 = 0;
        $scope.assessment.xccc8 = 0;
        $scope.assessment.jqf1 = 0;
        $scope.assessment.jqf2 = 0;
        $scope.assessment.jqf3 = 0;
        $scope.assessment.jqf4 = 0;
        $scope.assessment.jqf5 = 0;
        $scope.assessment.kpi1 = 0;
        $scope.assessment.kpi2 = 0;
        $scope.assessment.kpi3 = 0;



        $scope.assessment.areaname = '顺德';
        $scope.distincts = new Array('顺德', '南海', '禅城', '三水', '高明');
        $scope.services = new Array('广东宜通世纪科技股份有限公司', '广东南方建设工程有限公司', '广东省电信工程有限公司');


        $scope.change = function () {
            downSwitchService.getStationCnt($scope.assessment.areaname, $scope.assessment.cycle).then(function (result) {
                if ($scope.assessment.areaname == '顺德') {
                    $scope.assessment.service = '广东宜通世纪科技股份有限公司';
                } else if ($scope.assessment.areaname == '南海') {
                    $scope.assessment.service = '广东南方建设工程有限公司';
                } else {
                    $scope.assessment.service = '广东省电信工程有限公司';
                }
                $scope.assessment.jzn1 = result.result.jzn1;
                $scope.assessment.jzn2 = result.result.jzn2;
                $scope.assessment.jzn3 = result.result.jzn3;
                $scope.assessment.jzn4 = result.result.jzn4;
                $scope.assessment.jzzd = result.result.jzzd;
                $scope.assessment.jzw1 = result.result.jzw1;
                $scope.assessment.jzw2 = result.result.jzw2;
                $scope.assessment.jzw3 = result.result.jzw3;
                $scope.assessment.jzw4 = result.result.jzw4;
                $scope.assessment.xxnw = result.result.xxnw;
                $scope.assessment.zxnw = result.result.zxnw;
                $scope.assessment.dxnw = result.result.dxnw;
                $scope.assessment.cdxnw = result.result.cdxnw;
                $scope.assessment.snwfbxt = result.result.snwfbxt;
                $scope.assessment.wlxfbxt = result.result.wlxfbxt;
            });
        };

        $scope.getAssessment = function (areaName) {
            downSwitchService.getAssessment(areaName, cycle).then(function (result) {
                mapDialogService.showCommonStationInfo(result.result[0]);
            });
        };



        $scope.changejqf = function () {
            $scope.jqf = 0 + $scope.assessment.jqf1 + $scope.assessment.jqf2 + $scope.assessment.jqf3 + $scope.assessment.jqf4 + $scope.assessment.jqf5;
            $scope.zf = $scope.jqf + $scope.kpid * 0.3 + $scope.xcccd * 0.7;
        };

        $scope.changecxcc = function () {
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
        $scope.changekpi = function () {
            $scope.kpi = 0 + $scope.assessment.kpi1 + $scope.assessment.kpi2 + $scope.assessment.kpi3;
            $scope.kpid = 100 + $scope.kpi;
            $scope.zf = $scope.jqf + $scope.kpid * 0.3 + $scope.xcccd * 0.7;
        };
        $scope.ok = function () {
            downSwitchService.updateAssessment({
                "Assessment": JSON.stringify($scope.assessment)
            }).then(function (result) {
                alert(result.description);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
        }
        $scope.isSelectTab = function (checkTab) {
            return $scope.tab === checkTab
        }
        $scope.selectTab(0);
        $scope.change();
    })
    .controller('map.assessmentDetails.dialog',
    function ($scope,
        $http,
        dialogTitle,
        assessment,
        downSwitchService,
        mapDialogService,
        $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.assessment = assessment;
        $scope.tab = 1;
        $scope.jqf = $scope.assessment.jqf1*1 + $scope.assessment.jqf2*1 + $scope.assessment.jqf3*1 + $scope.assessment.jqf4*1 + $scope.assessment.jqf5*1;

            $scope.xcccd = 100 +
                $scope.assessment.xccc1*1 +
                $scope.assessment.xccc2*1 +
                $scope.assessment.xccc3*1 +
                $scope.assessment.xccc4*1 +
                $scope.assessment.xccc5*1 +
                $scope.assessment.xccc6*1 +
                $scope.assessment.xccc7*1 +
                $scope.assessment.xccc8*1;

            $scope.kpi = 0 + $scope.assessment.kpi1*1 + $scope.assessment.kpi2*1 + $scope.assessment.kpi3*1;
            $scope.kpid = 100 + $scope.kpi*1;

            $scope.zf = $scope.jqf*1 + $scope.kpid * 0.3 + $scope.xcccd * 0.7;

            $scope.selectTab = function (setTab) {
                $scope.tab = setTab;
            }
            $scope.isSelectTab = function (checkTab) {
                return $scope.tab === checkTab
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

    })
    .controller('map.assessmentList.dialog',
    function ($scope,
        $http,
        dialogTitle,
        downSwitchService,
        mapDialogService,
        parametersDialogService,
        appUrlService,
        $uibModalInstance,
        $upload) {

        $scope.dialogTitle = dialogTitle;
        $scope.distincts = new Array('全市', '顺德', '南海', '禅城', '三水', '高明');
        $scope.assessmentList = [];
        $scope.page = 1;
        $scope.cycle = '';
        $scope.url = '';
        $scope.selectDistinct = '全市';
        $scope.totolPage = 1;
        $scope.onFileSelect = function ($files) {
            $scope.data.file = $files[0];
        }
        $scope.data = {
            file: null
        };
        $scope.upload = function (id) {
            if (!$scope.data.file) {
                return;
            }
            var url = appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Assessment/upload/';  //params是model传的参数，图片上传接口的url
            var data = angular.copy($scope.data || {i}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
            data.file = $scope.data.file;
            data.id = id;
            $upload.upload({
                url: url,
                data: data
            }).success(function (data) {
                alert('success');
            }).error(function () {
                alert('error');
            });
        };
        $scope.details = function (id) {
            downSwitchService.getAssessmentById(id).then(function (result) {
                parametersDialogService.showAssessmentDialog(result.result[0]);
            });
        }

        $scope.delete = function (stationId) {
            if (confirm("你确定删除该条记录？")) {
                downSwitchService.deleteAssessmentById(stationId).then(function (result) {
                    alert(result.description);
                    $scope.jumpPage($scope.page);
                });
            }
        }
        $scope.showPic = function (url) {
            $scope.url = url;
            document.getElementById('oImg').style.display = "block";
        }  
        $scope.hidePic = function () {
            document.getElementById('oImg').style.display = "none";
        }  
        $scope.edit = function (id) {
            downSwitchService.getAssessmentById(id).then(function (result) {
                parametersDialogService.showAssessmentEdit(result.result[0]);
            });
        }
        $scope.download = function (id) {
            location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/Assessment/download/id/" + id;
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
        $scope.search();
       
    });