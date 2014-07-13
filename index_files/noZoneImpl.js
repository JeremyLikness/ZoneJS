/* global angular */
(function (app) {

    'use strict';

    function Controller () {
    }

    Controller.prototype.onTryMe = function () {
        console.log('start');
        console.log('enqueue');
        setTimeout(function () {
            console.log('task');
            console.log('dequeue');
        }, 100);
        console.log('end');
    };

    app.controller('noZoneCtrl', Controller);

})(angular.module('zoneApp'));