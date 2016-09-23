// 'use strict';

var mainModule = angular.module('timediff.main', ['timediff.clock']);
var _scope;

// Constants.
var MAX_CLOCK_COUNT = 3;

mainModule.controller('AppCtrl', AppCtrl);

mainModule.directive('addnewtime', addnewtime);
mainModule.directive('deleteclock', deleteclock);

function AppCtrl ($scope) {
    _scope = $scope;
    $scope.main = {url: 'app/main/main.html'};
    $scope.childScopes = {};
    $scope.additionalTimesCount = 0;
    $scope.TrackMouse = false;
    $scope.startYPoint;
    $scope.lastClockChanges = 0;
    $scope.timelatency = 0;
    $scope.nextchecktimeout = 0;
    $scope.timerstarted = false;

    // Events
    $scope.mousDown = mousDown;
    $scope.mousUp = mousUp;
    $scope.mouseMove = mouseMove;
};

function addnewtime ($compile) {
    return function($scope, element, attrs) {
        element.bind('click', function() {
            if ($scope.additionalTimesCount == MAX_CLOCK_COUNT) {return;}
            $scope.additionalTimesCount ++;
            var newId = 'additionalClock' + $scope.additionalTimesCount;
            $scope.childScopes[newId] = $scope.$new();
            var directiveElement = $compile('<div data-cover-message="Please select timezone" data-delete="True">' +
                    '<clock clock="clock" clockid=' + newId + '></clock>' +
                '</div>')($scope.childScopes[newId]);
            $('.additionalZones').append(directiveElement);
        });
    };
};

function deleteclock ($compile) {
    return function($scope, element, attrs) {
        element.bind('click', function() {
            $scope.$destroy()
            $('div#' + attrs.deleteid).empty();
        });
    };
};

function mousDown () {
    $.each(_scope.childScopes, function (clId, clscope) {
        clscope.stop();
        _scope.lastClockChanges = new Date().getTime();
        _scope.TrackMouse = true;
    });
};

function mousUp () {
    $.each(_scope.childScopes, function (clId, clscope) {
        _scope.TrackMouse = false;
        _scope.lastClockChanges = 0;
        _scope.timerstarted = false;
        clearTimeout(_scope.nextchecktimeout);
        clscope.start();
    });
};

function mouseMove (e) {
    var increase, distance,
        speed = 0;
    if (_scope.TrackMouse) {
        if (!_scope.startYPoint) {_scope.startYPoint = e.pageY;}
        else {
            distance = e.pageY - _scope.startYPoint;
            increase = distance > 0;
            switch (true) {
                case 0 < Math.abs(distance) <= 5:
                    _scope.timelatency = 500
                    break
                case 5 < Math.abs(distance) <= 10:
                    _scope.timelatency = 250
                    break
                default:
                    _scope.timelatency = 100
            }

            if ((new Date().getTime() - _scope.lastClockChanges) > _scope.timelatency && !_scope.timerstarted) {
                _scope.timerstarted = true;
                _scope.nextchecktimeout = setTimeout(changeTime, _scope.timelatency);
            }
        }
    }
};

function changeTime () {
    _scope.lastClockChanges = new Date().getTime();
    if (_scope.TrackMouse) {
        _scope.nextchecktimeout = setTimeout(changeTime, _scope.timelatency);
    }
};
