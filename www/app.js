//routing işlemleri yapılacak..
'use strict';
var scottyApp = angular.module('scottyApp', ['ngRoute', 'ngMap']);
// app.config( function($routeProvider) {
//     $routeProvider
//     .when("/user", {
//         templateUrl : "/views/table.html"
//         // controller : "UserTableCtrl"
//     })
//     .when("/map", {
//         templateUrl : "/views/map.html"
//     });
// });

scottyApp.config(['$routeProvider',
    function (
        $routeProvider
    ) {
          $routeProvider.
              when('/user', {
                  templateUrl: "/views/table.html"
                  // controller: 'UserTableCtrl'
              }).
              when('/map', {
                  templateUrl: '/views/map.html'
                  // controller: 'MapCtrl'
              }).
              otherwise({
                  redirectTo: "/user"
              });
}]);
