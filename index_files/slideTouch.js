/* global angular, zone */
(function (app) {

    'use strict';

    app.directive('slideTouch', ['pubSub', function (pubSub) {

        var active = true; // avoid false triggers

        return {

            restrict: 'A',
            link: function (scope, element) {
                var elm = $(element);
                elm.bind('pointerup touchend mouseup', function () {
                    zone.marker = 'Touch or Pointer Interaction';
                    if (active) {
                        active = false;
                        scope.$apply(function () {
                            pubSub.publish('nextSlide');
                        });
                        setTimeout(function () {
                            zone.marker = 'Reset Touch Timer';
                            active = true;
                        }, 100);
                    }
                });
            }
        };

    }]);

})(angular.module('zoneApp'));