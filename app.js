var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);

app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/bower_components'));

io.sockets.on('connect', () => {
  console.log("connected to the server.");
});


socket.on('connect', () => {
  console.log("connected to the server.");
});

socket.on('disconnect', () => {
  console.log("disconnected from the server.");
});

socket.on('userData', function(data){
  console.log("users");
  console.log(data);
});
