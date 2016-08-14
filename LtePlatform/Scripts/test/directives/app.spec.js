/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../../directives/app/app.module.js"/>

describe('glyphicon-enhance directive', function () {
    var $compile, $rootScope;
    beforeEach(module('app.directives.glyphicon'));
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('The glyphicon-enhance directive has glyphicon and glyphicon-l classes', function() {
        var element = $compile('<em glyphicon-enhance></em>')($rootScope);
        expect(element.hasClass('glyphicon')).toBe(true);
        expect(element.hasClass('glyphicon-l')).toBe(true);
    });

    it('The glyphicon-enhance directive can add shopping-cart class', function() {
        var element = $compile('<em glyphicon-enhance type="shopping-cart"></em>')($rootScope);
        expect(element.hasClass('glyphicon')).toBe(true);
        expect(element.hasClass('glyphicon-l')).toBe(true);
        expect(element.hasClass('glyphicon-shopping-cart'));
    });

    it('The glyphicon-inline directive', function () {
        var scope = $rootScope.$new(true);
        scope.type = "stats";
        var element = $compile('<div glyphicon-inline type="type"></div>')(scope);
        scope.$digest();
        expect(element.hasClass('glyphicon')).toBe(false);
    });
});