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

	//players
	scope.players = {};

	//map
	scope.map = ro00000000.constructors.createMapSeed();

	//interactives
	scope.chests = {};

	//make chests
	scope.chests['c00000000'] = new ro00000000.constructors.Chest('c00000000', [15], [30], '00000004');

  	var movementVelocity = 3;

	scope.enter = function(si){
		var newCPC = ro00000000.constructors.createCPC(si.username);
		io.in('00000000').emit('1', newCPC);
		si.socket.emit('2', newCPC);
		for(i in scope.players){
			var playeri = scope.players[i];
			var cpcSend = playeri.cpc;
			cpcSend.tileID = playeri.tileID; 
			si.socket.emit('1', cpcSend);
		};
		var newPlayerTileID = newCPC.tileID;
		delete newCPC["tileID"];
		var newPlayer = new ro00000000.constructors.Player(si.socket, si.username, newPlayerTileID, newCPC);
		scope.players[si.username] = newPlayer;
		scope.map.occupants[newPlayerTileID].push(si.username);
		si.socket.join('00000000');
		si.socket.join('00000001');
		si.socket.join('00000002');
		si.socket.join('00000003');
	};

	scope.exit = function(si){
		if(io.sockets.connected[si.socket.id] != undefined){
			for(i in io.sockets.connected[si.socket.id].adapter.rooms){
				if(i.length != 8){
					continue;
				};
				si.socket.leave(i);
			};
		};
		var exitingPlayerTileID = scope.players[si.username].tileID;
		var i = scope.map.occupants[exitingPlayerTileID].indexOf(si.username);
		scope.map.occupants[exitingPlayerTileID].splice(i, 1);
		delete scope.players[si.username];
		io.in('00000001').emit('5', {username: si.username});
	};

	scope.attemptStartMovement = function(direction, username){
		if(!scope.players[username].moveData.isMoving && (new Date().getTime() - scope.players[username].moveData.lastTime)*.001 > 1/movementVelocity){
			var lTileID = scope.players[username].tileID;
			var lTile = scope.map.getTileByID(lTileID);
			var fTile;
			switch(direction){
	        	case(0):
	              fTile = scope.map.getNorthOf(lTile);
	              break;
	            case(1):
	              fTile = scope.map.getNorthWestOf(lTile);
	              break;
	            case(2):
	              fTile = scope.map.getWestOf(lTile);
	              break;
	            case(3):
	              fTile = scope.map.getSouthWestOf(lTile);
	              break;
	            case(4):
	              fTile = scope.map.getSouthOf(lTile);
	              break;
	            case(5):
	              fTile = scope.map.getSouthEastOf(lTile);
	              break;
	            case(6):
	              fTile = scope.map.getEastOf(lTile);
	              break;
	            case(7):
	              fTile = scope.map.getNorthEastOf(lTile);
	              break;
	            default:
	              fTile = null;
	              break;
			};

			if(fTile != null){
				io.in('00000002').emit('3', {username: username, direction: direction, startTileID: lTileID});
				scope.map.moveOccupant(username, fTile.id);
				var moveData = {isMoving: true, direction: direction, lastTime: new Date().getTime()};
				scope.players[username].moveData = moveData;
			};
		};

	};

	scope.attemptContinueMovement = function(username){
		if(scope.players[username].moveData.isMoving && (new Date().getTime() - scope.players[username].moveData.lastTime)*.001 > .5/movementVelocity){
			var lTileID = scope.players[username].tileID;
			var lTile = scope.map.getTileByID(lTileID);
			var fTile;
			switch(scope.players[username].moveData.direction){
	        	case(0):
	              fTile = scope.map.getNorthOf(lTile);
	              break;
	            case(1):
	              fTile = scope.map.getNorthWestOf(lTile);
	              break;
	            case(2):
	              fTile = scope.map.getWestOf(lTile);
	              break;
	            case(3):
	              fTile = scope.map.getSouthWestOf(lTile);
	              break;
	            case(4):
	              fTile = scope.map.getSouthOf(lTile);
	              break;
	            case(5):
	              fTile = scope.map.getSouthEastOf(lTile);
	              break;
	            case(6):
	              fTile = scope.map.getEastOf(lTile);
	              break;
	            case(7):
	              fTile = scope.map.getNorthEastOf(lTile);
	              break;
	            default:
	              fTile = null;
	              break;
			};

			if(fTile != null){
				scope.map.moveOccupant(username, fTile.id);
				scope.players[username].moveData.lastTime = new Date().getTime();
			}
			else{
				io.in('00000003').emit('4', {username: username, lastTileID: lTileID});
				var moveData = {isMoving: false, direction: null, lastTime: new Date().getTime()};
				scope.players[username].moveData = moveData;
			};
		}
		else{
			var lTileID = scope.players[username].tileID;
			var lTile = scope.map.getTileByID(lTileID);
			io.in('00000003').emit('4', {username: username, lastTileID: lTileID});
			var moveData = {isMoving: false, direction: null, lastTime: new Date().getTime()+1};
			scope.players[username].moveData = moveData;
		};
	};

	scope.cancelMovement = function(username){
		if(scope.players[username].moveData.isMoving){
			var lTileID = scope.players[username].tileID;
			io.in('00000003').emit('4', {username: username, lastTileID: lTileID});
			var moveData = {isMoving: false, direction: null, lastTime: new Date().getTime()};
			scope.players[username].moveData = moveData;
		};
	};
};

rc00000000 = function(){

	var scope = this;

	scope.createMapSeed = function(){
		var tArray = [[{x: -7, y: 0, z: -5.5, id: 0}, {x: -6, y: 0, z: -5.5, id: 1}, {x: -5, y: 0, z: -5.5, id: 2}, null, {x: -3, y: 0, z: -5.5, id: 4}, {x: -2, y: 0, z: -5.5, id: 5}, {x: -1, y: 0, z: -5.5, id: 6}, {x: 0, y: 0, z: -5.5, id: 7}, {x: 1, y: 0, z: -5.5, id: 8}, {x: 2, y: 0, z: -5.5, id: 9}, {x: 3, y: 0, z: -5.5, id: 10}, {x: 4, y: 0, z: -5.5, id: 11}, {x: 5, y: 0, z: -5.5, id: 12}, {x: 6, y: 0, z: -5.5, id: 13}, {x: 7, y: 0, z: -5.5, id: 14}], [{x: -7, y: 0, z: -4.5, id: 15}, {x: -6, y: 0, z: -4.5, id: 16}, {x: -5, y: 0, z: -4.5, id: 17}, null, {x: -3, y: 0, z: -4.5, id: 19}, {x: -2, y: 0, z: -4.5, id: 20}, {x: -1, y: 0, z: -4.5, id: 21}, {x: 0, y: 0, z: -4.5, id: 22}, {x: 1, y: 0, z: -4.5, id: 23}, {x: 2, y: 0, z: -4.5, id: 24}, {x: 3, y: 0, z: -4.5, id: 25}, {x: 4, y: 0, z: -4.5, id: 26}, {x: 5, y: 0, z: -4.5, id: 27}, {x: 6, y: 0, z: -4.5, id: 28}, {x: 7, y: 0, z: -4.5, id: 29}], [{x: -7, y: 0, z: -3.5, id: 30}, {x: -6, y: 0, z: -3.5, id: 31}, {x: -5, y: 0, z: -3.5, id: 32}, null, null, null, null, null, null, null, null, null, null, null, null], [{x: -7, y: 0, z: -2.5, id: 45}, {x: -6, y: 0, z: -2.5, id: 46}, {x: -5, y: 0, z: -2.5, id: 47}, {x: -4, y: 0, z: -2.5, id: 48}, {x: -3, y: 0, z: -2.5, id: 49}, {x: -2, y: 0, z: -2.5, id: 50}, {x: -1, y: 0, z: -2.5, id: 51}, {x: 0, y: 0, z: -2.5, id: 52}, {x: 1, y: 0, z: -2.5, id: 53}, {x: 2, y: 0, z: -2.5, id: 54}, {x: 3, y: 0, z: -2.5, id: 55}, {x: 4, y: 0, z: -2.5, id: 56}, {x: 5, y: 0, z: -2.5, id: 57}, {x: 6, y: 0, z: -2.5, id: 58}, {x: 7, y: 0, z: -2.5, id: 59}], [{x: -7, y: 0, z: -1.5, id: 60}, {x: -6, y: 0, z: -1.5, id: 61}, {x: -5, y: 0, z: -1.5, id: 62}, {x: -4, y: 0, z: -1.5, id: 63}, {x: -3, y: 0, z: -1.5, id: 64}, {x: -2, y: 0, z: -1.5, id: 65}, {x: -1, y: 0, z: -1.5, id: 66}, {x: 0, y: 0, z: -1.5, id: 67}, {x: 1, y: 0, z: -1.5, id: 68}, {x: 2, y: 0, z: -1.5, id: 69}, {x: 3, y: 0, z: -1.5, id: 70}, {x: 4, y: 0, z: -1.5, id: 71}, {x: 5, y: 0, z: -1.5, id: 72}, {x: 6, y: 0, z: -1.5, id: 73}, {x: 7, y: 0, z: -1.5, id: 74}], [{x: -7, y: 0, z: -0.5, id: 75}, {x: -6, y: 0, z: -0.5, id: 76}, {x: -5, y: 0, z: -0.5, id: 77}, {x: -4, y: 0, z: -0.5, id: 78}, {x: -3, y: 0, z: -0.5, id: 79}, {x: -2, y: 0, z: -0.5, id: 80}, {x: -1, y: 0, z: -0.5, id: 81}, {x: 0, y: 0, z: -0.5, id: 82}, {x: 1, y: 0, z: -0.5, id: 83}, {x: 2, y: 0, z: -0.5, id: 84}, {x: 3, y: 0, z: -0.5, id: 85}, {x: 4, y: 0, z: -0.5, id: 86}, {x: 5, y: 0, z: -0.5, id: 87}, {x: 6, y: 0, z: -0.5, id: 88}, {x: 7, y: 0, z: -0.5, id: 89}], [{x: -7, y: 0, z: 0.5, id: 90}, {x: -6, y: 0, z: 0.5, id: 91}, {x: -5, y: 0, z: 0.5, id: 92}, {x: -4, y: 0, z: 0.5, id: 93}, {x: -3, y: 0, z: 0.5, id: 94}, {x: -2, y: 0, z: 0.5, id: 95}, {x: -1, y: 0, z: 0.5, id: 96}, {x: 0, y: 0, z: 0.5, id: 97}, {x: 1, y: 0, z: 0.5, id: 98}, {x: 2, y: 0, z: 0.5, id: 99}, {x: 3, y: 0, z: 0.5, id: 100}, {x: 4, y: 0, z: 0.5, id: 101}, {x: 5, y: 0, z: 0.5, id: 102}, {x: 6, y: 0, z: 0.5, id: 103}, {x: 7, y: 0, z: 0.5, id: 104}], [{x: -7, y: 0, z: 1.5, id: 105}, {x: -6, y: 0, z: 1.5, id: 106}, {x: -5, y: 0, z: 1.5, id: 107}, {x: -4, y: 0, z: 1.5, id: 108}, {x: -3, y: 0, z: 1.5, id: 109}, {x: -2, y: 0, z: 1.5, id: 110}, {x: -1, y: 0, z: 1.5, id: 111}, {x: 0, y: 0, z: 1.5, id: 112}, {x: 1, y: 0, z: 1.5, id: 113}, {x: 2, y: 0, z: 1.5, id: 114}, {x: 3, y: 0, z: 1.5, id: 115}, {x: 4, y: 0, z: 1.5, id: 116}, {x: 5, y: 0, z: 1.5, id: 117}, {x: 6, y: 0, z: 1.5, id: 118}, {x: 7, y: 0, z: 1.5, id: 119}], [{x: -7, y: 0, z: 2.5, id: 120}, {x: -6, y: 0, z: 2.5, id: 121}, {x: -5, y: 0, z: 2.5, id: 122}, {x: -4, y: 0, z: 2.5, id: 123}, {x: -3, y: 0, z: 2.5, id: 124}, {x: -2, y: 0, z: 2.5, id: 125}, {x: -1, y: 0, z: 2.5, id: 126}, {x: 0, y: 0, z: 2.5, id: 127}, {x: 1, y: 0, z: 2.5, id: 128}, {x: 2, y: 0, z: 2.5, id: 129}, {x: 3, y: 0, z: 2.5, id: 130}, {x: 4, y: 0, z: 2.5, id: 131}, {x: 5, y: 0, z: 2.5, id: 132}, {x: 6, y: 0, z: 2.5, id: 133}, {x: 7, y: 0, z: 2.5, id: 134}], [{x: -7, y: 0, z: 3.5, id: 135}, {x: -6, y: 0, z: 3.5, id: 136}, {x: -5, y: 0, z: 3.5, id: 137}, {x: -4, y: 0, z: 3.5, id: 138}, {x: -3, y: 0, z: 3.5, id: 139}, {x: -2, y: 0, z: 3.5, id: 140}, {x: -1, y: 0, z: 3.5, id: 141}, {x: 0, y: 0, z: 3.5, id: 142}, {x: 1, y: 0, z: 3.5, id: 143}, {x: 2, y: 0, z: 3.5, id: 144}, {x: 3, y: 0, z: 3.5, id: 145}, {x: 4, y: 0, z: 3.5, id: 146}, {x: 5, y: 0, z: 3.5, id: 147}, {x: 6, y: 0, z: 3.5, id: 148}, {x: 7, y: 0, z: 3.5, id: 149}], [{x: -7, y: 0, z: 4.5, id: 150}, {x: -6, y: 0, z: 4.5, id: 151}, {x: -5, y: 0, z: 4.5, id: 152}, {x: -4, y: 0, z: 4.5, id: 153}, {x: -3, y: 0, z: 4.5, id: 154}, {x: -2, y: 0, z: 4.5, id: 155}, {x: -1, y: 0, z: 4.5, id: 156}, {x: 0, y: 0, z: 4.5, id: 157}, {x: 1, y: 0, z: 4.5, id: 158}, {x: 2, y: 0, z: 4.5, id: 159}, {x: 3, y: 0, z: 4.5, id: 160}, {x: 4, y: 0, z: 4.5, id: 161}, {x: 5, y: 0, z: 4.5, id: 162}, {x: 6, y: 0, z: 4.5, id: 163}, {x: 7, y: 0, z: 4.5, id: 164}], [{x: -7, y: 0, z: 5.5, id: 165}, {x: -6, y: 0, z: 5.5, id: 166}, {x: -5, y: 0, z: 5.5, id: 167}, {x: -4, y: 0, z: 5.5, id: 168}, {x: -3, y: 0, z: 5.5, id: 169}, {x: -2, y: 0, z: 5.5, id: 170}, {x: -1, y: 0, z: 5.5, id: 171}, {x: 0, y: 0, z: 5.5, id: 172}, {x: 1, y: 0, z: 5.5, id: 173}, {x: 2, y: 0, z: 5.5, id: 174}, {x: 3, y: 0, z: 5.5, id: 175}, {x: 4, y: 0, z: 5.5, id: 176}, {x: 5, y: 0, z: 5.5, id: 177}, {x: 6, y: 0, z: 5.5, id: 178}, {x: 7, y: 0, z: 5.5, id: 179}]];
		var obj = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [], 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: [], 29: [], 30: [], 31: [], 32: [], 33: [], 34: [], 35: [], 36: [], 37: [], 38: [], 39: [], 40: [], 41: [], 42: [], 43: [], 44: [], 45: [], 46: [], 47: [], 48: [], 49: [], 50: [], 51: [], 52: [], 53: [], 54: [], 55: [], 56: [], 57: [], 58: [], 59: [], 60: [], 61: [], 62: [], 63: [], 64: [], 65: [], 66: [], 67: [], 68: [], 69: [], 70: [], 71: [], 72: [], 73: [], 74: [], 75: [], 76: [], 77: [], 78: [], 79: [], 80: [], 81: [], 82: [], 83: [], 84: [], 85: [], 86: [], 87: [], 88: [], 89: [], 90: [], 91: [], 92: [], 93: [], 94: [], 95: [], 96: [], 97: [], 98: [], 99: [], 100: [], 101: [], 102: [], 103: [], 104: [], 105: [], 106: [], 107: [], 108: [], 109: [], 110: [], 111: [], 112: [], 113: [], 114: [], 115: [], 116: [], 117: [], 118: [], 119: [], 120: [], 121: [], 122: [], 123: [], 124: [], 125: [], 126: [], 127: [], 128: [], 129: [], 130: [], 131: [], 132: [], 133: [], 134: [], 135: [], 136: [], 137: [], 138: [], 139: [], 140: [], 141: [], 142: [], 143: [], 144: [], 145: [], 146: [], 147: [], 148: [], 149: [], 150: [], 151: [], 152: [], 153: [], 154: [], 155: [], 156: [], 157: [], 158: [], 159: [], 160: [], 161: [], 162: [], 163: [], 164: [], 165: [], 166: [], 167: [], 168: [], 169: [], 170: [], 171: [], 172: [], 173: [], 174: [], 175: [], 176: [], 177: [], 178: [], 179: []};
		var mBuild = {x: 15, z: 12, tileArray: tArray, occupants: obj};
  		var map = new Map(mBuild);
  		return(map);
	};

	scope.createCPC = function(un){
		var playerValues = jsonfile.readFileSync('./game/data/usr/'+un+'.json');
		var cpc = new function(){};
		cpc.username = playerValues.username;
		cpc.model = playerValues.model;
		cpc.tileID = playerValues.lastTile;
		return(cpc);
	};

	scope.Player = function(socket, username, tileID, cpc){
		var scope = this;

		var moveData = {isMoving: false, direction: null, lastTime: 0};
		this.socket = socket;
		this.username = username;
		this.tileID = tileID;
		this.cpc = cpc;
		this.moveData = moveData;

		this.backpack = new function(){
			var scope = this;

			this.contents = [];

			this.howMany = function(backpackObjectID){
				var count = 0;
				for(var i = 0; i<scope.contents.length; i++){
					if(scope.contents[i] == backpackObjectID){
						count = count + 1;
					};
					continue;
				};
				return(count);
			};

			this.removeObject = function(backpackObjectID){
				var i = scope.contents.indexOf(backpackObjectID);
				if(i != -1){
					scope.contents.splice(i,1);
				};
			};

			this.addObject = function(backpackObjectID){
				scope.contents.push(backpackObjectID);
			};
		};
	};
	scope.Player.prototype.constructor = scope.Player;

	scope.Chest = function(name, triggerTiles, escapeTiles, socketRoomID){
		var scope = this;

		this.name = name;
		this.triggerTiles = triggerTiles;
		this.escapeTiles = escapeTiles;
		this.isOpen = false;
		this.contents = [];
		this.playersInRange = [];

		this.open = function(username){
			if(scope.playersInRange.indexOf(username) != -1 && !scope.isOpen){
				scope.isOpen = true;
				console.log('chest opened');
				//update everyones interactions
			};
		};

		this.close = function(username){
			if(scope.playersInRange.indexOf(username) != -1 && scope.isOpen){
				scope.isOpen = false;
				//update everyones interactions
			}
		};

		this.addContents = function(username, contents){
			var hasContents = true;
			for(var i = 0; i<contents.length; i++){
				var currentObject = contents[i];
				var numOfObject = 0;
				for(var j = 0; j<contents.length; j++){
					if(contents[j] == currentObject){
						numOfObject = numOfObject + 1;
					};
				};
				if(numOfObject <= ro00000000.room.players[username].backpack.howMany(currentObject)){
					continue;
				}
				else{
					hasContents = false;
					break;
				};
			};
			if(scope.playersInRange.indexOf(username) != -1 && hasContents && scope.isOpen){
				for(var i = 0; i<contents.length; i++){
					ro00000000.room.players[username].backpack.removeObject(contents[i]);
				};
				scope.contents = scope.contents.concat(contents);
			};
		};

		this.removeContents = function(username, contents){
			var hasContents = true;
			for(var i = 0; i<contents.length; i++){
				var currentObject = contents[i];
				var numOfObject = 0;
				for(var j = 0; j<contents.length; j++){
					if(contents[j] == currentObject){
						numOfObject = numOfObject + 1;
					};
				};
				if(numOfObject <= scope.howMany(currentObject)){
					continue;
				}
				else{
					hasContents = false;
					break;
				};
			};
			if(scope.playersInRange.indexOf(username) != -1 && hasContents && scope.isOpen){
				for(var i = 0; i<contents.length; i++){
					ro00000000.room.players[username].backpack.addObject(contents[i]);
				};
				for(var i = 0; i<contents.length; i++){
					scope.splice(scope.contents.indexOf(contents[i]), 1);
				};
			};
		};

		this.howMany = function(backpackObjectID){
			var count = 0;
			for(var i = 0; i<scope.contents.length; i++){
				if(scope.contents[i] == backpackObjectID){
					count = count + 1;
				};
				continue;
			};
			return(count);
		};

		var attemptAddPlayer = function(event){
			console.log(event.username);
			if(scope.playersInRange.indexOf(username) == -1){
				ro00000000.room.players[event.username].socket.join(socketRoomID);
				scope.playersInRange.push(event.username);
				//emit chest interaction with contents to joining player
			};
		};

		var attemptRemovePlayer = function(event){
			if(scope.playersInRange.indexOf(event.username) != -1){
				ro00000000.room.players[event.username].socket.leave(socketRoomID);
				var i = scope.playersInRange.indexOf(event.username);
				scope.playersInRange.splice(i, 1);
				//emit remove chest interaction from leaving player
			};
		};

		for(var i = 0; i<scope.triggerTiles.length; i++){
			ro00000000.room.eventEmitter.on('tileArrival'+scope.triggerTiles[i].toString(), function(e){attemptAddPlayer(e.username);});
		};

		for(var i = 0; i<scope.escapeTiles.length; i++){
			ro00000000.room.eventEmitter.on('tileArrival'+scope.escapeTiles[i].toString(), function(e){attemptRemovePlayer(e.username);});
		};
	};
	scope.Chest.prototype.constructor = scope.Chest;
};