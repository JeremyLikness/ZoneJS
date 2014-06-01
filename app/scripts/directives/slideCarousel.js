/* global angular, jQuery */
(function (app, $) {

    'use strict';

    app.directive('slideCarousel', ['pubSub', 'keymap', 'title', function (pubSub, key, title) {

        function link(scope, element) {

            var slides = element.children(), idx, defaultTransitionIn = 'fadeInRight',
                defaultTransitionOut = 'bounceOutLeft', cur = 0;

            function animate(options) {
                var animation = options.dt;
                if (options.direction === 'in') {
                    if ($(options.slide).data('animate-in')) {
                        animation = $(options.slide).data('animate-in');
                    }
                }
                else if ($(options.slide).data('animate-out')) {
                    animation = $(options.slide).data('animate-out');
                }
                options.slide.className = 'animated ' + animation;
            }

            function setTitle(slide) {
                if ($(slide).data('slideTitle')) {
                    scope.$apply(function () {
                        title.setTitle($(slide).data('slideTitle'));
                    });
                }
            }

            pubSub.subscribe('nextSlide', function () {
                if (cur + 1 < slides.length) {
                    animate({
                        slide: slides[cur],
                        direction: 'out',
                        dt: defaultTransitionOut
                    });
                    cur += 1;
                    setTitle(slides[cur]);
                    animate({
                        slide: slides[cur],
                        direction: 'in',
                        dt: defaultTransitionIn
                    });
                    pubSub.publish('currentSlide', { currentSlide: cur });
                }
            });

            pubSub.subscribe('previousSlide', function () {
                if (cur > 0) {
                    animate({
                        slide: slides[cur],
                        direction: 'out',
                        dt: defaultTransitionOut
                    });
                    cur -= 1;
                    setTitle(slides[cur]);
                    animate({
                        slide: slides[cur],
                        direction: 'in',
                        dt: defaultTransitionIn
                    });
                    pubSub.publish('currentSlide', { currentSlide: cur });
                }
            });

            if ($(element).data('defaultTransitionIn')) {
                defaultTransitionIn = $(element).data('defaultTransitionIn');
            }

            if ($(element).data('defaultTransitionOut')) {
                defaultTransitionOut = $(element).data('defaultTransitionOut');
            }

            for (idx = 0; idx < slides.length; idx += 1) {
                slides[idx].className = 'no-display';
            }

            animate({
                slide: slides[0],
                direction: 'in',
                dt: defaultTransitionIn
            });

            pubSub.publish('currentSlide', { currentSlide: 0 });
        }

        return {
            link: link
        };

    }]);

})(angular.module('zoneApp'), jQuery);