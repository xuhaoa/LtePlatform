/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../service/app.url.service.js"/>

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
        expect(item).toEqual({});
    });
});