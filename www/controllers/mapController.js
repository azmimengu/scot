console.log("@ mapController.js");
// var app = angular.module('scottyApp.controller', ['ngMap', 'ngRoute']);

angular.module('scottyApp').controller('MapCtrl', function($scope, NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);

    function success(pos) {
      var crd = pos.coords;
      console.log(crd);
    $scope.latitude = crd.latitude;
    $scope.longitude = crd.longitude;
    $scope.$digest()
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };

  function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  };

    navigator.geolocation.getCurrentPosition(success, error);
  });
});
