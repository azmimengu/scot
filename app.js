const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const async = require('async')
var mongoose = require('mongoose')

const wwwwPath = path.join(__dirname, '/www');
const bootstrapjsPath = path.join(__dirname + '/node_modules/bootstrap/dist/js');
const jqueryjsPath =  path.join(__dirname + '/node_modules/jquery/dist');
const bootstrapcssPath = path.join(__dirname + '/node_modules/bootstrap/dist/css');
const angularjsPath = path.join(__dirname + '/node_modules/angular');
const ngmapPath = path.join(__dirname + '/bower_components/ngmap/build/scripts')
const port = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(wwwwPath));
app.use('/js', express.static(bootstrapjsPath));
app.use('/js', express.static(jqueryjsPath));
app.use('/css', express.static(bootstrapcssPath));
app.use('/js', express.static(angularjsPath));
app.use('/js', express.static(ngmapPath));
app.set('port', port);

var Schema = mongoose.Schema;

var User = new Schema ({
  fname : {
    type : String
  },
  lname : {
    type : String
  },
  email : {
    type : String
  },
  phoneNo : {
    type : String
  },
  salary : {
    type : Number
  }
});

var UserModel = mongoose.model('User', User);

const clients = [];

io.sockets.on('connection', (socket) => {
  console.log("user connected server.js");

  //connect to db when user is connected.
  mongoose.connect('mongodb://localhost:27017/Scotty');

  getConnectedClients(socket);
  //initial fill tb.
  getUserData(socket);

  setInterval(function(){
     getUserData(socket);
   }, 5000);

  socket.on('disconnect', () => {
    console.log("user disconnected");
    getConnectedClients(socket);
  }); //user disconnet end.
}); // socket io end..

function getConnectedClients(socket){
  io.clients((error, clients) => {
  if (error) throw error;

  console.log("connected clients :");
  console.log(clients);
  socket.emit('clientsData', clients); //emit ends.
});
}

function getUserData(socket){
    UserModel.find({}, function(err, users){
      if(!err){
        socket.emit('userData', users);
      }else{
        console.log("error when getting users data.")
      }
    }); //UserModel.find() ends.
}

function deleteOldExistingUsers() {
  UserModel.remove({}, function (err) {
  if (err) return handleError(err);
  // removed!
  console.log("removed all users!");
});
}

function insertInstantUserData(){
  //async implementation for just funny example for this program.
  async.waterfall([
    function firstUserInsert(callback){
      UserModel.create({
          fname : "Thomas",
          lname : "Cardoza",
          email : "Thomas.Cardoza@gmail.com",
          phoneNo : "210-967-8287",
          salary : 1234.34
      }, function(err, res) {
        if(!err){
          callback(null, true);
          console.log("user 1, succesfully inserted.");
        }
      });
    },
    function secondUserInsert(firstUserInsertCallback,callback){
      if(firstUserInsertCallback){
        UserModel.create({
            fname : "Bradley",
            lname : "Martin",
            email : "bradleylmartin@yahoo.com",
            phoneNo : "210-614-0899",
            salary : 1774.93
        }, function(err, res) {
          if(!err){
            callback(null, true);
            console.log("succesfully inserted.");
          }
        });
      }
    },
    function thirdtUserInsert(secondUserInsertCallback, callback){
      if(secondUserInsertCallback){
        UserModel.create({
            fname : null,
            lname : null,
            email : "haroldguzman74@hotmail.com",
            phoneNo : "312-726-6576",
            salary : 877.3455674564
        }, function(err, res) {
          if(!err){
            callback(null, true)
            console.log("succesfully inserted.");
          }
        });
      }
    },
    function fourthUserInsert(thirdUserInsertCallback,callback){
      if(thirdUserInsertCallback){
        UserModel.create({
            fname : "Jeffrey T.",
            lname : "Jackson",
            email : "",
            phoneNo : "617-385-9775",
            salary : null
        }, function(err, res) {
          if(!err){
            callback(null, true);
            console.log("succesfully inserted.");
          }
        });
      }
    }

  ], function(err, result){
      //handle waterfall..
      if(err){
        throw err;
      } else {

      }
  }); //async end.
}

server.listen(app.get('port'), () => {
  console.log('Server is runnig on port ' + app.get('port'));
  deleteOldExistingUsers();
  insertInstantUserData();
});
