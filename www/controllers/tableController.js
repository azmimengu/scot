var app = angular.module('userTableApp', [])

app.factory('socket', function(){
  var socket = io.connect('http://localhost:8080');
  return socket;
});

app.controller('UserTableCtrl', function($scope, socket){
  // $scope.users = [
  //   {"fname" : "azmi"},
  //   {"lname" : "azmi"}
  //   {"email" : "azmi"}
  // ];

  $scope.users = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ]

  socket.on('connect', () => {
    console.log("connected to the server.");
  })

  socket.on('userData', function(data){
    console.log("users");
    console.log(data);
    // $scope.users = [
    //   {"fname" : "azmi"},
    //   {"lname" : "azmi"}
    //   {"email" : "azmi"}
    // ];
    $scope.$digest()
  });
});
