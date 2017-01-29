/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>
/// <reference path="../mock/highcharts.mock.js"/>
/// <reference path="../../mycharts/comboChart.js"/>
/// <reference path="../../ui-grid.js"/>
/// <reference path="../../service/app.url.service.js"/>

describe('app.url service tests', function () {
    beforeEach(module('ui.grid'));
    beforeEach(module('myApp.url'));

    describe('test url generator', function() {
        var appUrlService;

        beforeEach(inject(function(_appUrlService_) {
            appUrlService = _appUrlService_;
        }));

        it('should be able to get the correct api route', function() {
            expect(appUrlService.getApiUrl('Test')).toEqual('/api/Test');
        });
    });

    describe('test general chart service', function() {
        var generalChartService;
        beforeEach(module('myApp.url'));

        beforeEach(inject(function(_generalChartService_) {
            generalChartService = _generalChartService_;
        }));

        it('test get pie options', function() {
            var data = [
                {
                    name: 'a',
                    value: 1
                }, {
                    name: 'b',
                    value: 2
                }
            ];
            var setting = {
                title: 'the title',
                seriesTitle: 'the series title'
            };
            var options = generalChartService.getPieOptions(data, setting, function(item) {
                return item.name;
            }, function(item) {
                return item.name;
            });
            expect(options.plotOptions).toEqual({
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            });
        });

        it('should be able to generateColumnData', function () {
            var categoriesFunc = function (stat) {
                return stat.key;
            };
            var dataFuncs = [
                function (stat) {
                    return stat.value1;
                }, function (stat) {
                    return stat.value2;
                }, function (stat) {
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

    describe('test calculate chart service test', function() {
        var chartCalculateService;
        var appFormatService;
        beforeEach(module('myApp.url'));

        beforeEach(inject(function(_chartCalculateService_, _appFormatService_) {
            chartCalculateService = _chartCalculateService_;
            appFormatService = _appFormatService_;
        }));

        describe('generateMrsRsrpStats', function() {
            var stats = {
                "id": "581ac18fd03b4f503655edf7",
                "cellId": "502970-2",
                "statDate": "2016-11-02T00:00:00.195Z",
                "rsrP_00": 73,
                "rsrP_01": 148,
                "rsrP_02": 38,
                "rsrP_03": 141,
                "rsrP_04": 104,
                "rsrP_05": 86,
                "rsrP_06": 156,
                "rsrP_07": 161,
                "rsrP_08": 151,
                "rsrP_09": 118,
                "rsrP_10": 194,
                "rsrP_11": 122,
                "rsrP_12": 530,
                "rsrP_13": 157,
                "rsrP_14": 176,
                "rsrP_15": 371,
                "rsrP_16": 161,
                "rsrP_17": 152,
                "rsrP_18": 160,
                "rsrP_19": 145,
                "rsrP_20": 153,
                "rsrP_21": 119,
                "rsrP_22": 126,
                "rsrP_23": 118,
                "rsrP_24": 169,
                "rsrP_25": 196,
                "rsrP_26": 153,
                "rsrP_27": 148,
                "rsrP_28": 138,
                "rsrP_29": 103,
                "rsrP_30": 75,
                "rsrP_31": 57,
                "rsrP_32": 52,
                "rsrP_33": 36,
                "rsrP_34": 39,
                "rsrP_35": 31,
                "rsrP_36": 25,
                "rsrP_37": 26,
                "rsrP_38": 10,
                "rsrP_39": 3,
                "rsrP_40": 1,
                "rsrP_41": 1,
                "rsrP_42": 0,
                "rsrP_43": 0,
                "rsrP_44": 1,
                "rsrP_45": 0,
                "rsrP_46": 0,
                "rsrP_47": 0
            };
            it('can generate mrs rsrp stats with empty set', function() {
                var result = chartCalculateService.generateMrsRsrpStats({});
                expect(result.categories.length).toBe(97);
                expect(result.categories[0]).toBe(-140);
                expect(result.categories[96]).toBe(-44);
                expect(result.values.length).toBe(97);
            });
            it('can calculate the real case', function() {
                var result = chartCalculateService.generateMrsRsrpStats(stats);
                expect(result.categories.length).toBe(97);
                expect(result.categories[0]).toBe(-140);
                expect(result.categories[96]).toBe(-44);
                expect(result.values.length).toBe(97);
                expect(result.values[26]).toBe(38);
                expect(result.values[57]).toBe(36);
                expect(result.values[62]).toBe(13);
            });
            it('can calculate the coverage stats', function() {
                var result = chartCalculateService.generateCoverageStats(stats);
                expect(result).toEqual({
                    total: 5124,
                    sumBelow115: 221,
                    sumBetween115And110: 525,
                    sumBetween110And105: 746
                });
            });
        });

        describe('calculate member sum', function () {
            var array = [
                {
                    statTime: '2016-11-22',
                    pdcpDownlinkFlow: 1.2,
                    pdcpUplinkFlow: 0.3,
                    maxUsers: 11
                },
                {
                    statTime: '2016-11-22',
                    pdcpDownlinkFlow: 2.7,
                    pdcpUplinkFlow: 1.3,
                    maxUsers: 51
                },
                {
                    statTime: '2016-11-22',
                    pdcpDownlinkFlow: 10.2,
                    pdcpUplinkFlow: 3.3,
                    maxUsers: 110
                }
            ];
            it('can calculate with all members', function() {
                var sum = chartCalculateService.calculateMemberSum(array, ['pdcpDownlinkFlow', 'pdcpUplinkFlow', 'maxUsers'], function(stat) {
                    stat.cellName = 'new cell';
                });
                expect(sum).toEqual({
                    cellName: 'new cell',
                    pdcpDownlinkFlow: 14.1,
                    pdcpUplinkFlow: 4.9,
                    maxUsers: 172
                });
            });

        });

        describe('generate series info', function() {
            var categoryKey = 'dateString';
            var dataKeys = [
                'mrStats',
                'firstNeighbors'
            ];
            var seriesInfo = {
                mrStats: {
                    type: 'column',
                    name: "MR总数"
                },
                firstNeighbors: {
                    type: "spline",
                    name: "第一邻区MR数"
                }
            };
            var stats = [
                {
                    dateString: '20161111',
                    mrStats: 1111,
                    firstNeighbors: 222
                },
                {
                    dateString: '20161112',
                    mrStats: 1112,
                    firstNeighbors: 223
                },
                {
                    dateString: '20161113',
                    mrStats: 1113,
                    firstNeighbors: 224
                }
            ];
            it('should be able to generate the correct seriesData', function() {
                var seriesData = chartCalculateService.generateSeriesInfo(seriesInfo, stats, categoryKey, dataKeys);
                expect(seriesData).toEqual({
                    categories: ['20161111', '20161112', '20161113'],
                    info: {
                        mrStats: {
                            type: 'column',
                            name: "MR总数",
                            data: [1111, 1112, 1113]
                        },
                        firstNeighbors: {
                            type: "spline",
                            name: "第一邻区MR数",
                            data: [222, 223, 224]
                        }
                    }
                });
            });
            it('should be able to write series data', function() {
                var series = [];
                chartCalculateService.writeSeriesData(series,
                    chartCalculateService.generateSeriesInfo(seriesInfo, stats, categoryKey, dataKeys).info, dataKeys);
                expect(series).toEqual([
                    {
                        type: 'column',
                        name: "MR总数",
                        data: [1111, 1112, 1113]
                    },
                    {
                        type: "spline",
                        name: "第一邻区MR数",
                        data: [222, 223, 224]
                    }
                ]);
            });
        });

        describe('generateRsrpTaStats', function () {
            it('can generate rsrp ta stats with empty set', function () {
                var result = chartCalculateService.generateRsrpTaStats({}, 0);
                expect(result.categories.length).toBe(25);
                expect(result.categories[0]).toBe(100);
                expect(result.categories[24]).toBe(15000);
                expect(result.values.length).toBe(25);
            });
            it('can calculate the real case', function () {
                var stats = {
                    "id": "581ac18fd03b4f503655edf7",
                    "cellId": "502970-2",
                    "statDate": "2016-11-02T00:00:00.195Z",

                    tadv00Rsrp00: 26,
                    tadv00Rsrp01: 38,
                    tadv00Rsrp02: 35,
                    tadv00Rsrp03: 39,
                    tadv00Rsrp04: 115,
                    tadv00Rsrp05: 29,
                    tadv00Rsrp06: 41,
                    tadv00Rsrp07: 53,
                    tadv00Rsrp08: 99,
                    tadv00Rsrp09: 12,
                    tadv00Rsrp10: 2,
                    tadv00Rsrp11: 1,
                    tadv01Rsrp00: 17,
                    tadv01Rsrp01: 44,
                    tadv01Rsrp02: 45,
                    tadv01Rsrp03: 27,
                    tadv01Rsrp04: 87,
                    tadv01Rsrp05: 24,
                    tadv01Rsrp06: 4,
                    tadv01Rsrp07: 0,
                    tadv01Rsrp08: 0,
                    tadv01Rsrp09: 0,
                    tadv01Rsrp10: 0,
                    tadv01Rsrp11: 0,
                    tadv02Rsrp00: 0,
                    tadv02Rsrp01: 1,
                    tadv02Rsrp02: 0,
                    tadv02Rsrp03: 0,
                    tadv02Rsrp04: 0,
                    tadv02Rsrp05: 0,
                    tadv02Rsrp06: 0,
                    tadv02Rsrp07: 0,
                    tadv02Rsrp08: 0,
                    tadv02Rsrp09: 0,
                    tadv02Rsrp10: 0,
                    tadv02Rsrp11: 0,
                    tadv03Rsrp00: 0,
                    tadv03Rsrp01: 0,
                    tadv03Rsrp02: 0,
                    tadv03Rsrp03: 0,
                    tadv03Rsrp04: 0,
                    tadv03Rsrp05: 0,
                    tadv03Rsrp06: 0,
                    tadv03Rsrp07: 0,
                    tadv03Rsrp08: 0,
                    tadv03Rsrp09: 0,
                    tadv03Rsrp10: 0,
                    tadv03Rsrp11: 0,
                    tadv04Rsrp00: 0,
                    tadv04Rsrp01: 0,
                    tadv04Rsrp02: 0,
                    tadv04Rsrp03: 0,
                    tadv04Rsrp04: 0,
                    tadv04Rsrp05: 0,
                    tadv04Rsrp06: 0,
                    tadv04Rsrp07: 0,
                    tadv04Rsrp08: 0,
                    tadv04Rsrp09: 0,
                    tadv04Rsrp10: 0,
                    tadv04Rsrp11: 0,
                    tadv05Rsrp00: 0,
                    tadv05Rsrp01: 0,
                    tadv05Rsrp02: 0,
                    tadv05Rsrp03: 0,
                    tadv05Rsrp04: 0,
                    tadv05Rsrp05: 0,
                    tadv05Rsrp06: 0,
                    tadv05Rsrp07: 0,
                    tadv05Rsrp08: 0,
                    tadv05Rsrp09: 0,
                    tadv05Rsrp10: 0,
                    tadv05Rsrp11: 0,
                    tadv06Rsrp00: 0,
                    tadv06Rsrp01: 0,
                    tadv06Rsrp02: 0,
                    tadv06Rsrp03: 0,
                    tadv06Rsrp04: 0,
                    tadv06Rsrp05: 0,
                    tadv06Rsrp06: 0,
                    tadv06Rsrp07: 0,
                    tadv06Rsrp08: 0,
                    tadv06Rsrp09: 0,
                    tadv06Rsrp10: 0,
                    tadv06Rsrp11: 0,
                    tadv07Rsrp00: 0,
                    tadv07Rsrp01: 0,
                    tadv07Rsrp02: 0,
                    tadv07Rsrp03: 0,
                    tadv07Rsrp04: 0,
                    tadv07Rsrp05: 0,
                    tadv07Rsrp06: 0,
                    tadv07Rsrp07: 0,
                    tadv07Rsrp08: 0,
                    tadv07Rsrp09: 0,
                    tadv07Rsrp10: 0,
                    tadv07Rsrp11: 0,
                    tadv08Rsrp00: 0,
                    tadv08Rsrp01: 0,
                    tadv08Rsrp02: 0,
                    tadv08Rsrp03: 0,
                    tadv08Rsrp04: 0,
                    tadv08Rsrp05: 0,
                    tadv08Rsrp06: 0,
                    tadv08Rsrp07: 0,
                    tadv08Rsrp08: 0,
                    tadv08Rsrp09: 0,
                    tadv08Rsrp10: 0,
                    tadv08Rsrp11: 0,
                    tadv09Rsrp00: 0,
                    tadv09Rsrp01: 0,
                    tadv09Rsrp02: 0,
                    tadv09Rsrp03: 0,
                    tadv09Rsrp04: 0,
                    tadv09Rsrp05: 0,
                    tadv09Rsrp06: 0,
                    tadv09Rsrp07: 0,
                    tadv09Rsrp08: 0,
                    tadv09Rsrp09: 0,
                    tadv09Rsrp10: 0,
                    tadv09Rsrp11: 0,
                    tadv10Rsrp00: 0,
                    tadv10Rsrp01: 0,
                    tadv10Rsrp02: 0,
                    tadv10Rsrp03: 0,
                    tadv10Rsrp04: 0,
                    tadv10Rsrp05: 0,
                    tadv10Rsrp06: 0,
                    tadv10Rsrp07: 0,
                    tadv10Rsrp08: 0,
                    tadv10Rsrp09: 0,
                    tadv10Rsrp10: 0,
                    tadv10Rsrp11: 0
                };
                var result = chartCalculateService.generateRsrpTaStats(stats, 0);
                expect(result.categories.length).toBe(25);
                expect(result.categories[0]).toBe(100);
                expect(result.categories[24]).toBe(15000);
                expect(result.values.length).toBe(25);
                expect(result.values[0]).toBe(11.09404335);
                expect(result.values[2]).toBe(8.573306025);
                expect(result.values[11]).toBe(0);
            });
        });

    });

    describe('MR tests using underscroe', function () {
        var appFormatService;

        beforeEach(inject(function (_appFormatService_) {
            appFormatService = _appFormatService_;
        }));

        describe('preparing tests', function () {
            it('calculate the rsrp from indices', function () {
                var indices = _.range(11);
                var source = {
                    rsrp_00: 2,
                    rsrp_01: 4,
                    rsrp_02: 6,
                    rsrp_03: 8,
                    rsrp_04: 10,
                    rsrp_05: 12,
                    rsrp_06: 14,
                    rsrp_07: 16,
                    rsrp_08: 18,
                    rsrp_09: 20,
                    rsrp_10: 22
                };
                var results = _.map(indices, function (index) {
                    return source['rsrp_' + appFormatService.prefixInteger(index, 2)];
                });
                expect(results).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
            });

            it('calculate the sum of rsrp arrays', function () {
                var indices = _.range(11);
                var source = [
                    {
                        rsrp_00: 2,
                        rsrp_01: 4,
                        rsrp_02: 6,
                        rsrp_03: 8,
                        rsrp_04: 10,
                        rsrp_05: 12,
                        rsrp_06: 14,
                        rsrp_07: 16,
                        rsrp_08: 18,
                        rsrp_09: 20,
                        rsrp_10: 22
                    }, {
                        rsrp_00: 1,
                        rsrp_01: 2,
                        rsrp_02: 3,
                        rsrp_03: 4,
                        rsrp_04: 5,
                        rsrp_05: 6,
                        rsrp_06: 7,
                        rsrp_07: 8,
                        rsrp_08: 9,
                        rsrp_09: 10,
                        rsrp_10: 11
                    }, {
                        rsrp_00: 2,
                        rsrp_01: 4,
                        rsrp_02: 6,
                        rsrp_03: 8,
                        rsrp_04: 10,
                        rsrp_05: 12,
                        rsrp_06: 14,
                        rsrp_07: 16,
                        rsrp_08: 18,
                        rsrp_09: 20,
                        rsrp_10: 22
                    }
                ];
                expect(_.map(source, function (item) {
                    return item['rsrp_00'];
                })).toEqual([2, 1, 2]);
                expect(_.reduce(_.map(source, function (item) {
                    return item['rsrp_00'];
                }), function (a, b) {
                    return a + b;
                }, 0)).toBe(5);

                var results = _.map(indices, function (index) {
                    var rsrpIndex = 'rsrp_' + appFormatService.prefixInteger(index, 2);
                    return _.reduce(_.map(source, function (item) {
                        return item[rsrpIndex];
                    }), function (a, b) {
                        return a + b;
                    }, 0);
                });

                expect(results).toEqual([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
            });

        });
    })
});
