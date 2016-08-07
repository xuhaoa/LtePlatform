angular.module('college.query', ['app.common'])
    .controller("all.query", function($scope, collegeService, collegeQueryService, collegeDialogService) {
        $scope.collegeInfo.url = $scope.rootPath + "query";
        $scope.page.title = "基础信息查看";
        $scope.collegeYearList = [];
        $scope.collegeName = $scope.collegeInfo.names[0];
        $scope.collegeExisted = true;

        $scope.updateInfos = function(year) {
            collegeService.queryStats(year).then(function(colleges) {
                $scope.collegeList = colleges;
            });
            collegeQueryService.queryYearList(year).then(function(colleges) {
                $scope.collegeYearList = colleges;
            });
            collegeQueryService.queryByNameAndYear($scope.collegeName, year).then(function(info) {
                $scope.collegeExisted = !!info;
            });
        };

        $scope.$watch('collegeInfo.year.selected', function(year) {
            $scope.updateInfos(year);
        });
        $scope.$watch('collegeName', function(name) {
            collegeQueryService.queryByNameAndYear(name, $scope.collegeInfo.year.selected).then(function(info) {
                $scope.collegeExisted = !!info;
            });
        });
        $scope.addOneCollegeMarkerInfo = function() {
            collegeQueryService.queryByNameAndYear($scope.collegeName, $scope.collegeInfo.year.selected - 1).then(function(item) {
                if (item) {
                    collegeDialogService.addYearInfo(item, $scope.collegeName, $scope.collegeInfo.year.selected, function() {
                        $scope.updateInfos($scope.collegeInfo.year.selected);
                    });
                }
            });
        };
        $scope.createNewCollege = function() {
            
        };
    })
    .controller('eNodeb.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryENodebs(name).then(function(result) {
            $scope.eNodebList = result;
        });

        $scope.ok = function() {
            $uibModalInstance.close($scope.eNodebList);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('bts.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryBtss(name).then(function(result) {
            $scope.btsList = result;
        });

        $scope.ok = function() {
            $uibModalInstance.close($scope.btsList);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cell.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCells(name).then(function(result) {
            $scope.cellList = result;
        });

        $scope.ok = function() {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cdmaCell.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCdmaCells(name).then(function(result) {
            $scope.cdmaCellList = result;
        });

        $scope.ok = function() {
            $uibModalInstance.close($scope.cdmaCellList);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('lte.distribution.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryLteDistributions(name).then(function(result) {
            $scope.distributionList = result;
        });

        $scope.ok = function() {
            $uibModalInstance.close($scope.distributionList);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cdma.distribution.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCdmaDistributions(name).then(function(result) {
            $scope.distributionList = result;
        });

        $scope.ok = function() {
            $uibModalInstance.close($scope.distributionList);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("query.name", function($scope, $stateParams, collegeService) {
        $scope.collegeInfo.url = $scope.rootPath + "query";
        $scope.collegeName = $stateParams.name;
        collegeService.queryENodebs($scope.collegeName).then(function(eNodebs) {
            $scope.eNodebList = eNodebs;
        });
        collegeService.queryCells($scope.collegeName).then(function(cells) {
            $scope.cellList = cells;
        });
        collegeService.queryBtss($scope.collegeName).then(function(btss) {
            $scope.btsList = btss;
        });
        collegeService.queryCdmaCells($scope.collegeName).then(function(cells) {
            $scope.cdmaCellList = cells;
        });
    })
    .controller('year.info.dialog', function($scope, $uibModalInstance, appFormatService,
        name, year, item) {
        $scope.dialogTitle = name + year + "年校园信息补充";
        $scope.dto = item;
        $scope.beginDate = {
            value: appFormatService.getDate(item.oldOpenDate),
            opened: false
        };
        $scope.endDate = {
            value: appFormatService.getDate(item.newOpenDate),
            opened: false
        };
        $scope.beginDate.value.setDate($scope.beginDate.value.getDate() + 365);
        $scope.endDate.value.setDate($scope.endDate.value.getDate() + 365);

        $scope.ok = function() {
            $scope.dto.oldOpenDate = $scope.beginDate.value;
            $scope.dto.newOpenDate = $scope.endDate.value;
            $scope.dto.year = year;
            $uibModalInstance.close($scope.dto);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });