/* global angular */
(function (app) {

    'use strict';

    function Controller () {
    }

    Controller.prototype.onHitMe = function () {
        throw new Error('ouch!');
    };

    app.controller('whyZoneCtrl', Controller);

})(angular.module('zoneApp'));