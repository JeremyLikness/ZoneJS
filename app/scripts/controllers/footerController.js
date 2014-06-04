/* global angular */
(function (app) {

    'use strict';

    function Controller (pubSub) {
        var _that = this;
        this.slide = 0;
        this.totalSlides = 0;
        pubSub.subscribe('currentSlide', function (payload) {
            _that.slide = payload.currentSlide + 1;
            _that.totalSlides = payload.totalSlides;
        });
    }

    Controller.$inject = ['pubSub'];

    app.controller('footerCtrl', Controller);

})(angular.module('zoneApp'));