/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../mock/highcharts.mock.js"/>
/// <reference path="../../mycharts/comboChart.js"/>
/// <reference path="../../mycharts/drilldown.chart.js"/>
/// <reference path="../../ui-grid.js"/>
/// <reference path="../../service/app.url.service.js"/>
/// <reference path="../../service/app.region.service.js"/>
describe('app.region module services tests', function () {
    beforeEach(module('ui.grid'));
    beforeEach(module('myApp.url'));
    beforeEach(module('myApp.region'));

    describe('preciseChartService test', function() {
        var preciseChartService;
        beforeEach(inject(function(_preciseChartService_) {
            preciseChartService = _preciseChartService_;
        }));

        it('getTypeOption function input one empty array and output some basic parameters', function() {
            var option = preciseChartService.getTypeOption([]);

            expect(option.title.text).toEqual("工单类型分布图");
            expect(option.series[0].data).toEqual([]);
            expect(option.drilldown.series).toEqual([]);
            expect(option.series[0].name).toEqual("工单类型");
        });
    });

    describe('cell precise service test', function() {
        var kpiDisplayService;

        beforeEach(inject(function(_kpiDisplayService_) {
            kpiDisplayService = _kpiDisplayService_;
        }));

        it('should be able to get MR options', function() {
            var stats = [
                {
                    dateString: '2016-1-1',
                    totalMrs: 1,
                    firstNeighbors: 2,
                    secondNeighbors: 3,
                    thirdNeighbors: 4
                }, {
                    dateString: '2016-1-2',
                    totalMrs: 3,
                    firstNeighbors: 2,
                    secondNeighbors: 3,
                    thirdNeighbors: 4
                }, {
                    dateString: '2016-1-3',
                    totalMrs: 5,
                    firstNeighbors: 2,
                    secondNeighbors: 3,
                    thirdNeighbors: 4
                }
            ];
            var title = 'My title';
            var options = kpiDisplayService.getMrsOptions(stats, title);

            expect(options.title.text).toEqual('My title');
            expect(options.yAxis[0].title.text).toEqual("MR数量");
            expect(options.xAxis[0].title.text).toEqual('日期');
            expect(options.xAxis[0].categories).toContain('2016-1-2');
            expect(options.series[0].name).toEqual("MR总数");
            expect(options.series[0].data.length).toEqual(3);
            expect(options.series[0].data).toContain(3);
            expect(options.series[1].name).toEqual("第一邻区MR数");
            expect(options.series[2].name).toEqual("第二邻区MR数");
            expect(options.series[3].name).toEqual("第三邻区MR数");
        });

        it('should be able to get precise rate options', function() {
            var stats = [
                {
                    dateString: '2016-1-1',
                    firstRate: 2,
                    secondRate: 3,
                    thirdRate: 4
                }, {
                    dateString: '2016-1-2',
                    firstRate: 2,
                    secondRate: 3,
                    thirdRate: 4
                }, {
                    dateString: '2016-1-3',
                    firstRate: 2,
                    secondRate: 3,
                    thirdRate: 4
                }
            ];
            var title = 'My title';
            var options = kpiDisplayService.getPreciseOptions(stats, title);

            expect(options.title.text).toEqual('My title');
            expect(options.yAxis[0].title.text).toEqual("精确覆盖率");
            expect(options.xAxis[0].title.text).toEqual('日期');
            expect(options.series[0].name).toEqual("第一邻区精确覆盖率");
            expect(options.series[0].data).toEqual([98, 98, 98]);
            expect(options.series[1].name).toEqual("第二邻区精确覆盖率");
            expect(options.series[2].name).toEqual("第三邻区精确覆盖率");
        });
    });
});