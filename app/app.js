'use strict';

// Declare app level module which depends on views, and components
angular.module('TimeDiff', [
    'ngRoute',
    'TimeDiff.main'
    // 'TimeDiff.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: 'main'});
}])
.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope) {
    $scope.test = 'hello world';
}