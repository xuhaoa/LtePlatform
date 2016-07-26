describe('glyphicon-enhance directive', function() {
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
});