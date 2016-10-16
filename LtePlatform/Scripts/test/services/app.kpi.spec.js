/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../mycharts/drilldown.chart.js"/>
/// <reference path="../../service/app.kpi.service.js"/>

angular.module('myApp.region', []);
angular.module('myApp.url', []);

describe('app kpi service test', function () {
    var appKpiService;
    //beforeEach(module('myApp.region'));
    beforeEach(module('myApp.kpi'));

    beforeEach(inject(function(_appKpiService_) {
        appKpiService = _appKpiService_;
    }));

    it('should be able to get city stat', function() {
        var districtStats = [
            {
                totalMrs: 100,
                firstNeighbors: 23,
                secondNeighbors: 11,
                thirdNeighbors: 5
            }, {
                totalMrs: 100,
                firstNeighbors: 26,
                secondNeighbors: 12,
                thirdNeighbors: 7
            }, {
                totalMrs: 100,
                firstNeighbors: 31,
                secondNeighbors: 15,
                thirdNeighbors: 8
            }
        ];

        var stat = appKpiService.getCityStat(districtStats, 'Foshan');

        expect(stat.city).toEqual('Foshan');
        expect(stat.firstRate).toBeCloseTo(73.33, 2);
        expect(stat.preciseRate).toBeCloseTo(87.33, 2);
        expect(stat.totalMrs).toBe(300);
    });

    it('should be able to get MR pie options', function() {
        var districtStats = [
            {
                district: 'district1',
                totalMrs: 100
            }, {
                district: 'district2',
                totalMrs: 101
            }, {
                district: 'district3',
                totalMrs: 102
            }
        ];
        var townStats = [
            {
                district: 'district1',
                town: 'town1',
                totalMrs: 50
            }, {
                district: 'district1',
                town: 'town2',
                totalMrs: 51
            }, {
                district: 'district2',
                town: 'town3',
                totalMrs: 52
            }, {
                district: 'district3',
                town: 'town4',
                totalMrs: 54
            }
        ];

        var options = appKpiService.getMrPieOptions(districtStats, townStats);

        expect(options.title.text).toEqual("分镇区测量报告数分布图");
        var series = options.series[0];
        expect(series.name).toEqual("区域");
        expect(series.data.length).toEqual(3);
        expect(series.data[0].name).toBe('district1');
        expect(series.data[0].drilldown).toBe('district1');
        expect(series.data[1].name).toBe('district2');
    });

    it('Should be able to get down-switch rate', function() {
        var stats = [
            {
                downSwitchFlow3G: 20,
                flow4G: 100
            }, {
                downSwitchFlow3G: 30,
                flow4G: 200
            }, {
                downSwitchFlow3G: 20,
                flow4G: 200
            }
        ];
        var result = appKpiService.getDownSwitchRate(stats);
        expect(result).toBe(14);
    });
});

describe('chartCalculateService test', function() {
    var chartCalculateService;
    beforeEach(module('myApp.region'));
    beforeEach(module('myApp.kpi'));

    beforeEach(inject(function(_chartCalculateService_) {
        chartCalculateService = _chartCalculateService_;
    }));

    it('should generateDrillDownData', function() {
        var districtStats = [
            {
                district: 'district1',
                value: 12
            }, {
                district: 'district2',
                value: 13
            }, {
                district: 'district3',
                value: 14
            }
        ];
        var townStats = [
            {
                district: 'district1',
                town: 'town11',
                value: 4
            }, {
                district: 'district1',
                town: 'town12',
                value: 5
            }, {
                district: 'district2',
                town: 'town21',
                value: 6
            }, {
                district: 'district3',
                town: 'town31',
                value: 7
            }, {
                district: 'district3',
                town: 'town32',
                value: 8
            }, {
                district: 'district3',
                town: 'town33',
                value: 9
            }
        ];

        var results = chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
            return stat.value;
        });

        expect(results).not.toBeNull();
        expect(results.length).toBe(3);
        expect(results).toContain({
            district: 'district1',
            districtData: 12,
            subData: [['town11', 4], ['town12', 5]]
        });
        expect(results).toContain({
            district: 'district2',
            districtData: 13,
            subData: [['town21', 6]]
        });
        expect(results).toContain({
            district: 'district3',
            districtData: 14,
            subData: [['town31', 7], ['town32', 8], ['town33', 9]]
        });
    });

    it('should generateDateDistrictStats', function() {
        var stats = [
            {
                statDate: "20160101",
                values: [{ value: 1 }, { value: 2 }, { value: 3 }]
            }, {
                statDate: "20160102",
                values: [{ value: 4 }, { value: 5 }]
            }, {
                statDate: "20160103",
                values: [{ value: 7 }, { value: 8 }, { value: 9 }]
            }
        ];
        var results = chartCalculateService.generateDateDistrictStats(stats, 3, function(stat) {
            return stat.value;
        });
        expect(results).not.toBeNull();
        expect(results.statDates.length).toBe(3);
        expect(results.statDates).toContain("20160102");
        expect(results.districtStats.length).toBe(3);
        expect(results.districtStats).toContain([1, 4, 7]);
        expect(results.districtStats).toContain([2, 5, 8]);
        expect(results.districtStats).toContain([3, 0, 9]);
    });
});