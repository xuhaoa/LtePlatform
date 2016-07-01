angular.module('college', ['myApp.url'])
    .factory('collegeService', function (generalHttpService) {
        return {
            queryNames: function () {
                return generalHttpService.getApiData('CollegeNames', {});
            },
            queryStats: function () {
                return generalHttpService.getApiData('CollegeStat', {});
            },
            queryRegion: function (id) {
                return generalHttpService.getApiData('CollegeRegion/' + id, {});
            },
            queryENodebs: function (name) {
                return generalHttpService.getApiData('CollegeENodeb', {
                    collegeName: name
                });
            },
            queryCells: function (name) {
                return generalHttpService.getApiData('CollegeCells', {
                    collegeName: name
                });
            },
            queryBtss: function (name) {
                return generalHttpService.getApiData('CollegeBtss', {
                    collegeName: name
                });
            },
            queryCdmaCells: function (name) {
                return generalHttpService.getApiData('CollegeCdmaCells', {
                    collegeName: name
                });
            },
            queryLteDistributions: function (name) {
                return generalHttpService.getApiData('CollegeLteDistributions', {
                    collegeName: name
                });
            },
            queryCdmaDistributions: function (name) {
                return generalHttpService.getApiData('CollegeCdmaDistributions', {
                    collegeName: name
                });
            }
        }
    });