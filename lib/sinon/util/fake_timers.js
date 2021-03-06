/**
 * Fake timer API
 * setTimeout
 * setInterval
 * clearTimeout
 * clearInterval
 * tick
 * reset
 * Date
 *
 * Inspired by jsUnitMockTimeOut from JsUnit
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
"use strict";

var llx = require("lolex");

exports.useFakeTimers = function () {
    var now;
    var methods = Array.prototype.slice.call(arguments);

    if (typeof methods[0] === "string") {
        now = 0;
    } else {
        now = methods.shift();
    }

    var clock = llx.install(now || 0, methods);
    clock.restore = clock.uninstall;
    return clock;
};

exports.clock = {
    create: function (now) {
        return llx.createClock(now);
    }
};

exports.timers = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setImmediate: (typeof setImmediate !== "undefined" ? setImmediate : undefined),
    clearImmediate: (typeof clearImmediate !== "undefined" ? clearImmediate : undefined),
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date
};
