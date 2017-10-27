﻿angular.module('topic.parameters.station', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
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
        parametersDialogService) {
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
        $scope.addStation = function (id,name) {
            parametersDialogService.showStationAdd(id,name,$scope.type);
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
            $scope.station = '';
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
    .controller('map.stationAdd.dialog',
        function($scope, dialogTitle, $uibModalInstance, downSwitchService) {
            $scope.dialogTitle = dialogTitle;
            $scope.station = {};
            $scope.ok = function() {
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
            $scope.cycles = new Array('2017年5月', '2017年6月', '2017年7月', '2017年8月', '2017年9月');

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