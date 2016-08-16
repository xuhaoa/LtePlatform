/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>

describe('Array Tests', function() {
    it('should test the push.apply', function() {
        var source = [];
        source.push(1);
        expect(source).toContain(1);
        var array1 = [2, 3, 4];
        source.push.apply(source, array1);
        expect(source.length).toBe(4);
        expect(source).toContain(3);
    });
});