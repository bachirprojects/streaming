var http = require('http');
var md5 = require('MD5');
var mysql = require('mysql');
		   
var httpServer = http.createServer(function(req,res){

console.log('Un Utilisateur a affiche la page');

});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function (socket) {

socket.broadcast.emit('entrerUser', "yes");

console.log('new user');


socket.on('message', function(data){

console.log('new Data!'+data);

io.sockets.emit('broadcast', data);

});

});