/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>
/// <reference path="../mock/highcharts.mock.js"/>
/// <reference path="../../mycharts/comboChart.js"/>
/// <reference path="../../service/app.url.service.js"/>

describe('app.url service tests', function() {
    describe('test url generator', function() {
        var appUrlService;
        beforeEach(module('myApp.url'));

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
            it('can generate mrs rsrp stats with empty set', function() {
                var result = chartCalculateService.generateMrsRsrpStats({});
                expect(result.categories.length).toBe(97);
                expect(result.categories[0]).toBe(-140);
                expect(result.categories[96]).toBe(-44);
                expect(result.values.length).toBe(97);
            });
            it('can calculate the real case', function() {
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
                var result = chartCalculateService.generateMrsRsrpStats(stats);
                expect(result.categories.length).toBe(97);
                expect(result.categories[0]).toBe(-140);
                expect(result.categories[96]).toBe(-44);
                expect(result.values.length).toBe(97);
                expect(result.values[26]).toBe(38);
                expect(result.values[57]).toBe(36);
                expect(result.values[62]).toBe(13);
            });
        });

    });
});
