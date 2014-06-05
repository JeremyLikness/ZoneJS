/* global angular, hljs, zone, Zone */

'use strict';

(function (hl, fn) {

    $('code').each(function(i, e) { hl.highlightBlock(e);});

    function main () {

        zone.marker = 'main';

        angular.module('zoneApp', [])
            .run(['$rootScope', 'pubSub', 'keymap', function($rs, pubSub, key) {

                zone.marker = 'module run';

                zone.apply = function () {
                    $rs.diff = zone.diff;
                    $rs.totalDiff = zone.totalDiff;
                    $rs.$digest();
                };

                $rs.title = 'ZoneJS';
                $rs.diff = zone.diff;
                $rs.totalDiff = zone.totalDiff;

                pubSub.subscribe('keyPress', function (payload) {
                    if (payload.keyCode === key.SPACE || payload.keyCode === key.RIGHT_ARROW) {
                        pubSub.publish('nextSlide');
                    }
                    else if (payload.keycode === key.BACKSPACE || payload.keyCode === key.LEFT_ARROW) {
                        pubSub.publish('previousSlide');
                    }
                });
            }])
            .factory('$exceptionHandler', function () {
                return function errorCatchAll(exception, cause) {
                    zone.onError(exception);
                    console.log(cause);
                };
            });

        setTimeout(function () {
            angular.bootstrap(document, ['zoneApp']);
        }, 1);
    }

    fn(main);

})(hljs, function (m) { zone.fork(Zone.myZone).run(m); });

// function (m) { zone.fork().run(m); }
// function (m) { zone.fork(Zone.myZone).run(m); }
// function (m) { zone.fork(Zone.callStack).run(m); }