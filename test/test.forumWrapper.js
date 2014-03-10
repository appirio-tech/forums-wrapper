/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 *
 * Version: 1.0
 * Author: freegod
 */
"use strict";
/*global describe, it, before, beforeEach, after, afterEach */

/**
 * Module dependencies.
 */
var async = require("async");
var java = require('java');
var assert = require('assert');
var ForumWrapper = require("../").ForumWrapper;

describe("Forum Wrapper ", function () {

    describe("with correct forum host", function () {
        var wrapper;
        before(function (done) {
            wrapper = new ForumWrapper();
            done();
        });

        it("should be not null", function (done) {
            assert.ok(wrapper !== undefined && wrapper !== null, 'Wrapper should not be null or undefined:' + wrapper);
            done();
        });

        it("should assign role without errors", function (done) {
            async.parallel([
                function (callback) {
                    wrapper.assignRole(124834, 'Software Admins', callback);
                },
                function (callback) {
                    wrapper.assignRole(124776, 6, callback);
                }
            ], function (err) {
                assert.ok(err === null || err === undefined, "There should be no ERROR: " + err);
                done();
            });
        });

        it("should not assign role when group doesn't exist", function (done) {
            async.parallel([
                function (callback) {
                    wrapper.assignRole(124834, 999998, callback);
                },
                function (callback) {
                    wrapper.assignRole(124776, "Group not exist", callback);
                }
            ], function (err) {
                assert.ok(err === null || err === undefined, "There should be no ERROR: " + err);
                done();
            });
        });

        it("should remove role without errors", function (done) {
            async.parallel([
                function (callback) {
                    wrapper.removeRole(124776, 'Software Admins', callback);
                },
                function (callback) {
                    wrapper.removeRole(124834, 6, callback);
                }
            ], function (err) {
                assert.ok(err === null || err === undefined, "There should be no ERROR: " + err);
                done();
            });
        });

        it("should remove role without errors when records don't exist", function (done) {
            async.parallel([
                function (callback) {
                    wrapper.removeRole(132456, 'Software Admins', callback);
                }
            ], function (err) {
                assert.ok(err === null || err === undefined, "There should be no ERROR: " + err);
                done();
            });
        });

        it("should remove role without errors when group doesn't exist", function (done) {
            async.parallel([
                function (callback) {
                    wrapper.removeRole(132456, 999999, callback);
                }, function (callback) {
                    wrapper.removeRole(132456, "Group not exist", callback);
                }
            ], function (err) {
                assert.ok(err === null || err === undefined, "There should be no ERROR: " + err);
                done();
            });
        });
    });

});
