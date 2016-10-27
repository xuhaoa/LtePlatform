/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>

describe('cross document tests', function() {
    // Setup remote variables for iFrame tests.
    var iframe = document.createElement('iframe');
    iframe.frameBorder = iframe.height = iframe.width = 0;
    it('document test', function() {
        expect(document.body).toBeDefined();
    });
    document.body.appendChild(iframe);
    //var iframeContent = iframe.contentDocument || iframe.contentWindow;
    //var iDoc = iframeContent.document || iframeContent;
    var iNumber;
    var iObject;
    var iArray;
    //iDoc.write(
    //    [
    //        '<script>',
    //        'parent.iElement = document.createElement("div");',
    //        'parent.iArguments = (function(){ return arguments; })(1, 2, 3);',
    //        'parent.iArray = [1, 2, 3];',
    //        'parent.iString = new String("hello");',
    //        'parent.iNumber = new Number(100);',
    //        'parent.iFunction = (function(){});',
    //        'parent.iDate = new Date();',
    //        'parent.iRegExp = /hi/;',
    //        'parent.iNaN = NaN;',
    //        'parent.iNull = null;',
    //        'parent.iBoolean = new Boolean(false);',
    //        'parent.iUndefined = undefined;',
    //        'parent.iObject = {};',
    //        'parent.iError = new Error();',
    //        '</script>'
    //    ].join('\n')
    //);
    //iDoc.close();

    describe('isEqual', function() {

        it('Objects with equivalent members created in different documents are equal', function() {
            expect(_.isEqual(iNumber, 101)).toBeFalsy();
            expect(_.isEqual(iNumber, 100)).toBeTruthy();

            // Objects from another frame.
            expect(_.isEqual({}, iObject)).toBeTruthy();
        });

        it('Arrays with equivalent elements created in different documents are equal', function() {
            // Array from another frame.
            expect(_.isEqual([1, 2, 3], iArray)).toBeTruthy();
        });

    });

    QUnit.test('isEmpty', function(assert) {
        assert.notOk(_([iNumber]).isEmpty(), '[1] is not empty');
        assert.notOk(_.isEmpty(iArray), '[] is empty');
        assert.ok(_.isEmpty(iObject), '{} is empty');
    });

    QUnit.test('isElement', function(assert) {
        assert.notOk(_.isElement('div'), 'strings are not dom elements');
        assert.ok(_.isElement(document.body), 'the body tag is a DOM element');
        assert.ok(_.isElement(iElement), 'even from another frame');
    });

    QUnit.test('isArguments', function(assert) {
        assert.ok(_.isArguments(iArguments), 'even from another frame');
    });

    QUnit.test('isObject', function(assert) {
        assert.ok(_.isObject(iElement), 'even from another frame');
        assert.ok(_.isObject(iFunction), 'even from another frame');
    });

    QUnit.test('isArray', function(assert) {
        assert.ok(_.isArray(iArray), 'even from another frame');
    });

    QUnit.test('isString', function(assert) {
        assert.ok(_.isString(iString), 'even from another frame');
    });

    QUnit.test('isNumber', function(assert) {
        assert.ok(_.isNumber(iNumber), 'even from another frame');
    });

    QUnit.test('isBoolean', function(assert) {
        assert.ok(_.isBoolean(iBoolean), 'even from another frame');
    });

    QUnit.test('isFunction', function(assert) {
        assert.ok(_.isFunction(iFunction), 'even from another frame');
    });

    QUnit.test('isDate', function(assert) {
        assert.ok(_.isDate(iDate), 'even from another frame');
    });

    QUnit.test('isRegExp', function(assert) {
        assert.ok(_.isRegExp(iRegExp), 'even from another frame');
    });

    QUnit.test('isNaN', function(assert) {
        assert.ok(_.isNaN(iNaN), 'even from another frame');
    });

    QUnit.test('isNull', function(assert) {
        assert.ok(_.isNull(iNull), 'even from another frame');
    });

    QUnit.test('isUndefined', function(assert) {
        assert.ok(_.isUndefined(iUndefined), 'even from another frame');
    });

    QUnit.test('isError', function(assert) {
        assert.ok(_.isError(iError), 'even from another frame');
    });

    if (typeof ActiveXObject != 'undefined') {
        QUnit.test('IE host objects', function(assert) {
            var xml = new ActiveXObject('Msxml2.DOMDocument.3.0');
            assert.notOk(_.isNumber(xml));
            assert.notOk(_.isBoolean(xml));
            assert.notOk(_.isNaN(xml));
            assert.notOk(_.isFunction(xml));
            assert.notOk(_.isNull(xml));
            assert.notOk(_.isUndefined(xml));
        });

        QUnit.test('#1621 IE 11 compat mode DOM elements are not functions', function(assert) {
            var fn = function() {};
            var xml = new ActiveXObject('Msxml2.DOMDocument.3.0');
            var div = document.createElement('div');

            // JIT the function
            var count = 200;
            while (count--) {
                _.isFunction(fn);
            }

            assert.strictEqual(_.isFunction(xml), false);
            assert.strictEqual(_.isFunction(div), false);
            assert.strictEqual(_.isFunction(fn), true);
        });
    }
});