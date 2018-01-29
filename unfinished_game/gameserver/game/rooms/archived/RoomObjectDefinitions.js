/*
Author: Kevin Justice
File: RoomObjectDefinitions.js
Date Created: 092916

Definitions for game rooms and game room constructors
*/

/*

FUNCTIONS ON THIS SHEET

r00000000- developers basement room
rc00000000- developers basement room constructors

*/

r00000000 = function(){

	var scope = this;

	scope.map = ro00000000.constructors.createMap();
  	var movementVelocity = 3;

	scope.activeSocketInterfaces = [];
	scope.basicCPCs = [];
	scope.playerPositions = [];

	scope.addSocketInterface = function(si){
		var newCPC = ro00000000.constructors.constructCPC(si.username);
		var stop = scope.activeSocketInterfaces.length;
		for(var i=0; i<stop; i++){
			if(scope.activeSocketInterfaces[i] == null){
				continue;
			};
			var currentSocket = scope.activeSocketInterfaces[i].socket;
			currentSocket.emit("1", newCPC);
		};
		scope.activeSocketInterfaces.push(si);
		si.socket.emit('2', newCPC);
		for(var j=0; j<stop; j++){
			if(scope.activeSocketInterfaces[j] == null){
				continue;
			};
			var currentPlayerCPC = scope.basicCPCs[j];
			var currentCPC = new function(){};
			currentCPC.username = currentPlayerCPC.username;
			currentCPC.model = currentPlayerCPC.model;
			currentCPC.tile = scope.playerPositions.filter(function(item){return(item.username === currentCPC.username);})[0].tile; 
			si.socket.emit("1", currentCPC);
		}
		scope.activeSocketInterfaces = scope.activeSocketInterfaces.filter(function(item){return item});
		var pushable = new function(){};
		pushable.username = newCPC.username;
		pushable.model = newCPC.model;
		scope.basicCPCs.push(pushable);
		scope.playerPositions.push({username: newCPC.username, tile: newCPC.tile, time: new Date().getTime()});
	};

	scope.removeSocketInterface = function(si){
		var removeIndex = scope.activeSocketInterfaces.indexOf(scope.activeSocketInterfaces.filter(function(item){return(item.username === si.username);})[0]);
		scope.activeSocketInterfaces[removeIndex] = null;
		var currentCPC = scope.basicCPCs.filter(function(item){return(item.username === si.username);})[0];
		scope.basicCPCs.splice(scope.basicCPCs.indexOf(currentCPC), 1);
		var currentPosition = scope.playerPositions.filter(function(item){return(item.username === si.username);})[0];
		scope.playerPositions.splice(scope.playerPositions.indexOf(currentPosition), 1);
		for(var i=0; i < scope.activeSocketInterfaces.length; i++){
			if(scope.activeSocketInterfaces[i] == null){
				continue;
			};
			var currentSocket = scope.activeSocketInterfaces[i].socket;
			currentSocket.emit("5", {username: si.username});
		};
	};

	scope.attemptStartMovement = function(direction, username){
		var lPosition = scope.playerPositions.filter(function(item){return(item.username === username);})[0];
		var sTile = scope.map.getTileByID(lPosition.tile);
		var m0 = new function(){};
		var m1 = new function(){};
		switch(direction){
        	case(0):
              m0.endTile = scope.map.getNorthOf(sTile);
              m1.endTile = scope.map.getNorthOf(scope.map.getNorthOf(sTile));
              break;
            case(1):
              m0.endTile = scope.map.getNorthWestOf(sTile);
              m1.endTile = scope.map.getNorthWestOf(scope.map.getNorthWestOf(sTile));
              break;
            case(2):
              m0.endTile = scope.map.getWestOf(sTile);
              m1.endTile = scope.map.getWestOf(scope.map.getWestOf(sTile));
              break;
            case(3):
              m0.endTile = scope.map.getSouthWestOf(sTile);
              m1.endTile = scope.map.getSouthWestOf(scope.map.getSouthWestOf(sTile));
              break;
            case(4):
              m0.endTile = scope.map.getSouthOf(sTile);
              m1.endTile = scope.map.getSouthOf(scope.map.getSouthOf(sTile));
              break;
            case(5):
              m0.endTile = scope.map.getSouthEastOf(sTile);
              m1.endTile = scope.map.getSouthEastOf(scope.map.getSouthEastOf(sTile));
              break;
            case(6):
              m0.endTile = scope.map.getEastOf(sTile);
              m1.endTile = scope.map.getEastOf(scope.map.getEastOf(sTile));
              break;
            case(7):
              m0.endTile = scope.map.getNorthEastOf(sTile);
              m1.endTile = scope.map.getNorthEastOf(scope.map.getNorthEastOf(sTile));
              break;
            default:
              m0.endTile = scope.map.getNorthOf(sTile);
              m1.endTile = scope.map.getNorthOf(scope.map.getNorthOf(sTile));
              break;
		};
		m0.modelName = username;
		m0.hasStarted = false;
		m0.queuedMovement = undefined;
		m1.modelName = username;
		m1.hasStarted = false;
		m1.queuedMovement = undefined;

		if(m0.endTile == null){
			//pass
		}
		else if(m1.endTile == null){
			m0.startTile = sTile.id;
			m0.endTile = m0.endTile.id;
			for(var i=0; i < scope.activeSocketInterfaces.length; i++){
				if(scope.activeSocketInterfaces[i] == null){
					continue;
				};
				var currentSocket = scope.activeSocketInterfaces[i].socket;
				currentSocket.emit("3", m0);
			};
			scope.activeSocketInterfaces = scope.activeSocketInterfaces.filter(function(item){return item});
			scope.playerPositions[scope.playerPositions.indexOf(scope.playerPositions.filter(function(item){return(item.username === username);})[0])] = {username: username, tile: m0.endTile, time: new Date().getTime()};
		}
		else{
			m0.startTile = sTile.id;
			m0.endTile = m0.endTile.id;
			m1.startTile = m0.endTile;
			m1.endTile = m1.endTile.id;
			for(var i=0; i < scope.activeSocketInterfaces.length; i++){
				if(scope.activeSocketInterfaces[i] == null){
					continue;
				};
				var currentSocket = scope.activeSocketInterfaces[i].socket;
				currentSocket.emit("3", m0);
				currentSocket.emit("3", m1);
			};
			scope.activeSocketInterfaces = scope.activeSocketInterfaces.filter(function(item){return item});
			scope.playerPositions[scope.playerPositions.indexOf(scope.playerPositions.filter(function(item){return(item.username === username);})[0])] = {username: username, tile: m0.endTile, time: new Date().getTime()};
		};
	};

	scope.continueMovement = function(direction, username){
		var lPosition = scope.playerPositions.filter(function(item){return(item.username === username);})[0];
		var cTile = scope.map.getTileByID(lPosition.tile);
		var m0 = new function(){};
		switch(direction){
        	case(0):
              m0.endTile = scope.map.getNorthOf(scope.map.getNorthOf(cTile));
              m0.startTile = scope.map.getNorthOf(cTile);
              break;
            case(1):
              m0.endTile = scope.map.getNorthWestOf(scope.map.getNorthWestOf(cTile));
              m0.startTile = scope.map.getNorthWestOf(cTile);
              break;
            case(2):
              m0.endTile = scope.map.getWestOf(scope.map.getWestOf(cTile));
              m0.startTile = scope.map.getWestOf(cTile);
              break;
            case(3):
              m0.endTile = scope.map.getSouthWestOf(scope.map.getSouthWestOf(cTile));
              m0.startTile = scope.map.getSouthWestOf(cTile);
              break;
            case(4):
              m0.endTile = scope.map.getSouthOf(scope.map.getSouthOf(cTile));
              m0.startTile = scope.map.getSouthOf(cTile);
              break;
            case(5):
              m0.endTile = scope.map.getSouthEastOf(scope.map.getSouthEastOf(cTile));
              m0.startTile = scope.map.getSouthEastOf(cTile);
              break;
            case(6):
              m0.endTile = scope.map.getEastOf(scope.map.getEastOf(cTile));
              m0.startTile = scope.map.getEastOf(cTile);
              break;
            case(7):
              m0.endTile = scope.map.getNorthEastOf(scope.map.getNorthEastOf(cTile));
              m0.startTile = scope.map.getNorthEastOf(cTile);
              break;
            default:
              m0.endTile = scope.map.getNorthOf(scope.map.getNorthOf(cTile));
              m0.startTile = scope.map.getNorthOf(cTile);
              break;
		};
		m0.modelName = username;
		m0.hasStarted = false;
		m0.queuedMovement = undefined;

		if(m0.startTile == null){

			//pass
		}
		else if(m0.endTile == null){
			m0.startTile = m0.startTile.id;
			scope.playerPositions[scope.playerPositions.indexOf(scope.playerPositions.filter(function(item){return(item.username === username);})[0])] = {username: username, tile: m0.startTile, time: new Date().getTime()};
		}
		else{
			m0.startTile = m0.startTile.id;
			m0.endTile = m0.endTile.id;
			for(var i=0; i < scope.activeSocketInterfaces.length; i++){
				if(scope.activeSocketInterfaces[i] == null){
					continue;
				};
				var currentSocket = scope.activeSocketInterfaces[i].socket;
				currentSocket.emit("3", m0);
			};
			scope.activeSocketInterfaces = scope.activeSocketInterfaces.filter(function(item){return item});
			scope.playerPositions[scope.playerPositions.indexOf(scope.playerPositions.filter(function(item){return(item.username === username);})[0])] = {username: username, tile: m0.startTile, time: new Date().getTime()};
		};
	};

	scope.cancelQueuedMovement = function(username){
		var lPosition = scope.playerPositions.filter(function(item){return(item.username === username);})[0];
		for(var i=0; i < scope.activeSocketInterfaces.length; i++){
			if(scope.activeSocketInterfaces[i] == null){
				continue;
			};
			var currentSocket = scope.activeSocketInterfaces[i].socket;
			currentSocket.emit("4", {username: username});
		};
		scope.activeSocketInterfaces = scope.activeSocketInterfaces.filter(function(item){return item});
	};
};

rc00000000 = function(){

	var scope = this;

	scope.createMap = function(){
		var tArray = [[{x: -7, y: 0, z: -5.5, id: 0}, {x: -6, y: 0, z: -5.5, id: 1}, {x: -5, y: 0, z: -5.5, id: 2}, null, {x: -3, y: 0, z: -5.5, id: 4}, {x: -2, y: 0, z: -5.5, id: 5}, {x: -1, y: 0, z: -5.5, id: 6}, {x: 0, y: 0, z: -5.5, id: 7}, {x: 1, y: 0, z: -5.5, id: 8}, {x: 2, y: 0, z: -5.5, id: 9}, {x: 3, y: 0, z: -5.5, id: 10}, {x: 4, y: 0, z: -5.5, id: 11}, {x: 5, y: 0, z: -5.5, id: 12}, {x: 6, y: 0, z: -5.5, id: 13}, {x: 7, y: 0, z: -5.5, id: 14}], [{x: -7, y: 0, z: -4.5, id: 15}, {x: -6, y: 0, z: -4.5, id: 16}, {x: -5, y: 0, z: -4.5, id: 17}, null, {x: -3, y: 0, z: -4.5, id: 19}, {x: -2, y: 0, z: -4.5, id: 20}, {x: -1, y: 0, z: -4.5, id: 21}, {x: 0, y: 0, z: -4.5, id: 22}, {x: 1, y: 0, z: -4.5, id: 23}, {x: 2, y: 0, z: -4.5, id: 24}, {x: 3, y: 0, z: -4.5, id: 25}, {x: 4, y: 0, z: -4.5, id: 26}, {x: 5, y: 0, z: -4.5, id: 27}, {x: 6, y: 0, z: -4.5, id: 28}, {x: 7, y: 0, z: -4.5, id: 29}], [{x: -7, y: 0, z: -3.5, id: 30}, {x: -6, y: 0, z: -3.5, id: 31}, {x: -5, y: 0, z: -3.5, id: 32}, null, null, null, null, null, null, null, null, null, null, null, null], [{x: -7, y: 0, z: -2.5, id: 45}, {x: -6, y: 0, z: -2.5, id: 46}, {x: -5, y: 0, z: -2.5, id: 47}, {x: -4, y: 0, z: -2.5, id: 48}, {x: -3, y: 0, z: -2.5, id: 49}, {x: -2, y: 0, z: -2.5, id: 50}, {x: -1, y: 0, z: -2.5, id: 51}, {x: 0, y: 0, z: -2.5, id: 52}, {x: 1, y: 0, z: -2.5, id: 53}, {x: 2, y: 0, z: -2.5, id: 54}, {x: 3, y: 0, z: -2.5, id: 55}, {x: 4, y: 0, z: -2.5, id: 56}, {x: 5, y: 0, z: -2.5, id: 57}, {x: 6, y: 0, z: -2.5, id: 58}, {x: 7, y: 0, z: -2.5, id: 59}], [{x: -7, y: 0, z: -1.5, id: 60}, {x: -6, y: 0, z: -1.5, id: 61}, {x: -5, y: 0, z: -1.5, id: 62}, {x: -4, y: 0, z: -1.5, id: 63}, {x: -3, y: 0, z: -1.5, id: 64}, {x: -2, y: 0, z: -1.5, id: 65}, {x: -1, y: 0, z: -1.5, id: 66}, {x: 0, y: 0, z: -1.5, id: 67}, {x: 1, y: 0, z: -1.5, id: 68}, {x: 2, y: 0, z: -1.5, id: 69}, {x: 3, y: 0, z: -1.5, id: 70}, {x: 4, y: 0, z: -1.5, id: 71}, {x: 5, y: 0, z: -1.5, id: 72}, {x: 6, y: 0, z: -1.5, id: 73}, {x: 7, y: 0, z: -1.5, id: 74}], [{x: -7, y: 0, z: -0.5, id: 75}, {x: -6, y: 0, z: -0.5, id: 76}, {x: -5, y: 0, z: -0.5, id: 77}, {x: -4, y: 0, z: -0.5, id: 78}, {x: -3, y: 0, z: -0.5, id: 79}, {x: -2, y: 0, z: -0.5, id: 80}, {x: -1, y: 0, z: -0.5, id: 81}, {x: 0, y: 0, z: -0.5, id: 82}, {x: 1, y: 0, z: -0.5, id: 83}, {x: 2, y: 0, z: -0.5, id: 84}, {x: 3, y: 0, z: -0.5, id: 85}, {x: 4, y: 0, z: -0.5, id: 86}, {x: 5, y: 0, z: -0.5, id: 87}, {x: 6, y: 0, z: -0.5, id: 88}, {x: 7, y: 0, z: -0.5, id: 89}], [{x: -7, y: 0, z: 0.5, id: 90}, {x: -6, y: 0, z: 0.5, id: 91}, {x: -5, y: 0, z: 0.5, id: 92}, {x: -4, y: 0, z: 0.5, id: 93}, {x: -3, y: 0, z: 0.5, id: 94}, {x: -2, y: 0, z: 0.5, id: 95}, {x: -1, y: 0, z: 0.5, id: 96}, {x: 0, y: 0, z: 0.5, id: 97}, {x: 1, y: 0, z: 0.5, id: 98}, {x: 2, y: 0, z: 0.5, id: 99}, {x: 3, y: 0, z: 0.5, id: 100}, {x: 4, y: 0, z: 0.5, id: 101}, {x: 5, y: 0, z: 0.5, id: 102}, {x: 6, y: 0, z: 0.5, id: 103}, {x: 7, y: 0, z: 0.5, id: 104}], [{x: -7, y: 0, z: 1.5, id: 105}, {x: -6, y: 0, z: 1.5, id: 106}, {x: -5, y: 0, z: 1.5, id: 107}, {x: -4, y: 0, z: 1.5, id: 108}, {x: -3, y: 0, z: 1.5, id: 109}, {x: -2, y: 0, z: 1.5, id: 110}, {x: -1, y: 0, z: 1.5, id: 111}, {x: 0, y: 0, z: 1.5, id: 112}, {x: 1, y: 0, z: 1.5, id: 113}, {x: 2, y: 0, z: 1.5, id: 114}, {x: 3, y: 0, z: 1.5, id: 115}, {x: 4, y: 0, z: 1.5, id: 116}, {x: 5, y: 0, z: 1.5, id: 117}, {x: 6, y: 0, z: 1.5, id: 118}, {x: 7, y: 0, z: 1.5, id: 119}], [{x: -7, y: 0, z: 2.5, id: 120}, {x: -6, y: 0, z: 2.5, id: 121}, {x: -5, y: 0, z: 2.5, id: 122}, {x: -4, y: 0, z: 2.5, id: 123}, {x: -3, y: 0, z: 2.5, id: 124}, {x: -2, y: 0, z: 2.5, id: 125}, {x: -1, y: 0, z: 2.5, id: 126}, {x: 0, y: 0, z: 2.5, id: 127}, {x: 1, y: 0, z: 2.5, id: 128}, {x: 2, y: 0, z: 2.5, id: 129}, {x: 3, y: 0, z: 2.5, id: 130}, {x: 4, y: 0, z: 2.5, id: 131}, {x: 5, y: 0, z: 2.5, id: 132}, {x: 6, y: 0, z: 2.5, id: 133}, {x: 7, y: 0, z: 2.5, id: 134}], [{x: -7, y: 0, z: 3.5, id: 135}, {x: -6, y: 0, z: 3.5, id: 136}, {x: -5, y: 0, z: 3.5, id: 137}, {x: -4, y: 0, z: 3.5, id: 138}, {x: -3, y: 0, z: 3.5, id: 139}, {x: -2, y: 0, z: 3.5, id: 140}, {x: -1, y: 0, z: 3.5, id: 141}, {x: 0, y: 0, z: 3.5, id: 142}, {x: 1, y: 0, z: 3.5, id: 143}, {x: 2, y: 0, z: 3.5, id: 144}, {x: 3, y: 0, z: 3.5, id: 145}, {x: 4, y: 0, z: 3.5, id: 146}, {x: 5, y: 0, z: 3.5, id: 147}, {x: 6, y: 0, z: 3.5, id: 148}, {x: 7, y: 0, z: 3.5, id: 149}], [{x: -7, y: 0, z: 4.5, id: 150}, {x: -6, y: 0, z: 4.5, id: 151}, {x: -5, y: 0, z: 4.5, id: 152}, {x: -4, y: 0, z: 4.5, id: 153}, {x: -3, y: 0, z: 4.5, id: 154}, {x: -2, y: 0, z: 4.5, id: 155}, {x: -1, y: 0, z: 4.5, id: 156}, {x: 0, y: 0, z: 4.5, id: 157}, {x: 1, y: 0, z: 4.5, id: 158}, {x: 2, y: 0, z: 4.5, id: 159}, {x: 3, y: 0, z: 4.5, id: 160}, {x: 4, y: 0, z: 4.5, id: 161}, {x: 5, y: 0, z: 4.5, id: 162}, {x: 6, y: 0, z: 4.5, id: 163}, {x: 7, y: 0, z: 4.5, id: 164}], [{x: -7, y: 0, z: 5.5, id: 165}, {x: -6, y: 0, z: 5.5, id: 166}, {x: -5, y: 0, z: 5.5, id: 167}, {x: -4, y: 0, z: 5.5, id: 168}, {x: -3, y: 0, z: 5.5, id: 169}, {x: -2, y: 0, z: 5.5, id: 170}, {x: -1, y: 0, z: 5.5, id: 171}, {x: 0, y: 0, z: 5.5, id: 172}, {x: 1, y: 0, z: 5.5, id: 173}, {x: 2, y: 0, z: 5.5, id: 174}, {x: 3, y: 0, z: 5.5, id: 175}, {x: 4, y: 0, z: 5.5, id: 176}, {x: 5, y: 0, z: 5.5, id: 177}, {x: 6, y: 0, z: 5.5, id: 178}, {x: 7, y: 0, z: 5.5, id: 179}]];
		var mBuild = {x: 15, z: 12, tileArray: tArray};
  		var map = new Map(mBuild);
  		return(map);
	};

	scope.constructCPC = function(un){
		var playerValues = jsonfile.readFileSync('./game/data/usr/'+un+'.json');
		var cpc = new function(){};
		cpc.username = playerValues.username;
		cpc.model = playerValues.model;
		cpc.tile = playerValues.lastTile;
		return(cpc);
	};

	scope.createPlayer = function(socket, username, tile, cpc){
		var moveData = {isMoving: true, direction: null, lastTime: 0};
		return({socket: socket, username: username, tileID: tileID, cpc: cpc, moveData: moveData});
	};

};