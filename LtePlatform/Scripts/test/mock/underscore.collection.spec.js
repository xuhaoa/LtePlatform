/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>

describe('underscore collection tests', function() {
    describe('each', function () {
        it('each iterators provide value and iteration count', function() {
            _.each([1, 2, 3], function(num, i) {
                expect(num).toEqual(i + 1);
            });
        });

        it('context object property accessed', function() {
            var answers = [];
            _.each([1, 2, 3], function(num) { answers.push(num * this.multiplier); }, { multiplier: 5 });
            expect(answers).toEqual([5, 10, 15]);
        });

        it('can iterate a simple array', function() {
            var answers = [];
            _.each([1, 2, 3], function(num) { answers.push(num); });
            expect(answers).toEqual([1, 2, 3]);
        });

        it('iterating over objects works, and ignores the object prototype.', function() {
            var answers = [];
            var obj = { one: 1, two: 2, three: 3 };
            obj.constructor.prototype.four = 4;
            _.each(obj, function(value, key) { answers.push(key); });
            expect(answers).toEqual(['one', 'two', 'three']);
            delete obj.constructor.prototype.four;
        });
        

        // ensure the each function is JITed
        it('the fun should be called only 3 times', function() {
            _(1000).times(function() { _.each([], function() {}); });
            var count = 0;
            var obj = { 1: 'foo', 2: 'bar', 3: 'baz' };
            _.each(obj, function() { count++; });
            expect(count).toEqual(3);
        });

        it('can reference the original collection from inside the iterator', function() {
            var answer = null;
            _.each([1, 2, 3], function(num, index, arr) { if (_.include(arr, num)) answer = true; });
            expect(answer).toBeTruthy();
        });

        it('handles a null properly', function() {
            var answers = 0;
            _.each(null, function() { ++answers; });
            expect(answers).toEqual(0);
        });

        it('set the null function', function() {
            _.each(false, function() {});

            var a = [1, 2, 3];
            expect(_.each(a, function () { })).toEqual(a);
            expect(_.each(null, function () { })).toEqual(null);
        });

    });

    describe('forEach', function () {
        it('is an alias for each', function() {
            expect(_.forEach).toEqual(_.each);
        });

    });

    describe('lookupIterator with contexts', function () {
        it('context is a wrapped primitive;the unwrapped context is the specified primitive;context can be coerced to the specified primitive', function() {
            _.each([true, false, 'yes', '', 0, 1, {}], function(context) {
                _.each([1], function() {
                    expect(typeof this).toEqual('object');
                    expect(this.valueOf()).toEqual(context);
                    expect(this).toEqual(context);
                }, context);
            });
        });

    });

    describe('Iterating objects with sketchy length properties', function () {
        var functions = [
          'each', 'map', 'filter', 'find',
          'some', 'every', 'max', 'min',
          'groupBy', 'countBy', 'partition', 'indexBy'
        ];
        var reducers = ['reduce', 'reduceRight'];

        var tricks = [
          { length: '5' },
          { length: { valueOf: _.constant(5) } },
          { length: Math.pow(2, 53) + 1 },
          { length: Math.pow(2, 53) },
          { length: null },
          { length: -2 },
          { length: new Number(15) }
        ];

        it('test sizes', function() {
            expect(tricks.length * (functions.length + reducers.length + 4)).toEqual(126);

            _.each(tricks, function(trick) {
                var length = trick.length;
                expect(_.size(trick)).toEqual(1);
                expect(_.toArray(trick)).toEqual([length]);
                expect(_.shuffle(trick)).toEqual([length]);
                expect(_.sample(trick)).toEqual(length);


                _.each(functions, function(method) {
                    _[method](trick, function(val, key) {
                        expect(key).toEqual('length');
                    });
                });

                _.each(reducers, function(method) {
                    expect(_[method](trick)).toEqual(trick.length);
                });
            });
        });

    });

    describe('Resistant to collection length and properties changing while iterating', function () {

        var collection = [
          'each', 'map', 'filter', 'find',
          'some', 'every', 'max', 'min', 'reject',
          'groupBy', 'countBy', 'partition', 'indexBy',
          'reduce', 'reduceRight'
        ];
        var array = [
          'findIndex', 'findLastIndex'
        ];
        var object = [
          'mapObject', 'findKey', 'pick', 'omit'
        ];

        it(' is resistant to length changes', function() {
            _.each(collection.concat(array), function(method) {
                var sparseArray = [1, 2, 3];
                sparseArray.length = 100;
                var answers = 0;
                _[method](sparseArray, function() {
                    ++answers;
                    return method === 'every' ? true : null;
                }, {});
                expect(answers).toEqual(100);

                var growingCollection = [1, 2, 3], count = 0;
                _[method](growingCollection, function() {
                    if (count < 10) growingCollection.push(count++);
                    return method === 'every' ? true : null;
                }, {});
                expect(count).toEqual(3);
            });
        });

        it(' is resistant to property changes', function() {
            _.each(collection.concat(object), function(method) {
                var changingObject = { 0: 0, 1: 1 }, count = 0;
                _[method](changingObject, function(val) {
                    if (count < 10) changingObject[++count] = val + 1;
                    return method === 'every' ? true : null;
                }, {});

                expect(count).toEqual(2);
            });
        });

    });

    describe('map', function () {
        it('doubled numbers', function() {
            var doubled = _.map([1, 2, 3], function(num) { return num * 2; });
            expect(doubled).toEqual([2, 4, 6]);
        });

        it('tripled numbers with context', function() {
            var tripled = _.map([1, 2, 3], function(num) { return num * this.multiplier; }, { multiplier: 3 });
            expect(tripled).toEqual([3, 6, 9]);
        });

        it('OO-style doubled numbers', function() {
            var doubled = _([1, 2, 3]).map(function(num) { return num * 2; });
            expect(doubled).toEqual([2, 4, 6]);
        });

        it('Can use collection methods on Array-likes.', function() {
            var ids = _.map({ length: 2, 0: { id: '1' }, 1: { id: '2' } }, function(n) {
                return n.id;
            });
            expect(ids).toEqual(['1', '2']);
        });

        it('handles a null properly', function() {
            expect(_.map(null, _.noop)).toEqual([]);
        });

        it('called with context', function() {
            expect(_.map([1], function() {
                return this.length;
            }, [5])).toEqual([1]);
        });
        

        // Passing a property name like _.pluck.
        it('predicate string map to object properties', function() {
            var people = [{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }];
            expect(_.map(people, 'name')).toEqual(['moe', 'curly']);
        });

    });

    it('collect is an alias for map', function () {
        expect(_.collect).toEqual(_.map);
    });

    describe('reduce', function () {
        var sum;
        it('can sum up an array', function() {
            sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; }, 0);
            expect(sum).toEqual(6);
        });

        it('can sum up an array with members', function() {
            var array = [
                {
                    first: 1,
                    second: 2
                },
                {
                    first: 2,
                    second: 3
                },
                {
                    first: 2,
                    second: 4
                }
            ];
            sum = _.reduce(array, function(memo, num) {
                var result = {};
                result['first'] = memo['first'] + num['first'];
                result['second'] = memo['second'] + num['second'];
                return result;
            });
            expect(sum).toEqual({
                first: 5,
                second: 9
            });
        });

        it('can reduce with a context object', function() {
            var context = { multiplier: 3 };
            sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num * this.multiplier; }, 0, context);
            expect(sum).toEqual(18);
        });

        it('OO-style reduce', function() {
            sum = _([1, 2, 3]).reduce(function(memo, num) { return memo + num; }, 0);
            expect(sum).toEqual(6);
        });

        it('default initial value', function() {
            sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
            expect(sum).toEqual(6);
        });

        it('can reduce via multiplication', function() {
            var prod = _.reduce([1, 2, 3, 4], function(memo, num) { return memo * num; });
            expect(prod).toEqual(24);
        });

        it('handles a null (with initial value) properly', function() {
            expect(_.reduce(null, _.noop, 138)).toEqual(138);
        });
        it('undefined can be passed as a special case', function() {
            expect(_.reduce([], _.noop, void 0)).toEqual(void 0);
        });
        it('collection of length one with no initial value returns the first item', function() {
            expect(_.reduce([_], _.noop)).toEqual(_);
        });
        it('returns undefined when collection is empty and no initial value', function() {
            expect(_.reduce([], _.noop)).toEqual(void 0);
        });

    });

    it('foldl is an alias for reduce', function () {
        expect(_.foldl).toEqual(_.reduce);
    });

    it('inject is an alias for reduce', function () {
        expect(_.inject).toEqual(_.reduce);
    });

    describe('reduceRight', function () {
        it('can perform right folds', function() {
            var list = _.reduceRight(['foo', 'bar', 'baz'], function(memo, str) { return memo + str; }, '');
            expect(list).toEqual('bazbarfoo');
        });

        it('default initial value', function() {
            var list = _.reduceRight(['foo', 'bar', 'baz'], function(memo, str) { return memo + str; });
            expect(list).toEqual('bazbarfoo');
        });

        it('default initial value on object', function() {
            var sum = _.reduceRight({ a: 1, b: 2, c: 3 }, function(memo, num) { return memo + num; });
            expect(sum).toEqual(6);
        });

        it('handles a null (with initial value) properly', function() {
            expect(_.reduceRight(null, _.noop, 138)).toEqual(138);
        });
        it('collection of length one with no initial value returns the first item', function() {
            expect(_.reduceRight([_], _.noop)).toEqual(_);
        });

        it('undefined can be passed as a special case', function() {
            expect(_.reduceRight([], _.noop, void 0)).toEqual(void 0);
        });
        it('returns undefined when collection is empty and no initial value', function() {
            expect(_.reduceRight([], _.noop)).toEqual(void 0);
        });
        

        // 
        it('Assert that the correct arguments are being passed.', function() {
            var args,
                init = {},
                object = { a: 1, b: 2 },
                lastKey = _.keys(object).pop();

            var expected = lastKey === 'a'
                ? [init, 1, 'a', object]
                : [init, 2, 'b', object];

            _.reduceRight(object, function() {
                if (!args) args = _.toArray(arguments);
            }, init);

            expect(args).toEqual(expected);
        });
        

        // 
        it('And again, with numeric keys.', function() {
            var object = { 2: 'a', 1: 'b' };
            var lastKey = _.keys(object).pop();
            var args = null;
            var init = {};

            var expected = lastKey === '2'
                ? [init, 'a', '2', object]
                : [init, 'b', '1', object];

            _.reduceRight(object, function() {
                if (!args) args = _.toArray(arguments);
            }, init);

            expect(args).toEqual(expected);
        });

    });

    it('foldr is an alias for reduceRight', function () {
        expect(_.foldr).toEqual(_.reduceRight);
    });

    describe('find', function () {
        it('Array test', function() {
            var array = [1, 2, 3, 4];
            expect(_.find(array, function (n) { return n > 2; })).toEqual(3);
            expect(_.find(array, function () { return false; })).toEqual(void 0);

            array.dontmatch = 55;
            expect(_.find(array, function (x) { return x === 55; })).toEqual(void 0);
        });

        it('Matching an object like _.findWhere.', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 2, b: 4 }];
            expect(_.find(list, { a: 1 })).toEqual({ a: 1, b: 2 });
            expect(_.find(list, { b: 4 })).toEqual({ a: 1, b: 4 });
            expect(_.find(list, { c: 1 })).toBeUndefined();
            expect(_.find([], { c: 1 })).toBeUndefined();
        });
        // 

        it('found the first "2" and broke the loop', function() {
            var result = _.find([1, 2, 3], function(num) { return num * 2 === 4; });
            expect(result).toEqual(2);
        });

        it('works on objects', function() {
            var obj = {
                a: { x: 1, z: 3 },
                b: { x: 2, z: 2 },
                c: { x: 3, z: 4 },
                d: { x: 4, z: 1 }
            };

            expect(_.find(obj, { x: 2 })).toEqual({ x: 2, z: 2 });
            expect(_.find(obj, { x: 2, z: 1 })).toEqual(void 0);
            expect(_.find(obj, function(x) {
                return x.x === 4;
            })).toEqual({ x: 4, z: 1 });
        });

        it('called with context', function() {
            _.findIndex([{ a: 1 }], function(a, key, o) {
                expect(key).toEqual(0);
                expect(o).toEqual([{ a: 1 }]);
                expect(this).toEqual(_);
            }, _);
        });

    });

    it('detect is an alias for find', function () {
        expect(_.detect).toEqual(_.find);
    });

    describe('filter', function () {
        it('predicate string map to object properties', function() {
            var evenArray = [1, 2, 3, 4, 5, 6];
            var evenObject = { one: 1, two: 2, three: 3 };
            var isEven = function(num) { return num % 2 === 0; };

            expect(_.filter(evenArray, isEven)).toEqual([2, 4, 6]);
            expect(_.filter(evenObject, isEven)).toEqual([2]);
            expect(_.filter([{}, evenObject, []], 'two')).toEqual([evenObject]);

            _.filter([1], function() {
                expect(this).toEqual(evenObject);
            }, evenObject);
        });

        it('Empty object accepts all items', function() {
            // Can be used like _.where.
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
            expect(_.filter(list, { a: 1 })).toEqual([{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }]);
            expect(_.filter(list, { b: 2 })).toEqual([{ a: 1, b: 2 }, { a: 2, b: 2 }]);
            expect(_.filter(list, {})).toEqual(list);
            expect(_(list).filter({})).toEqual(list);
        });

    });

    it('select is an alias for filter', function () {
        expect(_.select).toEqual(_.filter);
    });

    describe('reject', function () {
        var odds = _.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; });
        it('rejected each even number', function() {
            expect(odds).toEqual([1, 3, 5]);
        });

        it('rejected each odd number', function() {
            var context = 'obj';

            var evens = _.reject([1, 2, 3, 4, 5, 6], function(num) {
                expect(context).toEqual('obj');
                return num % 2 !== 0;
            }, context);
            expect(evens).toEqual([2, 4, 6]);
        });

        it('predicate string map to object properties', function() {
            expect(_.reject([odds, { one: 1, two: 2, three: 3 }], 'two')).toEqual([odds]);
        });

        it('Returns empty list given empty object', function() {
            // Can be used like _.where.
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
            expect(_.reject(list, { a: 1 })).toEqual([{ a: 2, b: 2 }]);
            expect(_.reject(list, { b: 2 })).toEqual([{ a: 1, b: 3 }, { a: 1, b: 4 }]);
            expect(_.reject(list, {})).toEqual([]);
        });

    });

    describe('every', function () {
        it('the empty set', function() {
            expect(_.every([], _.identity)).toBeTruthy();
        });
        it('every true values', function() {
            expect(_.every([true, true, true], _.identity)).toBeTruthy();
        });
        it('one false value', function() {
            expect(_.every([true, false, true], _.identity)).toBeFalsy();
        });
        it('even numbers', function() {
            expect(_.every([0, 10, 28], function(num) { return num % 2 === 0; })).toBeTruthy();
        });
        it('an odd number', function() {
            expect(_.every([0, 11, 28], function(num) { return num % 2 === 0; })).toBeFalsy();
        });
        it('cast to boolean - true', function() {
            expect(_.every([1], _.identity)).toEqual(true);
        });
        it('cast to boolean - false', function() {
            expect(_.every([0], _.identity)).toEqual(false);
        });
        it('works with arrays of undefined', function() {
            expect(_.every([void 0, void 0, void 0], _.identity)).toBeFalsy();
        });

        it('String mapped to object property', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
            expect(_.every(list, { a: 1, b: 2 })).toBeFalsy();
            expect(_.every(list, 'a')).toBeTruthy();

            list = [{ a: 1, b: 2 }, { a: 2, b: 2, c: true }];
            expect(_.every(list, { b: 2 })).toBeTruthy();
            expect(_.every(list, 'c')).toBeFalsy();
        });

        it('takes objects', function() {
            expect(_.every({ a: 1, b: 2, c: 3, d: 4 }, _.isNumber)).toBeTruthy();
        });
        it('takes objects', function() {
            expect(_.every({ a: 1, b: 2, c: 3, d: 4 }, _.isObject)).toBeFalsy();
        });
        it('context works', function() {
            expect(_.every(['a', 'b', 'c', 'd'], _.hasOwnProperty, { a: 1, b: 2, c: 3, d: 4 })).toBeTruthy();
        });
        it('context works', function() {
            expect(_.every(['a', 'b', 'c', 'd', 'f'], _.hasOwnProperty, { a: 1, b: 2, c: 3, d: 4 })).toBeFalsy();
        });

    });

    it('all is an alias for every', function () {
        expect(_.all).toEqual(_.every);
    });

    describe('some', function () {
        describe('basic tests', function () {
            it('the empty set', function() {
                expect(_.some([])).toBeFalsy();
            });
            it('all false values', function() {
                expect(_.some([false, false, false])).toBeFalsy();
            });
            it('one true value', function() {
                expect(_.some([false, false, true])).toBeTruthy();
            });
            it('a string', function() {
                expect(_.some([null, 0, 'yes', false])).toBeTruthy();
            });
            it('falsy values', function() {
                expect(_.some([null, 0, '', false])).toBeFalsy();
            });
            it('all odd numbers', function() {
                expect(_.some([1, 11, 29], function(num) { return num % 2 === 0; })).toBeFalsy();
            });
            it('an even number', function() {
                expect(_.some([1, 10, 29], function(num) { return num % 2 === 0; })).toBeTruthy();
            });
            it('cast to boolean - true', function() {
                expect(_.some([1], _.identity)).toEqual(true);
            });
            it('cast to boolean - false', function() {
                expect(_.some([0], _.identity)).toEqual(false);
            });
            it('last test', function() {
                expect(_.some([false, false, true])).toBeTruthy();
            });

        });

        describe('dictionary with numbers', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
            it('Can be called with object', function() {
                expect(_.some(list, { a: 5, b: 2 })).toBeFalsy();
            });
            it('String mapped to object property', function() {
                expect(_.some(list, 'a')).toBeTruthy();
            });

        });

        describe('dictionary with numbers and bools', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2, c: true }];
            it('Can be called with object', function() {
                expect(_.some(list, { b: 2 })).toBeTruthy();
            });
            it('String mapped to object property', function() {
                expect(_.some(list, 'd')).toBeFalsy();
            });

        });

        describe('special tests', function () {
            it('takes objects', function() {
                expect(_.some({ a: '1', b: '2', c: '3', d: '4', e: 6 }, _.isNumber)).toBeTruthy();
                expect(_.some({ a: 1, b: 2, c: 3, d: 4 }, _.isObject)).toBeFalsy();
            });
            it('context works', function() {
                expect(_.some(['a', 'b', 'c', 'd'], _.hasOwnProperty, { a: 1, b: 2, c: 3, d: 4 })).toBeTruthy();
                expect(_.some(['x', 'y', 'z'], _.hasOwnProperty, { a: 1, b: 2, c: 3, d: 4 })).toBeFalsy();
            });

        });

    });

    it('any is an alias for some', function () {
        expect(_.any).toEqual(_.some);
    });

    describe('includes', function () {
        it('hasOwnProperty', function() {
            _.each([null, void 0, 0, 1, NaN, {}, []], function(val) {
                expect(_.includes(val)).toEqual(false);
            });
        });
        describe('basic tests', function() {
            it('two is in the array', function() {
                expect(_.includes([1, 2, 3], 2)).toEqual(true);
            });
            it('two is not in the array', function() {
                expect(_.includes([1, 3, 9], 2)).toBeFalsy();
            });

            it('doesn\'t delegate to binary search', function() {
                expect(_.includes([5, 4, 3, 2, 1], 5, true)).toEqual(true);
            });

            it('_.includes on objects checks their values', function() {
                expect(_.includes({ moe: 1, larry: 3, curly: 9 }, 3)).toEqual(true);
            });
            it('OO-style includes', function() {
                expect(_([1, 2, 3]).includes(2)).toBeTruthy();
            });

        });

        describe('fromIndex tests', function() {
            var numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
            it('takes a fromIndex', function() {
                expect(_.includes(numbers, 1, 1)).toEqual(true);
                expect(_.includes(numbers, 1, -1)).toEqual(false);
                expect(_.includes(numbers, 1, -2)).toEqual(false);
                expect(_.includes(numbers, 1, -3)).toEqual(true);
                expect(_.includes(numbers, 1, 6)).toEqual(true);
                expect(_.includes(numbers, 1, 7)).toEqual(false);
            });

            it('fromIndex is guarded', function() {
                expect(_.every([1, 2, 3], _.partial(_.includes, numbers))).toBeTruthy();
            });

        });

    });

    it('include is an alias for includes', function () {
        expect(_.include).toEqual(_.includes);
    });

    it('contains is an alias for includes', function () {
        expect(_.contains).toEqual(_.includes);

    });

    describe('includes with NaN', function () {
        it('Expected [1, 2, NaN] to contain NaN', function() {
            expect(_.includes([1, 2, NaN, NaN], NaN)).toEqual(true);
        });
        it('Expected [1, 2, Infinity] not to contain NaN', function() {
            expect(_.includes([1, 2, Infinity], NaN)).toEqual(false);
        });

    });

    it('includes with +- 0', function () {
        _.each([-0, +0], function (val) {
            expect(_.includes([1, 2, val, val], val)).toEqual(true);
            expect(_.includes([1, 2, val, val], -val)).toEqual(true);
            expect(_.includes([-1, 1, 2], -val)).toEqual(false);
        });
    });


    describe('invoke', function () {
        var list = [[5, 1, 7], [3, 2, 1]];
        var result = _.invoke(list, 'sort');
        it('first array sorted', function() {
            expect(result[0]).toEqual([1, 5, 7]);
        });
        it('second array sorted', function() {
            expect(result[1]).toEqual([1, 2, 3]);
        });

        it('called with arguments', function() {
            _.invoke([
                {
                    method: function() {
                        expect(_.toArray(arguments)).toEqual([1, 2, 3]);
                    }
                }
            ], 'method', 1, 2, 3);
        });

        it('handles null & undefined', function() {
            expect(_.invoke([{ a: null }, {}, { a: _.constant(1) }], 'a')).toEqual([null, void 0, 1]);
        });

        it('throws for non-functions', function() {
            expect(function() {
                _.invoke([{ a: 1 }], 'a');
            }).toThrowError(TypeError);
        });

    });

    describe('invoke w/ function reference', function () {
        var list = [[5, 1, 7], [3, 2, 1]];
        var result = _.invoke(list, Array.prototype.sort);
        it('first array sorted', function() {
            expect(result[0]).toEqual([1, 5, 7]);
        });
        it('second array sorted', function() {
            expect(result[1]).toEqual([1, 2, 3]);
        });

        it('receives params from invoke', function() {
            expect(_.invoke([1, 2, 3], function(a) {
                return a + this;
            }, 5)).toEqual([6, 7, 8]);
        });

    });

    // Relevant when using ClojureScript
    describe('invoke when strings have a call method', function () {
        it('modify call function', function() {
            String.prototype.call = function() {
                return 42;
            };
            var s = 'foo';
            expect(s.call()).toEqual(42);
            delete String.prototype.call;
            expect(s.call).toEqual(void 0);
        });
        
        var list = [[5, 1, 7], [3, 2, 1]];
        var result = _.invoke(list, 'sort');
        it('first array sorted', function() {
            expect(result[0]).toEqual([1, 5, 7]);
        });
        it('second array sorted', function() {
            expect(result[1]).toEqual([1, 2, 3]);
        });

    });

    describe('pluck', function () {
        var people = [{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }];
        it('pulls names out of objects', function() {
            expect(_.pluck(people, 'name')).toEqual(['moe', 'curly']);
        });
        it('missing properties are returned as undefined', function() {
            expect(_.pluck(people, 'address')).toEqual([void 0, void 0]);
        });
        it('compat: most flexible handling of edge cases', function() {
            expect(_.pluck([{ '[object Object]': 1 }], {})).toEqual([1]);
        });
        //
        it('can pull names out of array with duplicate keys', function() {
            var people2 = [
                {
                    name: 'moe',
                    age: 30
                }, {
                    name: 'curly',
                    age: 50
                }, {
                    name: 'moe',
                    age: 70
                }
            ];
            expect(_.pluck(people2, 'name')).toEqual(['moe', 'curly', 'moe']);
        });
    });

    describe('where', function () {
        it('basic tests', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
            var result = _.where(list, { a: 1 });
            expect(result.length).toEqual(3);
            expect(result[result.length - 1].b).toEqual(4);
            result = _.where(list, { b: 2 });
            expect(result.length).toEqual(2);
            expect(result[0].a).toEqual(1);
            result = _.where(list, {});
            expect(result.length).toEqual(list.length);
        });

        it('checks properties given function', function() {
            function test() {}

            test.map = _.map;
            expect(_.where([_, { a: 1, b: 2 }, _], test)).toEqual([_, _]);
        });

        it('merge array using where', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }];
            var num = { a: 1, b: 3 };
            var finder = {};
            finder['a'] = 1;
            var match = _.where(list, finder);
            
            expect(match).toEqual([{ a: 1, b: 2 }]);
            if (match.length > 0) {
                match[0]['b'] += num['b'];
            }
            expect(match[0]).toEqual({ a: 1, b: 5 });
            expect(list).toEqual([{ a: 1, b: 5 }, { a: 2, b: 2 }]);

        });

    });

    describe('findWhere', function () {
        it('basic tests', function() {
            var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 2, b: 4 }];
            var result = _.findWhere(list, { a: 1 });
            expect(result).toEqual({ a: 1, b: 2 });
            result = _.findWhere(list, { b: 4 });
            expect(result).toEqual({ a: 1, b: 4 });
            result = _.findWhere(list, { c: 1 });
            expect(_.isUndefined(result)).toBeTruthy();
        });

        it('undefined when searching empty list', function() {
            var result = _.findWhere([], { c: 1 });
            expect(_.isUndefined(result)).toBeTruthy();
        });

        it('checks properties given function', function() {
            function test() {}

            test.map = _.map;
            expect(_.findWhere([_, { a: 1, b: 2 }, _], test)).toEqual(_);
        });

        it('uses class instance properties', function() {
            function TestClass() {
                this.y = 5;
                this.x = 'foo';
            }

            var expected = { c: 1, x: 'foo', y: 5 };
            expect(_.findWhere([{ y: 5, b: 6 }, expected], new TestClass())).toEqual(expected);
        });

    });

    describe('max', function () {
        it('can handle null/undefined', function() {
            expect(-Infinity).toEqual(_.max(null));
            expect(-Infinity).toEqual(_.max(void 0));
            expect(-Infinity).toEqual(_.max(null, _.identity));
        });

        it('can perform a regular Math.max', function() {
            expect(_.max([1, 2, 3])).toEqual(3);
        });

        it('can perform a computation-based max', function() {
            var neg = _.max([1, 2, 3], function(num) { return -num; });
            expect(neg).toEqual(1);
        });

        it('Maximum value of an empty object;empty array;non-numeric collection;too-big array', function() {
            expect(-Infinity).toEqual(_.max({}));
            expect(-Infinity).toEqual(_.max([]));
            expect(_.max({ a: 'a' })).toEqual(-Infinity);

            expect(_.max(_.range(1, 300000))).toEqual(299999);
        });

        it('Finds correct max in array starting with num and containing a NaN', function() {
            expect(_.max([1, 2, 3, 'test'])).toEqual(3);
            expect(_.max(['test', 1, 2, 3])).toEqual(3);
        });

        it('Finds correct max in array starting with num and containing a `null`', function() {
            expect(_.max([1, 2, 3, null])).toEqual(3);
            expect(_.max([null, 1, 2, 3])).toEqual(3);
        });

        it('Finds correct max in array starting with num and containing an empty string', function() {
            expect(_.max([1, 2, 3, ''])).toEqual(3);
            expect(_.max(['', 1, 2, 3])).toEqual(3);
        });

        it('Finds correct max in array starting with num and containing a false', function() {
            expect(_.max([1, 2, 3, false])).toEqual(3);
            expect(_.max([false, 1, 2, 3])).toEqual(3);
        });

        it('Finds correct max in array containing a zero;negative numbers', function() {
            expect(_.max([0, 1, 2, 3, 4])).toEqual(4);
            expect(_.max([-3, -2, -1, 0])).toEqual(0);
        });

        it('Finds correct max in array when mapping through multiple arrays', function() {
            expect(_.map([[1, 2, 3], [4, 5, 6]], _.max)).toEqual([3, 6]);
        });

        it('Respects iterator return value of -Infinity', function() {
            var a = { x: -Infinity };
            var b = { x: -Infinity };
            var iterator = function(o) { return o.x; };
            expect(_.max([a, b], iterator)).toEqual(a);
        });

        it('String keys use property iterator', function() {
            expect(_.max([{ a: 1 }, { a: 0, b: 3 }, { a: 4 }, { a: 2 }], 'a')).toEqual({ a: 4 });
        });

        it('Iterator context;Lookup falsy iterator', function() {
            expect(_.max([0, 2], function(c) { return c * this.x; }, { x: 1 })).toEqual(2);
            expect(_.max([[1], [2, 3], [-1, 4], [5]], 0)).toEqual([5]);
            expect(_.max([{ 0: 1 }, { 0: 2 }, { 0: -1 }, { a: 1 }], 0)).toEqual({ 0: 2 });
        });

    });

    describe('min', function () {
        it('can handle null/undefined', function() {
            expect(_.min(null)).toEqual(Infinity);
            expect(_.min(void 0)).toEqual(Infinity);
            expect(_.min(null, _.identity)).toEqual(Infinity);
        });

        it('can perform a regular Math.min', function() {
            expect(_.min([1, 2, 3])).toEqual(1);
        });

        it('can perform a computation-based min', function() {
            var neg = _.min([1, 2, 3], function(num) { return -num; });
            expect(neg).toEqual(3);
        });

        it('Minimum value of an empty object', function() {
            expect(_.min({})).toEqual(Infinity);
            expect(_.min([])).toEqual(Infinity);
            expect(_.min({ a: 'a' })).toEqual(Infinity);
        });

        it('Finds correct min in array when mapping through multiple arrays', function() {
            expect(_.map([[1, 2, 3], [4, 5, 6]], _.min)).toEqual([1, 4]);
        });

        it('Minimum value of a too-big array', function() {
            var now = new Date(9999999999);
            var then = new Date(0);
            expect(_.min([now, then])).toEqual(then);

            expect(_.min(_.range(1, 300000))).toEqual(1);
        });

        it('Finds correct min in array', function() {
            expect(_.min([1, 2, 3, 'test'])).toEqual(1);
            expect(_.min(['test', 1, 2, 3])).toEqual(1);

            expect(_.min([1, 2, 3, null])).toEqual(1);
            expect(_.min([null, 1, 2, 3])).toEqual(1);

            expect(_.min([0, 1, 2, 3, 4])).toEqual(0);
            expect(_.min([-3, -2, -1, 0])).toEqual(-3);
        });

        it('Respects iterator return value of Infinity', function() {
            var a = { x: Infinity };
            var b = { x: Infinity };
            var iterator = function(o) { return o.x; };
            expect(_.min([a, b], iterator)).toEqual(a);
        });

        it('String keys use property iterator', function() {
            expect(_.min([{ a: 1 }, { a: 0, b: 3 }, { a: 4 }, { a: 2 }], 'a')).toEqual({ a: 0, b: 3 });
        });

        it('Iterator context', function() {
            expect(_.min([0, 2], function(c) { return c * this.x; }, { x: -1 })).toEqual(2);
            expect(_.min([[1], [2, 3], [-1, 4], [5]], 0)).toEqual([-1, 4]);
            expect(_.min([{ 0: 1 }, { 0: 2 }, { 0: -1 }, { a: 1 }], 0)).toEqual({ 0: -1 });
        });

    });

    describe('sortBy', function () {
        it('stooges sorted by age', function() {
            var people = [{ name: 'curly', age: 50 }, { name: 'moe', age: 30 }];
            people = _.sortBy(people, function(person) { return person.age; });
            expect(_.pluck(people, 'name')).toEqual(['moe', 'curly']);
        });

        it('sortBy with undefined values', function() {
            var list = [void 0, 4, 1, void 0, 3, 2];
            expect(_.sortBy(list, _.identity)).toEqual([1, 2, 3, 4, void 0, void 0]);
        });

        it('sorted by length', function() {
            var list = ['one', 'two', 'three', 'four', 'five'];
            var sorted = _.sortBy(list, 'length');
            expect(sorted).toEqual(['one', 'two', 'four', 'five', 'three']);
        });

        it('sortBy should be stable for objects', function() {
            function Pair(x, y) {
                this.x = x;
                this.y = y;
            }

            var stableArray = [
                new Pair(1, 1), new Pair(1, 2),
                new Pair(1, 3), new Pair(1, 4),
                new Pair(1, 5), new Pair(1, 6),
                new Pair(2, 1), new Pair(2, 2),
                new Pair(2, 3), new Pair(2, 4),
                new Pair(2, 5), new Pair(2, 6),
                new Pair(void 0, 1), new Pair(void 0, 2),
                new Pair(void 0, 3), new Pair(void 0, 4),
                new Pair(void 0, 5), new Pair(void 0, 6)
            ];

            var stableObject = _.object('abcdefghijklmnopqr'.split(''), stableArray);

            var actual = _.sortBy(stableArray, function(pair) {
                return pair.x;
            });

            expect(actual).toEqual(stableArray);
            expect(_.sortBy(stableArray, 'x')).toEqual(stableArray);

            actual = _.sortBy(stableObject, function(pair) {
                return pair.x;
            });

            expect(actual).toEqual(stableArray);
        });

        it('uses _.identity if iterator is not specified', function() {
            var list = ['q', 'w', 'e', 'r', 't', 'y'];
            expect(_.sortBy(list)).toEqual(['e', 'q', 'r', 't', 'w', 'y']);
        });

    });

    describe('groupBy', function () {
        it('created a group for each value and put each even number in the right group', function() {
            var parity = _.groupBy([1, 2, 3, 4, 5, 6], function(num) { return num % 2; });
            expect('0' in parity && '1' in parity).toBeTruthy();
            expect(parity[0]).toEqual([2, 4, 6]);
        });

        it('group by the string\'s length', function() {
            var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            var grouped = _.groupBy(list, 'length');
            expect(grouped['3']).toEqual(['one', 'two', 'six', 'ten']);
            expect(grouped['4']).toEqual(['four', 'five', 'nine']);
            expect(grouped['5']).toEqual(['three', 'seven', 'eight']);
        });

        it('group by context', function() {
            var context = {};
            _.groupBy([{}], function () { expect(this).toEqual(context); }, context);
        });

        it('conditional group', function() {
            var grouped = _.groupBy([4.2, 6.1, 6.4], function(num) {
                return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
            });
            expect(grouped.constructor.length).toEqual(1);
            expect(grouped.hasOwnProperty.length).toEqual(2);
        });

        it('items in the group calculation', function() {
            var array = [{}];
            _.groupBy(array, function(value, index, obj) { expect(obj).toEqual(array); });
        });

        it('group by number', function() {
            var array = [1, 2, 1, 2, 3];
            var grouped = _.groupBy(array);
            expect(grouped['1'].length).toEqual(2);
            expect(grouped['3'].length).toEqual(1);
        });

        it('group in matrix', function() {
            var matrix = [
                [1, 2],
                [1, 3],
                [2, 3]
            ];
            expect(_.groupBy(matrix, 0)).toEqual({ 1: [[1, 2], [1, 3]], 2: [[2, 3]] });
            expect(_.groupBy(matrix, 1)).toEqual({ 2: [[1, 2]], 3: [[1, 3], [2, 3]] });
        });

        it('can group by deep properties', function() {
            var liz = { name: 'Liz', stats: { power: 10 } };
            var chelsea = { name: 'Chelsea', stats: { power: 10 } };
            var jordan = { name: 'Jordan', stats: { power: 6 } };
            var collection = [liz, chelsea, jordan];
            var expected = {
                10: [liz, chelsea],
                6: [jordan]
            };
            expect(_.groupBy(collection, ['stats', 'power'])).toEqual(expected);
        });

    });

    describe('indexBy', function () {
        it('index by even or odd', function() {
            var parity = _.indexBy([1, 2, 3, 4, 5], function(num) { return num % 2 === 0; });
            expect(parity['true']).toEqual(4);
            expect(parity['false']).toEqual(5);
        });

        it('index by length', function() {
            var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            var grouped = _.indexBy(list, 'length');
            expect(grouped['3']).toEqual('ten');
            expect(grouped['4']).toEqual('nine');
            expect(grouped['5']).toEqual('eight');
        });

        it('index by number', function() {
            var array = [1, 2, 1, 2, 3];
            var grouped = _.indexBy(array);
            expect(grouped['1']).toEqual(1);
            expect(grouped['2']).toEqual(2);
            expect(grouped['3']).toEqual(3);
        });

    });

    describe('countBy', function () {
        it('count by even or odd', function() {
            var parity = _.countBy([1, 2, 3, 4, 5], function(num) { return num % 2 === 0; });
            expect(parity['true']).toEqual(2);
            expect(parity['false']).toEqual(3);
        });

        it('count by length', function() {
            var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            var grouped = _.countBy(list, 'length');
            expect(grouped['3']).toEqual(4);
            expect(grouped['4']).toEqual(3);
            expect(grouped['5']).toEqual(3);
        });

        it('count by context', function() {
            var context = {};
            _.countBy([{}], function () { expect(this).toEqual(context); }, context);
        });

        it('conditional count', function() {
            var grouped = _.countBy([4.2, 6.1, 6.4], function(num) {
                return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
            });
            expect(grouped.constructor).toEqual(1);
            expect(grouped.hasOwnProperty).toEqual(2);
        });

        it('count in items', function() {
            var array = [{}];
            _.countBy(array, function (value, index, obj) { expect(obj).toEqual(array); });
        });

        it('count by number', function() {
            var array = [1, 2, 1, 2, 3];
            var grouped = _.countBy(array);
            expect(grouped['1']).toEqual(2);
            expect(grouped['3']).toEqual(1);
        });

    });

    describe('shuffle', function () {
        it('behaves correctly on size 1 arrays', function() {
            expect(_.shuffle([1])).toEqual([1]);
        });

        describe('Chance of false negative: 1 in ~2.4*10^18', function() {
            var numbers = _.range(20);
            var shuffled = _.shuffle(numbers);
            it('does change the order', function() {
                expect(numbers).not.toEqual(shuffled); // 
            });
            it('contains the same members before and after shuffle', function() {
                expect(numbers).toEqual(_.sortBy(shuffled));
            });

        });

        it('works on objects', function() {
            var shuffled = _.shuffle({ a: 1, b: 2, c: 3, d: 4 });
            expect(shuffled.length).toEqual(4);
            expect(shuffled.sort()).toEqual([1, 2, 3, 4]);
        });

    });

    describe('sample', function () {
        it('behaves correctly when no second parameter is given', function() {
            expect(_.sample([1])).toEqual(1);
        });
        it('behaves correctly on negative n', function() {
            expect(_.sample([1, 2, 3], -2)).toEqual([]);
        });
        var numbers = _.range(10);
        it('contains the same members before and after sample', function() {
            var allSampled = _.sample(numbers, 10).sort();
            expect(allSampled).toEqual(numbers);
        });
        it('also works when sampling more objects than are present', function() {
            var allSampled = _.sample(numbers, 20).sort();
            expect(allSampled).toEqual(numbers);
        });
        it('sampling a single element returns something from the array', function() {
            expect(_.contains(numbers, _.sample(numbers))).toBeTruthy();
        });
        it('sampling empty array with no number returns undefined', function() {
            expect(_.sample([])).toEqual(void 0);
        });
        it('sampling empty array with a number returns an empty array', function() {
            expect(_.sample([], 5)).toEqual([]);
        });
        it('sampling an array with 0 picks returns an empty array', function() {
            expect(_.sample([1, 2, 3], 0)).toEqual([]);
        });
        it('sampling a negative number of picks returns an empty array', function() {
            expect(_.sample([1, 2], -1)).toEqual([]);
        });
        it('sample one value from an object', function() {
            expect(_.contains([1, 2, 3], _.sample({ a: 1, b: 2, c: 3 }))).toBeTruthy();
        });
        it('samples from the whole array, not just the beginning', function() {
            var partialSample = _.sample(_.range(1000), 10);
            var partialSampleSorted = partialSample.sort();
            expect(partialSampleSorted).not.toEqual(_.range(10));
        });

    });

    describe('toArray', function () {
        it('arguments object is not an array', function() {
            expect(_.isArray(arguments)).toBeFalsy();
        });
        it('arguments object converted into array', function() {
            expect(_.isArray(_.toArray(arguments))).toBeTruthy();
        });
        it('cloned array contains same elements', function() {
            var a = [1, 2, 3];
            expect(_.toArray(a)).toEqual(a);
            expect(_.toArray(a)).toEqual([1, 2, 3]);
        });

        it('object flattened into array', function() {
            var numbers = _.toArray({ one: 1, two: 2, three: 3 });
            expect(numbers).toEqual([1, 2, 3]);
        });

        it('maintains astral characters', function() {
            var hearts = '\uD83D\uDC95';
            var pair = hearts.split('');
            var expected = [pair[0], hearts, '&', hearts, pair[1]];
            expect(_.toArray(expected.join(''))).toEqual(expected);
            expect(_.toArray('')).toEqual([]);
        });

        it('works on NodeList', function() {
            if (typeof document != 'undefined') {
                // test in IE < 9
                var actual;
                try {
                    actual = _.toArray(document.childNodes);
                } catch (e) { /* ignored */
                }
                expect(actual).toEqual(_.map(document.childNodes, _.identity));
            }
        });

    });

    describe('size', function () {
        it('can compute the size of an object', function() {
            expect(_.size({ one: 1, two: 2, three: 3 })).toEqual(3);
        });
        it('can compute the size of an array', function() {
            expect(_.size([1, 2, 3])).toEqual(3);
        });
        it('can compute the size of Array-likes', function() {
            expect(_.size({ length: 3, 0: 0, 1: 0, 2: 0 })).toEqual(3);
        });

        it('can test the size of the arguments object', function() {
            var func = function() {
                return _.size(arguments);
            };

            expect(func(1, 2, 3, 4)).toEqual(4);
        });

        it('can compute the size of a string literal', function() {
            expect(_.size('hello')).toEqual(5);
        });
        it('can compute the size of string object', function() {
            expect(_.size(new String('hello'))).toEqual(5);
        });

        it('handles nulls', function() {
            expect(_.size(null)).toEqual(0);
        });
        it('handles numbers', function() {
            expect(_.size(0)).toEqual(0);
        });

    });

    describe('partition', function () {
        var list = [0, 1, 2, 3, 4, 5];
        it('handles bool return values', function() {
            expect(_.partition(list, function(x) { return x < 4; })).toEqual([[0, 1, 2, 3], [4, 5]]);
        });
        it('handles 0 and 1 return values', function() {
            expect(_.partition(list, function(x) { return x & 1; })).toEqual([[1, 3, 5], [0, 2, 4]]);
        });
        it('handles other numeric return values', function() {
            expect(_.partition(list, function(x) { return x - 3; })).toEqual([[0, 1, 2, 4, 5], [3]]);
        });
        it('handles null return values', function() {
            expect(_.partition(list, function(x) { return x > 1 ? null : true; })).toEqual([[0, 1], [2, 3, 4, 5]]);
        });
        it('handles undefined return values', function() {
            expect(_.partition(list, function(x) { if (x < 2) return true;
                return false;
            })).toEqual([[0, 1], [2, 3, 4, 5]]);
        });
        it('handles objects', function() {
            expect(_.partition({ a: 1, b: 2, c: 3 }, function(x) { return x > 1; })).toEqual([[2, 3], [1]]);
        });

        it('can reference the array index', function() {
            expect(_.partition(list, function(x, index) { return index % 2; })).toEqual([[1, 3, 5], [0, 2, 4]]);
        });
        it('can reference the collection', function() {
            expect(_.partition(list, function(x, index, arr) { return x === arr.length - 1; })).toEqual([[5], [0, 1, 2, 3, 4]]);
        });
        

        // Default iterator
        it('Default iterator', function() {
            expect(_.partition([1, false, true, ''])).toEqual([[1, true], [false, '']]);
        });
        it('Takes a string', function() {
            expect(_.partition([{ x: 1 }, { x: 0 }, { x: 1 }], 'x')).toEqual([[{ x: 1 }, { x: 1 }], [{ x: 0 }]]);
        });

        var predicate = function(x) { return x === this.x; };
        it('partition takes a context argument', function() {
            // Context
            expect(_.partition([1, 2, 3], predicate, { x: 2 })).toEqual([[2], [1, 3]]);
        });

        it('predicate can be object', function() {
            expect(_.partition([{ a: 1 }, { b: 2 }, { a: 1, b: 2 }], { a: 1 })).toEqual([[{ a: 1 }, { a: 1, b: 2 }], [{ b: 2 }]]);
        });

        it('partition predict', function() {
            var object = { a: 1 };
            _.partition(object, function(val, key, obj) {
                expect(val).toEqual(1);
                expect(key).toEqual('a');
                expect(obj).toEqual(object);
                expect(this).toEqual(predicate);
            }, predicate);
        });

    });

    it('Can use various collection methods on NodeLists', function () {
        var parent = document.createElement('div');
        parent.innerHTML = '<span id=id1></span>textnode<span id=id2></span>';

        var elementChildren = _.filter(parent.childNodes, _.isElement);
        expect(elementChildren.length).toEqual(2);

        expect(_.map(elementChildren, 'id')).toEqual(['id1', 'id2']);
        expect(_.map(parent.childNodes, 'nodeType')).toEqual([1, 3, 1]);

        expect(_.every(parent.childNodes, _.isElement)).toBeFalsy();
        expect(_.some(parent.childNodes, _.isElement)).toBeTruthy();

        function compareNode(node) {
            return _.isElement(node) ? node.id.charAt(2) : void 0;
        }
        expect(_.max(parent.childNodes, compareNode)).toEqual(_.last(parent.childNodes));
        expect(_.min(parent.childNodes, compareNode)).toEqual(_.first(parent.childNodes));
    });
});