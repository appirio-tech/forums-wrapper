/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 *
 * @version 1.0
 * @author freegod
 */
"use strict";


var ForumWrapper = require("./").ForumWrapper;
var async = require('async');
var wrapper = new ForumWrapper();


async.parallel([
    function (callback) {
        wrapper.assignRole(124834, 'Software Admins', function (err) {
            console.log('Assigned role to lightspeed');
            callback(err);
        });
    },
    function (callback) {
        wrapper.assignRole(124776, 6, function (err) {
            console.log('Assigned role to sandking');
            callback(err);
        });
    },
    function (callback) {
        wrapper.assignRole(124766, 'Software Admins', function (err) {
            console.log('Assigned role to twight');
            callback(err);
        });
    },
    function (callback) {
        wrapper.assignRole(124772, 6, function (err) {
            console.log('Assigned role to Partha');
            callback(err);
        });
    },
    //assign role to lightspeed again.
    //This is not a bug
    function (callback) {
        wrapper.assignRole(124834, 'Software Admins', function (err) {
            console.log('Assigned role to lightspeed');
            callback(err);
        });
    }
], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("-----------All done-----------");
    }
});


/*
async.parallel([
    function (callback) {
        wrapper.removeRole(124834, 'Software Admins', function (err) {
            console.log('Removed role from lightspeed');
            callback(err);
        });
    },
    function (callback) {
        wrapper.removeRole(124776, 6, function (err) {
            console.log('Removed role from sandking');
            callback(err);
        });
    },
    //remove role from lightspeed again.
    //This is not a bug
    function (callback) {
        wrapper.removeRole(124834, 'Software Admins', function (err) {
            console.log('Removed role from lightspeed');
            callback(err);
        });
    }
], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("-----------All done-----------");
    }
});
*/