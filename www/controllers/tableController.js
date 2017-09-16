angular.module('scottyApp').factory('socket', function(){
  var socket = io.connect('http://localhost:8080');
  return socket;
});

angular.module('scottyApp').controller('UserTableCtrl', function($scope, socket, $location, $routeParams){

  socket.on('connect', () => {
    console.log("connected to the server in index.html.");

    socket.on('clientsData', function(clientsData) {
      console.log("connected list of users : ");
      console.log(clientsData);
    });

 });

  socket.on('userData', function(data){
    $scope.users = data;
    $scope.$digest()

    console.log("users in scope: ")
    console.log($scope.users)

    console.log("your location: ");
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    }, function() {
      console.log("unable to fetch location");
    }); //navigator end.
  }); //userData end.

});
