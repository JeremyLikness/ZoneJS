/* global angular, hljs */
(function (hl) {
    'use strict';

    angular.module('zoneApp', [])
        .run(['$rootScope', 'pubSub', 'keymap', function($rs, pubSub, key) {
            $rs.title = 'ZoneJS';
            pubSub.subscribe('keyPress', function (payload) {
                if (payload.keyCode === key.SPACE || payload.keyCode === key.RIGHT_ARROW) {
                    pubSub.publish('nextSlide');
                }
                else if (payload.keycode === key.BACKSPACE || payload.keyCode === key.LEFT_ARROW) {
                    pubSub.publish('previousSlide');
                }
            });
        }]);

    $('code').each(function(i, e) { hl.highlightBlock(e);});

})(hljs);