
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var arDrone = require('ar-drone');
var client = arDrone.createClient();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('takeoff', function(){
  	client.takeoff();
    io.emit('takeoff', '');
  });
  socket.on('land', function(){
  	client.land();
    io.emit('land', '');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    