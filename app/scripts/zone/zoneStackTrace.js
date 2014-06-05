/* global Zone, zone, angular */
(function (z) {

    'use strict';

    z.callStack = (function () {

        var trace = [],
            callStack = {
                capture: function (e) {
                    var lines = e.stack.split('\n');
                    angular.forEach(lines, function (line) {
                        trace.push(line);
                    });
                },
                afterTask: function () {
                    try {
                        throw new Error(zone.marker);
                    }
                    catch (e) {
                        this.capture (e);
                    }
                },
                '-onError': function (e) {
                    this.capture(e);
                    console.error(trace.join('\n'));
                    trace = [];
                }
            };

        zone.onError = callStack['-onError'].bind(callStack);
        return callStack;
    }());
})(Zone);