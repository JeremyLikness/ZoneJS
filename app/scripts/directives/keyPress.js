/* global angular */
(function (app) {

    'use strict';

    app.directive('keyPress', ['pubSub', function (pubSub) {

        return {

            restrict: 'A',
            link: function (scope, element) {
                var elm = $(element);
                elm.bind('keydown keypress', function (e) {
                    pubSub.publish('keyPress', e);
                });
            }
        };

    }]);

})(angular.module('zoneApp'));