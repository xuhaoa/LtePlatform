/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../service/app.url.service.js"/>
/// <reference path="../../service/app.region.service.js"/>
/// <reference path="../../service/parameters/service.js"/>
/// <reference path="../../service/kpi/display.js"/>

describe('kpi display service test', function() {
    var kpiDisplayService;
    var coverageService;
    var generalChartService;
    beforeEach(module('myApp.region'));
    beforeEach(module('myApp.parameters'));
    beforeEach(module('kpi.display'));

    beforeEach(inject(function (_kpiDisplayService_, _coverageService_, _generalChartService_) {
        kpiDisplayService = _kpiDisplayService_;
        coverageService = _coverageService_;
        generalChartService = _generalChartService_;
    }));

    it('should initialize coverage points from defaultRsrpCriteria', function() {
        var legend = {
            sign: true,
            criteria: [
                {
                    threshold: -120,
                    color: "#ff0000"
                }, {
                    threshold: -115,
                    color: "#7f0808"
                }, {
                    threshold: -110,
                    color: "#3f0f0f"
                }, {
                    threshold: -105,
                    color: "#077f7f"
                }, {
                    threshold: -95,
                    color: "#07073f"
                }, {
                    threshold: -80,
                    color: "#073f07"
                }
            ]
        };
        var pointDef = kpiDisplayService.initializeCoveragePoints(legend);
        expect(pointDef.sign).toBeTruthy();
        var intervals = pointDef.intervals;
        expect(intervals.length).toBe(7);
        expect(intervals).toContain({
            threshold: -120,
            color: "#ff0000",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -115,
            color: "#7f0808",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -110,
            color: "#3f0f0f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -105,
            color: "#077f7f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -95,
            color: "#07073f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -80,
            color: "#073f07",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 10000,
            color: "#077f07",
            coors: []
        });
    });

    it('should initialize coverage points from defaultSinrCriteria', function () {
        var legend = {
            sign: true,
            criteria: [
                {
                    threshold: -3,
                    color: "#ff0000"
                }, {
                    threshold: 0,
                    color: "#7f0808"
                }, {
                    threshold: 3,
                    color: "#3f0f0f"
                }, {
                    threshold: 6,
                    color: "#077f7f"
                }, {
                    threshold: 9,
                    color: "#07073f"
                }, {
                    threshold: 15,
                    color: "#073f07"
                }
            ]
        };
        var pointDef = kpiDisplayService.initializeCoveragePoints(legend);
        expect(pointDef.sign).toBeTruthy();
        var intervals = pointDef.intervals;
        expect(intervals.length).toBe(7);
        expect(intervals).toContain({
            threshold: -3,
            color: "#ff0000",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 0,
            color: "#7f0808",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 3,
            color: "#3f0f0f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 6,
            color: "#077f7f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 9,
            color: "#07073f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 15,
            color: "#073f07",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 10000,
            color: "#077f07",
            coors: []
        });
    });

    it('should initialize coverage points from defaultRxCriteria', function () {
        var legend = {
            sign: true,
            criteria: [
                {
                    threshold: -110,
                    color: "#ff0000"
                }, {
                    threshold: -105,
                    color: "#7f0808"
                }, {
                    threshold: -100,
                    color: "#3f0f0f"
                }, {
                    threshold: -95,
                    color: "#077f7f"
                }, {
                    threshold: -85,
                    color: "#07073f"
                }, {
                    threshold: -70,
                    color: "#073f07"
                }
            ]
        };
        var pointDef = kpiDisplayService.initializeCoveragePoints(legend);
        expect(pointDef.sign).toBeTruthy();
        var intervals = pointDef.intervals;
        expect(intervals.length).toBe(7);
        expect(intervals).toContain({
            threshold: -110,
            color: "#ff0000",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -105,
            color: "#7f0808",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -100,
            color: "#3f0f0f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -95,
            color: "#077f7f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -85,
            color: "#07073f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -70,
            color: "#073f07",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 10000,
            color: "#077f07",
            coors: []
        });
    });

    it('should initialize coverage points from defaultRsrpCriteria from coverage service', function () {
        var legend = kpiDisplayService.queryCoverageLegend('RSRP');
        var pointDef = kpiDisplayService.initializeCoveragePoints(legend);
        expect(pointDef.sign).toBeTruthy();
        var intervals = pointDef.intervals;
        expect(intervals.length).toBe(7);
        expect(intervals).toContain({
            threshold: -120,
            color: "#ff0000",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -115,
            color: "#7f0808",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -110,
            color: "#3f0f0f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -105,
            color: "#077f7f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -95,
            color: "#07073f",
            coors: []
        });
        expect(intervals).toContain({
            threshold: -80,
            color: "#073f07",
            coors: []
        });
        expect(intervals).toContain({
            threshold: 10000,
            color: "#077f07",
            coors: []
        });
    });

    it('should initialize and update one point for the Ec/Io kpi valued -18dB', function() {
        var legend = kpiDisplayService.queryCoverageLegend('Ec/Io');
        var pointDef = kpiDisplayService.initializeCoveragePoints(legend);
        var points = [
            {
                ecio: -18,
                longtitute: 112.123,
                lattitute: 23.123
            }
        ];
        kpiDisplayService.generateCoveragePoints(pointDef, points, 'Ec/Io');
        var intervals = pointDef.intervals;
        expect(intervals).toContain({
            threshold: -15,
            color: "#ff0000",
            coors: [
                {
                    longtitute: 112.123,
                    lattitute: 23.123
                }
            ]
        });
    });

    it('should initialize and update one point for the Ec/Io kpi valued -14dB', function () {
        var legend = kpiDisplayService.queryCoverageLegend('Ec/Io');
        var pointDef = kpiDisplayService.initializeCoveragePoints(legend);
        var points = [
            {
                ecio: -14,
                longtitute: 112.123,
                lattitute: 23.123
            }
        ];
        kpiDisplayService.generateCoveragePoints(pointDef, points, 'Ec/Io');
        var intervals = pointDef.intervals;
        expect(intervals).toContain({
            threshold: -12,
            color: "#7f0808",
            coors: [
                {
                    longtitute: 112.123,
                    lattitute: 23.123
                }
            ]
        });
    });

    it('should be able to generate compound stats', function() {
        var views = [
            {
                city: "佛山",
                district: "顺德",
                pdcpDownlinkFlow: 12,
                pdcpUplinkFlow: 13,
                statTime: "2016-10-11T00:00:00",
                town: "容桂"
            }, {
                city: "佛山",
                district: "顺德",
                pdcpDownlinkFlow: 12,
                pdcpUplinkFlow: 13,
                statTime: "2016-10-11T00:00:00",
                town: "大良"
            }, {
                city: "佛山",
                district: "顺德",
                pdcpDownlinkFlow: 12,
                pdcpUplinkFlow: 13,
                statTime: "2016-10-11T00:00:00",
                town: "乐从"
            }, {
                city: "佛山",
                district: "南海",
                pdcpDownlinkFlow: 12,
                pdcpUplinkFlow: 13,
                statTime: "2016-10-11T00:00:00",
                town: "桂城"
            }, {
                city: "佛山",
                district: "南海",
                pdcpDownlinkFlow: 12,
                pdcpUplinkFlow: 13,
                statTime: "2016-10-11T00:00:00",
                town: "大沥"
            }, {
                city: "佛山",
                district: "南海",
                pdcpDownlinkFlow: 12,
                pdcpUplinkFlow: 13,
                statTime: "2016-10-11T00:00:00",
                town: "九江"
            }
        ];
        var stats = generalChartService.generateCompoundStats(views, function(view) {
            return view.district;
        }, function(view) {
            return view.town;
        }, function(view) {
            return view.pdcpDownlinkFlow + view.pdcpUplinkFlow;
        });
        expect(stats.length).toBe(2);
    });
});