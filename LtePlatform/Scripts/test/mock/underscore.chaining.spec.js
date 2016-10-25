/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>

describe('underscore chaining tests', function() {
    describe('map/flatten/reduce', function () {
        var lyrics = [
          'I\'m a lumberjack and I\'m okay',
          'I sleep all night and I work all day',
          'He\'s a lumberjack and he\'s okay',
          'He sleeps all night and he works all day'
        ];
        var counts = _(lyrics).chain()
          .map(function (line) { return line.split(''); })
          .flatten()
          .reduce(function (hash, l) {
              hash[l] = hash[l] || 0;
              hash[l]++;
              return hash;
          }, {})
          .value();
        it('counted all the letters in the song', function() {
            expect(counts.a).toEqual(16);
        });
        it('counted all the letters in the song', function () {
            expect(counts.e).toEqual(10);
        });
    });

    describe('select/reject/sortBy', function () {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        numbers = _(numbers).chain().select(function (n) {
            return n % 2 === 0;
        }).reject(function (n) {
            return n % 4 === 0;
        }).sortBy(function (n) {
            return -n;
        }).value();
        it('filtered and reversed the numbers', function() {
            expect(numbers).toEqual([10, 6, 2]);
        });
    });

    describe('select/reject/sortBy in functional style', function () {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        numbers = _.chain(numbers).select(function (n) {
            return n % 2 === 0;
        }).reject(function (n) {
            return n % 4 === 0;
        }).sortBy(function (n) {
            return -n;
        }).value();
        it('filtered and reversed the numbers', function() {
            expect(numbers).toEqual([10, 6, 2]);
        });
    });


    it('reverse/concat/unshift/pop/map', function () {
        var numbers = [1, 2, 3, 4, 5];
        numbers = _(numbers).chain()
          .reverse()
          .concat([5, 5, 5])
          .unshift(17)
          .pop()
          .map(function (n) { return n * 2; })
          .value();
        expect(numbers).toEqual([34, 10, 8, 6, 4, 2, 10, 10]);
    });

    it('splice', function () {
        var instance = _([1, 2, 3, 4, 5]).chain();
        expect(instance.splice(1, 3).value()).toEqual([1, 5]);
        expect(instance.splice(1, 0).value()).toEqual([1, 5]);
        expect(instance.splice(1, 1).value()).toEqual([1]);
        expect(instance.splice(0, 1).value()).toEqual([]);
    });

    it('shift', function () {
        var instance = _([1, 2, 3]).chain();
        expect(instance.shift().value()).toEqual([2, 3]);
        expect(instance.shift().value()).toEqual([3]);
        expect(instance.shift().value()).toEqual([]);
    });

    it('pop', function () {
        var instance = _([1, 2, 3]).chain();
        expect(instance.pop().value()).toEqual([1, 2]);
        expect(instance.pop().value()).toEqual([1]);
        expect(instance.pop().value()).toEqual([]);
    });

    it('chaining works in small stages', function () {
        var o = _([1, 2, 3, 4]).chain();
        expect(o.filter(function (i) { return i < 3; }).value()).toEqual([1, 2]);
        expect(o.filter(function (i) { return i > 2; }).value()).toEqual([3, 4]);
    });

    it('#1562: Engine proxies for chained functions', function () {
        var wrapped = _(512);
        expect(wrapped.toJSON()).toEqual(512);
        expect(wrapped.valueOf()).toEqual(512);
        expect(+wrapped).toEqual(512);
        expect(wrapped.toString()).toEqual('512');
        expect('' + wrapped).toEqual('512');
    });
});