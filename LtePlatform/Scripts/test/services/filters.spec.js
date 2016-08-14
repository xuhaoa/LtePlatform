/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../service/filters/basic.js"/>

describe('percentage filter', function() {
    var percentageFilter;
    beforeEach(module('basic.filters'));
    beforeEach(inject(function(_percentageFilter_) {
        percentageFilter = _percentageFilter_;
    }));

    it('should return a correct number to become 100 times larger', function() {
        expect(percentageFilter(0.21)).toBe(21);
        expect(percentageFilter(-0.89)).toBe(-89);
    });

    it('should return the same number when greater than 1 or smaller than -1', function() {
        expect(percentageFilter(17)).toBe(17);
        expect(percentageFilter(-33.5)).toBe(-33.5);
    });

    it('should parse the string to number', function() {
        expect(percentageFilter('0.345')).toEqual(34.5);
    });
});

describe('formError filter', function() {
    var formErrorFilter;
    beforeEach(module('basic.filters'));
    beforeEach(inject(function(_formErrorFilter_) {
        formErrorFilter = _formErrorFilter_;
    }));

    it('should return the original dictionary index', function() {
        expect(formErrorFilter('email')).toBe('不是有效的邮件地址');
        expect(formErrorFilter('same')).toBe('此项必须与上一项相同');
    });

    it('should be able to return the undefined option', function() {
        expect(formErrorFilter('undefined')).toBe('undefined');
    });

    it('should be able to return the customized option', function() {
        expect(formErrorFilter('customized', { customized: 'Customized option' })).toBe('Customized option');
    });
});