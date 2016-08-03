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
});