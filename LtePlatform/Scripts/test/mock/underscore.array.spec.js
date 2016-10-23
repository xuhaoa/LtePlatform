/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.js"/>

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

describe('underscore array tests', function() {
    it('can pull out the first element of an array', function() {
        expect(_.first([1, 2, 3])).toBe(1);
    });
    it('can perform OO-style "first()"', function() {
        expect(_([1, 2, 3]).first()).toBe(1);
    });
    it('returns an empty array when n <= 0 (0 case)', function() {
        expect(_.first([1, 2, 3], 0)).toEqual([]);
    });
    it('returns an empty array when n <= 0 (negative case)', function() {
        expect(_.first([1, 2, 3], -1)).toEqual([]);
    });
    it('can fetch the first n elements', function() {
        expect(_.first([1, 2, 3], 2)).toEqual([1, 2]);
    });
    it('returns the whole array if n > length', function() {
        expect(_.first([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });
    it('works on an arguments object', function() {
        var result = (function() { return _.first(arguments); }(4, 3, 2, 1));
        expect(result).toBe(4);
    });
    it('works well with _.map', function() {
        var result = _.map([[1, 2, 3], [1, 2, 3]], _.first);
        expect(result).toEqual([1, 1]);
    });
    it('returns undefined when called on null', function() {
        expect(_.first(null)).toBe(void 0);
    });
    it('return undefined when called on a empty array', function() {
        Array.prototype[0] = 'boo';
        expect(_.first([])).toBe('boo');
        delete Array.prototype[0];
    });
    it('is an alias for first', function() {
        expect(_.take).toEqual(_.first);
    });
});

describe('rest tests', function() {
    var numbers = [1, 2, 3, 4];
    it('fetches all but the first element', function() {
        expect(_.rest(numbers)).toEqual([2, 3, 4]);
    });
    it('returns the whole array when index is 0', function() {
        expect(_.rest(numbers, 0)).toEqual([1, 2, 3, 4]);
    });
    it('returns elements starting at the given index', function() {
        expect(_.rest(numbers, 2)).toEqual([3, 4]);
    });
    it('works on an arguments object', function() {
        var result = (function() { return _(arguments).rest(); }(1, 2, 3, 4));
        expect(result).toEqual([2, 3, 4]);
    });
    it('works well with _.map', function() {
        var result = _.map([[1, 2, 3], [1, 2, 3]], _.rest);
        expect(_.flatten(result)).toEqual([2, 3, 2, 3]);
    });
    it('tail is an alias for rest', function () {
        expect(_.tail).toEqual(_.rest);
    });
    it('drop is an alias for rest', function () {
        expect(_.drop).toEqual(_.rest);
    });
});

describe('initial test', function() {
    it('returns all but the last element', function() {
        expect(_.initial([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
    });
    it('returns all but the last n elements', function() {
        expect(_.initial([1, 2, 3, 4], 2)).toEqual([1, 2]);
    });
    it('returns an empty array when n > length', function() {
        expect(_.initial([1, 2, 3, 4], 6)).toEqual([]);
    });
    it('works on an arguments object', function() {
        var result = (function() { return _(arguments).initial(); }(1, 2, 3, 4));
        expect(result).toEqual([1, 2, 3]);
    });
    it('works well with _.map', function() {
        var result = _.map([[1, 2, 3], [1, 2, 3]], _.initial);
        expect(_.flatten(result)).toEqual([1, 2, 1, 2]);
    });
});

describe('last tests', function() {
    it('can pull out the last element of an array', function () {
        expect(_.last([1, 2, 3])).toEqual(3);
    });
    it('can perform OO-style "last()"', function () {
        expect(_([1, 2, 3]).last(3)).toEqual([1, 2, 3]);
    });
    it('returns an empty array when n <= 0 (0 case)', function () {
        expect(_.last([1, 2, 3], 0)).toEqual([]);
    });
    it('returns an empty array when n <= 0 (negative case)', function () {
        expect(_.last([1, 2, 3], -1)).toEqual([]);
    });
    it('can fetch the last n elements', function () {
        expect(_.last([1, 2, 3], 2)).toEqual([2, 3]);
    });
    it('returns the whole array if n > length', function () {
        expect(_.last([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });
    it('works on an arguments object', function () {
        var result = (function() { return _(arguments).last(); }(1, 2, 3, 4));
        expect(result).toEqual(4);
    });
    it('works well with _.map', function () {
        var result = _.map([[1, 2, 3], [1, 2, 3]], _.last);
        expect(result).toEqual([3, 3]);
    });
    it('returns undefined when called on null', function () {
        expect(_.last(null)).toEqual(void 0);
    });

    it('return undefined when called on a empty array', function () {
        var arr = [];
        arr[-1] = 'boo';
        expect(_.last(arr)).toEqual('boo');
    });
});

describe('compact tests', function() {
    it('removes all falsy values', function() {
        expect(_.compact([1, false, null, 0, '', void 0, NaN, 2])).toEqual([1, 2]);
    });
    it('works on an arguments object', function() {
        var result = (function() { return _.compact(arguments); }(0, 1, false, 2, false, 3));
        expect(result).toEqual([1, 2, 3]);
    });
    it('works well with _.map', function() {
        var result = _.map([[1, false, false], [false, false, 3]], _.compact);
        expect(result).toEqual([[1], [3]]);
    });
});

describe('flatten test', function() {
    it('supports null', function() {
        expect(_.flatten(null)).toEqual([]);
    });
    it('supports undefined', function() {
        expect(_.flatten(void 0)).toEqual([]);
    });

    it('supports empty arrays', function() {
        expect(_.flatten([[], [[]], []])).toEqual([]);
    });
    it('can shallowly flatten empty arrays', function() {
        expect(_.flatten([[], [[]], []], true)).toEqual([[]]);
    });

    var list = [1, [2], [3, [[[4]]]]];
    it('can flatten nested arrays', function() {
        expect(_.flatten(list)).toEqual([1, 2, 3, 4]);
    });
    it('can shallowly flatten nested arrays', function() {
        expect(_.flatten(list, true)).toEqual([1, 2, 3, [4]]);
    });
    var result = (function() { return _.flatten(arguments); }(1, [2], [3, [[[4]]]]));
    it('works on an arguments object', function() {
        expect(result).toEqual([1, 2, 3, 4]);
    });
    list = [[1], [2], [3], [[4]]];
    it('can shallowly flatten arrays containing only other arrays', function() {
        expect(_.flatten(list, true)).toEqual([1, 2, 3, [4]]);
    });

    it('can flatten medium length arrays', function() {
        expect(_.flatten([_.range(10), _.range(10), 5, 1, 3], true).length).toEqual(23);
    });
    it('can shallowly flatten medium length arrays', function() {
        expect(_.flatten([_.range(10), _.range(10), 5, 1, 3]).length).toEqual(23);
    });
    it('can handle massive arrays', function() {
        expect(_.flatten([new Array(1000000), _.range(56000), 5, 1, 3]).length).toEqual(1056003);
    });
    it('can handle massive arrays in shallow mode', function() {
        expect(_.flatten([new Array(1000000), _.range(56000), 5, 1, 3], true).length).toEqual(1056003);
    });

    var x = _.range(100000);
    for (var i = 0; i < 1000; i++) x = [x];
    it('can handle very deep arrays', function() {
        expect(_.flatten(x)).toEqual(_.range(100000));
    });
    it('can handle very deep arrays in shallow mode', function() {
        expect(_.flatten(x, true)).toEqual(x[0]);
    });
});