/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../mock/highcharts.mock.js"/>
/// <reference path="../../service/parameters/chart.js"/>
/// <reference path="../../mycharts/comboChart.js"/>

describe('combo chart test', function() {
    var chart = new ComboChart();

    it('should be able to construct a combo chart', function() {
        expect(chart).not.toBeNull();
    });

    it('should be able to get the title text', function() {
        expect(chart.title.text).toBe('');
    });

    it('should be able to get yAxis properties', function() {
        expect(chart.yAxis[0].labels.format).toBe('{value}');
        expect(chart.yAxis[0].labels.style.color).toBe('0');
        expect(chart.yAxis[0].title.text).toBe('YLabel');
        expect(chart.yAxis[0].title.style.color).toBe('0');
    });

    it('should be able to get xAxis properties', function() {
        expect(chart.xAxis[0].title.text).toBe('xLabel');
        expect(chart.xAxis[0].title.style.color).toBe('0');
    });
});

describe('generalChartService test', function() {
    var generalChartService;
    beforeEach(module('parameters.chart'));

    beforeEach(inject(function(_generalChartService_) {
        generalChartService = _generalChartService_;
    }));

    it('should be able to generateColumnData', function() {
        var categoriesFunc = function(stat) {
            return stat.key;
        };
        var dataFuncs = [
            function(stat) {
                return stat.value1;
            }, function(stat) {
                return stat.value2;
            }, function(stat) {
                return stat.value3;
            }
        ];
        var stats = [
            {
                key: 1,
                value1: 2,
                value2: 3,
                value3: 4
            }, {
                key: 2,
                value1: 3,
                value2: 4,
                value3: 5
            }, {
                key: 3,
                value1: 4,
                value2: 6,
                value3: 8
            }
        ];
        var result = generalChartService.generateColumnData(stats, categoriesFunc, dataFuncs);
        expect(result.categories.length).toEqual(3);
        expect(result.categories).toEqual([1, 2, 3]);
        expect(result.dataList.length).toEqual(3);
        expect(result.dataList[0]).toEqual([2, 3, 4]);
        expect(result.dataList[1]).toEqual([3, 4, 6]);
        expect(result.dataList[2]).toEqual([4, 5, 8]);
    });
});