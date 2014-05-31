/* global angular */
(function (app) {

    'use strict';

    function TitleService($rootScope) {
        this.$rootScope = $rootScope;
    }

    TitleService.prototype.setTitle = function (title) {
        this.$rootScope.title = title;
    };

    TitleService.$inject = ['$rootScope'];

    app.service('title', TitleService);

})(angular.module('zoneApp'));