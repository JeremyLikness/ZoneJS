/* global performance, Zone, zone */
(function (z) {

    'use strict';

    z.myZone = (function () {

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
                console.log('\nEntered task');
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
})(Zone);