/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 *
 * @version 1.1, bugbuka
 * @author freegod
 *
 * changes in 1.1:
 * add init function, if the jboss is restarted, force to init the _wrapper.
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
    __dirname + '/../build/lib/jivebase_modified.jar',
    __dirname + '/../build/lib/jiveforums.jar']);

// Leave signal handling to upper layer. JVM will ignore system singals.
// See http://docs.oracle.com/javase/6/docs/technotes/tools/solaris/java.html
// for more information.
java.options.push('-Xrs');

/**
 * Create a new instance of forum wrapper
 *
 * @param {String} devForumJNDI the software Forum JNDI url
 * @constructor
 * @classdesc
 * This class wraps the <code>Forums</code> and provides methods that are asynchronous
 * with callback parameter.
 */
function ForumWrapper(devForumJNDI) {
    EventEmitter.call(this);
    var self = this,
        forumHost = devForumJNDI || config.forumHost || DEFAULT_FORUM_HOST;
    
    self._forumHost = forumHost;
    self._wrapper = java.callStaticMethodSync('com.topcoder.node.forum.ForumWrapper',
            "getForumsInstance",
            forumHost, false);

    /**
     * init the _wrapper.
     *
     * @param callback
     *          callback function
     */
    self.init = function (callback) {
        try {
            self._wrapper = java.callStaticMethodSync('com.topcoder.node.forum.ForumWrapper',
                "getForumsInstance", self._forumHost, true);
        } catch (ex) {
            callback(ex, self);
            return;
        }
    };
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
        callback(null, self);
        return;
    }
    self._wrapper.assignRole(userId, jiveGroup, function (err) {
        if (err) {

            self.init(callback);
            self._wrapper.assignRole(userId, jiveGroup, function (err) {
                callback(err, self);
            });
        } else {
            callback(null, self);
        }
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
        callback(null, self);
        return;
    }
    self._wrapper.removeRole(userId, jiveGroup, function (err) {
        if (err) {

            self.init(callback);
            self._wrapper.removeRole(userId, jiveGroup, function (err) {
                callback(err, self);
            });
        } else {
            callback(null, self);
        }
    });
};

ForumWrapper.prototype.removeUserPermission = function (userId, forumCategoryID, callback) {
    var self = this;
    if (typeof callback !== "function") {
        self.emit('error', "Callback must be a function");
        callback(null, self);
        return;
    }
    self._wrapper.removeUserPermission(userId, forumCategoryID, function (err) {
        if (err) {

            self.init(callback);
            self._wrapper.removeUserPermission(userId, forumCategoryID, function (err) {
                callback(err, self);
            });
        } else {
            callback(null, self);
        }
    });
};

ForumWrapper.prototype.deleteCategoryWatch = function (userId, forumCategoryID, callback) {
    var self = this;
    if (typeof callback !== "function") {
        self.emit('error', "Callback must be a function");
        callback(null, self);
        return;
    }

    self._wrapper.deleteCategoryWatch(userId, forumCategoryID, function (err) {
        if (err) {

            self.init(callback);
            self._wrapper.deleteCategoryWatch(userId, forumCategoryID, function (err) {
                callback(err, self);
            });
        } else {
            callback(null, self);
        }
    });
};

module.exports = ForumWrapper;
