/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.js"/>
/// <reference path="../../service/url/core.js"/>
/// <reference path="../../service/url/format.js"/>
/// <reference path="../mock/highcharts.mock.js"/>
/// <reference path="../../mycharts/comboChart.js"/>
/// <reference path="../../mycharts/drilldown.chart.js"/>
/// <reference path="../../service/url/calculation.js"/>
/// <reference path="../../service/url/chart.js"/>
/// <reference path="../../service/url/kpi.chart.js"/>

describe('app.core service tests', function () {
    beforeEach(module('app.core'));

    describe('appUrlService tests', function () {
        var appUrlService;

        beforeEach(inject(function (_appUrlService_) {
            appUrlService = _appUrlService_;
        }));
        it('should pass the foo test', function() {
            expect(1).toEqual(1);
        });
        it('test the getApiUrl', function() {
            expect(appUrlService.getApiUrl('Foo')).toEqual('/api/Foo');
        });

        it('should be able to get the correct api route', function () {
            expect(appUrlService.getApiUrl('Test')).toEqual('/api/Test');
        });

        it('test getPhpUriComponent', function() {
            expect(appUrlService.getPhpUriComponent({
                first: 1,
                second: '2'
            })).toEqual('first=1&second=2');
        });
    });

    describe('stationFactory tests',
        function() {
            var stationFactory;
            var stationFormatService;
            beforeEach(inject(function (_stationFactory_, _stationFormatService_) {
                stationFactory = _stationFactory_;
                stationFormatService = _stationFormatService_;
            }));

            it('test stationGradeOptions',
                function() {
                    expect(stationFactory.stationGradeOptions).toEqual([
                        { value: '', name: '所有级别' },
                        { value: 'A', name: '站点级别A' },
                        { value: 'B', name: '站点级别B' },
                        { value: 'C', name: '站点级别C' },
                        { value: 'D', name: '站点级别D' }
                    ]);
                });

            it('test dateSpanResolve',
                function() {
                    var funcDefs = stationFormatService.dateSpanResolve({
                            firstFunc: function() {
                                return 1;
                            },
                            secondFunc: function() {
                                return 2;
                            }
                        },
                        3,
                        4);
                    expect(funcDefs.firstFunc()).toBe(1);
                    expect(funcDefs.secondFunc()).toBe(2);
                    expect(funcDefs.begin()).toBe(3);
                    expect(funcDefs.end()).toBe(4);
                });
        });

    describe('generalHttpService tests', function() {
        var $httpBackend, $rootScope, appUrlService, generalHttpService;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_, _appUrlService_, _generalHttpService_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            appUrlService = _appUrlService_;
            generalHttpService = _generalHttpService_;
        }));

        it("should make a request to the backend", function() {
            $httpBackend.expect('GET', '/api/CurrentUser').respond(200, { name: 'aaa' });
            generalHttpService.getApiData('CurrentUser', {}).then(function(user) {
                expect(user.name).toEqual('aaa');
            });
            $httpBackend.flush();
        });

        it('test a get request with parameters to the backend', function() {
            $httpBackend.expect('GET', '/api/User?id=123').respond(200, { name: 'abc' });
            generalHttpService.getApiData('User', {id: 123}).then(function(user) {
                expect(user.name).toEqual('abc');
            });
            $httpBackend.flush(1);
        });

        it('test a get request with dynamic parameters to the backend', function () {
            angular.forEach([12, 34, 556, 7899], function(id) {
                $httpBackend.expect('GET', '/api/User?id=' + id).respond(200, { name: 'abc' + id });
                generalHttpService.getApiData('User', { id: id }).then(function(user) {
                    expect(user.name).toEqual('abc' + id);
                });
                $httpBackend.flush(1);
            });
        });

        it ('test a post request with dynamic parameters to the backend', function() {
            $httpBackend.whenPOST('/api/Phone').respond(function (method, url, data) {
                var phone = angular.fromJson(data);
                return [200, phone.number, {}];
            });
            generalHttpService.postApiData('Phone', { number: 123456 }).then(function(number) {
                expect(number).toEqual(123456);
            });
            $httpBackend.flush(1);
        });
    });
});

describe('app.format service tests', function () {
    beforeEach(module('app.format'));
    describe('App format test', function() {
        var appFormatService;

        beforeEach(inject(function(_appFormatService_) {
            appFormatService = _appFormatService_;
        }));

        describe('test searchPattern function', function() {
            it('Should be able to search one pattern in a test', function() {
                var options = ['123', '134', '135'];
                var item = appFormatService.searchPattern(options, '12345');
                expect(item).toEqual('123');
            });

            it('Should be able to return null id pattern not found', function() {
                var options = ['abcd', 'cdefg', '1234'];
                var item = appFormatService.searchPattern(options, 'acdef');
                expect(item).toBeNull();
            });

            it('Can match chinese character pattern', function() {
                var options = ['禅城', '南海', '顺德'];
                var item = appFormatService.searchPattern(options, '佛山市顺德区乐从镇');
                expect(item).toEqual('顺德');
            });
        });

        describe('date time tests',
            function() {
                it('Can get one date from the string like "2016-07-13"',
                    function() {
                        var dateString = "2016-04-12";
                        var date = appFormatService.getDate(dateString);
                        expect(date.getFullYear()).toEqual(2016);
                        expect(date.getMonth()).toEqual(3);
                        expect(date.getDate()).toEqual(12);
                    });

                it('Can get one date from the string like "2016/7/5"',
                    function() {
                        var dateString = "2016/7/5";
                        var date = appFormatService.getDate(dateString);
                        expect(date.getFullYear()).toEqual(2016);
                        expect(date.getMonth()).toEqual(7);
                        expect(date.getDate()).toEqual(5);
                    });

                it('Can get UTC time',
                    function() {
                        var dateString = "2016/7/5 15:22:18";
                        var date = appFormatService.getUTCTime(dateString);
                        expect(date).toEqual(1473088938000);
                    });

                it('Can get date string',
                    function() {
                        var date = new Date(2016, 4, 28);
                        var dateString1 = appFormatService.getDateString(date, "yyyy-MM-dd");
                        expect(dateString1).toEqual("2016-05-28");
                    });
            });

        it('should be able to calculate Averages', function() {
            var data = [
                {
                    value1: 2,
                    value2: 3
                }, {
                    value1: 0,
                    value2: 3
                }, {
                    value1: 2,
                    value2: 0
                }, {
                    value1: 4,
                    value2: 4
                }
            ];
            var averages = appFormatService.calculateAverages(data, [
                function(item) {
                    return item.value1;
                }, function(item) {
                    return item.value2;
                }
            ]);
            expect(averages.length).toEqual(2);
            expect(averages).toContain({
                sum: 8,
                count: 3
            });
            expect(averages).toContain({
                sum: 10,
                count: 3
            });
        });

        describe('prefixInteger function',
            function() {
                it('0 number',
                    function() {
                        expect(appFormatService.prefixInteger(2, 0)).toEqual('2');
                        expect(appFormatService.prefixInteger(32, 0)).toEqual('32');
                        expect(appFormatService.prefixInteger(412, 0)).toEqual('412');
                    });
                it('1 numbers',
                    function() {
                        expect(appFormatService.prefixInteger(2, 1)).toEqual('2');
                        expect(appFormatService.prefixInteger(32, 1)).toEqual('2');
                        expect(appFormatService.prefixInteger(412, 1)).toEqual('2');
                    });
                it('2 numbers',
                    function () {
                        expect(appFormatService.prefixInteger(2, 2)).toEqual('02');
                        expect(appFormatService.prefixInteger(32, 2)).toEqual('32');
                        expect(appFormatService.prefixInteger(412, 2)).toEqual('12');
                    });
                it('3 numbers',
                    function () {
                        expect(appFormatService.prefixInteger(2, 3)).toEqual('002');
                        expect(appFormatService.prefixInteger(32, 3)).toEqual('032');
                        expect(appFormatService.prefixInteger(412, 3)).toEqual('412');
                    });
            });
    });

});

describe('app.calculation service tests',
    function() {
        beforeEach(module('app.format'));
        beforeEach(module('app.calculation'));

        describe('test basicCalculationService',
            function() {
                var basicCalculationService;
                var appFormatService;

                beforeEach(inject(function(_basicCalculationService_, _appFormatService_) {
                    basicCalculationService = _basicCalculationService_;
                    appFormatService = _appFormatService_;
                }));

                describe('test calculateArraySum',
                    function() {
                        it('array with single element',
                            function() {
                                var result = basicCalculationService.calculateArraySum([{ key1: 1 }], ['key1']);
                                expect(result).toEqual({ key1: 1 });
                            });
                        it('array with two elements with only one valid key',
                            function() {
                                var result = basicCalculationService.calculateArraySum([
                                        { key1: 1 }, { key2: 2 }
                                    ],
                                    ['key1']);
                                expect(result).toEqual({ key1: 1 });
                            });
                        it('array with two elements with same valid key',
                            function () {
                                var result = basicCalculationService.calculateArraySum([
                                    { key1: 1 }, { key1: 2 }
                                ],
                                    ['key1']);
                                expect(result).toEqual({ key1: 3 });
                            });
                    }
                );

                describe('test generateDateSpanService function',
                    function() {
                        it('test the normal case',
                            function() {
                                var result = basicCalculationService.generateDateSpanSeries(new Date(2017,1,1), new Date(2017,1,8));
                                expect(result.length).toBe(7);
                                expect(result[0].date).toEqual(new Date(2017,1,1));
                                expect(result[6].date).toEqual(new Date(2017,1,7));
                            });
                    });
            });

        describe('test neGeometryService',
            function () {
                var basicCalculationService;
                var neGeometryService;

                beforeEach(inject(function(_basicCalculationService_, _neGeometryService_) {
                    basicCalculationService = _basicCalculationService_;
                    neGeometryService = _neGeometryService_;
                }));

                describe('test queryENodebLonLatEdits function',
                    function() {
                        it('test the empty set',
                            function() {
                                var result = neGeometryService.queryENodebLonLatEdits([]);
                                expect(result).toEqual([]);
                            });
                        it('test a single-element set with townName definition',
                            function () {
                                var result = neGeometryService.queryENodebLonLatEdits([
                                    {
                                        townName: 'abc'
                                    }
                                ]);
                                expect(result).toEqual([{
                                    index: 0,
                                    townName: 'abc',
                                    town: 'abc'
                                }]);
                            });
                    });
            });

        describe('test general chart service',
            function() {
                var generalChartService;

                beforeEach(inject(function(_generalChartService_) {
                    generalChartService = _generalChartService_;
                }));

                it('GradientPie is defined',
                    function() {
                        var chart = new GeneralChart();
                        chart = new ComboChart();
                        chart = new GradientPie();
                    });

                it('test get pie options',
                    function() {
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
                        var options = generalChartService.getPieOptions(data,
                            setting,
                            function(item) {
                                return item.name;
                            },
                            function(item) {
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

                it('should be able to generateColumnData',
                    function() {
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

        describe('MR tests using underscroe',
            function() {
                var appFormatService;

                beforeEach(inject(function(_appFormatService_) {
                    appFormatService = _appFormatService_;
                }));

                describe('preparing tests',
                    function() {
                        it('calculate the rsrp from indices',
                            function() {
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
                                var results = _.map(indices,
                                    function(index) {
                                        return source['rsrp_' + appFormatService.prefixInteger(index, 2)];
                                    });
                                expect(results).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
                            });

                        it('calculate the sum of rsrp arrays',
                            function() {
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
                                expect(_.map(source,
                                    function(item) {
                                        return item['rsrp_00'];
                                    })).toEqual([2, 1, 2]);
                                expect(_.reduce(_.map(source,
                                        function(item) {
                                            return item['rsrp_00'];
                                        }),
                                    function(a, b) {
                                        return a + b;
                                    },
                                    0)).toBe(5);

                                var results = _.map(indices,
                                    function(index) {
                                        var rsrpIndex = 'rsrp_' + appFormatService.prefixInteger(index, 2);
                                        return _.reduce(_.map(source,
                                                function(item) {
                                                    return item[rsrpIndex];
                                                }),
                                            function(a, b) {
                                                return a + b;
                                            },
                                            0);
                                    });

                                expect(results).toEqual([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
                            });

                    });
            });

    });

describe('app.chart service tests',
    function() {
        beforeEach(module('app.format'));
        beforeEach(module('app.calculation'));
        beforeEach(module('app.chart'));

        describe('test chartCalculateService',
            function() {
                var chartCalculateService;
                var basicCalculationService;
                var appFormatService;

                beforeEach(inject(function(_chartCalculateService_, _appFormatService_, _basicCalculationService_) {
                    chartCalculateService = _chartCalculateService_;
                    appFormatService = _appFormatService_;
                    basicCalculationService = _basicCalculationService_;
                }));

                describe('calculateMemberSum',
                    function() {
                        it('test the empty sets',
                            function() {
                                var sum = chartCalculateService.calculateMemberSum([],
                                    ['member1'],
                                    function(stat) { });
                                expect(sum).toBeUndefined();
                            });
                        it('test the single-member set',
                            function() {
                                var sum = chartCalculateService.calculateMemberSum([{ member1: 12 }],
                                    ['member1'],
                                    function(stat) {});
                                expect(sum).toEqual({ member1: 12 });
                            });
                        it('test the single-member set with operation',
                            function () {
                                var sum = chartCalculateService.calculateMemberSum([{ member1: 12 }],
                                    ['member1'],
                                    function(stat) {
                                        stat.member2 = 23;
                                    });
                                expect(sum).toEqual({ member1: 12, member2: 23 });
                            });
                        it('test the double-member set with operation',
                            function() {
                                var sum = chartCalculateService.calculateMemberSum([{ member1: 12 }, { member1: 21 }],
                                    ['member1'],
                                    function(stat) {
                                        stat.member2 = 23;
                                    });
                                expect(sum).toEqual({ member1: 33, member2: 23 });
                            });
                    });

                describe('generateMrsRsrpStats',
                    function() {
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
                        it('can generate mrs rsrp stats with empty set',
                            function() {
                                var result = chartCalculateService.generateMrsRsrpStats({});
                                expect(result.categories.length).toBe(97);
                                expect(result.categories[0]).toBe(-140);
                                expect(result.categories[96]).toBe(-44);
                                expect(result.values.length).toBe(97);
                            });
                        it('can calculate the real case',
                            function() {
                                var result = chartCalculateService.generateMrsRsrpStats(stats);
                                expect(result.categories.length).toBe(97);
                                expect(result.categories[0]).toBe(-140);
                                expect(result.categories[96]).toBe(-44);
                                expect(result.values.length).toBe(97);
                                expect(result.values[26]).toBe(38);
                                expect(result.values[57]).toBe(36);
                                expect(result.values[62]).toBe(13);
                            });
                        it('can calculate the coverage stats',
                            function() {
                                var result = chartCalculateService.generateCoverageStats(stats);
                                expect(result).toEqual({
                                    total: 5124,
                                    sumBelow115: 221,
                                    sumBetween115And110: 525,
                                    sumBetween110And105: 746
                                });
                            });


                    });

                describe('generateDistrictStats',
                    function () {
                        it('test empty array and default functions',
                            function() {
                                var result = chartCalculateService.generateDistrictStats(['district1,district2'], []);
                                expect(result).toEqual([]);
                            });

                        it('test single artificial value and default functions',
                            function() {
                                var result = chartCalculateService.generateDistrictStats(['district1,district2'], ['abc']);
                                expect(result).toEqual([
                                    {
                                        statDate: undefined,
                                        values: [0]
                                    }
                                ]);
                            });

                        it('test single only-statDate value and default functions',
                            function() {
                                var result = chartCalculateService.generateDistrictStats(['district1,district2'],
                                [
                                    {
                                        statDate: '2017-10-2'
                                    }
                                ]);
                                expect(result).toEqual([
                                    {
                                        statDate: '2017-10-2',
                                        values: [0]
                                    }
                                ]);
                            });

                        it('test single stat',
                            function() {
                                var districts = ['chancheng', 'nanhai'];
                                var stats = [
                                    {
                                        statDate: '2017-1-1',
                                        districtFlowViews: [
                                            {
                                                district: 'chancheng',
                                                pdcpDownlinkFlow: 11,
                                                pdcpUplinkFlow: 2
                                            }
                                        ]
                                    }
                                ];
                                var result = chartCalculateService.generateDistrictStats(districts,
                                    stats,
                                    {
                                        districtViewFunc: function(stat) {
                                            return stat.districtFlowViews;
                                        },
                                        initializeFunc: function(generalStat) {
                                            generalStat.pdcpDownlinkFlow = 0;
                                            generalStat.pdcpUplinkFlow = 0;
                                        },
                                        calculateFunc: function(view) {
                                            return {
                                                pdcpDownlinkFlow: view.pdcpDownlinkFlow,
                                                pdcpUplinkFlow: view.pdcpUplinkFlow
                                            };
                                        },
                                        accumulateFunc: function(generalStat, view) {
                                            generalStat.pdcpDownlinkFlow += view.pdcpDownlinkFlow;
                                            generalStat.pdcpUplinkFlow += view.pdcpUplinkFlow;
                                        },
                                        zeroFunc: function() {
                                            return {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: 0
                                            };
                                        },
                                        totalFunc: function(generalStat) {
                                            return {
                                                pdcpDownlinkFlow: generalStat.pdcpDownlinkFlow,
                                                pdcpUplinkFlow: generalStat.pdcpUplinkFlow
                                            }
                                        }
                                    });

                                expect(result).toEqual([
                                    {
                                        statDate: '2017-1-1',
                                        values: [
                                            {
                                                pdcpDownlinkFlow: 11,
                                                pdcpUplinkFlow: 2
                                            },
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: 0
                                            },
                                            {
                                                pdcpDownlinkFlow: 11,
                                                pdcpUplinkFlow: 2
                                            }
                                        ]
                                    }
                                ]);
                            });
                    });

                describe('calculate member sum',
                    function() {
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
                        it('can calculate with all members',
                            function() {
                                var sum = chartCalculateService.calculateMemberSum(array,
                                    ['pdcpDownlinkFlow', 'pdcpUplinkFlow', 'maxUsers'],
                                    function(stat) {
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

                describe('generate series info',
                    function() {
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
                        it('should be able to generate the correct seriesData',
                            function() {
                                var seriesData = chartCalculateService
                                    .generateSeriesInfo(seriesInfo, stats, categoryKey, dataKeys);
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
                        it('should be able to write series data',
                            function() {
                                var series = [];
                                chartCalculateService.writeSeriesData(series,
                                    chartCalculateService.generateSeriesInfo(seriesInfo, stats, categoryKey, dataKeys)
                                    .info,
                                    dataKeys);
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

                describe('generateRsrpTaStats',
                    function() {
                        it('can generate rsrp ta stats with empty set',
                            function() {
                                var result = chartCalculateService.generateRsrpTaStats({}, 0);
                                expect(result.categories.length).toBe(25);
                                expect(result.categories[0]).toBe(100);
                                expect(result.categories[24]).toBe(15000);
                                expect(result.values.length).toBe(25);
                            });
                        it('can calculate the real case',
                            function() {
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
        describe('calculate service',
            function() {
                var appFormatService;
                var chartCalculateService;
                var calculateService;

                beforeEach(inject(function(_appFormatService_, _chartCalculateService_, _calculateService_) {
                    appFormatService = _appFormatService_;
                    chartCalculateService = _chartCalculateService_;
                    calculateService = _calculateService_;
                }));
                describe('merge data by key',
                    function() {
                        var key = 'aaa';
                        var dataKeys = ['bb', 'ccc', 'dddd'];
                        it('should be able to calculate the empty list',
                            function() {
                                var list = [];
                                var data = [
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }, {
                                        aaa: 1,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }
                                ];
                                var result = calculateService.mergeDataByKey(list, data, key, dataKeys);
                                expect(result).toEqual([
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }, {
                                        aaa: 1,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }
                                ]);
                            });
                        it('should be able to calculate the empty list and sort output',
                            function() {
                                var list = [];
                                var data = [
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }, {
                                        aaa: 4,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }
                                ];
                                var result = calculateService.mergeDataByKey(list, data, key, dataKeys);
                                expect(result).toEqual([
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }, {
                                        aaa: 4,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }
                                ]);
                            });
                        it('should be able to calculate the non-empty list and sort output',
                            function() {
                                var list = [
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }
                                ];
                                var data = [
                                    {
                                        aaa: 4,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }
                                ];
                                var result = calculateService.mergeDataByKey(list, data, key, dataKeys);
                                expect(result).toEqual([
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }, {
                                        aaa: 4,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }
                                ]);
                            });
                        it('should be able to calculate the non-empty list and sum up',
                            function() {
                                var list = [
                                    {
                                        aaa: 0,
                                        bb: 1,
                                        ccc: 2,
                                        dddd: 3
                                    }
                                ];
                                var data = [
                                    {
                                        aaa: 0,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }, {
                                        aaa: 4,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }
                                ];
                                var result = calculateService.mergeDataByKey(list, data, key, dataKeys);
                                expect(result).toEqual([
                                    {
                                        aaa: 0,
                                        bb: 3,
                                        ccc: 6,
                                        dddd: 9
                                    }, {
                                        aaa: 2,
                                        bb: 2,
                                        ccc: 4,
                                        dddd: 6
                                    }, {
                                        aaa: 4,
                                        bb: 2,
                                        ccc: 3,
                                        dddd: 4
                                    }
                                ]);
                            });
                    });

                describe('calculateAverageValues',
                    function() {
                        it('test one key',
                            function() {
                                var stats = [
                                    {
                                        values: [
                                            {
                                                mr: 122
                                            }
                                        ]
                                    }
                                ];
                                var keys = ['mr'];
                                var values = calculateService.calculateAverageValues(stats, keys);
                                expect(values).toEqual([
                                    {
                                        mr: 122
                                    }
                                ]);
                            });
                        it('test two keys',
                            function() {
                                var stats = [
                                    {
                                        values: [
                                            {
                                                mr: 122,
                                                precise: 0.7
                                            }
                                        ]
                                    }
                                ];
                                var keys = ['mr', 'precise'];
                                var values = calculateService.calculateAverageValues(stats, keys);
                                expect(values).toEqual([
                                    {
                                        mr: 122,
                                        precise: 0.7
                                    }
                                ]);
                            });
                    });
            });
    });

describe('app.kpi.chart service tests',
    function() {
        beforeEach(module('app.format'));
        beforeEach(module('app.chart'));
        beforeEach(module('app.kpi.chart'));

        describe('preciseChartService',
            function() {
                beforeEach(module('app.calculation'));
                var appFormatService;
                var chartCalculateService;
                var generalChartService;
                var preciseChartService;

                beforeEach(inject(function(_appFormatService_,
                    _chartCalculateService_,
                    _generalChartService_,
                    _preciseChartService_) {
                    appFormatService = _appFormatService_;
                    chartCalculateService = _chartCalculateService_;
                    generalChartService = _generalChartService_;
                    preciseChartService = _preciseChartService_;
                }));

                describe('getTypeOption',
                    function() {
                        it('test empty array input',
                            function() {
                                var options = preciseChartService.getTypeOption([]);
                                expect(options).toEqual({
                                    chart: {
                                        type: 'pie'
                                    },
                                    title: {
                                        text: '工单类型分布图'
                                    },
                                    subtitle: {
                                        text: 'Click the slices to view versions.'
                                    },
                                    plotOptions: {
                                        series: {
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}: {point.y:.2f}'
                                            }
                                        }
                                    },
                                    tooltip: {
                                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                        pointFormat:
                                            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
                                    },
                                    series: [
                                        {
                                            name: '工单类型',
                                            colorByPoint: true,
                                            data: []
                                        }
                                    ],
                                    drilldown: {
                                        series: []
                                    },
                                    yAxis: {}
                                });
                            });
                    });
            });

        describe('kpiChartCalculateService',
            function() {
                var chartCalculateService;
                var calculateService;
                var preciseChartService;
                var appFormatService;
                var generalChartService;
                var kpiChartCalculateService;

                beforeEach(inject(function(_chartCalculateService_,
                    _calculateService_,
                    _preciseChartService_,
                    _appFormatService_,
                    _generalChartService_,
                    _kpiChartCalculateService_) {
                    chartCalculateService = _chartCalculateService_;
                    preciseChartService = _preciseChartService_;
                    appFormatService = _appFormatService_;
                    generalChartService = _generalChartService_;
                    calculateService = _calculateService_;
                    kpiChartCalculateService = _kpiChartCalculateService_;
                }));

                describe('generateFlowTrendStatsForPie',
                    function() {
                        it('test single artificial value with empty districtViews',
                            function() {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: []
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [],
                                    townStats: undefined
                                });
                            });
                        it('test single artificial value with two-district districtViews and statDate and default functions',
                            function() {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1'
                                                }, {
                                                    district: 'district2'
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [
                                        {
                                            district: 'district1'
                                        }, {
                                            district: 'district2'
                                        }
                                    ],
                                    townStats: undefined
                                });
                            });
                        it('test single artificial value with two-district districtViews with pdcpDownlinkFlow and default functions',
                            function () {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 0
                                                }, {
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 0
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [
                                        {
                                            district: 'district1',
                                            pdcpDownlinkFlow: 0
                                        }, {
                                            district: 'district2',
                                            pdcpDownlinkFlow: 0
                                        }
                                    ],
                                    townStats: undefined
                                });
                            });
                        it('test single artificial value with two-district districtViews and townViews',
                            function () {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 0
                                                }, {
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 0
                                                }
                                            ],
                                            townViews: [
                                                {
                                                    district: 'district1',
                                                    town: 'town1',
                                                    pdcpDownlinkFlow: 0
                                                }, {
                                                    district: 'district2',
                                                    town: 'town2',
                                                    pdcpDownlinkFlow: 0
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [
                                        {
                                            district: 'district1',
                                            pdcpDownlinkFlow: 0
                                        }, {
                                            district: 'district2',
                                            pdcpDownlinkFlow: 0
                                        }
                                    ],
                                    townStats: [
                                        {
                                            district: 'district1',
                                            town: 'town1',
                                            pdcpDownlinkFlow: 0
                                        },
                                        {
                                            district: 'district2',
                                            town: 'town2',
                                            pdcpDownlinkFlow: 0
                                        }
                                    ]
                                });
                            });
                        it('test single valid downlinkFlow value with two-district districtViews and townViews',
                            function () {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 1
                                                }
                                            ],
                                            townViews: [
                                                {
                                                    district: 'district1',
                                                    town: 'town1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    district: 'district2',
                                                    town: 'town2',
                                                    pdcpDownlinkFlow: 1
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [
                                        {
                                            district: 'district1',
                                            pdcpDownlinkFlow: 1
                                        }, {
                                            district: 'district2',
                                            pdcpDownlinkFlow: 1
                                        }
                                    ],
                                    townStats: [
                                        {
                                            district: 'district1',
                                            town: 'town1',
                                            pdcpDownlinkFlow: 1
                                        },
                                        {
                                            district: 'district2',
                                            town: 'town2',
                                            pdcpDownlinkFlow: 1
                                        }
                                    ]
                                });
                            });
                        it('test two-date valid downlinkFlow value with two-district districtViews and townViews',
                            function () {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 2
                                                }
                                            ],
                                            townViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    town: 'town1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    town: 'town2',
                                                    pdcpDownlinkFlow: 1
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }, {
                                            districtViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 3
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 4
                                                }
                                            ],
                                            townViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    town: 'town1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    town: 'town2',
                                                    pdcpDownlinkFlow: 1
                                                }
                                            ],
                                            statDate: '2017-1-2'
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [
                                        {
                                            city: 'foshan',
                                            district: 'district1',
                                            pdcpDownlinkFlow: 4,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        }, {
                                            city: 'foshan',
                                            district: 'district2',
                                            pdcpDownlinkFlow: 6,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        }
                                    ],
                                    townStats: [
                                        {
                                            city: 'foshan',
                                            district: 'district1',
                                            town: 'town1',
                                            pdcpDownlinkFlow: 2,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        },
                                        {
                                            city: 'foshan',
                                            district: 'district2',
                                            town: 'town2',
                                            pdcpDownlinkFlow: 2,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        }
                                    ]
                                });
                            });
                        it('test two-date valid downlinkFlow value with two-district districtViews and multiple townViews',
                            function() {
                                var trendStat = {};
                                kpiChartCalculateService
                                    .generateFlowTrendStatsForPie(trendStat,
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 2
                                                }
                                            ],
                                            townViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    town: 'town1',
                                                    pdcpDownlinkFlow: 1
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    town: 'town2',
                                                    pdcpDownlinkFlow: 2
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }, {
                                            districtViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 3
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 4
                                                }
                                            ],
                                            townViews: [
                                                {
                                                    city: 'foshan',
                                                    district: 'district1',
                                                    town: 'town1',
                                                    pdcpDownlinkFlow: 3
                                                }, {
                                                    city: 'foshan',
                                                    district: 'district2',
                                                    town: 'town3',
                                                    pdcpDownlinkFlow: 4
                                                }
                                            ],
                                            statDate: '2017-1-2'
                                        }
                                    ]);
                                expect(trendStat).toEqual({
                                    districtStats: [
                                        {
                                            city: 'foshan',
                                            district: 'district1',
                                            pdcpDownlinkFlow: 4,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        },
                                        {
                                            city: 'foshan',
                                            district: 'district2',
                                            pdcpDownlinkFlow: 6,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        }
                                    ],
                                    townStats: [
                                        {
                                            city: 'foshan',
                                            district: 'district1',
                                            town: 'town1',
                                            pdcpDownlinkFlow: 4,
                                            pdcpUplinkFlow: NaN,
                                            redirectCdma2000: NaN
                                        },
                                        {
                                            city: 'foshan',
                                            district: 'district2',
                                            town: 'town2',
                                            pdcpDownlinkFlow: 2
                                        },
                                        {
                                            city: 'foshan',
                                            district: 'district2',
                                            town: 'town3',
                                            pdcpDownlinkFlow: 4
                                        }
                                    ]
                                });
                            });
                    });

                describe('generateFlowDistrictStats',
                    function() {
                        it('test empty array',
                            function() {
                                var stats = kpiChartCalculateService
                                    .generateFlowDistrictStats(['district1', 'district2'], []);
                                expect(stats).toEqual([]);
                            });
                        it('test single artificial value with empty districtViews and default functions',
                            function() {
                                var stats = kpiChartCalculateService
                                    .generateFlowDistrictStats(['district1', 'district2'], [
                                    {
                                        districtViews: []
                                    }]);
                                expect(stats).toEqual([
                                    {
                                        statDate: undefined,
                                        values: [
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: 0
                                            },
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: 0
                                            },
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: 0
                                            }]
                                    }
                                ]);
                            });
                        it('test single artificial value with two-district districtViews and statDate and default functions',
                            function () {
                                var stats = kpiChartCalculateService
                                    .generateFlowDistrictStats(['district1', 'district2'],
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1'
                                                }, {
                                                    district: 'district2'
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(stats).toEqual([
                                    {
                                        statDate: '2017-1-1',
                                        values: [
                                            {
                                                pdcpDownlinkFlow: NaN,
                                                pdcpUplinkFlow: NaN
                                            },
                                            {
                                                pdcpDownlinkFlow: NaN,
                                                pdcpUplinkFlow: NaN
                                            },
                                            {
                                                pdcpDownlinkFlow: NaN,
                                                pdcpUplinkFlow: NaN
                                            }]
                                    }
                                ]);
                            });
                        it('test single artificial value with two-district districtViews with pdcpDownlinkFlow and default functions',
                            function () {
                                var stats = kpiChartCalculateService
                                    .generateFlowDistrictStats(['district1', 'district2'],
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 0
                                                }, {
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 0
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(stats).toEqual([
                                    {
                                        statDate: '2017-1-1',
                                        values: [
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: NaN
                                            },
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: NaN
                                            },
                                            {
                                                pdcpDownlinkFlow: 0,
                                                pdcpUplinkFlow: NaN
                                            }]
                                    }
                                ]);
                            });
                        it('test value with two-district districtViews with pdcpDownlinkFlow and default functions',
                            function () {
                                var stats = kpiChartCalculateService
                                    .generateFlowDistrictStats(['district1', 'district2'],
                                    [
                                        {
                                            districtViews: [
                                                {
                                                    district: 'district1',
                                                    pdcpDownlinkFlow: 1024 * 1024 * 8
                                                }, {
                                                    district: 'district2',
                                                    pdcpDownlinkFlow: 1024 * 1024 * 8
                                                }
                                            ],
                                            statDate: '2017-1-1'
                                        }
                                    ]);
                                expect(stats).toEqual([
                                    {
                                        statDate: '2017-1-1',
                                        values: [
                                            {
                                                pdcpDownlinkFlow: 1,
                                                pdcpUplinkFlow: NaN
                                            },
                                            {
                                                pdcpDownlinkFlow: 1,
                                                pdcpUplinkFlow: NaN
                                            },
                                            {
                                                pdcpDownlinkFlow: 2,
                                                pdcpUplinkFlow: NaN
                                            }]
                                    }
                                ]);
                            });
                    });

                describe('getDownlinkFlowDistrictOptions',
                    function() {
                        it('test empty array',
                            function() {
                                var options = kpiChartCalculateService
                                    .getDownlinkFlowDistrictOptions([], ['district1', 'district2'], 'all');
                                expect(options).toEqual({
                                    title: {
                                        text: '下行流量变化趋势图-all'
                                    },
                                    tooltip: {
                                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                        pointFormat: '<b>{point.y:.2f}</b>'
                                    },
                                    legend: {
                                        layout: 'vertical',
                                        align: 'left',
                                        x: 100,
                                        verticalAlign: 'top',
                                        y: 30,
                                        floating: true,
                                        backgroundColor: '#FFFFFF',
                                        enabled: true
                                    },
                                    series: [
                                        {
                                            type: 'spline',
                                            name: 'district1',
                                            data: undefined
                                        },
                                        {
                                            type: 'spline',
                                            name: 'district2',
                                            data: undefined
                                        },
                                        {
                                            type: 'spline',
                                            name: '全网',
                                            data: undefined
                                        }
                                    ],
                                    xAxis: [
                                        {
                                            categories: [],
                                            title: {
                                                text: '日期',
                                                style: {
                                                    color: '0'
                                                }
                                            }
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            labels: {
                                                format: '{value}',
                                                style: {
                                                    color: '0'
                                                }
                                            },
                                            title: {
                                                text: '下行流量(TB)',
                                                style: {
                                                    color: '0'
                                                }
                                            }
                                        }
                                    ],
                                    chart: {
                                        zoomType: 'xy'
                                    }
                                });
                            });
                    });

                describe('getUplinkFlowDistrictOptions',
                    function() {
                        it('test empty array',
                            function() {
                                var options = kpiChartCalculateService
                                    .getUplinkFlowDistrictOptions([], ['district1', 'district2'], 'all');
                                expect(options).toEqual({
                                    title: {
                                        text: '上行流量变化趋势图-all'
                                    },
                                    tooltip: {
                                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                        pointFormat: '<b>{point.y:.2f}</b>'
                                    },
                                    legend: {
                                        layout: 'vertical',
                                        align: 'left',
                                        x: 100,
                                        verticalAlign: 'top',
                                        y: 30,
                                        floating: true,
                                        backgroundColor: '#FFFFFF',
                                        enabled: true
                                    },
                                    series: [
                                        {
                                            type: 'spline',
                                            name: 'district1',
                                            data: undefined
                                        },
                                        {
                                            type: 'spline',
                                            name: 'district2',
                                            data: undefined
                                        },
                                        {
                                            type: 'spline',
                                            name: '全网',
                                            data: undefined
                                        }
                                    ],
                                    xAxis: [
                                        {
                                            categories: [],
                                            title: {
                                                text: '日期',
                                                style: {
                                                    color: '0'
                                                }
                                            }
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            labels: {
                                                format: '{value}',
                                                style: {
                                                    color: '0'
                                                }
                                            },
                                            title: {
                                                text: '上行流量(TB)',
                                                style: {
                                                    color: '0'
                                                }
                                            }
                                        }
                                    ],
                                    chart: {
                                        zoomType: 'xy'
                                    }
                                });
                            });
                    });
            });
    });