/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../service/app.url.service.js"/>
/// <reference path="../../service/app.region.service.js"/>
describe('App format test', function () {
    var appFormatService;
    beforeEach(module('myApp.region'));

    beforeEach(inject(function (_appFormatService_) {
        appFormatService = _appFormatService_;
    }));

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

    it('Can get one date from the string like "2016-07-13"', function() {
        var dateString = "2016-04-12";
        var date = appFormatService.getDate(dateString);
        expect(date.getFullYear()).toEqual(2016);
        expect(date.getMonth()).toEqual(3);
        expect(date.getDate()).toEqual(12);
    });

    it('Can get one date from the string like "2016/7/5"', function() {
        var dateString = "2016/7/5";
        var date = appFormatService.getDate(dateString);
        expect(date.getFullYear()).toEqual(2016);
        expect(date.getMonth()).toEqual(7);
        expect(date.getDate()).toEqual(5);
    });

    it('Can get UTC time', function() {
        var dateString = "2016/7/5 15:22:18";
        var date = appFormatService.getUTCTime(dateString);
        expect(date).toEqual(1473088938000);
    });

    it('Can get date string', function() {
        var date = new Date(2016, 4, 28);
        var dateString1 = appFormatService.getDateString(date, "yyyy-MM-dd");
        expect(dateString1).toEqual("2016-05-28");
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
});