// 'use strict';

var mainModule = angular.module('timediff.main', ['timediff.clock']);

mainModule.controller('AppCtrl', AppCtrl);

mainModule.directive('addnewtime', addnewtime);

function AppCtrl ($scope) {
    $scope.main = {url: 'app/main/main.html'};
    $scope.colorTheme = 1;
    $scope.additionalTimesCount = 0;
};

function addnewtime ($compile) {
    return function($scope, element, attrs) {
        element.bind('click', function() {
            $scope.count++;
            $('.additionalZones').append($compile('<div data-cover-message="Please select timezone" data-delete="True">' +
                                        '<clock clock="clock" ></clock>' +
                                    '</div>')($scope));
        });
    };
};