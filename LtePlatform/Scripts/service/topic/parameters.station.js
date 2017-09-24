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
            downSwitchService.getStations(0, 10).then(function(result) {
                $scope.stationList = result.result.rows;
                $scope.totolPage = result.result.total_pages;
                $scope.page = result.result.curr_page;
            });
            $scope.details = function(stationId) {
                downSwitchService.getStationById(stationId).then(function(result) {
                    workItemDialog.showStationInfo(result.result[0]);
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
                downSwitchService.getStationByName($scope.stationName, $scope.selectDistinct, page, 10)
                    .then(function(result) {
                        $scope.stationList = result.result.rows;
                        $scope.totolPage = result.result.total_pages;
                        $scope.page = result.result.curr_page;
                    });
            };
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
            $scope.station = '';
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
            $scope.station = [];
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
    .controller('map.assessment.dialog',
        function($scope,
            $http,
            dialogTitle,
            downSwitchService,
            parametersDialogService,
            $uibModalInstance) {
            $scope.dialogTitle = dialogTitle;
            $scope.tab = 1;
            $scope.jqf = 0;
            $scope.xcccd = 100;
            $scope.kpid = 100;
            $scope.getAssessment = function(areaName) {
                downSwitchService.getAssessment(areaName, cycle).then(function(result) {
                    parametersDialogService.showCommonStationInfo(result.result[0]);
                });
            };
            $scope.changejqf = function() {
                $scope.jqf = $scope.jqf1 + $scope.jqf2 + $scope.jqf3 + $scope.jqf4 + $scope.jqf5;
            };
            $scope.changecxcc = function() {
                $scope.xcccd = 100 +
                    $scope.xccc1 +
                    $scope.xccc2 +
                    $scope.xccc3 +
                    $scope.xccc4 +
                    $scope.xccc5 +
                    $scope.xccc6 +
                    $scope.xccc7 +
                    $scope.xccc8;
            };
            $scope.changekpi = function() {
                $scope.kpi = $scope.kpi1 + $scope.kpi2 + $scope.kpi3;
                $scope.kpid = 100 + $scope.kpi;
            };
            $scope.ok = function() {
                $uibModalInstance.close($scope.bts);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });