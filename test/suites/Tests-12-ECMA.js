// Copyright (c) 2013 - present UTN-LIS

/*global define, test, ok, equal */

/*
 *              PUMASCRIPT BASE TEST SUITE
 *  @file: Base expressions test suite for the language
 */
define(['pumascript', 'esprima'], function (puma, esprima) {

    // Tests de la seccion 12 de ECMA: Statements
    module("12.1 Blocks")

    //Revisar, deberia devolver 1 supuestamente
    QUnit.skip("block statement 1", function () {
        var result = puma.evalPuma("1;;;;;");
        ok(result.success && 1 === result.value, "Passed!");
    });

    //Revisar segun la consola de chrome deberia devolver 1
    QUnit.skip("block statement 2", function () {
        var result = puma.evalPuma("1;{}");
        result.makeValue();
        equal(result.value, 1, "Passed!");
    });

    //Revisar
    QUnit.skip("block statement 3", function () {
        var result = puma.evalPuma("1;var a;");
        result.makeValue();
        equal(typeof result.value, 'number', "Passed!");
    });

    module("12.2 Variables");

    test("variable declaration: variables are initialised to undefined when created", function () {
        var result = puma.evalPuma("var a1; a1;");
        result.makeValue();
        equal(result.value, undefined, "Passed!");
    });

    test("variable declaration: variables are assigned the value of their AssignmentExpression when the VariableStatement is executed.", function () {
        var result = puma.evalPuma("var a1 = 1;");
        result.makeValue();
        equal(result.value, 1, "Passed!");
    });

    test("variable declaration in strict mode: 'eval' as identifier", function () {
        var exceptionMessage;
        try {
            var result = puma.evalPuma("'use strict';var eval;");
        } catch (e) {
            exceptionMessage = e.message;
        }
        equal(exceptionMessage, "Line 1: Variable name may not be eval or arguments in strict mode", "Passed!");
    });

    test("variable declaration in strict mode: 'arguments' as identifier", function () {
        var exceptionMessage;
        try {
            var result = puma.evalPuma("\"use strict\"; var arguments;");
        } catch (e) {
            exceptionMessage = e.message;
        }
        equal(exceptionMessage, "Line 1: Variable name may not be eval or arguments in strict mode", "Passed!");
    });

    module("12.3 Empty Statement");

    test("empty statement", function () {
        var result = puma.evalPuma(";");
        result.makeValue();
        equal(result.value, null, "Passed!");
    });

    // TODO testear An ExpressionStatement cannot start with an opening curly brace because that might make it ambiguous with a
    // Block. Also, an ExpressionStatement cannot start with the function keyword because that might make it ambiguous with a
    // FunctionDeclaration.
    // (como hago para que JS o PumaScript se de cuenta que estoy queriendo escribir un ExpressionStatement y no un Block o FunctionDeclaration?)

    module("12.5 If Statement");

    test("if statement: true", function () {
        var result = puma.evalPuma("if (true) 1; else 2;");
        result.makeValue();
        equal(result.value, 1, "Passed!");
    });
    test("if statement : true with curly", function () {
        var result = puma.evalPuma("if (true) {1;} else{2;}");
        result.makeValue();
        equal(result.value, 1, "Passed!");
    })

    test("if statement: false", function () {
        var result = puma.evalPuma("if (false) 1; else 2;");
        result.makeValue();
        equal(result.value, 2, "Passed!");
    });

    test("if statement: false with curly", function () {
        var result = puma.evalPuma("if (false){1;} else {2;}");
        result.makeValue();
        equal(result.value, 2, "Passed!");
    });

    module("12.6 Iteration Statements");

    test("do Statement while (Expression)", function () {
        var result = puma.evalPuma("var a = 0;  do { a++; } while (a<4); a;");
        result.makeValue();
        equal(result.value, 4, "Passed!");
    });

    test("do Statement while (Expression) 2", function () {
        var result = puma.evalPuma("var a = true; do { a=!a; } while (a); a;");
        result.makeValue();
        equal(result.success, true);
        equal(result.value, false, "Passed!");
    });

    test("while (Expression) Statement", function () {
        var result = puma.evalPuma("var a = 0; while (a<8) { a++; } a;");
        result.makeValue();
        equal(result.value, 8, "Passed!");
    });

    test("while (Expression) Statement 2", function () {
        var result = puma.evalPuma("var a = 1; var b = true; while (b) { a++; b=!b; } a;");
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 2, "Passed!");
    });

    test("for (ExpressionNoIn ; Expression ; Expression) (no Statement)", function () {
        var result = puma.evalPuma("for(var i = 0; i < 10 ; i++){i;}");
        ok(result.success && 10 === result.value, "Passed!");
    });

    test("for (ExpressionNoIn ; Expression ; Expression) Statement", function () {
        var result = puma.evalPuma("for(var i = 0; i < 10 ; i++)  i++;  i;");
        result.makeValue();
        equal(result.value, 10, "Passed!");
    });
    //Revisar
    QUnit.skip("for (ExpressionNoIn ; Expression ; ) Statement", function () {
        var result = puma.evalPuma("for(var i = 0; i < 10 ; ) i++; i;");
        equal(result.value, 10, "Passed!");
    });

    //Revisar Uncaught invalid call to accept with null ast.
    QUnit.skip("for (ExpressionNoIn ;  ; Expression) Statement", function () {
        var result = puma.evalPuma("for(var i = 0; ; i++) {if (i === 6) break;} i;");
        result.makeValue();
        equal(result.value, 6, "Passed!");
    });

    test("for ( ; Expression ; Expression) ", function () {
        var result = puma.evalPuma("var i = 0; \n for( ; i < 10 ; i++); \n i;");
        result.makeValue();
        equal(result.value, 10, "Passed!");
    });

    //revisar
    QUnit.skip("for ( LeftHandSideExpression in Expression ) Statement", function () {
        var result = puma.evalPuma("var person = {a:1, b:2, c:3}; var res = 0; var x; for (x in person) { res += person[x]; } res;");
        result.makeValue();
        equal(result.value, 6, "Passed!");
    });
    //revisar
    QUnit.skip("for ( var VariableDeclarationNoIn in Expression ) Statement", function () {
        var result = puma.evalPuma("var res = 0; var obj = {a:1, b:2, c:3}; for (var prop in obj) { res += obj[prop] } res;");
        result.makeValue();
        equal(result.value, 6, "Passed!");
    });

    module("12.7 The Continue Statement");

    //revisar
    QUnit.skip("continue ; (no Identifier)", function () {
        var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue; res += i; } res;");
        result.makeValue();
        equal(result.value, 7, "Passed!");
    });
    //revisar
    QUnit.skip("continue ; (no Identifier)", function () {
        var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue; res += i; } res;");
        result.makeValue();
        equal(result.value, 7, "Passed!");
    });

    test("BAD continue ; (no Identifier)", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("continue;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Illegal continue statement", "Passed!");
    });
    //revisar
    QUnit.skip("continue [no LineTerminator here] Identifier;", function () {
        var result = puma.evalPuma("var res = 0; anIdentifier: for(var i = 0; i < 5 ; i++) { if (i < 3) continue anIdentifier; res += i; } res;");
        result.makeValue();
        equal(result.value, 7, "Passed!");
    });

    test("BAD continue [no LineTerminator here] Identifier;", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue anIdentifier; res += i; } res;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Undefined label 'anIdentifier'", "Passed!");
    });

    module("12.8 The Break Statement");

    //revisar
    QUnit.skip("Break ; (no Identifier)", function () {
        var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i >= 3) break; res += i; } res;");
        result.makeValue();
        equal(result.value, 3, "Passed!");
    });

    test("BAD break ; (no Identifier)", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("break;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Illegal break statement", "Passed!");
    });
    //revisar
    QUnit.skip("break [no LineTerminator here] Identifier;", function () {
        var result = puma.evalPuma("var res = 0; anIdentifier: for(var i = 0; i < 5 ; i++) { if (i >= 3) break anIdentifier; res += i; } res;");
        result.makeValue();
        equal(result.value, 3, "Passed!");
    });

    test("BAD break [no LineTerminator here] Identifier;", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i >= 3) break anIdentifier; res += i; } res;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Undefined label 'anIdentifier'", "Passed!");
    });

    module("12.9 The Return Statement");

    test("Return ; (no Expression)", function () {
        var result = puma.evalPuma("function a() { return; } a()");
        result.makeValue();
        equal(result.value, undefined, "Passed!");
    });

    test("BAD return ; (no Expression)", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("return;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Illegal return statement", "Passed!");
    });

    test("return [no LineTerminator here] Expression;", function () {
        var result = puma.evalPuma("function a() { return 3; } a()");
        result.makeValue();
        equal(result.value, 3, "Passed!");
    });

    test("BAD return [no LineTerminator here] Expression;", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("return 3;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Illegal return statement", "Passed!");
    });

    module("12.10 The With Statement");

    //revisar
    QUnit.skip("With (Expression) read property inside Expression", function () {
        var result = puma.evalPuma("var a = 5; var obj = { a : 10 }; with (obj) { a }");
        result.makeValue();
        equal(result.value, 10, "Passed!");
    });
    //revisar
    QUnit.skip("With (Expression) read property outside Expression", function () {
        var result = puma.evalPuma("var b = 5; var obj = { a : 10 }; with (obj) { b }");
        result.makeValue();
        equal(result.value, 5, "Passed!");
    });

    test("With (Expression) in strict mode", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\"; var obj = { a : 10 }; with (obj) { a }");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Strict mode code may not include a with statement", "Passed!");
    });

    module("12.11 The Switch Statement");

    test("Switch (Expression) no CaseBlock", function () {
        var result = puma.evalPuma("var a; switch (a) {}");
        result.makeValue();
        equal(result.value, undefined, "Passed!");
    });

    QUnit.skip("Switch (Expression) case with break", function () {
        var result = puma.evalPuma("var a = 1; switch (a) { case 1: 1; break; case 2: 2;}");
        result.makeValue();
        equal(result.value, 1, "Passed!");
    });

    QUnit.skip("Switch (Expression) case without break", function () {
        var result = puma.evalPuma("var a = 1; var b = 0; switch (a) { case 1: b += 1; case 2: b += 2;} b;");
        result.makeValue();
        equal(result.value, 3, "Passed!");
    });

    QUnit.skip("Switch (Expression) case default", function () {
        var result = puma.evalPuma("var a = 0; switch (a) { case 1: 1; break; default: 2;}");
        result.makeValue();
        equal(result.value, 2, "Passed!");
    });

    module("12.12 Labeled Statements");

    QUnit.skip("LabelledStatement : Identifier : Statement", function () {
        var result = puma.evalPuma("anIdentifier: for(var i = 0; i < 5 ; i++) { } i;");
        result.makeValue();
        equal(result.value, 5, "Passed!");
    });

    QUnit.skip("Nested labels with different identifiers", function () {
        var result = puma.evalPuma("anIdentifier: for(var i = 0; i < 5; i++) { anIdentifier2: for (var j = 0; j < 5; j++) {} } i + j;");
        result.makeValue();
        equal(result.value, 10, "Passed!");
    });

    test("Nested labels with the same identifiers", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("anIdentifier: for(var i = 0; i < 5; i++) { anIdentifier: for (var j = 0; j < 5; j++) {} } i + j;");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Label 'anIdentifier' has already been declared", "Passed!");
    });

    module("12.13 The Throw Statement");

    QUnit.skip("throw string", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("throw \"someString\"");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "someString", "Passed!");
    });
    //PumaScript no evalua los throw
    QUnit.skip("throw number", function () {
        var errorMessage = null;
        try {
            var result = puma.evalPuma("throw 42");
        } catch (err) {
            console.log(err);
            errorMessage = err;
        }
        equal(errorMessage, 42, "Passed!");
    });

    QUnit.skip("throw true", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("throw true");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, true, "Passed!");
    });

});
