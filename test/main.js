// Copyright (c) 2013 - present UTN-LIS

/*global require, QUnit */

/*
 *      PUMASCRIPT MAIN ENTRY FILE FOR TEST
 *  @file: file that includes the dependencies and executions fof RequireJS.
 */

require.config({
  paths: {
    'pumascript': '../src/pumascript',
    'esprima': '../thirdparty/esprima/esprima',
    'escodegen': '../thirdparty/escodegen/escodegen.browser'
  }
});

/**
 * @enum containing the list of test suites to execute
 */
var suites = [
  './suites/base-tests.js',
  './suites/runtime-tests.js',
  './suites/integration-tests.js',
  './suites/Tests-7-ECMA.js',
  './suites/Tests-8-ECMA.js',
  './suites/Tests-9-ECMA.js',
  './suites/Tests-10-ECMA.js',
  './suites/Tests-11-ECMA.js',
  './suites/Tests-12-ECMA.js',
  './suites/Tests-13-ECMA.js',
  './suites/Tests-15-ECMA.js'
];

require(suites, function () {
  // Required to make it work under phantomjs environment
  QUnit.start();
});
