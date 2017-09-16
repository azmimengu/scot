console.log("@ mapController.js");

angular.module('scottyApp').controller('MapCtrl', function($scope, NgMap) {
  NgMap.getMap().then(function(map) {

    function success(pos) {
      var crd = pos.coords;
      console.log(crd);
    $scope.latitude = crd.latitude;
    $scope.longitude = crd.longitude;
    $scope.$digest()
  };

  function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  };

    navigator.geolocation.getCurrentPosition(success, error);
  });

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     console.log("mapController.js : active -> " + active);
     return active;
   };
});
