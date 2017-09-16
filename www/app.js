'use strict';
var scottyApp = angular.module('scottyApp', ['ngRoute', 'ngMap']);
scottyApp.config( function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/user", {
        templateUrl : "/views/table.html",
        activetab : "user"
    })
    .when("/map", {
        templateUrl : "/views/map.html",
        activetab : "map"
    })
    .otherwise({
      redirectTo : "/user",
      activetab : "user"
    });
    $locationProvider.html5Mode(true)
}).run(function($rootScope, $route){
  $rootScope.$route = $route;
});
