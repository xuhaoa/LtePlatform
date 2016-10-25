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

    QUnit.test('all', function (assert) {
        assert.strictEqual(_.all, _.every, 'is an alias for every');
    });

    QUnit.test('some', function (assert) {
        assert.notOk(_.some([]), 'the empty set');
        assert.notOk(_.some([false, false, false]), 'all false values');
        assert.ok(_.some([false, false, true]), 'one true value');
        assert.ok(_.some([null, 0, 'yes', false]), 'a string');
        assert.notOk(_.some([null, 0, '', false]), 'falsy values');
        assert.notOk(_.some([1, 11, 29], function (num) { return num % 2 === 0; }), 'all odd numbers');
        assert.ok(_.some([1, 10, 29], function (num) { return num % 2 === 0; }), 'an even number');
        assert.strictEqual(_.some([1], _.identity), true, 'cast to boolean - true');
        assert.strictEqual(_.some([0], _.identity), false, 'cast to boolean - false');
        assert.ok(_.some([false, false, true]));

        var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
        assert.notOk(_.some(list, { a: 5, b: 2 }), 'Can be called with object');
        assert.ok(_.some(list, 'a'), 'String mapped to object property');

        list = [{ a: 1, b: 2 }, { a: 2, b: 2, c: true }];
        assert.ok(_.some(list, { b: 2 }), 'Can be called with object');
        assert.notOk(_.some(list, 'd'), 'String mapped to object property');

        assert.ok(_.some({ a: '1', b: '2', c: '3', d: '4', e: 6 }, _.isNumber), 'takes objects');
        assert.notOk(_.some({ a: 1, b: 2, c: 3, d: 4 }, _.isObject), 'takes objects');
        assert.ok(_.some(['a', 'b', 'c', 'd'], _.hasOwnProperty, { a: 1, b: 2, c: 3, d: 4 }), 'context works');
        assert.notOk(_.some(['x', 'y', 'z'], _.hasOwnProperty, { a: 1, b: 2, c: 3, d: 4 }), 'context works');
    });

    QUnit.test('any', function (assert) {
        assert.strictEqual(_.any, _.some, 'is an alias for some');
    });

    QUnit.test('includes', function (assert) {
        _.each([null, void 0, 0, 1, NaN, {}, []], function (val) {
            assert.strictEqual(_.includes(val, 'hasOwnProperty'), false);
        });
        assert.strictEqual(_.includes([1, 2, 3], 2), true, 'two is in the array');
        assert.notOk(_.includes([1, 3, 9], 2), 'two is not in the array');

        assert.strictEqual(_.includes([5, 4, 3, 2, 1], 5, true), true, 'doesn\'t delegate to binary search');

        assert.strictEqual(_.includes({ moe: 1, larry: 3, curly: 9 }, 3), true, '_.includes on objects checks their values');
        assert.ok(_([1, 2, 3]).includes(2), 'OO-style includes');

        var numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
        assert.strictEqual(_.includes(numbers, 1, 1), true, 'takes a fromIndex');
        assert.strictEqual(_.includes(numbers, 1, -1), false, 'takes a fromIndex');
        assert.strictEqual(_.includes(numbers, 1, -2), false, 'takes a fromIndex');
        assert.strictEqual(_.includes(numbers, 1, -3), true, 'takes a fromIndex');
        assert.strictEqual(_.includes(numbers, 1, 6), true, 'takes a fromIndex');
        assert.strictEqual(_.includes(numbers, 1, 7), false, 'takes a fromIndex');

        assert.ok(_.every([1, 2, 3], _.partial(_.includes, numbers)), 'fromIndex is guarded');
    });

    QUnit.test('include', function (assert) {
        assert.strictEqual(_.include, _.includes, 'is an alias for includes');
    });

    QUnit.test('contains', function (assert) {
        assert.strictEqual(_.contains, _.includes, 'is an alias for includes');

    });

    QUnit.test('includes with NaN', function (assert) {
        assert.strictEqual(_.includes([1, 2, NaN, NaN], NaN), true, 'Expected [1, 2, NaN] to contain NaN');
        assert.strictEqual(_.includes([1, 2, Infinity], NaN), false, 'Expected [1, 2, NaN] to contain NaN');
    });

    QUnit.test('includes with +- 0', function (assert) {
        _.each([-0, +0], function (val) {
            assert.strictEqual(_.includes([1, 2, val, val], val), true);
            assert.strictEqual(_.includes([1, 2, val, val], -val), true);
            assert.strictEqual(_.includes([-1, 1, 2], -val), false);
        });
    });


    QUnit.test('invoke', function (assert) {
        assert.expect(5);
        var list = [[5, 1, 7], [3, 2, 1]];
        var result = _.invoke(list, 'sort');
        assert.deepEqual(result[0], [1, 5, 7], 'first array sorted');
        assert.deepEqual(result[1], [1, 2, 3], 'second array sorted');

        _.invoke([{
            method: function () {
                assert.deepEqual(_.toArray(arguments), [1, 2, 3], 'called with arguments');
            }
        }], 'method', 1, 2, 3);

        assert.deepEqual(_.invoke([{ a: null }, {}, { a: _.constant(1) }], 'a'), [null, void 0, 1], 'handles null & undefined');

        assert.raises(function () {
            _.invoke([{ a: 1 }], 'a');
        }, TypeError, 'throws for non-functions');
    });

    QUnit.test('invoke w/ function reference', function (assert) {
        var list = [[5, 1, 7], [3, 2, 1]];
        var result = _.invoke(list, Array.prototype.sort);
        assert.deepEqual(result[0], [1, 5, 7], 'first array sorted');
        assert.deepEqual(result[1], [1, 2, 3], 'second array sorted');

        assert.deepEqual(_.invoke([1, 2, 3], function (a) {
            return a + this;
        }, 5), [6, 7, 8], 'receives params from invoke');
    });

    // Relevant when using ClojureScript
    QUnit.test('invoke when strings have a call method', function (assert) {
        String.prototype.call = function () {
            return 42;
        };
        var list = [[5, 1, 7], [3, 2, 1]];
        var s = 'foo';
        assert.strictEqual(s.call(), 42, 'call function exists');
        var result = _.invoke(list, 'sort');
        assert.deepEqual(result[0], [1, 5, 7], 'first array sorted');
        assert.deepEqual(result[1], [1, 2, 3], 'second array sorted');
        delete String.prototype.call;
        assert.strictEqual(s.call, void 0, 'call function removed');
    });

    QUnit.test('pluck', function (assert) {
        var people = [{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }];
        assert.deepEqual(_.pluck(people, 'name'), ['moe', 'curly'], 'pulls names out of objects');
        assert.deepEqual(_.pluck(people, 'address'), [void 0, void 0], 'missing properties are returned as undefined');
        //compat: most flexible handling of edge cases
        assert.deepEqual(_.pluck([{ '[object Object]': 1 }], {}), [1]);
    });

    QUnit.test('where', function (assert) {
        var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
        var result = _.where(list, { a: 1 });
        assert.strictEqual(result.length, 3);
        assert.strictEqual(result[result.length - 1].b, 4);
        result = _.where(list, { b: 2 });
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0].a, 1);
        result = _.where(list, {});
        assert.strictEqual(result.length, list.length);

        function test() { }
        test.map = _.map;
        assert.deepEqual(_.where([_, { a: 1, b: 2 }, _], test), [_, _], 'checks properties given function');
    });

    QUnit.test('findWhere', function (assert) {
        var list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 2, b: 4 }];
        var result = _.findWhere(list, { a: 1 });
        assert.deepEqual(result, { a: 1, b: 2 });
        result = _.findWhere(list, { b: 4 });
        assert.deepEqual(result, { a: 1, b: 4 });

        result = _.findWhere(list, { c: 1 });
        assert.ok(_.isUndefined(result), 'undefined when not found');

        result = _.findWhere([], { c: 1 });
        assert.ok(_.isUndefined(result), 'undefined when searching empty list');

        function test() { }
        test.map = _.map;
        assert.strictEqual(_.findWhere([_, { a: 1, b: 2 }, _], test), _, 'checks properties given function');

        function TestClass() {
            this.y = 5;
            this.x = 'foo';
        }
        var expect = { c: 1, x: 'foo', y: 5 };
        assert.deepEqual(_.findWhere([{ y: 5, b: 6 }, expect], new TestClass()), expect, 'uses class instance properties');
    });

    QUnit.test('max', function (assert) {
        assert.strictEqual(-Infinity, _.max(null), 'can handle null/undefined');
        assert.strictEqual(-Infinity, _.max(void 0), 'can handle null/undefined');
        assert.strictEqual(-Infinity, _.max(null, _.identity), 'can handle null/undefined');

        assert.strictEqual(_.max([1, 2, 3]), 3, 'can perform a regular Math.max');

        var neg = _.max([1, 2, 3], function (num) { return -num; });
        assert.strictEqual(neg, 1, 'can perform a computation-based max');

        assert.strictEqual(-Infinity, _.max({}), 'Maximum value of an empty object');
        assert.strictEqual(-Infinity, _.max([]), 'Maximum value of an empty array');
        assert.strictEqual(_.max({ a: 'a' }), -Infinity, 'Maximum value of a non-numeric collection');

        assert.strictEqual(_.max(_.range(1, 300000)), 299999, 'Maximum value of a too-big array');

        assert.strictEqual(_.max([1, 2, 3, 'test']), 3, 'Finds correct max in array starting with num and containing a NaN');
        assert.strictEqual(_.max(['test', 1, 2, 3]), 3, 'Finds correct max in array starting with NaN');

        assert.strictEqual(_.max([1, 2, 3, null]), 3, 'Finds correct max in array starting with num and containing a `null`');
        assert.strictEqual(_.max([null, 1, 2, 3]), 3, 'Finds correct max in array starting with a `null`');

        assert.strictEqual(_.max([1, 2, 3, '']), 3, 'Finds correct max in array starting with num and containing an empty string');
        assert.strictEqual(_.max(['', 1, 2, 3]), 3, 'Finds correct max in array starting with an empty string');

        assert.strictEqual(_.max([1, 2, 3, false]), 3, 'Finds correct max in array starting with num and containing a false');
        assert.strictEqual(_.max([false, 1, 2, 3]), 3, 'Finds correct max in array starting with a false');

        assert.strictEqual(_.max([0, 1, 2, 3, 4]), 4, 'Finds correct max in array containing a zero');
        assert.strictEqual(_.max([-3, -2, -1, 0]), 0, 'Finds correct max in array containing negative numbers');

        assert.deepEqual(_.map([[1, 2, 3], [4, 5, 6]], _.max), [3, 6], 'Finds correct max in array when mapping through multiple arrays');

        var a = { x: -Infinity };
        var b = { x: -Infinity };
        var iterator = function (o) { return o.x; };
        assert.strictEqual(_.max([a, b], iterator), a, 'Respects iterator return value of -Infinity');

        assert.deepEqual(_.max([{ a: 1 }, { a: 0, b: 3 }, { a: 4 }, { a: 2 }], 'a'), { a: 4 }, 'String keys use property iterator');

        assert.deepEqual(_.max([0, 2], function (c) { return c * this.x; }, { x: 1 }), 2, 'Iterator context');
        assert.deepEqual(_.max([[1], [2, 3], [-1, 4], [5]], 0), [5], 'Lookup falsy iterator');
        assert.deepEqual(_.max([{ 0: 1 }, { 0: 2 }, { 0: -1 }, { a: 1 }], 0), { 0: 2 }, 'Lookup falsy iterator');
    });

    QUnit.test('min', function (assert) {
        assert.strictEqual(_.min(null), Infinity, 'can handle null/undefined');
        assert.strictEqual(_.min(void 0), Infinity, 'can handle null/undefined');
        assert.strictEqual(_.min(null, _.identity), Infinity, 'can handle null/undefined');

        assert.strictEqual(_.min([1, 2, 3]), 1, 'can perform a regular Math.min');

        var neg = _.min([1, 2, 3], function (num) { return -num; });
        assert.strictEqual(neg, 3, 'can perform a computation-based min');

        assert.strictEqual(_.min({}), Infinity, 'Minimum value of an empty object');
        assert.strictEqual(_.min([]), Infinity, 'Minimum value of an empty array');
        assert.strictEqual(_.min({ a: 'a' }), Infinity, 'Minimum value of a non-numeric collection');

        assert.deepEqual(_.map([[1, 2, 3], [4, 5, 6]], _.min), [1, 4], 'Finds correct min in array when mapping through multiple arrays');

        var now = new Date(9999999999);
        var then = new Date(0);
        assert.strictEqual(_.min([now, then]), then);

        assert.strictEqual(_.min(_.range(1, 300000)), 1, 'Minimum value of a too-big array');

        assert.strictEqual(_.min([1, 2, 3, 'test']), 1, 'Finds correct min in array starting with num and containing a NaN');
        assert.strictEqual(_.min(['test', 1, 2, 3]), 1, 'Finds correct min in array starting with NaN');

        assert.strictEqual(_.min([1, 2, 3, null]), 1, 'Finds correct min in array starting with num and containing a `null`');
        assert.strictEqual(_.min([null, 1, 2, 3]), 1, 'Finds correct min in array starting with a `null`');

        assert.strictEqual(_.min([0, 1, 2, 3, 4]), 0, 'Finds correct min in array containing a zero');
        assert.strictEqual(_.min([-3, -2, -1, 0]), -3, 'Finds correct min in array containing negative numbers');

        var a = { x: Infinity };
        var b = { x: Infinity };
        var iterator = function (o) { return o.x; };
        assert.strictEqual(_.min([a, b], iterator), a, 'Respects iterator return value of Infinity');

        assert.deepEqual(_.min([{ a: 1 }, { a: 0, b: 3 }, { a: 4 }, { a: 2 }], 'a'), { a: 0, b: 3 }, 'String keys use property iterator');

        assert.deepEqual(_.min([0, 2], function (c) { return c * this.x; }, { x: -1 }), 2, 'Iterator context');
        assert.deepEqual(_.min([[1], [2, 3], [-1, 4], [5]], 0), [-1, 4], 'Lookup falsy iterator');
        assert.deepEqual(_.min([{ 0: 1 }, { 0: 2 }, { 0: -1 }, { a: 1 }], 0), { 0: -1 }, 'Lookup falsy iterator');
    });

    QUnit.test('sortBy', function (assert) {
        var people = [{ name: 'curly', age: 50 }, { name: 'moe', age: 30 }];
        people = _.sortBy(people, function (person) { return person.age; });
        assert.deepEqual(_.pluck(people, 'name'), ['moe', 'curly'], 'stooges sorted by age');

        var list = [void 0, 4, 1, void 0, 3, 2];
        assert.deepEqual(_.sortBy(list, _.identity), [1, 2, 3, 4, void 0, void 0], 'sortBy with undefined values');

        list = ['one', 'two', 'three', 'four', 'five'];
        var sorted = _.sortBy(list, 'length');
        assert.deepEqual(sorted, ['one', 'two', 'four', 'five', 'three'], 'sorted by length');

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

        var actual = _.sortBy(stableArray, function (pair) {
            return pair.x;
        });

        assert.deepEqual(actual, stableArray, 'sortBy should be stable for arrays');
        assert.deepEqual(_.sortBy(stableArray, 'x'), stableArray, 'sortBy accepts property string');

        actual = _.sortBy(stableObject, function (pair) {
            return pair.x;
        });

        assert.deepEqual(actual, stableArray, 'sortBy should be stable for objects');

        list = ['q', 'w', 'e', 'r', 't', 'y'];
        assert.deepEqual(_.sortBy(list), ['e', 'q', 'r', 't', 'w', 'y'], 'uses _.identity if iterator is not specified');
    });

    QUnit.test('groupBy', function (assert) {
        var parity = _.groupBy([1, 2, 3, 4, 5, 6], function (num) { return num % 2; });
        assert.ok('0' in parity && '1' in parity, 'created a group for each value');
        assert.deepEqual(parity[0], [2, 4, 6], 'put each even number in the right group');

        var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
        var grouped = _.groupBy(list, 'length');
        assert.deepEqual(grouped['3'], ['one', 'two', 'six', 'ten']);
        assert.deepEqual(grouped['4'], ['four', 'five', 'nine']);
        assert.deepEqual(grouped['5'], ['three', 'seven', 'eight']);

        var context = {};
        _.groupBy([{}], function () { assert.strictEqual(this, context); }, context);

        grouped = _.groupBy([4.2, 6.1, 6.4], function (num) {
            return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
        });
        assert.strictEqual(grouped.constructor.length, 1);
        assert.strictEqual(grouped.hasOwnProperty.length, 2);

        var array = [{}];
        _.groupBy(array, function (value, index, obj) { assert.strictEqual(obj, array); });

        array = [1, 2, 1, 2, 3];
        grouped = _.groupBy(array);
        assert.strictEqual(grouped['1'].length, 2);
        assert.strictEqual(grouped['3'].length, 1);

        var matrix = [
          [1, 2],
          [1, 3],
          [2, 3]
        ];
        assert.deepEqual(_.groupBy(matrix, 0), { 1: [[1, 2], [1, 3]], 2: [[2, 3]] });
        assert.deepEqual(_.groupBy(matrix, 1), { 2: [[1, 2]], 3: [[1, 3], [2, 3]] });

        var liz = { name: 'Liz', stats: { power: 10 } };
        var chelsea = { name: 'Chelsea', stats: { power: 10 } };
        var jordan = { name: 'Jordan', stats: { power: 6 } };
        var collection = [liz, chelsea, jordan];
        var expected = {
            10: [liz, chelsea],
            6: [jordan]
        };
        assert.deepEqual(_.groupBy(collection, ['stats', 'power']), expected, 'can group by deep properties');
    });

    QUnit.test('indexBy', function (assert) {
        var parity = _.indexBy([1, 2, 3, 4, 5], function (num) { return num % 2 === 0; });
        assert.strictEqual(parity['true'], 4);
        assert.strictEqual(parity['false'], 5);

        var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
        var grouped = _.indexBy(list, 'length');
        assert.strictEqual(grouped['3'], 'ten');
        assert.strictEqual(grouped['4'], 'nine');
        assert.strictEqual(grouped['5'], 'eight');

        var array = [1, 2, 1, 2, 3];
        grouped = _.indexBy(array);
        assert.strictEqual(grouped['1'], 1);
        assert.strictEqual(grouped['2'], 2);
        assert.strictEqual(grouped['3'], 3);
    });

    QUnit.test('countBy', function (assert) {
        var parity = _.countBy([1, 2, 3, 4, 5], function (num) { return num % 2 === 0; });
        assert.strictEqual(parity['true'], 2);
        assert.strictEqual(parity['false'], 3);

        var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
        var grouped = _.countBy(list, 'length');
        assert.strictEqual(grouped['3'], 4);
        assert.strictEqual(grouped['4'], 3);
        assert.strictEqual(grouped['5'], 3);

        var context = {};
        _.countBy([{}], function () { assert.strictEqual(this, context); }, context);

        grouped = _.countBy([4.2, 6.1, 6.4], function (num) {
            return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
        });
        assert.strictEqual(grouped.constructor, 1);
        assert.strictEqual(grouped.hasOwnProperty, 2);

        var array = [{}];
        _.countBy(array, function (value, index, obj) { assert.strictEqual(obj, array); });

        array = [1, 2, 1, 2, 3];
        grouped = _.countBy(array);
        assert.strictEqual(grouped['1'], 2);
        assert.strictEqual(grouped['3'], 1);
    });

    QUnit.test('shuffle', function (assert) {
        assert.deepEqual(_.shuffle([1]), [1], 'behaves correctly on size 1 arrays');
        var numbers = _.range(20);
        var shuffled = _.shuffle(numbers);
        assert.notDeepEqual(numbers, shuffled, 'does change the order'); // Chance of false negative: 1 in ~2.4*10^18
        assert.notStrictEqual(numbers, shuffled, 'original object is unmodified');
        assert.deepEqual(numbers, _.sortBy(shuffled), 'contains the same members before and after shuffle');

        shuffled = _.shuffle({ a: 1, b: 2, c: 3, d: 4 });
        assert.strictEqual(shuffled.length, 4);
        assert.deepEqual(shuffled.sort(), [1, 2, 3, 4], 'works on objects');
    });

    QUnit.test('sample', function (assert) {
        assert.strictEqual(_.sample([1]), 1, 'behaves correctly when no second parameter is given');
        assert.deepEqual(_.sample([1, 2, 3], -2), [], 'behaves correctly on negative n');
        var numbers = _.range(10);
        var allSampled = _.sample(numbers, 10).sort();
        assert.deepEqual(allSampled, numbers, 'contains the same members before and after sample');
        allSampled = _.sample(numbers, 20).sort();
        assert.deepEqual(allSampled, numbers, 'also works when sampling more objects than are present');
        assert.ok(_.contains(numbers, _.sample(numbers)), 'sampling a single element returns something from the array');
        assert.strictEqual(_.sample([]), void 0, 'sampling empty array with no number returns undefined');
        assert.notStrictEqual(_.sample([], 5), [], 'sampling empty array with a number returns an empty array');
        assert.notStrictEqual(_.sample([1, 2, 3], 0), [], 'sampling an array with 0 picks returns an empty array');
        assert.deepEqual(_.sample([1, 2], -1), [], 'sampling a negative number of picks returns an empty array');
        assert.ok(_.contains([1, 2, 3], _.sample({ a: 1, b: 2, c: 3 })), 'sample one value from an object');
        var partialSample = _.sample(_.range(1000), 10);
        var partialSampleSorted = partialSample.sort();
        assert.notDeepEqual(partialSampleSorted, _.range(10), 'samples from the whole array, not just the beginning');
    });

    QUnit.test('toArray', function (assert) {
        assert.notOk(_.isArray(arguments), 'arguments object is not an array');
        assert.ok(_.isArray(_.toArray(arguments)), 'arguments object converted into array');
        var a = [1, 2, 3];
        assert.notStrictEqual(_.toArray(a), a, 'array is cloned');
        assert.deepEqual(_.toArray(a), [1, 2, 3], 'cloned array contains same elements');

        var numbers = _.toArray({ one: 1, two: 2, three: 3 });
        assert.deepEqual(numbers, [1, 2, 3], 'object flattened into array');

        var hearts = '\uD83D\uDC95';
        var pair = hearts.split('');
        var expected = [pair[0], hearts, '&', hearts, pair[1]];
        assert.deepEqual(_.toArray(expected.join('')), expected, 'maintains astral characters');
        assert.deepEqual(_.toArray(''), [], 'empty string into empty array');

        if (typeof document != 'undefined') {
            // test in IE < 9
            var actual;
            try {
                actual = _.toArray(document.childNodes);
            } catch (e) { /* ignored */ }
            assert.deepEqual(actual, _.map(document.childNodes, _.identity), 'works on NodeList');
        }
    });

    QUnit.test('size', function (assert) {
        assert.strictEqual(_.size({ one: 1, two: 2, three: 3 }), 3, 'can compute the size of an object');
        assert.strictEqual(_.size([1, 2, 3]), 3, 'can compute the size of an array');
        assert.strictEqual(_.size({ length: 3, 0: 0, 1: 0, 2: 0 }), 3, 'can compute the size of Array-likes');

        var func = function () {
            return _.size(arguments);
        };

        assert.strictEqual(func(1, 2, 3, 4), 4, 'can test the size of the arguments object');

        assert.strictEqual(_.size('hello'), 5, 'can compute the size of a string literal');
        assert.strictEqual(_.size(new String('hello')), 5, 'can compute the size of string object');

        assert.strictEqual(_.size(null), 0, 'handles nulls');
        assert.strictEqual(_.size(0), 0, 'handles numbers');
    });

    QUnit.test('partition', function (assert) {
        var list = [0, 1, 2, 3, 4, 5];
        assert.deepEqual(_.partition(list, function (x) { return x < 4; }), [[0, 1, 2, 3], [4, 5]], 'handles bool return values');
        assert.deepEqual(_.partition(list, function (x) { return x & 1; }), [[1, 3, 5], [0, 2, 4]], 'handles 0 and 1 return values');
        assert.deepEqual(_.partition(list, function (x) { return x - 3; }), [[0, 1, 2, 4, 5], [3]], 'handles other numeric return values');
        assert.deepEqual(_.partition(list, function (x) { return x > 1 ? null : true; }), [[0, 1], [2, 3, 4, 5]], 'handles null return values');
        assert.deepEqual(_.partition(list, function (x) { if (x < 2) return true; }), [[0, 1], [2, 3, 4, 5]], 'handles undefined return values');
        assert.deepEqual(_.partition({ a: 1, b: 2, c: 3 }, function (x) { return x > 1; }), [[2, 3], [1]], 'handles objects');

        assert.deepEqual(_.partition(list, function (x, index) { return index % 2; }), [[1, 3, 5], [0, 2, 4]], 'can reference the array index');
        assert.deepEqual(_.partition(list, function (x, index, arr) { return x === arr.length - 1; }), [[5], [0, 1, 2, 3, 4]], 'can reference the collection');

        // Default iterator
        assert.deepEqual(_.partition([1, false, true, '']), [[1, true], [false, '']], 'Default iterator');
        assert.deepEqual(_.partition([{ x: 1 }, { x: 0 }, { x: 1 }], 'x'), [[{ x: 1 }, { x: 1 }], [{ x: 0 }]], 'Takes a string');

        // Context
        var predicate = function (x) { return x === this.x; };
        assert.deepEqual(_.partition([1, 2, 3], predicate, { x: 2 }), [[2], [1, 3]], 'partition takes a context argument');

        assert.deepEqual(_.partition([{ a: 1 }, { b: 2 }, { a: 1, b: 2 }], { a: 1 }), [[{ a: 1 }, { a: 1, b: 2 }], [{ b: 2 }]], 'predicate can be object');

        var object = { a: 1 };
        _.partition(object, function (val, key, obj) {
            assert.strictEqual(val, 1);
            assert.strictEqual(key, 'a');
            assert.strictEqual(obj, object);
            assert.strictEqual(this, predicate);
        }, predicate);
    });

    if (typeof document != 'undefined') {
        QUnit.test('Can use various collection methods on NodeLists', function (assert) {
            var parent = document.createElement('div');
            parent.innerHTML = '<span id=id1></span>textnode<span id=id2></span>';

            var elementChildren = _.filter(parent.childNodes, _.isElement);
            assert.strictEqual(elementChildren.length, 2);

            assert.deepEqual(_.map(elementChildren, 'id'), ['id1', 'id2']);
            assert.deepEqual(_.map(parent.childNodes, 'nodeType'), [1, 3, 1]);

            assert.notOk(_.every(parent.childNodes, _.isElement));
            assert.ok(_.some(parent.childNodes, _.isElement));

            function compareNode(node) {
                return _.isElement(node) ? node.id.charAt(2) : void 0;
            }
            assert.strictEqual(_.max(parent.childNodes, compareNode), _.last(parent.childNodes));
            assert.strictEqual(_.min(parent.childNodes, compareNode), _.first(parent.childNodes));
        });
    }
});