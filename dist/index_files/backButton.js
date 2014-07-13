/* global angular, zone */
(function (app) {

    'use strict';

    app.directive('backButton', ['pubSub', function (pubSub) {

        var currentSlide = 0;

        return {

            restrict: 'A',
            link: function (scope, element) {
                var elm = $(element);
                elm.bind('click', function () {
                    zone.marker = 'Back Button Click';
                    if (currentSlide !== 0) {
                        pubSub.publish('previousSlide');
                    }
                });
                pubSub.subscribe('currentSlide', function(slide) {
                    currentSlide = slide.currentSlide;
                    if (slide.currentSlide === 0) {
                        if (elm.hasClass('no-display')) {
                            return;
                        }
                        elm.removeClass('animated fadeIn');
                        elm.addClass('animated fadeOut');
                    }
                    else if (slide.currentSlide === 1) {
                        if (elm.hasClass('no-display')) {
                            elm.removeClass('no-display');
                        }
                        else if (elm.hasClass('fadeOut')) {
                            elm.removeClass('animated fadeOut');
                        }
                        elm.addClass('animated fadeIn');
                    }
                });
            }
        };

    }]);

})(angular.module('zoneApp'));