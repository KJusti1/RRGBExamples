/*
Author: Kevin Justice
File: gameServer.js
Date Created: 092216

Game Server
*/

require('console');
fs = require('fs');
events = require('events');
jsonfile = require('jsonfile');
io = require('socket.io').listen(8001);
require('./socketinterface/SocketInterface.js');
require('./socketinterface/SocketInterfaceFunctionSheet.js');
require('./game/rooms/RoomObjectDefinitions.js');

defaultFunction = function(){};

onlineUsers = [];

io.on('connection', function(socket){
	var siCurrent = new SocketInterface(socket, si00000000, sd00000000, undefined);
});

r00000000 = new ri00000000;