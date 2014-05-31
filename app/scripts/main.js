/* global angular, hljs */
(function (hl) {
    'use strict';

    angular.module('zoneApp', [])
        .run(['$rootScope', function($rs) {
            $rs.title = 'ZoneJS';
        }]);

    $('code').each(function(i, e) { hl.highlightBlock(e);});

})(hljs);