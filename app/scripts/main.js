/* global angular, hljs, zone, performance */
(function (hl) {
    'use strict';

    var myZone = (function () {

        var timer = performance ?
                performance.now.bind(performance) :
                Date.now.bind(Date);
        return {
            marker: '?',
            start: 0,
            originalStart: 0,
            diff: 0,
            totalDiff: 0,
            totalTime: 0,
            apply: function () { },
            beforeTask: function () {
                this.originalStart = this.originalStart || timer();
                this.start = timer();
                console.log('Entered task');
            },
            afterTask: function () {
                var totalTime = this.totalTime;
                this.diff = timer() - this.start;
                this.totalDiff = timer() - this.originalStart;
                console.log('Exited task ' + zone.marker + ' after ' + this.diff);
                this.totalTime = totalTime + this.diff;
                console.log('Total active time: ' + this.totalTime);
                console.log('Total elapsed time: ' + this.totalDiff);
                this.apply();
            }
        };
    }());

    function main () {

        zone.marker = 'main';

        angular.module('zoneApp', [])
            .run(['$rootScope', 'pubSub', 'keymap', function($rs, pubSub, key) {
                zone.marker = 'module run';
                zone.apply = function () {
                    $rs.$apply(function () {
                        $rs.diff = zone.diff;
                        $rs.totalDiff = zone.totalDiff;
                    });
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
            }]);

        $('code').each(function(i, e) { hl.highlightBlock(e);});

        setTimeout(function () {
            angular.bootstrap(document, ['zoneApp']);
        }, 0);
    }

    zone.fork(myZone).run(main);

})(hljs);