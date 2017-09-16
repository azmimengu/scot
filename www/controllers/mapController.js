angular.module('scottyApp').controller('MapCtrl', function($scope, NgMap, $location, $routeParams) {
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

});
