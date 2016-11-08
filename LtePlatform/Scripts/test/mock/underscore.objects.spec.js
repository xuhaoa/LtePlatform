/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>

describe('objects tests', function () {
    describe('keys', function () {
        it('can extract the keys from an object', function() {
            expect(_.keys({ one: 1, two: 2 })).toEqual(['one', 'two']);
        });
        it('is not fooled by sparse arrays; see issue #95', function() {
            // the test above is not safe because it relies on for-in enumeration order
            var a = [];
            a[1] = 0;
            expect(_.keys(a)).toEqual(['1']);
            expect(_.keys(null), []);
            expect(_.keys(void 0), []);
            expect(_.keys(1), []);
            expect(_.keys('a'), []);
            expect(_.keys(true), []);
        });

        it('matches non-enumerable properties', function() {
            // keys that may be missed if the implementation isn't careful
            var trouble = {
                constructor: Object,
                valueOf: _.noop,
                hasOwnProperty: null,
                toString: 5,
                toLocaleString: void 0,
                propertyIsEnumerable: /a/,
                isPrototypeOf: this,
                __defineGetter__: Boolean,
                __defineSetter__: {},
                __lookupSetter__: false,
                __lookupGetter__: []
            };
            var troubleKeys = [
                'constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                'isPrototypeOf', '__defineGetter__', '__defineSetter__', '__lookupSetter__', '__lookupGetter__'
            ].sort();
            expect(_.keys(trouble).sort()).toEqual(troubleKeys);
        });

    });

    describe('allKeys', function () {
        it('can extract the allKeys from an object', function() {
            expect(_.allKeys({ one: 1, two: 2 })).toEqual(['one', 'two']);
        });
        
        // the test above is not safe because it relies on for-in enumeration order
        var a = []; a[1] = 0;
        it('is not fooled by sparse arrays; see issue #95', function() {
            expect(_.allKeys(a)).toEqual(['1']);
        });

        it('is not fooled by sparse arrays with additional properties', function() {
            a.a = a;
            expect(_.allKeys(a)).toEqual(['1', 'a']);

            _.each([null, void 0, 1, 'a', true, NaN, {}, [], new Number(5), new Date(0)], function(val) {
                expect(_.allKeys(val)).toEqual([]);
            });
        });

        it('matches non-enumerable properties', function() {
            // allKeys that may be missed if the implementation isn't careful
            var trouble = {
                constructor: Object,
                valueOf: _.noop,
                hasOwnProperty: null,
                toString: 5,
                toLocaleString: void 0,
                propertyIsEnumerable: /a/,
                isPrototypeOf: this
            };
            var troubleKeys = [
                'constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                'isPrototypeOf'
            ].sort();
            expect(_.allKeys(trouble).sort()).toEqual(troubleKeys);
        });

        it('should include inherited keys', function() {
            function A() {}

            A.prototype.foo = 'foo';
            var b = new A();
            b.bar = 'bar';
            expect(_.allKeys(b).sort()).toEqual(['bar', 'foo']);
        });

        it('should get keys from constructor', function() {
            function y() {}

            y.x = 'z';
            expect(_.allKeys(y)).toEqual(['x']);
        });

    });

    describe('values', function () {
        it('can extract the values from an object', function() {
            expect(_.values({ one: 1, two: 2 })).toEqual([1, 2]);
        });
        it('... even when one of them is "length"', function() {
            expect(_.values({ one: 1, two: 2, length: 3 })).toEqual([1, 2, 3]);
        });

    });

    describe('pairs', function () {
        it('can convert an object into pairs', function() {
            expect(_.pairs({ one: 1, two: 2 })).toEqual([['one', 1], ['two', 2]]);
        });
        it('... even when one of them is "length"', function() {
            expect(_.pairs({ one: 1, two: 2, length: 3 })).toEqual([['one', 1], ['two', 2], ['length', 3]]);
        });

    });

    describe('invert', function () {
        it('can invert an object and two inverts gets you back where you started', function() {
            var obj = { first: 'Moe', second: 'Larry', third: 'Curly' };
            expect(_.keys(_.invert(obj))).toEqual(['Moe', 'Larry', 'Curly']);
            expect(_.invert(_.invert(obj))).toEqual(obj);
        });

        it('can invert an object with "length"', function() {
            var obj = { length: 3 };
            expect(_.invert(obj)['3']).toEqual('length');
        });

    });

    describe('functions', function () {
        it('can grab the function names of any passed-in object', function() {
            var obj = { a: 'dash', b: _.map, c: /yo/, d: _.reduce };
            expect(['b', 'd']).toEqual(_.functions(obj));
        });

        it('also looks up functions on the prototype', function() {
            var Animal = function() {};
            Animal.prototype.run = function() {};
            expect(_.functions(new Animal)).toEqual(['run']);
        });

    });

    it('methods is an alias for functions', function () {
        expect(_.methods).toEqual(_.functions);
    });

    describe('extend', function () {
        var result;
        it('can extend an object with the attributes of another', function() {
            expect(_.extend({}, { a: 'b' }).a).toEqual('b');
        });
        it('properties in source override destination', function() {
            expect(_.extend({ a: 'x' }, { a: 'b' }).a).toEqual('b');
        });
        it("properties not in source don't get overridden", function() {
            expect(_.extend({ x: 'x' }, { a: 'b' }).x).toEqual('x');
        });
        it('can extend from multiple source objects', function() {
            result = _.extend({ x: 'x' }, { a: 'a' }, { b: 'b' });
            expect(result).toEqual({ x: 'x', a: 'a', b: 'b' });
        });
        it('extending from multiple source objects last property trumps', function() {
            result = _.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 'b' });
            expect(result).toEqual({ x: 2, a: 'b' });
        });
        it('extend copies undefined values', function() {
            result = _.extend({}, { a: void 0, b: null });
            expect(_.keys(result)).toEqual(['a', 'b']);
        });
        
        var F = function () { };
        F.prototype = { a: 'b' };
        var subObj = new F();
        it('extend copies all properties from source', function() {
            subObj.c = 'd';
            expect(_.extend({}, subObj)).toEqual({ a: 'b', c: 'd' });
        });
        it("extend does not convert destination object's 'in' properties to 'own' properties", function() {
            _.extend(subObj, {});
            expect(subObj.hasOwnProperty('a')).toBeFalsy();
        });

        it('should not error on `null` or `undefined` sources', function() {
            try {
                result = {};
                _.extend(result, null, void 0, { a: 1 });
            } catch (e) { /* ignored */
            }

            expect(result.a).toEqual(1);
        });

        it('extending null results in null', function() {
            expect(_.extend(null, { a: 1 })).toEqual(null);
        });
        it('extending undefined results in undefined', function() {
            expect(_.extend(void 0, { a: 1 })).toEqual(void 0);
        });

    });

    describe('extendOwn', function () {
        var result;
        it('can extend an object with the attributes of another', function() {
            expect(_.extendOwn({}, { a: 'b' }).a).toEqual('b');
        });
        it('properties in source override destination', function() {
            expect(_.extendOwn({ a: 'x' }, { a: 'b' }).a).toEqual('b');
        });
        it("properties not in source don't get overridden", function() {
            expect(_.extendOwn({ x: 'x' }, { a: 'b' }).x).toEqual('x');
        });
        it('can extend from multiple source objects', function() {
            result = _.extendOwn({ x: 'x' }, { a: 'a' }, { b: 'b' });
            expect(result).toEqual({ x: 'x', a: 'a', b: 'b' });
        });
        it('extending from multiple source objects last property trumps', function() {
            result = _.extendOwn({ x: 'x' }, { a: 'a', x: 2 }, { a: 'b' });
            expect(result).toEqual({ x: 2, a: 'b' });
        });
        it('copies undefined values', function() {
            expect(_.extendOwn({}, { a: void 0, b: null })).toEqual({ a: void 0, b: null });
        });

        it('copies own properties from source', function() {
            var F = function() {};
            F.prototype = { a: 'b' };
            var subObj = new F();
            subObj.c = 'd';
            expect(_.extendOwn({}, subObj)).toEqual({ c: 'd' });
        });

        it('should not error on `null` or `undefined` sources', function() {
            result = {};
            expect(_.extendOwn(result, null, void 0, { a: 1 })).toEqual({ a: 1 });
        });

        it('extending non-objects results in returning the non-object value', function() {
            _.each(['a', 5, null, false], function(val) {
                expect(_.extendOwn(val, { a: 1 })).toEqual(val);
            });
        });

        it('extending undefined results in undefined', function() {
            expect(_.extendOwn(void 0, { a: 1 })).toEqual(void 0);
        });

        it('should treat array-like objects like normal objects', function() {
            result = _.extendOwn({ a: 1, 0: 2, 1: '5', length: 6 }, { 0: 1, 1: 2, length: 2 });
            expect(result).toEqual({ a: 1, 0: 1, 1: 2, length: 2 });
        });

    });

    it('assign is an alias for extendOwn', function () {
        expect(_.assign).toEqual(_.extendOwn);
    });

    describe('pick', function() {
        var result;
        it('can restrict properties to those named', function() {
            result = _.pick({ a: 1, b: 2, c: 3 }, 'a', 'c');
            expect(result).toEqual({ a: 1, c: 3 });
        });
        it('can restrict properties to those named in an array', function() {
            result = _.pick({ a: 1, b: 2, c: 3 }, ['b', 'c']);
            expect(result).toEqual({ b: 2, c: 3 });
        });
        it('can restrict properties to those named in mixed args', function() {
            result = _.pick({ a: 1, b: 2, c: 3 }, ['a'], 'b');
            expect(result).toEqual({ a: 1, b: 2 });
        });
        it('can pick numeric properties', function() {
            result = _.pick(['a', 'b'], 1);
            expect(result).toEqual({ 1: 'b' });
        });

        it('Called with null/undefined', function() {
            _.each([null, void 0], function(val) {
                expect(_.pick(val, 'hasOwnProperty')).toEqual({});
                expect(_.pick(val, _.constant(true))).toEqual({});
            });
        });
        it('can iterate primitives', function() {
            expect(_.pick(5, 'toString', 'b')).toEqual({ toString: Number.prototype.toString });
        });

        var data = { a: 1, b: 2, c: 3 };
        it('can accept a predicate and context', function() {
            var callback = function(value, key, object) {
                expect(key, { 1: 'a', 2: 'b', 3: 'c' }[value]);
                expect(object, data);
                return value !== this.value;
            };
            result = _.pick(data, callback, { value: 2 });
            expect(result).toEqual({ a: 1, c: 3 });
        });

        var Obj = function() {};
        Obj.prototype = { a: 1, b: 2, c: 3 };
        var instance = new Obj();
        it('include prototype props', function() {
            expect(_.pick(instance, 'a', 'c')).toEqual({ a: 1, c: 3 });
        });

        it('function is given context', function() {
            expect(_.pick(data, function(val, key) {
                return this[key] === 3 && this === instance;
            }, instance)).toEqual({ c: 3 });
        });

        it('does not set own property if property not in object', function() {
            expect(_.has(_.pick({}, 'foo'), 'foo')).toBeFalsy();
        });
        it('passes same object as third parameter of iteratee', function() {
            _.pick(data, function(value, key, obj) {
                expect(obj).toEqual(data);
            });
        });

    });

    describe('omit', function () {
        var result;
        it('can omit a single named property', function() {
            result = _.omit({ a: 1, b: 2, c: 3 }, 'b');
            expect(result).toEqual({ a: 1, c: 3 });
        });
        it('can omit several named properties', function() {
            result = _.omit({ a: 1, b: 2, c: 3 }, 'a', 'c');
            expect(result).toEqual({ b: 2 });
        });
        it('can omit properties named in an array', function() {
            result = _.omit({ a: 1, b: 2, c: 3 }, ['b', 'c']);
            expect(result).toEqual({ a: 1 });
        });
        it('can omit numeric properties', function() {
            result = _.omit(['a', 'b'], 0);
            expect(result).toEqual({ 1: 'b' });
        });

        it('non objects return empty object', function() {
            expect(_.omit(null, 'a', 'b')).toEqual({});
        });
        it('null/undefined return empty object', function() {
            expect(_.omit(void 0, 'toString')).toEqual({});
        });
        it('returns empty object for primitives', function() {
            expect(_.omit(5, 'toString', 'b')).toEqual({});
        });
        

        var data = { a: 1, b: 2, c: 3 };
        var callback = function (value, key, object) {
            expect(key, { 1: 'a', 2: 'b', 3: 'c' }[value]);
            expect(object, data);
            return value !== this.value;
        };
        it('can accept a predicate', function() {
            result = _.omit(data, callback, { value: 2 });
            expect(result).toEqual({ b: 2 });
        });
        

        var Obj = function () { };
        Obj.prototype = { a: 1, b: 2, c: 3 };
        var instance = new Obj();
        it('include prototype props', function() {
            expect(_.omit(instance, 'b')).toEqual({ a: 1, c: 3 });
        });

        it('function is given context', function() {
            expect(_.omit(data, function(val, key) {
                return this[key] === 3 && this === instance;
            }, instance)).toEqual({ a: 1, b: 2 });
        });

    });

    describe('defaults', function () {
        var options = { zero: 0, one: 1, empty: '', nan: NaN, nothing: null };

        it('value exists and default applied and null isn\'t overridden', function() {
            _.defaults(options, { zero: 1, one: 10, twenty: 20, nothing: 'str' });
            expect(options.zero).toEqual(0);
            expect(options.one).toEqual(1);
            expect(options.twenty).toEqual(20);
            expect(options.nothing).toEqual(null);
        });

        it("NaN isn't overridden and new value is added, first one wins", function() {
            _.defaults(options, { empty: 'full' }, { nan: 'nan' }, { word: 'word' }, { word: 'dog' });
            expect(options.empty).toEqual('');
            expect(_.isNaN(options.nan)).toBeTruthy();
            expect(options.word).toEqual('word');
        });

        it('should not error on `null` or `undefined` sources', function() {
            try {
                options = {};
                _.defaults(options, null, void 0, { a: 1 });
            } catch (e) { /* ignored */
            }

            expect(options.a).toEqual(1);
        });

        it('defaults skips nulls', function() {
            expect(_.defaults(null, { a: 1 })).toEqual({ a: 1 });
        });
        it('defaults skips undefined', function() {
            expect(_.defaults(void 0, { a: 1 })).toEqual({ a: 1 });
        });

    });

    describe('clone', function () {
        var moe = { name: 'moe', lucky: [13, 27, 34] };
        var clone = _.clone(moe);
        it('the clone as the attributes of the original', function() {
            expect(clone.name).toEqual('moe');
        });

        it('clones can change shallow attributes without affecting the original', function() {
            clone.name = 'curly';
            expect(clone.name === 'curly' && moe.name === 'moe').toBeTruthy();
        });

        it('changes to deep attributes are shared with the original', function() {
            clone.lucky.push(101);
            expect(_.last(moe.lucky)).toEqual(101);
        });

        it('non objects should not be changed by clone', function() {
            expect(_.clone(void 0)).toEqual(void 0);
            expect(_.clone(1)).toEqual(1);
            expect(_.clone(null)).toEqual(null);
        });

    });

    describe('create', function () {
        var Parent = function () { };
        Parent.prototype = { foo: function () { }, bar: 2 };
        it('should return empty object when a non-object is provided', function() {
            _.each(['foo', null, void 0, 1], function(val) {
                expect(_.create(val)).toEqual({});
            });
        });

        it('should return new instance of array when array is provided', function() {
            expect(_.create([]) instanceof Array).toBeTruthy();
        });
        

        var Child = function () { };
        it('object should inherit prototype', function() {
            Child.prototype = _.create(Parent.prototype);
            expect(new Child instanceof Parent).toBeTruthy();
        });

        it('properties should be added to object', function() {
            var func = function() {};
            Child.prototype = _.create(Parent.prototype, { func: func });
            expect(Child.prototype.func).toEqual(func);
        });

        it('create constructor', function() {
            Child.prototype = _.create(Parent.prototype, { constructor: Child });
            expect(Child.prototype.constructor).toEqual(Child);
        });

        it('should only add own properties', function() {
            Child.prototype.foo = 'foo';
            var created = _.create(Child.prototype, new Child);
            expect(created.hasOwnProperty('foo')).toBeFalsy();
        });

    });

    describe('isEqual', function () {
        function First() {
            this.value = 1;
        }
        First.prototype.value = 1;
        function Second() {
            this.value = 1;
        }
        Second.prototype.value = 2;

        describe('Basic equality and identity comparisons.', function() {
            it('`null` is equal to `null`', function() {
                expect(_.isEqual(null, null)).toBeTruthy();
            });
            it('`undefined` is equal to `undefined`', function() {
                expect(_.isEqual()).toBeTruthy();
            });

            it('`0` is not equal to `-0`', function() {
                expect(_.isEqual(0, -0)).toBeFalsy();
            });
            it('Commutative equality is implemented for `0` and `-0`', function() {
                expect(_.isEqual(-0, 0)).toBeFalsy();
            });
            it('`null` is not equal to `undefined`', function() {
                expect(_.isEqual(null, void 0)).toBeFalsy();
            });
            it('Commutative equality is implemented for `null` and `undefined`', function() {
                expect(_.isEqual(void 0, null)).toBeFalsy();
            });

        });

        describe('String object and primitive comparisons.', function() {
            // 
            it('Identical string primitives are equal', function() {
                expect(_.isEqual('Curly', 'Curly')).toBeTruthy();
            });
            it('String objects with identical primitive values are equal', function() {
                expect(_.isEqual(new String('Curly'), new String('Curly'))).toBeTruthy();
            });
            it('String primitives and their corresponding object wrappers are equal', function() {
                expect(_.isEqual(new String('Curly'), 'Curly')).toBeTruthy();
            });
            it('Commutative equality is implemented for string objects and primitives', function() {
                expect(_.isEqual('Curly', new String('Curly'))).toBeTruthy();
            });

            it('String primitives with different values are not equal', function() {
                expect(_.isEqual('Curly', 'Larry')).toBeFalsy();
            });
            it('String objects with different primitive values are not equal', function() {
                expect(_.isEqual(new String('Curly'), new String('Larry'))).toBeFalsy();
            });
            it('String objects and objects with a custom `toString` method are not equal', function() {
                expect(_.isEqual(new String('Curly'), { toString: function() { return 'Curly'; } })).toBeFalsy();
            });
        });


        describe('Number object and primitive comparisons.', function() {
            // 
            it('Identical number primitives are equal', function() {
                expect(_.isEqual(75, 75)).toBeTruthy();
            });
            it('Number objects with identical primitive values are equal', function() {
                expect(_.isEqual(new Number(75), new Number(75))).toBeTruthy();
            });
            it('Number primitives and their corresponding object wrappers are equal', function() {
                expect(_.isEqual(75, new Number(75))).toBeTruthy();
            });
            it('Commutative equality is implemented for number objects and primitives', function() {
                expect(_.isEqual(new Number(75), 75)).toBeTruthy();
            });
            it('`new Number(0)` and `-0` are not equal', function() {
                expect(_.isEqual(new Number(0), -0)).toBeFalsy();
            });
            it('Commutative equality is implemented for `new Number(0)` and `-0`', function() {
                expect(_.isEqual(0, new Number(-0))).toBeFalsy();
            });

            it('Number objects with different primitive values are not equal', function() {
                expect(_.isEqual(new Number(75), new Number(63))).toBeFalsy();
            });
            it('Number objects and objects with a `valueOf` method are not equal', function() {
                expect(_.isEqual(new Number(63), { valueOf: function() { return 63; } })).toBeFalsy();
            });

        });

        describe('Comparisons involving `NaN`.', function() {
            // 
            it('`NaN` is equal to `NaN`', function() {
                expect(_.isEqual(NaN, NaN)).toBeTruthy();
            });
            it('Object(`NaN`) is equal to `NaN`', function() {
                expect(_.isEqual(new Number(NaN), NaN)).toBeTruthy();
            });
            it('A number primitive is not equal to `NaN`', function() {
                expect(_.isEqual(61, NaN)).toBeFalsy();
            });
            it('A number object is not equal to `NaN`', function() {
                expect(_.isEqual(new Number(79), NaN)).toBeFalsy();
            });
            it('`Infinity` is not equal to `NaN`', function() {
                expect(_.isEqual(Infinity, NaN)).toBeFalsy();
            });

        });

        describe('Boolean object and primitive comparisons.', function() {
            // 
            it('Identical boolean primitives are equal', function() {
                expect(_.isEqual(true, true)).toBeTruthy();
            });
            it('Boolean objects with identical primitive values are equal', function() {
                expect(_.isEqual(new Boolean, new Boolean)).toBeTruthy();
            });
            it('Boolean primitives and their corresponding object wrappers are equal', function() {
                expect(_.isEqual(true, new Boolean(true))).toBeTruthy();
            });
            it('Commutative equality is implemented for booleans', function() {
                expect(_.isEqual(new Boolean(true), true)).toBeTruthy();
            });
            it('Boolean objects with different primitive values are not equal', function() {
                expect(_.isEqual(new Boolean(true), new Boolean)).toBeFalsy();
            });

        });

        describe('Common type coercions.', function() {
            // 
            it('`new Boolean(false)` is not equal to `true`', function() {
                expect(_.isEqual(new Boolean(false), true)).toBeFalsy();
            });
            it('String and number primitives with like values are not equal', function() {
                expect(_.isEqual('75', 75)).toBeFalsy();
            });
            it('String and number objects with like values are not equal', function() {
                expect(_.isEqual(new Number(63), new String(63))).toBeFalsy();
            });
            it('Commutative equality is implemented for like string and number values', function() {
                expect(_.isEqual(75, '75')).toBeFalsy();
            });
            it('Number and string primitives with like values are not equal', function() {
                expect(_.isEqual(0, '')).toBeFalsy();
            });
            it('Number and boolean primitives with like values are not equal', function() {
                expect(_.isEqual(1, true)).toBeFalsy();
            });
            it('Boolean and number objects with like values are not equal', function() {
                expect(_.isEqual(new Boolean(false), new Number(0))).toBeFalsy();
            });
            it('Boolean primitives and string objects with like values are not equal', function() {
                expect(_.isEqual(false, new String(''))).toBeFalsy();
            });
            it('Dates and their corresponding numeric primitive values are not equal', function() {
                expect(_.isEqual(12564504e5, new Date(2009, 9, 25))).toBeFalsy();
            });
        });


        describe('Dates.', function() {
            // 
            it('Date objects referencing identical times are equal', function() {
                expect(_.isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25))).toBeTruthy();
            });
            it('Date objects referencing different times are not equal', function() {
                expect(_.isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13))).toBeFalsy();
            });
            it('Date objects and objects with a `getTime` method are not equal', function() {
                expect(_.isEqual(new Date(2009, 11, 13), {
                    getTime: function() {
                        return 12606876e5;
                    }
                })).toBeFalsy();
            });
            it('Invalid dates are not equal', function() {
                expect(_.isEqual(new Date('Curly'), new Date('Curly'))).toBeFalsy();
            });


            // Functions.
            it('Different functions with identical bodies and source code representations are not equal', function() {
                expect(_.isEqual(First, Second)).toBeFalsy();
            });
        });


        describe('RegExps.', function() {
            // 
            it('RegExps with equivalent patterns and flags are equal', function() {
                expect(_.isEqual(/(?:)/gim, /(?:)/gim)).toBeTruthy();
            });
            it('Flag order is not significant', function() {
                expect(_.isEqual(/(?:)/gi, /(?:)/ig)).toBeTruthy();
            });
            it('RegExps with equivalent patterns and different flags are not equal', function() {
                expect(_.isEqual(/(?:)/g, /(?:)/gi)).toBeFalsy();
            });
            it('RegExps with different patterns and equivalent flags are not equal', function() {
                expect(_.isEqual(/Moe/gim, /Curly/gim)).toBeFalsy();
            });
            it('Commutative equality is implemented for RegExps', function() {
                expect(_.isEqual(/(?:)/gi, /(?:)/g)).toBeFalsy();
            });
            it('RegExps and RegExp-like objects are not equal', function() {
                expect(_.isEqual(/Curly/g, { source: 'Larry', global: true, ignoreCase: false, multiline: false })).toBeFalsy();
            });
        });


        describe('Empty arrays, array-like objects, and object literals.', function() {
            // 
            it('Empty object literals are equal', function() {
                expect(_.isEqual({}, {})).toBeTruthy();
            });
            it('Empty array literals are equal', function() {
                expect(_.isEqual([], [])).toBeTruthy();
            });
            it('Empty nested arrays and objects are equal', function() {
                expect(_.isEqual([{}], [{}])).toBeTruthy();
            });
            it('Array-like objects and arrays are not equal.', function() {
                expect(_.isEqual({ length: 0 }, [])).toBeFalsy();
            });
            it('Commutative equality is implemented for array-like objects', function() {
                expect(_.isEqual([], { length: 0 })).toBeFalsy();
            });

            it('Object literals and array literals are not equal', function() {
                expect(_.isEqual({}, [])).toBeFalsy();
            });
            it('Commutative equality is implemented for objects and arrays', function() {
                expect(_.isEqual([], {})).toBeFalsy();
            });
        });


        describe('Arrays with primitive and object values.', function() {
            it('Arrays containing identical primitives are equal', function() {
                expect(_.isEqual([1, 'Larry', true], [1, 'Larry', true])).toBeTruthy();
            });
            it('Arrays containing equivalent elements are equal', function() {
                expect(_.isEqual([/Moe/g, new Date(2009, 9, 25)], [/Moe/g, new Date(2009, 9, 25)])).toBeTruthy();
            });

        });
        // 
        describe('Multi-dimensional arrays.', function() {
            // 
            var a = [new Number(47), false, 'Larry', /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], { a: 47 }];
            var b = [new Number(47), false, 'Larry', /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], { a: 47 }];

            it('Arrays containing nested arrays and objects are recursively compared', function() {
                expect(_.isEqual(a, b)).toBeTruthy();
            });


            // Overwrite the methods defined in ES 5.1 section 15.4.4.
            a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
            b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

            // Array elements and properties.
            it('Arrays containing equivalent elements and different non-numeric properties are equal', function() {
                expect(_.isEqual(a, b)).toBeTruthy();
            });
            it('Arrays of different lengths are not equal', function() {
                a.push('White Rocks');
                expect(_.isEqual(a, b)).toBeFalsy();
            });
            it('Arrays of identical lengths containing different elements are not equal', function() {
                a.push('White Rocks');
                a.push('East Boulder');
                b.push('Gunbarrel Ranch', 'Teller Farm');
                expect(_.isEqual(a, b)).toBeFalsy();
            });
        });


        describe('Sparse arrays.', function() {
            it('Sparse arrays of identical lengths are equal', function() {
                expect(_.isEqual(Array(3), Array(3))).toBeTruthy();
            });
            it('Sparse arrays of different lengths are not equal when both are empty', function() {
                expect(_.isEqual(Array(3), Array(6))).toBeFalsy();
            });
            it('Handles sparse arrays as dense', function() {
                var sparse = [];
                sparse[1] = 5;
                expect(_.isEqual(sparse, [void 0, 5])).toBeTruthy();
            });
        });
        // 

        describe('Simple objects.', function () {
            it('Objects containing identical primitives are equal', function() {
                expect(_.isEqual({ a: 'Curly', b: 1, c: true }, { a: 'Curly', b: 1, c: true })).toBeTruthy();
            });
            it('Objects containing equivalent members are equal', function() {
                expect(_.isEqual({ a: /Curly/g, b: new Date(2009, 11, 13) }, { a: /Curly/g, b: new Date(2009, 11, 13) })).toBeTruthy();
            });
            it('Objects of identical sizes with different values are not equal', function() {
                expect(_.isEqual({ a: 63, b: 75 }, { a: 61, b: 55 })).toBeFalsy();
            });
            it('Objects of identical sizes with different property names are not equal', function() {
                expect(_.isEqual({ a: 63, b: 75 }, { a: 61, c: 55 })).toBeFalsy();
            });
            it('Objects of different sizes are not equal', function() {
                expect(_.isEqual({ a: 1, b: 2 }, { a: 1 })).toBeFalsy();
            });
            it('Commutative equality is implemented for objects', function() {
                expect(_.isEqual({ a: 1 }, { a: 1, b: 2 })).toBeFalsy();
            });
            it('Objects with identical keys and different values are not equivalent', function() {
                expect(_.isEqual({ x: 1, y: void 0 }, { x: 1, z: 2 })).toBeFalsy();
            });

        });
        // 

        it('Objects with nested equivalent members are recursively compared', function() {
            // `A` contains nested objects and arrays.
            var a = {
                name: new String('Moe Howard'),
                age: new Number(77),
                stooge: true,
                hobbies: ['acting'],
                film: {
                    name: 'Sing a Song of Six Pants',
                    release: new Date(1947, 9, 30),
                    stars: [new String('Larry Fine'), 'Shemp Howard'],
                    minutes: new Number(16),
                    seconds: 54
                }
            };

            // `B` contains equivalent nested objects and arrays.
            var b = {
                name: new String('Moe Howard'),
                age: new Number(77),
                stooge: true,
                hobbies: ['acting'],
                film: {
                    name: 'Sing a Song of Six Pants',
                    release: new Date(1947, 9, 30),
                    stars: [new String('Larry Fine'), 'Shemp Howard'],
                    minutes: new Number(16),
                    seconds: 54
                }
            };
            expect(_.isEqual(a, b)).toBeTruthy();
        });

        describe('Instances.', function() {
            // 
            it('Object instances are equal', function() {
                expect(_.isEqual(new First, new First)).toBeTruthy();
            });
            it('Objects with different constructors and identical own properties are not equal', function() {
                expect(_.isEqual(new First, new Second)).toBeFalsy();
            });
            it('Object instances and objects sharing equivalent properties are not equal', function() {
                expect(_.isEqual({ value: 1 }, new First)).toBeFalsy();
            });
            it('The prototype chain of objects should not be examined', function() {
                expect(_.isEqual({ value: 2 }, new Second)).toBeFalsy();
            });

        });

        describe('// Circular Arrays.', function() {
            var a, b;
            (a = []).push(a);
            (b = []).push(b);
            it('Arrays containing circular references are equal', function() {
                expect(_.isEqual(a, b)).toBeTruthy();
            });
            it('Arrays containing circular references and equivalent properties are equal', function() {
                a.push(new String('Larry'));
                b.push(new String('Larry'));
                expect(_.isEqual(a, b)).toBeTruthy();
            });
            it('Arrays containing circular references and different properties are not equal', function() {
                a.push('Shemp');
                b.push('Curly');
                expect(_.isEqual(a, b)).toBeFalsy();
            });

        });

        describe('// More circular arrays #767.', function () {
            it('Comparison of circular references with non-circular references are not equal', function() {
                var a = ['everything is checked but', 'this', 'is not'];
                a[1] = a;
                var b = ['everything is checked but', ['this', 'array'], 'is not'];
                expect(_.isEqual(a, b)).toBeFalsy();
            });

            describe('// Circular Objects.', function() {
                var a = { abc: null };
                var b = { abc: null };
                it('Objects containing circular references are equal', function() {
                    a.abc = a;
                    b.abc = b;
                    expect(_.isEqual(a, b)).toBeTruthy();
                });
                it('Objects containing circular references and equivalent properties are equal', function() {
                    a.def = 75;
                    b.def = 75;
                    expect(_.isEqual(a, b)).toBeTruthy();
                });
                it('Objects containing circular references and different properties are not equal', function() {
                    a.def = new Number(75);
                    b.def = new Number(63);
                    expect(_.isEqual(a, b)).toBeFalsy();
                });

            });

        });

        describe('// More circular objects #767.', function () {
            it('Comparison of circular references with non-circular object references are not equal', function() {
                var a = { everything: 'is checked', but: 'this', is: 'not' };
                a.but = a;
                var b = { everything: 'is checked', but: { that: 'object' }, is: 'not' };
                expect(_.isEqual(a, b)).toBeFalsy();
            });
            describe('// Cyclic Structures.', function() {
                var a = [{ abc: null }];
                var b = [{ abc: null }];
                it('Cyclic structures are equal', function() {
                    (a[0].abc = a).push(a);
                    (b[0].abc = b).push(b);
                    expect(_.isEqual(a, b)).toBeTruthy();
                });
                it('Cyclic structures containing equivalent properties are equal', function() {
                    a[0].def = 'Larry';
                    b[0].def = 'Larry';
                    expect(_.isEqual(a, b)).toBeTruthy();
                });
                it('Cyclic structures containing different properties are not equal', function() {
                    a[0].def = new String('Larry');
                    b[0].def = new String('Curly');
                    expect(_.isEqual(a, b)).toBeFalsy();
                });

            });

            it('Cyclic structures with nested and identically-named properties are equal', function() {
                // Complex Circular References.
                var a = { foo: { b: { foo: { c: { foo: null } } } } };
                var b = { foo: { b: { foo: { c: { foo: null } } } } };
                a.foo.b.foo.c.foo = a;
                b.foo.b.foo.c.foo = b;
                expect(_.isEqual(a, b)).toBeTruthy();
            });

            it('Chained objects containing different values are not equal', function() {
                // Chaining.
                expect(_.isEqual(_({ x: 1, y: void 0 }).chain(), _({ x: 1, z: 2 }).chain())).toBeFalsy();
            });

            it('`isEqual` can be chained', function() {
                var a = _({ x: 1, y: 2 }).chain();
                var b = _({ x: 1, y: 2 }).chain();
                expect(_.isEqual(a.isEqual(b), _(true))).toBe(true);
            });

            it('Handles objects without a constructor (e.g. from Object.create', function() {
                // Objects without a `constructor` property
                if (Object.create) {
                    var a = Object.create(null, { x: { value: 1, enumerable: true } });
                    var b = { x: 1 };
                    expect(_.isEqual(a, b)).toBeTruthy();
                }
            });

        });


        it('Objects from different constructors are not equal', function() {
            function Foo() { this.a = 1; }

            Foo.prototype.constructor = null;

            var other = { a: 1 };
            expect(_.isEqual(new Foo, other)).toBe(false);
        });


        it('// Tricky object cases val comparisons', function() {
            expect(_.isEqual([0], [-0])).toBe(false);
            expect(_.isEqual({ a: 0 }, { a: -0 })).toBe(false);
            expect(_.isEqual([NaN], [NaN])).toBe(true);
            expect(_.isEqual({ a: NaN }, { a: NaN })).toBe(true);
        });


        it('A symbol is equal to itself', function() {
            if (typeof Symbol !== 'undefined') {
                var symbol = Symbol('x');
                expect(_.isEqual(symbol, symbol)).toBe(true);
                expect(_.isEqual(symbol, Object(symbol))).toBe(true);
                expect(_.isEqual(symbol, null)).toBe(false);
            }
        });


    });

    describe('isEmpty', function () {
        describe('basic tests', function () {
            it('[1] is not empty', function() {
                expect(_([1]).isEmpty()).toBeFalsy();
            });
            it('[] is empty', function() {
                expect(_.isEmpty([])).toBeTruthy();
            });
            it('{one: 1} is not empty', function() {
                expect(_.isEmpty({ one: 1 })).toBeFalsy();
            });
            it('{} is empty', function() {
                expect(_.isEmpty({})).toBeTruthy();
            });
            it('objects with prototype properties are empty', function() {
                expect(_.isEmpty(new RegExp(''))).toBeTruthy();
            });
            it('null is empty', function() {
                expect(_.isEmpty(null)).toBeTruthy();
            });
            it('undefined is empty', function() {
                expect(_.isEmpty()).toBeTruthy();
            });
            it('the empty string is empty', function() {
                expect(_.isEmpty('')).toBeTruthy();
            });
            it('but other strings are not', function() {
                expect(_.isEmpty('moe')).toBeFalsy();
            });

        });

        it('deleting all the keys from an object empties it', function() {
            var obj = { one: 1 };
            delete obj.one;
            expect(_.isEmpty(obj)).toBeTruthy();
        });

        it('empty arguments object is empty and non-empty arguments object is not empty', function() {
            var args = function() { return arguments; };
            expect(_.isEmpty(args())).toBeTruthy();
            expect(_.isEmpty(args(''))).toBeFalsy();
        });

        it('non-enumerable property is not empty', function() {
            // covers collecting non-enumerable properties in IE < 9
            var nonEnumProp = { toString: 5 };
            expect(_.isEmpty(nonEnumProp)).toBeFalsy();
        });

    });

    var testElement = angular.element('<div id="test">1111</div>');
    it('strings are not dom elements and an element is a DOM element', function() {
        if (typeof document === 'object') {
            expect(_.isElement('div')).toBeFalsy();
            expect(_.isElement(testElement)).toBeFalsy();
        }
    });
    

    describe('isArguments', function () {
        var args = (function () { return arguments; }(1, 2, 3));
        it('a string is not an arguments object', function() {
            expect(_.isArguments('string')).toBeFalsy();
        });
        it('a function is not an arguments object', function() {
            expect(_.isArguments(_.isArguments)).toBeFalsy();
        });
        it('but the arguments object is an arguments object', function() {
            expect(_.isArguments(args)).toBeTruthy();
        });
        it('but not when it\'s converted into an array', function() {
            expect(_.isArguments(_.toArray(args))).toBeFalsy();
        });
        it('and not vanilla arrays.', function() {
            expect(_.isArguments([1, 2, 3])).toBeFalsy();
        });

    });

    describe('isObject', function () {
        it('the arguments object is object', function() {
            expect(_.isObject(arguments)).toBeTruthy();
        });
        it('and arrays', function() {
            expect(_.isObject([1, 2, 3])).toBeTruthy();
        });
        it('and DOM element', function() {
            if (testElement) {
                expect(_.isObject(testElement)).toBeTruthy();
            }
        });
        it('and functions', function() {
            expect(_.isObject(function() {})).toBeTruthy();
        });
        it('but not null', function() {
            expect(_.isObject(null)).toBeFalsy();
        });
        it('and not undefined', function() {
            expect(_.isObject(void 0)).toBeFalsy();
        });
        it('and not string', function() {
            expect(_.isObject('string')).toBeFalsy();
        });
        it('and not number', function() {
            expect(_.isObject(12)).toBeFalsy();
        });
        it('and not boolean', function() {
            expect(_.isObject(true)).toBeFalsy();
        });
        it('but new String()', function() {
            expect(_.isObject(new String('string'))).toBeTruthy();
        });

    });

    describe('isArray', function () {
        it('undefined vars are not arrays', function() {
            expect(_.isArray(void 0)).toBeFalsy();
        });
        it('the arguments object is not an array', function() {
            expect(_.isArray(arguments)).toBeFalsy();
        });
        it('but arrays are', function() {
            expect(_.isArray([1, 2, 3])).toBeTruthy();
        });

    });

    describe('isString', function () {
        var obj = new String('I am a string object');
        it('an element is not a string', function() {
            if (testElement) {
                expect(_.isString(testElement)).toBeFalsy();
            }
        });
        it('but strings are', function() {
            expect(_.isString([1, 2, 3].join(', '))).toBeTruthy();
        });
        it('string literals are', function() {
            expect(_.isString('I am a string literal')).toBe(true);
        });
        it('so are String objects', function() {
            expect(_.isString(obj)).toBeTruthy();
            expect(_.isString(1)).toBe(false);
        });

    });

    describe('isSymbol', function () {
        it('numbers are not symbols', function() {
            expect(_.isSymbol(0)).toBeFalsy();
        });
        it('strings are not symbols', function() {
            expect(_.isSymbol('')).toBeFalsy();
        });
        it('functions are not symbols', function() {
            expect(_.isSymbol(_.isSymbol)).toBeFalsy();
        });
        it('symbol function', function() {
            if (typeof Symbol === 'function') {
                expect(_.isSymbol(Symbol())).toBeTruthy();
                expect(_.isSymbol(Symbol('description'))).toBeTruthy();
                expect(_.isSymbol(Object(Symbol()))).toBeTruthy();
            }
        });

    });

    describe('isNumber', function () {
        it('a string is not a number', function() {
            expect(_.isNumber('string')).toBeFalsy();
        });
        it('the arguments object is not a number', function() {
            expect(_.isNumber(arguments)).toBeFalsy();
        });
        it('undefined is not a number', function() {
            expect(_.isNumber(void 0)).toBeFalsy();
        });
        it('but numbers are', function() {
            expect(_.isNumber(3 * 4 - 7 / 10)).toBeTruthy();
        });
        it('NaN *is* a number', function() {
            expect(_.isNumber(NaN)).toBeTruthy();
        });
        it('Infinity is a number', function() {
            expect(_.isNumber(Infinity)).toBeTruthy();
        });
        it('numeric strings are not numbers', function() {
            expect(_.isNumber('1')).toBeFalsy();
        });

    });

    describe('isBoolean', function () {
        it('a number is not a boolean', function() {
            expect(_.isBoolean(2)).toBeFalsy();
        });
        it('a string is not a boolean', function() {
            expect(_.isBoolean('string')).toBeFalsy();
        });
        it('the string "false" is not a boolean', function() {
            expect(_.isBoolean('false')).toBeFalsy();
        });
        it('the string "true" is not a boolean', function() {
            expect(_.isBoolean('true')).toBeFalsy();
        });
        it('the arguments object is not a boolean', function() {
            expect(_.isBoolean(arguments)).toBeFalsy();
        });
        it('undefined is not a boolean', function() {
            expect(_.isBoolean(void 0)).toBeFalsy();
        });
        it('NaN is not a boolean', function() {
            expect(_.isBoolean(NaN)).toBeFalsy();
        });
        it('null is not a boolean', function() {
            expect(_.isBoolean(null)).toBeFalsy();
        });
        it('but true is', function() {
            expect(_.isBoolean(true)).toBeTruthy();
        });
        it('and so is false', function() {
            expect(_.isBoolean(false)).toBeTruthy();
        });

    });

    describe('isMap', function () {
        it('a string is not a map', function() {
            expect(_.isMap('string')).toBeFalsy();
        });
        it('a number is not a map', function() {
            expect(_.isMap(2)).toBeFalsy();
        });
        it('an object is not a map', function() {
            expect(_.isMap({})).toBeFalsy();
        });
        it('a boolean is not a map', function() {
            expect(_.isMap(false)).toBeFalsy();
        });
        it('undefined is not a map', function() {
            expect(_.isMap(void 0)).toBeFalsy();
        });
        it('an array is not a map', function() {
            expect(_.isMap([1, 2, 3])).toBeFalsy();
        });
        it('a set is not a map', function() {
            if (typeof Set === 'function') {
                expect(_.isMap(new Set())).toBeFalsy();
            }
        });
        it('a weakset is not a map', function() {
            if (typeof WeakSet === 'function') {
                expect(_.isMap(new WeakSet())).toBeFalsy();
            }
        });
        it('but a map is', function() {
            if (typeof Map === 'function') {
                var keyString = 'a string';
                var obj = new Map();
                obj.set(keyString, 'value');
                expect(_.isMap(obj)).toBeTruth();
            }
        });

    });

    describe('isWeakMap', function () {
        it('a string is not a weakmap', function() {
            expect(_.isWeakMap('string')).toBeFalsy();
        });
        it('a number is not a weakmap', function() {
            expect(_.isWeakMap(2)).toBeFalsy();
        });
        it('an object is not a weakmap', function() {
            expect(_.isWeakMap({})).toBeFalsy();
        });
        it('a boolean is not a weakmap', function() {
            expect(_.isWeakMap(false)).toBeFalsy();
        });
        it('undefined is not a weakmap', function() {
            expect(_.isWeakMap(void 0)).toBeFalsy();
        });
        it('an array is not a weakmap', function() {
            expect(_.isWeakMap([1, 2, 3])).toBeFalsy();
        });
        it('a set is not a weakmap', function() {
            if (typeof Set === 'function') {
                expect(_.isWeakMap(new Set())).toBeFalsy();
            }
        });
        it('a weakset is not a weakmap', function() {
            if (typeof WeakSet === 'function') {
                expect(_.isWeakMap(new WeakSet())).toBeFalsy();
            }
        });
        it('a map is not a weakmap', function() {
            if (typeof Map === 'function') {
                expect(_.isWeakMap(new Map())).toBeFalsy();
            }
        });
        it('but a weakmap is', function() {
            if (typeof WeakMap === 'function') {
                var keyObj = {}, obj = new WeakMap();
                obj.set(keyObj, 'value');
                expect(_.isWeakMap(obj)).toBeTruthy();
            }
        });

    });

    describe('isSet', function () {
        it('a string is not a set', function() {
            expect(_.isSet('string')).toBeFalsy();
        });
        it('a number is not a set', function() {
            expect(_.isSet(2)).toBeFalsy();
        });
        it('an object is not a set', function() {
            expect(_.isSet({})).toBeFalsy();
        });
        it('a boolean is not a set', function() {
            expect(_.isSet(false)).toBeFalsy();
        });
        it('undefined is not a set', function() {
            expect(_.isSet(void 0)).toBeFalsy();
        });
        it('an array is not a set', function() {
            expect(_.isSet([1, 2, 3])).toBeFalsy();
        });
        it('a map is not a set', function() {
            if (typeof Map === 'function') {
                expect(_.isSet(new Map())).toBeFalsy();
            }
        });
        it('a weakmap is not a set', function() {
            if (typeof WeakMap === 'function') {
                expect(_.isSet(new WeakMap())).toBeFalsy();
            }
        });
        it('a weakset is not a set', function() {
            if (typeof WeakSet === 'function') {
                expect(_.isSet(new WeakSet())).toBeFalsy();
            }
        });
        it('but a set is', function() {
            if (typeof Set === 'function') {
                var obj = new Set();
                obj.add(1).add('string').add(false).add({});
                expect(_.isSet(obj)).toBeTruthy();
            }
        });

    });

    QUnit.test('isWeakSet', function (assert) {

        assert.notOk(_.isWeakSet('string'), 'a string is not a weakset');
        assert.notOk(_.isWeakSet(2), 'a number is not a weakset');
        assert.notOk(_.isWeakSet({}), 'an object is not a weakset');
        assert.notOk(_.isWeakSet(false), 'a boolean is not a weakset');
        assert.notOk(_.isWeakSet(void 0), 'undefined is not a weakset');
        assert.notOk(_.isWeakSet([1, 2, 3]), 'an array is not a weakset');
        if (typeof Map === 'function') {
            assert.notOk(_.isWeakSet(new Map()), 'a map is not a weakset');
        }
        if (typeof WeakMap === 'function') {
            assert.notOk(_.isWeakSet(new WeakMap()), 'a weakmap is not a weakset');
        }
        if (typeof Set === 'function') {
            assert.notOk(_.isWeakSet(new Set()), 'a set is not a weakset');
        }
        if (typeof WeakSet === 'function') {
            var obj = new WeakSet();
            obj.add({ x: 1 }, { y: 'string' }).add({ y: 'string' }).add({ z: [1, 2, 3] });
            expect(_.isWeakSet(obj), 'but a weakset is');
        }
    });

    QUnit.test('isFunction', function (assert) {
        assert.notOk(_.isFunction(void 0), 'undefined vars are not functions');
        assert.notOk(_.isFunction([1, 2, 3]), 'arrays are not functions');
        assert.notOk(_.isFunction('moe'), 'strings are not functions');
        expect(_.isFunction(_.isFunction), 'but functions are');
        expect(_.isFunction(function () { }), 'even anonymous ones');

        if (testElement) {
            assert.notOk(_.isFunction(testElement), 'elements are not functions');
        }

        var nodelist = typeof document != 'undefined' && document.childNodes;
        if (nodelist) {
            assert.notOk(_.isFunction(nodelist));
        }
    });

    if (typeof Int8Array !== 'undefined') {
        QUnit.test('#1929 Typed Array constructors are functions', function (assert) {
            _.chain(['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array'])
            .map(_.propertyOf(typeof GLOBAL != 'undefined' ? GLOBAL : window))
            .compact()
            .each(function (TypedArray) {
                // PhantomJS reports `typeof UInt8Array == 'object'` and doesn't report toString TypeArray
                // as a function
                expect(_.isFunction(TypedArray), Object.prototype.toString.call(TypedArray) === '[object Function]');
            });
        });
    }

    QUnit.test('isDate', function (assert) {
        assert.notOk(_.isDate(100), 'numbers are not dates');
        assert.notOk(_.isDate({}), 'objects are not dates');
        expect(_.isDate(new Date()), 'but dates are');
    });

    QUnit.test('isRegExp', function (assert) {
        assert.notOk(_.isRegExp(_.identity), 'functions are not RegExps');
        expect(_.isRegExp(/identity/), 'but RegExps are');
    });

    QUnit.test('isFinite', function (assert) {
        assert.notOk(_.isFinite(void 0), 'undefined is not finite');
        assert.notOk(_.isFinite(null), 'null is not finite');
        assert.notOk(_.isFinite(NaN), 'NaN is not finite');
        assert.notOk(_.isFinite(Infinity), 'Infinity is not finite');
        assert.notOk(_.isFinite(-Infinity), '-Infinity is not finite');
        expect(_.isFinite('12'), 'Numeric strings are numbers');
        assert.notOk(_.isFinite('1a'), 'Non numeric strings are not numbers');
        assert.notOk(_.isFinite(''), 'Empty strings are not numbers');
        var obj = new Number(5);
        expect(_.isFinite(obj), 'Number instances can be finite');
        expect(_.isFinite(0), '0 is finite');
        expect(_.isFinite(123), 'Ints are finite');
        expect(_.isFinite(-12.44), 'Floats are finite');
        if (typeof Symbol === 'function') {
            assert.notOk(_.isFinite(Symbol()), 'symbols are not numbers');
            assert.notOk(_.isFinite(Symbol('description')), 'described symbols are not numbers');
            assert.notOk(_.isFinite(Object(Symbol())), 'boxed symbols are not numbers');
        }
    });

    QUnit.test('isNaN', function (assert) {
        assert.notOk(_.isNaN(void 0), 'undefined is not NaN');
        assert.notOk(_.isNaN(null), 'null is not NaN');
        assert.notOk(_.isNaN(0), '0 is not NaN');
        assert.notOk(_.isNaN(new Number(0)), 'wrapped 0 is not NaN');
        expect(_.isNaN(NaN), 'but NaN is');
        expect(_.isNaN(new Number(NaN)), 'wrapped NaN is still NaN');
        if (typeof Symbol !== 'undefined') {
            assert.notOk(_.isNaN(Symbol()), 'symbol is not NaN');
        }
    });

    QUnit.test('isNull', function (assert) {
        assert.notOk(_.isNull(void 0), 'undefined is not null');
        assert.notOk(_.isNull(NaN), 'NaN is not null');
        expect(_.isNull(null), 'but null is');
    });

    QUnit.test('isUndefined', function (assert) {
        assert.notOk(_.isUndefined(1), 'numbers are defined');
        assert.notOk(_.isUndefined(null), 'null is defined');
        assert.notOk(_.isUndefined(false), 'false is defined');
        assert.notOk(_.isUndefined(NaN), 'NaN is defined');
        expect(_.isUndefined(), 'nothing is undefined');
        expect(_.isUndefined(void 0), 'undefined is undefined');
    });

    QUnit.test('isError', function (assert) {
        assert.notOk(_.isError(1), 'numbers are not Errors');
        assert.notOk(_.isError(null), 'null is not an Error');
        assert.notOk(_.isError(Error), 'functions are not Errors');
        expect(_.isError(new Error()), 'Errors are Errors');
        expect(_.isError(new EvalError()), 'EvalErrors are Errors');
        expect(_.isError(new RangeError()), 'RangeErrors are Errors');
        expect(_.isError(new ReferenceError()), 'ReferenceErrors are Errors');
        expect(_.isError(new SyntaxError()), 'SyntaxErrors are Errors');
        expect(_.isError(new TypeError()), 'TypeErrors are Errors');
        expect(_.isError(new URIError()), 'URIErrors are Errors');
    });

    QUnit.test('tap', function (assert) {
        var intercepted = null;
        var interceptor = function (obj) { intercepted = obj; };
        var returned = _.tap(1, interceptor);
        expect(intercepted, 1, 'passes tapped object to interceptor');
        expect(returned, 1, 'returns tapped object');

        returned = _([1, 2, 3]).chain().
          map(function (n) { return n * 2; }).
          max().
          tap(interceptor).
          value();
        expect(returned, 6, 'can use tapped objects in a chain');
        expect(intercepted, returned, 'can use tapped objects in a chain');
    });

    QUnit.test('has', function (assert) {
        var obj = { foo: 'bar', func: function () { } };
        expect(_.has(obj, 'foo'), 'checks that the object has a property.');
        assert.notOk(_.has(obj, 'baz'), "returns false if the object doesn't have the property.");
        expect(_.has(obj, 'func'), 'works for functions too.');
        obj.hasOwnProperty = null;
        expect(_.has(obj, 'foo'), 'works even when the hasOwnProperty method is deleted.');
        var child = {};
        child.prototype = obj;
        assert.notOk(_.has(child, 'foo'), 'does not check the prototype chain for a property.');
        expect(_.has(null, 'foo'), false, 'returns false for null');
        expect(_.has(void 0, 'foo'), false, 'returns false for undefined');

        expect(_.has({ a: { b: 'foo' } }, ['a', 'b']), 'can check for nested properties.');
        assert.notOk(_.has({ a: child }, ['a', 'foo']), 'does not check the prototype of nested props.');
    });

    QUnit.test('property', function (assert) {
        var stooge = { name: 'moe' };
        expect(_.property('name')(stooge), 'moe', 'should return the property with the given name');
        expect(_.property('name')(null), void 0, 'should return undefined for null values');
        expect(_.property('name')(void 0), void 0, 'should return undefined for undefined values');
        expect(_.property(null)('foo'), void 0, 'should return undefined for null object');
        expect(_.property('x')({ x: null }), null, 'can fetch null values');
        expect(_.property('length')(null), void 0, 'does not crash on property access of non-objects');

        // Deep property access
        expect(_.property('a')({ a: 1 }), 1, 'can get a direct property');
        expect(_.property(['a', 'b'])({ a: { b: 2 } }), 2, 'can get a nested property');
        expect(_.property(['a'])({ a: false }), false, 'can fetch falsy values');
        expect(_.property(['x', 'y'])({ x: { y: null } }), null, 'can fetch null values deeply');
        expect(_.property(['x', 'y'])({ x: null }), void 0, 'does not crash on property access of nested non-objects');
        expect(_.property([])({ x: 'y' }), void 0, 'returns `undefined` for a path that is an empty array');
    });

    QUnit.test('propertyOf', function (assert) {
        var stoogeRanks = _.propertyOf({ curly: 2, moe: 1, larry: 3 });
        expect(stoogeRanks('curly'), 2, 'should return the property with the given name');
        expect(stoogeRanks(null), void 0, 'should return undefined for null values');
        expect(stoogeRanks(void 0), void 0, 'should return undefined for undefined values');
        expect(_.propertyOf({ a: null })('a'), null, 'can fetch null values');

        function MoreStooges() { this.shemp = 87; }
        MoreStooges.prototype = { curly: 2, moe: 1, larry: 3 };
        var moreStoogeRanks = _.propertyOf(new MoreStooges());
        expect(moreStoogeRanks('curly'), 2, 'should return properties from further up the prototype chain');

        var nullPropertyOf = _.propertyOf(null);
        expect(nullPropertyOf('curly'), void 0, 'should return undefined when obj is null');

        var undefPropertyOf = _.propertyOf(void 0);
        expect(undefPropertyOf('curly'), void 0, 'should return undefined when obj is undefined');

        var deepPropertyOf = _.propertyOf({ curly: { number: 2 }, joe: { number: null } });
        expect(deepPropertyOf(['curly', 'number']), 2, 'can fetch nested properties of obj');
        expect(deepPropertyOf(['joe', 'number']), null, 'can fetch nested null properties of obj');
    });

    QUnit.test('isMatch', function (assert) {
        var moe = { name: 'Moe Howard', hair: true };
        var curly = { name: 'Curly Howard', hair: false };

        expect(_.isMatch(moe, { hair: true }), true, 'Returns a boolean');
        expect(_.isMatch(curly, { hair: true }), false, 'Returns a boolean');

        expect(_.isMatch(5, { __x__: void 0 }), false, 'can match undefined props on primitives');
        expect(_.isMatch({ __x__: void 0 }, { __x__: void 0 }), true, 'can match undefined props');

        expect(_.isMatch(null, {}), true, 'Empty spec called with null object returns true');
        expect(_.isMatch(null, { a: 1 }), false, 'Non-empty spec called with null object returns false');

        _.each([null, void 0], function (item) { expect(_.isMatch(item, null), true, 'null matches null'); });
        _.each([null, void 0], function (item) { expect(_.isMatch(item, null), true, 'null matches {}'); });
        expect(_.isMatch({ b: 1 }, { a: void 0 }), false, 'handles undefined values (1683)');

        _.each([true, 5, NaN, null, void 0], function (item) {
            expect(_.isMatch({ a: 1 }, item), true, 'treats primitives as empty');
        });

        function Prototest() { }
        Prototest.prototype.x = 1;
        var specObj = new Prototest;
        expect(_.isMatch({ x: 2 }, specObj), true, 'spec is restricted to own properties');

        specObj.y = 5;
        expect(_.isMatch({ x: 1, y: 5 }, specObj), true);
        expect(_.isMatch({ x: 1, y: 4 }, specObj), false);

        expect(_.isMatch(specObj, { x: 1, y: 5 }), 'inherited and own properties are checked on the test object');

        Prototest.x = 5;
        expect(_.isMatch({ x: 5, y: 1 }, Prototest), 'spec can be a function');

        //null edge cases
        var oCon = { constructor: Object };
        expect(_.map([null, void 0, 5, {}], _.partial(_.isMatch, _, oCon)), [false, false, false, true], 'doesnt falsy match constructor on undefined/null');
    });

    QUnit.test('matcher', function (assert) {
        var moe = { name: 'Moe Howard', hair: true };
        var curly = { name: 'Curly Howard', hair: false };
        var stooges = [moe, curly];

        expect(_.matcher({ hair: true })(moe), true, 'Returns a boolean');
        expect(_.matcher({ hair: true })(curly), false, 'Returns a boolean');

        expect(_.matcher({ __x__: void 0 })(5), false, 'can match undefined props on primitives');
        expect(_.matcher({ __x__: void 0 })({ __x__: void 0 }), true, 'can match undefined props');

        expect(_.matcher({})(null), true, 'Empty spec called with null object returns true');
        expect(_.matcher({ a: 1 })(null), false, 'Non-empty spec called with null object returns false');

        expect(_.find(stooges, _.matcher({ hair: false })), curly, 'returns a predicate that can be used by finding functions.');
        expect(_.find(stooges, _.matcher(moe)), moe, 'can be used to locate an object exists in a collection.');
        expect(_.filter([null, void 0], _.matcher({ a: 1 })), [], 'Do not throw on null values.');

        expect(_.filter([null, void 0], _.matcher(null)), [null, void 0], 'null matches null');
        expect(_.filter([null, void 0], _.matcher({})), [null, void 0], 'null matches {}');
        expect(_.filter([{ b: 1 }], _.matcher({ a: void 0 })), [], 'handles undefined values (1683)');

        _.each([true, 5, NaN, null, void 0], function (item) {
            expect(_.matcher(item)({ a: 1 }), true, 'treats primitives as empty');
        });

        function Prototest() { }
        Prototest.prototype.x = 1;
        var specObj = new Prototest;
        var protospec = _.matcher(specObj);
        expect(protospec({ x: 2 }), true, 'spec is restricted to own properties');

        specObj.y = 5;
        protospec = _.matcher(specObj);
        expect(protospec({ x: 1, y: 5 }), true);
        expect(protospec({ x: 1, y: 4 }), false);

        expect(_.matcher({ x: 1, y: 5 })(specObj), 'inherited and own properties are checked on the test object');

        Prototest.x = 5;
        expect(_.matcher(Prototest)({ x: 5, y: 1 }), 'spec can be a function');

        // #1729
        var o = { b: 1 };
        var m = _.matcher(o);

        expect(m({ b: 1 }), true);
        o.b = 2;
        o.a = 1;
        expect(m({ b: 1 }), true, 'changing spec object doesnt change matches result');


        //null edge cases
        var oCon = _.matcher({ constructor: Object });
        expect(_.map([null, void 0, 5, {}], oCon), [false, false, false, true], 'doesnt falsy match constructor on undefined/null');
    });

    QUnit.test('matches', function (assert) {
        expect(_.matches, _.matcher, 'is an alias for matcher');
    });

    QUnit.test('findKey', function (assert) {
        var objects = {
            a: { a: 0, b: 0 },
            b: { a: 1, b: 1 },
            c: { a: 2, b: 2 }
        };

        expect(_.findKey(objects, function (obj) {
            return obj.a === 0;
        }), 'a');

        expect(_.findKey(objects, function (obj) {
            return obj.b * obj.a === 4;
        }), 'c');

        expect(_.findKey(objects, 'a'), 'b', 'Uses lookupIterator');

        expect(_.findKey(objects, function (obj) {
            return obj.b * obj.a === 5;
        }), void 0);

        expect(_.findKey([1, 2, 3, 4, 5, 6], function (obj) {
            return obj === 3;
        }), '2', 'Keys are strings');

        expect(_.findKey(objects, function (a) {
            return a.foo === null;
        }), void 0);

        _.findKey({ a: { a: 1 } }, function (a, key, obj) {
            expect(key, 'a');
            expect(obj, { a: { a: 1 } });
            expect(this, objects, 'called with context');
        }, objects);

        var array = [1, 2, 3, 4];
        array.match = 55;
        expect(_.findKey(array, function (x) { return x === 55; }), 'match', 'matches array-likes keys');
    });


    QUnit.test('mapObject', function (assert) {
        var obj = { a: 1, b: 2 };
        var objects = {
            a: { a: 0, b: 0 },
            b: { a: 1, b: 1 },
            c: { a: 2, b: 2 }
        };

        expect(_.mapObject(obj, function (val) {
            return val * 2;
        }), { a: 2, b: 4 }, 'simple objects');

        expect(_.mapObject(objects, function (val) {
            return _.reduce(val, function (memo, v) {
                return memo + v;
            }, 0);
        }), { a: 0, b: 2, c: 4 }, 'nested objects');

        expect(_.mapObject(obj, function (val, key, o) {
            return o[key] * 2;
        }), { a: 2, b: 4 }, 'correct keys');

        expect(_.mapObject([1, 2], function (val) {
            return val * 2;
        }), { 0: 2, 1: 4 }, 'check behavior for arrays');

        expect(_.mapObject(obj, function (val) {
            return val * this.multiplier;
        }, { multiplier: 3 }), { a: 3, b: 6 }, 'keep context');

        expect(_.mapObject({ a: 1 }, function () {
            return this.length;
        }, [1, 2]), { a: 2 }, 'called with context');

        var ids = _.mapObject({ length: 2, 0: { id: '1' }, 1: { id: '2' } }, function (n) {
            return n.id;
        });
        expect(ids, { length: void 0, 0: '1', 1: '2' }, 'Check with array-like objects');

        // Passing a property name like _.pluck.
        var people = { a: { name: 'moe', age: 30 }, b: { name: 'curly', age: 50 } };
        expect(_.mapObject(people, 'name'), { a: 'moe', b: 'curly' }, 'predicate string map to object properties');

        _.each([null, void 0, 1, 'abc', [], {}, void 0], function (val) {
            expect(_.mapObject(val, _.identity), {}, 'mapValue identity');
        });

        var Proto = function () { this.a = 1; };
        Proto.prototype.b = 1;
        var protoObj = new Proto();
        expect(_.mapObject(protoObj, _.identity), { a: 1 }, 'ignore inherited values from prototypes');

    });
})