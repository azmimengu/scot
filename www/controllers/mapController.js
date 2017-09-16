console.log("@ mapController.js");
// var app = angular.module('scottyApp.controller', ['ngMap', 'ngRoute']);

angular.module('scottyApp').controller('MapCtrl', function($scope, NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
});
