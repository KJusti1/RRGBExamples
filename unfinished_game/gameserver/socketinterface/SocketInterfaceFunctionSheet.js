/*
Author: Kevin Justice
File: SocketInterfaceFunctionSheet.js
Date Created: 092216

Game Socket Interface States
*/

/*

FUNCTIONS ON THIS SHEET:

si00000000- login init
sd00000000- login destroy

si00000001- developers basement init
sd00000001- developers basement destroy

*/

/*

SOCKET IO MESSAGE ROOMS:

'00000000'- developers basement player join
'00000001'- developers basement player exit
'00000002'- developers basement player begin move
'00000003'- developers basement player end move
'00000004'- developers basement player in chest 1 radius

*/

si00000000 = function(){

	var scope = this;

	scope.socket.emit('0', {interface:0});

	var handleLogin = function(info){
		try {
			userFile = fs.lstatSync('./game/data/usr/'+info.U+'.json');
			if (userFile.isFile()) {
	    		var playerValues = jsonfile.readFileSync('./game/data/usr/'+info.U+'.json');
	    		if((playerValues.password == info.P) && ((onlineUsers.filter(function(item){return(item == info.U);})[0]) == undefined)){
	    			scope.username = info.U;
	    			onlineUsers.push(info.U);
	    			scope.socket.emit('0', {interface:1});
	    			r00000000.enter(scope);
	    			scope.changeSocketInterface(si00000001, sd00000001);
	    		};
			};
		}
		catch (e){
			//pass
		};
	};

	//On Login Request:
	scope.socket.on('0', handleLogin);
	scope.socket.on('disconnect', function(obj){scope.changeSocketInterface(defaultFunction, defaultFunction);});

};

sd00000000 = function(){

	var scope = this;

	scope.socket.removeAllListeners('0');
	scope.socket.removeAllListeners('disconnect');

};

si00000001 = function(){

	var scope = this;

	scope.socket.on('0', function(m){r00000000.attemptStartMovement(m.direction, scope.username)});
	scope.socket.on('1', function(m){r00000000.attemptContinueMovement(scope.username)});
	scope.socket.on('2', function(obj){r00000000.cancelMovement(scope.username)});
	scope.socket.on('3', function(obj){r00000000.chests['c00000000'].open(scope.username);});
	scope.socket.on('disconnect', function(obj){onlineUsers.splice(onlineUsers.indexOf(scope.username), 1); r00000000.exit(scope); scope.changeSocketInterface(defaultFunction, defaultFunction);});

};

sd00000001 = function(){

	var scope = this;

	scope.socket.removeAllListeners('0');
	scope.socket.removeAllListeners('1');
	scope.socket.removeAllListeners('2');
	scope.socket.removeAllListeners('disconnect');
	
};