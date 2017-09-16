console.log("@ tableController.js");
// var app = angular.module('scottyApp.controllers', []);

angular.module('scottyApp').factory('socket', function(){
  var socket = io.connect('http://localhost:8080');
  return socket;
});

angular.module('scottyApp').controller('UserTableCtrl', function($scope, socket, $location, $routeParams){
  // $scope.users = []
  $scope.firstName = "Azmi";

  socket.on('connect', () => {
    console.log("connected to the server in index.html.");
  })

  socket.on('userData', function(data){
    console.log("users in index.html");
    console.log(data);
    $scope.users = data;
    // $scope.users.push(data);
    $scope.$digest()

    console.log("name: " + $scope.firstName);
    console.log("users len: " + $scope.users.length);
    console.log("users in scope: ")
    console.log($scope.users)

    console.log("your location: ");
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    }, function() {
      // alert("Unable to fetch location.");
      console.log("unable to fetch location");
    }); //navigator end.
  });
});
