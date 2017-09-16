var oScope;

angular.module('scottyApp').controller('UserTableCtrl', function($scope, socket, $location, $routeParams, $timeout){

  oScope = $scope;
  socket.on('connect', () => {
    console.log("connected to the server");

    socket.on('clientsData', function(clientsData) {
      console.log("connected list of users : ");
      console.log(clientsData);
    }); //clientsData end.

    socket.on('userData', function(data){
      $timeout(function() {
       //  $scope.someData = someData;
       oScope.users = data;
       console.log(oScope.users);
      }, 0);

    }); //userData end.

 });



});
