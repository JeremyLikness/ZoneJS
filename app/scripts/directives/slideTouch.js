/* global angular */
(function (app) {

    'use strict';

    app.directive('slideTouch', ['pubSub', function (pubSub) {

        var active = true; // avoid false triggers

        return {

            restrict: 'A',
            link: function (scope, element) {
                var elm = $(element);
                elm.bind('pointerup touchend mouseup', function () {
                    if (active) {
                        active = false;
                        pubSub.publish('nextSlide');
                        setTimeout(function () { active = true; }, 100);
                    }
                });
            }
        };

    }]);

})(angular.module('zoneApp'));