angular.module('college.query', ['app.common'])
    .controller("all.query", function($scope, collegeService, collegeQueryService, collegeDialogService, appFormatService) {
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
            collegeQueryService.queryByNameAndYear($scope.collegeName, $scope.collegeInfo.year.selected - 1).then(function (item) {
                if (!item) {
                    var begin = new Date();
                    begin.setDate(begin.getDate() - 365 - 7);
                    var end = new Date();
                    end.setDate(end.getDate() - 365);
                    collegeQueryService.queryByName($scope.collegeName).then(function(college) {
                        item = {
                            oldOpenDate: appFormatService.getDateString(begin, 'yyyy-MM-dd'),
                            newOpenDate: appFormatService.getDateString(end, 'yyyy-MM-dd'),
                            collegeId: college.id
                        };
                        collegeDialogService.addYearInfo(item, $scope.collegeName, $scope.collegeInfo.year.selected, function() {
                            $scope.updateInfos($scope.collegeInfo.year.selected);
                        });
                    });
                } else {
                    collegeDialogService.addYearInfo(item, $scope.collegeName, $scope.collegeInfo.year.selected, function() {
                        $scope.updateInfos($scope.collegeInfo.year.selected);
                    });
                }
            });
        };
        $scope.createNewCollege = function() {
            collegeDialogService.addNewCollege($scope.updateInfos);
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
    .controller("query.name", function($scope, $stateParams, collegeService, collegeDialogService) {
        $scope.collegeInfo.url = $scope.rootPath + "query";
        $scope.collegeName = $stateParams.name;
        $scope.parametersPath = "/Parameters/List#/";
        $scope.updateLteCells = function() {
            collegeService.queryCells($scope.collegeName).then(function(cells) {
                $scope.cellList = cells;
            });
        };
        $scope.supplementCells = function() {
            collegeDialogService.supplementENodebCells($scope.eNodebList, $scope.cellList, $scope.collegeName, $scope.updateLteCells);
        };
        collegeService.queryENodebs($scope.collegeName).then(function(eNodebs) {
            $scope.eNodebList = eNodebs;
        });
        $scope.updateLteCells();
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
    })
    .controller('cell.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, geometryService,
        eNodebs, cells, collegeName) {
        $scope.dialogTitle = collegeName + "LTE小区补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
          { name: '小区名称', field: 'cellName' },
          { name: '方位角', field: 'azimuth' },
          { name: '下倾角', field: 'downTilt' },
          { name: '频点', field: 'frequency' },
          { name: '室内外', field: 'indoor' },
          { name: '与基站距离', field: 'distance' },
          { name: 'RRU名称', field: 'rruName' }
        ];

        angular.forEach(eNodebs, function(eNodeb) {
            networkElementService.queryCellInfosInOneENodeb(eNodeb.eNodebId).then(function(cellInfos) {
                angular.forEach(cellInfos, function(dstCell) {
                    var i;
                    for (i = 0; i < cells.length; i++) {
                        if (dstCell.cellName === cells[i].eNodebName + '-' + cells[i].sectorId) {
                            break;
                        }
                    }
                    if (i === cells.length) {
                        dstCell.distance = geometryService.getDistance(eNodeb.lattitute, eNodeb.longtitute, dstCell.lattitute, dstCell.longtitute);
                        networkElementService.queryLteRruFromCellName(dstCell.cellName).then(function(rru) {
                            dstCell.rruName = rru ? rru.rruName : '';
                            $scope.supplementCells.push(dstCell);
                        });
                    }
                });
                $scope.gridOptions.data = $scope.supplementCells;
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });