/* global angular, jQuery, zone */
(function (app, $) {

    'use strict';

    app.directive('slideCarousel', ['pubSub', 'keymap', 'title', '$timeout', function (pubSub, key, title, t) {

        function link(scope, element) {

            var slides = element.children(), idx, defaultTransitionIn = 'fadeInRight',
                defaultTransitionOut = 'bounceOutLeft', cur = 0;

            function makeAnimator(obj, animation) {
                return function () {
                    zone.marker = 'Animation';
                    if (obj.hasClass('no-display')) {
                        obj.removeClass('no-display');
                    }
                    if (obj.hasClass('animated')) {
                        obj.removeClass('animated');
                    }
                    obj.addClass('animated ' + animation);
                };
            }

            function delayedAnimations(slide) {
                var x, data, delayElm, elements = $(slide).children().filter(function () {
                    return $(this).data('delayedAnimation');
                });
                for (x = 0; x < elements.length; x += 1) {
                    delayElm = $(elements[x]);
                    data = delayElm.data('delayedAnimation').split(' ');
                    if (data.length === 2) {
                        if (!delayElm.hasClass('no-display')) {
                            delayElm.addClass('no-display');
                        }
                        t(makeAnimator(delayElm, data[1]), parseInt(data[0]));
                    }
                }
            }

            function saveAnimations(slide) {
                var x, saveElm, saved = false, elements = $(slide).children().filter(function () {
                    return $(this).hasClass('animated');
                });
                for (x = 0; x < elements.length; x += 1) {
                    saveElm = $(elements[x]);
                    if (!saveElm.data('savedAnimation')) {
                        saved = true;
                        saveElm.data('savedAnimation', elements[x].className);
                    }
                }
                return saved;
            }

            function restoreAnimations(slide) {
                var x, data, animations, restoreElm, elements = $(slide).children().filter(function () {
                    return $(this).data('savedAnimation');
                }), restoreFn = function (animation) {
                    if (animation !== 'no-display' && animation !== 'animated') {
                        animations.push(animation);
                    }
                };

                for (x = 0; x < elements.length; x += 1) {
                    restoreElm = $(elements[x]);
                    data = restoreElm.data('savedAnimation').split(' ');
                    animations = [];
                    angular.forEach(data, restoreFn);
                    if (restoreElm.hasClass('animated')) {
                        restoreElm.removeClass('animated');
                    }
                    if (!restoreElm.hasClass('no-display')) {
                        restoreElm.addClass('no-display');
                    }
                    t(makeAnimator(restoreElm, animations.join(' '), 0));
                }
            }

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

                if (options.direction === 'in') {
                    delayedAnimations(options.slide);
                    if (!saveAnimations(options.slide)) {
                        restoreAnimations(options.slide);
                    }
                }
            }

            function setTitle(slide) {
                if ($(slide).data('slideTitle')) {
                    title.setTitle($(slide).data('slideTitle'));
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
                    pubSub.publish('currentSlide', {
                        currentSlide: cur,
                        totalSlides: slides.length
                    });
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
                    pubSub.publish('currentSlide', {
                        currentSlide: cur,
                        totalSlides: slides.length
                    });
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

            pubSub.publish('currentSlide', {
                currentSlide: 0,
                totalSlides: slides.length
            });
        }

        return {
            link: link
        };

    }]);

})(angular.module('zoneApp'), jQuery);