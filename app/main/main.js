'use strict';

angular.module('TimeDiff.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
    });
}])

.controller('MainCtrl', [function() {
    console.log(1)
}]);