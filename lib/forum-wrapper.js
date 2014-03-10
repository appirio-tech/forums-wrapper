/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 *
 * @version 1.0
 * @author freegod
 */

"use strict";
/*jslint stupid: true */

var java = require('java');
var _ = require('underscore');
var config = require('./config');
var sys = require('sys');
var EventEmitter = require('events').EventEmitter;

var DEFAULT_FORUM_HOST = 'jnp://env.topcoder.com:1199';

// Class path configuration for Forum Wrapper
java.classpath = java.classpath.concat([__dirname + '/../build/lib/commons-logging-1.1.3.jar',
    __dirname + '/../build/lib/forum-services.jar',
    __dirname + '/../build/lib/forum-wrapper.jar',
    __dirname + '/../build/lib/forums.jar',
    __dirname + '/../build/lib/gson-2.2.4.jar',
    __dirname + '/../build/lib/javax.ejb.jar',
    __dirname + '/../build/lib/jbossall-client.jar',
    __dirname + '/../build/lib/jivebase.jar',
    __dirname + '/../build/lib/jiveforums.jar']);

// Leave signal handling to upper layer. JVM will ignore system singals.
// See http://docs.oracle.com/javase/6/docs/technotes/tools/solaris/java.html
// for more information.
java.options.push('-Xrs');

/**
 * Create a new instance of forum wrapper
 * @constructor
 * @classdesc
 * This class wraps the <code>Forums</code> and provides methods that are asynchronous
 * with callback parameter.
 */
function ForumWrapper() {
    EventEmitter.call(this);
    var self = this,
        forumHost = config.forumHost || DEFAULT_FORUM_HOST;
    try {
        self._wrapper = java.callStaticMethodSync('com.topcoder.node.forum.ForumWrapper',
            "getForumsInstance",
            forumHost);
    } catch (ex) {
        self.emit('error', ex);
    }
}

sys.inherits(ForumWrapper, EventEmitter);

/**
 * Assign role to user.
 *
 * @param userId
 *          the user id
 * @param jiveGroup
 *          jive group id or jive group name
 * @param callback
 *          callback function
 */
ForumWrapper.prototype.assignRole = function (userId, jiveGroup, callback) {
    var self = this;
    if (typeof callback !== "function") {
        self.emit('error', "Callback must be a function");
        callback('');
    }
    self._wrapper.assignRole(userId, jiveGroup, function (err) {
        callback(err);
    });
};

/**
 * Remove role from user.
 *
 * @param userId
 *          the user id
 * @param jiveGroup
 *          jive group id or jive group name
 * @param callback
 *          callback function
 */
ForumWrapper.prototype.removeRole = function (userId, jiveGroup, callback) {
    var self = this;
    if (typeof callback !== "function") {
        self.emit('error', "Callback must be a function");
        callback('');
    }
    self._wrapper.removeRole(userId, jiveGroup, function (err) {
        callback(err);
    });
};

module.exports = ForumWrapper;